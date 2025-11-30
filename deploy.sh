#!/bin/bash
# Deployment Setup Script for GitHub Pages
# Run this script from the project root directory

set -e

echo "==================================="
echo "Full Stack Master - Deploy Setup"
echo "==================================="
echo ""

# Create directories
echo "[1/5] Creating directories..."
mkdir -p .github/workflows
mkdir -p public

# Copy workflow file
echo "[2/5] Copying GitHub Actions workflow..."
cp docs/github-actions-deploy.yml .github/workflows/deploy.yml

# Copy CNAME file
echo "[3/5] Setting up custom domain..."
cp docs/CNAME public/CNAME

# Copy 404.html for SPA routing
echo "[4/5] Setting up SPA routing..."
cp docs/404.html public/404.html

# Display next steps
echo "[5/5] Setup complete!"
echo ""
echo "==================================="
echo "NEXT STEPS:"
echo "==================================="
echo ""
echo "1. Add build script to package.json:"
echo '   "build:static": "vite build"'
echo ""
echo "2. Initialize git and push:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/fullstackmaster.git"
echo "   git push -u origin main"
echo ""
echo "3. Configure GitHub Pages:"
echo "   - Settings → Pages → Source: GitHub Actions"
echo "   - Custom domain: www.fullstackmaster.net"
echo ""
echo "4. Configure DNS at your domain registrar"
echo "   (See docs/QUICK_DEPLOY.md for details)"
echo ""
echo "==================================="
