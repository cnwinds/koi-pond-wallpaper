// Koi steering for the WebGPU pond. Wander, a loose feeding school, and
// click-to-seek. Not the WebGL wallpaper's IK spine, and not Tidewater's fish.

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function angWrap(a) {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

function angLerp(a, b, t) {
  return a + angWrap(b - a) * t;
}

const SEEKERS = 7;
const MAX_FOOD = 4;
const MAX_RIPPLES = 8;

export function createSim({ fish: fishCount = 46, halfW = 8, halfH = 4.5, cx = 0, cy = 0, seed = 7 } = {}) {
  const rng = mulberry32(seed);
  const count = Math.max(1, Math.min(80, fishCount | 0));
  const fish = [];
  const foods = [];
  const ripples = [];
  const anchor = { x: cx + halfW * 0.06, y: cy - halfH * 0.04 };
  let nextFood = 1;
  let time = 0;
  let eaten = 0;
  const bounds = { halfW, halfH, cx, cy };

  const schoolN = Math.max(4, Math.round(count * 0.34));

  for (let i = 0; i < count; i++) {
    const school = i < schoolN;
    const patternRoll = rng();
    const pattern = patternRoll < 0.34 ? 0 : patternRoll < 0.6 ? 1 : patternRoll < 0.8 ? 2 : 3;
    const len = 1.05 + rng() * 0.7;
    let x;
    let y;
    let heading;
    if (school) {
      const a = rng() * Math.PI * 2;
      const rad = Math.sqrt(rng()) * Math.min(halfW, halfH) * 0.22;
      x = anchor.x + Math.cos(a) * rad;
      y = anchor.y + Math.sin(a) * rad * 0.72;
      heading = a + 0.4;
    } else {
      const a = rng() * Math.PI * 2;
      const rad = 0.15 + Math.sqrt(rng()) * 0.72;
      x = cx + Math.cos(a) * halfW * rad * 0.78;
      y = cy + Math.sin(a) * halfH * rad * 0.78;
      heading = rng() * Math.PI * 2;
    }
    fish.push({
      x,
      y,
      heading,
      targetHeading: heading,
      speed: 0.45 + rng() * 0.25,
      cruise: 0.52 + rng() * 0.38,
      len,
      phase: rng() * Math.PI * 2,
      hz: 4.2 + rng() * 2.4,
      pattern,
      seed: rng() * 20 + 0.2,
      school,
      orbit: 0.35 + rng() * 0.95,
      retarget: 0.4 + rng() * 1.6,
      seek: null,
      seekDist: 99,
      z: 0.08 + rng() * 0.1,
    });
  }

  function ripple(x, y, amp) {
    ripples.push({ x, y, age: 0, amp });
    if (ripples.length > MAX_RIPPLES) ripples.shift();
  }

  function foodById(id) {
    for (let i = 0; i < foods.length; i++) if (foods[i].id === id) return foods[i];
    return null;
  }

  function setBounds(nextHalfW, nextHalfH, nextCx = 0, nextCy = 0) {
    bounds.halfW = Math.max(0.5, nextHalfW);
    bounds.halfH = Math.max(0.5, nextHalfH);
    bounds.cx = nextCx;
    bounds.cy = nextCy;
    const maxX = bounds.halfW * 0.84;
    const maxY = bounds.halfH * 0.8;
    for (const f of fish) {
      f.x = Math.min(bounds.cx + maxX, Math.max(bounds.cx - maxX, f.x));
      f.y = Math.min(bounds.cy + maxY, Math.max(bounds.cy - maxY, f.y));
    }
  }

  function feed(x, y) {
    const dx = (x - bounds.cx) / bounds.halfW;
    const dy = (y - bounds.cy) / bounds.halfH;
    if (dx * dx + dy * dy > 1.2) return false;
    if (foods.length >= MAX_FOOD) {
      const old = foods.shift();
      for (const f of fish) if (f.seek === old.id) f.seek = null;
    }
    const item = { id: nextFood++, x, y, life: 9, splashed: false };
    foods.push(item);
    ripple(x, y, 1);
    const ranked = fish
      .map((f, index) => ({ index, d: Math.hypot(f.x - x, f.y - y) }))
      .sort((a, b) => a.d - b.d);
    const n = Math.min(SEEKERS, ranked.length);
    for (let i = 0; i < n; i++) fish[ranked[i].index].seek = item.id;
    return true;
  }

  function stepFish(f, dt) {
    let desired = f.targetHeading;
    const food = f.seek != null ? foodById(f.seek) : null;
    if (f.seek != null && !food) f.seek = null;

    if (food) {
      desired = Math.atan2(food.y - f.y, food.x - f.x);
      f.seekDist = Math.hypot(food.x - f.x, food.y - f.y);
    } else if (f.school) {
      const wob = time * 0.22 + f.phase;
      const tx = anchor.x + Math.cos(wob) * f.orbit;
      const ty = anchor.y + Math.sin(wob * 0.9) * f.orbit * 0.7;
      const aim = Math.atan2(ty - f.y, tx - f.x);
      desired = angLerp(f.targetHeading, aim, 0.72);
      f.seekDist = 99;
    } else {
      f.seekDist = 99;
    }

    const nx = (f.x - bounds.cx) / (bounds.halfW * 0.8);
    const ny = (f.y - bounds.cy) / (bounds.halfH * 0.76);
    const er = nx * nx + ny * ny;
    if (er > 1) {
      const inward = Math.atan2(bounds.cy - f.y, bounds.cx - f.x);
      desired = angLerp(desired, inward, Math.min(1, (er - 1) * 1.5));
    }

    let sepX = 0;
    let sepY = 0;
    const reach = Math.max(0.2, f.len * 0.16);
    for (let i = 0; i < fish.length; i++) {
      const o = fish[i];
      if (o === f) continue;
      const dx = f.x - o.x;
      const dy = f.y - o.y;
      const d2 = dx * dx + dy * dy;
      const min = (f.len + o.len) * 0.28;
      if (d2 < min * min && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        const push = (min - d) / d;
        sepX += dx * push;
        sepY += dy * push;
      }
    }
    if (sepX !== 0 || sepY !== 0) {
      const sepA = Math.atan2(sepY, sepX);
      const eating = food && f.seekDist < reach * 2.2;
      desired = angLerp(desired, sepA, eating ? 0.15 : 0.42);
    }

    const radius = food ? 0.38 * f.len : 0.9 * f.len;
    const cap = (Math.max(f.speed, 0.15) / Math.max(radius, 0.15)) * dt;
    const delta = Math.max(-cap, Math.min(cap, angWrap(desired - f.heading)));
    f.heading = angWrap(f.heading + delta);

    let targetSpeed = f.cruise * (0.86 + 0.14 * Math.sin(time * 0.35 + f.phase));
    if (food) {
      const arrive = f.seekDist < 0.7 ? Math.max(0.22, f.seekDist / 0.7) : 1;
      targetSpeed = f.cruise * 1.75 * arrive;
    }
    const accel = 1.1 * dt;
    f.speed += Math.max(-accel, Math.min(accel, targetSpeed - f.speed));

    const wobble = Math.sin(time * f.hz + f.phase) * (food && f.seekDist < reach ? 0.22 : 0.07);
    const h = f.heading + wobble;
    f.x += Math.cos(h) * f.speed * dt;
    f.y += Math.sin(h) * f.speed * dt;

    const maxX = bounds.halfW * 0.86;
    const maxY = bounds.halfH * 0.82;
    if (f.x > bounds.cx + maxX || f.x < bounds.cx - maxX || f.y > bounds.cy + maxY || f.y < bounds.cy - maxY) {
      f.x = Math.min(bounds.cx + maxX, Math.max(bounds.cx - maxX, f.x));
      f.y = Math.min(bounds.cy + maxY, Math.max(bounds.cy - maxY, f.y));
      f.heading = angLerp(f.heading, Math.atan2(bounds.cy - f.y, bounds.cx - f.x), 0.45);
    }

    f.retarget -= dt;
    if (f.retarget <= 0 && !food) {
      f.targetHeading = f.heading + (rng() - 0.5) * 1.5;
      if (f.school) {
        const aim = Math.atan2(anchor.y - f.y, anchor.x - f.x);
        f.targetHeading = angLerp(f.targetHeading, aim, 0.6);
      }
      f.retarget = 1.2 + rng() * 2.4;
    }

    if (food && f.seekDist < reach) {
      food.life -= dt * 2.4;
      f.speed *= 0.9;
      if (!food.splashed) {
        food.splashed = true;
        ripple(food.x, food.y, 0.55);
      }
    }
  }

  function step(dt) {
    const h = Math.max(0, Math.min(dt, 0.1));
    if (h === 0) return;
    time += h;
    anchor.x = bounds.cx + Math.cos(time * 0.07) * bounds.halfW * 0.16;
    anchor.y = bounds.cy + Math.sin(time * 0.05) * bounds.halfH * 0.14;

    for (let i = 0; i < fish.length; i++) stepFish(fish[i], h);

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].age += h;
      if (ripples[i].age > 4.4) ripples.splice(i, 1);
    }

    for (let i = foods.length - 1; i >= 0; i--) {
      const food = foods[i];
      food.life -= h * 0.28;
      if (food.life <= 0) {
        eaten++;
        ripple(food.x, food.y, 0.35);
        foods.splice(i, 1);
        for (const f of fish) if (f.seek === food.id) f.seek = null;
      }
    }
  }

  return {
    fish,
    foods,
    ripples,
    bounds,
    get time() { return time; },
    get eaten() { return eaten; },
    step,
    feed,
    setBounds,
  };
}
