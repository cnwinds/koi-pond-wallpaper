import assert from 'node:assert/strict';
import { createSim } from '../src/sim.js';

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

console.log('sim ok', { eaten: sim.eaten, school: school.length, spread: spread.toFixed(2) });
