// Hand-written pond shading on Tidewater's material / shader-module path.
// Caustics are not the FFT ocean; they are a shallow-water pattern for the wallpaper view.

import { UniformBlock, ShaderModule } from '../vendor/tidewater/engine/webgpu.js';
import { commonModule } from '../vendor/tidewater/engine/render/wgsl/common.js';
import { Material } from '../vendor/tidewater/engine/render/Material.js';

export const pondUniforms = new UniformBlock('PondParams', {
  ripples: ['vec4f[8]', new Float32Array(32)],
  bounds: ['vec4f', [8, 4.5, 0, 0]],
}, { label: 'pond' });

const POND_WGSL = /* wgsl */`
fn rippleDisp(p: vec2f) -> vec2f {
  var d = vec2f(0.0);
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondParams.ripples[i];
    if (rip.w <= 0.01) { continue; }
    let o = p - rip.xy;
    let dist = length(o);
    let rad = rip.z * 1.2;
    let band = exp(-pow2((dist - rad) * 5.2)) * exp(-rip.z * 0.72) * rip.w;
    d += o * (1.0 / max(dist, 0.05)) * band * 0.28;
  }
  return d;
}

fn rippleRing(p: vec2f) -> f32 {
  var a = 0.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let rip = pondParams.ripples[i];
    if (rip.w <= 0.01) { continue; }
    let dist = length(p - rip.xy);
    let rad = rip.z * 1.2;
    a += exp(-pow2((dist - rad) * 7.5)) * exp(-rip.z * 0.62) * rip.w;
  }
  return a;
}

fn pondShore(p: vec2f) -> f32 {
  let q = (p - pondParams.bounds.zw) / max(pondParams.bounds.xy, vec2f(0.001));
  return smoothstep(0.7, 1.16, length(q * vec2f(1.0, 1.04)));
}

fn pondCaustic(p: vec2f, t: f32) -> f32 {
  let q = p + rippleDisp(p);
  let w1 = mx_worley_noise_vec2_2(q * 1.35 + vec2f(t * 0.033, -t * 0.02), 1.0);
  let w2 = mx_worley_noise_vec2_2(q * 2.15 + vec2f(-t * 0.026, t * 0.04) + vec2f(4.1, 1.7), 0.9);
  let e1 = 1.0 - smoothstep(0.0, 0.18, w1.y - w1.x);
  let e2 = 1.0 - smoothstep(0.0, 0.13, w2.y - w2.x);
  let lines = pow(sat(e1 * 0.8 + e2 * 0.72), 1.15);
  let glow = pow(sat(0.58 - w1.x), 2.2) * 0.62 + pow(sat(0.48 - w2.x), 2.0) * 0.28;
  var uv = q * 0.85;
  var sum = 0.0;
  for (var i = 1; i <= 3; i = i + 1) {
    let fi = f32(i);
    uv += vec2f(
      sin(uv.y * 1.55 + t * 0.42 + fi),
      cos(uv.x * 1.35 - t * 0.36 + fi * 1.6)
    ) * 0.32;
    sum += abs(sin(uv.x + uv.y));
  }
  let sine = pow(sat(sum / 3.0), 1.6);
  return sat(lines * 0.92 + glow + sine * 0.38);
}
`;

export const pondModule = new ShaderModule({
  name: 'pond',
  deps: [commonModule],
  uniforms: pondUniforms,
  uniformName: 'pondParams',
  code: POND_WGSL,
});

const unlit = {
  lit: false,
  side: 'double',
  roughness: 1,
  metalness: 0,
};

// MeshShader still binds the engine shadow module for every material. Unlit pond
// shaders opt out of the lighting BRDF; the tiny shadow map is created in pond.js.
function pondMaterial(options) {
  const material = new Material(options);
  material.lightingHooks = false;
  return material;
}

