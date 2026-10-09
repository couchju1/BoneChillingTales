#!/usr/bin/env bash
# Uploads dist/ to Hostinger without ever deleting files this script didn't put there.
#
# Each deploy saves a list of the files it uploaded (.bct-deploy-manifest, blocked from the web by
# .htaccess). The next deploy removes only files that are on the old list and not the new one, so
# anything else in public_html (Hostinger's files, old sites, your own uploads) is left alone.
#
#   DEPLOY_METHOD=ssh    DEPLOY_HOST DEPLOY_PORT DEPLOY_USER DEPLOY_PATH, key already in ssh-agent or ~/.ssh
#   DEPLOY_METHOD=ftp    DEPLOY_HOST DEPLOY_USER DEPLOY_PASSWORD DEPLOY_PATH (FTPS when the server offers it)
#   DEPLOY_METHOD=local  DEPLOY_PATH (a folder on this machine, for testing)
#   DRY_RUN=1            show what would change and stop
set -euo pipefail

DIST="${DIST:-dist}"
MANIFEST=".bct-deploy-manifest"
METHOD="${DEPLOY_METHOD:?Set DEPLOY_METHOD to ssh, ftp or local}"
REMOTE="${DEPLOY_PATH:?Set DEPLOY_PATH to the site folder, like domains/bonechillingtales.com/public_html}"
REMOTE="${REMOTE%/}"
DRY_RUN="${DRY_RUN:-0}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

[ -f "$DIST/index.html" ] || { echo "No $DIST/index.html. Run npm run build first." >&2; exit 1; }

case "$METHOD" in
  ssh)
    : "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}"
    PORT="${DEPLOY_PORT:-22}"
    SSH=(ssh -p "$PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes "$DEPLOY_USER@$DEPLOY_HOST")
    remote_cat() { "${SSH[@]}" "cat -- '$REMOTE/$1'" 2>/dev/null || true; }
    remote_ls() { "${SSH[@]}" "ls -A -- '$REMOTE'" 2>/dev/null || true; }
    upload() {
      rsync -rlz --chmod=D755,F644 --exclude "$MANIFEST" -e "ssh -p $PORT -o BatchMode=yes -o StrictHostKeyChecking=yes" \
        "$DIST/" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE/"
    }
    remove() { "${SSH[@]}" "cd -- '$REMOTE' && xargs -0 rm -f --" < "$1"; }
    put_manifest() { "${SSH[@]}" "cat > '$REMOTE/$MANIFEST'" < "$1"; }
    ;;
  ftp)
    : "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${DEPLOY_PASSWORD:?}"
    LFTP_OPEN="set ftp:ssl-allow yes; set net:max-retries 2; set net:timeout 20; open -u \"$DEPLOY_USER\",\"$DEPLOY_PASSWORD\" \"$DEPLOY_HOST\""
    remote_cat() { lftp -c "$LFTP_OPEN; cat \"$REMOTE/$1\"" 2>/dev/null || true; }
    remote_ls() { lftp -c "$LFTP_OPEN; cd \"$REMOTE\"; cls -1a" 2>/dev/null | sed 's|/$||' | grep -vE '^\.\.?$' || true; }
    upload() { lftp -c "$LFTP_OPEN; mirror --reverse --parallel=4 --no-perms --exclude-glob $MANIFEST \"$DIST/\" \"$REMOTE/\""; }
    remove() {
      local script="$WORK/rm.lftp"
      echo "$LFTP_OPEN; cd \"$REMOTE\"" > "$script"
      tr '\0' '\n' < "$1" | while IFS= read -r f; do printf 'rm -f "%s"\n' "$f"; done >> "$script"
      lftp -f "$script"
    }
    put_manifest() { lftp -c "$LFTP_OPEN; put \"$1\" -o \"$REMOTE/$MANIFEST\""; }
    ;;
  local)
    remote_cat() { cat -- "$REMOTE/$1" 2>/dev/null || true; }
    remote_ls() { ls -A -- "$REMOTE" 2>/dev/null || true; }
    upload() { mkdir -p "$REMOTE" && rsync -rl --exclude "$MANIFEST" "$DIST/" "$REMOTE/"; }
    remove() { (cd -- "$REMOTE" && xargs -0 rm -f --) < "$1"; }
    put_manifest() { cp "$1" "$REMOTE/$MANIFEST"; }
    ;;
  *) echo "DEPLOY_METHOD must be ssh, ftp or local" >&2; exit 1 ;;
esac

# What this build will upload.
(cd "$DIST" && find . -type f ! -name "$MANIFEST" | sed 's|^\./||' | LC_ALL=C sort) > "$WORK/new"

# What the last deploy uploaded. Empty on the first deploy.
remote_cat "$MANIFEST" | LC_ALL=C sort > "$WORK/old"

if [ ! -s "$WORK/old" ]; then
  echo "First deploy to $REMOTE (no earlier file list). Files already there will be left alone:"
  remote_ls | sed 's/^/  /' | head -50
fi

# Stale = on the old list, not in this build. Only plain relative paths, never ".." or absolute.
LC_ALL=C comm -23 "$WORK/old" "$WORK/new" | grep -vE '(^/|(^|/)\.\.(/|$)|^$)' > "$WORK/stale" || true

echo "Uploading $(wc -l < "$WORK/new") file(s). Removing $(wc -l < "$WORK/stale") file(s) left from earlier deploys."
sed 's/^/  remove: /' "$WORK/stale" | head -50

if [ "$DRY_RUN" = "1" ]; then
  echo "Dry run: nothing uploaded or removed."
  exit 0
fi

upload
if [ -s "$WORK/stale" ]; then
  tr '\n' '\0' < "$WORK/stale" > "$WORK/stale0"
  remove "$WORK/stale0"
fi
put_manifest "$WORK/new"
echo "Deployed."
