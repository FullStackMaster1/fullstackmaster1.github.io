import { useEffect, useRef } from 'react';
import { trackSectionView, trackConversionFunnel } from '@/lib/analytics';

type FunnelStep = 'awareness' | 'interest' | 'desire' | 'decision' | 'action';

interface SectionConfig {
  sectionName: string;
  funnelStep?: FunnelStep;
  threshold?: number;
}

export function useSectionTracking(config: SectionConfig) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackSectionView(config.sectionName);
            
            if (config.funnelStep) {
              trackConversionFunnel(config.funnelStep, config.sectionName);
            }
          }
        });
      },
      {
        threshold: config.threshold || 0.3,
        rootMargin: '0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [config.sectionName, config.funnelStep, config.threshold]);

  return sectionRef;
}
