# WebGPU 锦鲤池演示

用 Tidewater 的水面和鱼，画一张接近俯视的锦鲤池。对照物是仓库根目录那张 WebGL2 池塘。不改 Lively 入口，也不合并进 `main`。

## 从 Tidewater 借来的

上游提交 `4811ba48d795197de5621985f404e765c0b7c0ef`，文件原样放在 `vendor/tidewater/`，清单见 `VENDORED.md`。

- 水面：两级 `OceanFFT`（瓦片 14 m 和 3.6 m，风大约 2.8 m/s）、`CDLOD` 一块水面网格、`WaterSurface`、`WaterMaterial` 的折射和反射、`createFoamTexture`、`Caustics` 光子焦散、`installUnderwaterLighting`。
- 鱼：`FishGeometry` / `FishMaterial` 的游泳姿势，用 `ReefBatch` 一次画出五种体型。Tidewater 没有锦鲤，这里用红鲷、石鲈、石斑、大海鲢、鹦嘴鱼当红、金、花、银和宽体的替身。摆尾、转向弯和图案种子都走它的实例记录。
- 引擎：场景、网格着色器、帧统一变量、阴影槽（级联不渲染）。

水面着色器在没有地形时会把折射终点放到大约 80 m 外，鱼会被撕成色块。池底是一块平面，所以另外给了一小段 `terrainHeightAt`，高度固定在 −1.12 m，让折射落在池底附近。鲸鱼水迹模块跟着水面着色器进来，标记强度是 0，画面上没有鲸鱼。

## 这条演示自己写的

- 平面上的游动、聚群和趋食（`sim.js`），再映射到 Tidewater 的 Y 轴向上、水面在 XZ。
- 点击涟漪：一个 wake 模块，写出高度和坡度，水面网格会把它加进 FFT 位移。不是亮环。
- 荷叶、荷花、鱼食圆片、池底颜色、一小段天空函数、最后的调色。
- 相机在池上方大约 30°，能同时看见鱼背和水面高光。

没有钓鱼 HUD、村子、船、战斗、岸浪或体积云。

## 和上一版平面演示比

上一版是手写焦散、扁条鱼和几圈亮环。鱼的网格朝向和波高都不对，看起来是碎色块。这一版鱼是实心身体，水面有 FFT 波纹和折射，池底能看到焦散网，边上有荷叶和粉荷。

## 性能

默认 30 FPS，绘制缓冲长边 1440（`?res=`）。标签隐藏或 Lively 暂停时停帧，失焦降到 8 FPS。「减少动态效果」时模拟时间缩到四分之一。

主要开销是每帧的 FFT、两层焦散光栅和水下光照烘焙，不是那几十条鱼。鱼走间接绘制，冒烟测试里的三角形数不含它们。`GPU.init` 仍请求高性能适配器。

`npm run webgpu:smoke` 在无头 Dawn 里画一帧 960×540。这一版大约 9 次绘制（池底、五种鱼、鱼食、水面、植物），池底和植物大约 1.2 万三角形。画面是青绿的，能分出暖色的鱼。lavapipe 上整次进程大约几秒，含着色器编译，不能当成稳态帧时间。

同一台机器上用 Chrome 打开 `npm run webgpu`（`--enable-unsafe-webgpu`，软件 Vulkan）时，页面能起来：标题是「锦鲤池 · WebGPU」，角上的说明还在。`?perf=1` 大约 15–22 fps、1253×699，平时 8 次绘制。在画面里点一下，绘制变成 9 次，三角形多 14 个，对得上那颗鱼食圆。窗口合成器在这台机器上仍可能是白的（SkSurface 起不来），像素以无头读回为准。

## 公开地址

<https://raw.githack.com/cnwinds/koi-pond-wallpaper/cursor/webgpu-pages-42d9/index.html>

分支 `cursor/webgpu-pages-42d9` 上的静态快照，由 [raw.githack.com](https://raw.githack.com/) 转发。第一次打开会先停在 “Open the page”，点一下进入池塘。需要 Chrome、Edge 或 Safari，不是 Lively 壁纸。

仓库还没有 GitHub Pages，所以没有 `https://cnwinds.github.io/koi-pond-wallpaper/`。`POST /repos/cnwinds/koi-pond-wallpaper/pages` 返回 403。工作流 [Deploy WebGPU demo](https://github.com/cnwinds/koi-pond-wallpaper/actions/runs/36566086428) 在 `deploy-pages` 上 404。管理员打开 [Settings → Pages](https://github.com/cnwinds/koi-pond-wallpaper/settings/pages)，Source 选 **GitHub Actions**，再重跑该工作流。工作流只上传这条演示，不在 `main` 上触发。

重新发布静态分支（不推 `main`）：

```bash
npm run webgpu:publish
```

## 已知限制

- 没有 WebGPU 的浏览器，以及多数 Lively / WebView2，打不开。失败时页面会指回根目录的 WebGL `index.html`。
- 第一帧要编译水面和鱼的管线，会卡一下。
- 鱼是海鱼体型，不是红白锦鲤的花纹。图案种子只在 Tidewater 已有的皮肤里变化。
- 荷叶是浮在水面上的圆片，没有厚度。
- 没有音频、天气、日夜，也不读 `LivelyProperties.json`。
