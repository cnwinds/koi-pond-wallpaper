#!/usr/bin/env node
/* Self-check: weather→clear must not leave a blocky/low-res overlay.
 *
 * 1) Static: atmosphere is in WATER_FS; wx render is rain-only.
 * 2) Browser: mid quality, force cloudy/fog/rain → clear, capture mid
 *    and post-clear frames, fail on tile/block pattern or a live wx veil.
 *
 * Usage: node tools/verify-weather-clear.mjs
 * Optional: --out DIR  --port N  --no-browser
 */
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const outDir = path.resolve(arg("--out", "/tmp/weather-clear-out"));
const port = parseInt(arg("--port", "8768"), 10);
const skipBrowser = args.includes("--no-browser");
const only = arg("--only", "");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function assert(cond, msg, failures) {
  if (!cond) failures.push(msg);
}

function staticChecks() {
  const failures = [];
  const water = read("js/water.js");
  const climate = read("js/climate.js");
  const app = read("js/app.js");
  const css = read("css/pond.css");

  assert(water.includes("uniform float uFog"), "WATER_FS missing uFog", failures);
  assert(water.includes("uniform float uRippleCalm"), "WATER_FS missing uRippleCalm", failures);
  assert(water.includes("n.xy *= mix(1.0, 0.28, calm)"), "ripple calm does not scale normals", failures);
  assert(water.includes("Atmosphere lives in this shader"), "atmosphere comment missing from WATER_FS", failures);
  assert(water.includes("uFog: gl.getUniformLocation"), "createGL does not bind uFog", failures);
  assert(water.includes("uRippleCalm: gl.getUniformLocation"), "createGL does not bind uRippleCalm", failures);
  assert(water.includes("recoverSim:"), "PondWater missing recoverSim (quality-like FBO rebuild)", failures);
  assert(!/desynchronized:\s*true/.test(water), "water fallback still uses desynchronized:true", failures);

  assert(climate.includes("Airborne streaks only"), "climate.render is not documented as streak-only", failures);
  assert(climate.includes("releaseOverlay"), "wx idle release missing", failures);
  assert(climate.includes("d.tx - z * d.slantX"), "rain projectDrop must subtract slant (fall onto water, not rise)", failures);
  assert(climate.includes("d.phase"), "rain streaks missing opacity pulse", failures);
  assert(!climate.includes("d.tx + z * d.slantX"), "rain projectDrop still adds z*slant (rising motion)", failures);
  assert(!climate.includes("rgba(255, 132, 64"), "climate.render still paints dusk fill", failures);
  assert(!climate.includes("rgba(176, 192, 190"), "climate.render still paints haze gradient", failures);
  assert(!climate.includes("rgba(2, 8, 22"), "climate.render still paints night fill", failures);

  assert(!app.includes("lastBlendKey"), "app.js still reallocates on blendKey", failures);
  assert(!app.includes("recoverSim"), "settling clear must not wipe ripple FBOs", failures);
  assert(!app.includes("causticGain > 0.15"), "caustics still gated on gain", failures);
  assert(!app.includes("veil < 0.08"), "caustics still gated on veil", failures);
  assert(!app.includes("rainingHard"), "ripple calm still steps on a rain threshold", failures);
  assert(app.includes("causticWeight"), "app.js does not pass a continuous caustic weight", failures);
  assert(app.includes("fog: look.fog"), "app.js does not pass fog", failures);
  assert(water.includes("sunW"), "caustics are not a continuous weight in WATER_FS", failures);
  assert(css.includes("#wx.is-idle"), "css missing #wx.is-idle hide rule", failures);

  const csproj = read("win/KoiPondWallpaper/KoiPondWallpaper.csproj");
  assert(!climate.includes("rgba(232, 240, 244"), "hit flashes still draw white dots", failures);
  assert(climate.includes("Drop size is ripple-only"), "streaks still scale with drop size", failures);
  assert(water.includes("uniform float uRain"), "WATER_FS missing uRain", failures);
  assert(water.includes("fade that glint"), "rain crests can still shade as white discs", failures);
  assert(climate.includes("lineWidth = 1.15"), "rain streaks are not a visible hairline", failures);
  assert(!climate.includes("globalAlpha = Math.min(0.16"), "rain streaks are still nearly invisible", failures);
  assert(csproj.includes("<Version>0.3.11</Version>"), "csproj not bumped to 0.3.11", failures);
  return failures;
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      let rel = decodeURIComponent(url.pathname);
      if (rel === "/") rel = "/index.html";
      const file = path.normalize(path.join(root, rel));
      if (!file.startsWith(root)) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(file, (err, buf) => {
        if (err) {
          res.writeHead(404);
          res.end("not found");
          return;
        }
        res.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
        res.end(buf);
      });
    });
    server.listen(port, "127.0.0.1", () => resolve(server));
    server.on("error", reject);
  });
}

