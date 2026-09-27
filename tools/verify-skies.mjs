#!/usr/bin/env node
/* Map Open-Meteo WMO codes onto distinct pond skies. */
import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const code = fs.readFileSync(path.join(root, "js/climate.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const { skyFromWmo, composeLook, lookCaption } = sandbox.window.PondClimate;

const expect = {
  0: "clear",
  1: "clear",
  2: "cloudy",
  3: "cloudy",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "heavy_rain",
  66: "rain",
  67: "heavy_rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rain",
  81: "rain",
  82: "heavy_rain",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

const failures = [];
for (const key of Object.keys(expect)) {
  const got = skyFromWmo(+key, 20, 20000, 0, 0);
  if (got !== expect[key]) failures.push("code " + key + " → " + got + " wanted " + expect[key]);
}
if (skyFromWmo(0, 10, 400, 0, 0) !== "fog") failures.push("low vis should be fog");
if (skyFromWmo(61, 10, 400, 1, 0) !== "rain") failures.push("rain code must not collapse to fog");
if (skyFromWmo(0, 10, 20000, 0.2, 0) !== "drizzle") failures.push("light precip");
if (skyFromWmo(1, 10, 20000, 2, 0) !== "rain") failures.push("moderate precip");
if (skyFromWmo(2, 80, 20000, 12, 0) !== "heavy_rain") failures.push("heavy precip");
if (skyFromWmo(0, 40, 20000, 0, 0.8) !== "snow") failures.push("snowfall");
if (skyFromWmo(71, 40, 20000, 4, 1) !== "snow") failures.push("snow code with precip");

function dayLook(sky, weather) {
  return composeLook(31.2, 121.5, new Date(), weather || null, sky, "day", null);
}
const rain = dayLook("rain");
const drizzle = dayLook("drizzle");
const heavy = dayLook("heavy_rain");
const storm = dayLook("storm");
const snow = dayLook("snow");
const fog = dayLook("fog");
const clear = dayLook("clear");

if (Math.abs(rain.exposure - 0.9) > 0.02) failures.push("rain exposure " + rain.exposure);
if (!(rain.rain >= 0.72 && rain.rain <= 0.73)) failures.push("rain amount " + rain.rain);
if (!(drizzle.fall < rain.fall && drizzle.rain < rain.rain)) failures.push("drizzle not lighter");
if (!(heavy.fall > rain.fall && heavy.exposure < rain.exposure)) failures.push("heavy not denser/darker");
if (!(storm.fall > heavy.fall && storm.exposure < heavy.exposure)) failures.push("storm not densest/darkest");
if (storm.windKmh < 28) failures.push("storm wind");
if (snow.kind !== "snow" || snow.rain !== 0 || snow.fall < 0.7) failures.push("snow profile");
if (snow.exposure < rain.exposure) failures.push("snow water should be brighter than rain");
if (fog.fog < 0.9) failures.push("fog");
if (clear.causticGain < 1) failures.push("clear caustics");
if (!lookCaption(snow).includes("雪")) failures.push("caption snow");
if (!lookCaption(heavy).includes("大雨")) failures.push("caption heavy");
if (!lookCaption(storm).includes("暴雨")) failures.push("caption storm");
if (!lookCaption(drizzle).includes("小雨")) failures.push("caption drizzle");
if (!lookCaption(rain).includes("中雨")) failures.push("caption rain");

const rows = ["drizzle", "rain", "heavy_rain", "storm", "snow", "fog", "cloudy", "clear"].map(function (sky) {
  const look = dayLook(sky);
  return {
    sky: sky,
    caption: lookCaption(look).split(" · ")[1],
    rain: +look.rain.toFixed(2),
    fall: +look.fall.toFixed(2),
    exposure: +look.exposure.toFixed(2),
    fog: +look.fog.toFixed(2),
    caustic: +look.causticGain.toFixed(2),
    wind: look.windKmh,
  };
});
console.log(JSON.stringify(rows, null, 2));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("verify-skies: PASS");
