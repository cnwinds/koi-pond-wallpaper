// Near-top-down koi pond. Water and fish bodies come from Tidewater.
// Steering, pads, pellets, and the click wake are local.

import * as E from '../vendor/tidewater/engine/index.js';
import {
  GPU,
  RenderTarget,
  FullscreenPass,
  MeshRenderer,
  SceneRenderer,
  LAYERS,
  setFrameCamera,
  FrameUniforms,
  G,
  SunShadows,
  ShadowUniforms,
} from '../vendor/tidewater/engine/webgpu.js';
import { CDLOD } from '../vendor/tidewater/core/CDLOD.js';
import { OceanFFT } from '../vendor/tidewater/ocean/OceanFFT.js';
import { WaterSurface } from '../vendor/tidewater/ocean/WaterSurface.js';
import { WaterMaterial } from '../vendor/tidewater/ocean/WaterMaterial.js';
import { createFoamTexture } from '../vendor/tidewater/ocean/FoamTexture.js';
import { Caustics } from '../vendor/tidewater/ocean/Caustics.js';
import { installUnderwaterLighting } from '../vendor/tidewater/ocean/UnderwaterLighting.js';
import { fishGeometry } from '../vendor/tidewater/world/fish/FishGeometry.js';
import { SPECIES } from '../vendor/tidewater/world/fish/FishSpecies.js';
import { createSwimMaterial } from '../vendor/tidewater/world/fish/FishMaterial.js';
import { ReefBatch } from '../vendor/tidewater/world/reef/ReefBatch.js';
import { createSim, mulberry32, angWrap } from './sim.js';
import {
  pondUniforms,
  pondWakeModule,
  skyModule,
  floorMaterial,
  foodMaterial,
  plantMaterial,
  GRADE_WGSL,
} from './shade.js';

const MODELS = ['redSnapper', 'grunt', 'grouper', 'tarpon', 'parrot'];
const TAU = Math.PI * 2;
const _p = new E.Vector3();
const _q = new E.Quaternion();
const _s = new E.Vector3();
const _m = new E.Matrix4();
const _up = new E.Vector3(0, 1, 0);
const _near = new E.Vector3();
const _far = new E.Vector3();

function orientXZ(geometry) {
  const pos = geometry.attributes.position.array;
  const nrm = geometry.attributes.normal.array;
  for (let i = 0; i < pos.length; i += 3) {
    const y = pos[i + 1];
    pos[i + 1] = 0;
    pos[i + 2] = y;
  }
  for (let i = 0; i < nrm.length; i += 3) {
    nrm[i] = 0;
    nrm[i + 1] = 1;
    nrm[i + 2] = 0;
  }
  geometry.computeBoundingSphere();
  return geometry;
}

function hitPlane(camera, nx, ny, yPlane) {
  _near.set(nx, ny, 1).unproject(camera);
  _far.set(nx, ny, 0).unproject(camera);
  const dy = _far.y - _near.y;
  const t = Math.abs(dy) < 1e-8 ? 0 : (yPlane - _near.y) / dy;
  return {
    x: _near.x + (_far.x - _near.x) * t,
    z: _near.z + (_far.z - _near.z) * t,
  };
}

function measureView(camera) {
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < corners.length; i++) {
    const hit = hitPlane(camera, corners[i][0], corners[i][1], 0);
    if (hit.x < minX) minX = hit.x;
    if (hit.x > maxX) maxX = hit.x;
    if (hit.z < minZ) minZ = hit.z;
    if (hit.z > maxZ) maxZ = hit.z;
  }
  return {
    halfW: (maxX - minX) * 0.5,
    halfH: (maxZ - minZ) * 0.5,
    cx: (minX + maxX) * 0.5,
    cy: (minZ + maxZ) * 0.5,
  };
}

