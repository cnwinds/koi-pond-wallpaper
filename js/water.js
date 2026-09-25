/* WebGL2 pond water with height-field ripples and soft caustics. Canvas 2D fallback. */
(function (global) {
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
    n += uImp[i].z * exp(-dist * dist * 2200.0);
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
uniform vec2 uResolution;
uniform vec2 uRippleTexel;
uniform float uTime;
uniform float uCaustics;
uniform float uAmbient;

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

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  float hL = texture(uRipple, uv - vec2(uRippleTexel.x, 0.0)).r;
  float hR = texture(uRipple, uv + vec2(uRippleTexel.x, 0.0)).r;
  float hD = texture(uRipple, uv - vec2(0.0, uRippleTexel.y)).r;
  float hU = texture(uRipple, uv + vec2(0.0, uRippleTexel.y)).r;
  float h = texture(uRipple, uv).r * 2.0 - 1.0;

  float amb = uAmbient * (
    sin(uv.x * 7.2 + uTime * 0.31) * sin(uv.y * 5.1 - uTime * 0.23) * 0.012 +
    sin((uv.x * aspect + uv.y) * 3.4 - uTime * 0.17) * 0.008
  );

  vec3 n = normalize(vec3((hL - hR) + amb * 4.0, (hD - hU) + amb * 3.0, 0.18));
  vec2 refr = uv + n.xy * 0.045;

  vec2 d = (refr - 0.5) * vec2(aspect, 1.0);
  float radial = length(d);
  float depth = 1.0 - smoothstep(0.05, 0.78, radial);

  vec3 deep = vec3(0.035, 0.11, 0.105);
  vec3 mid = vec3(0.07, 0.24, 0.21);
  vec3 shallow = vec3(0.14, 0.36, 0.29);
  vec3 floorCol = mix(deep, mix(mid, shallow, depth), 0.82);

  float peb = noise(refr * vec2(aspect, 1.0) * 22.0);
  floorCol += vec3(0.018, 0.024, 0.016) * peb;
  floorCol += vec3(0.03, 0.04, 0.02) * noise(refr * 7.0 + 3.1) * 0.35;

  if (uCaustics > 0.5) {
    float cau = caustic(refr * vec2(aspect, 1.0) + n.xy * 0.8, uTime);
    float cau2 = caustic(refr.yx * vec2(1.0, aspect) * 0.85 - n.xy * 0.4, uTime * 0.82 + 12.0);
    floorCol += vec3(0.42, 0.55, 0.34) * (cau * 0.28 + cau2 * 0.16) * (0.45 + 0.55 * depth);
  }

  float day = sin(uTime * 0.008);
  floorCol *= mix(vec3(0.94, 1.0, 1.03), vec3(1.04, 1.0, 0.93), day * 0.5 + 0.5);

  vec3 water = floorCol * vec3(0.78, 0.96, 0.93);

  vec3 L = normalize(vec3(-0.35, 0.48, 0.8));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(n, H), 0.0), 72.0);
  water += vec3(0.72, 0.86, 0.8) * spec * 0.48;
  water += vec3(0.55, 0.7, 0.66) * smoothstep(0.06, 0.22, abs(h)) * 0.14;

  float edge = smoothstep(0.46, 0.72, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
  water = mix(water, vec3(0.045, 0.07, 0.05), edge * 0.38);

  float vig = smoothstep(1.15, 0.28, length((uv - 0.5) * vec2(1.35, 1.2)));
  water *= 0.58 + 0.42 * vig;

  float grain = fract(sin(dot(uv * uResolution + uTime * 12.0, vec2(12.9898, 78.233))) * 43758.5453);
  water += (grain - 0.5) * 0.018;

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
      preserveDrawingBuffer: false,
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
      uImpCount: gl.getUniformLocation(simProg, "uImpCount"),
    };
    const water = {
      uRipple: gl.getUniformLocation(waterProg, "uRipple"),
      uResolution: gl.getUniformLocation(waterProg, "uResolution"),
      uRippleTexel: gl.getUniformLocation(waterProg, "uRippleTexel"),
      uTime: gl.getUniformLocation(waterProg, "uTime"),
      uCaustics: gl.getUniformLocation(waterProg, "uCaustics"),
      uAmbient: gl.getUniformLocation(waterProg, "uAmbient"),
    };

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

    function impulse(nx, ny, strength) {
      impulses.push(nx, ny, strength);
    }

    function step(damp) {
      const count = Math.min(8, (impulses.length / 3) | 0);
      impData.fill(0);
      for (let i = 0; i < count; i++) {
        impData[i * 3] = impulses[i * 3];
        impData[i * 3 + 1] = 1 - impulses[i * 3 + 1];
        impData[i * 3 + 2] = impulses[i * 3 + 2];
      }
      if (count) impulses.splice(0, count * 3);

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
      gl.uniform1i(sim.uImpCount, count);
      drawQuad(simProg);

      const old = prev;
      prev = curr;
      curr = next;
      next = old;
    }

    function render(cssW, cssH, pixelW, pixelH, time, opts) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, pixelW, pixelH);
      gl.useProgram(waterProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, curr.tex);
      gl.uniform1i(water.uRipple, 0);
      gl.uniform2f(water.uResolution, cssW, cssH);
      gl.uniform2f(water.uRippleTexel, 1 / simW, 1 / simH);
      gl.uniform1f(water.uTime, time);
      gl.uniform1f(water.uCaustics, opts.caustics ? 1 : 0);
      gl.uniform1f(water.uAmbient, opts.ambient);
      drawQuad(waterProg);
    }

    return {
      kind: "webgl2",
      impulse,
      step,
      render,
      rebuild,
      lost: false,
    };
  }

  function createCanvas2D(canvas) {
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const rings = [];
    let t = 0;

    return {
      kind: "canvas2d",
      impulse: function (nx, ny, strength) {
        rings.push({ x: nx, y: ny, r: 4, a: 0.28 * strength, s: strength });
      },
      step: function () {},
      rebuild: function () {},
      render: function (cssW, cssH, pixelW, pixelH, time, opts) {
        t = time;
        ctx.setTransform(pixelW / cssW, 0, 0, pixelH / cssH, 0, 0);
        const g = ctx.createRadialGradient(cssW * 0.5, cssH * 0.42, cssH * 0.05, cssW * 0.5, cssH * 0.5, Math.max(cssW, cssH) * 0.72);
        g.addColorStop(0, "#1b5a50");
        g.addColorStop(0.45, "#123f38");
        g.addColorStop(1, "#0a221f");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, cssW, cssH);

        if (opts.caustics) {
          ctx.save();
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
        ctx.strokeStyle = "rgba(198, 222, 210, 0.22)";
        for (let i = rings.length - 1; i >= 0; i--) {
          const ring = rings[i];
          ring.r += 70 * 0.016 + ring.s * 0.4;
          ring.a -= 0.0065;
          if (ring.a <= 0) {
            rings.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = ring.a;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.ellipse(ring.x * cssW, ring.y * cssH, ring.r, ring.r * 0.86, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        const vg = ctx.createRadialGradient(cssW * 0.5, cssH * 0.5, Math.min(cssW, cssH) * 0.2, cssW * 0.5, cssH * 0.5, Math.max(cssW, cssH) * 0.7);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0,0,0,0.32)");
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, cssW, cssH);
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

    return {
      kind: function () {
        return impl.kind;
      },
      impulse: function (nx, ny, strength) {
        queue.push(nx, ny, strength);
      },
      setQuality: function (nextQuality) {
        damp = nextQuality.ripple >= 400 ? 0.991 : nextQuality.ripple >= 240 ? 0.988 : 0.983;
        if (impl.rebuild) impl.rebuild(nextQuality.ripple);
      },
      update: function (dt) {
        while (queue.length) {
          impl.impulse(queue[0], queue[1], queue[2]);
          queue.splice(0, 3);
        }
        if (impl.step) {
          impl.step(damp);
          if (dt > 0.028) impl.step(damp);
        }
      },
      render: function (cssW, cssH, pixelW, pixelH, time, opts) {
        impl.render(cssW, cssH, pixelW, pixelH, time, opts);
      },
    };
  }

  global.PondWater = { create };
})(window);
