# Blog Strategy - Interview Prep vs General Tech Blog

## Current Setup
✅ **New Blog Page**: `/blog` - Focused on interview prep articles (Director/VP/AWS/Google/Microsoft)
✅ **External Blog**: `blog.rupeshtiwari.com` - Your existing 300+ tech articles

## Strategy: Hybrid Approach

### This Site's Blog (`/blog`)
**Purpose**: Interview prep and coaching-specific content
**Target Audience**: People actively preparing for interviews
**Content Types**:
- "How to Ace Your AWS Director Interview"
- "Google L6 L7 Interview Prep Guide"
- "VP Interview: Executive Presence Tips"
- "Amazon Leadership Principles for Directors"
- "System Design at Director Level"

**SEO Benefits**:
- Targets long-tail keywords: "AWS director interview prep", "Google L7 interview guide"
- Keeps users on your coaching site
- Converts readers to coaching clients

### External Blog (`blog.rupeshtiwari.com`)
**Purpose**: General tech content and tutorials
**Target Audience**: Broader tech community
**Content Types**:
- System design tutorials
- Cloud architecture guides
- Software engineering best practices
- Technical deep dives

## Implementation

### Navigation
- "Blog" link in navigation now points to `/blog` (interview prep)
- External blog linked from the blog page itself

### Content Strategy

#### Option 1: Write New Articles (Recommended)
Write 6-12 new interview prep articles specifically for this site:
- Focus on Director/VP level
- Company-specific (AWS, Google, Microsoft)
- Long-tail keyword targeting
- Include CTAs to book coaching

#### Option 2: Repurpose Existing Content
If you have interview-related articles on your external blog:
- Create shorter, more focused versions here
- Add coaching CTAs
- Optimize for interview prep keywords

#### Option 3: Link Strategy
- Keep interview prep articles here
- Link to relevant external blog posts for deeper technical content
- Example: "For more on system design patterns, see [link to external blog]"

## Current Blog Posts (Placeholders)
The blog page currently has 6 placeholder articles. You can:
1. **Write these articles** - They're SEO-optimized topics
2. **Replace with different topics** - Based on what you want to write
3. **Link to external blog** - If you already have similar content there

## Next Steps

### Immediate Actions:
1. ✅ Blog page is live at `/blog`
2. ✅ Navigation updated to point to `/blog`
3. ✅ External blog linked from blog page

### Future Actions:
1. Write actual blog post content (or link to existing articles)
2. Create individual blog post pages (`/blog/[slug]`)
3. Add blog to homepage (optional)
4. Set up RSS feed (optional)

## Individual Blog Post Pages
Currently, blog posts link to `/blog/[id]` but those pages don't exist yet.

**To create individual post pages:**
1. Create `client/src/pages/BlogPost.tsx`
2. Add route: `<Route path="/blog/:slug" component={BlogPost} />`
3. Each post can be a markdown file or JSON content

**Would you like me to:**
- Create the individual blog post page template?
- Set up markdown support for blog posts?
- Help write the actual blog post content?

## Recommendation
**Keep both blogs separate:**
- `/blog` = Interview prep (converts to coaching)
- `blog.rupeshtiwari.com` = General tech (builds authority)

This way you get SEO benefits from both without duplicate content issues.

