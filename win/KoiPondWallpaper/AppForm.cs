using System.Text.Json;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace KoiPondWallpaper;

internal sealed class AppForm : Form, IPondHost
{
    readonly LaunchMode _mode;
    readonly string _webRoot;
    readonly WebView2 _web;
    readonly TrayHost _tray;
    readonly System.Windows.Forms.Timer _watch;
    bool _attached;
    bool _allowClose;
    bool _pageReady;

    public AppForm(LaunchMode mode, string webRoot)
    {
        _mode = mode;
        _webRoot = webRoot;

        Text = "锦鲤池";
        BackColor = Color.FromArgb(8, 22, 20);
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        StartPosition = FormStartPosition.Manual;
        // Stay off-screen until we are a desktop-child. A maximized
        // top-level form is NOT the wallpaper and must not appear first.
        Bounds = new Rectangle(-32000, -32000, 80, 80);
        Opacity = 0;

        _web = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = Color.FromArgb(8, 22, 20),
        };
        Controls.Add(_web);

        _tray = new TrayHost(this);
        _ = _tray.Handle;

        _watch = new System.Windows.Forms.Timer { Interval = 12000 };
        _watch.Tick += (_, _) =>
        {
            if (_mode == LaunchMode.Window) return;
            if (_attached && !NativeDesktop.StillAttached(Handle))
            {
                _attached = false;
                Queue(AttachWallpaperAsync);
            }
        };

