# 📊 ANALYTICS IMPLEMENTATION GUIDE
## Specific Code Changes for Growth Tracking

---

## 🎯 NEW ANALYTICS EVENTS TO ADD

### 1. Enhanced Funnel Tracking

**File**: `client/src/lib/analytics.ts`

Add these new functions:

```typescript
// Enhanced Funnel Tracking
export const trackFunnelAwareness = (action: string, detail?: string) => {
  trackEvent('funnel_awareness', 'conversion', `${action}_${detail || ''}`);
};

export const trackFunnelInterest = (action: string, detail?: string) => {
  trackEvent('funnel_interest', 'conversion', `${action}_${detail || ''}`);
};

export const trackFunnelDesire = (action: string, detail?: string) => {
  trackEvent('funnel_desire', 'conversion', `${action}_${detail || ''}`);
};

export const trackFunnelDecision = (action: string, detail?: string) => {
  trackEvent('funnel_decision', 'conversion', `${action}_${detail || ''}`);
};

export const trackFunnelAction = (action: string, detail?: string) => {
  trackEvent('funnel_action', 'conversion', `${action}_${detail || ''}`);
};

// Revenue Tracking
export const trackRevenue = (packageName: string, amount: number, currency: string = 'USD') => {
  trackEvent('purchase', 'revenue', packageName, amount);
  // Also send to GA4 ecommerce
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `pkg_${Date.now()}`,
      value: amount,
      currency: currency,
      items: [{
        item_id: packageName,
        item_name: packageName,
        price: amount,
        quantity: 1
      }]
    });
  }
};

// Lead Quality Scoring
export const trackLeadQuality = (score: number, factors: string[]) => {
  trackEvent('lead_quality_score', 'lead_quality', factors.join('_'), score);
  // Set custom dimension
  if (window.gtag) {
    window.gtag('set', 'user_properties', {
      lead_quality_score: score,
      lead_quality_factors: factors.join(',')
    });
  }
};

// Engagement Quality
export const trackDeepEngagement = (type: string, contentId: string, completionPercent?: number) => {
  trackEvent('deep_engagement', 'engagement', `${type}_${contentId}`, completionPercent);
};

// User Journey Tracking
let userJourney: string[] = [];
export const trackUserJourneyStep = (pageName: string) => {
  userJourney.push(pageName);
  if (userJourney.length > 1) {
    const journey = userJourney.slice(-3).join(' -> '); // Last 3 steps
    trackEvent('user_journey', 'path', journey);
  }
};

// Return Visitor Detection
let lastVisitTime = localStorage.getItem('last_visit_time');
export const trackReturnVisitor = () => {
  if (lastVisitTime) {
    const daysSince = Math.floor((Date.now() - parseInt(lastVisitTime)) / (1000 * 60 * 60 * 24));
    trackEvent('return_visitor', 'engagement', `days_${daysSince}`);
  }
  localStorage.setItem('last_visit_time', Date.now().toString());
};

// Multi-Session Lead
let sessionCount = parseInt(localStorage.getItem('session_count') || '0');
export const trackMultiSessionLead = () => {
  sessionCount++;
  localStorage.setItem('session_count', sessionCount.toString());
  if (sessionCount > 1) {
    trackEvent('multi_session_lead', 'lead_quality', `session_${sessionCount}`);
  }
};
```

### 2. Update Components to Use New Events

**File**: `client/src/components/ReviewsCarousel.tsx`

Add tracking when reviews are viewed:

```typescript
import { trackFunnelDesire, trackDeepEngagement, trackReviewView } from "@/lib/analytics";

// In the component:
useEffect(() => {
  trackFunnelDesire('review_section_view');
}, []);

// When a review is clicked/viewed:
const handleReviewView = (reviewId: number, reviewerName: string) => {
  trackReviewView(reviewerName);
  trackDeepEngagement('review_read', `review_${reviewId}`);
};

// When filter is used:
const handleFilterChange = (filterType: string, value: string) => {
  trackEvent('review_filter', 'engagement', `${filterType}_${value}`);
};
```

**File**: `client/src/components/PricingSection.tsx`

Add revenue and package tracking:

```typescript
import { trackRevenue, trackFunnelDecision, trackPackageSelect } from "@/lib/analytics";

// When package is clicked:
const handlePackageClick = (packageName: string, price: number) => {
  trackFunnelDecision('pricing_package_click', packageName);
  trackPackageSelect(packageName, price);
};

// When pricing is viewed:
useEffect(() => {
  trackFunnelDecision('pricing_view');
}, []);
```

