/* Shared settings: query params, localStorage, Lively properties, quality presets. */
(function (global) {
  const STORE_KEY = "koi-pond-wallpaper-v1";
  const QUALITY_NAMES = ["low", "mid", "high"];

  const presets = {
    low: {
      ripple: 160,
      dpr: 1,
      caustics: false,
      particles: 18,
      pads: 3,
      blurShadow: false,
      ambientWaves: 0.55,
      spineSlices: 16,
      rainStreaks: 0,
      rainDrips: 0.35,
      lifeDistort: 0.055,
      power: "low-power",
    },
    mid: {
      ripple: 320,
      dpr: 1.25,
      caustics: true,
      particles: 42,
      pads: 5,
      blurShadow: true,
      ambientWaves: 1,
      spineSlices: 24,
      rainStreaks: 72,
      rainDrips: 1.6,
      lifeDistort: 0.09,
      power: "low-power",
    },
    high: {
      ripple: 512,
      dpr: 2,
      caustics: true,
      particles: 72,
      pads: 7,
      blurShadow: true,
      ambientWaves: 1.15,
      spineSlices: 32,
      rainStreaks: 130,
      rainDrips: 2.4,
      lifeDistort: 0.12,
      power: "default",
    },
  };

  const defaults = {
    fish: 7,
    quality: "mid",
    fps: 30,
    ui: true,
    demo: false,
    lat: 31.2304,
    lon: 121.4737,
    tz: "Asia/Shanghai",
    sky: null,
    time: null,
    hour: null,
    placeMode: "auto",
    placeSource: "default",
    city: "",
  };

  const SKY_NAMES = ["clear", "cloudy", "rain", "fog"];
  const TIME_NAMES = ["day", "dusk", "dawn", "night"];

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function parseQuality(value) {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return QUALITY_NAMES[clamp(value | 0, 0, 2)];
    }
    const key = String(value || "").toLowerCase();
    if (key === "medium") return "mid";
    if (QUALITY_NAMES.indexOf(key) >= 0) return key;
    return null;
  }

  function parseSky(value) {
    if (value == null || value === "" || value === "auto") return null;
    const key = String(value || "").toLowerCase();
    if (key === "overcast") return "cloudy";
    if (key === "mist") return "fog";
    if (SKY_NAMES.indexOf(key) >= 0) return key;
    return null;
  }

  function parseTime(value) {
    if (value == null || value === "" || value === "auto") return null;
    const key = String(value).toLowerCase();
    if (key === "dawn") return "dusk";
    if (TIME_NAMES.indexOf(key) >= 0) return key === "dawn" ? "dusk" : key;
    return null;
  }

  function parseHour(value) {
    if (value == null || value === "") return null;
    const n = parseFloat(value);
    if (Number.isNaN(n)) return null;
    return clamp(n, 0, 24);
  }

  function parseCoord(value, lo, hi) {
    const n = parseFloat(value);
    if (Number.isNaN(n)) return null;
    return clamp(n, lo, hi);
  }

  function readStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  }

  function writeStore(state) {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          fish: state.fish,
          quality: state.quality,
          fps: state.fps,
          ui: state.ui,
          lat: state.lat,
          lon: state.lon,
          tz: state.tz,
          placeMode: state.placeMode,
          placeSource: state.placeSource,
          city: state.city,
        })
      );
    } catch (err) {
      /* private mode / file restrictions */
    }
  }

  function parseQuery(search) {
    const q = new URLSearchParams(search || global.location.search);
    const next = {};
    if (q.has("fish") || q.has("count")) {
      next.fish = clamp(parseInt(q.get("fish") || q.get("count"), 10), 1, 16);
    }
    if (q.has("quality") || q.has("q")) {
      const quality = parseQuality(q.get("quality") || q.get("q"));
      if (quality) next.quality = quality;
    }
    if (q.has("fps")) next.fps = clamp(parseInt(q.get("fps"), 10), 8, 60);
    if (q.has("ui")) next.ui = q.get("ui") !== "0" && q.get("ui") !== "false";
    if (q.has("demo")) next.demo = q.get("demo") !== "0" && q.get("demo") !== "false";
    if (q.has("lat")) {
      const lat = parseCoord(q.get("lat"), -90, 90);
      if (lat != null) next.lat = lat;
    }
    if (q.has("lon")) {
      const lon = parseCoord(q.get("lon"), -180, 180);
      if (lon != null) next.lon = lon;
    }
    if (q.has("tz") && q.get("tz")) next.tz = q.get("tz");
    if (q.has("weather") || q.has("sky")) {
      const sky = parseSky(q.get("weather") || q.get("sky"));
      next.sky = sky;
    }
    if (q.has("time") || q.has("light")) {
      next.time = parseTime(q.get("time") || q.get("light"));
    }
    if (q.has("hour")) next.hour = parseHour(q.get("hour"));
    if (q.has("lat") || q.has("lon")) next.placeMode = "manual";
    if (q.get("place") === "auto") next.placeMode = "auto";
    if (q.get("place") === "manual") next.placeMode = "manual";
    return next;
  }

  function create() {
    const stored = readStore();
    const query = parseQuery();
    const state = Object.assign({}, defaults, stored, query);
    state.fish = clamp(state.fish | 0, 1, 16);
    state.quality = parseQuality(state.quality) || "mid";
    state.fps = clamp(state.fps | 0, 8, 60);
    state.ui = !!state.ui;
    state.demo = !!state.demo;
    state.lat = parseCoord(state.lat, -90, 90);
    if (state.lat == null) state.lat = defaults.lat;
    state.lon = parseCoord(state.lon, -180, 180);
    if (state.lon == null) state.lon = defaults.lon;
    state.tz = state.tz || defaults.tz;
    state.sky = parseSky(state.sky);
    state.time = parseTime(state.time);
    state.hour = parseHour(state.hour);
    if (query.placeMode === "manual" || query.placeMode === "auto") {
      state.placeMode = query.placeMode;
    } else if (stored.placeMode === "manual" || stored.placeMode === "auto") {
      state.placeMode = stored.placeMode;
    } else {
      const pinned =
        Math.abs(state.lat - defaults.lat) > 0.0005 || Math.abs(state.lon - defaults.lon) > 0.0005;
      state.placeMode = pinned ? "manual" : "auto";
    }
    state.placeSource = state.placeSource || (state.placeMode === "manual" ? "manual" : "default");
    state.city = state.city ? String(state.city) : "";
    state.reducedMotion = !!(
      global.matchMedia &&
      global.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const listeners = [];

    function preset() {
      return presets[state.quality] || presets.mid;
    }

    function emit(reason) {
      for (let i = 0; i < listeners.length; i++) listeners[i](state, reason);
    }

    function assign(partial, reason) {
      let changed = false;
      if (partial.fish != null) {
        const fish = clamp(partial.fish | 0, 1, 16);
        if (fish !== state.fish) {
          state.fish = fish;
          changed = true;
        }
      }
      if (partial.quality != null) {
        const quality = parseQuality(partial.quality);
        if (quality && quality !== state.quality) {
          state.quality = quality;
          changed = true;
        }
      }
      if (partial.fps != null) {
        const fps = clamp(partial.fps | 0, 8, 60);
        if (fps !== state.fps) {
          state.fps = fps;
          changed = true;
        }
      }
      if (partial.ui != null && !!partial.ui !== state.ui) {
        state.ui = !!partial.ui;
        changed = true;
      }
      if (partial.lat != null) {
        const lat = parseCoord(partial.lat, -90, 90);
        if (lat != null && Math.abs(lat - state.lat) > 0.0001) {
          state.lat = lat;
          changed = true;
        }
      }
      if (partial.lon != null) {
        const lon = parseCoord(partial.lon, -180, 180);
        if (lon != null && Math.abs(lon - state.lon) > 0.0001) {
          state.lon = lon;
          changed = true;
        }
      }
      if (partial.tz && partial.tz !== state.tz) {
        state.tz = partial.tz;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(partial, "sky")) {
        const sky = parseSky(partial.sky);
        if (sky !== state.sky) {
          state.sky = sky;
          changed = true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(partial, "time")) {
        const time = parseTime(partial.time);
        if (time !== state.time) {
          state.time = time;
          changed = true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(partial, "hour")) {
        const hour = parseHour(partial.hour);
        if (hour !== state.hour) {
          state.hour = hour;
          changed = true;
        }
      }
      if (partial.placeMode === "auto" || partial.placeMode === "manual") {
        if (partial.placeMode !== state.placeMode) {
          state.placeMode = partial.placeMode;
          changed = true;
        }
      }
      if (partial.placeSource != null && String(partial.placeSource) !== state.placeSource) {
        state.placeSource = String(partial.placeSource);
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(partial, "city")) {
        const city = partial.city ? String(partial.city) : "";
        if (city !== state.city) {
          state.city = city;
          changed = true;
        }
      }
      if (changed) {
        writeStore(state);
        emit(reason || "change");
      }
      return changed;
    }

    function applyLively(name, val) {
      if (name === "fishCount") assign({ fish: val }, "lively");
      else if (name === "quality") assign({ quality: val }, "lively");
      else if (name === "fps") assign({ fps: val }, "lively");
      else if (name === "showUi") assign({ ui: val }, "lively");
      else if (name === "lat" || name === "latitude") {
        const lat = parseCoord(val, -90, 90);
        if (lat == null) return;
        const pin = Math.abs(lat - defaults.lat) > 0.0005;
        assign(
          {
            lat: lat,
            placeMode: pin ? "manual" : state.placeMode,
            placeSource: pin ? "manual" : state.placeSource,
          },
          "lively"
        );
      } else if (name === "lon" || name === "longitude") {
        const lon = parseCoord(val, -180, 180);
        if (lon == null) return;
        const pin = Math.abs(lon - defaults.lon) > 0.0005;
        assign(
          {
            lon: lon,
            placeMode: pin ? "manual" : state.placeMode,
            placeSource: pin ? "manual" : state.placeSource,
          },
          "lively"
        );
      } else if (name === "tz" || name === "timezone") assign({ tz: val }, "lively");
      else if (name === "previewTime") {
        const times = [null, "day", "dusk", "night"];
        if (typeof val === "number") assign({ time: times[clamp(val | 0, 0, 3)] }, "lively");
        else assign({ time: parseTime(val) }, "lively");
      } else if (name === "previewWeather") {
        const skies = [null, "clear", "cloudy", "rain", "fog"];
        if (typeof val === "number") assign({ sky: skies[clamp(val | 0, 0, 4)] }, "lively");
        else assign({ sky: parseSky(val) }, "lively");
      }
    }

    function queryString() {
      const q = new URLSearchParams();
      q.set("fish", String(state.fish));
      q.set("quality", state.quality);
      q.set("fps", String(state.fps));
      q.set("ui", state.ui ? "1" : "0");
      if (state.placeMode === "manual") {
        q.set("lat", state.lat.toFixed(4));
        q.set("lon", state.lon.toFixed(4));
        q.set("place", "manual");
      }
      if (state.sky) q.set("weather", state.sky);
      if (state.time) q.set("time", state.time);
      if (state.hour != null) q.set("hour", String(state.hour));
      return q.toString();
    }

    return {
      state,
      presets,
      defaults,
      preset,
      assign,
      applyLively,
      onChange: function (fn) {
        listeners.push(fn);
      },
      queryString,
      writeStore: function () {
        writeStore(state);
      },
    };
  }

  global.PondConfig = {
    create,
    parseQuality,
    parseSky,
    parseTime,
    parseHour,
    QUALITY_NAMES,
    STORE_KEY,
  };
})(window);
