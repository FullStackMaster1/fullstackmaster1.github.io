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

**Site-Wide Content** (siteContent.json):
- `navigation`: Brand name, menu links, CTA buttons (WhatsApp, Book Session)
- `hero`: Badges, proof points (100+ coached, 85%+ offers, 5.0 rating), company logos, CTAs

**Section-Specific Content**:
- `about.json`: Founder story, credentials, coaching philosophy
- `methodology.json`: 5-step coaching process with detailed descriptions
- `services.json`: Service offerings with session demos carousel and embedded YouTube videos
- `packages.json`: Pricing with "Investment Options" badge, package details
- `faq.json`: Frequently asked questions
- `reviews.json`: Client testimonials with ratings and session types
- `courses.json`: Udemy and Pluralsight course listings
- `playlists.json`: YouTube playlist metadata
- `articles.json`: LinkedIn newsletter articles
- `opensource.json`: GitHub project showcases
- `whyLeadersFail.json`: Pain points for senior leaders, Engineer/SA vs Director/VP comparison table, tableHeaders
- `successStories.json`: Verified IGotAnOffer reviews with "Got Offer" badges, labels, overallRating

**Homepage Flow** (conversion-optimized for senior leaders):
1. Hero → 2. TrustBar → 3. Why Leaders Fail (pain points) → 4. About → 5. Methodology → 6. Services → 7. Success Stories → 8. Reviews → 9. Pricing → 10. FAQ → 11. Booking

This approach enables easy content updates without backend changes and provides type-safe data access.

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