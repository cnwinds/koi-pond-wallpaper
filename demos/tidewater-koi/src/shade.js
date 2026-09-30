// Pond-only shading on top of Tidewater's water and fish.
// Click ripples are a wake module the water surface samples as height and slope.
// The floor, pads, and pellets are original. The water shader is not.

import { UniformBlock, ShaderModule } from '../vendor/tidewater/engine/webgpu.js';
import { commonModule } from '../vendor/tidewater/engine/render/wgsl/common.js';
import { Material } from '../vendor/tidewater/engine/render/Material.js';

export const pondUniforms = new UniformBlock('PondWake', {
  rings: ['vec4f[8]', new Float32Array(32)],
  bounds: ['vec4f', [8, 4.5, 0, 0]],
}, { label: 'pondWake' });

const WAKE_WGSL = /* wgsl */`
struct WakeFrag { slopes: vec2f, foam: f32, aeration: f32 }

fn wakeHeight(xz: vec2f) -> f32 {
  var h = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondWake.rings[i];
    if (rip.w <= 0.01) { continue; }
    let dist = length(xz - rip.xy);
    let x = dist - rip.z * 0.38;
    let env = exp(-rip.z * 0.2) * rip.w;
    let gauss = exp(-x * x * 2.4);
    h += sin(x * 7.2) * gauss * env * 0.07;
  }
  return h;
}

fn wakeDisplacement(xz: vec2f) -> vec3f {
  return vec3f(0.0, wakeHeight(xz), 0.0);
}

fn wakeFragment(xz: vec2f) -> WakeFrag {
  var slope = vec2f(0.0);
  var foam = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondWake.rings[i];
    if (rip.w <= 0.01) { continue; }
    let o = xz - rip.xy;
    let dist = max(length(o), 0.04);
    let x = dist - rip.z * 0.38;
    let env = exp(-rip.z * 0.2) * rip.w;
    let gauss = exp(-x * x * 2.4);
    let s = sin(x * 7.2);
    let c = cos(x * 7.2);
    let dh = (c * 7.2 * gauss + s * gauss * (-4.8 * x)) * env * 0.07;
    slope += (o / dist) * dh;
    foam += sat(s) * gauss * env * 0.18;
  }
  var w: WakeFrag;
  w.slopes = slope;
  w.foam = foam;
  w.aeration = foam * 0.12;
  return w;
}

fn pondShore(p: vec2f) -> f32 {
  let q = (p - pondWake.bounds.zw) / max(pondWake.bounds.xy, vec2f(0.001));
  return smoothstep(0.72, 1.18, length(q * vec2f(1.0, 1.04)));
}
`;

export const pondWakeModule = new ShaderModule({
  name: 'pondWake',
  deps: [commonModule],
  uniforms: pondUniforms,
  uniformName: 'pondWake',
  code: WAKE_WGSL,
});

// Flat bed so the water shader traces a pond-depth column. Without it the ocean
// material assumes ~80 m of water and the refraction sample misses the fish.
export const pondBedModule = new ShaderModule({
  name: 'pondBed',
  code: /* wgsl */`
fn terrainHeightAt(xz: vec2f) -> f32 { return -1.12; }
fn terrainNormalRock(xz: vec2f) -> vec4f { return vec4f(0.0); }
fn terrainNormalRockLevel(xz: vec2f, level: f32) -> vec4f { return vec4f(0.0); }
fn terrainSunShadowAt(P: vec3f) -> f32 { return 1.0; }
`,
});

// Enough for WaterMaterial's reflection terms. Not the atmosphere or clouds.
export const skyModule = new ShaderModule({
  name: 'pondSky',
  code: /* wgsl */`
fn skyReflectionRadiance(dir: vec3f) -> vec3f {
  let h = sat(dir.y * 0.55 + 0.08);
  return mix(vec3f(0.58, 0.7, 0.64), vec3f(0.34, 0.55, 0.64), h);
}
fn skyRadianceWithClouds(dir: vec3f, withSun: bool) -> vec3f {
  let disk = select(0.0, pow(sat(dot(dir, frame.sunDir)), 1400.0) * 8.0, withSun);
  return skyReflectionRadiance(dir) + vec3f(disk);
}
`,
});

export function floorMaterial() {
  return new Material({
    name: 'pond-floor',
    roughness: 0.92,
    metalness: 0,
    modules: [pondWakeModule],
    underwaterLighting: 'full',
    surface: /* wgsl */`
      let p = in.P.xz;
      let shore = pondShore(p);
      let q = length((p - pondWake.bounds.zw) / max(pondWake.bounds.xy, vec2f(0.001)));
      let n = mx_noise_float2(p * 0.85);
      let n2 = mx_noise_float2(p * 3.4 + vec2f(2.0, 5.0));
      let deep = vec3f(0.045, 0.16, 0.12);
      let midc = vec3f(0.09, 0.28, 0.2);
      let shallow = vec3f(0.2, 0.42, 0.26);
      var col = mix(shallow, midc, smoothstep(0.08, 0.5, q));
      col = mix(col, deep, smoothstep(0.45, 1.0, q));
      col *= 0.9 + 0.16 * n + 0.08 * n2;
      col = mix(col, vec3f(0.04, 0.07, 0.045), shore * 0.72);
      s.albedo = col;
      s.roughness = mix(0.86, 0.98, shore);
      s.emissive = vec3f(0.0);
    `,
  });
}

