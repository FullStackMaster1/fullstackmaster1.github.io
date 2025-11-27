import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import siteContent from "@/data/siteContent.json";
import { trackCTAClick } from "@/lib/analytics";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { hero } = siteContent;

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
          className="flex-1"
          asChild
        >
          <a
            href={hero.buttons.primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('sticky_book_call', hero.buttons.primaryLink)}
            data-testid="button-sticky-book"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Book Call
          </a>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-green-500 text-green-600"
          asChild
        >
          <a
            href={hero.buttons.secondaryLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('sticky_whatsapp', hero.buttons.secondaryLink)}
            data-testid="button-sticky-whatsapp"
          >
            <SiWhatsapp className="w-4 h-4 mr-1" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
