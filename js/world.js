/* Koi idle swim, food pellets, lily pads, and quiet particles. */
(function (global) {
  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function angWrap(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
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

    function pondPoint() {
      return {
        x: cssW * (0.14 + rng() * 0.72),
        y: cssH * (0.16 + rng() * 0.68),
      };
    }

    function makeFish(sprite) {
      const p = pondPoint();
      const size = 0.88 + rng() * 0.55;
      const angle = rng() * Math.PI * 2;
      const segs = [];
      const n = 10;
      const spacing0 = 14 * size;
      for (let i = 0; i < n; i++) {
        segs.push({
          x: p.x - Math.cos(angle) * i * spacing0,
          y: p.y - Math.sin(angle) * i * spacing0,
          a: angle,
        });
      }
      return {
        x: p.x,
        y: p.y,
        angle: angle,
        speed: 0,
        cruise: 16 + rng() * 18,
        boost: 52 + rng() * 28,
        turn: 1.15 + rng() * 0.9,
        size,
        phase: rng() * Math.PI * 2,
        greed: 0.32 + rng() * 0.68,
        vision: 220 + rng() * 260,
        sprite: sprite || sprites.koi[(rng() * sprites.koi.length) | 0],
        segs,
        target: pondPoint(),
        food: null,
        eatT: 0,
        wanderT: 3 + rng() * 6,
        rippleT: rng() * 2,
      };
    }

    function makePad() {
      const p = pondPoint();
      return {
        x: p.x,
        y: p.y,
        angle: rng() * Math.PI * 2,
        spin: (rng() - 0.5) * 0.03,
        drift: 2 + rng() * 4,
        heading: rng() * Math.PI * 2,
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
        fish[i].x = clamp(fish[i].x, w * 0.08, w * 0.92);
        fish[i].y = clamp(fish[i].y, h * 0.08, h * 0.92);
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

    function steerTo(f, x, y, dt, rate) {
      const desired = Math.atan2(y - f.y, x - f.x);
      let diff = angWrap(desired - f.angle);
      const max = rate * dt;
      if (diff > max) diff = max;
      if (diff < -max) diff = -max;
      f.angle = angWrap(f.angle + diff);
    }

    function keepInside(f, dt) {
      const nx = f.x / cssW;
      const ny = f.y / cssH;
      if (nx < 0.08 || nx > 0.92 || ny < 0.08 || ny > 0.92) {
        steerTo(f, cssW * 0.5, cssH * 0.5, dt, f.turn * 1.8);
      }
    }

    function feed(x, y, water) {
      const n = 2 + ((rng() * 2) | 0);
      for (let i = 0; i < n; i++) {
        food.push({
          x: x + (rng() - 0.5) * 22,
          y: y + (rng() - 0.5) * 18,
          vx: (rng() - 0.5) * 12,
          vy: (rng() - 0.5) * 10,
          r: 2.2 + rng() * 1.4,
          bob: rng() * Math.PI * 2,
          life: 18 + rng() * 8,
          eaten: false,
        });
      }
      if (water) water.impulse(x / cssW, y / cssH, 0.9);
    }

    function eat(f, pellet, water) {
      pellet.eaten = true;
      f.eatT = 0.38;
      f.food = null;
      f.speed *= 0.35;
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

    function update(dt, water, quality) {
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
        f.phase += dt * (4.2 + f.speed * 0.08);
        f.eatT = Math.max(0, f.eatT - dt);
        f.wanderT -= dt;
        f.rippleT -= dt;

        const found = nearestFood(f);
        if (found && found.dist < f.vision * (0.45 + f.greed * 0.7)) {
          f.food = found.pellet;
        } else if (f.food && f.food.eaten) {
          f.food = null;
        }

        if (f.food && !f.food.eaten) {
          steerTo(f, f.food.x, f.food.y, dt, f.turn * 2.1);
          f.speed += (f.boost - f.speed) * (1 - Math.exp(-dt * 2.4));
          if (Math.hypot(f.food.x - f.x, f.food.y - f.y) < 16 * f.size) {
            eat(f, f.food, water);
          }
        } else {
          if (f.wanderT <= 0 || !f.target) {
            f.target = pondPoint();
            f.wanderT = 4 + rng() * 8;
          }
          steerTo(f, f.target.x, f.target.y, dt, f.turn);
          const desired = f.eatT > 0 ? f.cruise * 0.35 : f.cruise;
          f.speed += (desired - f.speed) * (1 - Math.exp(-dt * 1.6));
          if (f.target && Math.hypot(f.target.x - f.x, f.target.y - f.y) < 28) {
            f.wanderT = 0;
          }
        }

        keepInside(f, dt);

        for (let j = 0; j < fish.length; j++) {
          if (i === j) continue;
          const o = fish[j];
          const dx = f.x - o.x;
          const dy = f.y - o.y;
          const d = Math.hypot(dx, dy);
          const min = 46 * ((f.size + o.size) * 0.5);
          if (d > 0.1 && d < min) {
            f.angle = angWrap(f.angle + ((dx > 0 ? 0.4 : -0.4) * dt * (1 - d / min)));
          }
        }

        const sway = Math.sin(f.phase) * 0.16;
        f.x += Math.cos(f.angle) * f.speed * dt;
        f.y += Math.sin(f.angle) * f.speed * dt;
        f.x = clamp(f.x, 8, cssW - 8);
        f.y = clamp(f.y, 8, cssH - 8);

        const segs = f.segs;
        segs[0].x = f.x;
        segs[0].y = f.y;
        segs[0].a = f.angle + sway;
        const spacing = 14 * f.size;
        for (let s = 1; s < segs.length; s++) {
          const prev = segs[s - 1];
          const cur = segs[s];
          let dx = cur.x - prev.x;
          let dy = cur.y - prev.y;
          let dist = Math.hypot(dx, dy) || 0.001;
          const wave = Math.sin(f.phase - s * 0.46) * 2.2 * f.size * (s / segs.length);
          const px = -Math.sin(prev.a) * wave;
          const py = Math.cos(prev.a) * wave;
          cur.x = prev.x - (dx / dist) * spacing + px * 0.15;
          cur.y = prev.y - (dy / dist) * spacing + py * 0.15;
          dx = prev.x - cur.x;
          dy = prev.y - cur.y;
          cur.a = Math.atan2(dy, dx);
        }

        if (water && f.rippleT <= 0 && f.speed > 28) {
          water.impulse(f.x / cssW, f.y / cssH, 0.08);
          f.rippleT = 0.9 + rng() * 1.2;
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
      ctx.save();
      ctx.translate(f.x + 8, f.y + 12);
      ctx.rotate(f.angle);
      ctx.scale(1, 0.38);
      if (blur) ctx.filter = "blur(7px)";
      ctx.fillStyle = "rgba(0, 18, 14, 0.26)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 52 * f.size, 22 * f.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.filter = "none";
      ctx.restore();
    }

    function drawFish(f) {
      const tex = f.sprite.canvas;
      const segs = f.segs;
      const n = segs.length;
      ctx.save();
      ctx.globalAlpha = 0.94;
      for (let i = 0; i < n; i++) {
        const seg = segs[i];
        const sx = tex.width * (1 - (i + 1) / n);
        const sw = tex.width / n;
        const dw = 20 * f.size;
        const dh = 74 * f.size;
        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.a);
        ctx.drawImage(tex, sx, 0, sw, tex.height, -dw * 0.15, -dh / 2, dw * 1.15, dh);
        ctx.restore();
      }
      ctx.restore();
    }

    function render(quality) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      for (let i = 0; i < fish.length; i++) drawShadow(fish[i], quality.blurShadow);

      const order = fish.slice().sort(function (a, b) {
        return a.y - b.y;
      });
      for (let i = 0; i < order.length; i++) drawFish(order[i]);

      for (let i = 0; i < food.length; i++) {
        const pellet = food[i];
        const bob = Math.sin(pellet.bob) * 1.1;
        ctx.fillStyle = "rgba(92, 58, 28, 0.18)";
        ctx.beginPath();
        ctx.ellipse(pellet.x + 1, pellet.y + 4, pellet.r * 1.3, pellet.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        const pg = ctx.createRadialGradient(pellet.x - 0.6, pellet.y + bob - 0.6, 0.2, pellet.x, pellet.y + bob, pellet.r);
        pg.addColorStop(0, "#c8a06a");
        pg.addColorStop(1, "#6a4220");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(pellet.x, pellet.y + bob, pellet.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < pads.length; i++) {
        const pad = pads[i];
        const s = pad.sprite;
        const w = 118 * pad.scale;
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
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = "rgba(210, 230, 220, 0.45)";
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        ctx.globalAlpha = b.a;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
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
