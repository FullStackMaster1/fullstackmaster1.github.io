import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, ArrowRight, Gift, Megaphone, Calendar } from "lucide-react";

interface Announcement {
  id: string;
  message: string;
  linkText?: string;
  linkHref?: string;
  type: "offer" | "course" | "webinar" | "news";
  active: boolean;
}

const announcements: Announcement[] = [
  {
    id: "winter-2024",
    message: "New Year Special: Book 5 sessions and get 1 FREE consultation call!",
    linkText: "Claim Offer",
    linkHref: "https://wa.me/16094424081?text=Hi%20Rupesh,%20I'm%20interested%20in%20the%20New%20Year%20special%20offer.",
    type: "offer",
    active: true,
  },
];

const typeIcons = {
  offer: Gift,
  course: Sparkles,
  webinar: Calendar,
  news: Megaphone,
};

const typeColors = {
  offer: "bg-gradient-to-r from-green-600 to-emerald-600",
  course: "bg-gradient-to-r from-primary to-primary/80",
  webinar: "bg-gradient-to-r from-purple-600 to-violet-600",
  news: "bg-gradient-to-r from-orange-500 to-amber-500",
};

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const activeAnnouncements = announcements.filter(
    (a) => a.active && !dismissed.has(a.id)
  );

  if (activeAnnouncements.length === 0) return null;

  const currentAnnouncement = activeAnnouncements[0];
  const Icon = typeIcons[currentAnnouncement.type];

  const handleDismiss = () => {
    setDismissed((prev) => new Set(prev).add(currentAnnouncement.id));
  };

  return (
    <div
      className={`${typeColors[currentAnnouncement.type]} text-white py-2 px-4 relative z-50`}
      data-testid="announcement-bar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <Icon className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <span className="text-center" data-testid="text-announcement">
          {currentAnnouncement.message}
        </span>
        {currentAnnouncement.linkText && currentAnnouncement.linkHref && (
          <a
            href={currentAnnouncement.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
            data-testid="link-announcement-cta"
          >
            {currentAnnouncement.linkText}
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white/80 hover:text-white hover:bg-white/10"
          onClick={handleDismiss}
          data-testid="button-dismiss-announcement"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
