import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share, Plus, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWA_INSTALLED_KEY = "pwa-installed";
const PWA_LAST_PROMPT_KEY = "pwa-last-prompt";
const PROMPT_INTERVAL_HOURS = 24;

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const checkStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                           (navigator as any).standalone === true;
    
    setIsIOS(checkIOS);
    setIsMobile(checkMobile);
    setIsStandalone(checkStandalone);

    // Check if already installed (persistent across sessions)
    const wasInstalled = localStorage.getItem(PWA_INSTALLED_KEY) === "true";
    
    // If running in standalone mode, mark as installed
    if (checkStandalone) {
      localStorage.setItem(PWA_INSTALLED_KEY, "true");
      setIsInstalled(true);
      return;
    }

    // Check if we should show prompt based on time interval (always remind on mobile)
    const lastPrompt = localStorage.getItem(PWA_LAST_PROMPT_KEY);
    const now = Date.now();
    const shouldShowAgain = !lastPrompt || 
      (now - parseInt(lastPrompt)) > (PROMPT_INTERVAL_HOURS * 60 * 60 * 1000);

    if (wasInstalled) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      localStorage.removeItem(PWA_INSTALLED_KEY);
      setIsInstalled(false);
      
      // Show prompt immediately on mobile if enough time has passed
      if (checkMobile && shouldShowAgain) {
        setTimeout(() => {
          setShowPrompt(true);
          trackEvent("pwa_prompt_shown", "engagement", checkIOS ? "ios" : "android");
        }, 3000);
      }
    };

    const handleAppInstalled = () => {
      localStorage.setItem(PWA_INSTALLED_KEY, "true");
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      trackEvent("pwa_installed", "conversion", "success");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // For iOS, show manual instructions after delay
    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (checkIOS && !wasInstalled && shouldShowAgain) {
      iosTimer = setTimeout(() => {
        setShowPrompt(true);
        trackEvent("pwa_prompt_shown", "engagement", "ios");
      }, 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
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
      localStorage.setItem(PWA_LAST_PROMPT_KEY, Date.now().toString());
    } catch (error) {
      console.error("PWA install error:", error);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem(PWA_LAST_PROMPT_KEY, Date.now().toString());
    trackEvent("pwa_prompt_dismissed", "engagement", "closed");
  };

  // Don't show if: already in standalone mode, already installed, or prompt not ready
  if (isStandalone || isInstalled || !showPrompt) return null;
  
  // For Android, only show if we have the deferred prompt
  if (!isIOS && !deferredPrompt) return null;

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
        <div className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground rounded-xl shadow-2xl p-4 max-w-md mx-auto border border-primary-foreground/20">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-primary-foreground/70 hover:text-primary-foreground"
            aria-label="Dismiss"
            data-testid="button-dismiss-pwa-prompt"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1 pr-6">
              <h3 className="font-bold text-lg mb-1">
                Install Our App
              </h3>
              
              {isIOS ? (
                <div className="text-sm">
                  <p className="mb-3 opacity-90">Get quick access to coaching resources anytime!</p>
                  <div className="flex flex-col gap-2 text-xs bg-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <span className="flex items-center gap-1">
                        Tap <Share className="w-4 h-4 inline" /> Share button
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <span className="flex items-center gap-1">
                        Select <Plus className="w-4 h-4 inline" /> "Add to Home Screen"
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm opacity-90 mb-3">
                    Get instant access to coaching, courses & booking - works offline too!
                  </p>
                  <Button 
                    onClick={handleInstall} 
                    size="default" 
                    variant="secondary"
                    className="w-full font-bold"
                    data-testid="button-install-pwa"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Install Free App
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
