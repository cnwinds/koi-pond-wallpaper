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

  assert(climate.includes("Rain hits only"), "climate.render is not documented as rain-only", failures);
  assert(climate.includes("releaseOverlay"), "wx idle release missing", failures);
  assert(climate.includes("d.tx - z * d.slantX"), "rain projectDrop must subtract slant (fall onto water, not rise)", failures);
  assert(!climate.includes("d.tx + z * d.slantX"), "rain projectDrop still adds z*slant (rising motion)", failures);
  assert(!climate.includes("rgba(255, 132, 64"), "climate.render still paints dusk fill", failures);
  assert(!climate.includes("rgba(176, 192, 190"), "climate.render still paints haze gradient", failures);
  assert(!climate.includes("rgba(2, 8, 22"), "climate.render still paints night fill", failures);

  assert(!app.includes("lastBlendKey"), "app.js still reallocates on blendKey", failures);
  assert(app.includes("recoverSim"), "app.js never calls recoverSim after settle", failures);
  assert(app.includes("rippleCalm"), "app.js does not pass rippleCalm", failures);
  assert(app.includes("rainingHard"), "rippleCalm must stay off while rain is falling", failures);
  assert(app.includes("fog: look.fog"), "app.js does not pass fog", failures);
  assert(css.includes("#wx.is-idle"), "css missing #wx.is-idle hide rule", failures);

  const csproj = read("win/KoiPondWallpaper/KoiPondWallpaper.csproj");
  assert(csproj.includes("<Version>0.3.7</Version>"), "csproj not bumped to 0.3.7", failures);
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
  ].filter(function (step) {
    return !only || step.label === only;
  });
  const report = [];

  for (const step of paths) {
    console.log("path", step.label + "→clear");
    await snapSky(page, step.from);
    if (step.from === "rain") {
      await drive(page, 1.05);
      const motion = await page.evaluate(() => {
        const a = KoiPond.climate.debugDrops ? KoiPond.climate.debugDrops() : [];
        const dt = 0.05;
        for (let i = 0; i < 5; i++) KoiPond.drawFrame(dt);
        const b = KoiPond.climate.debugDrops ? KoiPond.climate.debugDrops() : [];
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
        return {
          n: dys.length,
          meanDy: dys.length ? sum / dys.length : 0,
          aboveHit: aboveHit,
          count: a.length,
        };
      });
      console.log("  rain motion", motion);
      if (motion.count < 8) failures.push("rain: too few drops to judge motion");
      if (motion.n < 5) failures.push("rain: could not track falling drops");
      if (motion.meanDy <= 0.15) failures.push("rain: mean dy " + motion.meanDy + " — not falling down");
      if (motion.aboveHit < 2) failures.push("rain: high-z drops are not above their hit points");
      const rainFile = path.join(outDir, "rain-settled.png");
      await captureFrame(page, rainFile);
    }
    await drive(page, 0.35);
    await page.evaluate(() => KoiPond.preview({ sky: "clear", time: "day", ui: 0 }));
    await drive(page, 1.55);
    const midFile = path.join(outDir, step.label + "-to-clear-mid.png");
    const mid = await captureFrame(page, midFile);
    console.log("  mid haze/rain/fog", mid.snap && mid.snap.look && mid.snap.look.haze, mid.snap && mid.snap.look && mid.snap.look.rain, mid.snap && mid.snap.look && mid.snap.look.fog);
    await drive(page, 4.4);
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
    if (step.from !== "rain" && midLook && midLook.haze < 0.03 && midLook.fog < 0.05) {
      failures.push(step.label + " mid: veil already gone (haze=" + midLook.haze + ")");
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
