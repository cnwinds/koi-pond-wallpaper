// Top-down koi pond rendered with the vendored Tidewater engine.
// Water is a shaded floor plus a grade pass, not the FFT ocean or the post stack.

import * as E from '../vendor/tidewater/engine/index.js';
import {
  GPU,
  RenderTarget,
  FullscreenPass,
  MeshRenderer,
  setFrameCamera,
  FrameUniforms,
  SunShadows,
} from '../vendor/tidewater/engine/webgpu.js';
import { createSim, mulberry32 } from './sim.js';
import { koiGeometry } from './geom.js';
import {
  pondUniforms,
  floorMaterial,
  koiMaterial,
  shadowMaterial,
  foodMaterial,
  plantMaterial,
  GRADE_WGSL,
} from './shade.js';

const _p = new E.Vector3();
const _q = new E.Quaternion();
const _s = new E.Vector3();
const _m = new E.Matrix4();
const _axis = new E.Vector3(0, 0, 1);
const _near = new E.Vector3();
const _far = new E.Vector3();

function writeInstance(mesh, index, x, y, z, rot, sx, sy) {
  _p.set(x, y, z);
  _q.setFromAxisAngle(_axis, rot);
  _s.set(sx, sy, 1);
  _m.compose(_p, _q, _s);
  mesh.setMatrixAt(index, _m);
}

function measureView(camera) {
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < corners.length; i++) {
    const nx = corners[i][0];
    const ny = corners[i][1];
    _near.set(nx, ny, 1).unproject(camera);
    _far.set(nx, ny, 0).unproject(camera);
    const dz = _far.z - _near.z;
    const t = Math.abs(dz) < 1e-6 ? 0 : (0 - _near.z) / dz;
    const x = _near.x + (_far.x - _near.x) * t;
    const y = _near.y + (_far.y - _near.y) * t;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return {
    halfW: (maxX - minX) * 0.5,
    halfH: (maxY - minY) * 0.5,
    cx: (minX + maxX) * 0.5,
    cy: (minY + maxY) * 0.5,
  };
}

function buildPlants(rng) {
  const plants = [];
  function add(nx, ny, scaleN, kind) {
    plants.push({
      nx,
      ny,
      scaleN,
      kind,
      seed: rng() * 12 + 0.2,
      shade: rng(),
      phase: rng() * Math.PI * 2,
      rot: rng() * Math.PI * 2,
      squash: 0.82 + rng() * 0.28,
    });
  }
  const corners = [[-0.98, -0.92], [0.98, -0.92], [-0.98, 0.92], [0.98, 0.92]];
  for (let c = 0; c < corners.length; c++) {
    for (let i = 0; i < 6; i++) {
      add(
        corners[c][0] + (rng() - 0.5) * 0.32,
        corners[c][1] + (rng() - 0.5) * 0.26,
        0.75 + rng() * 0.75,
        rng() < 0.4 ? 0 : 1,
      );
    }
  }
  for (let i = 0; i < 18; i++) {
    const a = rng() * Math.PI * 2;
    const r = 0.76 + rng() * 0.3;
    add(Math.cos(a) * r, Math.sin(a) * r, 0.42 + rng() * 0.42, 1);
  }
  for (let i = 0; i < 4; i++) {
    const a = rng() * Math.PI * 2;
    const r = 0.48 + rng() * 0.16;
    add(Math.cos(a) * r, Math.sin(a) * r, 0.36 + rng() * 0.22, 1);
  }
  for (let i = 0; i < 5; i++) {
    const a = (i + 0.35) / 5 * Math.PI * 2;
    const r = 0.7 + rng() * 0.18;
    add(Math.cos(a) * r, Math.sin(a) * r, 0.28 + rng() * 0.14, 2);
  }
  plants.sort((a, b) => a.kind - b.kind || b.scaleN - a.scaleN);
  return plants;
}

