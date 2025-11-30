import { useState } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClick = () => {
    trackEvent("free_toolkit_banner_click", "buy_intent", "sticky_banner_gumroad");
  };

  const handleClose = () => {
    trackEvent("free_toolkit_banner_close", "browse_intent", "sticky_banner");
    setIsVisible(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-2.5 text-sm md:text-base">
          <Gift className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 animate-pulse" />
          <span className="font-medium">
            <span className="hidden sm:inline">FREE: </span>
            CAMPERSO + IFRAIL+T + STAR Builder + Resume Checklist
          </span>
          <a
            href="https://rupeshtiwari.gumroad.com/l/rupesh-kit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1 bg-white text-primary font-semibold px-3 py-1 rounded-full text-xs md:text-sm hover:bg-white/90 transition-colors ml-2"
            data-testid="link-free-toolkit-banner"
          >
            Get Free Kit
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </a>
          <button
            onClick={handleClose}
            className="absolute right-2 md:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close banner"
            data-testid="button-close-banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
