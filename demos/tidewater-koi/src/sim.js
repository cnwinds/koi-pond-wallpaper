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
// Cruise caps, rad/s. The rate eases up to these; it does not step to them.
const TURN_WANDER = 0.7;
const TURN_FEED = 0.95;
const TURN_EDGE = 1.15;
const YAW_GAIN = 1.85;
const YAW_ACCEL = 0.72;
const YAW_BRAKE = 1.45;

function clamp(v, lim) {
  return Math.max(-lim, Math.min(lim, v));
}

function expAlpha(dt, tau) {
  return 1 - Math.exp(-dt / Math.max(tau, 1e-4));
}

function releaseSeek(fish, id) {
  for (let i = 0; i < fish.length; i++) {
    const f = fish[i];
    if (f.seek !== id) continue;
    f.seek = null;
    f.cruiseHeading = f.heading;
  }
}

// Angular velocity eases toward a stop-limited target, so a turn starts and ends on a curve.
// Near a half-turn the shortest-path sign flips from one ulp of noise; keep the current direction.
function stepYaw(f, desired, maxRate, dt) {
  let err = angWrap(desired - f.heading);
  if (Math.PI - Math.abs(err) < 0.22) {
    const sign = Math.abs(f.yawRate) > 0.02 ? Math.sign(f.yawRate) : (f.turnSign || 1);
    err = sign * Math.abs(err);
  }
  if (Math.abs(err) > 0.25) f.turnSign = Math.sign(err) || f.turnSign || 1;
  const prop = clamp(err * YAW_GAIN, maxRate);
  const stop = Math.sqrt(2 * YAW_BRAKE * Math.abs(err));
  const want = Math.abs(stop) < Math.abs(prop) ? Math.sign(err || prop) * Math.min(maxRate, stop) : prop;
  const gap = want - f.yawRate;
  const braking = want * f.yawRate < 0 || Math.abs(want) < Math.abs(f.yawRate) - 1e-6;
  const maxDy = (braking ? YAW_BRAKE : YAW_ACCEL) * dt;
  f.yawRate += clamp(gap, maxDy);
  f.heading = angWrap(f.heading + f.yawRate * dt);
}

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
      aim: heading,
      yawRate: 0,
      turnSign: 0,
      cruiseHeading: heading,
      sep: 0,
      speed: 0.45 + rng() * 0.25,
      cruise: 0.52 + rng() * 0.38,
      len,
      phase: rng() * Math.PI * 2,
      hz: 4.2 + rng() * 2.4,
      pattern,
      seed: rng() * 20 + 0.2,
      school,
      orbit: 0.35 + rng() * 0.95,
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
      releaseSeek(fish, old.id);
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
    const food = f.seek != null ? foodById(f.seek) : null;
    if (f.seek != null && !food) {
      f.seek = null;
      f.cruiseHeading = f.heading;
    }

    let raw = f.cruiseHeading;
    if (food) {
      f.seekDist = Math.hypot(food.x - f.x, food.y - f.y);
      if (f.seekDist < 0.28) raw = f.aim;
      else raw = Math.atan2(food.y - f.y, food.x - f.x);
    } else if (f.school) {
      const wob = time * 0.08 + f.phase;
      const tx = anchor.x + Math.cos(wob) * f.orbit;
      const ty = anchor.y + Math.sin(wob * 0.9) * f.orbit * 0.7;
      const dist = Math.hypot(tx - f.x, ty - f.y);
      f.seekDist = 99;
      raw = dist < 0.35 ? f.aim : Math.atan2(ty - f.y, tx - f.x);
    } else {
      f.seekDist = 99;
      const cruiseRate = Math.sin(time * 0.085 + f.phase * 1.7) * 0.1
        + Math.sin(time * 0.037 + f.seed) * 0.04;
      f.cruiseHeading = angWrap(f.cruiseHeading + cruiseRate * dt);
      raw = f.cruiseHeading;
    }

    const nx = (f.x - bounds.cx) / (bounds.halfW * 0.8);
    const ny = (f.y - bounds.cy) / (bounds.halfH * 0.76);
    const er = nx * nx + ny * ny;
    let edge = false;
    if (er > 0.62) {
      const inward = Math.atan2(bounds.cy - f.y, bounds.cx - f.x);
      const t = Math.min(0.9, (er - 0.62) * 1.15);
      raw = angLerp(raw, inward, t);
      edge = er > 1;
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
    let sepTarget = 0;
    if (sepX !== 0 || sepY !== 0) {
      let off = angWrap(Math.atan2(sepY, sepX) - raw);
      off = Math.max(-0.5, Math.min(0.5, off));
      const eating = food && f.seekDist < reach * 2.2;
      sepTarget = off * (eating ? 0.16 : 0.32);
    }
    f.sep += (sepTarget - f.sep) * expAlpha(dt, 0.55);
    raw = angWrap(raw + f.sep);

    const hold = food && f.seekDist < 0.28 && er <= 0.62;
    if (!hold) {
      let tau = food ? 0.34 : f.school ? 0.4 : 0.82;
      if (er > 0.62) tau = Math.min(tau, 0.36);
      f.aim = angLerp(f.aim, raw, expAlpha(dt, tau));
    }
    const turnRate = edge ? TURN_EDGE : food ? TURN_FEED : TURN_WANDER;
    stepYaw(f, f.aim, turnRate, dt);

    let targetSpeed = f.cruise * (0.92 + 0.08 * Math.sin(time * 0.22 + f.phase));
    if (food) {
      const arrive = f.seekDist < 0.7 ? Math.max(0.22, f.seekDist / 0.7) : 1;
      targetSpeed = f.cruise * 1.75 * arrive;
    }
    const accel = 1.1 * dt;
    f.speed += Math.max(-accel, Math.min(accel, targetSpeed - f.speed));

    f.x += Math.cos(f.heading) * f.speed * dt;
    f.y += Math.sin(f.heading) * f.speed * dt;

    const maxX = bounds.halfW * 0.86;
    const maxY = bounds.halfH * 0.82;
    if (f.x > bounds.cx + maxX || f.x < bounds.cx - maxX || f.y > bounds.cy + maxY || f.y < bounds.cy - maxY) {
      f.x = Math.min(bounds.cx + maxX, Math.max(bounds.cx - maxX, f.x));
      f.y = Math.min(bounds.cy + maxY, Math.max(bounds.cy - maxY, f.y));
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
      if (ripples[i].age > 8) ripples.splice(i, 1);
    }

    for (let i = foods.length - 1; i >= 0; i--) {
      const food = foods[i];
      food.life -= h * 0.28;
      if (food.life <= 0) {
        eaten++;
        ripple(food.x, food.y, 0.35);
        foods.splice(i, 1);
        releaseSeek(fish, food.id);
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
