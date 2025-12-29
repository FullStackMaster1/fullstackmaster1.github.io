# Running This Project in Cursor (or VS Code)

## Prerequisites

- **Node.js 20+** (run `node --version` to check)
- **npm** (comes with Node.js)
- **Git** (for pushing to GitHub)

## Quick Start

### 1. Clone or Download

If downloading from Replit, you'll have all the files already.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root folder:

```env
VITE_GA_MEASUREMENT_ID=G-SJ08J6PQ7M
```

(Replace with your Google Analytics ID, or leave as-is to use the existing one)

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at **http://localhost:5000**

## Building for Production

### Build the site:

```bash
npm run build
```

This creates production files in `dist/public/`

## Deploying to GitHub Pages

### Option 1: Manual Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy built files to docs folder:
   ```bash
   rm -rf docs
   cp -R dist/public docs
   ```

3. Add CNAME for custom domain:
   ```bash
   echo "www.fullstackmaster.net" > docs/CNAME
   ```

4. Commit and push:
   ```bash
   git add docs
   git commit -m "Deploy: your message here"
   git push
   ```

### Option 2: Use the Deploy Script

Run the included script:

```bash
./deploy.sh
```

## Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # UI components (Quiz, Calculator, etc.)
│   │   ├── data/          # JSON content files
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities (analytics, API)
│   └── index.html
├── server/                 # Backend Express server
├── shared/                 # Shared types/schemas
├── scripts/               # Build/deploy scripts
└── docs/                  # GitHub Pages deployment folder
```

## Key Files to Customize

| File | What to Change |
|------|----------------|
| `client/src/data/profile.json` | Your name, bio, links |
| `client/src/data/siteContent.json` | Navigation, hero text |
| `client/src/data/services.json` | Your coaching packages |
| `client/src/data/reviews.json` | Client testimonials |
| `client/public/star-stories-guide.pdf` | Your PDF lead magnet |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID |
| `DATABASE_URL` | No | Only if using PostgreSQL |
| `SESSION_SECRET` | No | Only if using sessions |

## Removing Replit-Specific Files

You can safely delete these files if not using Replit:

```bash
rm -f .replit replit.nix
rm -rf scripts/push-to-github.ts scripts/check-*.ts
```

## Troubleshooting

### Port 5000 in use
Edit `vite.config.ts` and change the port, or kill the process using port 5000.

### Build fails
Make sure you're using Node 20+:
```bash
node --version  # Should be v20.x.x or higher
```

### TypeScript errors
Run:
```bash
npm run check
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Build**: Vite
- **Routing**: Wouter
- **State**: TanStack Query
