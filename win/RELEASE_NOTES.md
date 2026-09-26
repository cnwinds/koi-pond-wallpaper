# 锦鲤池 v0.3.1

解压后双击 `koi-pond-wallpaper.exe`，把池塘设为**桌面动态壁纸**（贴在图标后面）。**不是**普通全屏窗口。

## 下载后如何变成桌面背景

1. 下载 `koi-pond-wallpaper-windows-x64.zip`，解压到固定目录（exe 必须和 `index.html`、`js`、`css` 在一起）。
2. 双击 `koi-pond-wallpaper.exe`，或双击「设为桌面壁纸.bat」。
3. 锦鲤会出现在桌面图标后面。右下角托盘可投喂、预览天色/天气、重新贴上、退出。
4. 若没贴上：按提示再试，或安装 [Lively Wallpaper](https://github.com/rocksdanister/lively/releases) 后重试（程序会写入图库并尝试设壁纸）。**不会**自动变成全屏应用窗口。

## 系统要求（prerequisites）

- Windows 10 1809+ / Windows 11，64 位
- [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)（Win11 通常已有；白屏时请安装 / 修复）
- 不必另装 .NET
- **不必**安装 Lively。Lively 只是贴桌面失败时的备选；手动导入源码文件夹也可以

## 这一版相对 v0.3.0

- **涟漪**：鱼身上的折射减弱、加了上限，点水面仍会轻轻照到鱼，但不再把身子拧变形
- **预览**：右下角齿轮可当场切昼 / 黄昏 / 夜和晴 / 阴 / 雨 / 雾；「恢复自动」跟真实时钟和地点
- **宿主**：壁纸模式不再用 `?ui=0` 藏掉齿轮；托盘也可选天色 / 天气预览

源码里的 `index.html` 仍可当网页，或按 README 手动导入 Lively。
