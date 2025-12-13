# Overview

This project is a professional coaching platform for Rupesh Tiwari, an AWS Senior Customer Solutions Manager. It offers 1-on-1 interview coaching for senior engineering and leadership roles at FAANG companies. The platform aims to showcase his services, client testimonials, courses, and articles, facilitating direct booking via WhatsApp or IGotAnOffer. The site is a single-page React application designed for credibility and expertise through a polished, responsive UI inspired by professional learning platforms.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is a React 18+ application using TypeScript, functional components, and hooks. Wouter handles client-side routing, and TanStack Query manages server state and data fetching. The UI is built with shadcn/ui (Radix UI + Tailwind CSS), configured via `components.json` and guided by `design_guidelines.md`. Styling utilizes Tailwind CSS with CSS custom properties for theming, adopting a mobile-first responsive design. Key design patterns include Embla Carousel for content, card-based layouts, gradient backgrounds, hover elevations, and a badge system.

## Backend Architecture

The backend is an Express.js application with TypeScript on Node.js. Vite is used for frontend bundling, while esbuild handles server-side bundling for production, with a custom script to optimize cold start times. Development features a Vite dev server with HMR. The server has a minimal API, serving static files and using an in-memory storage abstraction. A PostgreSQL database strategy with Drizzle ORM and Neon serverless driver is configured, with the schema defined in `shared/schema.ts`, though currently, an in-memory solution is active for simplicity.

## Data Layer

All user-facing content is stored in JSON files within `client/src/data/`, enabling content updates without code changes. This includes a `profile.json` (master profile data), `siteContent.json` (navigation, hero, SEO), and numerous section-specific JSON files for about, methodology, services, FAQs, reviews, courses, articles, and educational landing pages (e.g., system design, AWS loop). New components and business growth features (e.g., `ClientLogosBar.tsx`, `SalaryCalculator.tsx`, `ReferralProgramSection.tsx`, `SeasonalOffersSection.tsx`) are data-driven from these JSON files. An automatic date-based seasonal offers system is implemented via `promotionalOffers.json`. SEO infrastructure includes Google Analytics 4 tracking, GDPR-compliant cookie consent, XML sitemap, robots.txt, and structured data schemas.

# External Dependencies

## Third-Party Libraries

- **UI Components**: Radix UI primitives, Embla Carousel React, Lucide React, React Icons.
- **Fonts**: Google Fonts (Inter, Source Sans Pro, Architects Daughter, DM Sans, Fira Code, Geist Mono).
- **Development**: Replit-specific plugins, TypeScript, ESNext module system.

## External Services

- **Communication/Booking**: WhatsApp Business, IGotAnOffer.
- **Content Platforms**: YouTube, LinkedIn, Udemy, Pluralsight, GitHub.
- **Analytics**: Google Analytics 4.
- **Database**: Neon serverless PostgreSQL (configured but not actively used).