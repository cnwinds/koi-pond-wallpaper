namespace KoiPondWallpaper;

static class Program
{
    [STAThread]
    static void Main(string[] args)
    {
        using var mutex = new Mutex(true, "cnwinds.KoiPondWallpaper", out var created);
        if (!created) return;

        Application.SetHighDpiMode(HighDpiMode.PerMonitorV2);
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);

        var mode = LaunchMode.Wallpaper;
        foreach (var arg in args)
        {
            var a = arg.Trim().ToLowerInvariant();
            if (a is "--window" or "-w" or "/window") mode = LaunchMode.Window;
            if (a is "--lively" or "/lively") mode = LaunchMode.Lively;
        }

        string webRoot;
        try
        {
            webRoot = WebRoot.Find();
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                "找不到 index.html。请把 exe 和网页文件放在同一目录。\n\n" + ex.Message,
                "锦鲤池",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
            return;
        }

        Application.Run(new AppForm(mode, webRoot));
    }
}