function chromePath() {
  const listed = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/opt/google/chrome/chrome",
  ];
  for (const p of listed) {
    if (p && fs.existsSync(p)) return p;
  }
  return null;
}

async function loadPuppeteer() {
  const roots = [process.cwd(), "/tmp/node_modules", "/tmp", root];
  for (const dir of roots) {
    try {
      return await import(path.join(dir, "puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"));
    } catch (err) {}
    try {
      return await import(path.join(dir, "node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"));
    } catch (err) {}
  }
  try {
    return await import("puppeteer-core");
  } catch (err) {
    return null;
  }
}

async function captureFrame(page, file) {
  await page.screenshot({ path: file, type: "png" });
  return page.evaluate(() => {
    const water = document.getElementById("water");
    const wx = document.getElementById("wx");
    const tw = 480;
    const th = 270;
    const tmp = document.createElement("canvas");
    tmp.width = tw;
    tmp.height = th;
    const ctx = tmp.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(water, 0, 0, tw, th);
    if (wx && wx.width > 2 && wx.height > 2 && !wx.classList.contains("is-idle")) {
      ctx.drawImage(wx, 0, 0, tw, th);
    }
    const img = ctx.getImageData(0, 0, tw, th);
    const data = img.data;
    const w = tw;
    const h = th;
    const luma = new Float32Array(w * h);
    let sum = 0;
    for (let i = 0; i < w * h; i++) {
      const y = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
      luma[i] = y;
      sum += y;
    }
    const mean = sum / (w * h);
    const x0 = Math.floor(w * 0.2);
    const x1 = Math.floor(w * 0.8);
    const y0 = Math.floor(h * 0.22);
    const y1 = Math.floor(h * 0.78);
    function scoreFor(bs) {
      const bw = Math.max(1, Math.floor((x1 - x0) / bs));
      const bh = Math.max(1, Math.floor((y1 - y0) / bs));
      const means = new Float32Array(bw * bh);
      let intra = 0;
      let nI = 0;
      for (let by = 0; by < bh; by++) {
        for (let bx = 0; bx < bw; bx++) {
          let s = 0;
          let s2 = 0;
          let n = 0;
          for (let y = 0; y < bs; y++) {
            const row = y0 + by * bs + y;
            for (let x = 0; x < bs; x++) {
              const v = luma[row * w + (x0 + bx * bs + x)];
              s += v;
              s2 += v * v;
              n++;
            }
          }
          const m = s / n;
          means[by * bw + bx] = m;
          intra += Math.sqrt(Math.max(0, s2 / n - m * m));
          nI++;
        }
      }
      let inter = 0;
      let nE = 0;
      for (let by = 0; by < bh; by++) {
        for (let bx = 0; bx < bw; bx++) {
          const i = by * bw + bx;
          if (bx + 1 < bw) {
            inter += Math.abs(means[i] - means[i + 1]);
            nE++;
          }
          if (by + 1 < bh) {
            inter += Math.abs(means[i] - means[i + bw]);
            nE++;
          }
        }
      }
      const intraM = intra / Math.max(1, nI);
      const interM = inter / Math.max(1, nE);
      return { intra: intraM, inter: interM, ratio: interM / (intraM + 1e-3) };
    }
    function horizLag(lag) {
      let num = 0;
      let den = 0;
      for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1 - lag; x += 2) {
          const a = luma[y * w + x] - luma[y * w + x + 1];
          const b = luma[y * w + x + lag] - luma[y * w + x + lag + 1];
          num += a * b;
          den += a * a;
        }
      }
      return den > 1e-6 ? num / den : 0;
    }
    const lags = [4, 5, 6, 8, 10, 16, 20, 32];
    const ac = {};
    const vals = [];
    for (let i = 0; i < lags.length; i++) {
      ac[lags[i]] = horizLag(lags[i]);
      vals.push(ac[lags[i]]);
    }
    vals.sort((a, b) => a - b);
    const med = vals[(vals.length / 2) | 0];
    let peak = ac[4];
    for (let i = 0; i < lags.length; i++) if (ac[lags[i]] > peak) peak = ac[lags[i]];
    const periodic = peak - med;
    const s8 = scoreFor(8);
    const s16 = scoreFor(16);
    const tileLike = (s8.ratio > 3.1 && s8.intra < 5.5) || (s16.ratio > 2.8 && s16.intra < 7);
    const gridLike = periodic > 0.62 && peak > 0.55;
    return {
      snap: window.KoiPond && KoiPond.snapshot ? KoiPond.snapshot() : null,
      metrics: {
        mean,
        s8,
        s16,
        ac,
        periodic,
        blocky: mean > 12 && (tileLike || gridLike),
      },
    };
  });
}

