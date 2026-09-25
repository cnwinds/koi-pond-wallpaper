/* Koi idle swim, food pellets, lily pads, and quiet particles.
 *
 * Swimming model (see README):
 * - Carangiform body wave: A(s)~s^1.9 traveling posteriorly (Sfakiotakis 1999;
 *   Videler envelope). Head stays quiet; tail carries amplitude.
 * - Koi C-turns: body curvature follows yaw rate (Wu, Yang, Zeng 2007).
 * - Reynolds 1999 steering: wander (circle-ahead), seek/arrive, separation.
 *   steering = desiredVel - currentVel; headings use wrapped error + omega.
 * - Burst-and-coast gait (Videler; cyprinid koi), not a constant thrash.
 */
(function (global) {
  const TWO_PI = Math.PI * 2;
  const SPINE_N = 8;

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function angWrap(a) {
    a = ((a + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
    return a;
  }

  function damp(current, target, dt, rate) {
    if (rate <= 0) return target;
    return current + (target - current) * (1 - Math.exp(-dt * rate));
  }

  function create(canvas, options) {
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const sprites = options.sprites;
    const rng = PondSprites.mulberry32(90210);

    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    const fish = [];
    const food = [];
    const pads = [];
    const motes = [];
    const bubbles = [];

    function reducedMotion() {
      return !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }

    function pondPoint() {
      return {
        x: cssW * (0.18 + rng() * 0.64),
        y: cssH * (0.2 + rng() * 0.6),
      };
    }

    function bodyLength(f) {
      return 168 * f.size;
    }

    function spacingOf(f) {
      return (bodyLength(f) * 0.86) / (SPINE_N - 1);
    }

    function initSpine(f) {
      const spacing = spacingOf(f);
      f.spine = [];
      for (let i = 0; i < SPINE_N; i++) {
        const x = f.x - Math.cos(f.heading) * i * spacing;
        const y = f.y - Math.sin(f.heading) * i * spacing;
        f.spine.push({
          x: x,
          y: y,
          a: f.heading,
          dx: x,
          dy: y,
          da: f.heading,
        });
      }
    }

    function makeFish(sprite) {
      const p = pondPoint();
      const size = 0.92 + rng() * 0.5;
      const heading = rng() * TWO_PI;
      const f = {
        x: p.x,
        y: p.y,
        heading,
        angle: heading,
        omega: 0,
        speed: 18 + rng() * 10,
        vx: Math.cos(heading) * 20,
        vy: Math.sin(heading) * 20,
        cruise: 20 + rng() * 14,
        boost: 42 + rng() * 16,
        maxOmega: 1.05 + rng() * 0.45,
        size,
        phase: rng() * TWO_PI,
        hz: 1.5,
        waveGain: 0.7,
        bendBias: 0,
        greed: 0.32 + rng() * 0.68,
        vision: 220 + rng() * 260,
        wanderAngle: (rng() - 0.5) * 1.2,
        wanderJitter: 0.55 + rng() * 0.7,
        turnSide: 0,
        gait: rng() < 0.45 ? "coast" : "burst",
        gaitT: 0.4 + rng() * 1.6,
        sprite: sprite || sprites.koi[(rng() * sprites.koi.length) | 0],
        food: null,
        eatT: 0,
        rippleT: rng() * 2,
        spine: null,
      };
      initSpine(f);
      return f;
    }

    function makePad() {
      const p = pondPoint();
      return {
        x: p.x,
        y: p.y,
        angle: rng() * TWO_PI,
        spin: (rng() - 0.5) * 0.03,
        drift: 2 + rng() * 4,
        heading: rng() * TWO_PI,
        scale: 0.55 + rng() * 0.5,
        sprite: sprites.pads[(rng() * sprites.pads.length) | 0],
      };
    }

    function makeMote() {
      return {
        x: rng() * cssW,
        y: rng() * cssH,
        vx: (rng() - 0.5) * 6,
        vy: -4 - rng() * 8,
        a: 0.08 + rng() * 0.16,
        r: 0.6 + rng() * 1.4,
      };
    }

    function setFishCount(n) {
      n = clamp(n | 0, 1, 16);
      while (fish.length < n) fish.push(makeFish());
      while (fish.length > n) fish.pop();
    }

    function setPadCount(n) {
      n = clamp(n | 0, 0, 10);
      while (pads.length < n) pads.push(makePad());
      while (pads.length > n) pads.pop();
    }

    function setMoteCount(n) {
      n = clamp(n | 0, 0, 120);
      while (motes.length < n) motes.push(makeMote());
      while (motes.length > n) motes.pop();
    }

    function resize(w, h, pixelRatio) {
      cssW = w;
      cssH = h;
      dpr = pixelRatio;
      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        f.x = clamp(f.x, w * 0.08, w * 0.92);
        f.y = clamp(f.y, h * 0.08, h * 0.92);
        if (!f.spine || f.spine.length !== SPINE_N) initSpine(f);
      }
    }

    function nearestFood(f) {
      let best = null;
      let bestD = Infinity;
      for (let i = 0; i < food.length; i++) {
        const pellet = food[i];
        if (pellet.eaten) continue;
        const d = Math.hypot(pellet.x - f.x, pellet.y - f.y);
        if (d < bestD) {
          bestD = d;
          best = pellet;
        }
      }
      return best ? { pellet: best, dist: bestD } : null;
    }

    function feed(x, y, water) {
      const n = 2 + ((rng() * 2) | 0);
      for (let i = 0; i < n; i++) {
        food.push({
          x: x + (rng() - 0.5) * 22,
          y: y + (rng() - 0.5) * 18,
          vx: (rng() - 0.5) * 12,
          vy: (rng() - 0.5) * 10,
          r: 3.1 + rng() * 1.6,
          bob: rng() * TWO_PI,
          life: 18 + rng() * 8,
          eaten: false,
        });
      }
      if (water) water.impulse(x / cssW, y / cssH, 0.9);
    }

    function eat(f, pellet, water) {
      pellet.eaten = true;
      f.eatT = 0.42;
      f.food = null;
      f.gait = "coast";
      f.gaitT = 0.8 + rng() * 0.5;
      f.speed *= 0.45;
      if (water) water.impulse(pellet.x / cssW, pellet.y / cssH, 0.28);
      for (let i = 0; i < 4; i++) {
        bubbles.push({
          x: pellet.x + (rng() - 0.5) * 8,
          y: pellet.y,
          vy: -12 - rng() * 16,
          a: 0.35,
          r: 1 + rng() * 1.6,
        });
      }
    }

    function stepGait(f, dt, needPower, calm) {
      f.gaitT -= dt;
      if (f.gaitT <= 0) {
        if (f.gait === "burst") {
          f.gait = "coast";
          f.gaitT = calm ? 2.2 + rng() * 1.6 : 1.05 + rng() * 1.7;
        } else {
          f.gait = "burst";
          f.gaitT = (rng() < 0.55 ? 0.36 : 0.7) * (calm ? 1.15 : 1);
        }
      }
      if (needPower && f.gait === "coast") {
        f.gait = "burst";
        f.gaitT = 0.4 + rng() * 0.25;
      }
    }

    function wallSteer(f) {
      const mx = cssW * 0.14;
      const my = cssH * 0.14;
      let ax = 0;
      let ay = 0;
      if (f.x < mx) ax += Math.pow(1 - f.x / mx, 1.6);
      else if (f.x > cssW - mx) ax -= Math.pow(1 - (cssW - f.x) / mx, 1.6);
      if (f.y < my) ay += Math.pow(1 - f.y / my, 1.6);
      else if (f.y > cssH - my) ay -= Math.pow(1 - (cssH - f.y) / my, 1.6);
      return { x: ax, y: ay };
    }

    function separation(f, i) {
      let sx = 0;
      let sy = 0;
      for (let j = 0; j < fish.length; j++) {
        if (i === j) continue;
        const o = fish[j];
        const dx = f.x - o.x;
        const dy = f.y - o.y;
        const d = Math.hypot(dx, dy);
        const min = 58 * ((f.size + o.size) * 0.5);
        if (d > 0.2 && d < min) {
          const w = (1 - d / min) / d;
          sx += dx * w;
          sy += dy * w;
        }
      }
      return { x: sx, y: sy };
    }

    function wanderTarget(f) {
      const ahead = 88 * f.size;
      const radius = 36 * f.size;
      const hx = Math.cos(f.heading);
      const hy = Math.sin(f.heading);
      const wx = Math.cos(f.heading + f.wanderAngle);
      const wy = Math.sin(f.heading + f.wanderAngle);
      return {
        x: f.x + hx * ahead + wx * radius,
        y: f.y + hy * ahead + wy * radius,
      };
    }

    function followSpine(f) {
      const spacing = spacingOf(f);
      const spine = f.spine;
      if (!spine || spine.length !== SPINE_N) {
        initSpine(f);
        return;
      }
      spine[0].x = f.x;
      spine[0].y = f.y;
      spine[0].a = f.heading;
      for (let i = 1; i < SPINE_N; i++) {
        let dx = spine[i].x - spine[i - 1].x;
        let dy = spine[i].y - spine[i - 1].y;
        let d = Math.hypot(dx, dy);
        if (d < 1e-4) {
          dx = -Math.cos(spine[i - 1].a);
          dy = -Math.sin(spine[i - 1].a);
          d = 1;
        }
        spine[i].x = spine[i - 1].x + (dx / d) * spacing;
        spine[i].y = spine[i - 1].y + (dy / d) * spacing;
        spine[i].a = Math.atan2(spine[i - 1].y - spine[i].y, spine[i - 1].x - spine[i].x);
      }
    }

    function update(dt, water, quality) {
      const calm = reducedMotion();
      for (let i = food.length - 1; i >= 0; i--) {
        const pellet = food[i];
        pellet.life -= dt;
        pellet.bob += dt * 3;
        pellet.vx *= 0.94;
        pellet.vy *= 0.94;
        pellet.x += pellet.vx * dt;
        pellet.y += pellet.vy * dt;
        if (pellet.eaten || pellet.life <= 0) food.splice(i, 1);
      }

      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        f.eatT = Math.max(0, f.eatT - dt);
        f.rippleT -= dt;
        f.wanderAngle = angWrap(f.wanderAngle + (rng() - 0.5) * 2 * f.wanderJitter * dt);
        f.wanderAngle = clamp(f.wanderAngle, -0.95, 0.95);

        const found = nearestFood(f);
        if (found && found.dist < f.vision * (0.45 + f.greed * 0.7) && f.eatT <= 0) {
          f.food = found.pellet;
        } else if (f.food && f.food.eaten) {
          f.food = null;
        }

        const seeking = !!(f.food && !f.food.eaten);
        let desiredX;
        let desiredY;
        let desiredSpeed;
        let arriveDist = 0;

        if (seeking) {
          const dx = f.food.x - f.x;
          const dy = f.food.y - f.y;
          arriveDist = Math.hypot(dx, dy) || 0.001;
          const arriveR = 110 * f.size;
          const seekSpeed = f.boost * (calm ? 0.7 : 1);
          desiredSpeed = arriveDist < arriveR ? seekSpeed * (arriveDist / arriveR) : seekSpeed;
          desiredSpeed = Math.max(desiredSpeed, 8);
          desiredX = (dx / arriveDist) * desiredSpeed;
          desiredY = (dy / arriveDist) * desiredSpeed;
          if (arriveDist < 17 * f.size) eat(f, f.food, water);
        } else {
          const w = wanderTarget(f);
          const dx = w.x - f.x;
          const dy = w.y - f.y;
          const d = Math.hypot(dx, dy) || 1;
          desiredSpeed = f.eatT > 0 ? f.cruise * 0.28 : f.cruise;
          desiredX = (dx / d) * desiredSpeed;
          desiredY = (dy / d) * desiredSpeed;
        }

        const sep = separation(f, i);
        desiredX += sep.x * 26;
        desiredY += sep.y * 26;
        const wall = wallSteer(f);
        desiredX += wall.x * 48;
        desiredY += wall.y * 48;

        const steerX = desiredX - f.vx;
        const steerY = desiredY - f.vy;
        const steerMag = Math.hypot(steerX, steerY);
        const maxSteer = seeking ? 54 : 32;
        if (steerMag > maxSteer) {
          desiredX = f.vx + (steerX / steerMag) * maxSteer;
          desiredY = f.vy + (steerY / steerMag) * maxSteer;
        } else {
          desiredX = f.vx + steerX;
          desiredY = f.vy + steerY;
        }

        const goalHeading = Math.atan2(desiredY, desiredX);
        let err = angWrap(goalHeading - f.heading);
        if (Math.abs(err) > 2.45) {
          if (!f.turnSide) f.turnSide = err > 0 ? 1 : -1;
          err = f.turnSide * Math.abs(err);
        } else if (Math.abs(err) < 1.05) {
          f.turnSide = 0;
        }

        const maxOmega = f.maxOmega * (seeking ? 1.55 : 1) * (f.speed < 10 ? 0.7 : 1);
        const shaped = Math.pow(clamp(Math.abs(err) / 1.05, 0, 1), 1.55);
        const desiredOmega = Math.sign(err) * shaped * maxOmega;
        f.omega = damp(f.omega, desiredOmega, dt, 7.2);
        f.omega = clamp(f.omega, -maxOmega, maxOmega);
        f.heading = angWrap(f.heading + f.omega * dt);
        f.angle = f.heading;

        const needPower = seeking || Math.abs(err) > 0.85 || Math.hypot(wall.x, wall.y) > 0.35;
        stepGait(f, dt, needPower && f.eatT <= 0, calm);

        let targetGain;
        let targetHz;
        let targetSpeed;
        if (f.eatT > 0) {
          targetGain = 0.12;
          targetHz = 0.8;
          targetSpeed = f.cruise * 0.22;
        } else if (seeking) {
          targetGain = 1.05;
          targetHz = 2.15;
          targetSpeed = desiredSpeed;
        } else if (f.gait === "coast" && !needPower) {
          targetGain = 0.16;
          targetHz = 0.85;
          targetSpeed = f.cruise * 0.38;
        } else {
          targetGain = 1;
          targetHz = 1.55 + f.speed * 0.012;
          targetSpeed = f.cruise;
        }
        if (calm) {
          targetGain *= 0.4;
          targetHz *= 0.7;
          targetSpeed *= 0.75;
        }

        const yawCost = Math.min(0.22, Math.abs(f.omega) * 0.1);
        targetSpeed *= 1 - yawCost;
        targetSpeed = Math.max(targetSpeed, seeking ? 8 : 6);

        const accel = seeking ? 2.1 : f.gait === "burst" ? 1.7 : 1.15;
        f.speed = damp(f.speed, targetSpeed, dt, accel);
        f.waveGain = damp(f.waveGain, targetGain, dt, 4.5);
        f.hz = damp(f.hz, targetHz, dt, 3.2);
        f.phase += dt * TWO_PI * f.hz;

        const align = 1 - Math.exp(-dt * 9);
        const course = Math.atan2(f.vy, f.vx);
        const aligned = course + angWrap(f.heading - course) * align;
        f.vx = Math.cos(aligned) * f.speed;
        f.vy = Math.sin(aligned) * f.speed;
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.x = clamp(f.x, 14, cssW - 14);
        f.y = clamp(f.y, 14, cssH - 14);

        const targetBend = clamp(f.omega * 0.28, -0.52, 0.52);
        f.bendBias = damp(f.bendBias, targetBend, dt, 6.5);

        followSpine(f);

        if (water && f.rippleT <= 0 && f.gait === "burst" && f.speed > 26) {
          water.impulse(f.x / cssW, f.y / cssH, 0.07);
          f.rippleT = 1.1 + rng() * 1.3;
        }
      }

      for (let i = 0; i < pads.length; i++) {
        const pad = pads[i];
        pad.heading += (rng() - 0.5) * dt * 0.4;
        pad.x += Math.cos(pad.heading) * pad.drift * dt;
        pad.y += Math.sin(pad.heading) * pad.drift * dt;
        pad.angle += pad.spin * dt;
        if (pad.x < cssW * 0.08 || pad.x > cssW * 0.92) pad.heading = Math.PI - pad.heading;
        if (pad.y < cssH * 0.1 || pad.y > cssH * 0.9) pad.heading = -pad.heading;
        pad.x = clamp(pad.x, cssW * 0.08, cssW * 0.92);
        pad.y = clamp(pad.y, cssH * 0.1, cssH * 0.9);
      }

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -8 || m.x < -8 || m.x > cssW + 8) {
          m.x = rng() * cssW;
          m.y = cssH + 6;
        }
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y += b.vy * dt;
        b.a -= dt * 0.45;
        if (b.a <= 0) bubbles.splice(i, 1);
      }

      void quality;
    }

    function deformSpine(f) {
      const spine = f.spine;
      const len = bodyLength(f);
      const k = 4.55;
      for (let i = 0; i < spine.length; i++) {
        const s = i / (spine.length - 1);
        const a = spine[i].a;
        const wave = f.waveGain * 0.085 * Math.pow(s, 1.9) * Math.sin(f.phase - s * k);
        const bend = f.bendBias * (0.12 + 0.88 * s);
        const lat = (wave + bend * 0.34) * len;
        spine[i].dx = spine[i].x + -Math.sin(a) * lat;
        spine[i].dy = spine[i].y + Math.cos(a) * lat;
        spine[i].da = a + f.waveGain * 0.32 * Math.pow(s, 1.35) * Math.cos(f.phase - s * k) + f.bendBias * 0.5;
      }
    }

    function drawShadow(f, blur) {
      const spine = f.spine;
      const mid = spine[Math.floor(spine.length * 0.45)] || spine[0];
      ctx.save();
      ctx.translate(mid.x + 8, mid.y + 12);
      ctx.rotate(f.heading);
      ctx.scale(1, 0.4);
      if (blur) ctx.filter = "blur(7px)";
      ctx.fillStyle = "rgba(0, 18, 14, 0.28)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 58 * f.size, 24 * f.size, 0, 0, TWO_PI);
      ctx.fill();
      ctx.filter = "none";
      ctx.restore();
    }

    function drawFish(f, slices) {
      const tex = f.sprite.canvas;
      const n = slices;
      const bodyW = bodyLength(f);
      const bodyH = bodyW * (tex.height / tex.width);
      const spine = f.spine;
      const step = (spine.length - 1) / (n - 1);
      const dw = spacingOf(f) * 1.82;
      ctx.save();
      ctx.globalAlpha = 0.96;
      for (let i = 0; i < n; i++) {
        const idx = Math.round(i * step);
        const seg = spine[idx];
        const sx = tex.width * (1 - (i + 1) / n);
        const sw = tex.width / n;
        ctx.save();
        ctx.translate(seg.dx, seg.dy);
        ctx.rotate(seg.da);
        ctx.drawImage(tex, sx, 0, sw, tex.height, -dw * 0.42, -bodyH / 2, dw, bodyH);
        ctx.restore();
      }
      ctx.restore();
    }

    function sliceCount(quality) {
      if (quality && quality.spineSlices) return quality.spineSlices;
      return 8;
    }

    function render(quality) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const slices = sliceCount(quality);
      for (let i = 0; i < fish.length; i++) deformSpine(fish[i]);
      for (let i = 0; i < fish.length; i++) drawShadow(fish[i], quality && quality.blurShadow);

      const order = fish.slice().sort(function (a, b) {
        return a.y - b.y;
      });
      for (let i = 0; i < order.length; i++) drawFish(order[i], slices);

      for (let i = 0; i < food.length; i++) {
        const pellet = food[i];
        const bob = Math.sin(pellet.bob) * 1.1;
        ctx.fillStyle = "rgba(92, 58, 28, 0.18)";
        ctx.beginPath();
        ctx.ellipse(pellet.x + 1, pellet.y + 4, pellet.r * 1.3, pellet.r * 0.55, 0, 0, TWO_PI);
        ctx.fill();
        const pg = ctx.createRadialGradient(pellet.x - 0.6, pellet.y + bob - 0.6, 0.2, pellet.x, pellet.y + bob, pellet.r);
        pg.addColorStop(0, "#c8a06a");
        pg.addColorStop(1, "#6a4220");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(pellet.x, pellet.y + bob, pellet.r, 0, TWO_PI);
        ctx.fill();
      }

      for (let i = 0; i < pads.length; i++) {
        const pad = pads[i];
        const s = pad.sprite;
        const w = 148 * pad.scale;
        ctx.save();
        ctx.globalAlpha = 0.88;
        ctx.translate(pad.x, pad.y);
        ctx.rotate(pad.angle);
        ctx.drawImage(s, -w / 2, -w / 2, w, w);
        ctx.restore();
      }

      ctx.fillStyle = "rgba(232, 224, 196, 0.55)";
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        ctx.globalAlpha = m.a;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, TWO_PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = "rgba(210, 230, 220, 0.45)";
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        ctx.globalAlpha = b.a;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, TWO_PI);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    return {
      resize,
      setFishCount,
      setPadCount,
      setMoteCount,
      feed,
      update,
      render,
      fish,
      food,
    };
  }

  global.PondWorld = { create };
})(window);
