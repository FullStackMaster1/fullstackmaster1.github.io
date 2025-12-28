import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Gift, CheckCircle, Download, Clock, Star, Users, FileText } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import starStoriesData from "@/data/starStories.json";
import { trackEvent, trackWhatsApp } from "@/lib/analytics";

const STORAGE_KEY = "star_stories_dismissed";
const DISMISS_DURATION_DAYS = 7;

export default function StarStoriesPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { contact, personal } = profileData;
  const { title, highlights, socialProof, urgency, cta, downloadUrl } = starStoriesData;

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    trackEvent('star_stories_dismissed', 'engagement', 'popup');
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
        const exitDismissed = localStorage.getItem("exit_intent_dismissed");
        const newsletterDismissed = localStorage.getItem("newsletter_popup_dismissed");
        const now = Date.now();
        
        if (exitDismissed && (now - parseInt(exitDismissed)) < 60000) {
          return;
        }
        if (newsletterDismissed && (now - parseInt(newsletterDismissed)) < 60000) {
          return;
        }
        
        hasTriggered = true;
        setIsVisible(true);
        trackEvent('star_stories_shown', 'engagement', 'popup');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      data-testid="popup-star-stories"
    >
      <div className="relative bg-card rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10"
          data-testid="button-star-close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-1">
                {starStoriesData.badge}
              </Badge>
              <h3 className="font-bold text-lg leading-tight">{title}</h3>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{socialProof.downloads}</span>
              <span className="text-muted-foreground">downloads</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{socialProof.rating}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {highlights.slice(0, 4).map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-800">
            <p className="text-sm italic text-muted-foreground">"{socialProof.testimonial}"</p>
            <p className="text-xs font-medium mt-1 text-amber-700 dark:text-amber-400">— {socialProof.author}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>{urgency.text}</span>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              size="lg"
              asChild
            >
              <a
                href={downloadUrl}
                onClick={() => {
                  trackEvent('star_stories_cta_clicked', 'engagement', 'popup');
                  handleDismiss();
                }}
                data-testid="button-star-download"
              >
                <Download className="w-4 h-4 mr-2" />
                {cta.buttonText}
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              asChild
            >
              <a
                href={`${contact.whatsappLink}?text=${encodeURIComponent(cta.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsApp('star-stories-popup');
                  handleDismiss();
                }}
                data-testid="button-star-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 mr-2 text-green-600" />
                {cta.secondaryButtonText}
              </a>
            </Button>
            <Button
              variant="ghost"
              onClick={handleDismiss}
              className="w-full text-muted-foreground text-sm"
              data-testid="button-star-skip"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
