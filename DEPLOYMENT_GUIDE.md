# Deployment Guide

## GitHub Pages + Custom Domain Deployment

Deploy your site to production at `www.fullstackmaster.net`

---

## Quick Start

For fastest deployment, see: **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)**

Or run the setup script:
```bash
./docs/deploy.sh
```

---

## Deployment Files Included

| File | Description |
|------|-------------|
| `github-actions-deploy.yml` | GitHub Actions workflow (copy to `.github/workflows/deploy.yml`) |
| `vite.config.static.ts` | Static build configuration for reference |
| `package-scripts.json` | NPM scripts to add to package.json |
| `CNAME` | Custom domain file (copy to `public/CNAME`) |
| `404.html` | SPA routing fallback (copy to `public/404.html`) |
| `_headers` | CDN cache headers (for Netlify/Cloudflare) |
| `deploy.sh` | Automated setup script |
| `QUICK_DEPLOY.md` | Quick deployment guide |

---

## Prerequisites

- GitHub account with repository access
- Domain: `fullstackmaster.net`
- All content configured in `client/src/data/*.json`

---

## Step 1: Run Setup Script

```bash
# From project root
./docs/deploy.sh
```

This automatically:
- Creates `.github/workflows/` directory
- Copies GitHub Actions workflow
- Sets up CNAME for custom domain
- Configures SPA routing

---

## Step 2: GitHub Pages Setup

### 2.1 Initialize GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/fullstackmaster.git
git push -u origin main
```

### 2.2 Enable GitHub Pages
1. Go to GitHub repository Settings
2. Navigate to Pages section
3. Under "Build and deployment":
   - Source: GitHub Actions
   - Workflow: Deploy to GitHub Pages (or create custom)

### 2.3 Configure Custom Domain
1. In Pages settings, under "Custom domain":
   - Enter: `fullstackmaster.net`
   - GitHub will create CNAME file automatically
2. Check "Enforce HTTPS"

---

## Step 3: DNS Configuration

### Add DNS A Records

Add these four A records pointing to GitHub Pages:

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

Or add a single ALIAS/ANAME record:
```
Type: ALIAS or ANAME
Name: @
Value: your-username.github.io
```

**DNS Provider Steps:**
1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add A records as shown above
4. Save changes

**Verification:**
```bash
# Check DNS propagation (may take 24-48 hours)
nslookup fullstackmaster.net
dig fullstackmaster.net
```

---

## Step 4: Environment Setup for Production

### 4.1 Set Environment Variables

In Replit Secrets (or your deployment platform):

```
ADMIN_TOKEN=your-secure-admin-token
DATABASE_URL=postgresql://user:pass@neon.tech/db?sslmode=require
SESSION_SECRET=your-session-secret
YOUTUBE_API_KEY=your-youtube-api-key
```

### 4.2 Verify Variables Are Set
```bash
echo $ADMIN_TOKEN
echo $DATABASE_URL
# All should output values, not empty
```

---

## Step 5: Resend Email Configuration

### 5.1 Verify Domain in Resend

1. Log into Resend dashboard
2. Add domain: `fullstackmaster.net`
3. Add DNS records provided by Resend:

**SPF Record:**
```
Type: TXT
Name: _
Value: v=spf1 include:resend.com ~all
```

**DKIM Records:**
```
Type: CNAME
Name: default._domainkey
Value: [Resend-provided value]
```

**CNAME (for verification):**
```
Type: CNAME
Name: [Resend-provided]
Value: [Resend-provided]
```

### 5.2 Test Email Delivery

1. Register for a webinar on production site
2. Check inbox for confirmation email
3. Review Resend dashboard:
   - Go to Logs
   - Filter by domain
   - Verify delivery status

### 5.3 Troubleshoot Email Issues

If emails aren't arriving:
- Check Resend dashboard for bounce reports
- Verify all DNS records added correctly
- Wait 24-48 hours for DNS propagation
- Check spam folder
- Try different email addresses

---

## Step 6: Database Configuration

### 6.1 PostgreSQL Setup

Using Neon serverless:

1. Create account at https://neon.tech
2. Create new project
3. Copy connection string: `postgresql://...`
4. Set as DATABASE_URL environment variable

