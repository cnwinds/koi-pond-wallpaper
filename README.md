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
7. 在图库中右键本壁纸 → **Customise / 自定义**，可调鱼数量、画质、帧率、是否显示齿轮，以及天气用的纬度和经度。这些控件来自 `LivelyProperties.json`。

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
| 查询参数 | `index.html?fish=8&quality=low&fps=24&lat=31.23&lon=121.47&ui=0` |
| Lively 自定义 | 同上，且按显示器分别记住；可填纬度和经度 |
| `?demo=1` | 每隔几秒自动投喂，方便录预览 |

画质大致对应：

- **low**：更低涟漪分辨率、无焦散、像素密度 1x；雨天几乎不画雨丝
- **mid**：默认；软焦散、中等涟漪；稀疏雨丝
- **high**：更密涟漪、更高 DPR，4K 上更清晰也更耗电；雨丝稍多

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
js/world.js         闲游 / 趋食 / IK 脊柱（koi.rest 类运动模型，重实现）
js/climate.js       真实日夜、Open-Meteo 天气、缓存与覆盖层
js/app.js           输入、HUD、帧循环、省电
LivelyInfo.json     Lively 元数据
LivelyProperties.json
```

以后若做 macOS 菜单栏 / 桌面壳，用 WKWebView 加载同一目录即可，不必重写池塘本身。

## 游动模型

游动按同一类运动模型**重新实现**，灵感来自 [koi.rest](https://koi.rest/) 公开客户端里的锦鲤更新循环和 IK 脊柱思路，并加上常见的 wander、转向叠加和 IK follow-chain。没有逐字复制第三方源码。

- **swim / idle**：巡游时偶尔歇几秒；吃食后也会短暂停一下。
- **targetHeading**：大约每隔 1–2.5 秒才改一次目标航向，并加随机角偏移，而不是每帧随机拧头。
- **转向叠加**：靠近池边时轻轻往里推，鱼与鱼之间软分离，再和 wander 目标航向混合。
- **转弯半径**：角速度按速度 / 体长封顶，巡游时转弯半径大约不小于 0.85 倍体长，避免原地打转或月牙形卷曲。鱼是游过弯，不是绕着头做皮鲁埃特。
- **速度**：巡航速度有缓慢噪声调制，加减速有上限，没有瞬间跳速。
- **推进摆动**：前进方向加很小的正弦摆；尾拍频率随速度 / 体长变化。
- **身体**：每帧从头部解一条 IK 关节链，单关节角和整条脊柱累计弯曲都有上限；体波来自身体落后于头的轨迹，不再往关节上叠额外正弦（否则尾巴会原地扇）。

趋食仍是点击投喂：最多 3 条鱼去吃，靠近时 arrive 减速，并略微放松转弯半径，以免鱼食落在不可达的转弯圆里。画质档只改脊柱切片数（6 / 8 / 10），不改这套力学。

生物学背景仍参考鲤科 **Carangiform / 亚 Carangiform** 推进（Sfakiotakis, Lane & Davies, 1999；Videler, *Fish Swimming*, 1993）以及锦鲤日常转弯的 C-bend（Wu, Yang & Zeng, 2007）。Reynolds（1999）的 wander / seek / separation 用来理解转向叠加，而不是再做一套每帧随机力。

## 昼夜与天气

水面颜色、曝光、焦散和一层薄雾由**真实时钟**和天气一起驱动，不是按开页时间循环的假白天。

- **默认地点**：上海（`31.2304, 121.4737`），时区默认 `Asia/Shanghai`。日照按该经纬度算太阳高度角，日出日落附近大约 ±7° 平滑过渡，没有硬切。
- **白天**：更亮的水色和焦散（晴天最清楚；阴天会压焦散、略灰）。
- **夜晚**：更深的青绿 / 月色，曝光降低，焦散几乎关掉。
- **天气**：在线时向 [Open-Meteo](https://open-meteo.com/) 拉当前天气（不用 API key），映射为晴 / 阴 / 雨 / 雾。雨天有稀疏雨丝和偶尔的水面点滴；雾天对比更软。风力会轻轻推涟漪和环境流。
- **刷新**：大约每 20 分钟拉一次，结果写入 `localStorage`。不会每帧请求。
- **离线**：鱼、水、投喂、日夜都照常工作。天气请求失败时用上次缓存；没有缓存就按晴天处理，界面提示「离线」。
- **地点优先级**（不挡启动：先用上海或上次坐标出画面，解析成功后再升级）：
  1. 浏览器定位，且仅在**已经授权**时自动用；第一次要精确位置请点齿轮里的「定位 / locate」，可拒绝。
  2. 否则用 IP 粗定位：[geojs.io](https://www.geojs.io/)（`https://get.geojs.io/v1/ip/geo.json`），失败再试 [ipwho.is](https://ipwho.is/)。都不用 API key，失败就当没这步。
  3. 再否则默认上海（`31.2304, 121.4737`，`Asia/Shanghai`）。
- **手动钉住**：齿轮里改纬度 / 经度；地址栏 `?lat=35.68&lon=139.69`；Lively 自定义填了非默认的 lat / lon。点「自动 / auto」或 `?place=auto` 可回到上面的自动顺序。Lively 若保持默认上海坐标，仍会走自动解析。
- 可选 `?weather=rain`（或 `clear` / `cloudy` / `fog`）只预览天气，不写进缓存。

没有网络时池塘仍然是完整壁纸，只是不会更新实时云雨。

## 已知限制

- 最好有 WebGL2。没有时会退回较简单的 Canvas 2D 水面，鱼和投喂仍可用。
- 本机离线即可看鱼。天气需要网络；失败不影响游动。没有「在线人数 = 鱼数」。
- 这一版没有 macOS 原生外壳。
- Lively 里若不能点击，先检查壁纸交互是否打开，以及是否被全屏窗口盖住。
- 4K + 高画质 + 60 FPS 会明显更耗电，壁纸建议维持 24–30 FPS。
- 部分浏览器会自行节流后台标签，这是预期行为。
- 右键菜单在页面内被关掉，以免破坏壁纸感。

## 许可

[MIT](LICENSE)
