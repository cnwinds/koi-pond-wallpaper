/* WebGL2 pond water with height-field ripples and soft caustics. Canvas 2D fallback. */
(function (global) {
  function clamp255(n) {
    return Math.min(255, Math.max(0, n));
  }
  const SIM_VS = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const SIM_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uCurr;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform float uDamp;
uniform vec3 uImp[8];
uniform float uImpRad[8];
uniform int uImpCount;

void main() {
  float p = texture(uPrev, vUv).r * 2.0 - 1.0;
  float l = texture(uCurr, vUv - vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  float r = texture(uCurr, vUv + vec2(uTexel.x, 0.0)).r * 2.0 - 1.0;
  float d = texture(uCurr, vUv - vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  float u = texture(uCurr, vUv + vec2(0.0, uTexel.y)).r * 2.0 - 1.0;
  float n = (l + r + d + u) * 0.5 - p;
  n *= uDamp;
  for (int i = 0; i < 8; i++) {
    if (i >= uImpCount) break;
    vec2 ip = uImp[i].xy;
    float dist = distance(vUv, ip);
    float rad = uImpRad[i] > 1.0 ? uImpRad[i] : 2200.0;
    n += uImp[i].z * exp(-dist * dist * rad);
  }
  n = clamp(n, -1.0, 1.0);
  fragColor = vec4(n * 0.5 + 0.5, 0.0, 0.0, 1.0);
}`;

  const WATER_VS = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const WATER_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uRipple;
uniform sampler2D uLife;
uniform vec2 uResolution;
uniform vec2 uRippleTexel;
uniform float uTime;
uniform float uCaustics;
uniform float uAmbient;
uniform float uExposure;
uniform vec3 uTint;
uniform float uCausticGain;
uniform float uHaze;
uniform float uFog;
uniform float uDayness;
uniform float uDistort;
uniform float uHasLife;
uniform float uRippleCalm;

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

float caustic(vec2 uv, float t) {
  vec2 p = uv * 5.4;
  vec2 q = p + vec2(t * 0.13, -t * 0.09);
  vec2 r = p * 1.27 + vec2(-t * 0.1, t * 0.07);
  float n1 = noise(q);
  float n2 = noise(r + n1);
  return pow(max(1.0 - abs(n1 + n2 * 0.85), 0.0), 4.2);
}

float tapH(vec2 uv) {
  return texture(uRipple, uv).r;
}

/* Soften the low-res height field so leftover rain ripples do not read as tiles
   when lighting/caustics come back during rain→clear. */
float blurH(vec2 uv) {
  vec2 t = uRippleTexel;
  return (
    tapH(uv) * 2.0 +
    tapH(uv + vec2(t.x, 0.0)) +
    tapH(uv - vec2(t.x, 0.0)) +
    tapH(uv + vec2(0.0, t.y)) +
    tapH(uv - vec2(0.0, t.y))
  ) / 6.0;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  float hL = blurH(uv - vec2(uRippleTexel.x, 0.0));
  float hR = blurH(uv + vec2(uRippleTexel.x, 0.0));
  float hD = blurH(uv - vec2(0.0, uRippleTexel.y));
  float hU = blurH(uv + vec2(0.0, uRippleTexel.y));
  float h = blurH(uv) * 2.0 - 1.0;

  float amb = uAmbient * (
    sin(uv.x * 7.2 + uTime * 0.31) * sin(uv.y * 5.1 - uTime * 0.23) * 0.012 +
    sin((uv.x * aspect + uv.y) * 3.4 - uTime * 0.17) * 0.008
  );

  float calm = clamp(uRippleCalm, 0.0, 1.0);
  vec3 n = normalize(vec3((hL - hR) + amb * 4.0, (hD - hU) + amb * 3.0, 0.16));
  n.xy *= mix(1.0, 0.28, calm);
  vec2 refr = uv + n.xy * mix(0.05, 0.012, calm);

  vec2 d = (refr - 0.5) * vec2(aspect, 1.0);
  float radial = length(d);
  float depth = 1.0 - smoothstep(0.05, 0.78, radial);

  vec3 deepN = vec3(0.015, 0.03, 0.07);
  vec3 midN = vec3(0.03, 0.055, 0.12);
  vec3 shallowN = vec3(0.05, 0.09, 0.16);
  vec3 deepD = vec3(0.04, 0.13, 0.14);
  vec3 midD = vec3(0.07, 0.24, 0.24);
  vec3 shallowD = vec3(0.12, 0.34, 0.32);
  vec3 deep = mix(deepN, deepD, uDayness);
  vec3 mid = mix(midN, midD, uDayness);
  vec3 shallow = mix(shallowN, shallowD, uDayness);
  vec3 floorCol = mix(deep, mix(mid, shallow, depth), 0.86);

  float peb = noise(refr * vec2(aspect, 1.0) * 22.0);
  floorCol += vec3(0.018, 0.024, 0.016) * peb * (0.35 + 0.65 * uDayness);
  floorCol += vec3(0.03, 0.04, 0.02) * noise(refr * 7.0 + 3.1) * 0.35 * uDayness;

  float cau = 0.0;
  float cau2 = 0.0;
  float sunW = clamp(uCaustics, 0.0, 1.0);
  /* Weight, not a switch: causticGain already eases with the weather blend. */
  if (sunW > 0.001) {
    cau = caustic(refr * vec2(aspect, 1.0) + n.xy * 0.8, uTime);
    cau2 = caustic(refr.yx * vec2(1.0, aspect) * 0.85 - n.xy * 0.4, uTime * 0.82 + 12.0);
    float cauAmt = (0.5 + 0.5 * depth) * uCausticGain * sunW * (1.0 - calm * 0.85);
    floorCol += vec3(0.48, 0.64, 0.40) * (cau * 0.32 + cau2 * 0.18) * cauAmt;
  }

  vec3 water = floorCol * mix(vec3(0.7, 0.82, 1.05), vec3(0.78, 0.96, 0.93), uDayness);

  vec3 L = normalize(mix(vec3(0.2, 0.15, 0.9), vec3(-0.35, 0.48, 0.8), uDayness));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, H), 0.0), 72.0);
  water += mix(vec3(0.45, 0.62, 1.0), vec3(0.72, 0.86, 0.8), uDayness) * spec * 0.52 * (0.18 + 0.82 * max(uCausticGain, 1.0 - uDayness));
  water += vec3(0.55, 0.7, 0.8) * smoothstep(0.05, 0.24, abs(h)) * 0.2;

  float edge = smoothstep(0.46, 0.72, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
  water = mix(water, mix(vec3(0.01, 0.02, 0.05), vec3(0.045, 0.07, 0.05), uDayness), edge * 0.42);

  float vig = smoothstep(1.2, 0.22, length((uv - 0.5) * vec2(1.25, 1.12)));
  water *= 0.72 + 0.28 * vig;
  water = max(water, mix(vec3(0.012, 0.02, 0.04), vec3(0.05, 0.12, 0.11), uDayness));

  float grain = fract(sin(dot(uv * uResolution + uTime * 12.0, vec2(12.9898, 78.233))) * 43758.5453);
  water += (grain - 0.5) * 0.012;

  water *= uTint * uExposure;

  if (uHasLife > 0.5) {
    vec2 warp = n.xy * uDistort;
    warp = clamp(warp, vec2(-0.008), vec2(0.008));
    vec2 lifeUv = uv + warp;
    vec4 lifeC = texture(uLife, lifeUv);
    vec3 sunT = vec3(1.03, 1.01, 0.97);
    vec3 moonT = vec3(0.58, 0.72, 1.12);
    vec3 lightT = mix(moonT, sunT, uDayness);
    float lightE = mix(0.62, 1.0, uDayness);
    vec3 lit = lifeC.rgb * lightT * lightE;
    lit += vec3(0.42, 0.58, 0.36) * (cau * 0.14 + cau2 * 0.07) * uCausticGain * sunW;
    lit *= 1.0 + h * 0.18;
    water = mix(water, lit, clamp(lifeC.a, 0.0, 1.0));
  }

  /* Atmosphere lives in this shader so weather→clear never depends on a
     full-screen Canvas2D overlay (the WorkerW/WebView2 mosaic source). */
  float hazeA = clamp(uHaze, 0.0, 0.88);
  water = mix(water, vec3(0.68, 0.74, 0.76) * uExposure, hazeA * 0.7);
  water = mix(water, vec3(0.62, 0.70, 0.72) * uExposure, clamp(uFog, 0.0, 1.0) * (0.18 + vig * 0.28));
  float night = 1.0 - uDayness;
  if (night > 0.02) {
    water = mix(water, water * vec3(0.42, 0.50, 0.78), clamp(night * 0.55, 0.0, 0.55));
    water = mix(water, vec3(0.01, 0.02, 0.06), night * 0.22 * (1.0 - vig));
    float moonAmt = smoothstep(0.35, 0.72, night);
    if (moonAmt > 0.001) {
      vec2 moon = vec2(0.78, 0.86);
      float md = length((uv - moon) * vec2(aspect, 1.15));
      water += vec3(0.82, 0.86, 0.95) * smoothstep(0.11, 0.0, md) * 0.38 * moonAmt;
    }
  }
  if (uDayness > 0.12 && uDayness < 0.55) {
    float dusk = exp(-pow((uDayness - 0.3) / 0.16, 2.0));
    water += vec3(0.32, 0.12, 0.04) * dusk * 0.16 * uExposure;
  }

  fragColor = vec4(water, 1.0);
}`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(log);
    }
    return sh;
  }

  function program(gl, vs, fs) {
    const p = gl.createProgram();
    const v = compile(gl, gl.VERTEX_SHADER, vs);
    const f = compile(gl, gl.FRAGMENT_SHADER, fs);
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    gl.deleteShader(v);
    gl.deleteShader(f);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error(log);
    }
    return p;
  }

  function makeTarget(gl, w, h) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (!ok) {
      gl.deleteFramebuffer(fb);
      gl.deleteTexture(tex);
      throw new Error("framebuffer");
    }
    return { tex, fb, w, h };
  }

  function clearTarget(gl, target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb);
    gl.viewport(0, 0, target.w, target.h);
    gl.clearColor(0.5, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  function createGL(canvas, quality) {
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: quality.power || "low-power",
      preserveDrawingBuffer: true,
    });
    if (!gl) return null;

    let simProg;
    let waterProg;
    try {
      simProg = program(gl, SIM_VS, SIM_FS);
      waterProg = program(gl, WATER_VS, WATER_FS);
    } catch (err) {
      return {
        kind: "webgl2",
        compositesLife: false,
        impulse: function () {},
        step: function () {},
        rebuild: function () {},
        render: function (_cW, _cH, pixelW, pixelH) {
          gl.viewport(0, 0, pixelW, pixelH);
          gl.clearColor(0.05, 0.14, 0.13, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
        },
      };
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const sim = {
      uCurr: gl.getUniformLocation(simProg, "uCurr"),
      uPrev: gl.getUniformLocation(simProg, "uPrev"),
      uTexel: gl.getUniformLocation(simProg, "uTexel"),
      uDamp: gl.getUniformLocation(simProg, "uDamp"),
      uImp: gl.getUniformLocation(simProg, "uImp"),
      uImpRad: gl.getUniformLocation(simProg, "uImpRad"),
      uImpCount: gl.getUniformLocation(simProg, "uImpCount"),
    };
    const water = {
      uRipple: gl.getUniformLocation(waterProg, "uRipple"),
      uLife: gl.getUniformLocation(waterProg, "uLife"),
      uResolution: gl.getUniformLocation(waterProg, "uResolution"),
      uRippleTexel: gl.getUniformLocation(waterProg, "uRippleTexel"),
      uTime: gl.getUniformLocation(waterProg, "uTime"),
      uCaustics: gl.getUniformLocation(waterProg, "uCaustics"),
      uAmbient: gl.getUniformLocation(waterProg, "uAmbient"),
      uExposure: gl.getUniformLocation(waterProg, "uExposure"),
      uTint: gl.getUniformLocation(waterProg, "uTint"),
      uCausticGain: gl.getUniformLocation(waterProg, "uCausticGain"),
      uHaze: gl.getUniformLocation(waterProg, "uHaze"),
      uFog: gl.getUniformLocation(waterProg, "uFog"),
      uDayness: gl.getUniformLocation(waterProg, "uDayness"),
      uDistort: gl.getUniformLocation(waterProg, "uDistort"),
      uHasLife: gl.getUniformLocation(waterProg, "uHasLife"),
      uRippleCalm: gl.getUniformLocation(waterProg, "uRippleCalm"),
    };

    let lifeTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, lifeTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    let lifeW = 1;
    let lifeH = 1;

    let curr = null;
    let prev = null;
    let next = null;
    let simW = 0;
    let simH = 0;

    function rebuild(ripple) {
      const w = ripple;
      const h = Math.max(64, Math.round(ripple * 9 / 16));
      if (curr) {
        gl.deleteFramebuffer(curr.fb);
        gl.deleteTexture(curr.tex);
        gl.deleteFramebuffer(prev.fb);
        gl.deleteTexture(prev.tex);
        gl.deleteFramebuffer(next.fb);
        gl.deleteTexture(next.tex);
      }
      curr = makeTarget(gl, w, h);
      prev = makeTarget(gl, w, h);
      next = makeTarget(gl, w, h);
      clearTarget(gl, curr);
      clearTarget(gl, prev);
      clearTarget(gl, next);
      simW = w;
      simH = h;
    }

    rebuild(quality.ripple);

    function drawQuad(prog) {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    const impulses = [];
    const impData = new Float32Array(24);
    const impRad = new Float32Array(8);

    function impulse(nx, ny, strength, radius) {
      impulses.push(nx, ny, strength, radius != null ? radius : 0);
    }

    function step(damp) {
      const count = Math.min(8, (impulses.length / 4) | 0);
      impData.fill(0);
      impRad.fill(0);
      for (let i = 0; i < count; i++) {
        impData[i * 3] = impulses[i * 4];
        impData[i * 3 + 1] = 1 - impulses[i * 4 + 1];
        impData[i * 3 + 2] = impulses[i * 4 + 2];
        impRad[i] = impulses[i * 4 + 3];
      }
      if (count) impulses.splice(0, count * 4);

      gl.bindFramebuffer(gl.FRAMEBUFFER, next.fb);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(simProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, curr.tex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, prev.tex);
      gl.uniform1i(sim.uCurr, 0);
      gl.uniform1i(sim.uPrev, 1);
      gl.uniform2f(sim.uTexel, 1 / simW, 1 / simH);
      gl.uniform1f(sim.uDamp, damp);
      gl.uniform3fv(sim.uImp, impData);
      gl.uniform1fv(sim.uImpRad, impRad);
      gl.uniform1i(sim.uImpCount, count);
      drawQuad(simProg);

      const old = prev;
      prev = curr;
      curr = next;
      next = old;
    }

    function uploadLife(src, forceAlloc) {
      if (!src || !src.width) return false;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, lifeTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      if (forceAlloc || src.width !== lifeW || src.height !== lifeH) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
        lifeW = src.width;
        lifeH = src.height;
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, src);
      }
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      return true;
    }

    function bufferMismatch(pixelW, pixelH) {
      const dw = gl.drawingBufferWidth;
      const dh = gl.drawingBufferHeight;
      if (dw <= 0 || dh <= 0) return false;
      return dw < pixelW * 0.98 || dh < pixelH * 0.98 || canvas.width !== pixelW || canvas.height !== pixelH;
    }

    function ensureBuffer(pixelW, pixelH) {
      if (!bufferMismatch(pixelW, pixelH)) return false;
      canvas.width = Math.max(1, pixelW);
      canvas.height = Math.max(1, pixelH);
      return true;
    }

    function render(cssW, cssH, pixelW, pixelH, time, opts) {
      opts = opts || {};
      if (opts.ensureBuffer) ensureBuffer(pixelW, pixelH);
      const hasLife = uploadLife(opts.life, !!opts.refreshLife);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, pixelW, pixelH);
      gl.useProgram(waterProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, curr.tex);
      gl.uniform1i(water.uRipple, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, lifeTex);
      gl.uniform1i(water.uLife, 1);
      gl.uniform2f(water.uResolution, cssW, cssH);
      gl.uniform2f(water.uRippleTexel, 1 / simW, 1 / simH);
      gl.uniform1f(water.uTime, time);
      const sunW = typeof opts.caustics === "number" ? opts.caustics : opts.caustics ? 1 : 0;
      gl.uniform1f(water.uCaustics, sunW);
      gl.uniform1f(water.uAmbient, opts.ambient != null ? opts.ambient : 1);
      gl.uniform1f(water.uExposure, opts.exposure != null ? opts.exposure : 1);
      const tint = opts.tint || [1, 1, 1];
      gl.uniform3f(water.uTint, tint[0], tint[1], tint[2]);
      gl.uniform1f(water.uCausticGain, opts.causticGain != null ? opts.causticGain : 1);
      gl.uniform1f(water.uHaze, opts.haze != null ? opts.haze : 0);
      gl.uniform1f(water.uFog, opts.fog != null ? opts.fog : 0);
      gl.uniform1f(water.uDayness, opts.dayness != null ? opts.dayness : 1);
      gl.uniform1f(water.uDistort, opts.distort != null ? opts.distort : 0.04);
      gl.uniform1f(water.uHasLife, hasLife ? 1 : 0);
      gl.uniform1f(water.uRippleCalm, opts.rippleCalm != null ? opts.rippleCalm : 0);
      drawQuad(waterProg);
    }

    return {
      kind: "webgl2",
      compositesLife: true,
      impulse,
      step,
      render,
      rebuild,
      ensureBuffer,
      bufferMismatch,
      lost: false,
    };
  }

  function createCanvas2D(canvas) {
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: false });
    const rings = [];
    let t = 0;

    return {
      kind: "canvas2d",
      compositesLife: true,
      impulse: function (nx, ny, strength) {
        rings.push({ x: nx, y: ny, r: 4, a: 0.28 * strength, s: strength });
      },
      step: function () {},
      rebuild: function () {},
      render: function (cssW, cssH, pixelW, pixelH, time, opts) {
        opts = opts || {};
        t = time;
        const dayness = opts.dayness != null ? opts.dayness : 1;
        ctx.setTransform(pixelW / cssW, 0, 0, pixelH / cssH, 0, 0);
        const g = ctx.createRadialGradient(cssW * 0.5, cssH * 0.42, cssH * 0.05, cssW * 0.5, cssH * 0.5, Math.max(cssW, cssH) * 0.72);
        if (dayness < 0.35) {
          g.addColorStop(0, "#163050");
          g.addColorStop(0.42, "#0c1c30");
          g.addColorStop(1, "#060c16");
        } else {
          g.addColorStop(0, "#2a7a68");
          g.addColorStop(0.42, "#1b564b");
          g.addColorStop(1, "#0e2f2a");
        }
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, cssW, cssH);

        const sunW = typeof opts.caustics === "number" ? opts.caustics : opts.caustics ? 1 : 0;
        const gain = (opts.causticGain == null ? 1 : opts.causticGain) * sunW;
        if (gain > 0.001) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, gain / 1.15);
          ctx.globalCompositeOperation = "lighter";
          for (let i = 0; i < 5; i++) {
            const x = (0.5 + 0.32 * Math.sin(t * 0.16 + i * 1.7)) * cssW;
            const y = (0.48 + 0.28 * Math.cos(t * 0.13 + i * 2.05)) * cssH;
            const r = Math.min(cssW, cssH) * (0.22 + 0.08 * Math.sin(t * 0.2 + i));
            const cg = ctx.createRadialGradient(x, y, 0, x, y, r);
            cg.addColorStop(0, "rgba(176, 214, 150, 0.09)");
            cg.addColorStop(0.45, "rgba(120, 176, 140, 0.04)");
            cg.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = cg;
            ctx.fillRect(0, 0, cssW, cssH);
          }
          ctx.restore();
        }

        ctx.save();
        ctx.strokeStyle = "rgba(210, 232, 220, 0.7)";
        for (let i = rings.length - 1; i >= 0; i--) {
          const ring = rings[i];
          ring.r += 80 * 0.016 + ring.s * 0.5;
          ring.a -= 0.0055;
          if (ring.a <= 0) {
            rings.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = Math.min(0.7, ring.a * 1.6);
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.ellipse(ring.x * cssW, ring.y * cssH, ring.r, ring.r * 0.86, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        if (opts.life) {
          const bands = 40;
          const bh = cssH / bands;
          const distort = opts.distort != null ? opts.distort : 0.04;
          ctx.save();
          ctx.imageSmoothingEnabled = true;
          for (let i = 0; i < bands; i++) {
            const y = i * bh;
            const ny = (i + 0.5) / bands;
            let ox = Math.sin(ny * 16 + t * 1.5) * distort * 80;
            for (let r = 0; r < rings.length; r++) {
              const ring = rings[r];
              const dy = ny - ring.y;
              const fall = Math.exp(-dy * dy * 28);
              ox += Math.sin(ring.r * 0.07) * ring.a * 32 * fall;
            }
            if (ox > 14) ox = 14;
            if (ox < -14) ox = -14;
            ctx.drawImage(opts.life, 0, (y / cssH) * opts.life.height, opts.life.width, (bh / cssH) * opts.life.height + 1.5, ox, y, cssW, bh + 0.8);
          }
          ctx.restore();
        }

        const vg = ctx.createRadialGradient(cssW * 0.5, cssH * 0.5, Math.min(cssW, cssH) * 0.2, cssW * 0.5, cssH * 0.5, Math.max(cssW, cssH) * 0.7);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, dayness < 0.35 ? "rgba(0,0,8,0.5)" : "rgba(0,0,0,0.32)");
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, cssW, cssH);

        const tint = opts.tint || [1, 1, 1];
        const exposure = opts.exposure != null ? opts.exposure : 1;
        ctx.save();
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle =
          "rgb(" +
          Math.round(clamp255(tint[0] * exposure * 255)) +
          "," +
          Math.round(clamp255(tint[1] * exposure * 255)) +
          "," +
          Math.round(clamp255(tint[2] * exposure * 255)) +
          ")";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.restore();
        if (opts.haze) {
          ctx.fillStyle = "rgba(150, 170, 174, " + Math.min(0.55, opts.haze * 0.62) + ")";
          ctx.fillRect(0, 0, cssW, cssH);
        }
        if (opts.fog) {
          ctx.fillStyle = "rgba(158, 178, 180, " + Math.min(0.4, opts.fog * 0.28) + ")";
          ctx.fillRect(0, 0, cssW, cssH);
        }
      },
    };
  }

  function create(canvas, quality) {
    let impl = null;
    try {
      impl = createGL(canvas, quality);
    } catch (err) {
      impl = null;
    }
    if (!impl) {
      impl = createCanvas2D(canvas);
    }

    const queue = [];
    let damp = 0.988;
    let rainAmt = 0;
    let rainSettle = 0;
    let lastRipple = quality.ripple;

    return {
      kind: function () {
        return impl.kind;
      },
      compositesLife: function () {
        return !!impl.compositesLife;
      },
      impulse: function (nx, ny, strength, radius) {
        queue.push(nx, ny, strength, radius != null ? radius : 0);
      },
      setQuality: function (nextQuality) {
        lastRipple = nextQuality.ripple;
        damp = nextQuality.ripple >= 400 ? 0.991 : nextQuality.ripple >= 240 ? 0.988 : 0.983;
        if (impl.rebuild) impl.rebuild(nextQuality.ripple);
      },
      recoverSim: function () {
        if (impl.rebuild) impl.rebuild(lastRipple);
      },
      rainSettleLeft: function () {
        return rainSettle;
      },
      setRain: function (amount) {
        rainAmt = amount || 0;
      },
      update: function (dt) {
        while (queue.length) {
          impl.impulse(queue[0], queue[1], queue[2], queue[3]);
          queue.splice(0, 4);
        }
        if (rainAmt > 0.04) rainSettle = 2.2;
        else rainSettle = Math.max(0, rainSettle - dt);
        let d = damp;
        if (rainAmt > 0.05) d = Math.min(d, 0.985);
        if (rainSettle > 0 && rainAmt < 0.4) d = Math.min(d, 0.965);
        if (impl.step) {
          impl.step(d);
          if (dt > 0.028) impl.step(d);
          if (rainSettle > 0 && rainAmt < 0.22) impl.step(d);
        }
      },
      ensureBuffer: function (pixelW, pixelH) {
        if (impl.ensureBuffer) return impl.ensureBuffer(pixelW, pixelH);
        return false;
      },
      bufferMismatch: function (pixelW, pixelH) {
        if (impl.bufferMismatch) return impl.bufferMismatch(pixelW, pixelH);
        return false;
      },
      render: function (cssW, cssH, pixelW, pixelH, time, opts) {
        impl.render(cssW, cssH, pixelW, pixelH, time, opts);
      },
    };
  }

  global.PondWater = { create };
})(window);
