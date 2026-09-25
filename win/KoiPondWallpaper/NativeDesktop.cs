using System.Runtime.InteropServices;
using System.Text;

namespace KoiPondWallpaper;

/// <summary>
/// Embed a window behind desktop icons (Progman / WorkerW).
/// Tries the sibling-WorkerW path, a WorkerW without SHELLDLL_DefView,
/// Progman children, then Progman itself (Win11 fallback).
/// </summary>
internal static class NativeDesktop
{
    const uint WmSpawnWorker = 0x052C;
    const uint SmtoNormal = 0x0000;
    const int GwlStyle = -16;
    const int GwlExStyle = -20;
    const uint WsChild = 0x40000000;
    const uint WsVisible = 0x10000000;
    const uint WsPopup = 0x80000000;
    const uint WsExNoActivate = 0x08000000;
    const uint WsExToolWindow = 0x00000080;
    const uint WsExAppWindow = 0x00040000;
    const uint SwpNoZOrder = 0x0004;
    const uint SwpNoActivate = 0x0010;
    const uint SwpFrameChanged = 0x0020;

    delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr FindWindow(string lpClassName, string? lpWindowName);

    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    static extern IntPtr FindWindowEx(IntPtr parent, IntPtr childAfter, string? cls, string? window);

    [DllImport("user32.dll", SetLastError = true)]
    static extern IntPtr SendMessageTimeout(
        IntPtr hWnd,
        uint msg,
        UIntPtr wParam,
        IntPtr lParam,
        uint flags,
        uint timeoutMs,
        out IntPtr result);

    [DllImport("user32.dll")]
    static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true)]
    static extern IntPtr SetParent(IntPtr hWndChild, IntPtr hWndNewParent);

    [DllImport("user32.dll")]
    static extern IntPtr GetParent(IntPtr hWnd);

    [DllImport("user32.dll", SetLastError = true)]
    static extern bool MoveWindow(IntPtr hWnd, int x, int y, int w, int h, bool repaint);

    [DllImport("user32.dll")]
    static extern bool IsWindow(IntPtr hWnd);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);

    [DllImport("user32.dll", EntryPoint = "GetWindowLongPtrW")]
    static extern IntPtr GetWindowLongPtr(IntPtr hWnd, int nIndex);

    [DllImport("user32.dll", EntryPoint = "SetWindowLongPtrW")]
    static extern IntPtr SetWindowLongPtr(IntPtr hWnd, int nIndex, IntPtr dwNewLong);

    [DllImport("user32.dll", SetLastError = true)]
    static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int x, int y, int cx, int cy, uint flags);

    public static bool TryAttach(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return false;
        SpawnWorker();
        Thread.Sleep(180);
        foreach (var target in EnumerateTargets())
        {
            if (TryParent(hwnd, target)) return true;
        }
        return false;
    }

    public static bool StillAttached(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return false;
        var parent = GetParent(hwnd);
        if (parent == IntPtr.Zero || !IsWindow(parent)) return false;
        var cls = ClassName(parent);
        return cls is "WorkerW" or "Progman";
    }

    public static void Detach(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return;
        SetParent(hwnd, IntPtr.Zero);
    }

    static bool TryParent(IntPtr hwnd, IntPtr target)
    {
        if (target == IntPtr.Zero || !IsWindow(target)) return false;
        ApplyChildStyles(hwnd);
        SetParent(hwnd, target);
        var vs = SystemInformation.VirtualScreen;
        MoveWindow(hwnd, 0, 0, vs.Width, vs.Height, true);
        SetWindowPos(hwnd, IntPtr.Zero, 0, 0, vs.Width, vs.Height, SwpNoZOrder | SwpNoActivate | SwpFrameChanged);
        var parent = GetParent(hwnd);
        return parent == target;
    }

    static void ApplyChildStyles(IntPtr hwnd)
    {
        var style = unchecked((uint)GetWindowLongPtr(hwnd, GwlStyle).ToInt64());
        style = (style | WsChild | WsVisible) & ~WsPopup;
        SetWindowLongPtr(hwnd, GwlStyle, new IntPtr(unchecked((long)style)));

        var ex = unchecked((uint)GetWindowLongPtr(hwnd, GwlExStyle).ToInt64());
        ex = (ex | WsExNoActivate | WsExToolWindow) & ~WsExAppWindow;
        SetWindowLongPtr(hwnd, GwlExStyle, new IntPtr(unchecked((long)ex)));
    }

    static void SpawnWorker()
    {
        var progman = FindWindow("Progman", null);
        if (progman == IntPtr.Zero) return;
        SendMessageTimeout(progman, WmSpawnWorker, new UIntPtr(0xD), new IntPtr(0x1), SmtoNormal, 1000, out _);
        SendMessageTimeout(progman, WmSpawnWorker, UIntPtr.Zero, IntPtr.Zero, SmtoNormal, 1000, out _);
    }

    static IEnumerable<IntPtr> EnumerateTargets()
    {
        var seen = new HashSet<IntPtr>();
        var list = new List<IntPtr>();

        void Add(IntPtr h)
        {
            if (h != IntPtr.Zero && seen.Add(h) && IsWindow(h)) list.Add(h);
        }

        EnumWindows((top, _) =>
        {
            var def = FindWindowEx(top, IntPtr.Zero, "SHELLDLL_DefView", null);
            if (def != IntPtr.Zero)
            {
                Add(FindWindowEx(IntPtr.Zero, top, "WorkerW", null));
            }
            if (ClassName(top) == "WorkerW" && def == IntPtr.Zero)
            {
                Add(top);
            }
            return true;
        }, IntPtr.Zero);

        var progman = FindWindow("Progman", null);
        if (progman != IntPtr.Zero)
        {
            var child = IntPtr.Zero;
            while (true)
            {
                child = FindWindowEx(progman, child, "WorkerW", null);
                if (child == IntPtr.Zero) break;
                Add(child);
            }
            Add(progman);
        }

        return list;
    }

    static string ClassName(IntPtr hwnd)
    {
        var sb = new StringBuilder(256);
        GetClassName(hwnd, sb, sb.Capacity);
        return sb.ToString();
    }
}
