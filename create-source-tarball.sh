#!/bin/bash

# Script to create source tarball for Firefox extension submission
# See https://extensionworkshop.com/documentation/publish/source-code-submission/
# Excludes: symlinks, dist directories, node_modules

VERSION="0.23.0"
TARBALL="artifacts/src/copy_selection_as_markdown-${VERSION}-src.tgz"

# Create artifacts/src directory if it doesn't exist
mkdir -p artifacts/src

# Create tarball excluding unwanted files
tar zcvf "$TARBALL" \
  --exclude='*/node_modules' \
  --exclude='*/dist' \
  --exclude='*/.git' \
  --exclude='artifacts' \
  --exclude='packages/core/test' \
  --exclude='docs/C*' \
  biome.json \
  package.json \
  pnpm-lock.yaml \
  pnpm-workspace.yaml \
  docs/FOR_AMO_REVIEWER.md \
  packages/

echo "Source tarball created: $TARBALL"