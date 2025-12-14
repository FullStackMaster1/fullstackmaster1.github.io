import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Clock, Sparkles, Gift } from "lucide-react";
import { trackEvent, trackBookCall } from "@/lib/analytics";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const STORAGE_KEY = "countdown_dismissed";

function getNextSundayMidnight(): Date {
  const now = new Date();
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(23, 59, 59, 999);
  return nextSunday;
}

export default function OfferCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [targetDate] = useState(() => getNextSundayMidnight());

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsVisible(false);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
    trackEvent('countdown_dismissed', 'engagement', 'banner');
  };

  if (!isVisible || !timeLeft) return null;

  const formatNumber = (n: number) => n.toString().padStart(2, '0');

  return (
    <div 
      className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white py-3"
      data-testid="banner-countdown"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Badge className="bg-white/20 text-white border-0">
              <Gift className="w-3 h-3 mr-1" />
              Special Offer
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">
                Book 5 sessions, get <span className="text-yellow-300 font-bold">1 FREE</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-mono bg-black/20 rounded-md px-3 py-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-bold">{formatNumber(timeLeft.days)}</span>
              <span className="text-white/70">d</span>
              <span className="font-bold">{formatNumber(timeLeft.hours)}</span>
              <span className="text-white/70">h</span>
              <span className="font-bold">{formatNumber(timeLeft.minutes)}</span>
              <span className="text-white/70">m</span>
              <span className="font-bold">{formatNumber(timeLeft.seconds)}</span>
              <span className="text-white/70">s</span>
            </div>

            <Button
              size="sm"
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
              onClick={() => {
                trackBookCall('countdown-banner');
                trackEvent('countdown_cta_clicked', 'conversion', 'banner');
                window.location.href = '/book';
              }}
              data-testid="button-countdown-claim"
            >
              Claim Offer
            </Button>

            <button
              onClick={handleDismiss}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss"
              data-testid="button-countdown-dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
