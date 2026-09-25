# 锦鲤池 / Koi Pond Wallpaper

安静的庭院锦鲤池，做成可离线打开的本地网页，适合整天挂在桌面上。气质接近 [koi.rest](https://koi.rest/)：平静的水面、慢慢游的锦鲤，**不是**小游戏 HUD。

Windows 上可用 [Lively Wallpaper](https://github.com/rocksdanister/lively) 设为动态壁纸；也可以用浏览器全屏。核心是纯 Web，以后若要做 macOS 外壳，可以再包一层，这一版不做原生壳。

点击或点按水面会投下鱼食，附近的鱼游过去吃，并带起涟漪。

## 快速开始

不需要构建、不需要安装 Node、不需要网络。入口是仓库根目录的 `index.html`。

1. 克隆或下载本仓库，解压到固定目录（不要留在「下载」里以免被清掉）。
2. 用 Edge / Chrome 打开 `index.html`（直接双击即可，本项目不用 ES Module，`file://` 能跑）。
3. 也可在该目录开一个静态服务器后访问：

```bash
python -m http.server 8765
```

浏览器打开 `http://127.0.0.1:8765/` 。

第一次打开后应能看到水面与游动的锦鲤。点一下水，会落下鱼食。

## Windows：导入 Lively Wallpaper

1. 安装 [Lively Wallpaper](https://github.com/rocksdanister/lively/releases)（Microsoft Store 或 GitHub 安装包均可）。若网页壁纸是白屏，先安装 / 修复 [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)。
2. 打开 Lively，点 **Add Wallpaper（添加壁纸）**。
3. 把整个项目文件夹拖进去，或点打开并选中根目录的 `index.html`。
4. 名称可填「锦鲤池」，保存。
5. 在图库里选中它，设为壁纸。
6. **要点水面投喂**：在 Lively 设置里打开壁纸交互（Settings → Wallpaper → Interaction，允许鼠标作用到壁纸）。否则桌面点击会被资源管理器吃掉，鱼不会吃食。
7. 在图库中右键本壁纸 → **Customise / 自定义**，可调鱼数量、画质、帧率、是否显示齿轮。这些控件来自 `LivelyProperties.json`。

仓库里已带 `LivelyInfo.json`。Lively 暂停壁纸时会走 `--pause-event`，页面会停掉动画以省电。

## 浏览器全屏

1. 打开 `index.html`（或上面的本地服务器地址）。
2. 按 `F11`，或 F12 后在控制台执行：

```js
document.documentElement.requestFullscreen();
```

3. 右下角浅色波纹按钮可开设置。`S` 开关面板，`Esc` 关闭。地址栏加 `?ui=0` 可完全隐藏界面，适合纯观赏。

## 画质、帧率、省电

默认 **中画质、30 FPS、7 条鱼**，适合当壁纸长时间开着。

| 方式 | 说明 |
| --- | --- |
| 齿轮面板 | 鱼数量 1–16，画质 low / mid / high，目标帧率 15–60 |
| 查询参数 | `index.html?fish=8&quality=low&fps=24&ui=0` |
| Lively 自定义 | 同上，且按显示器分别记住 |
| `?demo=1` | 每隔几秒自动投喂，方便录预览 |

画质大致对应：

- **low**：更低涟漪分辨率、无焦散、像素密度 1x
- **mid**：默认；软焦散、中等涟漪
- **high**：更密涟漪、更高 DPR，4K 上更清晰也更耗电

省电：

- 标签页 / 壁纸按 Visibility API 被隐藏时：**暂停**动画。
- 窗口失焦（`blur`）：目标帧率降到 **8**。
- Lively 暂停事件：同样停帧。
- WebGL 使用 `powerPreference: low-power`（高画质除外）。
- 系统「减少动态效果」开启时，会减弱涟漪与焦散。

改完齿轮设置会写入 `localStorage`，并同步到地址栏查询参数，方便收藏。

## 架构（以后可复用）

零构建静态文件，无框架：

```
index.html          入口
css/pond.css        极简设置层
js/config.js        查询参数 / 本地存储 / Lively 属性
js/water.js         WebGL2 水面与高度场涟漪（失败则 Canvas 2D）
js/sprites.js       程序化绘制锦鲤与荷叶，无大图包
js/world.js         闲游、趋食、吃食、粒子
js/app.js           输入、HUD、帧循环、省电
LivelyInfo.json     Lively 元数据
LivelyProperties.json
```

以后若做 macOS 菜单栏 / 桌面壳，用 WKWebView 加载同一目录即可，不必重写池塘本身。

## 已知限制

- 最好有 WebGL2。没有时会退回较简单的 Canvas 2D 水面，鱼和投喂仍可用。
- 本机离线即可看鱼，不联网、没有「在线人数 = 鱼数」。
- 这一版没有 macOS 原生外壳。
- Lively 里若不能点击，先检查壁纸交互是否打开，以及是否被全屏窗口盖住。
- 4K + 高画质 + 60 FPS 会明显更耗电，壁纸建议维持 24–30 FPS。
- 部分浏览器会自行节流后台标签，这是预期行为。
- 右键菜单在页面内被关掉，以免破坏壁纸感。

## 许可

[MIT](LICENSE)