async function drive(page, seconds) {
  await page.evaluate((sec) => {
    const dt = 0.05;
    const n = Math.max(1, Math.round(sec / dt));
    for (let i = 0; i < n; i++) KoiPond.drawFrame(dt);
  }, seconds);
}

async function sampleSun(page, seconds) {
  return page.evaluate((sec) => {
    function metric() {
      const water = document.getElementById("water");
      const tw = 160;
      const th = 90;
      const tmp = document.createElement("canvas");
      tmp.width = tw;
      tmp.height = th;
      const ctx = tmp.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(water, 0, 0, tw, th);
      const data = ctx.getImageData(0, 0, tw, th).data;
      let sum = 0;
      let hi = 0;
      const n = tw * th;
      for (let i = 0; i < n; i++) {
        const y = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
        sum += y;
        if (y > 155) hi++;
      }
      const look = KoiPond.snapshot().look;
      return { mean: sum / n, hi: hi / n, gain: look.causticGain, day: look.dayness };
    }
    const dt = 0.05;
    const steps = Math.max(1, Math.round(sec / dt));
    const samples = [];
    let t = 0;
    for (let i = 0; i < steps; i++) {
      KoiPond.drawFrame(dt);
      t += dt;
      const row = metric();
      row.t = t;
      samples.push(row);
    }
    return samples;
  }, seconds);
}

function lightPop(samples) {
  if (!samples || samples.length < 4) return { pop: false, lateMax: 0, lateT: 0, span: 0 };
  const span = samples[samples.length - 1].hi - samples[0].hi;
  const meanSpan = samples[samples.length - 1].mean - samples[0].mean;
  let lateMax = 0;
  let lateMean = 0;
  let lateT = 0;
  for (let i = 1; i < samples.length; i++) {
    const t = samples[i].t;
    const d = samples[i].hi - samples[i - 1].hi;
    const dm = samples[i].mean - samples[i - 1].mean;
    if (t > 1.05 && d > lateMax) {
      lateMax = d;
      lateT = t;
    }
    if (t > 1.05 && dm > lateMean) lateMean = dm;
  }
  return {
    span: span,
    meanSpan: meanSpan,
    lateMax: lateMax,
    lateMean: lateMean,
    lateT: lateT,
    pop:
      (span > 0.03 && lateMax > Math.max(0.045, span * 0.38)) ||
      (meanSpan > 12 && lateMean > Math.max(8, meanSpan * 0.35)),
  };
}

async function snapSky(page, sky) {
  await page.evaluate((next) => {
    KoiPond.preview({ sky: next, time: "day", ui: 0 });
    if (KoiPond.climate.snap) KoiPond.climate.snap();
    KoiPond.drawFrame(1 / 30);
  }, sky);
}

