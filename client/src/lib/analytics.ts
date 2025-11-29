declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export type UserIntent = 'buy_intent' | 'contact_intent' | 'browse_intent';

let gaInitialized = false;

export const initGA = () => {
  if (gaInitialized) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics not configured - add VITE_GA_MEASUREMENT_ID to enable tracking');
    return;
  }

  if (document.getElementById('ga-script')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga-script';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.id = 'ga-config';
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
  
  gaInitialized = true;
  console.log('Google Analytics initialized with ID:', measurementId);
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.log('[Analytics Debug]', { action, category, label, value });
    return;
  }
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
  
  console.log('[Analytics]', { action, category, label });
};

export const trackBookCall = (source: string) => {
  trackEvent('book_call_click', 'buy_intent', source);
};

export const trackWhatsApp = (source: string) => {
  trackEvent('whatsapp_click', 'contact_intent', source);
};

export const trackWebinarRegister = (webinarTitle: string) => {
  trackEvent('webinar_register', 'contact_intent', webinarTitle);
};

export const trackCourseClick = (platform: 'udemy' | 'pluralsight', courseTitle: string) => {
  trackEvent(`course_${platform}_click`, 'buy_intent', courseTitle);
};

export const trackPricingView = (packageName: string) => {
  trackEvent('pricing_view', 'buy_intent', packageName);
};

export const trackSocialClick = (platform: string, source: string) => {
  trackEvent(`social_${platform}_click`, 'browse_intent', `${source}_${platform}`);
};

export const trackCTAClick = (ctaName: string, destination: string) => {
  trackEvent('cta_click', 'buy_intent', ctaName, undefined);
  trackEvent('outbound_link', 'buy_intent', destination, undefined);
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', 'browse_intent', sectionName);
};

export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', 'browse_intent', videoTitle);
};

export const trackCarouselInteraction = (carouselName: string, action: 'next' | 'prev' | 'dot_click') => {
  trackEvent('carousel_interaction', 'browse_intent', `${carouselName}_${action}`);
};

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'browse_intent', `${percentage}%`, percentage);
};

export const trackEmailClick = (source: string) => {
  trackEvent('email_click', 'contact_intent', source);
};

export const trackLinkedInClick = (source: string) => {
  trackEvent('linkedin_click', 'contact_intent', source);
};

export const trackSuccessStoryView = (storyTitle: string) => {
  trackEvent('success_story_view', 'browse_intent', storyTitle);
};

export const trackReviewView = (reviewerName: string) => {
  trackEvent('review_view', 'browse_intent', reviewerName);
};

export const trackFormStart = (formName: string) => {
  trackEvent('form_start', 'contact_intent', formName);
};

export const trackFormComplete = (formName: string) => {
  trackEvent('form_complete', 'contact_intent', formName);
};
