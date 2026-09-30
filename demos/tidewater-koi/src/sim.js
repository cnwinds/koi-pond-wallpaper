// Koi steering for the WebGPU pond. Wander, a loose school, and click-to-feed.
// Feeding follows the wallpaper's feel (a handful of crumbs, a few fish, one bite)
// in pond metres. Not the wallpaper's IK spine, and not Tidewater's fish AI.

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

const SEEKERS = 3;
const MAX_FOOD = 12;
const MAX_RIPPLES = 3;
// Cruise caps, rad/s. Yaw rate eases toward them; it does not step onto them.
const TURN_WANDER = 0.7;
const TURN_EDGE = 1.15;
const YAW_GAIN = 1.85;
const YAW_BRAKE = 1.45;
const YAW_TAU = 0.58;
const YAW_BRAKE_TAU = 0.32;

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
function stepYaw(f, desired, maxRate, dt, tauScale = 1) {
  let err = angWrap(desired - f.heading);
  if (Math.PI - Math.abs(err) < 0.22) {
    const sign = Math.abs(f.yawRate) > 0.02 ? Math.sign(f.yawRate) : (f.turnSign || 1);
    err = sign * Math.abs(err);
  }
  if (Math.abs(err) > 0.25) f.turnSign = Math.sign(err) || f.turnSign || 1;
  const prop = Math.tanh((err * YAW_GAIN) / Math.max(maxRate, 1e-3)) * maxRate;
  const stop = Math.sqrt(2 * YAW_BRAKE * Math.abs(err));
  const want = stop < Math.abs(prop) ? Math.sign(err || prop) * Math.min(maxRate, stop) : prop;
  const braking = want * f.yawRate < 0 || Math.abs(want) + 1e-4 < Math.abs(f.yawRate);
  const tau = (braking ? YAW_BRAKE_TAU : YAW_TAU) * tauScale;
  const alpha = 1 - Math.exp(-dt / Math.max(tau, 1e-3));
  f.yawRate += (want - f.yawRate) * alpha;
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
  let foodEpoch = 1;
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
      greed: 0.32 + rng() * 0.68,
      vision: 2.6 + rng() * 2.4,
      eatT: 0,
      idleT: 0,
      seek: null,
      seekDist: 99,
      z: 0.08 + rng() * 0.1,
    });
  }

  function ripple(x, y, amp) {
    // A bite on top of a fresh click used to add another full-screen ring in the same frame.
    for (let i = 0; i < ripples.length; i++) {
      const ring = ripples[i];
      if (ring.age > 0.4) continue;
      if (Math.hypot(ring.x - x, ring.y - y) < 0.8) {
        ring.amp = Math.max(ring.amp, amp);
        return;
      }
    }
    ripples.push({ x, y, age: 0, amp: Math.min(amp, 0.72) });
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
    const n = 2 + ((rng() * 2) | 0);
    for (let i = 0; i < n; i++) {
      while (foods.length >= MAX_FOOD) {
        const old = foods.shift();
        releaseSeek(fish, old.id);
      }
      foods.push({
        id: nextFood++,
        x: x + (rng() - 0.5) * 0.36,
        y: y + (rng() - 0.5) * 0.28,
        vx: (rng() - 0.5) * 0.22,
        vy: (rng() - 0.5) * 0.18,
        r: 0.05 + rng() * 0.02,
        bob: rng() * Math.PI * 2,
        life: 18 + rng() * 8,
        eaten: false,
      });
    }
    ripple(x, y, 0.72);
    foodEpoch++;
    return true;
  }

  function bite(f, pellet) {
    if (!pellet || pellet.eaten) return;
    pellet.eaten = true;
    eaten++;
    f.seek = null;
    f.eatT = 0.42;
    f.idleT = 0.65 + rng() * 0.75;
    f.cruiseHeading = f.heading;
    f.seekDist = 99;
    ripple(pellet.x, pellet.y, 0.32);
  }

  function assignSeekers() {
    const ranked = [];
    for (let i = 0; i < fish.length; i++) {
      const f = fish[i];
      if (f.eatT > 0) {
        if (f.seek != null) {
          f.seek = null;
          f.cruiseHeading = f.heading;
        }
        continue;
      }
      let best = null;
      let bestD = Infinity;
      const notice = f.vision * (0.45 + f.greed * 0.7);
      for (let j = 0; j < foods.length; j++) {
        const pellet = foods[j];
        if (pellet.eaten) continue;
        const d = Math.hypot(pellet.x - f.x, pellet.y - f.y);
        if (d < bestD && d <= notice) {
          bestD = d;
          best = pellet;
        }
      }
      if (best) ranked.push({ f, dist: bestD, id: best.id });
    }
    ranked.sort((a, b) => a.dist - b.dist);
    const chosen = new Set();
    const n = Math.min(SEEKERS, ranked.length);
    for (let i = 0; i < n; i++) {
      ranked[i].f.seek = ranked[i].id;
      chosen.add(ranked[i].f);
    }
    for (let i = 0; i < fish.length; i++) {
      const f = fish[i];
      if (chosen.has(f) || f.eatT > 0) continue;
      if (f.seek != null) {
        f.seek = null;
        f.cruiseHeading = f.heading;
      }
    }
  }

  function stepFish(f, dt) {
    if (f.eatT > 0) f.eatT = Math.max(0, f.eatT - dt);
    const chewing = f.eatT > 0;
    const food = !chewing && f.seek != null ? foodById(f.seek) : null;
    if (!chewing && f.seek != null && (!food || food.eaten)) {
      f.seek = null;
      f.cruiseHeading = f.heading;
    }
    if (food) f.idleT = 0;
    else if (f.idleT > 0) f.idleT = Math.max(0, f.idleT - dt);

    let raw = f.cruiseHeading;
    let feeding = false;
    if (chewing) {
      raw = f.heading;
      f.seekDist = 99;
    } else if (food) {
      f.seekDist = Math.hypot(food.x - f.x, food.y - f.y);
      const nose = f.len * 0.58 * 0.46;
      const mx = f.x + Math.cos(f.heading) * nose;
      const my = f.y + Math.sin(f.heading) * nose;
      const mouth = Math.hypot(food.x - mx, food.y - my);
      if (mouth < 0.16 || f.seekDist < 0.14) {
        bite(f, food);
        raw = f.heading;
        f.seekDist = 99;
      } else {
        feeding = true;
        raw = Math.atan2(food.y - f.y, food.x - f.x);
      }
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
      const closeFeed = feeding && f.seekDist < 1.05;
      sepTarget = off * (closeFeed ? 0.12 : 0.32);
    }
    f.sep += (sepTarget - f.sep) * expAlpha(dt, 0.55);
    raw = angWrap(raw + f.sep);

    let tau = feeding ? 0.18 : f.school ? 0.4 : 0.82;
    if (er > 0.62) tau = Math.min(tau, 0.36);
    if (chewing) tau = 0.35;
    f.aim = angLerp(f.aim, raw, expAlpha(dt, tau));
    let turnRate = edge ? TURN_EDGE : TURN_WANDER;
    if (feeding) {
      const body = Math.max(0.45, f.len * 0.58);
      let minR = 0.8;
      if (f.seekDist < body * 2.2) {
        const t = Math.max(0, Math.min(1, f.seekDist / (body * 2.2)));
        minR = 0.42 + (0.8 - 0.42) * t;
      }
      const tight = f.speed / Math.max(0.25, minR * body);
      turnRate = Math.min(2.05, Math.max(0.45, tight));
    }
    stepYaw(f, f.aim, turnRate, dt, feeding ? 0.55 : 1);

    let targetSpeed = f.cruise * (0.92 + 0.08 * Math.sin(time * 0.22 + f.phase));
    if (chewing) targetSpeed = f.cruise * 0.18;
    else if (f.idleT > 0 && !feeding) targetSpeed = f.cruise * 0.36;
    else if (feeding) {
      const err = Math.abs(angWrap(raw - f.heading));
      const align = 1 - Math.min(1, err / 1.35);
      const arriveR = 0.9;
      const ramp = f.seekDist < arriveR ? 0.45 + 0.55 * (f.seekDist / arriveR) : 1;
      targetSpeed = Math.max(f.cruise * (0.65 + 0.85 * align) * ramp, f.cruise * 0.32);
    }
    const accel = 0.85 * dt;
    f.speed += Math.max(-accel, Math.min(accel, targetSpeed - f.speed));

    f.x += Math.cos(f.heading) * f.speed * dt;
    f.y += Math.sin(f.heading) * f.speed * dt;

    const maxX = bounds.halfW * 0.86;
    const maxY = bounds.halfH * 0.82;
    if (f.x > bounds.cx + maxX || f.x < bounds.cx - maxX || f.y > bounds.cy + maxY || f.y < bounds.cy - maxY) {
      f.x = Math.min(bounds.cx + maxX, Math.max(bounds.cx - maxX, f.x));
      f.y = Math.min(bounds.cy + maxY, Math.max(bounds.cy - maxY, f.y));
    }

  }

  function step(dt) {
    const h = Math.max(0, Math.min(dt, 0.1));
    if (h === 0) return;
    time += h;
    anchor.x = bounds.cx + Math.cos(time * 0.07) * bounds.halfW * 0.16;
    anchor.y = bounds.cy + Math.sin(time * 0.05) * bounds.halfH * 0.14;

    const damp = Math.exp(Math.log(0.94) * h * 30);
    let foodMoved = false;
    for (let i = foods.length - 1; i >= 0; i--) {
      const pellet = foods[i];
      pellet.life -= h;
      pellet.bob += h * 3;
      pellet.vx *= damp;
      pellet.vy *= damp;
      if (Math.abs(pellet.vx) > 0.004 || Math.abs(pellet.vy) > 0.004) foodMoved = true;
      pellet.x += pellet.vx * h;
      pellet.y += pellet.vy * h;
      const maxX = bounds.halfW * 0.9;
      const maxY = bounds.halfH * 0.86;
      pellet.x = Math.min(bounds.cx + maxX, Math.max(bounds.cx - maxX, pellet.x));
      pellet.y = Math.min(bounds.cy + maxY, Math.max(bounds.cy - maxY, pellet.y));
      if (pellet.life <= 0) {
        releaseSeek(fish, pellet.id);
        foods.splice(i, 1);
        foodMoved = true;
      }
    }
    if (foodMoved) foodEpoch++;

    assignSeekers();
    for (let i = 0; i < fish.length; i++) stepFish(fish[i], h);

    for (let i = foods.length - 1; i >= 0; i--) {
      if (!foods[i].eaten) continue;
      releaseSeek(fish, foods[i].id);
      foods.splice(i, 1);
      foodEpoch++;
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].age += h;
      if (ripples[i].age > 8) ripples.splice(i, 1);
    }
  }

  return {
    fish,
    foods,
    ripples,
    bounds,
    get time() { return time; },
    get eaten() { return eaten; },
    get foodEpoch() { return foodEpoch; },
    step,
    feed,
    setBounds,
  };
}
