import { useState } from "react";
import { SiLinkedin, SiWhatsapp } from "react-icons/si";
import { Share2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FloatingSocialShareProps {
  title?: string;
  text?: string;
}

export default function FloatingSocialShare({ 
  title = "FAANG Interview Coaching", 
  text 
}: FloatingSocialShareProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = text || title;

  const handleLinkedInShare = () => {
    trackEvent("social_share", "linkedin", title);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=600,height=600");
    setIsExpanded(false);
  };

  const handleWhatsAppShare = () => {
    trackEvent("social_share", "whatsapp", title);
    const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(whatsAppUrl, "_blank");
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-36 right-4 z-40" data-testid="floating-social-share">
      {isExpanded && (
        <div className="mb-3 bg-card rounded-lg shadow-2xl border border-border overflow-hidden w-56 animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-primary/90 to-primary p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Share2 className="w-4 h-4" />
              <span className="font-semibold text-sm">Share This Page</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              data-testid="button-share-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            <button
              onClick={handleLinkedInShare}
              className="flex items-center gap-3 w-full bg-[#0077B5] hover:bg-[#005885] text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              data-testid="button-floating-share-linkedin"
            >
              <SiLinkedin className="w-5 h-5" />
              Share on LinkedIn
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              data-testid="button-floating-share-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isExpanded 
            ? "bg-gray-500 hover:bg-gray-600" 
            : "bg-primary hover:bg-primary/90 hover:scale-110"
        }`}
        aria-label={isExpanded ? "Close share menu" : "Share this page"}
        data-testid="button-floating-share-toggle"
      >
        {isExpanded ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Share2 className="w-5 h-5 text-primary-foreground" />
        )}
      </button>
    </div>
  );
}
