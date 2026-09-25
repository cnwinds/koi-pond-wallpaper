param(
  [string]$Configuration = "Release",
  [string]$Runtime = "win-x64",
  [string]$OutDir = ""
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not $OutDir) { $OutDir = Join-Path $root "dist" }

$proj = Join-Path $PSScriptRoot "KoiPondWallpaper\KoiPondWallpaper.csproj"
$publish = Join-Path $PSScriptRoot "out"
$stage = Join-Path $OutDir "koi-pond-wallpaper"

if (Test-Path $publish) { Remove-Item $publish -Recurse -Force }
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null

dotnet publish $proj -c $Configuration -r $Runtime --self-contained true `
  -p:PublishSingleFile=true `
  -p:IncludeNativeLibrariesForSelfExtract=true `
  -p:EnableWindowsTargeting=true `
  -o $publish

Copy-Item (Join-Path $publish "koi-pond-wallpaper.exe") $stage
foreach ($name in @("index.html", "LICENSE", "README.md", "thumbnail.png", "LivelyInfo.json", "LivelyInfo.loc.json", "LivelyProperties.json", "LivelyProperties.loc.json")) {
  $src = Join-Path $root $name
  if (Test-Path $src) { Copy-Item $src $stage }
}
Copy-Item (Join-Path $root "js") (Join-Path $stage "js") -Recurse
Copy-Item (Join-Path $root "css") (Join-Path $stage "css") -Recurse
Copy-Item (Join-Path $PSScriptRoot "使用说明.txt") (Join-Path $stage "使用说明.txt")
Copy-Item (Join-Path $PSScriptRoot "window-preview.bat") (Join-Path $stage "window-preview.bat")

$zip = Join-Path $OutDir "koi-pond-wallpaper-windows-x64.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path $stage -DestinationPath $zip
Write-Host "Packed $zip"
