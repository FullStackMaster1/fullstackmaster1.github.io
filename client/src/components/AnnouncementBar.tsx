import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import announcementsData from "@/data/announcements.json";

interface Announcement {
  id: string;
  message: string;
  highlight?: string;
  linkText?: string;
  linkHref?: string;
  active: boolean;
}

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const activeAnnouncements = (announcementsData as Announcement[]).filter(
    (a) => a.active && !dismissed.has(a.id)
  );

  if (activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[0];

  const handleDismiss = () => {
    setDismissed((prev) => new Set(prev).add(current.id));
  };

  return (
    <div
      className="relative bg-slate-900 text-white py-2.5 px-4"
      data-testid="announcement-bar"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0 text-yellow-400" />
            {current.highlight && (
              <span className="font-semibold text-yellow-400">{current.highlight}:</span>
            )}
            <span data-testid="text-announcement" className="text-center sm:text-left">
              {current.message}
            </span>
          </div>
          {current.linkText && current.linkHref && (
            <a
              href={current.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 font-semibold bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-md text-sm border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-400 transition-all duration-200 min-w-[120px]"
              data-testid="link-announcement-cta"
            >
              {current.linkText}
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
          data-testid="button-dismiss-announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
