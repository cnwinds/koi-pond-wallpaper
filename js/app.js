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
  const skyNote = document.getElementById("skyNote");
  const rendererNote = document.getElementById("rendererNote");

  const sprites = PondSprites.createLibrary();
  let water = PondWater.create(waterCanvas, config.preset());
  const world = PondWorld.create(lifeCanvas, { sprites });
  const climate = PondClimate.create({
    canvas: wxCanvas,
    lat: config.state.lat,
    lon: config.state.lon,
    tz: config.state.tz,
    sky: config.state.sky,
  });

  let cssW = 1;
  let cssH = 1;
  let pixelW = 1;
  let pixelH = 1;
  let running = false;
  let hiddenPause = false;
  let livelyPause = false;
  let blurFps = null;
  let raf = 0;
  let last = 0;
  let acc = 0;
  let demoT = 0;
  let time = 0;

  function dprCap() {
    const want = config.preset().dpr;
    return Math.max(1, Math.min(global.devicePixelRatio || 1, want));
  }

  function resize() {
    cssW = Math.max(1, global.innerWidth || document.documentElement.clientWidth);
    cssH = Math.max(1, global.innerHeight || document.documentElement.clientHeight);
    const dpr = dprCap();
    pixelW = Math.max(1, Math.round(cssW * dpr));
    pixelH = Math.max(1, Math.round(cssH * dpr));
    waterCanvas.width = pixelW;
    waterCanvas.height = pixelH;
    lifeCanvas.width = pixelW;
    lifeCanvas.height = pixelH;
    world.resize(cssW, cssH, dpr);
    climate.resize(cssW, cssH, dpr);
  }

  let lastQuality = config.state.quality;

  function applyWorldSettings() {
    const preset = config.preset();
    world.setFishCount(config.state.fish);
    world.setPadCount(preset.pads);
    world.setMoteCount(preset.particles);
    if (config.state.quality !== lastQuality) {
      lastQuality = config.state.quality;
      water.setQuality(preset);
      resize();
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
  }

  let lastBg = "";

  function applyCssGrade(look) {
    const e = look.exposure;
    const t = look.tint;
    const r = Math.round(8 * t[0] * e);
    const g = Math.round(22 * t[1] * e);
    const b = Math.round(20 * t[2] * e);
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

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (hiddenPause || livelyPause) return;
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
    time += dt;

    const preset = config.preset();
    const look = climate.sample();
    const calm = config.state.reducedMotion;
    const ambient = (calm ? 0.25 : preset.ambientWaves) * look.ambientMul;
    climate.tick(dt, look, preset, water, calm);
    water.update(dt);
    world.update(dt, water, preset, look);
    water.render(cssW, cssH, pixelW, pixelH, time, {
      caustics: preset.caustics && !calm && look.causticGain > 0.04,
      ambient: ambient,
      exposure: look.exposure,
      tint: look.tint,
      causticGain: look.causticGain,
      haze: look.haze,
    });
    world.render(preset);
    climate.render(look);
    applyCssGrade(look);

    if (config.state.demo) {
      demoT += dt;
      if (demoT > 7) {
        demoT = 0;
        world.feed(cssW * (0.3 + Math.random() * 0.4), cssH * (0.3 + Math.random() * 0.4), water);
      }
    }
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
      config.assign({ lat: lat, lon: lon }, "ui");
    }
    if (latInput) latInput.addEventListener("change", commitPlace);
    if (lonInput) lonInput.addEventListener("change", commitPlace);
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
    climate.setPlace({ lat: state.lat, lon: state.lon, tz: state.tz, sky: state.sky });
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
      climate.start();
    }
  });

  global.addEventListener("blur", function () {
    blurFps = 8;
  });
  global.addEventListener("focus", function () {
    blurFps = null;
    last = 0;
  });
  global.addEventListener("resize", resize);
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

  global.KoiPond = {
    config: config,
    water: water,
    world: world,
    climate: climate,
    feed: function (x, y) {
      world.feed(x, y, water);
    },
  };

  resize();
  applyWorldSettings();
  syncHud();
  bindHud();
  showHint();
  climate.start();
  start();
})(window);
