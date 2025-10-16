# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

npm-debug.log*
yarn-debug.log*
yarn-error.log*

#!/usr/bin/env bash
# Usage: ./scripts/purge-secret.sh
# ...existing code...
# 1) Make sure working tree is clean
git status --porcelain
if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree not clean. Commit or stash changes first."
  exit 1
fi

# 2) Remove .env from index so future commits won't include it
git rm --cached .env || true
git commit -m "chore: remove tracked .env from index (will purge secret from history)"

# 3) Attempt to use git-filter-repo (fast, recommended)
if command -v git-filter-repo >/dev/null 2>&1; then
  echo "Using git-filter-repo to remove .env from all history..."
  git filter-repo --invert-paths --path .env
  echo "git-filter-repo completed."
else
  echo "git-filter-repo not found. Falling back to git filter-branch (slower)."
  # WARNING: filter-branch is slow and more error-prone; make a backup branch first
  git branch backup-before-purge
  git filter-branch --force --index-filter \
    'git rm --cached --ignore-unmatch .env' \
    --prune-empty --tag-name-filter cat -- --all
  # cleanup refs created by filter-branch
  rm -rf .git/refs/original/
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
fi

# 4) Remove any dangling blobs and prune
git for-each-ref --format="%(refname)" refs/original | xargs -r -n 1 git update-ref -d
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Purge complete locally. Now force-push cleaned branches to remote."
echo "IMPORTANT: This will rewrite remote history. Ensure collaborators are aware."
echo "To force-push main branch:"
echo "  git push origin --force --all"
echo "  git push origin --force --tags"
echo ""
echo "After force-push, rotate the exposed API key immediately and update your local .env (do NOT commit)."