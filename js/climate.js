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

  function placeLabel(lat, lon) {
    if (nearShanghai(lat, lon)) return SHANGHAI.name;
    const ns = lat >= 0 ? "N" : "S";
    const ew = lon >= 0 ? "E" : "W";
    return Math.abs(lat).toFixed(2) + "°" + ns + " " + Math.abs(lon).toFixed(2) + "°" + ew;
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

  function composeLook(lat, lon, date, weather, overrideSky) {
    const elev = sunElevation(lat, lon, date || new Date());
    const dayness = smoothstep(-7, 7, elev);
    const sky = overrideSky || (weather && weather.sky) || "clear";
    const clouds = weather && weather.clouds != null ? weather.clouds : sky === "clear" ? 12 : 70;
    const precip = weather && weather.precip != null ? weather.precip : sky === "rain" ? 0.6 : 0;
    const windKmh = weather && weather.windKmh != null ? weather.windKmh : 4;
    const windDir = weather && weather.windDir != null ? weather.windDir : 90;

    let rain = 0;
    if (sky === "rain") rain = clamp(0.28 + precip * 0.45, 0.28, 1);
    let fog = sky === "fog" ? 0.72 : sky === "rain" ? 0.18 : 0;
    if (sky === "cloudy") fog += 0.08;

    const dayTint =
      sky === "clear"
        ? [1.05, 1.02, 0.96]
        : sky === "cloudy"
          ? [0.9, 0.94, 0.97]
          : sky === "rain"
            ? [0.82, 0.88, 0.9]
            : [0.88, 0.93, 0.96];
    const nightTint = [0.68, 0.86, 1.0];
    const tint = [
      lerp(nightTint[0], dayTint[0], dayness),
      lerp(nightTint[1], dayTint[1], dayness),
      lerp(nightTint[2], dayTint[2], dayness),
    ];

    let exposure = lerp(0.4, sky === "clear" ? 1.08 : sky === "cloudy" ? 0.92 : 0.8, dayness);
    if (sky === "fog") exposure *= 0.9;

    let causticGain = dayness * (sky === "clear" ? 1 : sky === "cloudy" ? 0.32 : 0.12);
    const haze = clamp(fog * 0.55 + (1 - dayness) * 0.06 + (clouds / 100) * 0.08, 0, 0.7);
    const windAmp = clamp(windKmh / 28, 0, 1.35);
    const from = (windDir * Math.PI) / 180;
    const wind = {
      x: -Math.sin(from) * windAmp * 5.5,
      y: Math.cos(from) * windAmp * 3.6,
    };
    const ambientMul =
      (0.62 + 0.5 * dayness) * (1 + windAmp * 0.4) * (sky === "rain" ? 1.18 : 1);

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
      place: placeLabel(lat, lon),
    };
  }

  function lookCaption(look) {
    const phase = look.dayness > 0.82 ? "昼" : look.dayness > 0.18 ? "晨昏" : "夜";
    const sky =
      look.sky === "clear" ? "晴" : look.sky === "cloudy" ? "阴" : look.sky === "rain" ? "雨" : "雾";
    const src = look.source === "live" ? "" : look.source === "cache" ? " · 缓存" : " · 离线";
    return look.place + " · " + sky + " · " + phase + src;
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
    let overrideSky = options.sky || null;
    let weather = readCache(lat, lon) || emptyWeather();
    let fetching = false;
    let timer = 0;
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
      return composeLook(lat, lon, date || new Date(), weather, overrideSky);
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
      if (next.lat != null && Math.abs(next.lat - lat) > 0.0001) {
        lat = next.lat;
        changed = true;
      }
      if (next.lon != null && Math.abs(next.lon - lon) > 0.0001) {
        lon = next.lon;
        changed = true;
      }
      if (next.tz && next.tz !== tz) {
        tz = next.tz;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(next, "sky")) {
        overrideSky = next.sky || null;
        changed = true;
      }
      if (changed) {
        const cached = readCache(lat, lon);
        if (cached) weather = cached;
        emit();
        fetchWeather();
      }
    }

    function start() {
      const fresh = weather.source === "cache" && Date.now() - weather.fetchedAt < REFRESH_MS;
      if (!fresh) fetchWeather();
      if (timer) global.clearInterval(timer);
      timer = global.setInterval(fetchWeather, REFRESH_MS);
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
        len: 7 + Math.random() * 12,
        vy: 340 + Math.random() * 200,
        vx: -28 - Math.random() * 36,
        a: 0.1 + Math.random() * 0.14,
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
        ctx.fillStyle = "rgba(3, 12, 16, " + (night * 0.24).toFixed(3) + ")";
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (look.haze > 0.02) {
        const g = ctx.createRadialGradient(
          cssW * 0.5,
          cssH * 0.42,
          Math.min(cssW, cssH) * 0.1,
          cssW * 0.5,
          cssH * 0.5,
          Math.max(cssW, cssH) * 0.74
        );
        g.addColorStop(0, "rgba(168, 188, 186, " + (look.haze * 0.07).toFixed(3) + ")");
        g.addColorStop(1, "rgba(148, 168, 172, " + (look.haze * 0.32).toFixed(3) + ")");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (drops.length) {
        ctx.strokeStyle = "rgba(206, 220, 222, 0.5)";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.globalAlpha = d.a;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.vx * 0.016, d.y - d.len);
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
      start,
      stop,
      resize,
      tick,
      render,
      onChange: function (fn) {
        listeners.push(fn);
      },
      place: function () {
        return { lat: lat, lon: lon, tz: tz };
      },
    };
  }

  global.PondClimate = {
    create,
    SHANGHAI,
    sunElevation,
    skyFromWmo,
    composeLook,
    lookCaption,
  };
})(window);
