#!/usr/bin/env node
/* Drive ?perf=1 and print per-section frame cost.
 *
 * Usage:
 *   node tools/perf-harness.mjs
 *   node tools/perf-harness.mjs --out /tmp/koi-perf.json --port 8831
 *
 * The page times real drawFrame sections. Ripple, life upload, and water
 * shade each end with a 1px readPixels, so the ranking includes GPU wait.
 */
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const outFile = path.resolve(arg("--out", "/tmp/koi-perf.json"));
const port = parseInt(arg("--port", "8831"), 10);
const width = parseInt(arg("--width", "1920"), 10);
const height = parseInt(arg("--height", "1080"), 10);

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
  return new Promise((resolve) => {
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
  });
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
  return null;
}

function chromePath() {
  const listed = [process.env.CHROME_PATH, "/opt/google/chrome/chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"];
  for (const p of listed) if (p && fs.existsSync(p)) return p;
  return null;
}

const only = arg("--only", "");
const scenarios = [
  { quality: "low", fish: 1, sky: "clear", label: "low-1-clear" },
  { quality: "low", fish: 1, sky: "rain", label: "low-1-rain" },
  { quality: "mid", fish: 7, sky: "clear", label: "mid-7-clear" },
  { quality: "high", fish: 1, sky: "clear", label: "high-1-clear" },
  { quality: "ultra", fish: 1, sky: "clear", label: "ultra-1-clear" },
  { quality: "ultra", fish: 1, sky: "rain", label: "ultra-1-rain" },
];

function printReport(label, report) {
  console.log("\n== " + label + " ==");
  console.log(
    "quality " +
      report.quality +
      "  fish " +
      report.simFish +
      "  css " +
      (report.css ? report.css.join("×") : "?") +
      "  water " +
      (report.water ? report.water.join("×") : "?") +
      "  frame " +
      report.frameMs +
      " ms  n " +
      report.frames
  );
  for (const row of report.sections) {
    console.log("  " + row.name.padEnd(12) + row.ms.toFixed(2).padStart(8) + " ms  " + String(row.pct).padStart(6) + "%");
  }
}

const server = await startServer();
const puppeteer = await loadPuppeteer();
if (!puppeteer) {
  console.error("puppeteer-core missing");
  process.exit(1);
}
const exe = chromePath();
if (!exe) {
  console.error("chrome missing");
  process.exit(1);
}
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
    "--window-size=" + width + "," + height,
  ],
});
const page = await browser.newPage();
page.setDefaultTimeout(60000);
await page.setViewport({ width: width, height: height, deviceScaleFactor: 1 });
const url =
  "http://127.0.0.1:" +
  port +
  "/index.html?perf=1&quality=low&fish=1&time=day&weather=clear&ui=0&fps=30&place=manual";
console.log("goto", url);
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForFunction(() => window.KoiPond && window.PondPerf && KoiPond.drawFrame && PondPerf.reset, {
  timeout: 20000,
});
await page.evaluate(() => {
  if (KoiPond.hold) KoiPond.hold(true);
});

const results = [];
const selected = only ? scenarios.filter((sc) => sc.label === only || sc.quality === only) : scenarios;
if (!selected.length) {
  console.error("no scenario", only);
  process.exit(1);
}
for (const sc of selected) {
  const report = await page.evaluate(async (scenario) => {
    KoiPond.config.assign({ quality: scenario.quality, fish: scenario.fish }, "ui");
    KoiPond.preview({ sky: scenario.sky, time: "day", ui: 0 });
    if (KoiPond.climate.snap) KoiPond.climate.snap();
    for (let i = 0; i < 6; i++) KoiPond.drawFrame(0.05);
    PondPerf.reset();
    for (let i = 0; i < 24; i++) KoiPond.drawFrame(0.05);
    return PondPerf.snapshot();
  }, sc);
  report.label = sc.label;
  results.push(report);
  printReport(sc.label, report);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ width: width, height: height, results: results }, null, 2));
console.log("\nwrote", outFile);
await browser.close();
server.close();
