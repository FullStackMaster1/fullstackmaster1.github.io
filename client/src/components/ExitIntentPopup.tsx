import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Gift, CheckCircle, Download, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";

const STORAGE_KEY = "exit_intent_dismissed";
const DISMISS_DURATION_DAYS = 3;

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { contact, personal } = profileData;

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    trackEvent('exit_intent_dismissed', 'engagement', 'popup');
  }, []);

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

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasTriggered) {
        const newsletterDismissed = localStorage.getItem("newsletter_popup_dismissed");
        const now = Date.now();
        if (newsletterDismissed && (now - parseInt(newsletterDismissed)) < 30000) {
          return;
        }
        hasTriggered = true;
        setIsVisible(true);
        trackEvent('exit_intent_shown', 'engagement', 'popup');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      data-testid="popup-exit-intent"
    >
      <div className="relative bg-card rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10"
          data-testid="button-exit-close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-primary to-primary/80 p-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Wait! Don't leave empty-handed</h3>
            </div>
          </div>
          <p className="text-white/90 text-sm">
            Get my free STAR Story Framework that helped 50+ clients land FAANG offers
          </p>
        </div>

        <div className="p-5">
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">12 pre-built STAR templates for leadership principles</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Examples from real Amazon & Google interviews</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Bonus: 5 system design diagrams</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Limited time offer - usually $49</span>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              asChild
            >
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent(`Hi ${personal.firstName}, I'd like to get the free STAR Story Framework!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsApp('exit-intent');
                  handleDismiss();
                }}
                data-testid="button-exit-get-free"
              >
                <Download className="w-4 h-4 mr-2" />
                Get It Free via WhatsApp
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={handleDismiss}
              data-testid="button-exit-no-thanks"
            >
              No thanks, I'll figure it out myself
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
