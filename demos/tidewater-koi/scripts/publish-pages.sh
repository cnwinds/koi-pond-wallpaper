#!/usr/bin/env bash
# Publish the built WebGPU demo to cursor/webgpu-pages-42d9.
# Does not merge, rebase, or push main. The wallpaper entry stays on main.
set -euo pipefail

root="$(git rev-parse --show-toplevel)"
cd "$root"

branch="cursor/webgpu-pages-42d9"
remote="${PUBLISH_REMOTE:-origin}"
work="$(mktemp -d)"
cleanup() {
  git worktree remove --force "$work" >/dev/null 2>&1 || true
  rm -rf "$work"
}
trap cleanup EXIT

npm run webgpu:build

git fetch "$remote" "$branch" || true
if git rev-parse --verify "refs/remotes/$remote/$branch" >/dev/null 2>&1; then
  git worktree add --force "$work" "refs/remotes/$remote/$branch"
  git -C "$work" checkout -B "$branch"
else
  git worktree add --detach "$work"
  git -C "$work" checkout --orphan "$branch"
fi

git -C "$work" rm -rf . >/dev/null 2>&1 || true
find "$work" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

cp -a "$root/demos/tidewater-koi/dist/." "$work/"
cat > "$work/README.md" << 'EOF'
# WebGPU koi demo (static)

Built snapshot of `demos/tidewater-koi`. This branch is not the wallpaper
and must not be merged into `main`.

Open `index.html` on a host that serves HTML and JavaScript with the right
MIME types. See `demos/tidewater-koi/DEMO.md` on the source branch.
EOF
: > "$work/.nojekyll"

git -C "$work" add -A
if git -C "$work" diff --cached --quiet; then
  echo "static branch already matches this build"
  exit 0
fi

src="$(git rev-parse --short HEAD)"
git -C "$work" commit -m "Publish WebGPU koi demo from ${src}."
git -C "$work" push -u "$remote" "$branch"
echo "published $remote/$branch"
