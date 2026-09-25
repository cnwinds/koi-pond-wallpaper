# 锦鲤池 v0.2.0

安静的庭院锦鲤池，第一次提供 **Windows 可下载运行包**：解压后双击 `koi-pond-wallpaper.exe`，把池塘设为**桌面动态壁纸**（贴在图标后面），不是普通全屏窗口。

## 下载后如何变成桌面背景

1. 下载 `koi-pond-wallpaper-windows-x64.zip` 并解压到固定目录。
2. 双击 `koi-pond-wallpaper.exe`。
3. 锦鲤会游在桌面图标后面。右下角托盘可投喂、重新贴上、退出。
4. 若没贴到图标后：托盘选「重新贴到桌面」；或先安装 [Lively Wallpaper](https://github.com/rocksdanister/lively/releases) 再运行（也可 `--lively`）。只要看效果可用 `window-preview.bat`。

## 系统要求

- Windows 10 1809+ / Windows 11，64 位
- [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)（Win11 通常已有）
- 不必另装 .NET；不必安装 Lively（有则作为备选）

## 这一版网页核心

- 游动：swim/idle、低频改航向、转弯半径、IK 脊柱（koi.rest 类模型，重实现）
- 真实日夜 + Open-Meteo 天气；地点：已授权 GPS → IP（geojs.io / ipwho.is）→ 上海
- 点击投喂、画质设置、Lively 手动导入、省电都还在

源码文件夹里的 `index.html` 仍可当普通网页或手动导入 Lively。
