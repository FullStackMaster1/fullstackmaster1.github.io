import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWA_INSTALLED_KEY = "pwa-installed";
const PWA_DISMISSED_KEY = "pwa-prompt-dismissed";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const checkStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                           (navigator as any).standalone === true;
    
    setIsIOS(checkIOS);
    setIsStandalone(checkStandalone);

    // Check if already installed (persistent across sessions)
    const wasInstalled = localStorage.getItem(PWA_INSTALLED_KEY) === "true";
    
    // If running in standalone mode, mark as installed
    if (checkStandalone) {
      localStorage.setItem(PWA_INSTALLED_KEY, "true");
      setIsInstalled(true);
      return;
    }

    // Check session dismissal
    const dismissed = sessionStorage.getItem(PWA_DISMISSED_KEY);
    if (dismissed || wasInstalled) {
      setIsInstalled(wasInstalled);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Clear installed flag since beforeinstallprompt only fires when NOT installed
      localStorage.removeItem(PWA_INSTALLED_KEY);
      setIsInstalled(false);
      
      // Show prompt after receiving the event (app is installable)
      setTimeout(() => {
        setShowPrompt(true);
        trackEvent("pwa_prompt_shown", "engagement", checkIOS ? "ios" : "android");
      }, 15000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      localStorage.setItem(PWA_INSTALLED_KEY, "true");
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      trackEvent("pwa_installed", "conversion", "success");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // For iOS, show manual instructions after delay (no beforeinstallprompt event)
    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (checkIOS && !wasInstalled) {
      iosTimer = setTimeout(() => {
        setShowPrompt(true);
        trackEvent("pwa_prompt_shown", "engagement", "ios");
      }, 15000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // No install prompt available - shouldn't happen but handle gracefully
      setShowPrompt(false);
      return;
    }
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      trackEvent("pwa_install", outcome === "accepted" ? "conversion" : "engagement", outcome);
      
      if (outcome === "accepted") {
        localStorage.setItem(PWA_INSTALLED_KEY, "true");
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
      sessionStorage.setItem(PWA_DISMISSED_KEY, "true");
    } catch (error) {
      // Handle any errors during install
      console.error("PWA install error:", error);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem(PWA_DISMISSED_KEY, "true");
    trackEvent("pwa_prompt_dismissed", "engagement", "closed");
  };

  // Don't show if: already in standalone mode, already installed, or prompt not ready
  if (isStandalone || isInstalled || !showPrompt) return null;
  
  // For Android, only show if we have the deferred prompt (means browser says it's installable)
  if (!isIOS && !deferredPrompt) return null;

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
