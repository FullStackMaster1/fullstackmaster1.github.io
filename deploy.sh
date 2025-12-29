#!/bin/bash

# Deploy script for GitHub Pages
# Run this after making changes to deploy to your live site

set -e

echo "Building production files..."
npm run build

echo "Preparing docs folder..."
rm -rf docs
mkdir -p docs
cp -R dist/public/* docs/

echo "Adding CNAME for custom domain..."
echo "www.fullstackmaster.net" > docs/CNAME

echo "Files ready in /docs folder"
echo ""
echo "To complete deployment, run:"
echo "  git add docs"
echo "  git commit -m 'Deploy: your message'"
echo "  git push"
echo ""
echo "Or run: git add docs && git commit -m 'Deploy update' && git push"