        Load += (_, _) => Queue(BootAsync);
        FormClosing += (_, ev) =>
        {
            if (!_allowClose && ev.CloseReason == CloseReason.UserClosing)
            {
                ev.Cancel = true;
                if (!_attached) Hide();
            }
        };
        FormClosed += (_, _) =>
        {
            _watch.Stop();
            _tray.Dispose();
            if (_attached) NativeDesktop.Detach(Handle);
        };
    }

    protected override CreateParams CreateParams
    {
        get
        {
            var cp = base.CreateParams;
            // Wallpaper must not steal focus from desktop icons.
            // Tray UI lives on TrayHost, which stays activatable.
            cp.ExStyle |= 0x00000080 | 0x08000000; // TOOLWINDOW | NOACTIVATE
            return cp;
        }
    }

    IWin32Window DialogOwner => _tray.IsDisposed ? this : _tray;

    void Queue(Func<Task> work)
    {
        if (IsDisposed) return;
        if (InvokeRequired)
        {
            BeginInvoke(new MethodInvoker(() => Queue(work)));
            return;
        }
        _ = RunSafeAsync(work);
    }

    async Task RunSafeAsync(Func<Task> work)
    {
        try
        {
            await work();
        }
        catch (Exception ex)
        {
            _tray.Balloon("操作失败：\n" + ex.Message, ToolTipIcon.Warning, 4000);
        }
    }

    public void FeedFromTray() => Queue(() => SendPondAsync(new PondCommand("feed")));

    public void OpenSettingsFromTray() => Queue(() => SendPondAsync(new PondCommand("openSettings")));

    public void PreviewFromTray(string? time, bool hasTime, string? sky, bool hasSky)
    {
        Queue(() => SendPondAsync(new PondCommand("preview", time, hasTime, sky, hasSky)));
    }

    public void ReattachFromTray() => Queue(AttachWallpaperAsync);

    public void UseLivelyFromTray()
    {
        if (InvokeRequired)
        {
            BeginInvoke(UseLivelyFromTray);
            return;
        }
        UseLivelyOrExplain();
    }

    public void ShowWindowPreviewFromTray()
    {
        if (InvokeRequired)
        {
            BeginInvoke(ShowWindowPreviewFromTray);
            return;
        }
        ShowAsWindow();
    }

    public void ExitFromTray()
    {
        if (InvokeRequired)
        {
            BeginInvoke(ExitFromTray);
            return;
        }
        ExitApp();
    }

    async Task BootAsync()
    {
        try
        {
            await InitWebAsync();
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                DialogOwner,
                "无法启动 WebView2。请安装或修复 Microsoft Edge WebView2 Runtime。\n\n" + ex.Message,
                "锦鲤池",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
            ExitApp();
            return;
        }

        if (_mode == LaunchMode.Window)
        {
            ShowAsWindow();
            return;
        }

        if (_mode == LaunchMode.Lively)
        {
            if (UseLivelyOrExplain())
            {
                ExitApp();
                return;
            }
        }

        if (await AttachWallpaperAsync())
        {
            _watch.Start();
            _tray.Balloon("已设为桌面动态壁纸（图标后面）。托盘可投喂、改天色天气或退出。");
            return;
        }

        if (LivelyBridge.IsInstalled() && LivelyBridge.TrySetWallpaper(_webRoot))
        {
            _tray.Balloon("已交给 Lively 设为桌面壁纸。", ToolTipIcon.Info, 4000);
            ExitApp();
            return;
        }

        Hide();
        Opacity = 0;
        var choice = SetupPrompt.Show(LivelyBridge.IsInstalled());
        if (choice == SetupPrompt.Choice.Retry)
        {
            if (await AttachWallpaperAsync())
            {
                _watch.Start();
                return;
            }
        }
        if (choice == SetupPrompt.Choice.Lively)
        {
            if (UseLivelyOrExplain())
            {
                ExitApp();
                return;
            }
        }
        if (choice == SetupPrompt.Choice.Preview)
        {
            ShowAsWindow();
            return;
        }
        ExitApp();
    }

    async Task InitWebAsync()
    {
        var user = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "KoiPondWallpaper",
            "WebView2");
        Directory.CreateDirectory(user);
        var env = await CoreWebView2Environment.CreateAsync(null, user);
        await _web.EnsureCoreWebView2Async(env);
        _web.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
        _web.CoreWebView2.Settings.AreDevToolsEnabled = false;
        _web.CoreWebView2.Settings.IsStatusBarEnabled = false;
        _web.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
        _web.CoreWebView2.PermissionRequested += (_, e) =>
        {
            if (e.PermissionKind == CoreWebView2PermissionKind.Geolocation)
            {
                e.Handled = true;
                e.State = CoreWebView2PermissionState.Allow;
            }
        };
        _web.CoreWebView2.DOMContentLoaded += (_, _) => _pageReady = true;
        _web.CoreWebView2.NavigationCompleted += (_, e) =>
        {
            if (e.IsSuccess) _pageReady = true;
        };
        _web.CoreWebView2.SetVirtualHostNameToFolderMapping(
            "pond.local",
            _webRoot,
            CoreWebView2HostResourceAccessKind.Allow);
        // Keep the hideable gear so day/night and weather can be previewed
        // on the wallpaper. ?ui=0 would persist a hidden HUD in localStorage.
        _web.CoreWebView2.Navigate("https://pond.local/index.html");
    }

    async Task<bool> AttachWallpaperAsync()
    {
        ShowInTaskbar = false;
        FormBorderStyle = FormBorderStyle.None;
        WindowState = FormWindowState.Normal;
        Show();
        _ = Handle;
        await Task.Delay(60);
        _attached = NativeDesktop.TryAttach(Handle);
        if (_attached)
        {
            Opacity = 1;
            var vs = SystemInformation.VirtualScreen;
            Bounds = new Rectangle(0, 0, vs.Width, vs.Height);
            return true;
        }
        _attached = false;
        Hide();
        Opacity = 0;
        return false;
    }

    void ShowAsWindow()
    {
        if (_attached)
        {
            NativeDesktop.Detach(Handle);
            _attached = false;
        }
        _watch.Stop();
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = true;
        WindowState = FormWindowState.Maximized;
        Opacity = 1;
        Bounds = Screen.PrimaryScreen?.Bounds ?? SystemInformation.VirtualScreen;
        Show();
        Activate();
        _tray.Balloon("当前是窗口预览，不是桌面背景。请从托盘选「重新贴到桌面」。", ToolTipIcon.Info, 5000);
    }

    bool UseLivelyOrExplain()
    {
        if (LivelyBridge.TrySetWallpaper(_webRoot))
        {
            _tray.Balloon("已用 Lively 设为桌面壁纸。", ToolTipIcon.Info, 4000);
            return true;
        }
        if (!LivelyBridge.IsInstalled())
        {
            LivelyBridge.OpenDownloadPage();
            MessageBox.Show(
                DialogOwner,
                "未检测到 Lively Wallpaper。已打开下载页。\n安装后再双击 koi-pond-wallpaper.exe，或从托盘选「用 Lively 设壁纸」。\n\nhttps://github.com/rocksdanister/lively/releases",
                "锦鲤池",
                MessageBoxButtons.OK,
                MessageBoxIcon.Information);
            return false;
        }
        MessageBox.Show(
            DialogOwner,
            "已把锦鲤池拷进 Lively 图库，但没能自动设为当前壁纸。请在 Lively 图库里选「锦鲤池」。",
            "锦鲤池",
            MessageBoxButtons.OK,
            MessageBoxIcon.Information);
        return false;
    }

    async Task SendPondAsync(PondCommand command)
    {
        if (_web.CoreWebView2 == null || !_pageReady)
        {
            _tray.Balloon("池塘还在加载，请稍后再试。", ToolTipIcon.Warning, 2500);
            return;
        }

        var json = command.ToJson();
        try
        {
            var script =
                "(function(){try{if(!window.KoiPond||!KoiPond.applyHostCommand)return 'missing';" +
                "return String(KoiPond.applyHostCommand(" + json + "));}catch(e){return 'err';}})()";
            var result = await _web.CoreWebView2.ExecuteScriptAsync(script);
            if (result == "\"ok\"") return;
            if (result == "\"missing\"")
            {
                try
                {
                    _web.CoreWebView2.PostWebMessageAsJson(json);
                }
                catch
                {
                    _tray.Balloon("池塘脚本尚未就绪，请稍后再试。", ToolTipIcon.Warning, 2500);
                }
                return;
            }
            if (result is "\"err\"" or "\"bad\"" or "\"unknown\"")
            {
                _tray.Balloon("无法应用托盘命令。", ToolTipIcon.Warning, 2500);
            }
        }
        catch (Exception ex)
        {
            try
            {
                _web.CoreWebView2.PostWebMessageAsJson(json);
            }
            catch
            {
                _tray.Balloon("无法通知池塘：\n" + ex.Message, ToolTipIcon.Warning, 4000);
            }
        }
    }

    void ExitApp()
    {
        _allowClose = true;
        _attached = false;
        Application.Exit();
    }
}

internal readonly struct PondCommand
{
    public PondCommand(string action, string? time = null, bool hasTime = false, string? sky = null, bool hasSky = false)
    {
        Action = action;
        Time = time;
        HasTime = hasTime;
        Sky = sky;
        HasSky = hasSky;
    }

    public string Action { get; }
    public string? Time { get; }
    public bool HasTime { get; }
    public string? Sky { get; }
    public bool HasSky { get; }

    public string ToJson()
    {
        using var stream = new MemoryStream();
        using (var writer = new Utf8JsonWriter(stream))
        {
            writer.WriteStartObject();
            writer.WriteString("action", Action);
            if (HasTime)
            {
                if (Time == null) writer.WriteNull("time");
                else writer.WriteString("time", Time);
            }
            if (HasSky)
            {
                if (Sky == null) writer.WriteNull("sky");
                else writer.WriteString("sky", Sky);
            }
            writer.WriteEndObject();
        }
        return System.Text.Encoding.UTF8.GetString(stream.ToArray());
    }
}

internal enum LaunchMode
{
    Wallpaper,
    Window,
    Lively,
}
