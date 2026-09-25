namespace KoiPondWallpaper;

internal static class WebRoot
{
    public static string Find()
    {
        var candidates = new List<string?>
        {
            Path.GetDirectoryName(Environment.ProcessPath),
            AppContext.BaseDirectory,
            Directory.GetCurrentDirectory(),
        };

        var exeDir = Path.GetDirectoryName(Environment.ProcessPath);
        if (!string.IsNullOrEmpty(exeDir))
        {
            candidates.Add(Path.GetFullPath(Path.Combine(exeDir, "..")));
            candidates.Add(Path.GetFullPath(Path.Combine(exeDir, "..", "..", "..", "..")));
        }

        foreach (var dir in candidates)
        {
            if (string.IsNullOrEmpty(dir)) continue;
            if (File.Exists(Path.Combine(dir, "index.html"))) return Path.GetFullPath(dir);
        }

        throw new DirectoryNotFoundException("index.html not found next to koi-pond-wallpaper.exe");
    }
}
