import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle, Shield, Award, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import profile from "@/data/profile.json";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit-intent-shown");
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    // Delay exit intent detection to avoid triggering during initial page interaction
    let isReady = false;
    const readyTimer = setTimeout(() => {
      isReady = true;
    }, 10000); // Wait 10 seconds before enabling exit intent

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse actually leaves top of viewport, user has scrolled, and enough time passed
      const hasScrolled = window.scrollY > 300;
      if (e.clientY <= 0 && !hasShown && isReady && hasScrolled) {
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
      clearTimeout(readyTimer);
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
      window.open(`${profile.contact.whatsappLink}?text=${encodeURIComponent("Hi Rupesh, I was on your coaching site and wanted to connect about FAANG interview preparation.")}`, "_blank");
    } else if (action === "book") {
      window.open(profile.contact.bookingLink, "_blank");
    } else if (action === "linkedin") {
      window.open(profile.socialLinks.linkedIn.personal, "_blank");
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
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            data-testid="popup-exit-intent"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Close popup"
                  data-testid="button-close-exit-popup"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/20 text-white border-0 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    4 slots left this week
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Let's Connect Personally</h3>
                <p className="text-primary-foreground/90 text-sm">
                  I personally respond to every message. Choose how you'd like to reach me:
                </p>
              </div>
              
              <div className="p-5 space-y-3">
                <button
                  onClick={() => handleCTAClick("book")}
                  className="w-full flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors group text-left"
                  data-testid="button-exit-book-call"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Book a Strategy Call</p>
                    <p className="text-xs text-muted-foreground">Free 15-min call to discuss your goals</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
                
                <button
                  onClick={() => handleCTAClick("whatsapp")}
                  className="w-full flex items-center gap-4 p-4 bg-green-500/5 hover:bg-green-500/10 rounded-lg transition-colors group text-left border border-green-500/20"
                  data-testid="button-exit-whatsapp"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <SiWhatsapp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">WhatsApp Me Directly</p>
                    <p className="text-xs text-muted-foreground">Quick response within hours</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-green-600 transition-colors" />
                </button>
                
                <button
                  onClick={() => handleCTAClick("linkedin")}
                  className="w-full flex items-center gap-4 p-4 bg-blue-500/5 hover:bg-blue-500/10 rounded-lg transition-colors group text-left border border-blue-500/20"
                  data-testid="button-exit-linkedin"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <SiLinkedin className="w-5 h-5 text-[#0077b5]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Connect on LinkedIn</p>
                    <p className="text-xs text-muted-foreground">See my posts & recommendations</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#0077b5] transition-colors" />
                </button>
                
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span>No spam ever</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-primary" />
                      <span>Verified AWS Coach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