export function floorMaterial() {
  return pondMaterial({
    ...unlit,
    name: 'pond-floor',
    modules: [pondModule],
    surface: /* wgsl */`
      let p = in.P.xy;
      let shore = pondShore(p);
      let q = length((p - pondParams.bounds.zw) / max(pondParams.bounds.xy, vec2f(0.001)));
      let n = mx_noise_float2(p * 1.35);
      let n2 = mx_noise_float2(p * 4.8 + vec2f(3.0, 8.0));
      let cell = mx_cell_noise_float2(p * 6.5);
      let deep = vec3f(0.07, 0.22, 0.18);
      let midc = vec3f(0.16, 0.40, 0.32);
      let shallow = vec3f(0.34, 0.62, 0.46);
      var col = mix(shallow, midc, smoothstep(0.12, 0.62, q));
      col = mix(col, deep, smoothstep(0.58, 1.05, q));
      col *= 0.9 + 0.12 * n + 0.06 * n2;
      col *= 0.94 + 0.08 * cell;
      let cau = pondCaustic(p, frame.time);
      col += vec3f(0.78, 1.05, 0.68) * cau * mix(1.25, 0.28, shore);
      col += vec3f(0.62, 0.82, 0.6) * rippleRing(p);
      col = mix(col, vec3f(0.035, 0.07, 0.045), shore * 0.88);
      s.albedo = col;
      s.emissive = vec3f(0.0);
      s.alpha = 1.0;
    `,
  });
}

export function koiMaterial() {
  return pondMaterial({
    ...unlit,
    name: 'koi',
    modules: [pondModule],
    attributes: { aFish: 'vec4f' },
    varyings: { vFish: 'vec4f' },
    vertex: /* wgsl */`
      o.vFish = v.aFish;
      let along = v.position.x;
      let tailW = sat(0.2 - along);
      let fin = select(0.0, 1.0, v.uv.x < 0.0);
      let phase = frame.time * v.aFish.z + v.aFish.y;
      let wave = sin(phase - along * 4.6);
      v.position.y += wave * (tailW * 0.3 + fin * 0.11);
      v.position.y += sin(phase * 1.35) * fin * sign(v.position.y) * 0.05;
    `,
    surface: /* wgsl */`
      let kind = in.vs.vFish.x;
      let seed = in.vs.vFish.w;
      let u = sat(in.uv.x);
      let v = clamp(in.uv.y, -1.2, 1.2);
      let across = abs(v);
      let n = mx_noise_float2(vec2f(u * 2.6, v * 1.15) + seed);
      let n2 = mx_noise_float2(vec2f(u * 5.4, v * 2.1) + seed * 2.7);
      var col: vec3f;
      if (kind < 0.5) {
        let patch = smoothstep(0.02, 0.28, n) * smoothstep(0.12, 0.4, u) * (1.0 - smoothstep(0.88, 0.98, u));
        let broken = smoothstep(-0.15, 0.2, n2);
        let red = vec3f(0.62, 0.07, 0.045);
        let white = vec3f(0.84, 0.82, 0.76);
        col = mix(white, red, sat(patch * broken));
        let tancho = smoothstep(0.2, 0.05, length(vec2f((u - 0.8) * 1.7, v * 0.85))) * step(0.62, fract(seed * 1.7));
        col = mix(col, red, tancho);
      } else if (kind < 1.5) {
        let belly = smoothstep(0.15, 0.85, across);
        col = mix(vec3f(0.86, 0.32, 0.05), vec3f(0.95, 0.62, 0.28), belly * 0.65);
        col = mix(col, vec3f(0.55, 0.16, 0.03), smoothstep(0.15, 0.75, n2) * 0.35);
      } else if (kind < 2.5) {
        let flash = mix(vec3f(0.78, 0.24, 0.05), vec3f(0.82, 0.8, 0.74), step(0.55, fract(seed * 2.3)));
        col = mix(vec3f(0.045, 0.046, 0.05), flash, smoothstep(0.12, 0.55, n) * smoothstep(0.08, 0.3, u));
      } else {
        col = mix(vec3f(0.78, 0.84, 0.86), vec3f(0.42, 0.5, 0.56), smoothstep(-0.1, 0.55, n) * 0.55);
        col = mix(col, vec3f(0.9, 0.93, 0.95), smoothstep(0.35, 0.02, across) * 0.35);
      }
      let rim = smoothstep(0.55, 1.05, across);
      col = mix(col, col * vec3f(0.35, 0.4, 0.38), rim * 0.85);
      let scaleLine = 0.5 + 0.5 * sin(u * 52.0 + v * 8.0);
      col *= 0.94 + 0.06 * scaleLine;
      let eyeU = 0.8;
      let eyeV = 0.38;
      let e = min(length(vec2f((u - eyeU) * 2.4, v - eyeV)), length(vec2f((u - eyeU) * 2.4, v + eyeV)));
      let pupil = smoothstep(0.11, 0.04, e) * step(0.55, u);
      let glint = smoothstep(0.04, 0.0, length(vec2f((u - 0.83) * 2.8, abs(v) - eyeV - 0.03)));
      col = mix(col, vec3f(0.02, 0.02, 0.025), pupil);
      col = mix(col, vec3f(0.95, 0.95, 0.9), glint * pupil);
      let cau = pondCaustic(in.P.xy, frame.time);
      let water = vec3f(0.28, 0.55, 0.44);
      col = mix(col, water, 0.1);
      col += vec3f(0.55, 0.78, 0.5) * cau * 0.42;
      s.albedo = col;
      s.alpha = 1.0;
    `,
  });
}