export function foodMaterial() {
  return new Material({
    name: 'food',
    roughness: 0.7,
    metalness: 0,
    underwaterLighting: 'full',
    surface: /* wgsl */`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      s.albedo = mix(vec3f(0.72, 0.42, 0.14), vec3f(0.38, 0.2, 0.07), smoothstep(0.15, 0.95, r));
      s.alpha = 1.0;
    `,
  });
}

export function plantMaterial() {
  return new Material({
    name: 'plants',
    roughness: 0.72,
    metalness: 0,
    transparent: true,
    depthWrite: false,
    underwaterLighting: 'none',
    attributes: { aPlant: 'vec4f' },
    varyings: { vPlant: 'vec4f' },
    vertex: /* wgsl */`
      o.vPlant = v.aPlant;
      v.position.y += sin(frame.time * 0.55 + v.aPlant.w) * 0.012;
    `,
    surface: /* wgsl */`
      let kind = in.vs.vPlant.x;
      let seed = in.vs.vPlant.y;
      let shade = in.vs.vPlant.z;
      let q = in.uv * 2.0 - 1.0;
      let ang = atan2(q.y, q.x);
      let rad = length(q);
      var col = vec3f(0.1, 0.35, 0.14);
      var mask = 1.0;
      if (kind < 0.5) {
        let n = mx_noise_float2(q * 1.7 + seed);
        let lobes = 0.7 + 0.3 * pow(sat(0.5 + 0.5 * cos(ang * 3.0 + seed)), 0.55);
        let r = rad / lobes * (0.88 + 0.2 * n);
        mask = smoothstep(1.06, 0.7, r);
        col = mix(vec3f(0.03, 0.14, 0.05), vec3f(0.14, 0.34, 0.1), shade);
        col = mix(col, col * 0.62, smoothstep(0.4, 0.95, rad));
      } else if (kind < 1.5) {
        let n = mx_noise_float2(q * 2.8 + seed);
        let scallop = 0.045 * sin(ang * 8.0 + seed);
        let r = rad * (0.9 + 0.1 * n) - scallop;
        let dAng = abs(atan2(sin(ang - 0.18), cos(ang - 0.18)));
        let notch = smoothstep(0.5, 0.04, dAng) * smoothstep(0.16, 0.7, rad);
        mask = smoothstep(1.02, 0.86, r) * (1.0 - notch);
        let veins = pow(abs(cos(ang * 5.0 + seed * 0.2)), 10.0) * smoothstep(0.05, 0.7, rad);
        col = mix(vec3f(0.05, 0.26, 0.08), vec3f(0.2, 0.48, 0.14), shade);
        col = mix(vec3f(0.03, 0.16, 0.05), col, smoothstep(0.0, 0.38, rad));
        col = mix(col, vec3f(0.34, 0.58, 0.18), smoothstep(0.7, 0.98, rad) * 0.65);
        col = mix(col, col * 0.45, veins);
      } else {
        let petals = pow(sat(0.64 + 0.36 * cos(ang * 7.0 + seed)), 0.7);
        let petalRad = rad / max(petals, 0.35);
        mask = smoothstep(1.0, 0.62, petalRad) * smoothstep(0.0, 0.05, rad);
        let center = smoothstep(0.32, 0.08, rad);
        let pink = mix(vec3f(0.82, 0.2, 0.36), vec3f(0.98, 0.66, 0.74), sat(1.0 - rad * 0.8));
        col = mix(pink, vec3f(0.98, 0.84, 0.34), center);
      }
      s.albedo = col;
      s.alpha = sat(mask);
    `,
  });
}

export const GRADE_WGSL = /* wgsl */`
fn fragment(in: FSIn) -> vec4f {
  var c = textureLoad(hdr, vec2i(in.pos.xy), 0).rgb;
  c *= 1.05;
  c = c / (c + vec3f(0.85));
  let uv = in.uv;
  let vig = smoothstep(1.2, 0.35, length((uv - 0.5) * vec2f(1.05, 1.2)));
  c *= mix(0.72, 1.0, vig);
  c = mix(c, c * vec3f(0.9, 1.08, 1.0), 0.28);
  let grain = (interleavedGradientNoise(in.pos.xy + vec2f(frame.time * 17.0, 0.0)) - 0.5) * 0.008;
  return vec4f(linearToSrgb(sat3(c + grain)), 1.0);
}
`;
