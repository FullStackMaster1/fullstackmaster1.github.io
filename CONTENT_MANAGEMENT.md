# Content Management Guide

## Zero-Code Content Updates

All website content is stored in JSON files in `client/src/data/`. Update content without touching code.

---

## Master Profile (`profile.json`)

Central source for all personal/business information. Update once, use everywhere.

```json
{
  "personal": {
    "firstName": "Rupesh",
    "lastName": "Tiwari",
    "fullName": "Rupesh Tiwari",
    "title": "AWS Senior Customer Solutions Manager",
    "company": "Amazon Web Services"
  },
  "contact": {
    "phone": "+1-609-442-4081",
    "email": "rupesh@fullstackmaster.net",
    "whatsappLink": "https://wa.me/16094424081",
    "bookingLink": "https://bit.ly/book-rupesh"
  },
  "brand": {
    "name": "FullStack Master",
    "tagline": "Expert FAANG Interview Coaching",
    "description": "15+ years coaching senior leaders..."
  },
  "stats": {
    "coachingYears": 15,
    "professionalsCoded": 4000,
    "successRate": 85,
    "rating": 5.0,
    "reviews": 50
  }
}
```

---

## Site Content (`siteContent.json`)

Navigation, hero section, SEO, global CTAs.

**Key Sections:**
- `seo` - Title, description, keywords, OpenGraph
- `navigation` - Links, brand name, CTA buttons
- `hero` - Title, description, badges, buttons

---

## Courses (`courses.json`)

Udemy and Pluralsight courses with thumbnails.

```json
{
  "udemy": [
    {
      "id": 1,
      "title": "Azure DevOps for Beginners",
      "url": "https://www.udemy.com/course/...",
      "thumbnail": "/azure-devops-course.png",
      "students": 15000,
      "rating": 4.6,
      "platform": "udemy"
    }
  ],
  "pluralsight": [...]
}
```

**Thumbnail Strategy:**
- Udemy: Custom thumbnails in `public/*-course.png`
- Pluralsight: External URLs (from platform)
- Missing? System auto-generates fallback

---

## YouTube Playlists (`playlists.json`)

YouTube playlist metadata with custom thumbnails.

```json
[
  {
    "id": 1,
    "title": "AWS Interview Tips",
    "url": "https://www.youtube.com/@FullStackMaster/playlists",
    "thumbnail": "/aws-interview-tips.png",
    "videoCount": 25,
    "description": "Essential tips for AWS technical interviews"
  }
]
```

**Thumbnail Locations:**
- All playlists have custom thumbnails in `public/*.png`
- Format: `/playlist-name-thumbnail.png`

---

## Services (`services.json`)

Coaching services and methodologies.

```json
{
  "badge": "What We Fix Together",
  "title": "Where Senior Leaders Get Stuck",
  "services": [
    {
      "id": "system-design",
      "title": "System Design for Leaders",
      "description": "Architecture thinking at scale...",
      "icon": "Zap",
      "youtubeVideoId": "kCwlvfoR8nA"
    }
  ]
}
```

---

## Pricing (`packages.json`)

Coaching package details and investment options.

```json
{
  "badge": "Your Investment",
  "title": "Two Paths to Your Offer",
  "packages": [
    {
      "id": "quick-tune",
      "name": "Quick Tune-Up",
      "price": 141,
      "duration": "1 hour",
      "features": ["Feature 1", "Feature 2"],
      "cta": "Book Now"
    }
  ]
}
```

---

## Reviews (`reviews.json`)

Client testimonials with ratings and session types.

```json
{
  "title": "What Happens After We Work Together",
  "reviews": [
    {
      "name": "Jane Smith",
      "role": "Senior Manager at Google",
      "rating": 5,
      "text": "Rupesh helped me identify my blind spots...",
      "sessionType": "System Design"
    }
  ]
}
```

---

## FAQ (`faqs.json`)

Frequently asked questions.

```json
{
  "badge": "Common Questions",
  "title": "Before We Start",
  "faqs": [
    {
      "question": "How many sessions do I need?",
      "answer": "It depends on your timeline..."
    }
  ]
}
```