export function shadowMaterial() {
  return pondMaterial({
    ...unlit,
    name: 'koi-shadow',
    transparent: true,
    depthWrite: false,
    surface: /* wgsl */`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      s.albedo = vec3f(0.02, 0.05, 0.04);
      s.alpha = smoothstep(1.0, 0.15, r) * 0.32;
    `,
  });
}

export function foodMaterial() {
  return pondMaterial({
    ...unlit,
    name: 'food',
    surface: /* wgsl */`
      let q = in.uv * 2.0 - 1.0;
      let r = length(q);
      let col = mix(vec3f(0.62, 0.36, 0.12), vec3f(0.4, 0.22, 0.08), smoothstep(0.2, 0.95, r));
      s.albedo = col;
      s.alpha = 1.0;
    `,
  });
}

export function plantMaterial() {
  return pondMaterial({
    ...unlit,
    name: 'plants',
    modules: [pondModule],
    transparent: true,
    depthWrite: false,
    attributes: { aPlant: 'vec4f' },
    varyings: { vPlant: 'vec4f' },
    vertex: /* wgsl */`
      o.vPlant = v.aPlant;
      v.position.z += sin(frame.time * 0.55 + v.aPlant.w) * 0.012;
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
        let n = mx_noise_float2(q * 2.4 + seed);
        let r = rad * (0.92 + 0.16 * n);
        mask = smoothstep(1.02, 0.78, r);
        col = mix(vec3f(0.03, 0.11, 0.05), vec3f(0.09, 0.24, 0.08), shade);
        col = mix(col, col * 0.7, smoothstep(0.45, 0.95, rad));
      } else if (kind < 1.5) {
        let dAng = abs(atan2(sin(ang - 0.2), cos(ang - 0.2)));
        let notch = smoothstep(0.42, 0.02, dAng) * smoothstep(0.22, 0.72, rad);
        mask = smoothstep(1.0, 0.9, rad) * (1.0 - notch);
        let veins = pow(abs(sin(ang * 6.0 + seed)), 16.0) * smoothstep(0.12, 0.75, rad);
        col = mix(vec3f(0.07, 0.3, 0.11), vec3f(0.22, 0.5, 0.16), shade);
        col = mix(col, vec3f(0.4, 0.62, 0.24), smoothstep(0.72, 0.98, rad) * 0.55);
        col = mix(col, col * 0.62, veins);
        let mot = mx_noise_float2(in.P.xy * 2.2 + seed);
        col = mix(col, col * vec3f(0.85, 1.05, 0.8), mot * 0.25);
      } else {
        let petals = pow(sat(0.55 + 0.45 * cos(ang * 8.0 + seed)), 0.4);
        let petalRad = rad / max(petals, 0.18);
        mask = smoothstep(1.02, 0.7, petalRad) * smoothstep(0.0, 0.06, rad);
        let center = smoothstep(0.26, 0.06, rad);
        let pink = mix(vec3f(0.72, 0.22, 0.38), vec3f(0.95, 0.58, 0.66), sat(1.0 - rad));
        col = mix(pink, vec3f(0.96, 0.78, 0.28), center);
      }
      let cau = pondCaustic(in.P.xy, frame.time);
      col += vec3f(0.22, 0.32, 0.18) * cau * 0.28;
      s.albedo = col;
      s.alpha = sat(mask);
    `,
  });
}

export const GRADE_WGSL = /* wgsl */`
fn fragment(in: FSIn) -> vec4f {
  var c = textureLoad(hdr, vec2i(in.pos.xy), 0).rgb;
  c *= 1.12;
  c = c / (c + vec3f(0.82));
  let uv = in.uv;
  let vig = smoothstep(1.22, 0.42, length((uv - 0.5) * vec2f(1.08, 1.28)));
  c *= mix(0.74, 1.0, vig);
  c = mix(c, c * vec3f(0.92, 1.06, 0.98), 0.28);
  let grain = (interleavedGradientNoise(in.pos.xy + vec2f(frame.time * 17.0, 0.0)) - 0.5) * 0.012;
  return vec4f(linearToSrgb(sat3(c + grain)), 1.0);
}
`;
