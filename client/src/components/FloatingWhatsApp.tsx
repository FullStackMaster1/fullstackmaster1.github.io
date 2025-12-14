import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { X, MessageCircle } from "lucide-react";
import profileData from "@/data/profile.json";
import { trackWhatsApp } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { contact, personal } = profileData;

  return (
    <div className="fixed bottom-20 right-4 z-50" data-testid="floating-whatsapp">
      {isExpanded && (
        <div className="mb-3 bg-card rounded-lg shadow-2xl border border-border overflow-hidden w-72 animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-sm">Chat with {personal.firstName}</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/80 hover:text-white transition-colors"
              data-testid="button-whatsapp-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-3">
              Have questions about interview prep? I typically respond within a few hours.
            </p>
            <a
              href={`${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsApp('floating-button');
                setIsExpanded(false);
              }}
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              data-testid="button-whatsapp-chat"
            >
              <SiWhatsapp className="w-5 h-5" />
              Start Chat
            </a>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isExpanded 
            ? "bg-gray-500 hover:bg-gray-600" 
            : "bg-green-500 hover:bg-green-600 hover:scale-110"
        }`}
        aria-label={isExpanded ? "Close chat" : "Open WhatsApp chat"}
        data-testid="button-whatsapp-toggle"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <SiWhatsapp className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}
