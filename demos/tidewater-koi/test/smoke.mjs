// Headless WebGPU render of the pond. Fails if the frame is flat or has no koi.
import { mkdirSync } from 'node:fs';
import { create, globals } from 'webgpu';
import { writePNG } from './png.mjs';

Object.assign(globalThis, globals);
const gpu = create([]);
Object.defineProperty(globalThis, 'navigator', { value: { gpu }, configurable: true });

const { createPond } = await import('../src/pond.js');
const { GPU } = await import('../vendor/tidewater/engine/gpu/GPU.js');
const { readTexture } = await import('../vendor/tidewater/engine/gpu/Readback.js');

const W = 960;
const H = 540;
const pond = await createPond({ width: W, height: H, fish: 46, seed: 7 });
console.log('extents', {
  halfW: pond.halfW.toFixed(2),
  halfH: pond.halfH.toFixed(2),
  cx: pond.centerX.toFixed(2),
  cy: pond.centerY.toFixed(2),
  fish: pond.sim.fish.length,
});
if (!(pond.halfW > 2 && pond.halfH > 1)) {
  throw new Error(`camera extents look wrong: ${pond.halfW} x ${pond.halfH}`);
}

for (let i = 0; i < 90; i++) pond.step(1 / 30);
pond.feed(pond.centerX + 0.4, pond.centerY - 0.25);
for (let i = 0; i < 30; i++) pond.step(1 / 30);

const device = GPU.device;
device.pushErrorScope('validation');
pond.render();
const gpuError = await device.popErrorScope();
if (gpuError) throw new Error(gpuError.message);

const img = await readTexture(pond.ldr.texture);
const rgba = new Uint8Array(img.data);
let r = 0;
let g = 0;
let b = 0;
let n = 0;
let warm = 0;
let bright = 0;
let minL = 255;
let maxL = 0;
for (let i = 0; i < rgba.length; i += 16) {
  const R = rgba[i];
  const G = rgba[i + 1];
  const B = rgba[i + 2];
  r += R;
  g += G;
  b += B;
  n++;
  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  if (L < minL) minL = L;
  if (L > maxL) maxL = L;
  if (R > G + 12 && R > 55) warm++;
  if (G > 145 && G > R) bright++;
}
const mean = { r: r / n, g: g / n, b: b / n };
const stats = { ...pond.stats };
console.log('frame', { mean, minL: minL.toFixed(1), maxL: maxL.toFixed(1), warm, bright, draws: stats.draws, triangles: Math.round(stats.triangles) });

if (mean.g < 35) throw new Error(`frame too dark (g=${mean.g.toFixed(1)})`);
if (mean.g < mean.r * 0.9) throw new Error(`expected green-teal water, rgb=${mean.r.toFixed(1)},${mean.g.toFixed(1)},${mean.b.toFixed(1)}`);
if (maxL - minL < 28) throw new Error(`frame too flat (L ${minL.toFixed(1)}..${maxL.toFixed(1)})`);
if (warm < 6) throw new Error(`koi not visible (warm samples ${warm})`);
if (stats.draws < 4) throw new Error(`expected floor, fish, shadows and plants, draws=${stats.draws}`);

mkdirSync('/opt/cursor/artifacts', { recursive: true });
writePNG('/tmp/koi-webgpu-pond.png', W, H, rgba);
writePNG('/opt/cursor/artifacts/koi-webgpu-pond.png', W, H, rgba);
console.log('smoke ok');
await new Promise((resolve) => setTimeout(resolve, 50));
process.exit(0);
