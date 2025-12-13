import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, CheckCircle, Gift, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";

const GUMROAD_LINK = "https://rupeshtiwari.gumroad.com/l/rupesh-kit";

export default function EmailCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("email-popup-shown");
    const alreadySubscribed = localStorage.getItem("email-subscribed");
    
    if (alreadyShown || alreadySubscribed) {
      return;
    }

    const showPopup = (source: string) => {
      if (hasShownRef.current) return;
      hasShownRef.current = true;
      setIsVisible(true);
      localStorage.setItem("email-popup-shown", "true");
      trackEvent("email_popup_shown", "lead_capture", source);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
    };

    timerRef.current = setTimeout(() => {
      showPopup("auto_timer");
    }, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        showPopup("scroll_trigger");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent("email_popup_closed", "lead_capture", "dismiss");
  };

  const handleGetGuide = () => {
    trackEvent("email_popup_click", "lead_capture", "gumroad_redirect");
    localStorage.setItem("email-subscribed", "true");
    window.open(GUMROAD_LINK, "_blank");
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
            data-testid="popup-email-capture"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  aria-label="Close popup"
                  data-testid="button-close-email-popup"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/20 text-white border-0 text-xs">
                    <Gift className="w-3 h-3 mr-1" />
                    Free Download
                  </Badge>
                  <Badge className="bg-green-500/30 text-white border-0 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    4,000+ Downloaded
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Free FAANG Interview Guide</h3>
                    <p className="text-primary-foreground/90 text-sm">
                      The exact playbook I use with coaching clients
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>5-step preparation framework for senior roles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>System design template used by Staff+ engineers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Amazon LP cheat sheet with example answers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Bar raiser expectations at Director/VP level</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGetGuide}
                  className="w-full" 
                  size="lg"
                  data-testid="button-popup-get-guide"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Get Free Guide Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Instant download • No spam • Unsubscribe anytime</span>
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
