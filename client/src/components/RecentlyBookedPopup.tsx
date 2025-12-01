import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Award, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Highlight {
  icon: "trending" | "award" | "users";
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  { 
    icon: "trending", 
    title: "Popular This Month", 
    description: "Full Preparation Package is the most requested service" 
  },
  { 
    icon: "award", 
    title: "High Success Rate", 
    description: "85% of coached professionals receive offers" 
  },
  { 
    icon: "users", 
    title: "Senior Leaders Trust Us", 
    description: "Directors, VPs & Staff Engineers from top tech companies" 
  },
  { 
    icon: "trending", 
    title: "System Design Focus", 
    description: "Deep-dive sessions are highly recommended for L6+" 
  },
];

const iconMap = {
  trending: TrendingUp,
  award: Award,
  users: Users,
};

export default function RecentlyBookedPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<Highlight | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("highlight-popup-dismissed");
    if (dismissed) {
      setHasInteracted(true);
      return;
    }

    const initialDelay = setTimeout(() => {
      showNextHighlight();
    }, 12000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const interval = setInterval(() => {
      showNextHighlight();
    }, 30000);

    return () => clearInterval(interval);
  }, [highlightIndex, hasInteracted]);

  const showNextHighlight = () => {
    const nextIndex = highlightIndex % highlights.length;
    setCurrentHighlight(highlights[nextIndex]);
    setIsVisible(true);
    setHighlightIndex(prev => prev + 1);
    trackEvent("highlight_shown", "engagement", highlights[nextIndex].title);

    setTimeout(() => {
      setIsVisible(false);
    }, 7000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
    sessionStorage.setItem("highlight-popup-dismissed", "true");
    trackEvent("highlight_dismissed", "engagement", "popup");
  };

  const handleClick = () => {
    trackEvent("highlight_clicked", "buy_intent", currentHighlight?.title || "unknown");
    window.open("https://www.igotanoffer.com/en/coaches/rupesh-tiwari", "_blank");
  };

  if (!currentHighlight) return null;

  const IconComponent = iconMap[currentHighlight.icon];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-20 left-4 z-50 max-w-sm"
          data-testid="popup-highlight"
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
              data-testid="button-dismiss-highlight-popup"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-medium text-foreground">
                  {currentHighlight.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentHighlight.description}
                </p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Learn more →
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