function yawPitchRoll(yaw, pitch, roll, q) {
  const sy = Math.sin(yaw * 0.5);
  const cy = Math.cos(yaw * 0.5);
  const sx = Math.sin(pitch * 0.5);
  const cx = Math.cos(pitch * 0.5);
  const sz = Math.sin(roll * 0.5);
  const cz = Math.cos(roll * 0.5);
  const x1 = cy * sx;
  const y1 = sy * cx;
  const z1 = -sy * sx;
  const w1 = cy * cx;
  q.set(x1 * cz + y1 * sz, -x1 * sz + y1 * cz, w1 * sz + z1 * cz, w1 * cz - z1 * sz);
  return q;
}

function writeInstance(mesh, index, x, y, z, yaw, sx, sz) {
  _p.set(x, y, z);
  _q.setFromAxisAngle(_up, yaw);
  _s.set(sx, 1, sz);
  _m.compose(_p, _q, _s);
  mesh.setMatrixAt(index, _m);
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

function assignKinds(fish) {
  for (let i = 0; i < fish.length; i++) {
    const f = fish[i];
    if (f.pattern === 0) f.kind = 0;
    else if (f.pattern === 1) f.kind = 1;
    else if (f.pattern === 2) f.kind = f.seed > 8 ? 2 : 4;
    else f.kind = 3;
    f.swim = f.phase;
    f.prevX = f.x;
    f.prevY = f.y;
    f.prevH = f.heading;
  }
}

export async function createPond({ canvas = null, width = 1280, height = 720, fish = 46, seed = 7 } = {}) {
  await GPU.init({ canvas, headless: !canvas });
  // Water and lit materials bind the shadow map. Cascades are not rendered.
  const shadows = new SunShadows({ size: 32, splits: [40], pcssCascades: 0 });
  shadows.enabled = false;
  ShadowUniforms.fields.enabled.value = 0;

  const camera = new E.PerspectiveCamera(30, width / Math.max(1, height), 0.2, 80);
  camera.position.set(0, 13.2, 3.6);
  camera.lookAt(0, -0.55, 0);

  const ext = measureView(camera);
  const sim = createSim({
    fish,
    halfW: ext.halfW,
    halfH: ext.halfH,
    cx: ext.cx,
    cy: ext.cy,
    seed,
  });
  assignKinds(sim.fish);

  const sun = new E.Vector3(0.28, 0.92, 0.22).normalize();
  G.sunDir.value.copy(sun);
  G.sunColor.value.setRGB(5.4, 5.1, 4.6);
  G.skyIrradiance.value.setRGB(0.42, 0.5, 0.46);
  G.horizonColor.value.setRGB(0.55, 0.68, 0.62);
  G.seaLevel.value = 0;
  G.cameraWaterHeight.value = 0;
  G.cameraUnderwater.value = 0;
  G.windSpeed.value = 2.6;
  G.windDir.value.set(0.42, 0.91).normalize();
  G.waterAbsorption.value.set(0.22, 0.055, 0.028);
  G.waterScattering.value.set(0.018, 0.026, 0.03);

  const fft = new OceanFFT(null, {
    cascades: 2,
    sizes: [14, 3.6],
    depth: 1.65,
    choppiness: 0.55,
    local: {
      windSpeed: 2.8,
      windDirection: 38,
      fetch: 1.4,
      spreadBlend: 0.72,
      swell: 0.04,
      shortWavesFade: 0.06,
    },
    swell: {
      scale: 0.22,
      windSpeed: 2.1,
      windDirection: 12,
      fetch: 6,
      spreadBlend: 1,
      swell: 0.35,
      shortWavesFade: 0.18,
    },
  });
  fft.foamBias.value = 0.22;
  const foamTexture = createFoamTexture(null, 256);
  const cdlod = new CDLOD({
    gridSize: 72,
    leafSize: 64,
    levels: 1,
    rangeFactor: 4,
    maxInstances: 4,
    minY: -2,
    maxY: 2,
    center: { x: -32, z: -32, size: 64 },
  });
  const surface = new WaterSurface({ fft, cdlod, foamTexture });
  surface.wake = { module: pondWakeModule };
  surface.amplitude.value = 0.72;
  surface.slopeScale.value = 1.35;
  surface.foamCoverage.value = 0.22;

  const caustics = new Caustics(null, fft);
  caustics.strength.value = 0.9;
  const underwater = installUnderwaterLighting({ fft, caustics, surface });

  const scene = new E.Scene();
  const meshRenderer = new MeshRenderer();
  meshRenderer.syncPipelines = true;
  const sceneRenderer = new SceneRenderer(meshRenderer, scene, camera);
  sceneRenderer.clearColor = [0.05, 0.16, 0.13, 1];

  const waterMat = new WaterMaterial({
    surface,
    sky: { module: skyModule },
    sceneCopy: sceneRenderer.opaqueCopy,
    sceneDepthHalf: sceneRenderer.opaqueDepthHalf,
  });
  waterMat.params.refraction.value = 0.16;
  waterMat.params.foamIntensity.value = 0.4;
  waterMat.params.roughness.value = 0.04;
  waterMat.params.sss.value = 0.55;
  waterMat.params.ssr.value = 0;
  const waterMesh = new E.Mesh(cdlod.geometry, waterMat);
  waterMesh.frustumCulled = false;
  waterMesh.layers.set(LAYERS.WATER);

  const floor = new E.Mesh(orientXZ(new E.PlaneGeometry(1, 1)), floorMaterial());
  floor.frustumCulled = false;
  floor.position.y = -1.12;

  const kinds = MODELS.map((name) => ({
    geometry: fishGeometry(SPECIES[name], { lod: 1, pose: 'swim', eyes: true }),
  }));
  const batch = new ReefBatch('Fish', kinds, { maxInstances: 80 });
  const fishMesh = batch.createMesh(createSwimMaterial(batch));
  fishMesh.layers.set(LAYERS.OPAQUE);

  const foodMesh = new E.InstancedMesh(orientXZ(new E.CircleGeometry(1, 14)), foodMaterial(), 4);
  foodMesh.count = 0;
  foodMesh.frustumCulled = false;

  const plants = buildPlants(mulberry32((seed + 101) >>> 0));
  const plantGeo = orientXZ(new E.CircleGeometry(1, 28));
  const plantAttr = new Float32Array(plants.length * 4);
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    plantAttr[i * 4] = plant.kind;
    plantAttr[i * 4 + 1] = plant.seed;
    plantAttr[i * 4 + 2] = plant.shade;
    plantAttr[i * 4 + 3] = plant.phase;
  }
  plantGeo.setAttribute('aPlant', new E.InstancedBufferAttribute(plantAttr, 4));
  const plantMesh = new E.InstancedMesh(plantGeo, plantMaterial(), plants.length);
  plantMesh.frustumCulled = false;
  plantMesh.layers.set(LAYERS.TRANSPARENT);

  scene.add(floor, fishMesh, foodMesh, waterMesh, plantMesh);

  const ldrTarget = new RenderTarget(width, height, {
    colors: ['rgba8unorm'],
    label: 'pond-ldr',
  });
  const outFormat = canvas ? GPU.format : 'rgba8unorm';
  const grade = new FullscreenPass({
    label: 'pond-grade',
    colorFormats: [outFormat],
    bindings: { hdr: { texture: () => sceneRenderer.sceneRT.texture } },
    code: GRADE_WGSL,
  });

  const pond = {
    canvas,
    camera,
    sim,
    shadows,
    ldr: ldrTarget,
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
      syncFish();
    },
    resize(w, h) {
      pond.width = Math.max(1, w | 0);
      pond.height = Math.max(1, h | 0);
      camera.aspect = pond.width / pond.height;
      const view = measureView(camera);
      sim.setBounds(view.halfW, view.halfH, view.cx, view.cy);
      const cover = Math.max(view.halfW, view.halfH) * 3.4;
      floor.scale.set(cover, 1, cover);
      sceneRenderer.setSize(pond.width, pond.height);
      ldrTarget.setSize(pond.width, pond.height);
      layoutPlants();
      syncFish();
    },
    render() {
      GPU.beginFrame();
      const F = FrameUniforms.fields;
      F.time.value = sim.time;
      F.dt.value = pond._dt;
      F.frameIndex.value = (F.frameIndex.value + 1) >>> 0;
      pondUniforms.fields.bounds.value = [sim.bounds.halfW, sim.bounds.halfH, sim.bounds.cx, sim.bounds.cy];
      packRings();
      fft.update(pond._dt);
      caustics.update();
      underwater.update(camera);
      cdlod.update(camera);
      setFrameCamera(camera, pond.width, pond.height);
      sceneRenderer.render();
      const outView = canvas
        ? GPU.context.getCurrentTexture().createView()
        : ldrTarget.texture.view();
      grade.render({ colorViews: [outView] });
      GPU.submit();
    },
    pick(clientX, clientY, rect) {
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
      const hit = hitPlane(camera, nx, ny, 0);
      return { x: hit.x, y: hit.z };
    },
  };

  function layoutPlants() {
    const unit = Math.min(sim.bounds.halfW, sim.bounds.halfH);
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      const x = sim.bounds.cx + plant.nx * sim.bounds.halfW;
      const z = sim.bounds.cy + plant.ny * sim.bounds.halfH;
      const s = plant.scaleN * (unit / 5.4);
      writeInstance(plantMesh, i, x, 0.03, z, plant.rot, s, s * plant.squash);
    }
    plantMesh.instanceMatrix.needsUpdate = true;
  }

  function syncFish() {
    const D = batch.data;
    const dt = Math.max(pond._dt, 1e-4);
    batch.begin();
    for (let i = 0; i < sim.fish.length; i++) {
      const f = sim.fish[i];
      const freq = 1.05 + Math.max(0, f.hz - 4.2) * 0.28;
      const dPhase = dt * TAU * freq;
      f.swim = (f.swim + dPhase) % (TAU * 64);
      const length = f.len * 0.58;
      const y = -0.38 - (f.seed % 1) * 0.28;
      const yaw = Math.atan2(Math.cos(f.heading), Math.sin(f.heading));
      const yawRate = angWrap(f.heading - f.prevH) / dt;
      yawPitchRoll(yaw, 0, Math.max(-0.35, Math.min(0.35, yawRate * 0.08)), _q);
      const o = i * 16;
      D[o] = f.x;
      D[o + 1] = y;
      D[o + 2] = f.y;
      D[o + 3] = length;
      D[o + 4] = _q.x;
      D[o + 5] = _q.y;
      D[o + 6] = _q.z;
      D[o + 7] = _q.w;
      D[o + 8] = f.swim;
      D[o + 9] = 0.05 + Math.min(0.04, f.speed * 0.03);
      D[o + 10] = Math.max(-0.22, Math.min(0.22, yawRate * 0.045));
      D[o + 11] = SPECIES[MODELS[f.kind]].pattern + ((f.seed % 1) * 0.83 + 0.02);
      D[o + 12] = f.x - f.prevX;
      D[o + 13] = 0;
      D[o + 14] = f.y - f.prevY;
      D[o + 15] = dPhase;
      f.prevX = f.x;
      f.prevY = f.y;
      f.prevH = f.heading;
      batch.add(f.kind, i);
    }
    batch.commit();
    batch.dataAttr.needsUpdate = true;

    foodMesh.count = sim.foods.length;
    for (let i = 0; i < sim.foods.length; i++) {
      const food = sim.foods[i];
      const pulse = 0.07 + Math.sin(sim.time * 5 + i) * 0.01;
      writeInstance(foodMesh, i, food.x, -0.12, food.y, sim.time * 0.4, pulse, pulse);
    }
    foodMesh.instanceMatrix.needsUpdate = true;
  }

  function packRings() {
    const data = pondUniforms.fields.rings.value;
    data.fill(0);
    const n = Math.min(8, sim.ripples.length);
    for (let i = 0; i < n; i++) {
      const ring = sim.ripples[i];
      const o = i * 4;
      data[o] = ring.x;
      data[o + 1] = ring.y;
      data[o + 2] = ring.age;
      data[o + 3] = ring.amp;
    }
  }

  pond.resize(width, height);
  return pond;
}
