using System.Diagnostics;

namespace KoiPondWallpaper;

internal static class LivelyBridge
{
    public static string? FindCommandUtility()
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var candidates = new[]
        {
            Path.Combine(home, "Lively Wallpaper", "livelycu.exe"),
            Path.Combine(home, "Programs", "Lively Wallpaper", "livelycu.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Lively Wallpaper", "livelycu.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Lively Wallpaper", "livelycu.exe"),
        };
        foreach (var path in candidates)
        {
            if (File.Exists(path)) return path;
        }

        var cmd = FindOnPath("livelycu.exe") ?? FindOnPath("Livelycu.exe");
        return cmd;
    }

    public static string? FindApp()
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var candidates = new[]
        {
            Path.Combine(home, "Lively Wallpaper", "Lively.exe"),
            Path.Combine(home, "Programs", "Lively Wallpaper", "Lively.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Lively Wallpaper", "Lively.exe"),
        };
        foreach (var path in candidates)
        {
            if (File.Exists(path)) return path;
        }
        return FindOnPath("Lively.exe");
    }

    public static bool IsInstalled() => FindCommandUtility() != null || FindApp() != null;

    public static bool TrySetWallpaper(string webRoot)
    {
        try
        {
            if (!File.Exists(Path.Combine(webRoot, "index.html"))) return false;
            var library = CopyIntoLibrary(webRoot);
            if (library == null) return false;
            var cu = FindCommandUtility();
            if (cu != null)
            {
                var psi = new ProcessStartInfo
                {
                    FileName = cu,
                    Arguments = "setwp --file \"" + library + "\"",
                    UseShellExecute = false,
                    CreateNoWindow = true,
                };
                using var proc = Process.Start(psi);
                if (proc == null) return false;
                proc.WaitForExit(8000);
                return proc.ExitCode == 0 || proc.HasExited;
            }

            var app = FindApp();
            if (app == null) return false;
            Process.Start(new ProcessStartInfo { FileName = app, UseShellExecute = true });
            return false;
        }
        catch
        {
            return false;
        }
    }

    static string? CopyIntoLibrary(string webRoot)
    {
        var dest = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "Lively Wallpaper",
            "Library",
            "wallpapers",
            "koi-pond-wallpaper");
        Directory.CreateDirectory(dest);
        foreach (var name in new[] { "index.html", "LICENSE", "README.md", "thumbnail.png", "LivelyInfo.json", "LivelyInfo.loc.json", "LivelyProperties.json", "LivelyProperties.loc.json" })
        {
            var src = Path.Combine(webRoot, name);
            if (File.Exists(src)) File.Copy(src, Path.Combine(dest, name), true);
        }
        CopyDir(Path.Combine(webRoot, "js"), Path.Combine(dest, "js"));
        CopyDir(Path.Combine(webRoot, "css"), Path.Combine(dest, "css"));
        return File.Exists(Path.Combine(dest, "index.html")) ? dest : null;
    }

    static void CopyDir(string src, string dest)
    {
        if (!Directory.Exists(src)) return;
        Directory.CreateDirectory(dest);
        foreach (var file in Directory.GetFiles(src))
        {
            File.Copy(file, Path.Combine(dest, Path.GetFileName(file)), true);
        }
    }

    static string? FindOnPath(string file)
    {
        var path = Environment.GetEnvironmentVariable("PATH");
        if (string.IsNullOrEmpty(path)) return null;
        foreach (var dir in path.Split(Path.PathSeparator))
        {
            try
            {
                var full = Path.Combine(dir.Trim(), file);
                if (File.Exists(full)) return full;
            }
            catch
            {
                /* skip */
            }
        }
        return null;
    }
}
