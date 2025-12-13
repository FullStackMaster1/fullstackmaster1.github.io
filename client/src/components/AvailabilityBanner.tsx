import { motion } from "framer-motion";
import { Clock, Calendar, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import profile from "@/data/profile.json";

interface AvailabilityBannerProps {
  slotsLeft?: number;
  variant?: "inline" | "floating" | "section";
}

export default function AvailabilityBanner({ 
  slotsLeft = 3, 
  variant = "section" 
}: AvailabilityBannerProps) {
  const handleBookClick = () => {
    trackEvent("availability_banner_click", "buy_intent", `${slotsLeft}_slots_left`);
  };

  if (variant === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
        data-testid="availability-inline"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-sm font-medium text-red-600 dark:text-red-400">
          Only {slotsLeft} coaching slots left this month
        </span>
      </motion.div>
    );
  }

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-24 right-4 z-50 max-w-xs"
        data-testid="availability-floating"
      >
        <div className="bg-card border border-red-500/30 rounded-lg shadow-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Limited Availability</p>
              <p className="text-xs text-muted-foreground mb-2">
                Only {slotsLeft} coaching slots left this month
              </p>
              <Button size="sm" asChild data-testid="button-book-floating">
                <a 
                  href={profile.contact.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBookClick}
                >
                  Book Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <section 
      id="availability" 
      className="py-8 bg-gradient-to-r from-red-500/5 via-amber-500/5 to-red-500/5"
      data-testid="section-availability"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-card border border-red-500/20 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-500" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                {slotsLeft}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="destructive" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Limited Slots
                </Badge>
                <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  High Demand
                </Badge>
              </div>
              <h3 className="font-bold text-lg">
                Only {slotsLeft} Coaching Slots Left This Month
              </h3>
              <p className="text-sm text-muted-foreground">
                I personally coach each client. Limited spots ensure quality attention.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button 
              size="lg" 
              className="whitespace-nowrap"
              asChild
              data-testid="button-book-slot"
            >
              <a 
                href={profile.contact.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookClick}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reserve Your Slot
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              Free 15-min discovery call
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function MiniAvailabilityBadge({ slotsLeft = 3 }: { slotsLeft?: number }) {
  return (
    <Badge 
      variant="outline" 
      className="gap-1.5 border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/5 animate-pulse"
      data-testid="badge-availability-mini"
    >
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
      <span className="text-xs">Only {slotsLeft} slots left this month</span>
    </Badge>
  );
}
