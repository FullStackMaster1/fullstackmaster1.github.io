# Technical Stack Overview

Complete technology choices and architecture decisions.

---

## Frontend Stack

**Framework & Language:**
- React 18 with TypeScript (strict mode)
- JSX with automatic JSX transform
- Functional components + hooks throughout

**Routing & Navigation:**
- Wouter - Lightweight client-side router
- Wouter Link component for SPA navigation
- useLocation hook for route detection

**State Management:**
- TanStack Query v5 - Server state management
- React hooks - Local component state
- localStorage - Session persistence (voting)

**UI Component System:**
- shadcn/ui - Pre-built component library
- Radix UI primitives - Accessible components
- Tailwind CSS - Utility-first styling

**Key Libraries:**
- `react-hook-form` - Efficient form handling
- `zod` - Schema validation
- `embla-carousel` - Carousel functionality
- `lucide-react` - Icon library (600+ icons)
- `react-icons/si` - Brand/social icons
- `framer-motion` - Animation library
- `next-themes` - Dark mode support

**Build & Development:**
- Vite - Lightning-fast build tool
- HMR - Hot Module Replacement
- esbuild - JavaScript bundler

---

## Backend Stack

**Framework & Language:**
- Express.js 4.x with TypeScript
- Node.js runtime

**HTTP:**
- express.json() - JSON body parser
- express.urlencoded() - Form data parser
- CORS - Cross-origin support

**Email Service:**
- Resend - Email delivery platform
- Direct integration in `server/email.ts`
- Domain verification required

**Session Management:**
- express-session - Session middleware
- connect-pg-simple - PostgreSQL session store
- Secure session cookies

**Authentication (Prepared):**
- passport.js - Authentication strategy
- passport-local - Username/password strategy
- Ready for future implementation

**Build & Development:**
- tsx - TypeScript execution
- Node watch mode - Auto-restart on changes
- esbuild - Production bundling

---

## Database Stack

**Provider:**
- Neon - Serverless PostgreSQL
- SSD storage
- Built-in backups
- Connection pooling

**ORM:**
- Drizzle ORM - Type-safe database layer
- Drizzle Kit - Schema management
- Zero-runtime ORM (lightweight)

**Schema & Validation:**
- Drizzle schema in `shared/schema.ts`
- Zod integration via `drizzle-zod`
- drizzle-zod for insert/select types

**Tables:**
- `webinar_registrations` - User registrations
- `webinar_votes` - Voting statistics
- `users` - User accounts (prepared)

---

## Styling & Design

**CSS Framework:**
- Tailwind CSS - Utility-first CSS
- PostCSS - CSS transformations
- Custom design tokens in CSS variables
- HSL color format for theme

**Design System:**
- shadcn/ui components
- Radix UI accessibility
- Custom color palette
- Responsive design (mobile-first)
- Dark mode support

**Fonts:**
- Google Fonts CDN
- Inter (primary sans-serif)
- Source Sans Pro (secondary)
- Multiple monospace fonts available

**Icons:**
- lucide-react (main icon library)
- react-icons/si (brand logos)
- Consistent icon sizing (w-4 h-4 standard)

---

## Development Tools

**Version Control:**
- Git
- GitHub for repository hosting
- GitHub Actions for CI/CD

**Package Management:**
- npm (Node Package Manager)
- Lock file: package-lock.json

**Type Safety:**
- TypeScript 5.x
- Strict mode enabled
- Path aliases (@/, @shared/, @assets/)
- Auto JSX transform

**API Development:**
- Express routing
- Zod schema validation
- Type-safe request/response

**Testing (Available):**
- Jest compatible
- Vitest compatible
- Test IDs on all interactive elements

---

## Deployment Stack

**Hosting:**
- GitHub Pages (production)
- Replit (development)

**Domain:**
- Custom domain: fullstackmaster.net
- DNS A records to GitHub
- HTTPS automatic via GitHub

**CI/CD:**
- GitHub Actions - Automated deployment
- Auto-build on push
- Auto-deploy to gh-pages branch

**Static Assets:**
- Public folder for images/logos
- Express static middleware
- No CDN required (GitHub Pages has CDN)

---

## Architecture Patterns

