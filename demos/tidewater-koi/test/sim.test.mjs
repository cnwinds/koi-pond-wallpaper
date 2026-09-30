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
assert.equal(sim.foods.length, 1);
assert.equal(sim.fish.filter((f) => f.seek != null).length, 7);

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
