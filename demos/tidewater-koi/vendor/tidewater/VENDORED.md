# Vendored Tidewater engine

This folder is a subset of [Tidewater](https://github.com/dgreenheck/tidewater) by DRG Software Solutions LLC.

| | |
| --- | --- |
| Upstream | https://github.com/dgreenheck/tidewater |
| Commit | `4811ba48d795197de5621985f404e765c0b7c0ef` (2026-09-24, "Backwash: no ruled line at the draining sheet's edge") |
| Path copied | `src/engine/` → `engine/` |
| License | MIT. The full text is [LICENSE](LICENSE). Copyright (c) 2026 DRG Software Solutions LLC. |

The files under `engine/` are unmodified from that commit.

Only the rendering engine is included: math, scene graph, geometry, WebGPU resources, mesh materials, and the small fullscreen-pass helper. The fishing game, FFT ocean, volumetric clouds, sky, audio, and the heavy post stack are not part of this demo.

The koi pond scene, fish steering, caustic shader, and plants are original to this repository. They call the engine; they are not Tidewater gameplay code.
