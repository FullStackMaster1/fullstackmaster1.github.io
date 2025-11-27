# Design Guidelines: Professional Coaching Platform

## Design Approach
**Reference-Based**: Drawing from LinkedIn Learning, MasterClass, and IGotAnOffer's professional coaching aesthetic - emphasizing credibility, expertise, and accessible mentorship.

## Layout System & Spacing
- **Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- **Container**: max-w-7xl for main content, max-w-6xl for text-heavy sections
- **Section Padding**: py-16 md:py-24 lg:py-32 for major sections, py-12 md:py-16 for subsections
- **Grid Systems**: 
  - Services: 2-column md, 3-column lg, 4-column xl grid
  - Reviews/Courses: Carousel with 1-3 visible cards based on viewport
  - YouTube Playlists: Carousel with video thumbnails

## Typography Hierarchy
**Fonts**: Inter (primary), Source Sans Pro (secondary) via Google Fonts CDN

- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold, leading-tight
- **Section Headers**: text-3xl md:text-4xl lg:text-5xl, font-bold, mb-4
- **Subsection Headers**: text-2xl md:text-3xl, font-semibold, mb-3
- **Body Text**: text-base md:text-lg, leading-relaxed, max-w-prose
- **Card Titles**: text-xl font-semibold
- **Metadata/Labels**: text-sm font-medium, uppercase tracking-wide

## Component Specifications

### Hero Section (100vh)
- Professional headshot image (left, 40% width on desktop, full-width mobile)
- Introduction content (right, 60% width)
- Name display: text-4xl md:text-5xl font-bold
- Role badges (10 coaching specialties as pill-shaped badges, wrap layout)
- CTA button group: "Book a Session" (primary) + "View Reviews" (secondary)
- Social proof indicator: "50+ 5-star reviews | AWS Senior CSM"

### Services Grid Section
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4, gap-6
- Role cards with icon (Heroicons), role name, and brief descriptor
- Hover state: subtle lift effect (transform scale)

### Reviews Carousel Section
- Swiper.js implementation with navigation arrows and dots
- Card design: p-6, rounded-lg, shadow-md
- Card content: 5-star rating display, review text (line-clamp-4), reviewer name, date, session type
- Carousel config: 1 card mobile, 2 cards tablet, 3 cards desktop, autoplay disabled
- "Load More Reviews" button below carousel

### Courses Carousel Section
**Two Sub-sections**: Udemy Courses + Pluralsight Courses
- Card design: Course thumbnail image (16:9 aspect ratio), course title, student count, rating
- Carousel config: 1 card mobile, 2 cards tablet, 3 cards desktop
- External link icon on cards

### YouTube Playlists Carousel
- Playlist cards with thumbnail (16:9), title, video count, "Watch Now" overlay
- Carousel config: 2 cards mobile, 3 cards tablet, 4 cards desktop
- Click opens playlist in new tab

### Google Calendar Booking Section
- Full-width section with gradient background treatment
- iframe embed: w-full, h-[600px] md:h-[700px], rounded-lg
- Section header: "Schedule Your Coaching Session"
- Subtext: "Book a 1-on-1 session directly on my calendar"

### Social Media Section
- Horizontal card layout: YouTube channel card + LinkedIn company card
- Cards display: icon, platform name, follower/subscriber count, "Visit" CTA
- Max-w-4xl centered container

### Footer
- Newsletter signup form (email input + subscribe button)
- Quick links: Services, Reviews, Courses, Contact
- Social media icons (YouTube, LinkedIn, Udemy, Pluralsight)
- Copyright and IGotAnOffer platform link

## Icons & Assets
**Icon Library**: Heroicons (outline style) via CDN
- Star icons for ratings
- Play button for video playlists
- Calendar icon for booking section
- Social platform icons

## Images
**Hero Image**: Professional headshot photo, high-quality, warm and approachable expression
**Course Thumbnails**: Pulled from Udemy/Pluralsight course data
**YouTube Thumbnails**: Pulled from playlist data
**Image Treatment**: Consistent rounded corners (rounded-lg), subtle shadows

## Animations & Interactions
- **Carousel Transitions**: Smooth slide animations (300ms ease-in-out)
- **Card Hovers**: Subtle lift (translateY -2px) and shadow enhancement
- **Button States**: Heroicons Button component with blur background on hero image
- **Scroll Reveals**: Fade-in on scroll for section content (Intersection Observer)
- Minimize other animations - keep professional and performant

## Data-Driven Components
All carousels and reviews load from JSON data structure:
```
reviews.json: [{name, date, rating, text, session}]
courses.json: [{platform, title, url, thumbnail, students, rating}]
playlists.json: [{title, url, thumbnail, videoCount}]
```

## Responsive Behavior
- Hero: Stacked layout mobile, side-by-side desktop
- Navigation: Hamburger menu mobile, horizontal desktop
- Carousels: Adjust visible cards per viewport
- Calendar iframe: Maintain aspect ratio, full-width mobile
- All touch-friendly tap targets (min 44px height)