async function runBrowser() {
  const failures = [];
  fs.mkdirSync(outDir, { recursive: true });
  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    failures.push("puppeteer-core not available");
    return failures;
  }
  const exe = chromePath();
  if (!exe) {
    failures.push("no Chrome/Chromium binary");
    return failures;
  }
  const server = await startServer();
  const launcher = puppeteer.default && puppeteer.default.launch ? puppeteer.default : puppeteer;
  const browser = await launcher.launch({
    executablePath: exe,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--hide-scrollbars",
      "--window-size=1280,720",
    ],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(45000);
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  const url =
    "http://127.0.0.1:" +
    port +
    "/index.html?quality=mid&time=day&weather=cloudy&ui=0&fps=30&place=manual";
  console.log("goto", url);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForFunction(() => window.KoiPond && KoiPond.drawFrame && KoiPond.climate, { timeout: 15000 });
  await page.evaluate(() => {
    document.documentElement.style.background = "#0a221e";
    document.body.style.background = "#0a221e";
    if (KoiPond.hold) KoiPond.hold(true);
  });

  const paths = [
    { from: "cloudy", label: "cloudy" },
    { from: "fog", label: "fog" },
    { from: "rain", label: "rain" },
    { from: "clear", time: "night", label: "night" },
  ].filter(function (step) {
    return !only || step.label === only;
  });
  const report = [];

  for (const step of paths) {
    console.log("path", step.label + "→day-clear");
    await page.evaluate((sky, time) => {
      KoiPond.preview({ sky: sky, time: time, ui: 0 });
      if (KoiPond.climate.snap) KoiPond.climate.snap();
      KoiPond.drawFrame(1 / 30);
    }, step.from, step.time || "day");
    if (step.from === "rain") {
      await drive(page, 1.05);
      const motion = await page.evaluate(() => {
        const a = KoiPond.climate.debugDrops ? KoiPond.climate.debugDrops() : [];
        /* Two frames: a 0.25s window recycles drops that cross in ~0.25s,
           so the tracker would only see the slowest survivors. Scale Δz
           back to a 0.25s equivalent for the v0.3.8 comparison. */
        const dt = 0.05;
        const frames = 2;
        for (let i = 0; i < frames; i++) KoiPond.drawFrame(dt);
        const b = KoiPond.climate.debugDrops ? KoiPond.climate.debugDrops() : [];
        const scale = 0.25 / (dt * frames);
        const dys = [];
        for (let i = 0; i < a.length; i++) {
          const da = a[i];
          for (let j = 0; j < b.length; j++) {
            const db = b[j];
            if (Math.abs(db.tx - da.tx) > 0.2 || Math.abs(db.ty - da.ty) > 0.2) continue;
            if (db.z >= da.z - 1e-4) continue;
            dys.push(db.y - da.y);
            break;
          }
        }
        let sum = 0;
        for (let i = 0; i < dys.length; i++) sum += dys[i];
        const aboveHit = a.filter(function (d) {
          return d.z > 0.55 && d.y < d.ty - 2;
        }).length;
        let slopeN = 0;
        let slopeSum = 0;
        let fadeLo = 0;
        let fadeHi = 0;
        let dzSum = 0;
        let dzN = 0;
        for (let i = 0; i < a.length; i++) {
          const da = a[i];
          if (da.fade < 0.12) fadeLo++;
          if (da.fade > 0.55) fadeHi++;
          if (da.z > 0.35) {
            const vx = Math.abs(da.tx - da.x);
            const vy = Math.abs(da.ty - da.y);
            if (vy > 8) {
              slopeSum += vx / vy;
              slopeN++;
            }
          }
          for (let j = 0; j < b.length; j++) {
            const db = b[j];
            if (Math.abs(db.tx - da.tx) > 0.2 || Math.abs(db.ty - da.ty) > 0.2) continue;
            if (db.z < da.z - 1e-4) {
              dzSum += da.z - db.z;
              dzN++;
            }
            break;
          }
        }
        return {
          n: dys.length,
          meanDy: dys.length ? sum / dys.length : 0,
          aboveHit: aboveHit,
          count: a.length,
          slope: slopeN ? slopeSum / slopeN : 0,
          meanDz: dzN ? (dzSum / dzN) * scale : 0,
          fadeLo: fadeLo,
          fadeHi: fadeHi,
        };
      });
      console.log("  rain motion", motion);
      if (motion.count < 8) failures.push("rain: too few drops to judge motion");
      if (motion.n < 5) failures.push("rain: could not track falling drops");
      if (motion.meanDy <= 0.15) failures.push("rain: mean dy " + motion.meanDy + " — not falling down");
      if (motion.aboveHit < 2) failures.push("rain: high-z drops are not above their hit points");
      if (!(motion.slope > 0.12 && motion.slope < 0.62)) {
        failures.push("rain: slant not steep (lateral/vertical " + motion.slope + ")");
      }
      if (motion.meanDz < 0.7) failures.push("rain: fall not faster than v0.3.8 (Δz " + motion.meanDz + " / 0.25s)");
      if (motion.fadeLo < 4 || motion.fadeHi < 4) {
        failures.push("rain: opacity not pulsing (low " + motion.fadeLo + ", high " + motion.fadeHi + ")");
      }
      const rainFile = path.join(outDir, "rain-settled.png");
      await captureFrame(page, rainFile);
      const specks = await page.evaluate(() => {
        const wx = document.getElementById("wx");
        if (!wx || wx.width < 8) return { bright: 0, w: wx ? wx.width : 0, h: wx ? wx.height : 0 };
        const tmp = document.createElement("canvas");
        tmp.width = wx.width;
        tmp.height = wx.height;
        const ctx = tmp.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(wx, 0, 0);
        const data = ctx.getImageData(0, 0, tmp.width, tmp.height).data;
        let bright = 0;
        let ink = 0;
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a > 48) ink++;
          if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220 && a > 200) bright++;
        }
        return { bright: bright, ink: ink, w: tmp.width, h: tmp.height };
      });
      console.log("  wx specks", specks);
      if (specks.bright > 20) {
        failures.push("rain: opaque white specks (" + specks.bright + ")");
      }
      if (!specks.ink || specks.ink < 350) {
        failures.push("rain: streaks not visible (ink px " + (specks.ink || 0) + ")");
      }
      const blobs = await page.evaluate(() => {
        const water = document.getElementById("water");
        const life = document.getElementById("life");
        const tw = 320;
        const th = 180;
        function grab(el) {
          const c = document.createElement("canvas");
          c.width = tw;
          c.height = th;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(el, 0, 0, tw, th);
          return ctx.getImageData(0, 0, tw, th).data;
        }
        const wd = grab(water);
        const ld = life && life.width > 2 ? grab(life) : new Uint8ClampedArray(tw * th * 4);
        const near = new Uint8Array(tw * th);
        for (let y = 0; y < th; y++) {
          for (let x = 0; x < tw; x++) {
            if (ld[(y * tw + x) * 4 + 3] <= 40) continue;
            for (let oy = -6; oy <= 6; oy++) {
              for (let ox = -6; ox <= 6; ox++) {
                const xx = x + ox;
                const yy = y + oy;
                if (xx < 0 || yy < 0 || xx >= tw || yy >= th) continue;
                near[yy * tw + xx] = 1;
              }
            }
          }
        }
        let bright = 0;
        let far = 0;
        for (let i = 0; i < tw * th; i++) {
          if (near[i]) continue;
          const r = wd[i * 4];
          const g = wd[i * 4 + 1];
          const b = wd[i * 4 + 2];
          if (r > 190 && g > 185 && b > 170 && Math.abs(r - g) < 30 && Math.abs(g - b) < 40) {
            bright++;
            far++;
          }
        }
        return { bright: bright, far: far };
      });
      console.log("  open-water white blobs", blobs);
      if (blobs.far > 40) {
        failures.push("rain: white drop pixels away from fish (" + blobs.far + ")");
      }
    }
    await drive(page, 0.35);
    await page.evaluate(() => KoiPond.preview({ sky: "clear", time: "day", ui: 0 }));
    const early = await sampleSun(page, 1.65);
    const midFile = path.join(outDir, step.label + "-to-clear-mid.png");
    const mid = await captureFrame(page, midFile);
    console.log("  mid haze/rain/fog/day/gain", mid.snap && mid.snap.look && mid.snap.look.haze, mid.snap && mid.snap.look && mid.snap.look.rain, mid.snap && mid.snap.look && mid.snap.look.fog, mid.snap && mid.snap.look && mid.snap.look.dayness, mid.snap && mid.snap.look && mid.snap.look.causticGain);
    const late = await sampleSun(page, 4.35);
    const afterFile = path.join(outDir, step.label + "-to-clear-after.png");
    const after = await captureFrame(page, afterFile);
    console.log("  after haze/rain", after.snap && after.snap.look && after.snap.look.haze, after.snap && after.snap.look && after.snap.look.rain, "wx", after.snap && after.snap.wx);

    const midLook = mid.snap && mid.snap.look;
    const afterLook = after.snap && after.snap.look;
    const afterWx = after.snap && after.snap.wx;
    const midMetrics = mid.metrics;
    const afterMetrics = after.metrics;
    const row = {
      path: step.label + "→clear",
      midFile,
      afterFile,
      mid: { look: midLook, metrics: midMetrics, wx: mid.snap && mid.snap.wx },
      after: { look: afterLook, metrics: afterMetrics, wx: afterWx },
    };
    report.push(row);

    if (!midLook || midLook.rain == null) failures.push(step.label + " mid: missing look");
    if (step.from === "rain" && midLook && midLook.rain < 0.08) {
      failures.push(step.label + " mid: rain already gone (" + midLook.rain + ")");
    }
    if (step.label !== "night" && step.from !== "rain" && midLook && midLook.haze < 0.03 && midLook.fog < 0.05) {
      failures.push(step.label + " mid: veil already gone (haze=" + midLook.haze + ")");
    }
    if (step.label === "night" && midLook && (midLook.dayness < 0.2 || midLook.dayness > 0.9)) {
      failures.push(step.label + " mid: dayness not mid-ramp (" + midLook.dayness + ")");
    }
    if (midLook && afterLook && afterLook.causticGain < midLook.causticGain + 0.05) {
      failures.push(step.label + " causticGain did not keep rising through the blend");
    }
    const ramp = lightPop(early.concat(late));
    console.log("  light ramp", ramp);
    if (ramp.pop) {
      failures.push(step.label + " sunny light popped late (Δhi " + ramp.lateMax.toFixed(3) + " at " + ramp.lateT.toFixed(2) + "s)");
    }
    if (midMetrics.mean < 12) failures.push(step.label + " mid: frame too dark (mean " + midMetrics.mean.toFixed(1) + ")");
    if (afterMetrics.mean < 12) failures.push(step.label + " after: frame too dark (mean " + afterMetrics.mean.toFixed(1) + ")");
    if (midMetrics.blocky) failures.push(step.label + " mid: blocky/tile pattern detected");
    if (afterMetrics.blocky) failures.push(step.label + " after: blocky/tile pattern detected");
    if (afterLook && afterLook.rain > 0.05) failures.push(step.label + " after: still raining");
    if (afterLook && afterLook.sky !== "clear") failures.push(step.label + " after: sky is " + afterLook.sky);
    if (afterWx && !afterWx.idle) failures.push(step.label + " after: wx overlay still live");
    if (afterWx && (afterWx.w > 4 || afterWx.h > 4) && !afterWx.idle) {
      failures.push(step.label + " after: wx surface still full-size");
    }
    if (afterLook && afterLook.haze > 0.12) failures.push(step.label + " after: haze still high");
  }

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  try {
    await browser.close();
  } catch (err) {}
  server.close();
  return failures;
}

const staticFails = staticChecks();
console.log("static:", staticFails.length ? "FAIL" : "ok");
staticFails.forEach((m) => console.log("  - " + m));

let browserFails = [];
if (!skipBrowser) {
  try {
    browserFails = await runBrowser();
  } catch (err) {
    browserFails = ["browser harness: " + (err && err.stack ? err.stack : err)];
  }
  console.log("browser:", browserFails.length ? "FAIL" : "ok");
  browserFails.forEach((m) => console.log("  - " + m));
  console.log("frames:", outDir);
}

const all = staticFails.concat(browserFails);
if (all.length) {
  process.exitCode = 1;
} else {
  console.log("verify-weather-clear: PASS");
}
