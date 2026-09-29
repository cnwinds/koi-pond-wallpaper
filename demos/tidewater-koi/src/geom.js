// Flat top-down koi: head at +X, tail at -X, facing +Z so an overhead camera sees the back.

import { BufferGeometry, Float32BufferAttribute } from '../vendor/tidewater/engine/index.js';

function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function bodyHalfWidth(t) {
  const ped = smoothstep(0, 0.2, t);
  const snout = smoothstep(0.74, 1, t);
  const belly = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
  let w = 0.034 + Math.pow(belly, 0.58) * 0.15;
  w *= 0.4 + 0.6 * ped;
  w *= 1 - snout * 0.8;
  return w;
}

export function koiGeometry() {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  function push(x, y, z, u, v) {
    positions.push(x, y, z);
    normals.push(0, 0, 1);
    uvs.push(u, v);
    return positions.length / 3 - 1;
  }

  const seg = 18;
  const ring = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const x = -0.92 + t * 1.72;
    const w = bodyHalfWidth(t);
    ring.push([push(x, w, 0.02, t, 1), push(x, -w, 0.02, t, -1)]);
  }
  for (let i = 0; i < seg; i++) {
    const [a, b] = ring[i];
    const [c, d] = ring[i + 1];
    indices.push(a, c, b, b, c, d);
  }

  const base = push(-0.92, 0, 0.02, 0, 0);
  const fans = 7;
  const tips = [];
  for (let i = 0; i < fans; i++) {
    const k = i / (fans - 1);
    const spread = (k - 0.5) * 0.86;
    const len = 0.34 + Math.cos((k - 0.5) * Math.PI) * 0.2;
    tips.push(push(-0.92 - len, spread, 0.018, -0.28, (k - 0.5) * 2));
  }
  for (let i = 0; i < fans - 1; i++) indices.push(base, tips[i], tips[i + 1]);

  // Pectoral fins. Negative uv.x marks them so the vertex wave flaps harder.
  const fx = 0.22;
  const fy = 0.12;
  const l0 = push(fx + 0.05, fy, 0.025, 0.62, 1.02);
  const l1 = push(fx - 0.1, fy * 0.7, 0.025, 0.5, 0.9);
  const l2 = push(fx - 0.05, fy + 0.26, 0.02, -0.15, 1.7);
  indices.push(l0, l2, l1);
  const r0 = push(fx + 0.05, -fy, 0.025, 0.62, -1.02);
  const r1 = push(fx - 0.1, -fy * 0.7, 0.025, 0.5, -0.9);
  const r2 = push(fx - 0.05, -(fy + 0.26), 0.02, -0.15, -1.7);
  indices.push(r0, r1, r2);

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}
