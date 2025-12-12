import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { 
  trackPageView, 
  setupScrollTracking, 
  setupExitIntentTracking, 
  setupTimeTracking,
  trackSessionStart 
} from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  const hasTrackedInitial = useRef(false);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);
  
  useEffect(() => {
    trackSessionStart();
    
    const scrollCleanup = setupScrollTracking();
    if (scrollCleanup) cleanupFunctionsRef.current.push(scrollCleanup);
    
    return () => {
      cleanupFunctionsRef.current.forEach(fn => fn());
      cleanupFunctionsRef.current = [];
    };
  }, []);
  
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
  
  useEffect(() => {
    const pageName = location === '/' ? 'home' : location.replace('/', '');
    
    const exitCleanup = setupExitIntentTracking(pageName);
    const timeCleanup = setupTimeTracking(pageName);
    
    return () => {
      if (exitCleanup) exitCleanup();
      if (timeCleanup) timeCleanup();
    };
  }, [location]);
};
