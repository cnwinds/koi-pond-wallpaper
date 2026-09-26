# 锦鲤池 v0.3.0

解压后双击 `koi-pond-wallpaper.exe`，把池塘设为**桌面动态壁纸**（贴在图标后面）。**不是**普通全屏窗口。

## 下载后如何变成桌面背景

1. 下载 `koi-pond-wallpaper-windows-x64.zip`，解压到固定目录（exe 必须和 `index.html`、`js`、`css` 在一起）。
2. 双击 `koi-pond-wallpaper.exe`，或双击「设为桌面壁纸.bat」。
3. 锦鲤会出现在桌面图标后面。右下角托盘可投喂、重新贴上、退出。
4. 若没贴上：按提示再试，或安装 [Lively Wallpaper](https://github.com/rocksdanister/lively/releases) 后重试（程序会写入图库并尝试设壁纸）。**不会**自动变成全屏应用窗口。

## 系统要求（prerequisites）

- Windows 10 1809+ / Windows 11，64 位
- [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)（Win11 通常已有；白屏时请安装 / 修复）
- 不必另装 .NET
- **不必**安装 Lively。Lively 只是贴桌面失败时的备选；手动导入源码文件夹也可以

## 这一版相对 v0.2.1

- **锦鲤**：俯视平滑丝带，不再是侧视方块切片的积木感；花纹、鳍、尾更细
- **涟漪**：水波 / 焦散会折射、照亮鱼和鱼食，不只装饰空水面
- **昼夜与天气**：昼 / 夜 / 雨 / 雾一眼能分清（水色、曝光、焦散、雨丝、雾纱、月光）
- **预览**：齿轮里选天色 / 天气，或地址栏 `?time=night&weather=rain`（`day` / `dusk`，`clear` / `cloudy` / `fog`）；Lively 也可预览。默认仍跟真实时钟和地点

源码里的 `index.html` 仍可当网页，或按 README 手动导入 Lively。
