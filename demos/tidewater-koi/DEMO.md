# WebGPU 锦鲤池演示

用 Tidewater 的渲染引擎画一张俯视锦鲤池，看它适不适合当桌面壁纸。对照物是仓库根目录那张 WebGL2 池塘，参考画面是一张俯视、雾青、焦散很亮、岸边有荷叶的池塘。

## 和 WebGL 壁纸比

WebGL 那张更像已经打磨过的壁纸：鱼少而清楚，身体是 IK 丝带，水面有高度场涟漪，中高画质才叠一层软焦散，还有日夜和天气。它能在 WebView2 / Lively 里当默认页，并且按低功耗来要 GPU。

这条 WebGPU 演示更接近那张参考图的「一眼很多鱼、池底焦散很亮、边上荷叶和荷花」：大约 46 条红白、橙、黑、银的锦鲤，一部分在池心慢慢转圈，像在等食；点击会落鱼食并引来最多 7 条。荷叶、深色叶片和几朵粉荷花框在边上。没有天气，没有日夜，鱼也没有 WebGL 那套脊柱 IK，摆尾是顶点着色器里的正弦。

主观上，鱼的数量和池底光纹比 WebGL 默认中画质更接近参考图：雾青的水上有偏亮的光带，46 条鱼能分出红白、橙、黑、银，边上有荷叶和几朵粉荷。光纹比参考图更软、更匀；鱼是扁的色块，胸鳍很小；荷叶仍是带缺口的圆片，没有参考图那种水下的厚度。WebGL 的鱼更「活」（转弯和身体弯曲），水也更像一层会折射的膜。安静挂着够用来验证引擎，还不是要换掉 WebGL 壁纸的成品。

## 性能

默认把帧率卡在 30，并把绘制缓冲的长边限制在 1440（`?res=` 可改）。标签隐藏，或 Lively 的 `livelyWallpaperPlaybackChanged` 说暂停时，动画停掉。窗口失焦时目标帧率降到 8。系统开了「减少动态效果」时，模拟时间缩到四分之一，鱼和焦散都变慢。

主要开销是池底全屏焦散（两层噪声零交叉光带，和 WebGL 壁纸同一思路，不是 Voronoi 裂纹），不是那几十条鱼。鱼、影子、鱼食、植物都是实例绘制。引擎的网格着色器仍会绑一张阴影贴图，这里只建了 32² 的一层，并不每帧渲染级联阴影。`GPU.init` 沿用引擎的 `high-performance` 适配器请求，这点和 WebGL 壁纸的 `low-power` 不一样，所以才把默认分辨率和帧率压低。

`npm run webgpu:smoke` 会在无头 Dawn 里画一帧 960×540，并检查画面是青绿的、有明暗差、能看到偏暖的鱼。在这台机器的 lavapipe 上，这一帧是 5 次绘制、大约 4300 个三角形，平均大约 RGB 114/143/117，亮度大约 52 到 208。整次进程大约两秒，里面含着色器编译和 120 步模拟，不能当成稳态帧时间。`?perf=1` 可以在浏览器里看帧率、分辨率和 draw 数。演示里没有再做一套 GPU 计时。

同一台机器上用 Chrome 打开 `npm run webgpu`（加了 `--enable-unsafe-webgpu`）时，页面能起来：`?perf=1` 大约 10 fps、1253×699、平时 4 次绘制。在画面中央点一下，绘制变成 5 次，三角形多 14 个，对得上那颗鱼食圆。这是软件 Vulkan（lavapipe）上的帧率，不是桌面独显的预期。窗口本身是白的，GPU 进程报 SkSurface 初始化失败，交换链没有把画布交到屏幕上；画面内容以无头读回为准。

## 公开地址

不合并进 `main`，也不改 Lively 入口。构建用的是相对路径（`base: './'`），所以同一份 `dist` 放在子目录或 CDN 上都能加载脚本。

当前能打开的页面：

<https://raw.githack.com/cnwinds/koi-pond-wallpaper/cursor/webgpu-pages-42d9/index.html>

这是分支 `cursor/webgpu-pages-42d9` 上的静态快照，由 [raw.githack.com](https://raw.githack.com/) 按正确的 HTML / JavaScript 类型转发。浏览器第一次打开会先停在他们的 “Open the page” 确认页，点一下才进入池塘；脚本请求不会再拦。页面角上写着：需要 Chrome、Edge 或 Safari，不是 Lively 壁纸。在这台机器的 Chrome 里，点过确认之后 `?perf=1` 大约 10 fps，点水面后绘制从 4 次变成 5 次。

仓库还没有 GitHub Pages，所以没有 `https://cnwinds.github.io/koi-pond-wallpaper/`。`POST /repos/cnwinds/koi-pond-wallpaper/pages` 返回 403。工作流 [Deploy WebGPU demo](https://github.com/cnwinds/koi-pond-wallpaper/actions/runs/36566086428) 能编出 `dist`，但 `deploy-pages` 返回 404：站点还没启用。管理员打开 [Settings → Pages](https://github.com/cnwinds/koi-pond-wallpaper/settings/pages)，Build and deployment 的 Source 选 **GitHub Actions**，保存后再重跑那个工作流。`.github/workflows/webgpu-pages.yml` 只上传这条演示的 `dist`，触发分支只有 `cursor/tidewater-koi-webgpu-42d9`，不会在 `main` 上跑。在 Pages 打开之前，这个检查会是红的。

重新发布静态分支（仍然不推 `main`）：

```bash
npm run webgpu:publish
```

## 已知限制

- 没有 WebGPU 的浏览器、以及多数 Lively / WebView2 运行时，打不开。失败时页面说明要改用仓库根目录的 WebGL `index.html`，不会把这条演示当成壁纸。
- 第一帧要编译几条网格管线，会卡一下。之后才进入 30 FPS。
- 没有真正的水面折射。鱼和池底靠深度叠在一起，上面只做了调色和暗角，所以不像隔着一层晃动的水面看下去。
- 涟漪是点击和吃食时的几圈亮环，不是 WebGL 那张高度场。
- 鱼的转向是平面上的航向，尾巴不跟脊柱 IK。靠得太近时会软分离，但身体不会弯成 C 形。
- 荷叶是透明圆片，互相遮挡按实例顺序而不是逐片排序。
- 没有音频、天气、日夜，也不读 `LivelyProperties.json`。
- 引擎源码按上游提交原样放在 `vendor/tidewater/engine`，见同目录的 `VENDORED.md` 和 `LICENSE`。
