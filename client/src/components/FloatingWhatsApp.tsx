import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { X, MessageCircle, Send, User, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import profileData from "@/data/profile.json";
import { trackWhatsApp, trackFormStart, trackFormComplete, trackEvent } from "@/lib/analytics";

interface ChatFormData {
  name: string;
  phone: string;
  message: string;
}

export default function FloatingWhatsApp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<ChatFormData>({
    name: "",
    phone: "",
    message: ""
  });
  const [formStarted, setFormStarted] = useState(false);
  const { contact, personal } = profileData;

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    if (newExpanded) {
      trackEvent('chat_bubble_open', 'contact_intent', 'floating_whatsapp');
    } else {
      trackEvent('chat_bubble_close', 'contact_intent', 'floating_whatsapp');
      setFormData({ name: "", phone: "", message: "" });
      setFormStarted(false);
    }
  };
  
  const handleClose = () => {
    setIsExpanded(false);
    trackEvent('chat_bubble_close', 'contact_intent', 'floating_whatsapp');
    setFormData({ name: "", phone: "", message: "" });
    setFormStarted(false);
  };

  const handleInputChange = (field: keyof ChatFormData, value: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('whatsapp_chat_form');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, phone, message } = formData;
    
    const fullMessage = `Hi ${personal.firstName}, I'm ${name || 'a visitor'}${phone ? ` (${phone})` : ''}. ${message || "I'd like to discuss my FAANG interview preparation."}`;
    
    const whatsappUrl = `${contact.whatsappLink}?text=${encodeURIComponent(fullMessage)}`;
    
    trackFormComplete('whatsapp_chat_form');
    trackWhatsApp('chat_form_submit');
    trackEvent('chat_message_sent', 'contact_intent', 'floating_whatsapp', undefined);
    
    if (name) {
      trackEvent('lead_captured', 'conversion', `name:${name.substring(0, 20)}`);
    }
    if (phone) {
      trackEvent('lead_captured', 'conversion', 'phone_provided');
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setFormData({ name: "", phone: "", message: "" });
    setFormStarted(false);
    setIsExpanded(false);
  };

  const isFormValid = formData.name.trim().length > 0 || formData.message.trim().length > 0;

  return (
    <div className="fixed bottom-20 right-4 z-50" data-testid="floating-whatsapp">
      {isExpanded && (
        <div className="mb-3 bg-card rounded-lg shadow-2xl border border-border overflow-hidden w-80 animate-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-sm">Chat with {personal.firstName}</span>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
              data-testid="button-whatsapp-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Leave your details and I'll get back to you quickly!
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="chat-name" className="text-xs font-medium flex items-center gap-1">
                <User className="w-3 h-3" />
                Your Name
              </Label>
              <Input
                id="chat-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="h-9 text-sm"
                data-testid="input-chat-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chat-phone" className="text-xs font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone Number <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="chat-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-9 text-sm"
                data-testid="input-chat-phone"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chat-message" className="text-xs font-medium flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Your Question
              </Label>
              <Textarea
                id="chat-message"
                placeholder="I'm preparing for a senior engineer interview at..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="text-sm min-h-[60px] resize-none"
                data-testid="input-chat-message"
              />
            </div>
            
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
              data-testid="button-whatsapp-submit"
            >
              <SiWhatsapp className="w-4 h-4" />
              <Send className="w-4 h-4" />
              Send via WhatsApp
            </Button>
            
            <p className="text-[10px] text-muted-foreground text-center">
              Your info helps me respond faster. I typically reply within a few hours.
            </p>
          </form>
        </div>
      )}
      
      <button
        onClick={handleToggle}
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