**File**: `client/src/pages/Book.tsx`

Add booking funnel tracking:

```typescript
import { trackFunnelAction, trackLeadGeneration, trackFormStart, trackFormComplete } from "@/lib/analytics";

// When form is started:
const handleFormStart = () => {
  trackFormStart('booking_form');
  trackFunnelAction('booking_form_start');
};

// When form is completed:
const handleFormComplete = (formData: any) => {
  trackFormComplete('booking_form');
  trackFunnelAction('booking_form_complete');
  trackLeadGeneration('booking_page', 'booking');
  
  // Track revenue if package selected
  if (formData.package && formData.price) {
    trackRevenue(formData.package, formData.price);
  }
};
```

### 3. Add Lead Scoring System

**File**: `client/src/lib/leadScoring.ts` (NEW FILE)

```typescript
import { trackLeadQuality } from './analytics';

interface LeadScoreFactors {
  pagesViewed: number;
  timeOnSite: number;
  pricingViewed: boolean;
  reviewsViewed: boolean;
  calculatorUsed: boolean;
  resourcesDownloaded: number;
  returnVisits: number;
}

export const calculateLeadScore = (factors: LeadScoreFactors): number => {
  let score = 0;
  
  // Pages viewed (max 20 points)
  score += Math.min(factors.pagesViewed * 2, 20);
  
  // Time on site (max 15 points)
  if (factors.timeOnSite > 300) score += 15; // 5+ minutes
  else if (factors.timeOnSite > 180) score += 10; // 3+ minutes
  else if (factors.timeOnSite > 60) score += 5; // 1+ minute
  
  // Pricing viewed (20 points)
  if (factors.pricingViewed) score += 20;
  
  // Reviews viewed (15 points)
  if (factors.reviewsViewed) score += 15;
  
  // Calculator used (15 points)
  if (factors.calculatorUsed) score += 15;
  
  // Resources downloaded (max 10 points)
  score += Math.min(factors.resourcesDownloaded * 5, 10);
  
  // Return visits (max 10 points)
  score += Math.min(factors.returnVisits * 5, 10);
  
  return Math.min(score, 100); // Cap at 100
};

export const trackLeadScore = (factors: LeadScoreFactors) => {
  const score = calculateLeadScore(factors);
  const factorList = Object.entries(factors)
    .filter(([_, value]) => value === true || (typeof value === 'number' && value > 0))
    .map(([key, _]) => key);
  
  trackLeadQuality(score, factorList);
  
  // Store in localStorage for retargeting
  localStorage.setItem('lead_score', score.toString());
  localStorage.setItem('lead_factors', JSON.stringify(factors));
  
  return score;
};
```

### 4. Add User Journey Tracking Hook

**File**: `client/src/hooks/useUserJourney.ts` (NEW FILE)

```typescript
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackUserJourneyStep, trackReturnVisitor, trackMultiSessionLead } from '@/lib/analytics';

export const useUserJourney = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Track page in journey
    const pageName = location === '/' ? 'homepage' : location.replace('/', '');
    trackUserJourneyStep(pageName);
    
    // Track return visitor
    trackReturnVisitor();
    
    // Track multi-session
    trackMultiSessionLead();
  }, [location]);
};
```

**Update**: `client/src/App.tsx`

```typescript
import { useUserJourney } from '@/hooks/useUserJourney';

function Router() {
  useAnalytics();
  useUserJourney(); // Add this
  
  // ... rest of component
}
```

### 5. Add Scroll Depth Tracking Enhancement

**File**: `client/src/lib/analytics.ts`

Enhance existing scroll tracking:

```typescript
// Enhanced scroll depth with section tracking
let scrollDepthTracked = { 25: false, 50: false, 75: false, 90: false, 100: false };
let sectionsViewed: Set<string> = new Set();

export const setupScrollTracking = () => {
  if (typeof window === 'undefined') return;
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    // Track depth milestones
    const thresholds = [25, 50, 75, 90, 100] as const;
    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !scrollDepthTracked[threshold]) {
        scrollDepthTracked[threshold] = true;
        trackScrollDepth(threshold);
        
        // Also track as funnel progress
        if (threshold >= 75) {
          trackFunnelDesire('page_scroll_75_percent');
        }
        if (threshold >= 90) {
          trackFunnelDecision('page_scroll_90_percent');
        }
      }
    });
    
    // Track section views
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => {
      const sectionId = section.getAttribute('data-section');
      if (sectionId && !sectionsViewed.has(sectionId)) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          sectionsViewed.add(sectionId);
          trackSectionView(sectionId);
        }
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};
```

