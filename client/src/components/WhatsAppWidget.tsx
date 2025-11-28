import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";

export default function WhatsAppWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { personal, contact } = profileData;
  const { widget } = whatsappData;

  const whatsappUrl = `${contact.whatsappLink}?text=${encodeURIComponent(widget.defaultMessage)}`;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50" data-testid="whatsapp-widget">
      {isExpanded && (
        <div className="mb-3 bg-card border border-card-border rounded-lg shadow-xl p-4 w-72 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <SiWhatsapp className="w-5 h-5 text-white" />
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

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            asChild
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-whatsapp-chat"
            >
              <SiWhatsapp className="w-4 h-4 mr-2" />
              {widget.buttonText}
            </a>
          </Button>
        </div>
      )}

      <Button
        size="lg"
        className={`rounded-full h-14 w-14 shadow-lg ${
          isExpanded ? "bg-muted hover:bg-muted" : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="button-whatsapp-toggle"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <SiWhatsapp className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
