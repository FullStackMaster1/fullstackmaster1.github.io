import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import { trackBookCall, trackWhatsApp } from "@/lib/analytics";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { contact, socialLinks } = profileData;

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 shadow-lg"
      data-testid="sticky-mobile-cta"
    >
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 flex items-center justify-center"
          asChild
        >
          <a
            href={contact.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookCall('sticky_mobile')}
            data-testid="button-sticky-book"
            className="flex items-center justify-center gap-1"
          >
            <Calendar className="w-4 h-4 flex-shrink-0 self-center" />
            <span>Book</span>
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-green-500 text-green-600 flex items-center justify-center"
          asChild
        >
          <a
            href={`${contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp('sticky_mobile')}
            data-testid="button-sticky-whatsapp"
            className="flex items-center justify-center gap-1"
          >
            <SiWhatsapp className="w-4 h-4 flex-shrink-0 self-center" />
            <span>WhatsApp</span>
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-[#0077b5] text-[#0077b5] flex items-center justify-center"
          asChild
        >
          <a
            href={socialLinks.linkedIn.personal}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-sticky-linkedin"
            className="flex items-center justify-center gap-1"
          >
            <SiLinkedin className="w-4 h-4 flex-shrink-0 self-center" />
            <span>LinkedIn</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
