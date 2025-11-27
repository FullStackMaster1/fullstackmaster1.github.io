import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  const hasTrackedInitial = useRef(false);
  
  useEffect(() => {
    if (!hasTrackedInitial.current) {
      trackPageView(location);
      hasTrackedInitial.current = true;
      prevLocationRef.current = location;
      return;
    }
    
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);
};
