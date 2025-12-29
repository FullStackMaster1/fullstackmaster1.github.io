import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Shield } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function CCPABanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is in California (simplified - in production, use geolocation API)
    const dismissed = localStorage.getItem('ccpa_banner_dismissed');
    const isCalifornia = navigator.language.includes('en-US'); // Simplified check
    
    // Show for all USA users (CCPA applies to California, but good practice to show to all)
    if (!dismissed) {
      setIsVisible(true);
      trackEvent('ccpa_banner_shown', 'compliance', 'california');
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('ccpa_banner_dismissed', Date.now().toString());
    setIsVisible(false);
    trackEvent('ccpa_banner_dismissed', 'compliance', 'california');
  };

  const handleDoNotSell = () => {
    trackEvent('ccpa_do_not_sell_click', 'compliance', 'california');
    window.location.href = '/privacy-policy#ccpa';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white p-4 shadow-lg border-t-2 border-blue-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold mb-1">Your Privacy Rights (CCPA)</p>
            <p className="text-blue-100">
              California residents: You have the right to know, delete, and opt-out of the sale of your personal information.
              <a 
                href="/privacy-policy#ccpa" 
                className="underline ml-1 hover:text-white"
                onClick={handleDoNotSell}
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDoNotSell}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Do Not Sell My Info
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

