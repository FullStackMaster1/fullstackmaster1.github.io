import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const checkStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                           (navigator as any).standalone === true;
    
    setIsIOS(checkIOS);
    setIsStandalone(checkStandalone);

    const dismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    if (dismissed || checkStandalone) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    const timer = setTimeout(() => {
      if (!checkStandalone) {
        setShowPrompt(true);
        trackEvent("pwa_prompt_shown", "engagement", checkIOS ? "ios" : "android");
      }
    }, 15000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    trackEvent("pwa_install", outcome === "accepted" ? "conversion" : "engagement", outcome);
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
    trackEvent("pwa_prompt_dismissed", "engagement", "closed");
  };

  if (isStandalone || !showPrompt) return null;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe"
        data-testid="pwa-install-prompt"
      >
        <div className="bg-card border border-border rounded-xl shadow-lg p-4 max-w-md mx-auto">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss"
            data-testid="button-dismiss-pwa-prompt"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Download className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 pr-6">
              <h3 className="font-semibold text-foreground mb-1">
                Install FullStack Master
              </h3>
              
              {isIOS ? (
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Add to your home screen for quick access:</p>
                  <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                      1. Tap <Share className="w-4 h-4 inline" />
                    </span>
                    <span className="flex items-center gap-1">
                      2. Select <Plus className="w-4 h-4 inline" /> Add to Home Screen
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get instant access to coaching resources, courses, and booking.
                  </p>
                  <Button 
                    onClick={handleInstall} 
                    size="sm" 
                    className="w-full"
                    data-testid="button-install-pwa"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
