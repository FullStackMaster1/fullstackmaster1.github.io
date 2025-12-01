import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import profile from "@/data/profile.json";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit-intent-shown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        trackEvent("exit_intent_shown", "engagement", "popup");
      }
    };

    const handleBeforeUnload = () => {
      if (!hasShown) {
        trackEvent("page_exit_attempt", "engagement", "before_unload");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent("exit_intent_closed", "engagement", "popup");
  };

  const handleCTAClick = (action: string) => {
    trackEvent("exit_intent_cta_clicked", "buy_intent", action);
    if (action === "whatsapp") {
      window.open(profile.contact.whatsappLink, "_blank");
    } else if (action === "book") {
      window.open(profile.contact.bookingLink, "_blank");
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
            data-testid="popup-exit-intent"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Close popup"
                  data-testid="button-close-exit-popup"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Wait! Before You Go...</h3>
                </div>
                <p className="text-primary-foreground/90">
                  Get a FREE 15-minute strategy call to discuss your FAANG goals
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Limited Availability</p>
                    <p className="text-xs text-muted-foreground">
                      Only 3 slots left this week for new clients
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">In this free call, you'll get:</p>
                  <ul className="space-y-2">
                    {[
                      "Honest assessment of your FAANG readiness",
                      "Identify your biggest interview blind spots",
                      "Custom 90-day preparation roadmap",
                      "No obligation - just pure value"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleCTAClick("book")}
                    data-testid="button-exit-book-call"
                  >
                    Book Free Strategy Call
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleCTAClick("whatsapp")}
                    data-testid="button-exit-whatsapp"
                  >
                    Chat on WhatsApp
                  </Button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground pt-2">
                  🇺🇸 Available EST, CST, MST & PST timezone slots
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
