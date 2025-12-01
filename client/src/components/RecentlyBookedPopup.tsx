import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface BookingNotification {
  name: string;
  location: string;
  sessionType: string;
  timeAgo: string;
}

const recentBookings: BookingNotification[] = [
  { name: "Michael T.", location: "San Francisco, CA", sessionType: "Full Preparation Package", timeAgo: "2 hours ago" },
  { name: "Sarah K.", location: "Seattle, WA", sessionType: "System Design Deep-Dive", timeAgo: "5 hours ago" },
  { name: "David L.", location: "Austin, TX", sessionType: "Leadership Interview Prep", timeAgo: "8 hours ago" },
  { name: "Jennifer M.", location: "New York, NY", sessionType: "Full Preparation Package", timeAgo: "12 hours ago" },
  { name: "Robert C.", location: "Boston, MA", sessionType: "Mock Interview Session", timeAgo: "1 day ago" },
  { name: "Emily W.", location: "Denver, CO", sessionType: "Full Preparation Package", timeAgo: "1 day ago" },
  { name: "James P.", location: "Los Angeles, CA", sessionType: "Career Strategy Session", timeAgo: "2 days ago" },
  { name: "Amanda R.", location: "Chicago, IL", sessionType: "System Design Deep-Dive", timeAgo: "2 days ago" },
];

export default function RecentlyBookedPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingNotification | null>(null);
  const [bookingIndex, setBookingIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("booking-popup-dismissed");
    if (dismissed) {
      setHasInteracted(true);
      return;
    }

    const initialDelay = setTimeout(() => {
      showNextBooking();
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const interval = setInterval(() => {
      showNextBooking();
    }, 25000);

    return () => clearInterval(interval);
  }, [bookingIndex, hasInteracted]);

  const showNextBooking = () => {
    const randomIndex = Math.floor(Math.random() * recentBookings.length);
    setCurrentBooking(recentBookings[randomIndex]);
    setIsVisible(true);
    setBookingIndex(prev => prev + 1);
    trackEvent("social_proof_shown", "engagement", recentBookings[randomIndex].sessionType);

    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
    sessionStorage.setItem("booking-popup-dismissed", "true");
    trackEvent("social_proof_dismissed", "engagement", "popup");
  };

  const handleClick = () => {
    trackEvent("social_proof_clicked", "buy_intent", currentBooking?.sessionType || "unknown");
    window.open("https://www.igotanoffer.com/en/coaches/rupesh-tiwari", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && currentBooking && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-20 left-4 z-50 max-w-sm"
          data-testid="popup-recently-booked"
        >
          <div 
            className="bg-card border border-border rounded-lg shadow-lg p-4 cursor-pointer hover-elevate transition-all"
            onClick={handleClick}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss notification"
              data-testid="button-dismiss-booking-popup"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {currentBooking.name} just booked
                </p>
                <p className="text-sm text-primary font-medium">
                  {currentBooking.sessionType}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {currentBooking.location} • {currentBooking.timeAgo}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Click to view available slots →
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
