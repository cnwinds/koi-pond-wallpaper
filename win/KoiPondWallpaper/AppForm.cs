using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace KoiPondWallpaper;

internal sealed class AppForm : Form
{
    readonly LaunchMode _mode;
    readonly string _webRoot;
    readonly WebView2 _web;
    readonly NotifyIcon _tray;
    readonly System.Windows.Forms.Timer _watch;
    bool _attached;

    public AppForm(LaunchMode mode, string webRoot)
    {
        _mode = mode;
        _webRoot = webRoot;

        Text = "锦鲤池";
        BackColor = Color.FromArgb(8, 22, 20);
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        StartPosition = FormStartPosition.Manual;
        var vs = SystemInformation.VirtualScreen;
        Bounds = vs;

        _web = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = Color.FromArgb(8, 22, 20),
        };
        Controls.Add(_web);

        _tray = new NotifyIcon
        {
            Visible = true,
            Text = "锦鲤池",
            Icon = SystemIcons.Application,
        };
        var menu = new ContextMenuStrip();
        menu.Items.Add("投喂 / Feed", null, async (_, _) => await FeedAsync());
        menu.Items.Add("重新贴到桌面 / Pin desktop", null, async (_, _) => await AttachWallpaperAsync());
        menu.Items.Add("窗口预览 / Window", null, (_, _) => ShowAsWindow());
        menu.Items.Add("用 Lively 设壁纸 / Lively", null, (_, _) => TryLively());
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add("退出 / Exit", null, (_, _) => ExitApp());
        _tray.ContextMenuStrip = menu;
        _tray.DoubleClick += async (_, _) => await FeedAsync();

        _watch = new System.Windows.Forms.Timer { Interval = 12000 };
        _watch.Tick += async (_, _) =>
        {
            if (_mode == LaunchMode.Window) return;
            if (_attached && !NativeDesktop.StillAttached(Handle))
            {
                _attached = false;
                await AttachWallpaperAsync();
            }
        };

        Shown += async (_, _) => await BootAsync();
        FormClosing += (_, ev) =>
        {
            if (ev.CloseReason == CloseReason.UserClosing && _attached)
            {
                ev.Cancel = true;
                Hide();
            }
        };
        FormClosed += (_, _) =>
        {
            _watch.Stop();
            _tray.Visible = false;
            _tray.Dispose();
            if (_attached) NativeDesktop.Detach(Handle);
        };
    }

    async Task BootAsync()
    {
        await InitWebAsync();
        if (_mode == LaunchMode.Lively)
        {
            if (TryLively())
            {
                _tray.ShowBalloonTip(4000, "锦鲤池", "已交给 Lively 设为桌面壁纸。", ToolTipIcon.Info);
                ExitApp();
                return;
            }
            _tray.ShowBalloonTip(6000, "锦鲤池", "没有找到 Lively，改为直接贴到桌面。", ToolTipIcon.Info);
        }

        if (_mode == LaunchMode.Window)
        {
            ShowAsWindow();
            return;
        }

        var ok = await AttachWallpaperAsync();
        if (!ok)
        {
            if (LivelyBridge.IsInstalled() && TryLively())
            {
                _tray.ShowBalloonTip(4000, "锦鲤池", "已用 Lively 设为桌面壁纸。", ToolTipIcon.Info);
                ExitApp();
                return;
            }
            ShowAsWindow();
            _tray.ShowBalloonTip(
                8000,
                "锦鲤池",
                "没能贴到图标后面。已用窗口预览。可安装 Lively Wallpaper 后再试，或从托盘重新贴到桌面。",
                ToolTipIcon.Warning);
        }
        else
        {
            _watch.Start();
            _tray.ShowBalloonTip(3500, "锦鲤池", "已设为桌面动态壁纸。右下角托盘可投喂或退出。", ToolTipIcon.Info);
        }
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
        _web.CoreWebView2.SetVirtualHostNameToFolderMapping(
            "pond.local",
            _webRoot,
            CoreWebView2HostResourceAccessKind.Allow);
        var query = _mode == LaunchMode.Window ? "" : "?ui=0";
        _web.CoreWebView2.Navigate("https://pond.local/index.html" + query);
    }

    async Task<bool> AttachWallpaperAsync()
    {
        Show();
        FormBorderStyle = FormBorderStyle.None;
        ShowInTaskbar = false;
        WindowState = FormWindowState.Normal;
        Bounds = SystemInformation.VirtualScreen;
        await Task.Delay(80);
        _attached = NativeDesktop.TryAttach(Handle);
        if (_attached)
        {
            Bounds = SystemInformation.VirtualScreen;
        }
        return _attached;
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
        Bounds = Screen.PrimaryScreen?.Bounds ?? SystemInformation.VirtualScreen;
        Show();
        Activate();
    }

    bool TryLively()
    {
        return LivelyBridge.TrySetWallpaper(_webRoot);
    }

    async Task FeedAsync()
    {
        if (_web.CoreWebView2 == null) return;
        await _web.CoreWebView2.ExecuteScriptAsync(
            "if(window.KoiPond)KoiPond.feed(window.innerWidth*0.5,window.innerHeight*0.42);");
    }

    void ExitApp()
    {
        _attached = false;
        _tray.Visible = false;
        Application.Exit();
    }
}

internal enum LaunchMode
{
    Wallpaper,
    Window,
    Lively,
}
