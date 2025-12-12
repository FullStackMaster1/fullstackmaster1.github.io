import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VERSION = '1.0';

interface ConsentState {
  version: string;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
    
    try {
      const parsed: ConsentState = JSON.parse(consent);
      if (parsed.version !== COOKIE_CONSENT_VERSION) {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const consent: ConsentState = {
      version: COOKIE_CONSENT_VERSION,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    
    trackEvent('cookie_consent', 'compliance', analytics && marketing ? 'accept_all' : 'essential_only');
  };

  const acceptAll = () => saveConsent(true, true);
  const acceptEssential = () => saveConsent(false, false);

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm"
      data-testid="cookie-consent-banner"
    >
      <Card className="max-w-4xl mx-auto p-4 md:p-6 shadow-lg border-border/50">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={acceptEssential}
              className="flex-shrink-0"
              data-testid="button-cookie-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {showDetails && (
            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
              <div>
                <strong className="text-foreground">Essential Cookies</strong>
                <p className="text-muted-foreground">Required for basic site functionality. Always enabled.</p>
              </div>
              <div>
                <strong className="text-foreground">Analytics Cookies</strong>
                <p className="text-muted-foreground">Help us understand how visitors interact with our site (Google Analytics).</p>
              </div>
              <div>
                <strong className="text-foreground">Marketing Cookies</strong>
                <p className="text-muted-foreground">Used to track effectiveness of our marketing campaigns.</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-muted-foreground"
              data-testid="button-cookie-details"
            >
              {showDetails ? 'Hide Details' : 'Cookie Details'}
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={acceptEssential}
                data-testid="button-cookie-essential"
              >
                Essential Only
              </Button>
              <Button
                onClick={acceptAll}
                data-testid="button-cookie-accept-all"
              >
                Accept All
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center sm:text-left">
            By using this site, you agree to our{' '}
            <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>
          </p>
        </div>
      </Card>
    </div>
  );
}
