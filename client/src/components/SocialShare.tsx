import { Button } from "@/components/ui/button";
import { SiLinkedin, SiWhatsapp } from "react-icons/si";
import { Share2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface SocialShareProps {
  title: string;
  text?: string;
  url?: string;
  variant?: "inline" | "compact" | "vertical";
  showLabel?: boolean;
  className?: string;
}

export default function SocialShare({
  title,
  text,
  url,
  variant = "inline",
  showLabel = true,
  className = "",
}: SocialShareProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title;

  const handleLinkedInShare = () => {
    trackEvent("social_share", "linkedin", title);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=600");
  };

  const handleWhatsAppShare = () => {
    trackEvent("social_share", "whatsapp", title);
    const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(whatsAppUrl, "_blank");
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-1 ${className}`} data-testid="social-share-compact">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLinkedInShare}
          className="h-8 w-8 text-[#0077B5]"
          data-testid="button-share-linkedin"
        >
          <SiLinkedin className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWhatsAppShare}
          className="h-8 w-8 text-green-600"
          data-testid="button-share-whatsapp"
        >
          <SiWhatsapp className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col gap-2 ${className}`} data-testid="social-share-vertical">
        {showLabel && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </span>
        )}
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLinkedInShare}
            className="border-[#0077B5]/30 text-[#0077B5] justify-start"
            data-testid="button-share-linkedin"
          >
            <SiLinkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppShare}
            className="border-green-500/30 text-green-600 justify-start"
            data-testid="button-share-whatsapp"
          >
            <SiWhatsapp className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`} data-testid="social-share-inline">
      {showLabel && (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Share2 className="w-4 h-4" /> Share:
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedInShare}
        className="border-[#0077B5]/30 text-[#0077B5]"
        data-testid="button-share-linkedin"
      >
        <SiLinkedin className="w-4 h-4 mr-2" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        className="border-green-500/30 text-green-600"
        data-testid="button-share-whatsapp"
      >
        <SiWhatsapp className="w-4 h-4 mr-2" />
        WhatsApp
      </Button>
    </div>
  );
}

export function SectionShareButtons({ sectionName, className = "" }: { sectionName: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 pt-4 ${className}`}>
      <span className="text-xs text-muted-foreground">Found this helpful?</span>
      <SocialShare
        title={`Check out ${sectionName} from Rupesh Tiwari's FAANG Interview Coaching`}
        variant="compact"
        showLabel={false}
      />
    </div>
  );
}
