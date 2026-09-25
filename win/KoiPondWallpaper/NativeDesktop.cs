using System.Runtime.InteropServices;

namespace KoiPondWallpaper;

/// <summary>
/// Embed a window behind desktop icons (Progman / WorkerW), the same class of
/// technique used by Lively and other live-wallpaper hosts.
/// </summary>
internal static class NativeDesktop
{
    const uint WmSpawnWorker = 0x052C;
    const uint SmtoNormal = 0x0000;

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

    public static bool TryAttach(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return false;
        SpawnWorker();
        var worker = FindWallpaperWorker();
        if (worker == IntPtr.Zero) return false;
        SetParent(hwnd, worker);
        var vs = SystemInformation.VirtualScreen;
        MoveWindow(hwnd, 0, 0, vs.Width, vs.Height, true);
        var parent = GetParent(hwnd);
        return parent == worker || parent != IntPtr.Zero;
    }

    public static bool StillAttached(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return false;
        var parent = GetParent(hwnd);
        return parent != IntPtr.Zero && IsWindow(parent);
    }

    public static void Detach(IntPtr hwnd)
    {
        if (hwnd == IntPtr.Zero || !IsWindow(hwnd)) return;
        SetParent(hwnd, IntPtr.Zero);
    }

    static void SpawnWorker()
    {
        var progman = FindWindow("Progman", null);
        if (progman == IntPtr.Zero) return;
        SendMessageTimeout(progman, WmSpawnWorker, new UIntPtr(0xD), new IntPtr(0x1), SmtoNormal, 1000, out _);
        SendMessageTimeout(progman, WmSpawnWorker, UIntPtr.Zero, IntPtr.Zero, SmtoNormal, 1000, out _);
    }

    static IntPtr FindWallpaperWorker()
    {
        IntPtr worker = IntPtr.Zero;
        EnumWindows((top, _) =>
        {
            var shell = FindWindowEx(top, IntPtr.Zero, "SHELLDLL_DefView", null);
            if (shell != IntPtr.Zero)
            {
                worker = FindWindowEx(IntPtr.Zero, top, "WorkerW", null);
                return false;
            }
            return true;
        }, IntPtr.Zero);

        if (worker != IntPtr.Zero) return worker;

        var progman = FindWindow("Progman", null);
        if (progman == IntPtr.Zero) return IntPtr.Zero;
        var child = FindWindowEx(progman, IntPtr.Zero, "WorkerW", null);
        return child;
    }
}
