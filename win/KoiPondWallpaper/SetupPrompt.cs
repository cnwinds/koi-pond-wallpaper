namespace KoiPondWallpaper;

internal static class SetupPrompt
{
    internal enum Choice
    {
        Retry,
        Lively,
        Preview,
        Quit,
    }

    public static Choice Show(bool livelyInstalled)
    {
        using var form = new Form
        {
            Text = "锦鲤池",
            FormBorderStyle = FormBorderStyle.FixedDialog,
            StartPosition = FormStartPosition.CenterScreen,
            ClientSize = new Size(440, 240),
            MaximizeBox = false,
            MinimizeBox = false,
            ShowInTaskbar = true,
            BackColor = Color.FromArgb(16, 28, 24),
            ForeColor = Color.FromArgb(231, 223, 208),
            Font = new Font("Segoe UI", 10f),
        };

        var label = new Label
        {
            AutoSize = false,
            Bounds = new Rectangle(20, 18, 400, 88),
            Text =
                "没能把锦鲤池贴到桌面图标后面，因此没有设成桌面背景。\n\n" +
                "不会自动打开普通全屏窗口。请选下一步：",
        };

        var retry = Btn("再试一次贴到桌面", 20, 118, 190);
        var lively = Btn(livelyInstalled ? "用 Lively 设为壁纸" : "安装 Lively 并设壁纸", 230, 118, 190);
        var preview = Btn("仅窗口预览（不是桌面背景）", 20, 168, 250);
        var quit = Btn("退出", 290, 168, 130);

        var result = Choice.Quit;
        retry.Click += (_, _) => { result = Choice.Retry; form.Close(); };
        lively.Click += (_, _) => { result = Choice.Lively; form.Close(); };
        preview.Click += (_, _) => { result = Choice.Preview; form.Close(); };
        quit.Click += (_, _) => { result = Choice.Quit; form.Close(); };

        form.Controls.Add(label);
        form.Controls.Add(retry);
        form.Controls.Add(lively);
        form.Controls.Add(preview);
        form.Controls.Add(quit);
        form.ShowDialog();
        return result;
    }

    static Button Btn(string text, int x, int y, int w)
    {
        return new Button
        {
            Text = text,
            Bounds = new Rectangle(x, y, w, 36),
            FlatStyle = FlatStyle.Flat,
            BackColor = Color.FromArgb(28, 44, 40),
            ForeColor = Color.FromArgb(231, 223, 208),
        };
    }
}