### 6. Add Section Data Attributes

**File**: `client/src/pages/Home.tsx`

Add `data-section` attributes to all sections:

```typescript
<section id="hero" data-section="hero">
  <HeroSection />
</section>

<section id="trust" data-section="trust">
  <USATrustBar />
</section>

<section id="reviews" data-section="reviews">
  <ReviewsCarousel />
</section>

// ... etc for all sections
```

### 7. Add GA4 Custom Dimensions

**File**: `client/src/lib/analytics.ts`

Add custom dimension tracking:

```typescript
export const setUserProperties = (properties: Record<string, string | number>) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('set', 'user_properties', properties);
  
  // Also set as custom dimensions
  Object.entries(properties).forEach(([key, value]) => {
    window.gtag('set', `custom_${key}`, value);
  });
};

// Usage examples:
export const setUserRoleLevel = (role: 'sr_manager' | 'director' | 'vp' | 'sa') => {
  setUserProperties({ user_role_level: role });
};

export const setTargetCompany = (company: string) => {
  setUserProperties({ target_company: company });
};

export const setLeadScore = (score: number) => {
  setUserProperties({ lead_score: score });
};
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Core Analytics (Week 1)
- [ ] Add funnel tracking functions
- [ ] Add revenue tracking
- [ ] Add lead scoring system
- [ ] Update ReviewsCarousel with tracking
- [ ] Update PricingSection with tracking
- [ ] Update Book page with tracking

### Phase 2: Engagement Tracking (Week 2)
- [ ] Add user journey tracking hook
- [ ] Enhance scroll depth tracking
- [ ] Add section view tracking
- [ ] Add deep engagement tracking
- [ ] Add return visitor tracking

### Phase 3: Custom Dimensions (Week 3)
- [ ] Set up GA4 custom dimensions
- [ ] Add user property tracking
- [ ] Add lead score tracking
- [ ] Add target company tracking
- [ ] Add role level tracking

### Phase 4: Testing & Validation (Week 4)
- [ ] Test all events in GA4 DebugView
- [ ] Verify custom dimensions
- [ ] Check conversion goals
- [ ] Validate revenue tracking
- [ ] Create analytics dashboard

---

## 🎯 GA4 SETUP INSTRUCTIONS

### 1. Create Custom Dimensions in GA4

Go to Admin > Custom Definitions > Custom Dimensions:

1. **user_role_level** (User-scoped)
   - Description: Role level of user (Sr Manager, Director, VP, SA)

2. **target_company** (User-scoped)
   - Description: Target company user is interested in

3. **lead_score** (User-scoped)
   - Description: Lead quality score (0-100)

4. **session_type_interest** (Event-scoped)
   - Description: Type of session user is interested in

5. **package_name** (Event-scoped)
   - Description: Package name for revenue tracking

### 2. Create Conversion Events

Go to Admin > Events > Mark as conversion:

1. `funnel_action` (when booking_form_complete)
2. `purchase` (when revenue is tracked)
3. `qualify_lead` (when WhatsApp is clicked)
4. `generate_lead` (when email is captured)

### 3. Create Audiences

1. **High-Intent Leads**: lead_score >= 70
2. **Pricing Viewers**: funnel_decision with pricing_view
3. **Return Visitors**: return_visitor event
4. **Review Engagers**: review_view event
5. **Calculator Users**: calculator_use event

### 4. Set Up Reports

Create custom reports for:
- Funnel visualization
- Lead quality distribution
- Revenue by package
- User journey paths
- Conversion by source

---

## 📊 EXPECTED RESULTS

After implementing these analytics:

1. **Better Lead Qualification**: Know which visitors are most likely to convert
2. **Funnel Optimization**: Identify where users drop off
3. **Revenue Tracking**: Accurate revenue attribution
4. **Retargeting**: Target high-intent visitors who didn't convert
5. **Content Optimization**: Know which content drives conversions

---

## 🚀 NEXT STEPS

1. Implement Phase 1 (Core Analytics)
2. Test in GA4 DebugView
3. Set up custom dimensions in GA4
4. Create conversion events
5. Build custom reports
6. Analyze data weekly
7. Optimize based on insights

Good luck! 📈

