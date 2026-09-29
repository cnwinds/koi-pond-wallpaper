import { createPond } from './pond.js';

const params = new URLSearchParams(location.search);

function num(name, fallback) {
  const raw = params.get(name);
  if (raw == null || raw === '') return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

const canvas = document.getElementById('pond');
const hint = document.getElementById('hint');
const errBox = document.getElementById('err');
const perf = document.getElementById('perf');

const fish = Math.max(1, Math.min(80, num('fish', 46) | 0));
const fps = Math.max(8, Math.min(60, num('fps', 30)));
const resCap = Math.max(480, num('res', 1440));
const maxDpr = Math.max(0.25, num('dpr', 1));
const demo = params.get('demo') === '1';
const seed = num('seed', 7) | 0;
const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const showPerf = params.get('perf') === '1';

if (params.get('ui') === '0' && hint) hint.hidden = true;
if (showPerf && perf) perf.style.display = 'block';

function bufferSize() {
  const cssW = Math.max(1, window.innerWidth);
  const cssH = Math.max(1, window.innerHeight);
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  let w = Math.max(1, Math.round(cssW * dpr));
  let h = Math.max(1, Math.round(cssH * dpr));
  const long = Math.max(w, h);
  if (long > resCap) {
    const s = resCap / long;
    w = Math.max(1, Math.round(w * s));
    h = Math.max(1, Math.round(h * s));
  }
  return { w, h };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function showError(error) {
  if (canvas) canvas.style.display = 'none';
  if (hint) hint.hidden = true;
  if (!errBox) return;
  errBox.style.display = 'block';
  errBox.innerHTML = `<h1>WebGPU 没能启动</h1><p>${escapeHtml(error && error.message ? error.message : error)}</p><p>这条演示只在较新的 Chrome、Edge 或 Safari 里运行，不能当作 Lively 壁纸。桌面请继续用仓库根目录的 WebGL 锦鲤池 <code>index.html</code>（<a href="https://github.com/cnwinds/koi-pond-wallpaper">仓库</a>）。Lively 和 WebView2 里经常没有 WebGPU。</p>`;
}

let livelyPause = false;
let paused = document.hidden;
let raf = 0;
let last = 0;
let acc = 0;
let frames = 0;
let perfWindow = 0;
let blurFps = null;

function targetFps() {
  return blurFps == null ? fps : blurFps;
}

function setPaused(next) {
  paused = next;
  if (!paused) {
    last = performance.now();
    acc = 0;
    if (!raf) raf = requestAnimationFrame(loop);
  }
}

let pond = null;
let demoAcc = 2.2;

function loop(now) {
  raf = 0;
  if (paused || document.hidden || livelyPause || !pond) return;
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
  last = now;
  acc += dt;
  const step = 1 / targetFps();
  if (acc >= step) {
    const simDt = Math.min(acc, 0.1) * (reduced ? 0.25 : 1);
    acc = 0;
    if (demo) {
      demoAcc += simDt;
      if (demoAcc > 4.5) {
        demoAcc = 0;
        const a = Math.random() * Math.PI * 2;
        const r = 0.08 + Math.random() * 0.35;
        pond.feed(pond.centerX + Math.cos(a) * pond.halfW * r, pond.centerY + Math.sin(a) * pond.halfH * r);
      }
    }
    pond.step(simDt);
    pond.render();
    frames++;
    if (showPerf && perf) {
      perfWindow += simDt;
      if (perfWindow >= 0.5) {
        const st = pond.stats;
        perf.textContent = `${Math.round(frames / perfWindow)} fps · ${pond.width}×${pond.height} · draws ${st.draws} · tris ${Math.round(st.triangles)}`;
        frames = 0;
        perfWindow = 0;
      }
    }
  }
  raf = requestAnimationFrame(loop);
}

async function boot() {
  if (!navigator.gpu) throw new Error('navigator.gpu 不存在。');
  const size = bufferSize();
  canvas.width = size.w;
  canvas.height = size.h;
  pond = await createPond({ canvas, width: size.w, height: size.h, fish, seed });

  window.addEventListener('resize', () => {
    const next = bufferSize();
    if (next.w === canvas.width && next.h === canvas.height) return;
    canvas.width = next.w;
    canvas.height = next.h;
    pond.resize(next.w, next.h);
  });

  canvas.addEventListener('pointerdown', (ev) => {
    if (ev.button != null && ev.button !== 0) return;
    const hit = pond.pick(ev.clientX, ev.clientY, canvas.getBoundingClientRect());
    if (hit) pond.feed(hit.x, hit.y);
  });

  document.addEventListener('visibilitychange', () => setPaused(document.hidden || livelyPause));
  window.addEventListener('blur', () => { blurFps = 8; });
  window.addEventListener('focus', () => { blurFps = null; last = performance.now(); });
  window.livelyWallpaperPlaybackChanged = (data) => {
    try {
      const obj = typeof data === 'string' ? JSON.parse(data) : data;
      livelyPause = !!obj.IsPaused;
      setPaused(document.hidden || livelyPause);
    } catch (e) {
      /* Lively sometimes delivers a non-JSON payload; ignore it. */
    }
  };
  document.addEventListener('contextmenu', (ev) => ev.preventDefault());

  last = performance.now();
  if (!document.hidden) raf = requestAnimationFrame(loop);
}

boot().catch(showError);
