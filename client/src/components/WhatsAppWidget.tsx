import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="whatsapp-widget">
      {isExpanded && (
        <div className="mb-3 bg-card border border-card-border rounded-lg shadow-xl p-4 w-72 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <SiWhatsapp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Rupesh Tiwari</p>
                <p className="text-xs text-muted-foreground">Usually replies instantly</p>
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
            <p className="text-sm">
              Hi! Ready to accelerate your FAANG interview prep? 
              Message me for a free consultation.
            </p>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            asChild
          >
            <a
              href="https://wa.me/16094424081?text=Hi%20Rupesh,%20I'm%20interested%20in%20your%20coaching%20services."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-whatsapp-chat"
            >
              <SiWhatsapp className="w-4 h-4 mr-2" />
              Start Chat
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
