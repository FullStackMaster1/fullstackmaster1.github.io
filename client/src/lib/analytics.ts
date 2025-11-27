declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics not configured - add VITE_GA_MEASUREMENT_ID to enable tracking');
    return;
  }

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
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
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackCTAClick = (ctaName: string, destination: string) => {
  trackEvent('cta_click', 'engagement', ctaName, undefined);
  trackEvent('outbound_link', 'navigation', destination, undefined);
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', 'engagement', sectionName, undefined);
};

export const trackVideoPlay = (videoTitle: string) => {
  trackEvent('video_play', 'engagement', videoTitle, undefined);
};

export const trackCarouselInteraction = (carouselName: string, action: 'next' | 'prev' | 'dot_click') => {
  trackEvent('carousel_interaction', 'engagement', `${carouselName}_${action}`, undefined);
};
