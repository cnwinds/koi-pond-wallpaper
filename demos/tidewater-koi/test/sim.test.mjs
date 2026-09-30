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
loner.targetHeading = Math.PI;
loner.school = false;
loner.seek = null;
loner.retarget = 100;
let prev = loner.heading;
let maxStep = 0;
for (let i = 0; i < 60; i++) {
  turn.step(1 / 30);
  maxStep = Math.max(maxStep, Math.abs(angWrap(loner.heading - prev)));
  prev = loner.heading;
}
assert.ok(maxStep < 1.25 / 30 + 1e-6, `heading snapped, step=${maxStep}`);
assert.ok(Math.abs(angWrap(loner.heading)) > 0.4, 'fish should start the turn');
assert.ok(Math.abs(angWrap(loner.heading)) < 1.3, `turn too fast, heading=${loner.heading}`);

loner.x = 6 * 0.9;
loner.y = 0;
loner.heading = 0;
loner.targetHeading = 0;
prev = loner.heading;
turn.step(1 / 30);
const edgeStep = Math.abs(angWrap(loner.heading - prev));
assert.ok(edgeStep < 1.25 / 30 + 1e-6, `edge heading snapped, step=${edgeStep}`);

console.log('sim ok', { eaten: sim.eaten, school: school.length, spread: spread.toFixed(2), maxStep: maxStep.toFixed(4) });
