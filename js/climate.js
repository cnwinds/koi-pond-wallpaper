/* Real-clock day/night and live weather (Open-Meteo), with offline fallback.
 *
 * Lighting always follows the actual sun at the chosen lat/lon. Weather is
 * fetched at most every 20 minutes, cached, and never blocks the pond.
 * Displayed light/weather eases toward the target so previews and live
 * updates fade (rain starts/stops, day↔night) instead of snapping.
 * Rain is drawn as drops falling onto the water from above (top-down),
 * not as screen-Y streaks.
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

  function skyFromWmo(code, clouds, vis, precip) {
    code = code | 0;
    if (code === 45 || code === 48 || (vis != null && vis < 800)) return "fog";
    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      (code >= 95 && code <= 99) ||
      (precip || 0) >= 0.1
    ) {
      return "rain";
    }
    if (code >= 3 || (clouds || 0) >= 55) return "cloudy";
    if (code === 2 || (clouds || 0) >= 40) return "cloudy";
    return "clear";
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
    const clouds = weather && weather.clouds != null ? weather.clouds : sky === "clear" ? 12 : sky === "cloudy" ? 78 : 55;
    const precip = weather && weather.precip != null ? weather.precip : sky === "rain" ? 1.2 : 0;
    const windKmh = weather && weather.windKmh != null ? weather.windKmh : sky === "rain" ? 14 : 4;
    const windDir = weather && weather.windDir != null ? weather.windDir : 90;

    let rain = 0;
    if (sky === "rain") rain = clamp(0.72 + precip * 0.22, 0.72, 1);
    let fog = sky === "fog" ? 0.92 : sky === "rain" ? 0.28 : 0;
    if (sky === "cloudy") fog += 0.16;

    const dayTint =
      sky === "clear"
        ? [1.04, 1.06, 0.96]
        : sky === "cloudy"
          ? [0.72, 0.8, 0.88]
          : sky === "rain"
            ? [0.5, 0.62, 0.66]
            : [0.8, 0.86, 0.84];
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

    let exposure = lerp(0.32, sky === "clear" ? 1.06 : sky === "cloudy" ? 0.74 : sky === "rain" ? 0.56 : 0.68, dayness);
    if (sky === "fog") exposure *= 0.82;

    let causticGain = dayness * (sky === "clear" ? 1.15 : sky === "cloudy" ? 0.16 : 0.05);
    const haze = clamp(fog * 0.72 + (1 - dayness) * 0.14 + (clouds / 100) * 0.12, 0, 0.88);
    const windAmp = clamp(windKmh / 28, 0, 1.35);
    const from = (windDir * Math.PI) / 180;
    const wind = {
      x: -Math.sin(from) * windAmp * 5.5,
      y: Math.cos(from) * windAmp * 3.6,
    };
    const ambientMul =
      (0.55 + 0.6 * dayness) * (1 + windAmp * 0.45) * (sky === "rain" ? 1.35 : 1);

    return {
      lat: lat,
      lon: lon,
      elev: elev,
      dayness: dayness,
      sky: sky,
      rain: rain,
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
    const sky =
      look.sky === "clear" ? "晴" : look.sky === "cloudy" ? "阴" : look.sky === "rain" ? "雨" : "雾";
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
    const hits = [];
    const listeners = [];
    let blend = null;
    let rampTau = options.rampSec != null ? clamp(+options.rampSec, 0.25, 20) / 2.8 : RAMP_SEC / 2.8;

    function captureBlend(look) {
      return {
        dayness: look.dayness,
        rain: look.rain,
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
        sky: skyFromWmo(cur.weather_code, cur.cloud_cover, cur.visibility, cur.precipitation),
        clouds: cur.cloud_cover != null ? cur.cloud_cover : 30,
        precip: cur.precipitation != null ? cur.precipitation : 0,
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
        "&current=weather_code,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,precipitation,is_day" +
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

    function resize(w, h, pixelRatio) {
      cssW = w;
      cssH = h;
      dpr = pixelRatio;
      if (!canvas) return;
      canvas.width = Math.max(1, Math.round(w * pixelRatio));
      canvas.height = Math.max(1, Math.round(h * pixelRatio));
    }

    function spawnDrop(fromSky) {
      return {
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        z: fromSky ? 1 : Math.random(),
        vz: 0.95 + Math.random() * 0.45,
        driftX: (Math.random() - 0.5) * 16,
        driftY: (Math.random() - 0.5) * 16,
        a: 0.32 + Math.random() * 0.28,
      };
    }

    function recycleDrop(d) {
      d.x = Math.random() * cssW;
      d.y = Math.random() * cssH;
      d.z = 0.78 + Math.random() * 0.22;
      d.vz = 0.95 + Math.random() * 0.45;
      d.driftX = (Math.random() - 0.5) * 16;
      d.driftY = (Math.random() - 0.5) * 16;
      d.a = 0.32 + Math.random() * 0.28;
    }

    function tick(dt, target, quality, water, calm) {
      const look = stepBlend(target, dt, calm);
      const want = calm ? 0 : Math.round((quality.rainStreaks || 0) * (look.rain || 0));
      while (drops.length < want) drops.push(spawnDrop(true));
      while (drops.length > want) drops.pop();
      const landed = [];
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.z -= d.vz * dt * (0.42 + 0.58 * Math.max(d.z, 0));
        d.x += d.driftX * dt;
        d.y += d.driftY * dt;
        if (d.x < -8) d.x += cssW + 16;
        if (d.x > cssW + 8) d.x -= cssW + 16;
        if (d.y < -8) d.y += cssH + 16;
        if (d.y > cssH + 8) d.y -= cssH + 16;
        if (d.z <= 0) {
          hits.push({ x: d.x, y: d.y, age: 0 });
          if (hits.length > 28) hits.shift();
          landed.push(d);
          recycleDrop(d);
        }
      }
      for (let i = hits.length - 1; i >= 0; i--) {
        hits[i].age += dt;
        if (hits[i].age > 0.2) hits.splice(i, 1);
      }
      if (!calm && look.rain > 0.03 && water && quality.rainDrips) {
        dripT += dt * look.rain * quality.rainDrips * 2.2;
        while (dripT >= 1 && landed.length) {
          dripT -= 1;
          const d = landed.pop();
          water.impulse(d.x / cssW, d.y / cssH, 0.07 + Math.random() * 0.06);
        }
        if (dripT > 2) dripT = 2;
      } else {
        dripT = 0;
      }
      return look;
    }

    function render(look) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const night = 1 - look.dayness;
      if (night > 0.02) {
        ctx.fillStyle = "rgba(2, 8, 22, " + (night * 0.3).toFixed(3) + ")";
        ctx.fillRect(0, 0, cssW, cssH);
        const vg = ctx.createRadialGradient(
          cssW * 0.5,
          cssH * 0.42,
          Math.min(cssW, cssH) * 0.18,
          cssW * 0.5,
          cssH * 0.5,
          Math.max(cssW, cssH) * 0.78
        );
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0, 2, 12, " + (night * 0.28).toFixed(3) + ")");
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, cssW, cssH);
        if (night > 0.45) {
          const mx = cssW * 0.78;
          const my = cssH * 0.14;
          const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 70);
          mg.addColorStop(0, "rgba(230, 236, 248, " + (0.42 * night).toFixed(3) + ")");
          mg.addColorStop(0.28, "rgba(180, 200, 230, " + (0.14 * night).toFixed(3) + ")");
          mg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = mg;
          ctx.fillRect(mx - 80, my - 80, 160, 160);
        }
      }
      if (look.dayness > 0.12 && look.dayness < 0.55) {
        const dusk = Math.exp(-Math.pow((look.dayness - 0.3) / 0.16, 2));
        ctx.fillStyle = "rgba(255, 132, 64, " + (dusk * 0.14).toFixed(3) + ")";
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (look.haze > 0.02) {
        const g = ctx.createRadialGradient(
          cssW * 0.5,
          cssH * 0.42,
          Math.min(cssW, cssH) * 0.08,
          cssW * 0.5,
          cssH * 0.5,
          Math.max(cssW, cssH) * 0.74
        );
        const fogA = 0.28 + (look.fog || 0) * 0.3;
        g.addColorStop(0, "rgba(176, 192, 190, " + (look.haze * 0.16).toFixed(3) + ")");
        g.addColorStop(1, "rgba(158, 174, 178, " + (look.haze * fogA).toFixed(3) + ")");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (drops.length) {
        const cx = cssW * 0.5;
        const cy = cssH * 0.45;
        ctx.lineCap = "round";
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          const near = clamp(1 - d.z, 0, 1);
          const ease = near * near * (3 - 2 * near);
          const alpha = d.a * (0.34 + 0.66 * ease);
          const headR = 0.85 + 1.7 * ease;
          const tail = 2.4 + 7.2 * ease;
          const px = d.x - cx;
          const py = d.y - cy;
          const plen = Math.hypot(px, py) || 1;
          const ux = d.driftX * 0.03 + (px / plen) * 0.32 * d.z;
          const uy = d.driftY * 0.03 + (py / plen) * 0.32 * d.z;
          ctx.strokeStyle = "rgba(226, 236, 240, 0.9)";
          ctx.fillStyle = "rgba(232, 240, 244, 1)";
          ctx.lineWidth = 1.15;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(d.x + ux * tail, d.y + uy * tail);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, d.y, headR, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (hits.length) {
        for (let i = 0; i < hits.length; i++) {
          const hit = hits[i];
          const t = clamp(hit.age / 0.18, 0, 1);
          ctx.globalAlpha = 0.55 * (1 - t);
          ctx.fillStyle = "rgba(230, 238, 242, 1)";
          ctx.beginPath();
          ctx.arc(hit.x, hit.y, 2.7, 0, Math.PI * 2);
          ctx.fill();
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
