# Quick Deploy to GitHub Pages

## One-Time Setup (5 minutes)

### Step 1: Copy Files to Your Repository

```bash
# Create GitHub Actions workflow directory
mkdir -p .github/workflows

# Copy workflow file
cp docs/github-actions-deploy.yml .github/workflows/deploy.yml

# Copy CNAME for custom domain
cp docs/CNAME public/CNAME

# Copy 404.html for SPA routing
cp docs/404.html public/404.html
```

### Step 2: Add Build Script

Add this script to your `package.json` scripts section:

```json
{
  "scripts": {
    "build:static": "vite build"
  }
}
```

### Step 3: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Full Stack Master coaching site"

# Create repository on GitHub first, then:
git remote add origin https://github.com/fullstackmaster1/fullstackmaster.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. Custom domain: `www.fullstackmaster.net`
5. Check "Enforce HTTPS"

### Step 5: Configure DNS

Add these records at your domain registrar:

**For www.fullstackmaster.net:**
```
Type: CNAME
Name: www
Value: fullstackmaster1.github.io
TTL: 3600
```

**For fullstackmaster.net (apex domain):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

---

## Deploy Updates

After making changes, just push to GitHub:

```bash
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions automatically builds and deploys (takes ~2 minutes).

---

## Files Reference

| File | Purpose | Copy To |
|------|---------|---------|
| `docs/github-actions-deploy.yml` | GitHub Actions workflow | `.github/workflows/deploy.yml` |
| `docs/CNAME` | Custom domain config | `public/CNAME` |
| `docs/404.html` | SPA routing fallback | `public/404.html` |
| `docs/vite.config.static.ts` | Static build config | (optional, for reference) |
| `docs/_headers` | CDN cache headers | (optional, for Netlify/Cloudflare) |

---

## Verify Deployment

1. **Check build status**: GitHub → Actions tab
2. **Test site**: Visit https://www.fullstackmaster.net
3. **Verify images**: All thumbnails should load
4. **Test links**: Click courses, check external URLs

---

## Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Verify all dependencies installed
- Run `npm run build:static` locally first

### Site Shows 404
- Wait 10 minutes for DNS propagation
- Check CNAME file is in `public/` folder
- Verify GitHub Pages settings

### Images Not Loading
- Ensure images are in `public/` folder
- Check paths in JSON files start with `/`
- Hard refresh browser (Ctrl+Shift+R)

### Custom Domain Not Working
- Verify DNS records are correct
- Wait 24-48 hours for full propagation
- Check GitHub Pages shows "DNS check successful"
