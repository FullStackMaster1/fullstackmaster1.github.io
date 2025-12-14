import { useState, useEffect } from "react";
import { SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { X, Bell, Users, Sparkles } from "lucide-react";
import articlesData from "@/data/articles.json";
import { trackEvent } from "@/lib/analytics";

const POPUP_DELAY_MS = 8000;
const STORAGE_KEY = "newsletter_popup_dismissed";
const DISMISS_DURATION_DAYS = 7;

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { newsletterName, newsletterUrl } = articlesData;

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedDate = new Date(parseInt(dismissedAt));
      const now = new Date();
      const daysSinceDismissed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        return;
      }
    }

    const timer = setTimeout(() => {
      const exitDismissed = localStorage.getItem("exit_intent_dismissed");
      const now = Date.now();
      if (exitDismissed && (now - parseInt(exitDismissed)) < 30000) {
        return;
      }
      setIsAnimating(true);
      setTimeout(() => setIsVisible(true), 50);
      trackEvent('newsletter_popup_shown', 'engagement', 'popup');
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsAnimating(false), 300);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    trackEvent('newsletter_popup_dismissed', 'engagement', 'popup');
  };

  const handleSubscribe = () => {
    trackEvent('newsletter_popup_subscribe', 'conversion', 'linkedin_newsletter');
    handleDismiss();
  };

  if (!isAnimating) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-sm transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      data-testid="popup-newsletter"
    >
      <div className="bg-card border border-[#0077B5]/30 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0077B5] to-[#0066a2] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Bell className="w-4 h-4 animate-pulse" />
            <span className="font-semibold text-sm">Don't Miss Out!</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition-colors"
            data-testid="button-popup-close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center flex-shrink-0">
              <SiLinkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm mb-1">
                Subscribe to "{newsletterName}"
              </h3>
              <p className="text-xs text-muted-foreground">
                Weekly system design & interview tips from an AWS insider
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-[#0077B5]" />
              <span>5,000+ subscribers</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span>Free forever</span>
            </div>
          </div>
          
          <Button
            asChild
            className="w-full bg-[#0077B5] hover:bg-[#006097] text-white"
            size="sm"
            data-testid="button-popup-subscribe"
          >
            <a 
              href={newsletterUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleSubscribe}
            >
              <SiLinkedin className="w-4 h-4 mr-2" />
              Subscribe on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