---

## Other Content Files

| File | Content |
|------|---------|
| `methodology.json` | 5-step coaching process |
| `about.json` | Founder story & career timeline |
| `whyLeadersFail.json` | Pain points & comparison table |
| `successStories.json` | IGotAnOffer verified reviews |
| `articles.json` | LinkedIn newsletter articles |
| `webinars.json` | Webinar information |
| `booking.json` | Booking section content |
| `footer.json` | Footer links & social media |
| `trustMetrics.json` | Trust bar statistics |

---

## Update Workflow

### Step 1: Edit JSON File
```bash
# Example: Update pricing in packages.json
# Change price from 141 to 150
```

### Step 2: Changes Reflect Immediately
- No restart needed for JSON changes
- Refresh browser to see updates
- Changes live in seconds

### Step 3: Deploy to Production
```bash
git add client/src/data/packages.json
git commit -m "Update coaching package pricing"
git push origin main
```

Auto-deployment via GitHub Actions (2-3 minutes)

---

## Update Scenarios

### Scenario: Change Company Role
1. Edit `profile.json` → `personal.title`
2. All pages auto-update with new title
3. Email signatures update automatically

### Scenario: Add New Review
1. Edit `reviews.json` → add to `reviews[]`
2. Review appears on homepage instantly
3. No code deploy needed

### Scenario: Update Course List
1. Edit `courses.json` → update Udemy/Pluralsight arrays
2. Courses carousel updates automatically
3. New courses visible immediately

### Scenario: Change Pricing
1. Edit `packages.json` → modify price/features
2. Pricing section updates automatically
3. No backend changes needed

---

## Best Practices

### Content Quality
- Keep descriptions concise (50-200 characters)
- Use action-oriented language ("Book now", "Find blind spot")
- Include specific metrics (ratings, years coached)
- Use consistent tone across sections

### Links & URLs
- External links: Use absolute URLs (https://...)
- Internal links: Use relative paths (#section)
- Always test links after updating

### Images & Icons
- OG image: `public/og-image.png` (1200x630px)
- Course thumbnails: `public/*-course.png`
- Playlist thumbnails: `public/*-*.png`
- Icons: Reference by name (Zap, Award, Users, etc.)

### SEO Optimization
- Page title: Include main keyword + brand (max 60 chars)
- Meta description: Summarize content (120-160 chars)
- Keywords: Relevant terms separated by commas
- og:image: Ensure correct path and size

---

## File Locations

```
client/src/data/
├── profile.json              # Master profile
├── siteContent.json          # Global navigation & hero
├── courses.json              # Udemy & Pluralsight
├── playlists.json            # YouTube playlists
├── services.json             # Coaching services
├── packages.json             # Pricing
├── reviews.json              # Client testimonials
├── methodology.json          # 5-step process
├── about.json                # Founder story
├── faqs.json                 # FAQ items
├── whyLeadersFail.json       # Pain points
├── successStories.json       # IGotAnOffer reviews
├── articles.json             # LinkedIn articles
├── webinars.json             # Webinar info
├── booking.json              # Booking section
└── footer.json               # Footer content

public/
├── og-image.png              # Social media preview
├── azure-devops-course.png   # Udemy thumbnails
├── angular-architecture-course.png
├── rxjs-angular-course.png
├── ngrx-course.png
├── aws-interview-tips.png    # YouTube thumbnails
├── system-design-shorts.png
├── devops-fundamentals.png
├── angular-best-practices.png
├── leadership-principles.png
└── career-growth-tips.png
```

---

## Troubleshooting Content Updates

### Changes Not Showing
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check JSON file was saved correctly

### JSON Syntax Error
- Validate JSON at jsonlint.com
- Check for missing commas or quotes
- Look for trailing commas in arrays

### Images Not Appearing
- Verify image file in `public/`
- Check path: should be `/image-name.png`
- Verify image file size (<1MB recommended)

---

## Validation

Before deploying, verify:
1. JSON is valid (no syntax errors)
2. All URLs are correct and accessible
3. All images exist and load
4. No sensitive information in files
5. Consistent tone and messaging
