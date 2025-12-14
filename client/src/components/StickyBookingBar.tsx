import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import { trackBookCall, trackWhatsApp } from "@/lib/analytics";

export default function StickyBookingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { contact } = profileData;

  useEffect(() => {
    const heroSection = document.querySelector('[data-testid="section-hero"]');
    
    if (!heroSection) {
      const handleScroll = () => {
        if (window.scrollY > 400 && !isDismissed) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isDismissed) {
          setIsVisible(!entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      data-testid="sticky-booking-bar"
    >
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    Only 3 slots left this week
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground hidden md:block">
                Book your 1-on-1 coaching session now
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  trackBookCall('sticky-bar');
                  window.location.href = '/book';
                }}
                data-testid="button-sticky-book"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                asChild
              >
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsApp('sticky-bar')}
                  data-testid="button-sticky-whatsapp"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Quick Chat
                </a>
              </Button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
                data-testid="button-sticky-dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
