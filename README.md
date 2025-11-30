# Rupesh Tiwari - AWS Technical Coach

Professional coaching platform for senior engineers, architects, TPMs, and engineering managers targeting FAANG companies.

**Live Site:** [www.fullstackmaster.net](https://www.fullstackmaster.net)

## Welcome

```bash
# deploy code
git pull; git add .; git commit -m 'updated site'; git push

# run locally
python3 -m http.server 8000
# visit http://localhost:8000/docs/
```

## Project Structure

```
├── docs/                 # Static site files (served by GitHub Pages)
│   ├── index.html        # Main entry point
│   ├── 404.html          # Custom 404 page
│   ├── CNAME             # Custom domain config
│   ├── assets/           # CSS, JS, and images
│   └── *.md              # Documentation files
├── CNAME                 # Root CNAME for GitHub Pages
└── README.md             # This file
```

## Deployment

GitHub Pages is configured to serve from the `/docs` folder on the `main` branch.

**Custom Domain:** www.fullstackmaster.net

### Automatic Deployment

Push changes to `main` branch and GitHub Pages will automatically rebuild the site (usually within 2-3 minutes).

### Manual Local Testing

```bash
cd docs
python3 -m http.server 8000
# Open http://localhost:8000/
```

## Features

- 1-on-1 interview coaching for FAANG companies
- System design & behavioral interview prep
- 50+ verified 5-star reviews on IGotAnOffer
- Udemy & Pluralsight courses
- YouTube tutorials and LinkedIn newsletter

## Contact

- **Website:** [fullstackmaster.net](https://www.fullstackmaster.net)
- **Email:** rupesh@fullstackmaster.net
- **WhatsApp:** +1-609-442-4081
- **LinkedIn:** [linkedin.com/in/rupesh-tiwari](https://www.linkedin.com/in/rupesh-tiwari/)
- **Coaching:** [consult.fullstackmaster.net](https://consult.fullstackmaster.net)

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Google Analytics 4
- GitHub Pages (hosting)
