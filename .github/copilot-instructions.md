<!-- Guidance for AI coding agents working on this repository -->

# GitHub Copilot Instructions — FullStackMaster static site

Summary

- This repository is a small static website served from the `docs/` directory (GitHub Pages). Edit HTML/CSS/JS under `docs/` and push `main` to publish.

Big picture

- Static site only: there is no build system, bundler, or Node toolchain. Files under `docs/` are served as-is.
- Primary entry: `docs/index.html`. Other important pages: `docs/review.html` and embedded fragments under `docs/assets/`.
- Assets: images in `docs/assets/images`, CSS in `docs/css`, JS in `docs/js`, icons in `docs/icons`.
- Domain: site uses a CNAME (both root `CNAME` and `docs/CNAME` exist) — if changing the custom domain, update both files.

Developer workflow (concrete)

- Edit files in `docs/` locally. Preview quickly with a static server:
  - `cd docs && python3 -m http.server 8000` (open http://localhost:8000)
- The repo uses a simple git workflow shown in `README.md`:
  - `git pull; git add .; git commit -m 'updated site'; git push`
- Publishing: push to `main` branch — GitHub Pages is configured to serve the `docs/` folder.

Conventions & patterns (project-specific)

- Relative linking: most HTML uses relative paths like `css/site.css`, `js/site.js`, and `assets/images/...`. Keep links relative to files in `docs/`.
- CDN-first dependencies: Bootstrap, jQuery, AOS, Font Awesome, Google Fonts are loaded via CDN in `docs/index.html`. Avoid replacing them with local copies unless intentional.
- Minimal JS: small helper files in `docs/js` (e.g., `site.js` prevents Bootstrap carousel auto-scroll; `reviews.js` contains a small carousel scrolling loop). Prefer minimal, focused edits.
- Accessibility & SEO: meta tags and `alt` attributes are used in `docs/index.html` — follow existing patterns for social tags and `alt` text for images.

Integration & external systems

- Google Calendar scheduling is embedded in `docs/index.html` (scheduling button script). Don't remove or alter the scheduling URL unless explicitly requested.
- Social previews: `og:` and `twitter:` meta tags point to `https://fullstackmaster.net/icons/fullstackmaster.ico`. If updating icons, update meta tags accordingly.

Examples (copyable patterns)

- Carousel (reviews): modify `docs/review.html` — it uses Bootstrap carousel markup (`.carousel-item`, `.carousel-inner`, `.carousel-control-next/prev`). Small change example: to add a review, add another `<div class="carousel-item">...</div>` inside `.carousel-inner`.
- JS tweak example: `docs/js/site.js` uses `$('.carousel').on('slid.bs.carousel', ...)` to pause auto-scrolling — keep this when editing carousel behavior.

Safety and change guidance

- Make minimal, reversible changes. Since there is no build/test automation, manual browser verification is required.
- When editing domain-related files, update both `CNAME` and `docs/CNAME` and verify DNS/GitHub Pages settings outside the repo.

What not to do

- Do not introduce a Node-based build system or change folder layout without explicit owner approval.
- Do not remove external CDN scripts (Bootstrap, AOS, jQuery) unless replacing with tested equivalents.

If you need more context

- Read `docs/index.html`, `docs/review.html`, `docs/js/site.js`, and `docs/js/reviews.js` for concrete examples.
- Ask the repo owner for any intended changes to deployment (GitHub Pages settings, custom domain or redirects).

After making changes

- Locally: preview in a browser via `python3 -m http.server` and verify console/network behavior.
- Commit with the repo's convention and push to `main`. Provide a short PR or commit message describing visual/behavioral changes.

Questions for the maintainer

- Confirm whether `assets/reviews.html` (referenced by iframe in `docs/index.html`) should exist or be removed/updated.
- Any preferred commit message prefix or branching policy (e.g., create PRs vs direct pushes)?
