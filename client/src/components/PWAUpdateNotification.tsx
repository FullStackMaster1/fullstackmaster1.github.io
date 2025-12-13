import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

interface PWAUpdateNotificationProps {
  registration: ServiceWorkerRegistration | null;
}

export default function PWAUpdateNotification({ registration }: PWAUpdateNotificationProps) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!registration) return;

    const handleUpdate = () => {
      if (registration.waiting) {
        setShowUpdate(true);
      }
    };

    if (registration.waiting) {
      setShowUpdate(true);
    }

    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            setShowUpdate(true);
          }
        });
      }
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    return () => {
      registration.removeEventListener("updatefound", handleUpdate);
    };
  }, [registration]);

  const handleUpdate = () => {
    if (!registration?.waiting) return;
    
    setUpdating(true);
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] animate-in slide-in-from-bottom-4 duration-300"
      data-testid="pwa-update-notification"
    >
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-foreground/10 rounded-full">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">New Version Available</h4>
            <p className="text-xs opacity-90 mt-1">
              A new version of the app is ready. Update now for the latest features and improvements.
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleUpdate}
                disabled={updating}
                className="text-xs"
                data-testid="button-update-app"
              >
                {updating ? (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Update Now
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-xs text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-dismiss-update"
              >
                Later
              </Button>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
