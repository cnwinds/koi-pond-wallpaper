/* Real-clock day/night and live weather (Open-Meteo), with offline fallback.
 *
 * Lighting always follows the actual sun at the chosen lat/lon. Weather is
 * fetched at most every 20 minutes, cached, and never blocks the pond.
 */
(function (global) {
  const SHANGHAI = { lat: 31.2304, lon: 121.4737, tz: "Asia/Shanghai", name: "上海" };
  const WEATHER_KEY = "koi-pond-weather-v1";
  const REFRESH_MS = 20 * 60 * 1000;
  const STALE_MS = 6 * 60 * 60 * 1000;
  const GEOJS_URL = "https://get.geojs.io/v1/ip/geo.json";
  const IPWHO_URL = "https://ipwho.is/";

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
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
    else if (named === "night") elev = -22;
    else if (named === "dusk") elev = 0.4;
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
        ? [1.2, 1.08, 0.84]
        : sky === "cloudy"
          ? [0.74, 0.82, 0.9]
          : sky === "rain"
            ? [0.52, 0.64, 0.68]
            : [0.82, 0.88, 0.86];
    const nightTint = [0.28, 0.46, 0.95];
    const tint = [
      lerp(nightTint[0], dayTint[0], dayness),
      lerp(nightTint[1], dayTint[1], dayness),
      lerp(nightTint[2], dayTint[2], dayness),
    ];
    const twilight = Math.exp(-Math.pow((dayness - 0.3) / 0.16, 2));
    tint[0] = lerp(tint[0], 1.38, twilight * 0.55);
    tint[1] = lerp(tint[1], 0.58, twilight * 0.4);
    tint[2] = lerp(tint[2], 0.34, twilight * 0.45);

    let exposure = lerp(0.22, sky === "clear" ? 1.24 : sky === "cloudy" ? 0.78 : sky === "rain" ? 0.58 : 0.7, dayness);
    if (sky === "fog") exposure *= 0.82;

    let causticGain = dayness * (sky === "clear" ? 1.35 : sky === "cloudy" ? 0.16 : 0.05);
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
    const ctx = canvas ? canvas.getContext("2d", { alpha: true, desynchronized: true }) : null;

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
    const listeners = [];

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

    function spawnDrop() {
      return {
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        len: 12 + Math.random() * 18,
        vy: 420 + Math.random() * 260,
        vx: -40 - Math.random() * 50,
        a: 0.28 + Math.random() * 0.32,
      };
    }

    function tick(dt, look, quality, water, calm) {
      const want = calm ? 0 : Math.round((quality.rainStreaks || 0) * (look.rain || 0));
      while (drops.length < want) drops.push(spawnDrop());
      while (drops.length > want) drops.pop();
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.vy * dt;
        d.x += d.vx * dt;
        if (d.y > cssH + 16 || d.x < -20) {
          d.x = Math.random() * cssW;
          d.y = -12;
        }
      }
      if (!calm && look.rain > 0 && water && quality.rainDrips) {
        dripT += dt * look.rain * quality.rainDrips * 2.2;
        while (dripT >= 1) {
          dripT -= 1;
          water.impulse(Math.random() * 0.92 + 0.04, Math.random() * 0.88 + 0.06, 0.07 + Math.random() * 0.06);
        }
      } else {
        dripT = 0;
      }
    }

    function render(look) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const night = 1 - look.dayness;
      if (night > 0.02) {
        ctx.fillStyle = "rgba(2, 8, 20, " + (night * 0.55).toFixed(3) + ")";
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
        vg.addColorStop(1, "rgba(0, 2, 10, " + (night * 0.42).toFixed(3) + ")");
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
        ctx.fillStyle = "rgba(255, 118, 52, " + (dusk * 0.2).toFixed(3) + ")";
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
        const fogA = look.sky === "fog" ? 0.55 : 0.28;
        g.addColorStop(0, "rgba(176, 192, 190, " + (look.haze * 0.16).toFixed(3) + ")");
        g.addColorStop(1, "rgba(158, 174, 178, " + (look.haze * fogA).toFixed(3) + ")");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (drops.length) {
        ctx.strokeStyle = "rgba(214, 228, 232, 0.78)";
        ctx.lineWidth = 1.35;
        ctx.lineCap = "round";
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.globalAlpha = d.a;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.vx * 0.018, d.y - d.len);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(210, 224, 228, 0.28)";
        for (let i = 0; i < drops.length; i += 3) {
          const d = drops[i];
          ctx.beginPath();
          ctx.ellipse(d.x, Math.min(cssH - 4, d.y + 8), 3.2, 1.1, 0, 0, Math.PI * 2);
          ctx.fill();
        }
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
  };
})(window);
