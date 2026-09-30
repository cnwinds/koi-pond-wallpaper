import assert from 'node:assert/strict';
import { angWrap, createSim } from '../src/sim.js';

const sim = createSim({ fish: 24, halfW: 8, halfH: 4.5, seed: 3 });
assert.equal(sim.fish.length, 24);
for (const f of sim.fish) {
  assert.ok(Number.isFinite(f.x) && Number.isFinite(f.y), 'spawn');
  assert.ok(Math.abs(f.x) < 8 && Math.abs(f.y) < 4.5, 'inside pond');
}

assert.equal(sim.feed(100, 100), false);
assert.equal(sim.feed(0.3, -0.2), true);
assert.ok(sim.foods.length >= 2 && sim.foods.length <= 3, `click should scatter crumbs, n=${sim.foods.length}`);
assert.ok(sim.ripples.some((r) => r.amp >= 0.9), 'click should splash');
sim.step(1 / 30);
assert.ok(sim.eaten >= 1, 'a fish already on the crumbs should bite');
assert.ok(sim.fish.filter((f) => f.seek != null).length <= 3, 'at most three fish chase');

const notice = createSim({ fish: 8, halfW: 8, halfH: 4.5, seed: 5 });
for (const f of notice.fish) {
  f.x = 1.3;
  f.y = 0.1;
  f.heading = Math.PI;
  f.aim = Math.PI;
  f.cruiseHeading = Math.PI;
  f.school = false;
}
assert.equal(notice.feed(0, 0), true);
notice.step(1 / 30);
const chasing = notice.fish.filter((f) => f.seek != null).length;
assert.ok(chasing >= 1 && chasing <= 3, `a few fish should approach, chasing=${chasing}`);
assert.equal(notice.eaten, 0, 'they should not teleport onto the food');

for (let i = 0; i < 30 * 18; i++) sim.step(1 / 30);

assert.ok(sim.eaten >= 1, `fish should eat the pellet, eaten=${sim.eaten}`);
for (const f of sim.fish) {
  assert.ok(Number.isFinite(f.x) && Number.isFinite(f.y), 'finite after sim');
  assert.ok(Math.abs(f.x) <= 8 * 0.87 && Math.abs(f.y) <= 4.5 * 0.83, `escaped ${f.x},${f.y}`);
}

const school = sim.fish.filter((f) => f.school);
let spread = 0;
for (const f of school) spread += Math.hypot(f.x - sim.bounds.cx, f.y - sim.bounds.cy);
spread /= school.length;
assert.ok(spread < 3.2, `school should stay loosely together, spread=${spread}`);

const fade = createSim({ fish: 2, halfW: 6, halfH: 4, seed: 9 });
assert.equal(fade.feed(0, 0), true);
for (const f of fade.fish) {
  f.vision = 0;
  f.x = 4;
  f.y = 0;
}
for (let i = 0; i < 30 * 30; i++) fade.step(1 / 30);
assert.equal(fade.eaten, 0, 'uneaten crumbs should disappear without counting as a bite');
assert.equal(fade.foods.length, 0);

const bite = createSim({ fish: 1, halfW: 6, halfH: 4, seed: 4 });
const eater = bite.fish[0];
eater.x = 0;
eater.y = 0;
eater.heading = 0;
eater.aim = 0;
eater.cruiseHeading = 0;
eater.yawRate = 0;
eater.school = false;
eater.vision = 6;
eater.greed = 1;
assert.equal(bite.feed(0.2, 0), true);
const crumb = bite.foods[0];
bite.foods.splice(1);
crumb.x = 0.2;
crumb.y = 0;
crumb.vx = 0;
crumb.vy = 0;
for (let i = 0; i < 90 && bite.foods.some((p) => p.id === crumb.id); i++) bite.step(1 / 30);
assert.ok(bite.eaten >= 1, 'mouth should take the crumb');
assert.ok(bite.foods.every((p) => p.id !== crumb.id), 'bitten crumb is gone');
assert.ok(eater.eatT > 0 || eater.idleT > 0, 'fish should pause after a bite');
assert.ok(bite.ripples.some((r) => r.amp > 0.2 && r.amp < 0.6), 'eat should leave a smaller ring');

const turn = createSim({ fish: 1, halfW: 6, halfH: 4, seed: 1 });
const loner = turn.fish[0];
loner.x = 0;
loner.y = 0;
loner.heading = 0;
loner.aim = Math.PI;
loner.cruiseHeading = Math.PI;
loner.yawRate = 0;
loner.sep = 0;
loner.school = false;
loner.seek = null;
let prev = loner.heading;
let prevRate = 0;
let firstStep = 0;
let maxRateStep = 0;
const rates = [];
for (let i = 0; i < 60; i++) {
  turn.step(1 / 30);
  const step = Math.abs(angWrap(loner.heading - prev));
  if (i === 0) firstStep = step;
  maxRateStep = Math.max(maxRateStep, Math.abs(loner.yawRate - prevRate));
  rates.push(loner.yawRate);
  prev = loner.heading;
  prevRate = loner.yawRate;
}
assert.ok(firstStep < 0.004, `first heading step should ease in, step=${firstStep}`);
assert.ok(Math.abs(rates[0]) < 0.04, `yaw rate jumped on frame 1, rate=${rates[0]}`);
assert.ok(Math.abs(rates[0]) < Math.abs(rates[8]) && Math.abs(rates[8]) < Math.abs(rates[14]), 'yaw rate should ramp');
assert.ok(rates.every((r) => r > 0), 'half-turn should not flip direction');
assert.ok(maxRateStep < 1.5 / 30 + 1e-4, `yaw accel stepped, dRate=${maxRateStep}`);
const turned = Math.abs(angWrap(loner.heading));
assert.ok(turned > 0.35, `fish should start the turn, heading=${loner.heading}`);
assert.ok(turned < 1.6, `turn too fast, heading=${loner.heading}`);

const before = loner.heading;
loner.yawRate = 0;
loner.cruiseHeading = angWrap(loner.heading + Math.PI);
loner.aim = loner.heading;
prev = loner.heading;
turn.step(1 / 30);
const retarget = Math.abs(angWrap(loner.heading - prev));
assert.ok(retarget < 0.01, `retarget snapped heading, step=${retarget}`);
assert.ok(Math.abs(angWrap(loner.aim - before)) < 0.2, `aim jumped to the new target, aim=${loner.aim}`);

loner.x = 6 * 0.9;
loner.y = 0;
loner.heading = 0;
loner.aim = 0;
loner.cruiseHeading = 0;
loner.yawRate = 0;
loner.sep = 0;
prev = loner.heading;
turn.step(1 / 30);
const edgeStep = Math.abs(angWrap(loner.heading - prev));
assert.ok(edgeStep < 0.01, `edge heading snapped, step=${edgeStep}`);

console.log('sim ok', {
  eaten: sim.eaten,
  school: school.length,
  spread: spread.toFixed(2),
  firstStep: firstStep.toFixed(5),
  yaw0: rates[0].toFixed(4),
  heading: turned.toFixed(3),
});
