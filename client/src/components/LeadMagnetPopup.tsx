import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Download, CheckCircle, X, Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("leadMagnetDismissed");
    const dismissedAt = dismissed ? parseInt(dismissed) : 0;
    const daysSinceDismissed = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);

    if (daysSinceDismissed < 7) return;

    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        trackEvent("lead_magnet_popup_shown", "conversion", "star_framework");
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const handleDownload = () => {
    trackEvent("lead_magnet_download", "conversion", "star_framework");
    window.open("https://rupeshtiwari.gumroad.com/l/rupesh-kit", "_blank");
    localStorage.setItem("leadMagnetDismissed", Date.now().toString());
    setIsOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("leadMagnetDismissed", Date.now().toString());
    trackEvent("lead_magnet_dismissed", "conversion", "star_framework");
    setIsOpen(false);
  };

  const benefits = [
    "50+ STAR story templates for Amazon LPs",
    "System design interview cheat sheet",
    "Behavioral question bank (100+ questions)",
    "Free 15-min strategy call"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-lead-magnet">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          data-testid="button-close-lead-magnet"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <Badge className="mx-auto mb-2 bg-green-500">
            <Star className="w-3 h-3 mr-1 fill-white" />
            FREE DOWNLOAD
          </Badge>
          <DialogTitle className="text-xl">
            STAR Story Framework for FAANG Interviews
          </DialogTitle>
          <DialogDescription className="text-base">
            The exact templates I use with 4,000+ coaching clients
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <Button onClick={handleDownload} className="w-full" size="lg" data-testid="button-get-framework">
          <Download className="w-4 h-4 mr-2" />
          Download Free Framework
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          Instant access - no email required
        </p>
      </DialogContent>
    </Dialog>
  );
}
