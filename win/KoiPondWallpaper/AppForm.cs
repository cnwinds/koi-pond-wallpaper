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
    bool _allowClose;

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

        _tray = new NotifyIcon
        {
            Visible = true,
            Text = "锦鲤池 · 桌面壁纸",
            Icon = SystemIcons.Application,
        };
        var menu = new ContextMenuStrip();
        menu.Items.Add("投喂 / Feed", null, async (_, _) => await FeedAsync());
        menu.Items.Add("重新贴到桌面 / Pin desktop", null, async (_, _) => await AttachWallpaperAsync());
        menu.Items.Add("用 Lively 设壁纸 / Lively", null, (_, _) => UseLivelyOrExplain());
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add("窗口预览（不是桌面背景） / Preview only", null, (_, _) => ShowAsWindow());
        menu.Items.Add("退出壁纸 / Exit", null, (_, _) => ExitApp());
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

        Load += async (_, _) => await BootAsync();
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
            _tray.Visible = false;
            _tray.Dispose();
            if (_attached) NativeDesktop.Detach(Handle);
        };
    }

    protected override CreateParams CreateParams
    {
        get
        {
            var cp = base.CreateParams;
            cp.ExStyle |= 0x00000080 | 0x08000000; // TOOLWINDOW | NOACTIVATE
            return cp;
        }
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
            _tray.ShowBalloonTip(3500, "锦鲤池", "已设为桌面动态壁纸（图标后面）。托盘可投喂或退出。", ToolTipIcon.Info);
            return;
        }

        if (LivelyBridge.IsInstalled() && LivelyBridge.TrySetWallpaper(_webRoot))
        {
            _tray.ShowBalloonTip(4000, "锦鲤池", "已交给 Lively 设为桌面壁纸。", ToolTipIcon.Info);
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
        _web.CoreWebView2.SetVirtualHostNameToFolderMapping(
            "pond.local",
            _webRoot,
            CoreWebView2HostResourceAccessKind.Allow);
        var query = _mode == LaunchMode.Window ? "" : "?ui=0";
        _web.CoreWebView2.Navigate("https://pond.local/index.html" + query);
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
        _tray.ShowBalloonTip(5000, "锦鲤池", "当前是窗口预览，不是桌面背景。请从托盘选「重新贴到桌面」。", ToolTipIcon.Info);
    }

    bool UseLivelyOrExplain()
    {
        if (LivelyBridge.TrySetWallpaper(_webRoot))
        {
            _tray.ShowBalloonTip(4000, "锦鲤池", "已用 Lively 设为桌面壁纸。", ToolTipIcon.Info);
            return true;
        }
        if (!LivelyBridge.IsInstalled())
        {
            LivelyBridge.OpenDownloadPage();
            MessageBox.Show(
                "未检测到 Lively Wallpaper。已打开下载页。\n安装后再双击 koi-pond-wallpaper.exe，或从托盘选「用 Lively 设壁纸」。\n\nhttps://github.com/rocksdanister/lively/releases",
                "锦鲤池",
                MessageBoxButtons.OK,
                MessageBoxIcon.Information);
            return false;
        }
        MessageBox.Show(
            "已把锦鲤池拷进 Lively 图库，但没能自动设为当前壁纸。请在 Lively 图库里选「锦鲤池」。",
            "锦鲤池",
            MessageBoxButtons.OK,
            MessageBoxIcon.Information);
        return false;
    }

    async Task FeedAsync()
    {
        if (_web.CoreWebView2 == null) return;
        await _web.CoreWebView2.ExecuteScriptAsync(
            "if(window.KoiPond)KoiPond.feed(window.innerWidth*0.5,window.innerHeight*0.42);");
    }

    void ExitApp()
    {
        _allowClose = true;
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
