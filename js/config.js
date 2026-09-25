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
      power: "default",
    },
  };

  const defaults = {
    fish: 7,
    quality: "mid",
    fps: 30,
    ui: true,
    demo: false,
  };

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
    }

    function queryString() {
      const q = new URLSearchParams();
      q.set("fish", String(state.fish));
      q.set("quality", state.quality);
      q.set("fps", String(state.fps));
      q.set("ui", state.ui ? "1" : "0");
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
    QUALITY_NAMES,
    STORE_KEY,
  };
})(window);
