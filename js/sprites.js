/* Procedural dorsal-view koi and lily pads — painted on canvas, no image assets.
 *
 * Fish are authored from above (pond view), not as side-cut LEGO slabs.
 * The canvas is a body/marking atlas; fins and tail are drawn live in world.js
 * so they stay smooth while the IK spine bends.
 */
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

  function palette(type) {
    const sets = {
      kohaku: { base: "#f4efe6", pattern: ["#c43b28", "#a52d1c", "#d85a3c"], edge: "#cfc6b6", eye: "#1a1612" },
      sanke: { base: "#f3eee6", pattern: ["#c43b28", "#1a1816", "#a52d1c"], edge: "#d0c8bc", eye: "#161412" },
      showa: { base: "#1c1916", pattern: ["#c43b28", "#efe8dc", "#8a2a1c"], edge: "#2c2822", eye: "#0e0d0b" },
      ogon: { base: "#e4ae40", pattern: ["#f3d078", "#c48428", "#f8e6a4"], edge: "#c89630", eye: "#2a1c0c" },
      yamabuki: { base: "#e6bf52", pattern: ["#f4d98c", "#c9a038", "#f8e8b0"], edge: "#d0a844", eye: "#2b1d0d" },
      platinum: { base: "#eceae4", pattern: ["#f8f6f1", "#c8c4ba", "#ddd8ce"], edge: "#cfcbc2", eye: "#1a1816" },
      asagi: { base: "#6a7c86", pattern: ["#c45a38", "#8b9aa4", "#d8c4b0"], edge: "#55656e", eye: "#141312" },
      bekko: { base: "#f0ebe3", pattern: ["#1f1c18", "#2c2822", "#3a342c"], edge: "#d4cec4", eye: "#151310" },
    };
    return sets[type];
  }

  function bodyPath(ctx, w, h) {
    const cy = h * 0.5;
    const noseX = w * 0.93;
    const tailX = w * 0.09;
    ctx.beginPath();
    ctx.moveTo(noseX, cy);
    ctx.bezierCurveTo(w * 0.88, cy - h * 0.1, w * 0.8, cy - h * 0.3, w * 0.68, cy - h * 0.34);
    ctx.bezierCurveTo(w * 0.5, cy - h * 0.38, w * 0.3, cy - h * 0.26, w * 0.16, cy - h * 0.1);
    ctx.bezierCurveTo(w * 0.12, cy - h * 0.05, tailX, cy - h * 0.03, tailX, cy);
    ctx.bezierCurveTo(tailX, cy + h * 0.03, w * 0.12, cy + h * 0.05, w * 0.16, cy + h * 0.1);
    ctx.bezierCurveTo(w * 0.3, cy + h * 0.26, w * 0.5, cy + h * 0.38, w * 0.68, cy + h * 0.34);
    ctx.bezierCurveTo(w * 0.8, cy + h * 0.3, w * 0.88, cy + h * 0.1, noseX, cy);
    ctx.closePath();
  }

  function splat(ctx, x, y, rx, ry, color, rng, rot) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
    g.addColorStop(0, color);
    g.addColorStop(0.55, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx * (0.88 + rng() * 0.22), ry * (0.78 + rng() * 0.3), rot != null ? rot : rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  function blotch(ctx, x, y, rx, ry, color, rng) {
    const n = 3 + ((rng() * 3) | 0);
    for (let k = 0; k < n; k++) {
      splat(
        ctx,
        x + (rng() - 0.5) * rx * 0.55,
        y + (rng() - 0.5) * ry * 0.5,
        rx * (0.38 + rng() * 0.55),
        ry * (0.32 + rng() * 0.5),
        color,
        rng
      );
    }
  }

  function paintScales(ctx, w, h, rng) {
    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 0.45;
    const step = 8;
    for (let x = w * 0.14; x < w * 0.88; x += step) {
      const col = ((x / step) | 0) & 1;
      for (let y = h * 0.2; y < h * 0.8; y += step * 0.52) {
        const ox = col ? step * 0.5 : 0;
        ctx.beginPath();
        ctx.ellipse(x + ox + (rng() - 0.5) * 0.6, y + (rng() - 0.5) * 0.4, 3.4, 1.7, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function paintKoi(width, height, seed) {
    const rng = mulberry32(seed);
    const type = pick(rng, ["kohaku", "sanke", "showa", "ogon", "yamabuki", "platinum", "asagi", "bekko"]);
    const pal = palette(type);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.save();
    bodyPath(ctx, width, height);
    ctx.clip();

    const shade = ctx.createLinearGradient(0, height * 0.12, 0, height * 0.88);
    shade.addColorStop(0, pal.edge);
    shade.addColorStop(0.22, pal.base);
    shade.addColorStop(0.5, pal.base);
    shade.addColorStop(0.78, pal.base);
    shade.addColorStop(1, pal.edge);
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);

    const ridge = ctx.createLinearGradient(width * 0.1, height * 0.5, width * 0.92, height * 0.5);
    ridge.addColorStop(0, "rgba(255,255,255,0)");
    ridge.addColorStop(0.35, "rgba(255,255,255,0.1)");
    ridge.addColorStop(0.7, "rgba(255,255,255,0.2)");
    ridge.addColorStop(1, "rgba(255,255,255,0.04)");
    ctx.fillStyle = ridge;
    ctx.fillRect(0, height * 0.32, width, height * 0.36);

    const blobs = 4 + ((rng() * 4) | 0);
    for (let i = 0; i < blobs; i++) {
      const color = pick(rng, pal.pattern);
      blotch(
        ctx,
        lerp(width * 0.22, width * 0.8, rng()),
        lerp(height * 0.3, height * 0.7, rng()),
        width * (0.08 + rng() * 0.16),
        height * (0.12 + rng() * 0.2),
        color,
        rng
      );
    }

    if (type === "asagi") {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.strokeStyle = "rgba(30, 42, 48, 0.55)";
      ctx.lineWidth = 0.7;
      const step = 9;
      for (let x = width * 0.18; x < width * 0.82; x += step) {
        for (let y = height * 0.24; y < height * 0.76; y += step * 0.55) {
          ctx.strokeRect(x, y, step * 0.7, step * 0.38);
        }
      }
      ctx.restore();
    }

    paintScales(ctx, width, height, rng);

    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = "rgba(20,16,12,0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.16, height * 0.5);
    ctx.bezierCurveTo(width * 0.4, height * 0.485, width * 0.66, height * 0.485, width * 0.86, height * 0.5);
    ctx.stroke();
    ctx.globalAlpha = 1;

    const gill = ctx.createRadialGradient(width * 0.78, height * 0.5, 2, width * 0.78, height * 0.5, height * 0.22);
    gill.addColorStop(0, "rgba(0,0,0,0)");
    gill.addColorStop(0.7, "rgba(20,16,12,0.04)");
    gill.addColorStop(1, "rgba(20,16,12,0.16)");
    ctx.fillStyle = gill;
    ctx.beginPath();
    ctx.ellipse(width * 0.78, height * 0.5, width * 0.045, height * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "rgba(24,20,16,0.16)";
    ctx.lineWidth = 1.1;
    bodyPath(ctx, width, height);
    ctx.stroke();
    ctx.restore();

    return { canvas, type, pal };
  }

  function paintPad(size, seed) {
    const rng = mulberry32(seed);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const r = size * 0.42;
    const notch = rng() * Math.PI * 2;
    ctx.translate(size * 0.5, size * 0.5);
    ctx.rotate(rng() * Math.PI * 2);

    ctx.beginPath();
    ctx.arc(0, 0, r, notch + 0.28, notch + Math.PI * 2 - 0.28);
    ctx.lineTo(Math.cos(notch) * r * 0.15, Math.sin(notch) * r * 0.15);
    ctx.closePath();

    const green = ctx.createRadialGradient(-r * 0.2, -r * 0.15, r * 0.1, 0, 0, r);
    green.addColorStop(0, "rgba(102, 136, 72, 0.94)");
    green.addColorStop(0.55, "rgba(58, 88, 48, 0.9)");
    green.addColorStop(1, "rgba(32, 52, 30, 0.8)");
    ctx.fillStyle = green;
    ctx.fill();

    ctx.strokeStyle = "rgba(20, 32, 16, 0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.strokeStyle = "rgba(20, 36, 18, 0.16)";
    ctx.lineWidth = 0.75;
    for (let i = 0; i < 9; i++) {
      const a = notch + 0.4 + (i / 9) * (Math.PI * 2 - 0.8);
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
    for (let i = 0; i < 8; i++) koi.push(paintKoi(880, 300, 1100 + i * 97));
    const pads = [];
    for (let i = 0; i < 4; i++) pads.push(paintPad(256, 4400 + i * 131));
    return { koi, pads };
  }

  global.PondSprites = { createLibrary, mulberry32, palette };
})(window);
