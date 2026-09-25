#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
proj="$root/win/KoiPondWallpaper/KoiPondWallpaper.csproj"
publish="$root/win/out"
stage="$root/dist/koi-pond-wallpaper"
zip="$root/dist/koi-pond-wallpaper-windows-x64.zip"

rm -rf "$publish" "$stage"
mkdir -p "$stage"

dotnet publish "$proj" -c Release -r win-x64 --self-contained true \
  -p:PublishSingleFile=true \
  -p:IncludeNativeLibrariesForSelfExtract=true \
  -p:EnableWindowsTargeting=true \
  -o "$publish"

cp "$publish/koi-pond-wallpaper.exe" "$stage/"
for name in index.html LICENSE README.md thumbnail.png \
  LivelyInfo.json LivelyInfo.loc.json LivelyProperties.json LivelyProperties.loc.json; do
  if [[ -f "$root/$name" ]]; then cp "$root/$name" "$stage/"; fi
done
cp -R "$root/js" "$stage/js"
cp -R "$root/css" "$stage/css"
cp "$root/win/使用说明.txt" "$stage/使用说明.txt"
cp "$root/win/window-preview.bat" "$stage/window-preview.bat"

rm -f "$zip"
mkdir -p "$root/dist"
(cd "$root/dist" && zip -qr "koi-pond-wallpaper-windows-x64.zip" "koi-pond-wallpaper")
echo "Packed $zip"
