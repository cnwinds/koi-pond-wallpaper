/* Optional frame profiler. Off unless the page is opened with ?perf=1.
   When on, ripple / life upload / water shade each end with a 1px
   readPixels so the time includes GPU wait. Normal wallpaper playback
   does not read back. */
(function (global) {
  const q = new URLSearchParams(global.location && global.location.search ? global.location.search : "");
  const enabled = q.get("perf") === "1" || q.get("perf") === "true";
  const names = ["climate", "ripple", "fishSim", "fishDraw", "lifeUpload", "waterShade", "weather", "ui"];
  const sum = {};
  let frames = 0;
  let wallSum = 0;
  let frameT0 = 0;
  let meta = {};
  let root = null;
  let pre = null;

  function zeroSums() {
    for (let i = 0; i < names.length; i++) sum[names[i]] = 0;
  }
  zeroSums();

  function add(name, ms) {
    if (!enabled) return;
    if (sum[name] == null) sum[name] = 0;
    sum[name] += ms;
  }

  function section(name, fn) {
    if (!enabled) return fn();
    const t0 = performance.now();
    try {
      return fn();
    } finally {
      add(name, performance.now() - t0);
    }
  }

  function beginFrame() {
    if (!enabled) return;
    frameT0 = performance.now();
  }

  function snapshot() {
    const frameMs = frames ? wallSum / frames : 0;
    const sections = [];
    const seen = {};
    for (let i = 0; i < names.length; i++) seen[names[i]] = true;
    const keys = names.slice();
    for (const k in sum) if (!seen[k]) keys.push(k);
    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const ms = frames ? (sum[name] || 0) / frames : 0;
      sections.push({
        name: name,
        ms: Math.round(ms * 1000) / 1000,
        pct: frameMs > 0 ? Math.round((ms / frameMs) * 1000) / 10 : 0,
      });
    }
    sections.sort(function (a, b) {
      return b.ms - a.ms;
    });
    return {
      quality: meta.quality || "",
      fish: meta.fish,
      simFish: meta.simFish,
      css: meta.css || null,
      water: meta.water || null,
      life: meta.life || null,
      wx: meta.wx || null,
      ripple: meta.ripple,
      caustics: meta.caustics,
      rainStreaks: meta.rainStreaks,
      spineSlices: meta.spineSlices,
      frames: frames,
      frameMs: Math.round(frameMs * 1000) / 1000,
      sections: sections,
      notes:
        "Ripple, life upload, and water shade each end with a 1px readPixels so the time includes GPU wait. gl.finish() alone returned early on ANGLE. Without ?perf=1 the wallpaper does not read back. Percent is section ms / whole drawFrame.",
    };
  }

  function csvOf(report) {
    const lines = ["section,ms,pct"];
    const rows = report.sections || [];
    for (let i = 0; i < rows.length; i++) {
      lines.push(rows[i].name + "," + rows[i].ms + "," + rows[i].pct);
    }
    lines.push("frame," + report.frameMs + ",100");
    return lines.join("\n") + "\n";
  }

  function download(filename, text, type) {
    const blob = new Blob([text], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function paint(report) {
    if (!root) return;
    const lines = [];
    lines.push(
      "perf  " +
        (report.quality || "?") +
        "  fish " +
        report.simFish +
        "  " +
        (report.water ? report.water[0] + "×" + report.water[1] : "?") +
        "  " +
        report.frameMs +
        " ms"
    );
    const rows = report.sections || [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      lines.push(row.name + "  " + row.ms.toFixed(2) + " ms  " + row.pct.toFixed(1) + "%");
    }
    pre.textContent = lines.join("\n");
  }

  function ensureOverlay() {
    if (!enabled || root || !document.body) return;
    root = document.createElement("aside");
    root.id = "perfOverlay";
    pre = document.createElement("pre");
    const bar = document.createElement("div");
    const jsonBtn = document.createElement("button");
    jsonBtn.type = "button";
    jsonBtn.textContent = "JSON";
    jsonBtn.addEventListener("click", function () {
      download("koi-perf.json", JSON.stringify(snapshot(), null, 2), "application/json");
    });
    const csvBtn = document.createElement("button");
    csvBtn.type = "button";
    csvBtn.textContent = "CSV";
    csvBtn.addEventListener("click", function () {
      download("koi-perf.csv", csvOf(snapshot()), "text/csv");
    });
    bar.appendChild(jsonBtn);
    bar.appendChild(csvBtn);
    root.appendChild(pre);
    root.appendChild(bar);
    document.body.appendChild(root);
  }

  function endFrame(info) {
    if (!enabled) return;
    wallSum += Math.max(0, performance.now() - frameT0);
    frames += 1;
    if (info) meta = info;
    if (frames === 1 || frames % 20 === 0) {
      ensureOverlay();
      paint(snapshot());
    }
  }

  function reset() {
    zeroSums();
    frames = 0;
    wallSum = 0;
    meta = {};
  }

  if (enabled) {
    if (document.body) ensureOverlay();
    else global.addEventListener("DOMContentLoaded", ensureOverlay);
  }

  global.PondPerf = {
    enabled: function () {
      return enabled;
    },
    syncing: function () {
      return enabled;
    },
    section: section,
    add: add,
    beginFrame: beginFrame,
    endFrame: endFrame,
    snapshot: snapshot,
    reset: reset,
  };
})(window);
