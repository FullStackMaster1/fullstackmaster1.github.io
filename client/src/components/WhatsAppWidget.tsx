import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import { trackWhatsApp, trackLinkedInClick } from "@/lib/analytics";

export default function WhatsAppWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { personal, contact, socialLinks } = profileData;
  const { widget } = whatsappData;

  const whatsappUrl = `${contact.whatsappLink}?text=${encodeURIComponent(widget.defaultMessage)}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50" data-testid="whatsapp-widget">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 bg-card border border-card-border rounded-lg shadow-xl p-4 w-72 animate-in slide-in-from-bottom-2 max-h-[50vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">{personal.name}</p>
                <p className="text-xs text-muted-foreground">{widget.replyTime}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsExpanded(false)}
              data-testid="button-whatsapp-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 mb-3">
            <p className="text-sm">{widget.greeting}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              asChild
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('widget')}
                data-testid="button-whatsapp-chat"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {widget.buttonText}
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#0077b5] text-[#0077b5] hover:bg-blue-50 dark:hover:bg-blue-950"
              asChild
            >
              <a
                href={socialLinks.linkedIn.personal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkedInClick('widget')}
                data-testid="button-linkedin-chat"
              >
                <SiLinkedin className="w-4 h-4 mr-2" />
                Message on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      )}

      <Button
        size="lg"
        className={`rounded-full h-14 w-14 shadow-lg ${
          isExpanded ? "bg-muted hover:bg-muted" : "bg-primary hover:bg-primary/90"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="button-whatsapp-toggle"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
