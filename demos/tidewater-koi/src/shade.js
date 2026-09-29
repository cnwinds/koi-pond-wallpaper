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
  // Wide ribbons where a smooth noise sum crosses zero. Same idea as the WebGL
  // pond: not Voronoi edges (cracked glass) and not sine ovals.
  let q = p + rippleDisp(p);
  let s = 0.46;
  let n1 = mx_noise_float2(q * s + vec2f(t * 0.05, -t * 0.035));
  let n2 = mx_noise_float2(q * (s * 1.22) + vec2f(n1 * 0.55, -n1 * 0.35) + vec2f(-t * 0.038, t * 0.028));
  let band = pow(sat(1.0 - abs(n1 + n2 * 0.85) * 1.12), 3.6);
  let m1 = mx_noise_float2(vec2f(q.y, q.x) * (s * 0.86) + vec2f(2.2, -t * 0.042));
  let m2 = mx_noise_float2(vec2f(q.y, q.x) * (s * 1.05) + vec2f(m1 * 0.45 + 1.4, 0.6) + vec2f(t * 0.03, 1.3));
  let cross = pow(sat(1.0 - abs(m1 + m2 * 0.8) * 1.15), 4.0);
  return sat(band * 0.92 + cross * 0.48);
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
      let deep = vec3f(0.028, 0.11, 0.09);
      let midc = vec3f(0.05, 0.17, 0.135);
      let shallow = vec3f(0.09, 0.26, 0.19);
      var col = mix(shallow, midc, smoothstep(0.1, 0.55, q));
      col = mix(col, deep, smoothstep(0.5, 1.02, q));
      col *= 0.9 + 0.14 * n + 0.07 * n2;
      col *= 0.93 + 0.09 * cell;
      let cau = pondCaustic(p, frame.time);
      col += vec3f(0.7, 0.98, 0.52) * cau * mix(1.35, 0.28, shore);
      col += vec3f(0.45, 0.62, 0.42) * rippleRing(p);
      col = mix(col, vec3f(0.03, 0.07, 0.045), shore * 0.42);
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
        let blotch = smoothstep(0.02, 0.28, n) * smoothstep(0.12, 0.4, u) * (1.0 - smoothstep(0.88, 0.98, u));
        let broken = smoothstep(-0.15, 0.2, n2);
        let red = vec3f(0.78, 0.08, 0.04);
        let white = vec3f(0.9, 0.88, 0.82);
        col = mix(white, red, sat(blotch * broken));
        let tancho = smoothstep(0.2, 0.05, length(vec2f((u - 0.8) * 1.7, v * 0.85))) * step(0.62, fract(seed * 1.7));
        col = mix(col, red, tancho);
      } else if (kind < 1.5) {
        let belly = smoothstep(0.15, 0.85, across);
        col = mix(vec3f(0.92, 0.28, 0.04), vec3f(0.98, 0.58, 0.22), belly * 0.55);
        col = mix(col, vec3f(0.62, 0.16, 0.02), smoothstep(0.15, 0.75, n2) * 0.4);
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
      let water = vec3f(0.18, 0.38, 0.28);
      col = mix(col, water, 0.045);
      col += vec3f(0.35, 0.5, 0.28) * cau * 0.16;
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
        let n = mx_noise_float2(q * 1.7 + seed);
        let lobes = 0.7 + 0.3 * pow(sat(0.5 + 0.5 * cos(ang * 3.0 + seed)), 0.55);
        let r = rad / lobes * (0.88 + 0.2 * n);
        mask = smoothstep(1.06, 0.7, r);
        col = mix(vec3f(0.02, 0.1, 0.045), vec3f(0.1, 0.26, 0.08), shade);
        col = mix(col, col * 0.62, smoothstep(0.4, 0.95, rad));
      } else if (kind < 1.5) {
        let n = mx_noise_float2(q * 2.8 + seed);
        let scallop = 0.045 * sin(ang * 8.0 + seed);
        let r = rad * (0.9 + 0.1 * n) - scallop;
        let dAng = abs(atan2(sin(ang - 0.18), cos(ang - 0.18)));
        let notch = smoothstep(0.5, 0.04, dAng) * smoothstep(0.16, 0.7, rad);
        mask = smoothstep(1.02, 0.86, r) * (1.0 - notch);
        let veins = pow(abs(cos(ang * 5.0 + seed * 0.2)), 10.0) * smoothstep(0.05, 0.7, rad);
        col = mix(vec3f(0.04, 0.22, 0.07), vec3f(0.16, 0.42, 0.12), shade);
        col = mix(vec3f(0.02, 0.12, 0.04), col, smoothstep(0.0, 0.38, rad));
        col = mix(col, vec3f(0.28, 0.5, 0.16), smoothstep(0.7, 0.98, rad) * 0.65);
        col = mix(col, col * 0.45, veins);
        let mot = mx_noise_float2(in.P.xy * 2.2 + seed);
        col = mix(col, col * vec3f(0.82, 1.08, 0.78), mot * 0.28);
      } else {
        let petals = pow(sat(0.64 + 0.36 * cos(ang * 7.0 + seed)), 0.7);
        let petalRad = rad / max(petals, 0.35);
        mask = smoothstep(1.0, 0.62, petalRad) * smoothstep(0.0, 0.05, rad);
        let center = smoothstep(0.32, 0.08, rad);
        let pink = mix(vec3f(0.78, 0.18, 0.34), vec3f(0.98, 0.62, 0.7), sat(1.0 - rad * 0.8));
        col = mix(pink, vec3f(0.98, 0.82, 0.32), center);
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
  c *= 0.96;
  c = c / (c + vec3f(0.95));
  let uv = in.uv;
  let vig = smoothstep(1.15, 0.38, length((uv - 0.5) * vec2f(1.05, 1.22)));
  c *= mix(0.62, 1.0, vig);
  c = mix(c, c * vec3f(0.86, 1.1, 1.02), 0.4);
  let grain = (interleavedGradientNoise(in.pos.xy + vec2f(frame.time * 17.0, 0.0)) - 0.5) * 0.012;
  return vec4f(linearToSrgb(sat3(c + grain)), 1.0);
}
`;
