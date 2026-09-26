# 锦鲤池 v0.3.10

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

## 这一版相对 v0.3.9

- **去掉大白雨点**：大雨滴不再画成发白的圆斑。雨滴大小只决定涟漪推得多用力，落点保持很小，水面高光在下雨时不再把波峰照成白盘。
- 雨丝仍是又细又淡、若隐若现，尖端收到没有宽度，不会再看成一粒白点。下落仍比 v0.3.8 更快，角度仍陡，从上向下。
- 晴天光影渐变和着色器罩层（`#wx` 只画雨）保持。没有恢复 v0.3.3 的同心圈叠层或按游速改摆尾。

源码里的 `index.html` 仍可当网页，或按 README 手动导入 Lively。
