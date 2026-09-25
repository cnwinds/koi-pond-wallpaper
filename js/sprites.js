/* Procedural koi, lily pads, and pellets — painted on canvas, no image assets. */
(function (global) {
  function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6d2b79f5;
      let n = t;
      n = Math.imul(n ^ (n >>> 15), n | 1);
      n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
      return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(rng, list) {
    return list[(rng() * list.length) | 0];
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function bodyPath(ctx, w, h) {
    const cy = h * 0.5;
    const noseX = w * 0.91;
    const tailX = w * 0.12;
    const belly = h * 0.26;
    ctx.beginPath();
    ctx.moveTo(noseX, cy);
    ctx.bezierCurveTo(w * 0.84, cy - belly * 0.28, w * 0.74, cy - belly * 0.92, w * 0.62, cy - belly);
    ctx.bezierCurveTo(w * 0.46, cy - belly * 0.98, w * 0.26, cy - belly * 0.52, tailX + w * 0.04, cy - h * 0.05);
    ctx.lineTo(tailX, cy);
    ctx.lineTo(tailX + w * 0.04, cy + h * 0.05);
    ctx.bezierCurveTo(w * 0.26, cy + belly * 0.52, w * 0.46, cy + belly * 0.98, w * 0.62, cy + belly);
    ctx.bezierCurveTo(w * 0.74, cy + belly * 0.92, w * 0.84, cy + belly * 0.28, noseX, cy);
    ctx.closePath();
  }

  function paintTail(ctx, w, h, rng, base, edge) {
    const cy = h * 0.5;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = edge;
    ctx.beginPath();
    ctx.moveTo(w * 0.18, cy);
    ctx.quadraticCurveTo(w * 0.08, cy - h * 0.34, w * 0.01, cy - h * 0.22);
    ctx.quadraticCurveTo(w * 0.09, cy - h * 0.04, w * 0.16, cy);
    ctx.quadraticCurveTo(w * 0.09, cy + h * 0.04, w * 0.01, cy + h * 0.22);
    ctx.quadraticCurveTo(w * 0.08, cy + h * 0.34, w * 0.18, cy);
    ctx.fill();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = base;
    ctx.beginPath();
    ctx.moveTo(w * 0.17, cy);
    ctx.quadraticCurveTo(w * 0.09, cy - h * 0.2, w * 0.05, cy - h * 0.1);
    ctx.quadraticCurveTo(w * 0.12, cy, w * 0.05, cy + h * 0.1);
    ctx.quadraticCurveTo(w * 0.09, cy + h * 0.2, w * 0.17, cy);
    ctx.fill();
    ctx.restore();
  }

  function paintFins(ctx, w, h, color) {
    const cy = h * 0.5;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.moveTo(w * 0.62, cy - h * 0.12);
    ctx.quadraticCurveTo(w * 0.58, cy - h * 0.42, w * 0.72, cy - h * 0.38);
    ctx.quadraticCurveTo(w * 0.66, cy - h * 0.18, w * 0.7, cy - h * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w * 0.62, cy + h * 0.12);
    ctx.quadraticCurveTo(w * 0.58, cy + h * 0.42, w * 0.72, cy + h * 0.38);
    ctx.quadraticCurveTo(w * 0.66, cy + h * 0.18, w * 0.7, cy + h * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(w * 0.42, cy);
    ctx.quadraticCurveTo(w * 0.5, cy - h * 0.2, w * 0.64, cy);
    ctx.quadraticCurveTo(w * 0.5, cy + h * 0.2, w * 0.42, cy);
    ctx.fill();
    ctx.restore();
  }

  function splat(ctx, x, y, rx, ry, color, rng) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    g.addColorStop(0, color);
    g.addColorStop(0.62, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx * (0.85 + rng() * 0.3), ry * (0.75 + rng() * 0.4), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  function palette(type) {
    const sets = {
      kohaku: { base: "#f3efe4", pattern: ["#c4452f", "#a83222"], edge: "#d8d0c2", eye: "#1a1612" },
      sanke: { base: "#f2eee6", pattern: ["#c4452f", "#1c1a18", "#a83222"], edge: "#d6d0c6", eye: "#161412" },
      showa: { base: "#1b1916", pattern: ["#c4452f", "#efe8dc", "#8d2b1f"], edge: "#2a2620", eye: "#0e0d0b" },
      ogon: { base: "#e6b049", pattern: ["#f0c868", "#c4842a"], edge: "#d7a03d", eye: "#2a1c0c" },
      yamabuki: { base: "#e8c35a", pattern: ["#f3d98a", "#c9a03a"], edge: "#ddb44a", eye: "#2b1d0d" },
      platinum: { base: "#e8e7e2", pattern: ["#f6f5f1", "#cfcbc2"], edge: "#d9d6cf", eye: "#1a1816" },
      asagi: { base: "#6d7d86", pattern: ["#c45a38", "#8b9aa3", "#d8c4b0"], edge: "#5c6b73", eye: "#141312" },
      bekko: { base: "#f0ebe3", pattern: ["#1f1c18", "#2c2822"], edge: "#d8d2c8", eye: "#151310" },
    };
    return sets[type];
  }

  function paintKoi(width, height, seed) {
    const rng = mulberry32(seed);
    const type = pick(rng, ["kohaku", "sanke", "showa", "ogon", "yamabuki", "platinum", "asagi", "bekko"]);
    const pal = palette(type);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    paintTail(ctx, width, height, rng, pal.base, pal.edge);
    paintFins(ctx, width, height, pal.edge);

    ctx.save();
    bodyPath(ctx, width, height);
    ctx.clip();

    const belly = ctx.createLinearGradient(0, height * 0.18, 0, height * 0.82);
    belly.addColorStop(0, pal.edge);
    belly.addColorStop(0.5, pal.base);
    belly.addColorStop(1, pal.edge);
    ctx.fillStyle = belly;
    ctx.fillRect(0, 0, width, height);

    const sheen = ctx.createLinearGradient(width * 0.2, 0, width * 0.9, height);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.45, "rgba(255,255,255,0.16)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    const blobs = 3 + ((rng() * 3) | 0);
    for (let i = 0; i < blobs; i++) {
      const color = pick(rng, pal.pattern);
      splat(
        ctx,
        lerp(width * 0.28, width * 0.78, rng()),
        lerp(height * 0.32, height * 0.68, rng()),
        width * (0.12 + rng() * 0.18),
        height * (0.16 + rng() * 0.22),
        color,
        rng
      );
    }

    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = "rgba(20,16,12,0.45)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(width * 0.22, height * 0.5);
    ctx.bezierCurveTo(width * 0.4, height * 0.47, width * 0.62, height * 0.47, width * 0.84, height * 0.5);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(20,18,14,0.18)";
    ctx.lineWidth = 1.4;
    bodyPath(ctx, width, height);
    ctx.stroke();
    ctx.restore();

    const eyeX = width * 0.82;
    const eyeY = height * 0.46;
    ctx.fillStyle = pal.eye;
    ctx.beginPath();
    ctx.ellipse(eyeX, eyeY, 3.1, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(eyeX - 0.8, eyeY - 0.6, 0.9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(40,28,20,0.45)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(width * 0.88, height * 0.5);
    ctx.quadraticCurveTo(width * 0.94, height * 0.42, width * 0.97, height * 0.38);
    ctx.moveTo(width * 0.88, height * 0.52);
    ctx.quadraticCurveTo(width * 0.94, height * 0.6, width * 0.97, height * 0.63);
    ctx.stroke();

    return { canvas, type };
  }

  function paintPad(size, seed) {
    const rng = mulberry32(seed);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const cx = size * 0.5;
    const cy = size * 0.5;
    const r = size * 0.42;
    const notch = rng() * Math.PI * 2;
    ctx.translate(cx, cy);
    ctx.rotate(rng() * Math.PI * 2);

    ctx.beginPath();
    ctx.arc(0, 0, r, notch + 0.28, notch + Math.PI * 2 - 0.28);
    ctx.lineTo(Math.cos(notch) * r * 0.15, Math.sin(notch) * r * 0.15);
    ctx.closePath();

    const green = ctx.createRadialGradient(-r * 0.2, -r * 0.15, r * 0.1, 0, 0, r);
    green.addColorStop(0, "rgba(92, 122, 64, 0.92)");
    green.addColorStop(0.55, "rgba(58, 86, 46, 0.9)");
    green.addColorStop(1, "rgba(36, 56, 32, 0.78)");
    ctx.fillStyle = green;
    ctx.fill();

    ctx.strokeStyle = "rgba(20, 32, 16, 0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.strokeStyle = "rgba(20, 36, 18, 0.18)";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 7; i++) {
      const a = notch + 0.4 + (i / 7) * (Math.PI * 2 - 0.8);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(Math.cos(a) * r * 0.4, Math.sin(a) * r * 0.4, Math.cos(a) * r * 0.86, Math.sin(a) * r * 0.86);
      ctx.stroke();
    }

    if (rng() > 0.55) {
      ctx.fillStyle = "rgba(214, 196, 170, 0.7)";
      ctx.beginPath();
      ctx.arc(r * 0.18, -r * 0.12, r * 0.07, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  function createLibrary() {
    const koi = [];
    for (let i = 0; i < 8; i++) koi.push(paintKoi(360, 156, 1100 + i * 97));
    const pads = [];
    for (let i = 0; i < 4; i++) pads.push(paintPad(220, 4400 + i * 131));
    return { koi, pads };
  }

  global.PondSprites = { createLibrary, mulberry32 };
})(window);
