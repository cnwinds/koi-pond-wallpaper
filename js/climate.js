/* Real-clock day/night and live weather (Open-Meteo), with offline fallback.
 *
 * Lighting always follows the actual sun at the chosen lat/lon. Weather is
 * fetched at most every 20 minutes, cached, and never blocks the pond.
 * Displayed light/weather eases toward the target so previews and live
 * updates fade (rain starts/stops, day↔night) instead of snapping.
 * Rain uses an oblique 3D projection: z=1 is altitude (near camera,
 * higher on screen), z=0 is the water hit. Drops fall downward onto
 * the pond (never rise). Streaks taper 上大下小. This canvas is rain
 * only; night/dusk/haze/fog grade in the water shader.
 */
(function (global) {
  const SHANGHAI = { lat: 31.2304, lon: 121.4737, tz: "Asia/Shanghai", name: "上海" };
  const WEATHER_KEY = "koi-pond-weather-v1";
  const REFRESH_MS = 20 * 60 * 1000;
  const STALE_MS = 6 * 60 * 60 * 1000;
  /* ~95% of a step lands in ~4.5s; reduced-motion uses a shorter tau. */
  const RAMP_SEC = 4.5;
  const GEOJS_URL = "https://get.geojs.io/v1/ip/geo.json";
  const IPWHO_URL = "https://ipwho.is/";

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function approach(cur, tgt, dt, tau) {
    if (cur == null || Math.abs(tgt - cur) < 1e-5) return tgt;
    const k = 1 - Math.exp(-dt / Math.max(0.08, tau));
    return cur + (tgt - cur) * k;
  }

  function smoothstep(e0, e1, x) {
    const t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function nearShanghai(lat, lon) {
    return Math.hypot(lat - SHANGHAI.lat, lon - SHANGHAI.lon) < 0.35;
  }

  function placeLabel(lat, lon, city) {
    if (nearShanghai(lat, lon)) return SHANGHAI.name;
    if (city) return city;
    const ns = lat >= 0 ? "N" : "S";
    const ew = lon >= 0 ? "E" : "W";
    return Math.abs(lat).toFixed(2) + "°" + ns + " " + Math.abs(lon).toFixed(2) + "°" + ew;
  }

  function asPlace(lat, lon, extra) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    extra = extra || {};
    return {
      lat: lat,
      lon: lon,
      tz: extra.tz ? String(extra.tz) : "",
      city: extra.city ? String(extra.city) : "",
      source: extra.source || "ip",
    };
  }

  function parseGeoJs(json) {
    if (!json) return null;
    return asPlace(json.latitude, json.longitude, {
      tz: json.timezone,
      city: json.city,
      source: "ip",
    });
  }

  function parseIpwho(json) {
    if (!json || json.success === false) return null;
    const tz = json.timezone && (json.timezone.id || json.timezone);
    return asPlace(json.latitude, json.longitude, {
      tz: tz,
      city: json.city,
      source: "ip",
    });
  }

  function fetchJson(fetchFn, url, ms) {
    if (!fetchFn) return Promise.reject(new Error("fetch"));
    const ctrl = typeof AbortController === "function" ? new AbortController() : null;
    const opts = { cache: "no-store" };
    if (ctrl) opts.signal = ctrl.signal;
    const to = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, ms || 7000);
    return fetchFn(url, opts)
      .then(function (res) {
        if (!res || !res.ok) throw new Error("http");
        return res.json();
      })
      .then(function (json) {
        clearTimeout(to);
        return json;
      })
      .catch(function (err) {
        clearTimeout(to);
        throw err;
      });
  }

  function readGps(geolocation, prompt, permissions) {
    return new Promise(function (resolve) {
      if (!geolocation || typeof geolocation.getCurrentPosition !== "function") {
        resolve(null);
        return;
      }
      const go = function () {
        geolocation.getCurrentPosition(
          function (pos) {
            resolve(
              asPlace(pos.coords.latitude, pos.coords.longitude, { source: "geo" })
            );
          },
          function () {
            resolve(null);
          },
          { enableHighAccuracy: false, maximumAge: 30 * 60 * 1000, timeout: 6000 }
        );
      };
      if (prompt) {
        go();
        return;
      }
      if (permissions && typeof permissions.query === "function") {
        permissions
          .query({ name: "geolocation" })
          .then(function (status) {
            if (status && status.state === "granted") go();
            else resolve(null);
          })
          .catch(function () {
            resolve(null);
          });
        return;
      }
      resolve(null);
    });
  }

  function resolveIp(fetchFn) {
    return fetchJson(fetchFn, GEOJS_URL, 6500)
      .then(function (json) {
        const place = parseGeoJs(json);
        if (!place) throw new Error("geojs");
        return place;
      })
      .catch(function () {
        return fetchJson(fetchFn, IPWHO_URL, 6500).then(function (json) {
          const place = parseIpwho(json);
          if (!place) throw new Error("ipwho");
          return place;
        });
      });
  }

  /* GPS if already granted (or prompt=true), else IP (geojs.io, then ipwho.is). */
  function resolveLocation(opts) {
    opts = opts || {};
    return readGps(opts.geolocation, !!opts.prompt, opts.permissions)
      .then(function (geo) {
        if (geo) return geo;
        return resolveIp(opts.fetch);
      })
      .catch(function () {
        return null;
      });
  }

  function readLastPlace() {
    try {
      const raw = global.localStorage && localStorage.getItem(WEATHER_KEY);
      if (!raw) return null;
      const c = JSON.parse(raw);
      return asPlace(c.lat, c.lon, { tz: c.tz, city: c.city, source: "cache" });
    } catch (err) {
      return null;
    }
  }

  function skyFromWmo(code, clouds, vis, precip, snowfall) {
    code = code | 0;
    precip = +precip || 0;
    snowfall = +snowfall || 0;
    if (code === 95 || code === 96 || code === 99) return "storm";
    if (code === 65 || code === 82 || code === 67) return "heavy_rain";
    if (code === 61 || code === 63 || code === 66 || code === 80 || code === 81) return "rain";
    if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return "drizzle";
    if (code === 77 || code === 85 || code === 86 || (code >= 71 && code <= 75)) return "snow";
    if (snowfall > 0.05 && precip < 0.3) return "snow";
    if (code === 45 || code === 48) return "fog";
    if (vis != null && vis < 800 && precip < 0.1 && snowfall <= 0.05 && code < 51) return "fog";
    if (precip >= 8) return "heavy_rain";
    if (precip >= 1.2) return "rain";
    if (precip >= 0.1) return "drizzle";
    if (code >= 3 || (clouds || 0) >= 55) return "cloudy";
    if (code === 2 || (clouds || 0) >= 40) return "cloudy";
    return "clear";
  }

  function precipKind(sky) {
    if (sky === "snow") return "snow";
    if (sky === "drizzle" || sky === "rain" || sky === "heavy_rain" || sky === "storm") return "rain";
    return "none";
  }

  /* Daytime targets. `rain` is the water-shader wetness (v0.3.12 glass rain
     stays the middle rung). `fall` is how many streaks or flakes to draw. */
  function skyProfile(sky) {
    if (sky === "drizzle") {
      return { rain: 0.3, fall: 0.42, fog: 0.08, exp: 1.04, tint: [0.9, 0.97, 0.99], cau: 0.32, wind: 8, clouds: 58, amb: 1.12 };
    }
    if (sky === "rain") {
      return { rain: 0.72, fall: 0.72, fog: 0.2, exp: 0.9, tint: [0.8, 0.9, 0.92], cau: 0.05, wind: 14, clouds: 70, amb: 1.35 };
    }
    if (sky === "heavy_rain") {
      return { rain: 0.92, fall: 1.2, fog: 0.3, exp: 0.74, tint: [0.62, 0.74, 0.82], cau: 0.03, wind: 22, clouds: 88, amb: 1.5 };
    }
    if (sky === "storm") {
      return { rain: 1, fall: 1.55, fog: 0.42, exp: 0.62, tint: [0.5, 0.62, 0.74], cau: 0.02, wind: 34, clouds: 96, amb: 1.75 };
    }
    if (sky === "snow") {
      return { rain: 0, fall: 0.9, fog: 0.16, exp: 1.04, tint: [0.86, 0.94, 1.06], cau: 0.1, wind: 10, clouds: 70, amb: 0.82 };
    }
    if (sky === "fog") {
      return { rain: 0, fall: 0, fog: 0.92, exp: 0.68, tint: [0.8, 0.86, 0.84], cau: 0.05, wind: 3, clouds: 90, amb: 0.9 };
    }
    if (sky === "cloudy") {
      return { rain: 0, fall: 0, fog: 0.16, exp: 0.74, tint: [0.72, 0.8, 0.88], cau: 0.16, wind: 8, clouds: 78, amb: 1 };
    }
    return { rain: 0, fall: 0, fog: 0, exp: 1.06, tint: [1.04, 1.06, 0.96], cau: 1.15, wind: 4, clouds: 12, amb: 1 };
  }

  function sunElevation(latDeg, lonDeg, date) {
    const rad = Math.PI / 180;
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const doy =
      (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86400000;
    const utcHours =
      date.getUTCHours() +
      date.getUTCMinutes() / 60 +
      date.getUTCSeconds() / 3600 +
      date.getUTCMilliseconds() / 3600000;
    const frac = doy + utcHours / 24;
    const decl = -23.44 * rad * Math.cos((360 / 365.242) * (frac + 10) * rad);
    const B = ((360 / 365.242) * (frac - 81)) * rad;
    const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
    const solarTime = utcHours + lonDeg / 15 + eot / 60;
    const ha = (solarTime - 12) * 15 * rad;
    const lat = latDeg * rad;
    const sinAlt = Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha);
    return Math.asin(clamp(sinAlt, -1, 1)) / rad;
  }

  function emptyWeather() {
    return {
      sky: "clear",
      clouds: 18,
      precip: 0,
      vis: 20000,
      snowfall: 0,
      windKmh: 4,
      windDir: 90,
      source: "default",
      fetchedAt: 0,
    };
  }

  function parseTimeName(value) {
    const key = String(value || "").toLowerCase();
    if (key === "dawn") return "dusk";
    if (key === "day" || key === "dusk" || key === "night") return key;
    return null;
  }

  function elevFromHour(hour) {
    return 62 * Math.cos(((hour - 12) / 12) * Math.PI);
  }

  function composeLook(lat, lon, date, weather, overrideSky, overrideTime, overrideHour) {
    let when = date || new Date();
    let elev = sunElevation(lat, lon, when);
    const named = parseTimeName(overrideTime);
    if (named === "day") elev = 48;
    else if (named === "night") elev = -16;
    else if (named === "dusk") elev = -1.2;
    else if (overrideHour != null && !Number.isNaN(+overrideHour)) {
      elev = elevFromHour(clamp(+overrideHour, 0, 24));
    }
    const dayness = smoothstep(-7, 7, elev);
    const sky = overrideSky || (weather && weather.sky) || "clear";
    const prof = skyProfile(sky);
    const live = !overrideSky && weather && weather.windKmh != null;
    const clouds = live && weather.clouds != null ? weather.clouds : prof.clouds;
    const precip = live && weather.precip != null ? weather.precip : 0;
    const snowfall = live && weather.snowfall != null ? weather.snowfall : 0;
    const windKmh = live ? weather.windKmh : prof.wind;
    const windDir = weather && weather.windDir != null ? weather.windDir : 90;

    let scale = 1;
    if (live) {
      if (sky === "drizzle") scale = clamp(0.8 + precip * 0.45, 0.75, 1.4);
      else if (sky === "rain") scale = clamp(0.9 + precip * 0.05, 0.9, 1.2);
      else if (sky === "heavy_rain") scale = clamp(0.92 + precip * 0.02, 0.92, 1.25);
      else if (sky === "storm") scale = clamp(0.95 + precip * 0.012, 0.95, 1.2);
      else if (sky === "snow") scale = clamp(0.75 + snowfall * 0.4, 0.7, 1.45);
    }
    let rain = prof.rain;
    let fall = prof.fall * scale;
    if (sky === "rain") {
      rain = clamp(0.72 + precip * 0.22, 0.72, 1);
      fall = rain;
    } else if (sky !== "snow") {
      rain = clamp(prof.rain * (live ? scale : 1), 0, 1);
    }
    let fog = prof.fog;
    const dayTint = prof.tint;
    const nightTint = [0.3, 0.48, 0.98];
    const tint = [
      lerp(nightTint[0], dayTint[0], dayness),
      lerp(nightTint[1], dayTint[1], dayness),
      lerp(nightTint[2], dayTint[2], dayness),
    ];
    const twilight = Math.exp(-Math.pow((dayness - 0.3) / 0.16, 2));
    tint[0] = lerp(tint[0], 1.22, twilight * 0.28);
    tint[1] = lerp(tint[1], 0.78, twilight * 0.18);
    tint[2] = lerp(tint[2], 0.62, twilight * 0.2);

    let exposure = lerp(0.32, prof.exp, dayness);
    if (sky === "fog") exposure *= 0.82;

    let causticGain = dayness * prof.cau;
    const haze = clamp(fog * 0.72 + (1 - dayness) * 0.14 + (clouds / 100) * 0.12, 0, 0.88);
    const windAmp = clamp(windKmh / 28, 0, 1.35);
    const from = (windDir * Math.PI) / 180;
    const wind = {
      x: -Math.sin(from) * windAmp * 5.5,
      y: Math.cos(from) * windAmp * 3.6,
    };
    const ambientMul = (0.55 + 0.6 * dayness) * (1 + windAmp * 0.45) * prof.amb;

    return {
      lat: lat,
      lon: lon,
      elev: elev,
      dayness: dayness,
      sky: sky,
      rain: rain,
      fall: fall,
      kind: precipKind(sky),
      fog: fog,
      haze: haze,
      exposure: exposure,
      tint: tint,
      causticGain: causticGain,
      ambientMul: ambientMul,
      wind: wind,
      windKmh: windKmh,
      source: (weather && weather.source) || "default",
      placeSource: "default",
      place: placeLabel(lat, lon),
      timeOverride: named || (overrideHour != null ? "hour" : null),
      skyOverride: overrideSky || null,
    };
  }

  function lookCaption(look) {
    const phase = look.dayness > 0.82 ? "昼" : look.dayness > 0.18 ? "晨昏" : "夜";
    const skyNames = {
      clear: "晴",
      cloudy: "阴",
      drizzle: "小雨",
      rain: "中雨",
      heavy_rain: "大雨",
      storm: "暴雨",
      snow: "雪",
      fog: "雾",
    };
    const sky = skyNames[look.sky] || "晴";
    const via =
      look.placeSource === "geo"
        ? " · 定位"
        : look.placeSource === "ip"
          ? " · IP"
          : look.placeSource === "manual"
            ? " · 手动"
            : "";
    const src = look.source === "live" ? "" : look.source === "cache" ? " · 缓存" : " · 离线";
    const preview =
      (look.skyOverride ? " · 预览天气" : "") + (look.timeOverride ? " · 预览天色" : "");
    return look.place + " · " + sky + " · " + phase + via + src + preview;
  }

  function readCache(lat, lon) {
    try {
      const raw = global.localStorage && localStorage.getItem(WEATHER_KEY);
      if (!raw) return null;
      const c = JSON.parse(raw);
      if (!c || typeof c.lat !== "number") return null;
      if (Math.abs(c.lat - lat) > 0.08 || Math.abs(c.lon - lon) > 0.08) return null;
      if (!c.fetchedAt || Date.now() - c.fetchedAt > STALE_MS) return null;
      c.source = "cache";
      return c;
    } catch (err) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      if (global.localStorage) localStorage.setItem(WEATHER_KEY, JSON.stringify(data));
    } catch (err) {}
  }

  function create(options) {
    options = options || {};
    const canvas = options.canvas;
    const ctx = canvas ? canvas.getContext("2d", { alpha: true, desynchronized: false }) : null;

    let lat = options.lat != null ? options.lat : SHANGHAI.lat;
    let lon = options.lon != null ? options.lon : SHANGHAI.lon;
    let tz = options.tz || SHANGHAI.tz;
    let placeMode = options.placeMode === "manual" ? "manual" : "auto";
    let placeSource = options.placeSource || (placeMode === "manual" ? "manual" : "default");
    let placeName = options.city || "";
    let overrideSky = options.sky || null;
    let overrideTime = parseTimeName(options.time);
    let overrideHour = options.hour != null && !Number.isNaN(+options.hour) ? clamp(+options.hour, 0, 24) : null;
    let weather = readCache(lat, lon) || emptyWeather();
    let fetching = false;
    let timer = 0;
    let resolveGen = 0;
    const resolvedListeners = [];
    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    let dripT = 0;
    const drops = [];
    /* Two of every nine snow particles are hex flakes; the rest stay soft dots. */
    let snowOrdinal = 0;
    const listeners = [];
    let blend = null;
    let rampTau = options.rampSec != null ? clamp(+options.rampSec, 0.25, 20) / 2.8 : RAMP_SEC / 2.8;

    function captureBlend(look) {
      return {
        dayness: look.dayness,
        rain: look.rain,
        fall: look.fall || 0,
        fog: look.fog,
        haze: look.haze,
        exposure: look.exposure,
        tint0: look.tint[0],
        tint1: look.tint[1],
        tint2: look.tint[2],
        causticGain: look.causticGain,
        ambientMul: look.ambientMul,
        windX: look.wind.x,
        windY: look.wind.y,
      };
    }

    function paintLook(look, b) {
      const out = Object.assign({}, look);
      out.dayness = b.dayness;
      out.rain = b.rain;
      out.fall = b.fall;
      out.fog = b.fog;
      out.haze = b.haze;
      out.exposure = b.exposure;
      out.tint = [b.tint0, b.tint1, b.tint2];
      out.causticGain = b.causticGain;
      out.ambientMul = b.ambientMul;
      out.wind = { x: b.windX, y: b.windY };
      return out;
    }

    function stepBlend(target, dt, calm) {
      if (!blend) {
        blend = captureBlend(target);
        return paintLook(target, blend);
      }
      const tau = calm ? 0.22 : rampTau;
      blend.dayness = approach(blend.dayness, target.dayness, dt, tau);
      blend.rain = approach(blend.rain, target.rain, dt, tau);
      blend.fall = approach(blend.fall || 0, target.fall || 0, dt, tau);
      blend.fog = approach(blend.fog, target.fog, dt, tau);
      blend.haze = approach(blend.haze, target.haze, dt, tau);
      blend.exposure = approach(blend.exposure, target.exposure, dt, tau);
      blend.tint0 = approach(blend.tint0, target.tint[0], dt, tau);
      blend.tint1 = approach(blend.tint1, target.tint[1], dt, tau);
      blend.tint2 = approach(blend.tint2, target.tint[2], dt, tau);
      blend.causticGain = approach(blend.causticGain, target.causticGain, dt, tau);
      blend.ambientMul = approach(blend.ambientMul, target.ambientMul, dt, tau);
      blend.windX = approach(blend.windX, target.wind.x, dt, tau);
      blend.windY = approach(blend.windY, target.wind.y, dt, tau);
      return paintLook(target, blend);
    }

    function emit() {
      const look = sample();
      for (let i = 0; i < listeners.length; i++) listeners[i](look);
    }

    function sample(date) {
      const look = composeLook(lat, lon, date || new Date(), weather, overrideSky, overrideTime, overrideHour);
      look.placeSource = placeSource;
      look.placeMode = placeMode;
      look.place = placeLabel(lat, lon, placeName);
      look.timeOverride = overrideTime || (overrideHour != null ? "hour" : null);
      look.skyOverride = overrideSky || null;
      return look;
    }

    function applyLive(json) {
      if (!json || !json.current) return;
      const cur = json.current;
      weather = {
        sky: skyFromWmo(
          cur.weather_code,
          cur.cloud_cover,
          cur.visibility,
          Math.max(+cur.precipitation || 0, +cur.rain || 0),
          cur.snowfall
        ),
        clouds: cur.cloud_cover != null ? cur.cloud_cover : 30,
        precip: Math.max(+cur.precipitation || 0, +cur.rain || 0),
        snowfall: cur.snowfall != null ? cur.snowfall : 0,
        vis: cur.visibility != null ? cur.visibility : 20000,
        windKmh: cur.wind_speed_10m != null ? cur.wind_speed_10m : 4,
        windDir: cur.wind_direction_10m != null ? cur.wind_direction_10m : 90,
        source: "live",
        fetchedAt: Date.now(),
        lat: lat,
        lon: lon,
        tz: (json.timezone || tz) + "",
        city: placeName,
      };
      if (json.timezone) tz = json.timezone;
      writeCache(weather);
      emit();
    }

    function fetchWeather() {
      if (fetching) return;
      if (overrideSky) return;
      fetching = true;
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        lat.toFixed(4) +
        "&longitude=" +
        lon.toFixed(4) +
        "&current=weather_code,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,precipitation,rain,snowfall,is_day" +
        "&timezone=auto";
      const ctrl = typeof AbortController === "function" ? new AbortController() : null;
      const to = global.setTimeout(function () {
        if (ctrl) ctrl.abort();
      }, 8000);
      const opts = { cache: "no-store" };
      if (ctrl) opts.signal = ctrl.signal;
      const done = function () {
        fetching = false;
        global.clearTimeout(to);
      };
      if (!global.fetch) {
        done();
        return;
      }
      fetch(url, opts)
        .then(function (res) {
          if (!res || !res.ok) throw new Error("weather");
          return res.json();
        })
        .then(function (json) {
          applyLive(json);
        })
        .catch(function () {})
        .then(done);
    }

    function setPlace(next) {
      next = next || {};
      let changed = false;
      let moved = false;
      if (next.lat != null && Math.abs(next.lat - lat) > 0.0001) {
        lat = next.lat;
        changed = true;
        moved = true;
      }
      if (next.lon != null && Math.abs(next.lon - lon) > 0.0001) {
        lon = next.lon;
        changed = true;
        moved = true;
      }
      if (next.tz && next.tz !== tz) {
        tz = next.tz;
        changed = true;
      }
      if (next.placeMode === "auto" || next.placeMode === "manual") {
        if (next.placeMode !== placeMode) {
          placeMode = next.placeMode;
          changed = true;
        }
      }
      if (next.source && next.source !== placeSource) {
        placeSource = next.source;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(next, "city") && (next.city || "") !== placeName) {
        placeName = next.city || "";
        changed = true;
      }
      let skyChanged = false;
      if (Object.prototype.hasOwnProperty.call(next, "sky")) {
        const sky = next.sky || null;
        if (sky !== overrideSky) {
          overrideSky = sky;
          changed = true;
          skyChanged = true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(next, "time")) {
        const named = parseTimeName(next.time);
        if (named !== overrideTime) {
          overrideTime = named;
          changed = true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(next, "hour")) {
        const hour = next.hour == null || next.hour === "" ? null : clamp(+next.hour, 0, 24);
        const nextHour = hour != null && !Number.isNaN(hour) ? hour : null;
        if (nextHour !== overrideHour) {
          overrideHour = nextHour;
          changed = true;
        }
      }
      if (placeMode === "manual") resolveGen += 1;
      if (changed) {
        if (moved) {
          const cached = readCache(lat, lon);
          if (cached) weather = cached;
        }
        emit();
        if (moved || (skyChanged && !overrideSky)) fetchWeather();
      }
    }

    function applyResolved(place, gen) {
      if (!place || gen !== resolveGen) return null;
      if (placeMode === "manual") return null;
      setPlace({
        lat: place.lat,
        lon: place.lon,
        tz: place.tz,
        source: place.source,
        city: place.city,
        placeMode: "auto",
      });
      for (let i = 0; i < resolvedListeners.length; i++) resolvedListeners[i](place);
      return place;
    }

    function resolve(opts) {
      opts = opts || {};
      if (placeMode === "manual" && !opts.force) return Promise.resolve(null);
      if (opts.force) placeMode = "auto";
      const gen = ++resolveGen;
      const nav = global.navigator || {};
      return resolveLocation({
        prompt: !!opts.prompt,
        fetch: global.fetch,
        geolocation: nav.geolocation,
        permissions: nav.permissions,
      }).then(function (place) {
        return applyResolved(place, gen);
      });
    }

    function start(opts) {
      opts = opts || {};
      const fresh = weather.source === "cache" && Date.now() - weather.fetchedAt < REFRESH_MS;
      if (!fresh) fetchWeather();
      if (timer) global.clearInterval(timer);
      timer = global.setInterval(fetchWeather, REFRESH_MS);
      if (opts.resolve !== false && placeMode === "auto") resolve({ prompt: false });
    }

    function stop() {
      if (timer) global.clearInterval(timer);
      timer = 0;
    }

    function resize(w, h, pixelRatio, force) {
      cssW = w;
      cssH = h;
      dpr = pixelRatio;
      if (!canvas) return;
      if (!drops.length) {
        releaseOverlay();
        return;
      }
      const pw = Math.max(1, Math.round(w * pixelRatio));
      const ph = Math.max(1, Math.round(h * pixelRatio));
      if (force && canvas.width === pw && canvas.height === ph) {
        canvas.width = Math.max(1, pw - 1);
      }
      canvas.width = pw;
      canvas.height = ph;
    }

    function stormSlant(look) {
      const wind = look && look.wind ? look.wind : { x: -4, y: 3.2 };
      const sky = look && look.sky;
      const snow = sky === "snow";
      const storm = sky === "storm";
      const heavy = sky === "heavy_rain";
      const xScale = storm ? 2.15 : heavy ? 1.35 : snow ? 2.4 : 1;
      const xClamp = storm ? 0.04 : snow ? 0.05 : 0.01;
      /* Positive y is how far above the splash the drop starts. Snow drifts
         more sideways and falls a shorter screen distance. */
      const yBase = snow ? 0.046 : 0.1;
      const yExtra = storm ? 0.032 : heavy ? 0.02 : 0.015;
      return {
        x: 0.026 * xScale + clamp(wind.x / (storm ? 75 : 110), -xClamp, xClamp),
        y: yBase + clamp(Math.abs(wind.y) / 140, 0, yExtra),
      };
    }

    function fallSpeed(kind, sky) {
      if (kind === "snow") return 0.42 + Math.random() * 0.36;
      if (sky === "drizzle") return 2.5 + Math.random() * 0.6;
      if (sky === "storm") return 4.5 + Math.random() * 1.05;
      return 3.4 + Math.random() * 0.9;
    }

    function snowShape(kind) {
      if (kind !== "snow") return "dot";
      snowOrdinal = (snowOrdinal + 1) % 9;
      return snowOrdinal < 2 ? "hex" : "dot";
    }

    function spawnDrop(fromSky, look) {
      const kind = precipKind(look.sky);
      const slant = stormSlant(look);
      const spread = 0.92 + Math.random() * 0.16;
      return {
        tx: Math.random() * cssW,
        ty: Math.random() * cssH,
        z: fromSky ? 1 : Math.random(),
        vz: fallSpeed(kind, look.sky),
        size: 0.68 + Math.random() * 0.74,
        slantX: slant.x * spread,
        slantY: slant.y * spread,
        a: 0.28 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI,
        flickerHz: kind === "snow" ? 0.35 + Math.random() * 0.45 : 0.85 + Math.random() * 1.35,
        kind: kind,
        shape: snowShape(kind),
      };
    }

    function recycleDrop(d, look) {
      const kind = precipKind(look.sky);
      const slant = stormSlant(look);
      const spread = 0.92 + Math.random() * 0.16;
      d.tx = Math.random() * cssW;
      d.ty = Math.random() * cssH;
      d.z = 0.82 + Math.random() * 0.18;
      d.vz = fallSpeed(kind, look.sky);
      d.size = 0.68 + Math.random() * 0.74;
      d.slantX = slant.x * spread;
      d.slantY = slant.y * spread;
      d.a = 0.28 + Math.random() * 0.18;
      d.phase = Math.random() * Math.PI * 2;
      d.rot = Math.random() * Math.PI;
      d.flickerHz = kind === "snow" ? 0.35 + Math.random() * 0.45 : 0.85 + Math.random() * 1.35;
      d.kind = kind;
      d.shape = snowShape(kind);
    }

    function projectDrop(d, z) {
      if (z == null) z = d.z;
      /* High z sits above/aside the hit; falling reduces z so y increases. */
      return {
        x: d.tx - z * d.slantX * cssW,
        y: d.ty - z * d.slantY * cssH,
      };
    }

    function tick(dt, target, quality, water, calm) {
      const look = stepBlend(target, dt, calm);
      const fallAmt = look.fall != null ? look.fall : look.rain || 0;
      const want = calm || fallAmt < 0.05 ? 0 : Math.round((quality.rainStreaks || 0) * fallAmt);
      while (drops.length < want) drops.push(spawnDrop(true, look));
      while (drops.length > want) drops.pop();
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.phase += dt * (d.flickerHz || 1.2);
        d.z -= d.vz * dt * (0.92 + 0.08 * Math.max(d.z, 0));
        if (d.z <= 0) {
          if (!calm && water) {
            /* Size changes how hard the ring is pushed, not a drawn drop body.
               Rain kernels stay tight so a large drop is not a white disc.
               Snow is a softer, smaller push. */
            let mag = 0.06 + d.size * 0.11;
            let rad = 7200;
            if (d.kind === "snow") {
              mag = 0.028 + Math.min(d.size, 1.1) * 0.02;
              rad = 2600;
            } else if (look.sky === "drizzle") mag *= 0.4;
            else if (look.sky === "heavy_rain") mag *= 1.2;
            else if (look.sky === "storm") mag *= 1.35;
            water.impulse(d.tx / cssW, d.ty / cssH, mag, rad);
          }
          recycleDrop(d, look);
        }
      }
      dripT = 0;
      return look;
    }

    function snap() {
      const look = sample();
      blend = captureBlend(look);
      return paintLook(look, blend);
    }

    function overlayBusy() {
      return drops.length;
    }

    function releaseOverlay() {
      if (!canvas) return;
      canvas.width = 1;
      canvas.height = 1;
      canvas.classList.add("is-idle");
      canvas.style.visibility = "hidden";
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 1, 1);
      }
    }

    function ensureOverlaySize() {
      if (!canvas) return;
      const pw = Math.max(1, Math.round(cssW * dpr));
      const ph = Math.max(1, Math.round(cssH * dpr));
      if (canvas.width !== pw) canvas.width = pw;
      if (canvas.height !== ph) canvas.height = ph;
      canvas.classList.remove("is-idle");
      canvas.style.visibility = "visible";
    }

    function hexPath(rad) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const px = Math.cos(a) * rad;
        const py = Math.sin(a) * rad;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function drawHexFlake(x, y, d, fade) {
      /* Small six-fold hex flake: spokes, short side branches, and a hex
         outline. Still a few strokes, not a sprite. */
      const rad = 7.4 + Math.min(Math.max(d.size - 0.68, 0), 0.74) * 4.2;
      const spin = (d.rot || 0) + (d.phase || 0) * 0.18;
      const alpha = Math.min(0.6, 0.4 + fade * 0.12 + ((d.a || 0.35) - 0.28) * 0.22);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(spin);
      ctx.globalAlpha = alpha;
      ctx.lineJoin = "miter";
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(244, 248, 252, 0.98)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
        const t = 0.58;
        const bx = Math.cos(a) * rad * t;
        const by = Math.sin(a) * rad * t;
        const br = rad * 0.22;
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(a + 1.05) * br, by + Math.sin(a + 1.05) * br);
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(a - 1.05) * br, by + Math.sin(a - 1.05) * br);
      }
      ctx.stroke();
      ctx.lineWidth = 1.2;
      hexPath(rad * 0.72);
      ctx.stroke();
      ctx.restore();
    }

    function drawFlake(d) {
      if (d.z < 0.04 || d.z > 0.96) return;
      const wave = Math.sin(d.phase || 0);
      const fade = 0.55 + 0.45 * (wave > 0 ? wave * wave : 0);
      const p = projectDrop(d, d.z);
      const wob = Math.sin((d.phase || 0) + d.tx * 0.02) * 9;
      const x = p.x + wob;
      const y = p.y;
      if (x < -18 || y < -18 || x > cssW + 18 || y > cssH + 18) return;
      if (d.shape === "hex") {
        drawHexFlake(x, y, d, fade);
        return;
      }
      const rad = 1.35 + Math.min(d.size, 1.15) * 0.7;
      ctx.globalAlpha = Math.min(0.5, 0.22 + fade * 0.22);
      ctx.fillStyle = "rgba(214, 228, 236, 0.95)";
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    function render(look) {
      if (!ctx) return;
      /* Airborne streaks only. Impacts are ripples in the water sim —
         a white hit dot reads as a hail of specks. Night/dusk/haze stay
         in the water shader so this canvas cannot mosaic the pond. */
      if (!drops.length) {
        releaseOverlay();
        return;
      }
      ensureOverlaySize();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      if (drops.length) {
        ctx.lineCap = "butt";
        ctx.lineJoin = "bevel";
        /* Frosted glass shaft in CSS pixels. Hairline, not scaled by drop size.
           Easy to miss until you look; never a bright white stroke.
           Middle rain stays lineWidth = 1.15. Heavier skies only thicken a little. */
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          if (d.kind === "snow") {
            drawFlake(d);
            continue;
          }
          if (d.z < 0.08 || d.z > 0.9) continue;
          const wave = Math.sin(d.phase || 0);
          const fade = wave > 0 ? wave * wave : 0;
          if (fade < 0.2) continue;
          const head = projectDrop(d, d.z);
          /* Drop size is ripple-only. Streak length and width do not grow with it. */
          const tail = projectDrop(d, Math.min(1, d.z + 0.36));
          const dx = head.x - tail.x;
          const dy = head.y - tail.y;
          const len = Math.hypot(dx, dy) || 1;
          if (len < 12) continue;
          const x1 = tail.x + dx * 0.92;
          const y1 = tail.y + dy * 0.92;
          const sky = look.sky;
          ctx.lineWidth = 1.15;
          let cap = 0.44;
          let floor = 0.2;
          let gain = 0.26;
          if (sky === "drizzle") {
            ctx.lineWidth = 1.05;
            cap = 0.32;
            floor = 0.12;
            gain = 0.16;
          } else if (sky === "heavy_rain") {
            ctx.lineWidth = 1.25;
            cap = 0.5;
            floor = 0.22;
            gain = 0.28;
          } else if (sky === "storm") {
            ctx.lineWidth = 1.45;
            cap = 0.55;
            floor = 0.24;
            gain = 0.3;
          }
          const g = ctx.createLinearGradient(tail.x, tail.y, x1, y1);
          g.addColorStop(0, "rgba(186, 208, 216, 1)");
          g.addColorStop(0.78, "rgba(186, 208, 216, 0.75)");
          g.addColorStop(1, "rgba(186, 208, 216, 0)");
          ctx.strokeStyle = g;
          ctx.globalAlpha = Math.min(cap, floor + fade * gain);
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }

    return {
      sample,
      caption: function (look) {
        return lookCaption(look || sample());
      },
      setPlace,
      resolve,
      start,
      stop,
      resize,
      tick,
      render,
      snap,
      overlayBusy,
      debugDrops: function () {
        return drops.map(function (d) {
          const p = projectDrop(d, d.z);
          const wave = Math.sin(d.phase || 0);
          const wob = d.kind === "snow" ? Math.sin((d.phase || 0) + d.tx * 0.02) * 9 : 0;
          return {
            x: p.x + wob,
            y: p.y,
            z: d.z,
            tx: d.tx,
            ty: d.ty,
            size: d.size,
            fade: wave > 0 ? wave * wave : 0,
            kind: d.kind || "rain",
            shape: d.shape || "dot",
          };
        });
      },
      display: function () {
        return blend ? paintLook(sample(), blend) : sample();
      },
      setRampSec: function (sec) {
        rampTau = clamp(+sec, 0.25, 20) / 2.8;
      },
      onChange: function (fn) {
        listeners.push(fn);
      },
      onResolved: function (fn) {
        resolvedListeners.push(fn);
      },
      place: function () {
        return { lat: lat, lon: lon, tz: tz, mode: placeMode, source: placeSource, city: placeName };
      },
    };
  }

  global.PondClimate = {
    create,
    SHANGHAI,
    GEOJS_URL,
    IPWHO_URL,
    sunElevation,
    skyFromWmo,
    composeLook,
    parseTimeName,
    lookCaption,
    parseGeoJs,
    parseIpwho,
    resolveLocation,
    readLastPlace,
    RAMP_SEC,
  };
})(window);
