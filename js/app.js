/* Boot, input, settings HUD, visibility/power, and the frame loop. */
(function (global) {
  const config = PondConfig.create();
  const waterCanvas = document.getElementById("water");
  const lifeCanvas = document.getElementById("life");
  const wxCanvas = document.getElementById("wx");
  const hud = document.getElementById("hud");
  const gear = document.getElementById("gear");
  const panel = document.getElementById("panel");
  const toast = document.getElementById("toast");
  const fishRange = document.getElementById("fishRange");
  const fishOut = document.getElementById("fishOut");
  const qualitySelect = document.getElementById("qualitySelect");
  const fpsRange = document.getElementById("fpsRange");
  const fpsOut = document.getElementById("fpsOut");
  const latInput = document.getElementById("latInput");
  const lonInput = document.getElementById("lonInput");
  const placeAutoBtn = document.getElementById("placeAutoBtn");
  const placeGeoBtn = document.getElementById("placeGeoBtn");
  const skyNote = document.getElementById("skyNote");
  const rendererNote = document.getElementById("rendererNote");
  const timeSelect = document.getElementById("timeSelect");
  const weatherSelect = document.getElementById("weatherSelect");
  const previewAutoBtn = document.getElementById("previewAutoBtn");

  const sprites = PondSprites.createLibrary();
  let water = PondWater.create(waterCanvas, config.preset());
  const world = PondWorld.create(lifeCanvas, { sprites });
  const climate = PondClimate.create({
    canvas: wxCanvas,
    lat: config.state.lat,
    lon: config.state.lon,
    tz: config.state.tz,
    sky: config.state.sky,
    time: config.state.time,
    hour: config.state.hour,
    placeMode: config.state.placeMode,
    placeSource: config.state.placeSource,
    city: config.state.city,
  });

  let cssW = 1;
  let cssH = 1;
  let pixelW = 1;
  let pixelH = 1;
  let running = false;
  let hiddenPause = false;
  let livelyPause = false;
  let harnessHold = false;
  let blurFps = null;
  let raf = 0;
  let last = 0;
  let acc = 0;
  let demoT = 0;
  let time = 0;

  function dprCap() {
    const want = config.preset().dpr;
    const view = global.visualViewport;
    const raw = (view && view.scale ? global.devicePixelRatio * view.scale : global.devicePixelRatio) || 1;
    return Math.max(1, Math.min(raw, want));
  }

  function allocCanvas(cv, w, h, force) {
    if (force && cv.width === w && cv.height === h) {
      cv.width = Math.max(1, w - 1);
    }
    if (cv.width !== w) cv.width = w;
    if (cv.height !== h) cv.height = h;
  }

  function resize(opts) {
    opts = opts || {};
    cssW = Math.max(1, global.innerWidth || document.documentElement.clientWidth);
    cssH = Math.max(1, global.innerHeight || document.documentElement.clientHeight);
    const dpr = dprCap();
    pixelW = Math.max(1, Math.round(cssW * dpr));
    pixelH = Math.max(1, Math.round(cssH * dpr));
    const force = !!opts.forceRealloc;
    allocCanvas(waterCanvas, pixelW, pixelH, force);
    allocCanvas(lifeCanvas, pixelW, pixelH, force);
    world.resize(cssW, cssH, dpr);
    climate.resize(cssW, cssH, dpr, force);
    refreshLife = true;
  }

  let lastQuality = config.state.quality;
  let refreshLife = false;
  let surfaceCheckT = 0;
  let weatherRecovered = true;

  function applyWorldSettings() {
    const preset = config.preset();
    world.setFishCount(config.state.fish);
    world.setPadCount(preset.pads);
    world.setMoteCount(preset.particles);
    if (config.state.quality !== lastQuality) {
      lastQuality = config.state.quality;
      water.setQuality(preset);
      resize({ forceRealloc: true });
    }
  }

  function syncHud() {
    const s = config.state;
    if (fishRange) fishRange.value = String(s.fish);
    if (fishOut) fishOut.value = String(s.fish);
    if (qualitySelect) qualitySelect.value = s.quality;
    if (fpsRange) fpsRange.value = String(s.fps);
    if (fpsOut) fpsOut.value = String(s.fps);
    if (latInput && document.activeElement !== latInput) latInput.value = s.lat.toFixed(2);
    if (lonInput && document.activeElement !== lonInput) lonInput.value = s.lon.toFixed(2);
    if (hud) {
      hud.classList.toggle("is-hidden", !s.ui);
    }
    if (rendererNote) {
      rendererNote.textContent =
        (water.kind() === "webgl2" ? "WebGL2" : "Canvas 2D") + " · " + s.quality;
    }
    if (skyNote) skyNote.textContent = climate.caption();
    if (timeSelect) timeSelect.value = s.time || "";
    if (weatherSelect) weatherSelect.value = s.sky || "";
  }

  let lastBg = "";

  function applyCssGrade(look) {
    const e = look.exposure;
    const t = look.tint;
    const r = Math.round(10 * t[0] * e);
    const g = Math.round(26 * t[1] * e);
    const b = Math.round(28 * t[2] * e);
    const bg = "rgb(" + r + ", " + g + ", " + b + ")";
    if (bg === lastBg) return;
    lastBg = bg;
    document.body.style.background = bg;
    document.documentElement.style.background = bg;
  }

  function currentFps() {
    if (hiddenPause || livelyPause) return 0;
    if (blurFps != null) return Math.min(config.state.fps, blurFps);
    return config.state.fps;
  }

  function drawFrame(dt) {
    dt = Math.min(0.05, Math.max(0, dt || 0.016));
    time += dt;
    const preset = config.preset();
    const target = climate.sample();
    const calm = config.state.reducedMotion;
    const look = climate.tick(dt, target, preset, water, calm) || target;
    const ambient = (calm ? 0.25 : preset.ambientWaves) * look.ambientMul;
    if (water.setRain) water.setRain(look.rain);
    const veil = Math.max(look.haze || 0, look.fog || 0, look.rain || 0);
    const targetClear =
      (target.sky || "clear") === "clear" ||
      ((target.rain || 0) < 0.04 && (target.haze || 0) < 0.1 && (target.fog || 0) < 0.1);
    const blending =
      Math.abs((look.rain || 0) - (target.rain || 0)) > 0.015 ||
      Math.abs((look.dayness || 0) - (target.dayness || 0)) > 0.015 ||
      Math.abs((look.haze || 0) - (target.haze || 0)) > 0.02 ||
      Math.abs((look.fog || 0) - (target.fog || 0)) > 0.02;
    const settledClear =
      targetClear &&
      !blending &&
      (look.rain || 0) < 0.04 &&
      Math.abs((look.fog || 0) - (target.fog || 0)) < 0.02;
    if (!targetClear || blending) {
      weatherRecovered = false;
    } else if (!weatherRecovered && settledClear) {
      weatherRecovered = true;
      /* Same FBO rebuild+clear as a quality toggle. Do not 1px-realloc
         the display canvases mid-fade: that was a same-call no-op on
         WebView2 and left the 2D weather layer in place. */
      if (water.recoverSim) water.recoverSim();
      refreshLife = true;
    }
    surfaceCheckT += dt;
    if (surfaceCheckT > 0.5) {
      surfaceCheckT = 0;
      if (water.bufferMismatch && water.bufferMismatch(pixelW, pixelH)) {
        resize({ forceRealloc: true });
      }
    }
    const rainLeft = water.rainSettleLeft ? water.rainSettleLeft() : 0;
    const rippleCalm = Math.min(1, veil * 0.95 + (rainLeft > 0 ? 0.28 : 0));
    const causticsOn =
      preset.caustics && !calm && look.causticGain > 0.15 && veil < 0.08 && rippleCalm < 0.35;
    water.update(dt);
    world.update(dt, water, preset, look);
    world.render(preset, look);
    const needLife = refreshLife;
    refreshLife = false;
    water.render(cssW, cssH, pixelW, pixelH, time, {
      caustics: causticsOn,
      ambient: ambient,
      exposure: look.exposure,
      tint: look.tint,
      causticGain: look.causticGain,
      haze: look.haze,
      fog: look.fog,
      dayness: look.dayness,
      rippleCalm: rippleCalm,
      distort: calm ? preset.lifeDistort * 0.35 : preset.lifeDistort,
      life: lifeCanvas,
      refreshLife: needLife,
    });
    climate.render(look);
    applyCssGrade(look);

    if (config.state.demo) {
      demoT += dt;
      if (demoT > 7) {
        demoT = 0;
        world.feed(cssW * (0.3 + Math.random() * 0.4), cssH * (0.3 + Math.random() * 0.4), water);
      }
    }
    return look;
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (hiddenPause || livelyPause || harnessHold) return;
    if (!last) last = now;
    const raw = Math.min(0.05, (now - last) / 1000);
    last = now;
    const fps = currentFps();
    if (fps <= 0) return;
    acc += raw;
    const step = 1 / fps;
    if (acc < step - 0.001) return;
    const dt = Math.min(0.05, acc);
    acc = 0;
    drawFrame(dt);
  }

  function start() {
    if (running) return;
    running = true;
    last = 0;
    acc = 0;
    raf = requestAnimationFrame(loop);
  }

  function stopDraw() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    running = false;
  }

  function pointerPos(ev) {
    const src = ev.touches && ev.touches[0] ? ev.touches[0] : ev;
    return { x: src.clientX, y: src.clientY };
  }

  function onPointer(ev) {
    if (ev.target && ev.target.closest && ev.target.closest("#hud")) return;
    if (ev.cancelable) ev.preventDefault();
    togglePanel(false);
    const p = pointerPos(ev);
    world.feed(p.x, p.y, water);
    if (toast) toast.classList.remove("is-on");
  }

  function togglePanel(force) {
    if (!hud || !config.state.ui) return;
    const open = force == null ? !hud.classList.contains("is-open") : force;
    hud.classList.toggle("is-open", open);
    if (gear) gear.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function bindHud() {
    if (gear) {
      gear.addEventListener("click", function (ev) {
        ev.stopPropagation();
        togglePanel();
      });
    }
    if (fishRange) {
      fishRange.addEventListener("input", function () {
        config.assign({ fish: parseInt(fishRange.value, 10) }, "ui");
      });
    }
    if (qualitySelect) {
      qualitySelect.addEventListener("change", function () {
        config.assign({ quality: qualitySelect.value }, "ui");
      });
    }
    if (fpsRange) {
      fpsRange.addEventListener("input", function () {
        config.assign({ fps: parseInt(fpsRange.value, 10) }, "ui");
      });
    }
    function commitPlace() {
      const lat = parseFloat(latInput && latInput.value);
      const lon = parseFloat(lonInput && lonInput.value);
      config.assign({ lat: lat, lon: lon, placeMode: "manual", placeSource: "manual", city: "" }, "ui");
    }
    if (latInput) latInput.addEventListener("change", commitPlace);
    if (lonInput) lonInput.addEventListener("change", commitPlace);
    if (placeAutoBtn) {
      placeAutoBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        config.assign({ placeMode: "auto" }, "ui");
        climate.resolve({ prompt: false, force: true });
      });
    }
    if (placeGeoBtn) {
      placeGeoBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        config.assign({ placeMode: "auto" }, "ui");
        climate.resolve({ prompt: true, force: true });
      });
    }
    function applyTimePreview() {
      config.assign({ time: timeSelect && timeSelect.value ? timeSelect.value : null, hour: null }, "ui");
    }
    function applyWeatherPreview() {
      config.assign({ sky: weatherSelect && weatherSelect.value ? weatherSelect.value : null }, "ui");
    }
    if (timeSelect) {
      timeSelect.addEventListener("change", applyTimePreview);
      timeSelect.addEventListener("input", applyTimePreview);
    }
    if (weatherSelect) {
      weatherSelect.addEventListener("change", applyWeatherPreview);
      weatherSelect.addEventListener("input", applyWeatherPreview);
    }
    if (previewAutoBtn) {
      previewAutoBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        config.assign({ time: null, sky: null, hour: null }, "ui");
      });
    }
    if (panel) {
      panel.addEventListener("click", function (ev) {
        ev.stopPropagation();
      });
    }
  }

  function showHint() {
    if (!toast || !config.state.ui) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("koi-pond-hint") === "1";
    } catch (err) {
      seen = false;
    }
    if (seen) return;
    toast.classList.add("is-on");
    setTimeout(function () {
      toast.classList.remove("is-on");
      try {
        sessionStorage.setItem("koi-pond-hint", "1");
      } catch (err) {}
    }, 4200);
  }

  config.onChange(function (state, reason) {
    applyWorldSettings();
    climate.setPlace({
      lat: state.lat,
      lon: state.lon,
      tz: state.tz,
      sky: state.sky,
      time: state.time,
      hour: state.hour,
      placeMode: state.placeMode,
      source: state.placeSource,
      city: state.city,
    });
    syncHud();
    if (reason === "ui" || reason === "change") {
      try {
        const url = new URL(global.location.href);
        url.search = config.queryString();
        history.replaceState(null, "", url);
      } catch (err) {}
    }
  });

  document.addEventListener("visibilitychange", function () {
    hiddenPause = document.hidden;
    if (hiddenPause) {
      last = 0;
    } else {
      climate.start({ resolve: false });
    }
  });

  global.addEventListener("blur", function () {
    blurFps = 8;
  });
  global.addEventListener("focus", function () {
    blurFps = null;
    last = 0;
  });
  global.addEventListener("resize", function () {
    resize({ forceRealloc: true });
  });
  if (global.visualViewport) {
    global.visualViewport.addEventListener("resize", function () {
      resize({ forceRealloc: true });
    });
  }
  document.addEventListener("pointerdown", onPointer);
  document.addEventListener("pointermove", function (ev) {
    if (!hud || !config.state.ui) return;
    const near = ev.clientX > cssW - 90 && ev.clientY > cssH - 90;
    hud.classList.toggle("is-peek", near);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") togglePanel(false);
    if (ev.key === "s" || ev.key === "S" || ev.key === "?") togglePanel();
  });

  document.addEventListener("contextmenu", function (ev) {
    ev.preventDefault();
  });

  global.livelyPropertyListener = function (name, val) {
    config.applyLively(name, val);
  };

  global.livelyWallpaperPlaybackChanged = function (data) {
    try {
      const obj = typeof data === "string" ? JSON.parse(data) : data;
      livelyPause = !!obj.IsPaused;
      last = 0;
    } catch (err) {}
  };

  climate.onChange(function () {
    if (skyNote) skyNote.textContent = climate.caption();
  });

  climate.onResolved(function (place) {
    if (!place || config.state.placeMode === "manual") return;
    config.assign(
      {
        lat: place.lat,
        lon: place.lon,
        tz: place.tz || config.state.tz,
        placeMode: "auto",
        placeSource: place.source,
        city: place.city || "",
      },
      "resolve"
    );
    syncHud();
  });

  function preview(opts) {
    opts = opts || {};
    config.assign(
      {
        time: Object.prototype.hasOwnProperty.call(opts, "time") ? opts.time : config.state.time,
        sky: Object.prototype.hasOwnProperty.call(opts, "sky") ? opts.sky : config.state.sky,
        hour: Object.prototype.hasOwnProperty.call(opts, "hour") ? opts.hour : config.state.hour,
        ui: opts.ui != null ? opts.ui : config.state.ui,
      },
      "ui"
    );
  }

  function openSettings() {
    config.assign({ ui: true }, "ui");
    togglePanel(true);
  }

  function applyHostCommand(msg) {
    if (typeof msg === "string") {
      try {
        msg = JSON.parse(msg);
      } catch (err) {
        return "bad";
      }
    }
    if (!msg || typeof msg !== "object") return "bad";
    const action = msg.action || msg.cmd;
    if (action === "feed") {
      const x = msg.x != null ? msg.x : cssW * 0.5;
      const y = msg.y != null ? msg.y : cssH * 0.42;
      world.feed(x, y, water);
      return "ok";
    }
    if (action === "openSettings" || action === "settings") {
      openSettings();
      return "ok";
    }
    if (action === "preview") {
      preview(msg);
      if (msg.openSettings) openSettings();
      return "ok";
    }
    return "unknown";
  }

  function bindHostBridge() {
    const webview = global.chrome && global.chrome.webview;
    if (webview && typeof webview.addEventListener === "function") {
      webview.addEventListener("message", function (ev) {
        applyHostCommand(ev.data);
      });
    }
    global.addEventListener("message", function (ev) {
      if (!ev || ev.source !== global) return;
      const data = ev.data;
      if (!data || data.source !== "koi-pond-host") return;
      applyHostCommand(data);
    });
  }

  global.KoiPond = {
    config: config,
    water: water,
    world: world,
    climate: climate,
    feed: function (x, y) {
      world.feed(x, y, water);
    },
    preview: preview,
    openSettings: openSettings,
    applyHostCommand: applyHostCommand,
    hold: function (on) {
      harnessHold = !!on;
      last = 0;
    },
    drawFrame: drawFrame,
    snapshot: function () {
      const look = climate.display ? climate.display() : null;
      return {
        look: look,
        quality: config.state.quality,
        water: { w: waterCanvas.width, h: waterCanvas.height, kind: water.kind() },
        life: { w: lifeCanvas.width, h: lifeCanvas.height },
        wx: {
          w: wxCanvas.width,
          h: wxCanvas.height,
          idle: !!(wxCanvas.classList && wxCanvas.classList.contains("is-idle")),
          busy: climate.overlayBusy ? climate.overlayBusy() : 0,
        },
      };
    },
  };

  resize();
  applyWorldSettings();
  syncHud();
  bindHud();
  bindHostBridge();
  showHint();
  if (document.getElementById("pond") && water.compositesLife && water.compositesLife()) {
    document.getElementById("pond").classList.add("is-composite");
  }
  climate.start();
  start();
  if (config.state.demo) {
    setTimeout(function () {
      world.feed(cssW * 0.48, cssH * 0.46, water);
    }, 240);
  }
})(window);
