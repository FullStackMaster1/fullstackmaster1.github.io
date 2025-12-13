# Overview

This is a professional coaching platform website for Rupesh Tiwari, an AWS Senior Customer Solutions Manager who provides 1-on-1 interview coaching for senior engineers, architects, TPMs, engineering managers, directors, and VPs targeting FAANG companies. The platform showcases his services, client reviews, courses, articles, and enables direct booking through WhatsApp or IGotAnOffer.

The application is a single-page React application built with modern web technologies, featuring a responsive design inspired by professional platforms like LinkedIn Learning, MasterClass, and IGotAnOffer. The site emphasizes credibility, expertise, and accessible mentorship through a polished UI with carousels, cards, and smooth animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18+ with TypeScript, using functional components and hooks throughout.

**Routing**: Client-side routing implemented with Wouter (lightweight router alternative to React Router).

**State Management**: TanStack Query (React Query) for server state management and data fetching. No global client state management library is used as the application is primarily content-display focused.

**UI Component System**: 
- shadcn/ui component library (Radix UI primitives with Tailwind styling)
- Component configuration stored in `components.json` with New York style variant
- Custom design system defined in `design_guidelines.md` following professional coaching aesthetic
- Consistent spacing using Tailwind's 4px-based scale

**Styling Approach**:
- Tailwind CSS for utility-first styling
- CSS custom properties for theming (defined in `index.css`)
- Design tokens for colors, spacing, shadows, and elevations
- Responsive breakpoints: mobile-first approach with md (768px), lg (1024px), xl (1280px)

**Key Design Patterns**:
- Carousel-based content display using Embla Carousel React
- Card-based layouts for services, reviews, courses, and projects
- Gradient backgrounds for section differentiation
- Hover elevations for interactive elements
- Badge system for categorization and status indicators

## Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**Build System**: 
- Vite for frontend bundling and development
- esbuild for server-side bundling (production)
- Custom build script in `script/build.ts` that bundles select dependencies to reduce cold start times

**Development Mode**: 
- Vite dev server integrated with Express using middleware mode
- Hot Module Replacement (HMR) enabled for fast development iterations
- Custom error overlay via Replit plugins

**Server Structure**:
- Minimal API surface - routes registered in `server/routes.ts`
- Static file serving handled by `server/static.ts`
- In-memory storage abstraction via `server/storage.ts`

