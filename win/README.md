# Windows host

Lightweight WebView2 shell. Default action: embed the pond **behind desktop icons** (Progman / WorkerW). Optional `--window` preview and `--lively` bridge.

Build a portable zip (run on Windows, or Linux with `EnableWindowsTargeting`):

```powershell
./win/package.ps1
```

```bash
bash win/package.sh
```

Output: `dist/koi-pond-wallpaper-windows-x64.zip`.
