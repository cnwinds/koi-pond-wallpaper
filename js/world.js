/* Koi idle swim, food pellets, lily pads, and quiet particles.
 *
 * Motion model (reimplemented; not a copy of any third-party source):
 * - swim / idle state machine; idle lasts a few seconds while cruising
 * - targetHeading retargeted infrequently with a random offset
 * - Soft edge + separation blended into that heading
 * - Yaw capped so turn radius stays >= 0.85 body lengths (swim through
 *   turns; do not spin about the head)
 * - Cruise speed with slow noise; accel/decel is rate-capped
 * - Small sin wiggle on the move angle; tail-beat Hz ~ speed / length
 * - IK joint chain from the head, per-link + cumulative bend limits
 *
 * Inspired by the publicly visible koi.rest client approach, plus
 * Reynolds wander/steering and standard IK follow chains.
 */
(function (global) {
  const TWO_PI = Math.PI * 2;
  const SPINE_N = 12;
  const JOINT_LIMIT = Math.PI / 9;
  const MAX_BEND = 1.75;
  const MIN_TURN_RADII = 0.85;
  const SEEK_TURN_RADII = 0.35;

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function angWrap(a) {
    a = ((a + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
    return a;
  }

  function create(canvas, options) {
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const sprites = options.sprites;
    const rng = PondSprites.mulberry32(90210);

    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    let clock = 0;
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
        f.spine.push({ x: x, y: y, a: f.heading });
      }
    }

    function makeFish(sprite) {
      const p = pondPoint();
      const size = 0.92 + rng() * 0.5;
      const heading = rng() * TWO_PI;
      const cruise = 56 + rng() * 22;
      const f = {
        x: p.x,
        y: p.y,
        heading: heading,
        angle: heading,
        targetHeading: heading,
        omega: 0,
        speed: cruise,
        cruise: cruise,
        minSpeed: cruise * 0.3,
        maxSpeed: cruise * 1.7,
        accel: 64 + rng() * 18,
        boost: cruise * 1.5,
        size: size,
        phase: rng() * TWO_PI,
        greed: 0.32 + rng() * 0.68,
        vision: 220 + rng() * 260,
        mode: "swim",
        idleT: 0,
        retargetT: 0,
        retargetIn: 1.2 + rng() * 1.6,
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
      f.mode = "idle";
      f.idleT = 0.6 + rng() * 0.8;
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

    function approachSpeed(f, target, dt) {
      const dv = target - f.speed;
      const step = f.accel * dt;
      if (Math.abs(dv) <= step) f.speed = target;
      else f.speed += Math.sign(dv) * step;
    }

    function blendHeading(base, sx, sy) {
      if (sx === 0 && sy === 0) return base;
      return Math.atan2(Math.sin(base) + sy, Math.cos(base) + sx);
    }

    function edgeSteer(f) {
      const m = Math.max(80, Math.min(cssW, cssH) * 0.12);
      let sx = 0;
      let sy = 0;
      if (f.x < m) sx += (1 - f.x / m) * 3;
      if (f.x > cssW - m) sx -= (1 - (cssW - f.x) / m) * 3;
      if (f.y < m) sy += (1 - f.y / m) * 3;
      if (f.y > cssH - m) sy -= (1 - (cssH - f.y) / m) * 3;
      return { x: sx, y: sy };
    }

    function separation(f, i) {
      let sx = 0;
      let sy = 0;
      const len = bodyLength(f);
      for (let j = 0; j < fish.length; j++) {
        if (i === j) continue;
        const o = fish[j];
        const dx = f.x - o.x;
        const dy = f.y - o.y;
        const d = Math.hypot(dx, dy);
        const min = (len + bodyLength(o)) * 0.5;
        if (d > 0.01 && d < min) {
          const k = (1 - d / min) * 1.5;
          sx += (dx / d) * k;
          sy += (dy / d) * k;
        }
      }
      return { x: sx, y: sy };
    }

    function resolveIK(f) {
      const spacing = spacingOf(f);
      if (!f.spine || f.spine.length !== SPINE_N) initSpine(f);
      const spine = f.spine;
      spine[0].x = f.x;
      spine[0].y = f.y;
      spine[0].a = f.heading;
      for (let i = 1; i < SPINE_N; i++) {
        const prev = spine[i - 1];
        let desired = Math.atan2(prev.y - spine[i].y, prev.x - spine[i].x);
        let diff = clamp(angWrap(desired - prev.a), -JOINT_LIMIT, JOINT_LIMIT);
        let a = prev.a + diff;
        a = f.heading + clamp(angWrap(a - f.heading), -MAX_BEND, MAX_BEND);
        spine[i].a = a;
        spine[i].x = prev.x - Math.cos(a) * spacing;
        spine[i].y = prev.y - Math.sin(a) * spacing;
      }
    }

    function assignSeekers() {
      const ranked = [];
      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        if (f.food && f.food.eaten) f.food = null;
        if (f.eatT > 0) continue;
        const found = nearestFood(f);
        if (found && found.dist < f.vision * (0.45 + f.greed * 0.7)) {
          ranked.push({ f: f, dist: found.dist, pellet: found.pellet });
        }
      }
      ranked.sort(function (a, b) {
        return a.dist - b.dist;
      });
      const chosen = [];
      for (let i = 0; i < ranked.length && chosen.length < 3; i++) {
        ranked[i].f.food = ranked[i].pellet;
        chosen.push(ranked[i].f);
      }
      for (let i = 0; i < fish.length; i++) {
        if (chosen.indexOf(fish[i]) < 0 && fish[i].eatT <= 0) fish[i].food = null;
      }
    }

    function update(dt, water, quality, climate) {
      const calm = reducedMotion();
      clock += dt;
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

      assignSeekers();

      const windX = climate && climate.wind ? climate.wind.x : 0;
      const windY = climate && climate.wind ? climate.wind.y : 0;
      const currentX =
        (Math.sin(clock * 0.021) * 3.2 + Math.sin(clock * 0.013 + 2) * 2.2) * (calm ? 0.35 : 1) + windX;
      const currentY =
        (Math.cos(clock * 0.017 + 1) * 2.6 + Math.sin(clock * 0.011 + 4) * 1.8) * (calm ? 0.35 : 1) + windY;

      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        f.eatT = Math.max(0, f.eatT - dt);
        f.rippleT -= dt;
        if (f.food && f.food.eaten) f.food = null;

        const seeking = !!(f.food && !f.food.eaten);
        let arriveDist = 0;

        if (seeking) {
          f.mode = "swim";
          f.idleT = 0;
          const dx = f.food.x - f.x;
          const dy = f.food.y - f.y;
          arriveDist = Math.hypot(dx, dy) || 0.001;
          f.targetHeading = Math.atan2(dy, dx);
          if (arriveDist < 32 * f.size) eat(f, f.food, water);
        }

        if (f.mode === "idle") {
          f.idleT -= dt;
          approachSpeed(f, f.minSpeed * 0.3, dt);
          if (f.idleT <= 0) f.mode = "swim";
        } else if (!seeking) {
          if (f.eatT <= 0 && rng() < dt * 0.03) {
            f.mode = "idle";
            f.idleT = 2 + rng() * 3;
          }
          const noise = 0.5 + 0.5 * Math.sin(clock * 0.7 + f.phase);
          let targetSpeed = clamp(f.cruise * (0.7 + 0.5 * noise), f.minSpeed, f.maxSpeed);
          if (f.eatT > 0) targetSpeed = f.minSpeed * 0.45;
          if (calm) targetSpeed *= 0.75;
          approachSpeed(f, targetSpeed, dt);
        } else {
          const arriveR = 70 * f.size;
          const ramp = arriveDist < arriveR ? 0.4 + 0.6 * (arriveDist / arriveR) : 1;
          let targetSpeed = Math.max(f.boost * ramp * (calm ? 0.75 : 1), f.minSpeed);
          approachSpeed(f, targetSpeed, dt);
        }

        if (!seeking && f.mode === "swim") {
          f.retargetT += dt;
          if (f.retargetT >= f.retargetIn) {
            f.targetHeading = angWrap(f.targetHeading + (rng() * 2.4 - 1.2));
            f.retargetIn = 1 + rng() * 1.5;
            f.retargetT = 0;
          }
        }

        const edge = edgeSteer(f);
        const sep = separation(f, i);
        const sepW = seeking && arriveDist < 90 ? 0.25 : 1;
        const desired = blendHeading(f.targetHeading, edge.x + sep.x * sepW, edge.y + sep.y * sepW);

        const len = bodyLength(f);
        const err = angWrap(desired - f.heading);
        // Cruise keeps r >= 0.85 L. Near food, ease toward a tighter radius
        // so the pellet is not trapped inside an unreachable turning circle.
        let minR = MIN_TURN_RADII;
        if (seeking && arriveDist < len * 1.4) {
          const t = clamp(arriveDist / (len * 1.4), 0, 1);
          minR = SEEK_TURN_RADII + (MIN_TURN_RADII - SEEK_TURN_RADII) * t;
        }
        const maxTurn = Math.min(0.8, Math.max(0.02, f.speed / (minR * len)));
        const omega = clamp(err * 2.5, -maxTurn, maxTurn);
        f.omega = omega;
        f.heading = angWrap(f.heading + omega * dt);
        f.angle = f.heading;

        const speedRatio = clamp(f.speed / f.cruise, 0.4, 1.6);
        const wiggle = Math.sin(f.phase) * 0.38 * speedRatio * (calm ? 0.4 : 1);
        const moveAngle = f.heading + wiggle;
        f.x += Math.cos(moveAngle) * f.speed * dt + currentX * dt;
        f.y += Math.sin(moveAngle) * f.speed * dt + currentY * dt;
        f.x = clamp(f.x, 12, cssW - 12);
        f.y = clamp(f.y, 12, cssH - 12);

        const beatHz = clamp(f.speed / (len * 0.8), 0.12, 0.65);
        f.phase += dt * TWO_PI * beatHz;

        resolveIK(f);

        if (water && f.rippleT <= 0 && f.mode === "swim" && f.speed > 26) {
          water.impulse(f.x / cssW, f.y / cssH, 0.07);
          f.rippleT = 1.2 + rng() * 1.4;
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

    function sampleSpine(spine, t) {
      const max = spine.length - 1;
      const u = clamp(t, 0, 1) * max;
      const i = Math.min(max - 1, u | 0);
      const f = u - i;
      const a = spine[i];
      const b = spine[i + 1];
      return {
        x: a.x + (b.x - a.x) * f,
        y: a.y + (b.y - a.y) * f,
        a: a.a + angWrap(b.a - a.a) * f,
      };
    }

    function drawFish(f, slices) {
      const tex = f.sprite.canvas;
      const n = Math.max(6, slices);
      const bodyW = bodyLength(f);
      const bodyH = bodyW * (tex.height / tex.width);
      const spine = f.spine;
      const dw = (bodyW / n) * 2.15;
      ctx.save();
      ctx.globalAlpha = 0.96;
      for (let i = 0; i < n; i++) {
        const seg = sampleSpine(spine, i / (n - 1));
        const sx = tex.width * (1 - (i + 1) / n);
        const sw = tex.width / n;
        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.a);
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
