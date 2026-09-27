# 锦鲤池 v0.3.13

解压后双击 `koi-pond-wallpaper.exe`，把池塘设为**桌面动态壁纸**（贴在图标后面）。**不是**普通全屏窗口。

## 下载后如何变成桌面背景

1. 下载 `koi-pond-wallpaper-windows-x64.zip`，解压到固定目录（exe 必须和 `index.html`、`js`、`css` 在一起）。
2. 双击 `koi-pond-wallpaper.exe`，或双击「设为桌面壁纸.bat」。
3. 锦鲤会出现在桌面图标后面。右下角托盘可投喂、打开设置、预览天色/天气、重新贴上、退出。
4. 若没贴上：按提示再试，或安装 [Lively Wallpaper](https://github.com/rocksdanister/lively/releases) 后重试（程序会写入图库并尝试设壁纸）。**不会**自动变成全屏应用窗口。

## 系统要求（prerequisites）

- Windows 10 1809+ / Windows 11，64 位
- [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)（Win11 通常已有；白屏时请安装 / 修复）
- 不必另装 .NET
- **不必**安装 Lively。Lively 只是贴桌面失败时的备选；手动导入源码文件夹也可以

## 这一版相对 v0.3.12

- **投喂不再把阳光影线打成马赛克**：白昼晴天的焦散仍走平滑的光路。点击投喂激起的涟漪留在水面高光上，不再用低分辨率水波格子去扭焦散。
- 磨砂玻璃雨线、更亮的雨天水面、以及没有大白雨点，都保持。
- 陡角、比 v0.3.8 更快的下落、晴天光影渐变、着色器罩层（`#wx` 只画雨）保持。没有恢复 v0.3.3 的同心圈叠层或按游速改摆尾。

源码里的 `index.html` 仍可当网页，或按 README 手动导入 Lively。