**Database Strategy**:
- Drizzle ORM configured for PostgreSQL (via `drizzle.config.ts`)
- Neon serverless PostgreSQL driver (`@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` with user model as base
- Currently uses in-memory storage (`MemStorage`) with database infrastructure ready for future activation

The application prioritizes simplicity with the database layer prepared but not actively used, allowing for easy transition when persistence is needed.

## Data Layer

**Content Storage**: ALL user-facing content is stored in JSON files in `client/src/data/` directory, enabling marketing teams to update content without code changes:

**Master Profile Data** (profile.json) - Single source of truth for all personal/business information:
- `personal`: Name, title, company, full name
- `contact`: Phone (+1-609-442-4081), email, WhatsApp link, booking link, WhatsApp message template
- `brand`: Name, tagline, description
- `socialLinks`: LinkedIn (personal, newsletter, company), YouTube, GitHub, IGotAnOffer, Udemy, Pluralsight
- `stats`: Coaching years, professionals coached, success rate, rating details
- `credentials`: Education (ISB CTO Scholar), certifications (AWS, GCP, Azure)
- `descriptions`: Short, medium, long descriptions for various contexts, expertise keywords
- `careerPath`: Timeline from SDE to Senior CSM with dates and companies

**Site-Wide Content** (siteContent.json):
- `navigation`: Brand name, menu links, CTA buttons (WhatsApp, Book Session)
- `hero`: Badges, proof points, company logos, CTAs
- `seo`: Title, description, keywords, canonical URL, Open Graph image

**Section-Specific Content**:
- `about.json`: Founder story, credentials, coaching philosophy, career journey timeline
- `company.json`: FullStack Master company info, mission, founder highlight, stats, careers/hiring CTA
- `methodology.json`: 5-step coaching process with detailed descriptions
- `systemDesignPage.json`: Educational landing page content for /system-design (IFRAIL+T framework, FAQs, personas)
- `behavioralPage.json`: Educational landing page content for /behavioral-interview (STAR method, Amazon LPs, FAQs)
- `services.json`: Service offerings with session demos carousel and embedded YouTube videos
- `packages.json`: Pricing with "Investment Options" badge, package details
- `faqs.json`: Frequently asked questions
- `reviews.json`: Client testimonials with ratings and session types
- `courses.json`: Udemy and Pluralsight course listings
- `playlists.json`: YouTube playlist metadata
- `articles.json`: LinkedIn newsletter articles
- `opensource.json`: GitHub project showcases
- `whyLeadersFail.json`: Pain points for senior leaders, Engineer/SA vs Director/VP comparison table
- `successStories.json`: Verified IGotAnOffer reviews with "Got Offer" badges, verification links
- `trustMetrics.json`: Trust bar statistics and platform links
- `footer.json`: Footer links, social media icons, contact info display
- `booking.json`: Booking section content, process steps, session info
- `whatsapp.json`: WhatsApp widget messages and prompts

**Homepage Flow** (conversion-optimized for senior leaders):
1. Hero → 2. USATrustBar → 3. Executive Case Studies → 4. Why Leaders Fail → 5. TrustBar → 6. Success Stories → 7. Reviews → 8. Methodology → 9. Services → 10. Full Services → 11. Pricing → 12. Booking → 13. Webinar → 14. Articles → 15. Courses → 16. Playlists → 17. About → 18. Company → 19. FAQ

**SEO & Digital Marketing Infrastructure** (December 12, 2025):
- **Google Analytics 4**: Comprehensive tracking via `client/src/lib/analytics.ts` including scroll depth (25/50/75/90/100%), exit intent detection, time on page (30s/1m/2m/5m/10m milestones), session tracking, CTA clicks, carousel interactions, form events, video plays
- **Cookie Consent**: GDPR-compliant banner (`CookieConsent.tsx`) with Accept All/Essential Only options, localStorage persistence
- **XML Sitemap**: Updated `public/sitemap.xml` with all pages and hash anchors, proper lastmod dates
- **Robots.txt**: Enhanced `public/robots.txt` with bot-specific directives (Googlebot, Bingbot, social media crawlers)
- **Structured Data Schemas** (`SEOStructuredData.tsx`): Person, Organization, Service, FAQ, Website, Breadcrumb, Review (with 10 real reviews), HowTo (coaching process), Course, LocalBusiness

**Utility Scripts** (scripts/):
- `github-update.ts`: Deploy built site to GitHub Pages (fullstackmaster1.github.io)
- `scrape-igotanoffer-reviews.ts`: Fetch latest review stats from IGotAnOffer profile (run manually to update review count)

**JSON Update Workflow**: When role/company changes, edit only `profile.json` - all components read from this single source. No code changes required.

**Database Schema** (prepared but not active):
- PostgreSQL with Drizzle ORM
- User authentication structure defined (username/password)
- UUID-based primary keys with `gen_random_uuid()` default
- Zod schema validation integrated via `drizzle-zod`

## External Dependencies

**Third-Party UI Libraries**:
- Radix UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- Embla Carousel React for carousel functionality
- Lucide React for iconography
- React Icons for brand icons (YouTube, LinkedIn, GitHub, AWS, etc.)

**Fonts**:
- Google Fonts CDN: Inter (primary), Source Sans Pro (secondary), Architects Daughter, DM Sans, Fira Code, Geist Mono
- Configured in `client/index.html`

**Development Tools**:
- Replit-specific plugins for development experience
- TypeScript with strict mode enabled
- ESNext module system

**Potential Future Integrations** (infrastructure ready):
- PostgreSQL database via Neon serverless
- Session management (express-session with connect-pg-simple)
- Form validation (react-hook-form with Zod resolvers)
- Authentication (passport.js structure prepared)

**External Services** (linked but not integrated):
- WhatsApp Business for booking/communication
- IGotAnOffer coaching platform
- YouTube for video content
- LinkedIn for professional networking
- Udemy and Pluralsight for courses
- GitHub for open-source projects

**SEO & Social Sharing**:
- Open Graph meta tags configured
- Twitter Card meta tags for social previews
- Structured metadata for professional appearance

## Future Improvements (Reminders)

**Lead Generation Enhancement**:
- **Executive Interview Playbook PDF** - Create a 6-page guide for Directors/VPs covering what bar raisers look for at senior levels. This can be uploaded to Gumroad as a $0 product to capture emails for lead nurturing. This is a common USA startup trust-building tactic.
- Currently using WhatsApp for direct communication (more personal), but a downloadable playbook could scale lead capture

**Video Section**:
- The "Meet Your Coach" video section needs a real YouTube video. User should record a 2-minute intro video and provide the YouTube video ID to replace the placeholder.

**NDA Process**:
- NDAs are handled personally via WhatsApp/Email (professional approach)
- Internal NDA document available at `/nda-document` for printing/sending

**Review Updates Process**:
- IGotAnOffer reviews cannot be automatically scraped (site uses JavaScript rendering, pagination, and blocks automated requests)
- Script exists at `scripts/scrape-igotanoffer-reviews.ts` but doesn't reliably work
- **Manual process**: Share screenshot or review details → Add to `client/src/data/reviews.json` → Run `npx tsx scripts/github-update.ts` to deploy
- Review fields needed: name, title, company, date, rating, text, session type, gotOffer (true/false), offerCompany (if applicable)
- Reviews display in two carousels: "Success Stories" (gotOffer=true) and "More Client Reviews" (gotOffer=false), both sorted newest-first
- Recommended: Batch updates weekly or monthly to reduce overhead