export async function createPond({ canvas = null, width = 1280, height = 720, fish = 46, seed = 7 } = {}) {
  await GPU.init({ canvas, headless: !canvas });
  // Unlit materials still link the engine's shadow module. A 32² cascade satisfies
  // the binding; the pond does not render cascaded shadows.
  const shadows = new SunShadows({ size: 32, splits: [40], pcssCascades: 0 });

  const camera = new E.PerspectiveCamera(24, width / Math.max(1, height), 0.15, 90);
  camera.position.set(0, 0, 26);
  camera.lookAt(0, 0, 0);

  const ext = measureView(camera);
  const sim = createSim({
    fish,
    halfW: ext.halfW,
    halfH: ext.halfH,
    cx: ext.cx,
    cy: ext.cy,
    seed,
  });

  const scene = new E.Scene();
  const floor = new E.Mesh(new E.PlaneGeometry(1, 1), floorMaterial());
  floor.frustumCulled = false;
  floor.renderOrder = 0;

  const fishGeo = koiGeometry();
  const fishAttr = new Float32Array(sim.fish.length * 4);
  for (let i = 0; i < sim.fish.length; i++) {
    const f = sim.fish[i];
    fishAttr[i * 4] = f.pattern;
    fishAttr[i * 4 + 1] = f.phase;
    fishAttr[i * 4 + 2] = f.hz;
    fishAttr[i * 4 + 3] = f.seed;
  }
  fishGeo.setAttribute('aFish', new E.InstancedBufferAttribute(fishAttr, 4));
  const fishMesh = new E.InstancedMesh(fishGeo, koiMaterial(), sim.fish.length);
  fishMesh.frustumCulled = false;
  fishMesh.renderOrder = 1;

  const shadowMesh = new E.InstancedMesh(new E.CircleGeometry(1, 18), shadowMaterial(), sim.fish.length);
  shadowMesh.frustumCulled = false;
  shadowMesh.renderOrder = 0;

  const foodMesh = new E.InstancedMesh(new E.CircleGeometry(1, 14), foodMaterial(), 4);
  foodMesh.count = 0;
  foodMesh.frustumCulled = false;
  foodMesh.renderOrder = 2;

  const plants = buildPlants(mulberry32((seed + 101) >>> 0));
  const plantGeo = new E.CircleGeometry(1, 28);
  const plantAttr = new Float32Array(plants.length * 4);
  for (let i = 0; i < plants.length; i++) {
    const p = plants[i];
    plantAttr[i * 4] = p.kind;
    plantAttr[i * 4 + 1] = p.seed;
    plantAttr[i * 4 + 2] = p.shade;
    plantAttr[i * 4 + 3] = p.phase;
  }
  plantGeo.setAttribute('aPlant', new E.InstancedBufferAttribute(plantAttr, 4));
  const plantMesh = new E.InstancedMesh(plantGeo, plantMaterial(), plants.length);
  plantMesh.frustumCulled = false;
  plantMesh.renderOrder = 1;

  scene.add(floor, fishMesh, foodMesh, shadowMesh, plantMesh);

  const sceneRT = new RenderTarget(width, height, {
    colors: ['rgba16float'],
    depth: 'depth32float',
    label: 'pond-scene',
  });
  const ldr = new RenderTarget(width, height, { colors: ['rgba8unorm'], label: 'pond-ldr' });
  const outFormat = canvas ? GPU.format : 'rgba8unorm';
  const grade = new FullscreenPass({
    label: 'pond-grade',
    colorFormats: [outFormat],
    bindings: { hdr: { texture: () => sceneRT.texture } },
    code: GRADE_WGSL,
  });
  const meshRenderer = new MeshRenderer();
  meshRenderer.syncPipelines = true;

  const pond = {
    canvas,
    camera,
    sim,
    ldr,
    shadows,
    width,
    height,
    _dt: 1 / 30,
    get halfW() { return sim.bounds.halfW; },
    get halfH() { return sim.bounds.halfH; },
    get centerX() { return sim.bounds.cx; },
    get centerY() { return sim.bounds.cy; },
    get stats() { return meshRenderer.stats; },
    get time() { return sim.time; },
    feed(x, y) { return sim.feed(x, y); },
    step(dt) {
      pond._dt = dt;
      sim.step(dt);
      syncDynamic();
    },
    resize(w, h) {
      pond.width = Math.max(1, w | 0);
      pond.height = Math.max(1, h | 0);
      camera.aspect = pond.width / pond.height;
      const view = measureView(camera);
      sim.setBounds(view.halfW, view.halfH, view.cx, view.cy);
      const cover = Math.max(view.halfW, view.halfH) * 4.2;
      floor.scale.set(cover, cover, 1);
      sceneRT.setSize(pond.width, pond.height);
      ldr.setSize(pond.width, pond.height);
      layoutPlants();
      syncDynamic();
    },
    render() {
      GPU.beginFrame();
      FrameUniforms.fields.time.value = sim.time;
      FrameUniforms.fields.dt.value = pond._dt;
      FrameUniforms.fields.frameIndex.value = (FrameUniforms.fields.frameIndex.value + 1) >>> 0;
      pondUniforms.fields.bounds.value = [sim.bounds.halfW, sim.bounds.halfH, sim.bounds.cx, sim.bounds.cy];
      packRipples();
      setFrameCamera(camera, pond.width, pond.height);
      meshRenderer.render(scene, {
        camera,
        kind: 'color',
        label: 'pond',
        colorViews: [sceneRT.texture.view()],
        colorFormats: ['rgba16float'],
        clearColors: [[0.08, 0.2, 0.16, 1]],
        depthView: sceneRT.depthTexture.view(),
        depthFormat: 'depth32float',
        clearDepth: 0,
      });
      const outView = canvas
        ? GPU.context.getCurrentTexture().createView()
        : ldr.texture.view();
      grade.render({ colorViews: [outView] });
      GPU.submit();
    },
    pick(clientX, clientY, rect) {
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
      _near.set(nx, ny, 1).unproject(camera);
      _far.set(nx, ny, 0).unproject(camera);
      const dz = _far.z - _near.z;
      if (Math.abs(dz) < 1e-6) return null;
      const t = (0 - _near.z) / dz;
      return {
        x: _near.x + (_far.x - _near.x) * t,
        y: _near.y + (_far.y - _near.y) * t,
      };
    },
  };

  function layoutPlants() {
    const unit = Math.min(sim.bounds.halfW, sim.bounds.halfH);
    for (let i = 0; i < plants.length; i++) {
      const p = plants[i];
      const x = sim.bounds.cx + p.nx * sim.bounds.halfW;
      const y = sim.bounds.cy + p.ny * sim.bounds.halfH;
      const s = p.scaleN * (unit / 5.15);
      const z = 0.48 + p.kind * 0.03;
      writeInstance(plantMesh, i, x, y, z, p.rot, s, s * p.squash);
    }
    plantMesh.instanceMatrix.needsUpdate = true;
  }

  function syncDynamic() {
    for (let i = 0; i < sim.fish.length; i++) {
      const f = sim.fish[i];
      const sc = f.len / 1.72;
      writeInstance(fishMesh, i, f.x, f.y, f.z, f.heading, sc, sc * 0.9);
      const sh = f.len * 0.48;
      const ox = Math.cos(f.heading) * 0.05;
      const oy = Math.sin(f.heading) * 0.05;
      writeInstance(shadowMesh, i, f.x - ox, f.y - oy, 0.035, f.heading, sh, sh * 0.36);
    }
    fishMesh.instanceMatrix.needsUpdate = true;
    shadowMesh.instanceMatrix.needsUpdate = true;

    foodMesh.count = sim.foods.length;
    for (let i = 0; i < sim.foods.length; i++) {
      const food = sim.foods[i];
      const pulse = 0.085 + Math.sin(sim.time * 5 + i) * 0.012;
      writeInstance(foodMesh, i, food.x, food.y, 0.32, sim.time * 0.4, pulse, pulse);
    }
    foodMesh.instanceMatrix.needsUpdate = true;
  }

  function packRipples() {
    const data = pondUniforms.fields.ripples.value;
    data.fill(0);
    const n = Math.min(8, sim.ripples.length);
    for (let i = 0; i < n; i++) {
      const r = sim.ripples[i];
      const o = i * 4;
      data[o] = r.x;
      data[o + 1] = r.y;
      data[o + 2] = r.age;
      data[o + 3] = r.amp;
    }
  }

  pond.resize(width, height);
  return pond;
}
