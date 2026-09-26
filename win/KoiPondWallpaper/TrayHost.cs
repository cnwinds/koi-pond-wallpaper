using System.Runtime.InteropServices;

namespace KoiPondWallpaper;

/// <summary>
/// Owns the NotifyIcon and ContextMenuStrip on a top-level window that
/// can become foreground. The wallpaper form is a WS_EX_NOACTIVATE
/// WorkerW child, so it cannot own a clickable tray menu.
/// </summary>
internal sealed class TrayHost : Form
{
    readonly IPondHost _host;
    readonly NotifyIcon _icon;
    readonly ContextMenuStrip _menu;

    public TrayHost(IPondHost host)
    {
        _host = host;

        Text = "锦鲤池托盘";
        ShowInTaskbar = false;
        FormBorderStyle = FormBorderStyle.FixedToolWindow;
        StartPosition = FormStartPosition.Manual;
        Bounds = new Rectangle(-32000, -32000, 1, 1);
        Opacity = 0;
        ShowIcon = false;

        _menu = BuildMenu();
        _menu.Opening += (_, _) => Foreground.Steal(Handle);
        _icon = new NotifyIcon
        {
            Visible = true,
            Text = "锦鲤池 · 桌面壁纸",
            Icon = SystemIcons.Application,
        };
        // Do not assign ContextMenuStrip: WinForms auto-show uses the
        // wallpaper thread's NOACTIVATE owner. Show the menu ourselves
        // after forcing this hidden host to the foreground.
        _icon.MouseUp += (_, e) =>
        {
            if (e.Button == MouseButtons.Right) ShowMenu();
        };
        _icon.DoubleClick += (_, _) => _host.FeedFromTray();
    }

    protected override CreateParams CreateParams
    {
        get
        {
            var cp = base.CreateParams;
            cp.ExStyle |= 0x00000080; // TOOLWINDOW only — must stay activatable
            return cp;
        }
    }

    protected override void SetVisibleCore(bool value)
    {
        if (!IsHandleCreated) CreateHandle();
        base.SetVisibleCore(false);
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _icon.Visible = false;
            _icon.Dispose();
            _menu.Dispose();
        }
        base.Dispose(disposing);
    }

    public void Balloon(string text, ToolTipIcon icon = ToolTipIcon.Info, int ms = 3500)
    {
        if (IsDisposed) return;
        _icon.ShowBalloonTip(ms, "锦鲤池", text, icon);
    }

    void ShowMenu()
    {
        if (IsDisposed) return;
        Foreground.Steal(Handle);
        _menu.Show(Cursor.Position);
    }

    ContextMenuStrip BuildMenu()
    {
        var menu = new ContextMenuStrip();
        menu.Items.Add("投喂 / Feed", null, (_, _) => _host.FeedFromTray());
        menu.Items.Add("显示设置 / Show settings", null, (_, _) => _host.OpenSettingsFromTray());

        var timeMenu = new ToolStripMenuItem("天色预览 / Light");
        timeMenu.DropDownOpening += (_, _) => Foreground.Steal(Handle);
        timeMenu.DropDownItems.Add("自动（真实时钟） / Auto", null, (_, _) => _host.PreviewFromTray(time: null, hasTime: true, sky: null, hasSky: false));
        timeMenu.DropDownItems.Add("昼 / Day", null, (_, _) => _host.PreviewFromTray("day", true, null, false));
        timeMenu.DropDownItems.Add("黄昏 / Dusk", null, (_, _) => _host.PreviewFromTray("dusk", true, null, false));
        timeMenu.DropDownItems.Add("夜 / Night", null, (_, _) => _host.PreviewFromTray("night", true, null, false));
        menu.Items.Add(timeMenu);

        var weatherMenu = new ToolStripMenuItem("天气预览 / Weather");
        weatherMenu.DropDownOpening += (_, _) => Foreground.Steal(Handle);
        weatherMenu.DropDownItems.Add("自动（实时天气） / Auto", null, (_, _) => _host.PreviewFromTray(null, false, null, true));
        weatherMenu.DropDownItems.Add("晴 / Clear", null, (_, _) => _host.PreviewFromTray(null, false, "clear", true));
        weatherMenu.DropDownItems.Add("阴 / Cloudy", null, (_, _) => _host.PreviewFromTray(null, false, "cloudy", true));
        weatherMenu.DropDownItems.Add("雨 / Rain", null, (_, _) => _host.PreviewFromTray(null, false, "rain", true));
        weatherMenu.DropDownItems.Add("雾 / Fog", null, (_, _) => _host.PreviewFromTray(null, false, "fog", true));
        menu.Items.Add(weatherMenu);

        menu.Items.Add("重新贴到桌面 / Pin desktop", null, (_, _) => _host.ReattachFromTray());
        menu.Items.Add("用 Lively 设壁纸 / Lively", null, (_, _) => _host.UseLivelyFromTray());
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add("窗口预览（不是桌面背景） / Preview only", null, (_, _) => _host.ShowWindowPreviewFromTray());
        menu.Items.Add("退出壁纸 / Exit", null, (_, _) => _host.ExitFromTray());
        return menu;
    }
}

internal interface IPondHost
{
    void FeedFromTray();
    void OpenSettingsFromTray();
    void PreviewFromTray(string? time, bool hasTime, string? sky, bool hasSky);
    void ReattachFromTray();
    void UseLivelyFromTray();
    void ShowWindowPreviewFromTray();
    void ExitFromTray();
}

/// <summary>
/// Tray menus are shown while Explorer owns the foreground. Modern
/// Windows blocks SetForegroundWindow unless we attach to that thread.
/// </summary>
internal static class Foreground
{
    const int SwShowNoActivate = 4;

    [DllImport("user32.dll")]
    static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")]
    static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

    [DllImport("user32.dll")]
    static extern bool AttachThreadInput(uint idAttach, uint idAttachTo, bool fAttach);

    [DllImport("kernel32.dll")]
    static extern uint GetCurrentThreadId();

    [DllImport("user32.dll")]
    static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    public static void Steal(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero) return;
        ShowWindow(hwnd, SwShowNoActivate);
        var fg = GetForegroundWindow();
        var fgTid = GetWindowThreadProcessId(fg, out _);
        var ourTid = GetCurrentThreadId();
        if (fg != IntPtr.Zero && fgTid != 0 && fgTid != ourTid)
        {
            AttachThreadInput(ourTid, fgTid, true);
            SetForegroundWindow(hwnd);
            AttachThreadInput(ourTid, fgTid, false);
        }
        else
        {
            SetForegroundWindow(hwnd);
        }
    }
}
