# Vendored Tidewater

This folder is a subset of [Tidewater](https://github.com/dgreenheck/tidewater) by DRG Software Solutions LLC.

| | |
| --- | --- |
| Upstream | https://github.com/dgreenheck/tidewater |
| Commit | `4811ba48d795197de5621985f404e765c0b7c0ef` (2026-09-24, "Backwash: no ruled line at the draining sheet's edge") |
| License | MIT. The full text is [LICENSE](LICENSE). Copyright (c) 2026 DRG Software Solutions LLC. |

The copied files are unmodified from that commit.

| Upstream path | Here |
| --- | --- |
| `src/engine/` | `engine/` |
| `src/core/CDLOD.js` | `core/CDLOD.js` |
| `src/ocean/` (FFT, water surface, water material, foam, caustics, underwater lighting, compute mips, the whale-mark module, and the refraction-pass file for one constant) | `ocean/` |
| `src/world/fish/FishGeometry.js`, `FishMaterial.js`, `FishSpecies.js` | `world/fish/` |
| `src/world/reef/ReefBatch.js` | `world/reef/ReefBatch.js` |
| `src/materials/LODFade.js` | `materials/LODFade.js` |

Not copied: the fishing game, boat, village, combat HUD, shoreline simulation, surf foam, sea detail, atmosphere, and volumetric clouds.

The pond scene is still original. It calls these modules; it does not include Tidewater gameplay. Tidewater has no koi species, so the demo uses five of its marine body plans as stand-ins.
