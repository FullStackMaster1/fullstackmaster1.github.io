import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";

interface Announcement {
  id: string;
  message: string;
  highlight?: string;
  linkText?: string;
  linkHref?: string;
  active: boolean;
}

const announcements: Announcement[] = [
  {
    id: "winter-2024",
    highlight: "New Year Special",
    message: "Book 5 sessions and get 1 FREE consultation call!",
    linkText: "Claim Offer",
    linkHref: "https://wa.me/16094424081?text=Hi%20Rupesh,%20I'm%20interested%20in%20the%20New%20Year%20special%20offer.",
    active: true,
  },
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const activeAnnouncements = announcements.filter(
    (a) => a.active && !dismissed.has(a.id)
  );

  if (activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[0];

  const handleDismiss = () => {
    setDismissed((prev) => new Set(prev).add(current.id));
  };

  return (
    <div
      className="relative bg-slate-900 text-white py-3 px-4"
      data-testid="announcement-bar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <Sparkles className="w-4 h-4 flex-shrink-0 text-yellow-400" />
        {current.highlight && (
          <span className="font-semibold text-yellow-400">{current.highlight}:</span>
        )}
        <span data-testid="text-announcement">
          {current.message}
        </span>
        {current.linkText && current.linkHref && (
          <a
            href={current.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold bg-white text-slate-900 px-3 py-1 rounded-full text-xs hover:bg-yellow-400 transition-colors ml-2"
            data-testid="link-announcement-cta"
          >
            {current.linkText}
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
        <button
          onClick={handleDismiss}
          className="absolute right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
          data-testid="button-dismiss-announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