### 6.2 Push Schema to Production

```bash
npm run db:push
```

This syncs your Drizzle schema to production database.

### 6.3 Backup Database

Before major changes:
```bash
# Export via Neon console
# Or use pg_dump
pg_dump $DATABASE_URL > backup.sql
```

---

## Step 7: Deploy

### Option 1: GitHub Pages Auto-Deploy

1. Push code to GitHub:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

2. GitHub Actions automatically:
   - Builds the project
   - Deploys to gh-pages branch
   - Updates your site (2-3 minutes)

### Option 2: Manual Deploy

```bash
npm run build
# Upload dist/ contents to web server
```

---

## Verification Checklist

- [ ] Domain registered
- [ ] GitHub repository created
- [ ] GitHub Pages enabled
- [ ] DNS A records configured
- [ ] HTTPS enforced
- [ ] Environment variables set in production
- [ ] Database initialized
- [ ] Resend domain verified (DNS records added)
- [ ] Email test successful
- [ ] Admin dashboard accessible (`/admin?token=...`)
- [ ] Images displaying correctly
- [ ] All JSON content updated with production URLs
- [ ] OG image showing on social shares

---

## Post-Deployment

### Monitor Performance

**Resend Dashboard:**
- Email delivery rates
- Bounce/spam reports
- Engagement metrics

**GitHub:**
- Deployment history
- Build logs
- Issues or failures

**Database (Neon):**
- Connection status
- Query performance
- Storage usage

### Update Content

After deployment, you can still update content:

1. Edit JSON files in `client/src/data/`
2. Push to GitHub
3. Auto-deploys (2-3 minutes)

**No code changes needed for:**
- Profile information
- Service descriptions
- Pricing
- Reviews
- Course/playlist links
- FAQ content

---

## Scaling & Performance

### Future Optimizations

- Add CDN for static assets
- Enable image compression
- Optimize database queries
- Monitor analytics
- Add caching layers

### Database Monitoring

```bash
# Check current usage
npm run db:stats

# Monitor slow queries
# Use Neon dashboard for insights
```

---

## Troubleshooting Deployment

### Site Not Loading

1. Check DNS configuration:
```bash
nslookup fullstackmaster.net
```

2. Verify GitHub Pages settings
3. Check CNAME file in repository
4. Wait 24-48 hours for DNS propagation

### Emails Not Sending

1. Verify Resend domain setup
2. Check DNS records (SPF, DKIM, CNAME)
3. Review Resend dashboard for errors
4. Test with different email addresses

### Admin Dashboard Returns 404

1. Verify `/admin?token=YOUR_TOKEN` URL format
2. Check ADMIN_TOKEN environment variable
3. Clear browser cache
4. Try incognito window

### Images Not Displaying

1. Verify images in `public/` folder
2. Check image paths in JSON (should be `/image-name.png`)
3. Hard refresh browser (Ctrl+Shift+R)
4. Check for 404 errors in browser console

---

## Rollback

If deployment fails:

1. **Revert code:**
```bash
git revert HEAD
git push origin main
```

2. **GitHub Pages auto-reverts** (rebuilds previous version)

3. **Check deployment status** in GitHub Actions

---

## Security

**Production Best Practices:**

- [ ] HTTPS enabled (automatic with GitHub Pages)
- [ ] Environment variables not in code
- [ ] Admin token is secure random value
- [ ] Database credentials not exposed
- [ ] No API keys in JSON files
- [ ] ADMIN_TOKEN changed from development

---

## Support

For issues:
1. Check troubleshooting section
2. Review GitHub Actions logs
3. Check Resend dashboard
4. Verify environment variables
5. Test endpoints with cURL

```bash
# Test API endpoints
curl https://fullstackmaster.net/api/admin/registrations?token=YOUR_TOKEN

# Test image serving
curl -I https://fullstackmaster.net/og-image.png
```
