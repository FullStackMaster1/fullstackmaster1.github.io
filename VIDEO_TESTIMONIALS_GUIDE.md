# Video Testimonials Guide

## Current Status
✅ Video testimonials component is **ready and set up** with placeholders
✅ When you get actual video testimonials from clients, we just need to add the YouTube video IDs

## How to Add Real Video Testimonials

### Step 1: Get Video from Client
- Ask clients who got offers to record a 1-2 minute video testimonial
- They can record on their phone or via Zoom/Google Meet
- Upload to your YouTube channel (unlisted or public)

### Step 2: Update the Component
Edit `client/src/components/VideoTestimonialsSection.tsx`:

```typescript
const videoTestimonials = [
  {
    id: 1,
    name: "John Doe", // Real client name
    title: "Director of Engineering",
    company: "AWS",
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg", // YouTube thumbnail URL
    videoId: "VIDEO_ID", // YouTube video ID (from URL: youtube.com/watch?v=VIDEO_ID)
    quote: "Real quote from the video",
    result: "Got Director Offer at AWS",
    placeholder: false, // Change to false
    roleLevel: "director"
  },
  // ... more testimonials
];
```

### Step 3: What to Ask Clients
When requesting video testimonials, ask them to mention:
- Their role level (Director, VP, Principal Engineer)
- Company they got offer from (AWS, Google, Microsoft, etc.)
- What specific coaching helped them (system design, behavioral, leadership prep)
- The outcome (got the offer, salary increase, etc.)
- Keep it 1-2 minutes, authentic and genuine

### Example Request Message:
"Hi [Client Name]! Congratulations on your offer at [Company]! Would you be willing to record a quick 1-2 minute video testimonial sharing your experience? It would really help other professionals preparing for similar roles. You can record on your phone or we can do a quick Zoom call. Thanks!"

## Current Placeholders
The component currently shows 3 placeholder testimonials:
1. Director at AWS
2. VP at Google  
3. Principal Engineer at Microsoft

These are **intentionally generic** so you can replace them with real testimonials when available.

## Benefits of Video Testimonials
- Higher conversion rates (people trust video more than text)
- Better SEO (YouTube videos can rank in search)
- Social proof for Director/VP level roles
- Can embed on multiple pages

## No Rush!
The placeholders work fine for now. Add real videos when you have them - the component is ready!