### Frontend Architecture
```
Pages (Route Components)
    ↓
Components (UI & Business Logic)
    ↓
Hooks (State & Effects)
    ↓
Services (API calls via TanStack Query)
    ↓
Store (localStorage for session)
```

### Backend Architecture
```
HTTP Request
    ↓
Express Middleware (parsing, logging)
    ↓
Routes (API endpoints)
    ↓
Business Logic (email, voting)
    ↓
Storage Interface (data access)
    ↓
Database (PostgreSQL)
    ↓
HTTP Response (JSON)
```

### Data Flow
```
Frontend Form
    ↓
React Hook Form + Zod Validation
    ↓
TanStack Query Mutation
    ↓
POST /api/...
    ↓
Express Route Handler
    ↓
Zod Schema Validation
    ↓
Database Operation
    ↓
Email Service (Resend)
    ↓
JSON Response
    ↓
UI Update + Cache Invalidation
```

---

## Key Technologies by Function

| Function | Technology | Why |
|----------|-----------|-----|
| Frontend Routing | Wouter | Lightweight, SPA-optimized |
| State Management | TanStack Query | Server state specialist |
| UI Components | shadcn/ui | Accessible, customizable |
| Form Handling | react-hook-form | Performance, simplicity |
| Validation | Zod | Type-safe, runtime validation |
| Database | PostgreSQL (Neon) | Reliable, scalable |
| ORM | Drizzle | Type-safe, lightweight |
| Build Tool | Vite | Fast, modern tooling |
| Email | Resend | Reliable, developer-friendly |
| Deployment | GitHub Pages | Free, reliable, Git-integrated |

---

## Performance Optimizations

**Frontend:**
- Vite tree-shaking
- Code splitting
- HMR for dev iteration
- Lazy component loading (when used)
- Image optimization (SVG logos)

**Backend:**
- Minimal API surface
- Efficient database queries
- Connection pooling (Neon)
- Session store in database
- Email service decoupled

**Database:**
- Indexed columns
- Optimized queries via ORM
- Connection pooling
- Serverless scaling

---

## Security Features

**Input Validation:**
- Zod schema validation on all routes
- Type-safe request handling
- No raw SQL queries

**Authentication:**
- ADMIN_TOKEN for sensitive endpoints
- Session-based voting (prevents double-voting)
- No hardcoded credentials

**Data Protection:**
- Environment variables for secrets
- No API keys in code
- HTTPS enforced in production
- Secure session cookies

**Code Quality:**
- TypeScript strict mode
- No any types (strict)
- ESLint ready
- ESNext module system

---

## Version Strategy

**Frontend Dependencies:**
- React 18.x (stable LTS)
- TypeScript 5.x (latest)
- Vite (latest stable)
- Tailwind CSS (latest)

**Backend Dependencies:**
- Express 4.x (stable)
- Node 18+ (LTS)
- Drizzle latest stable
- Resend latest

**Lock Strategy:**
- package-lock.json committed
- Reproducible installs
- Version consistency across environments

---

## Comparison: Why These Choices

| Choice | Alternative | Why Chosen |
|--------|-------------|-----------|
| Wouter | React Router | Lightweight for SPA |
| TanStack Query | Redux | Specialized for server state |
| shadcn/ui | Material-UI | Customizable, smaller bundle |
| Drizzle | Prisma | Lightweight, type-safe |
| Neon | Supabase | Pure PostgreSQL, good DX |
| GitHub Pages | Vercel | Free, Git-integrated |

---

## Future Scalability

**Database:**
- PostgreSQL can scale to millions of records
- Read replicas for scaling reads
- Connection pooling already in place

**Backend:**
- Stateless design (can scale horizontally)
- Session store in database (works across instances)
- Decoupled services (email, storage)

**Frontend:**
- Static generation ready
- CDN-friendly assets
- Lazy loading patterns available

**Code Organization:**
- Clear separation of concerns
- Reusable components
- Modular API structure

---

## Monitoring & Observability

**Available:**
- Server console logs
- Browser console logs
- Resend email dashboard
- Database connection monitoring
- GitHub Actions deployment logs

**Recommended:**
- Google Analytics (optional)
- Error tracking (Sentry, etc.)
- Performance monitoring (optional)
- Database query analytics (Neon built-in)
