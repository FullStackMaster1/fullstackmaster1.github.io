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
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 flex-shrink-0 animate-pulse" />
            <span className="font-medium text-center sm:text-left">
              <span className="hidden sm:inline">FREE: </span>
              CAMPERSO + IFRAIL+T + STAR Builder + Resume Checklist
            </span>
          </div>
          <a
            href="https://rupeshtiwari.gumroad.com/l/rupesh-kit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-1.5 bg-white text-primary font-semibold px-4 py-1.5 rounded-md text-sm border-2 border-white hover:bg-primary hover:text-white hover:border-white transition-all duration-200 min-w-[120px]"
            data-testid="link-free-toolkit-banner"
          >
            Get Free Kit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-md transition-colors"
          aria-label="Close banner"
          data-testid="button-close-banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
