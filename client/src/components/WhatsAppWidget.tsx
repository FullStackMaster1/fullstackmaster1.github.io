import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, MessageCircle, Send, User, Phone, MessageSquare } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import { trackWhatsApp, trackLinkedInClick, trackFormStart, trackFormComplete, trackEvent } from "@/lib/analytics";

interface ChatFormData {
  name: string;
  phone: string;
  message: string;
}

export default function WhatsAppWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<ChatFormData>({
    name: "",
    phone: "",
    message: ""
  });
  const [formStarted, setFormStarted] = useState(false);
  const { personal, contact, socialLinks } = profileData;
  const { widget } = whatsappData;

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    if (newExpanded) {
      trackEvent('chat_widget_open', 'contact_intent', 'whatsapp_widget');
    } else {
      trackEvent('chat_widget_close', 'contact_intent', 'whatsapp_widget');
      setFormData({ name: "", phone: "", message: "" });
      setFormStarted(false);
    }
  };
  
  const handleClose = () => {
    setIsExpanded(false);
    trackEvent('chat_widget_close', 'contact_intent', 'whatsapp_widget');
    setFormData({ name: "", phone: "", message: "" });
    setFormStarted(false);
  };

  const handleInputChange = (field: keyof ChatFormData, value: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('whatsapp_widget_form');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, phone, message } = formData;
    
    const fullMessage = `Hi ${personal.firstName}, I'm ${name || 'a visitor'}${phone ? ` (${phone})` : ''}. ${message || widget.defaultMessage}`;
    
    const whatsappUrl = `${contact.whatsappLink}?text=${encodeURIComponent(fullMessage)}`;
    
    trackFormComplete('whatsapp_widget_form');
    trackWhatsApp('widget_form_submit');
    trackEvent('chat_message_sent', 'contact_intent', 'whatsapp_widget');
    
    if (name) {
      trackEvent('lead_captured', 'conversion', `name_provided`);
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
    <div className="hidden md:block fixed bottom-6 right-6 z-50" data-testid="whatsapp-widget">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 bg-card border border-card-border rounded-lg shadow-xl w-80 animate-in slide-in-from-bottom-2 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-border">
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
              onClick={handleClose}
              data-testid="button-whatsapp-close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm">{widget.greeting}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="widget-chat-name" className="text-xs font-medium flex items-center gap-1">
                <User className="w-3 h-3" />
                Your Name
              </Label>
              <Input
                id="widget-chat-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="h-9 text-sm"
                data-testid="input-chat-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="widget-chat-phone" className="text-xs font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="widget-chat-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-9 text-sm"
                data-testid="input-chat-phone"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="widget-chat-message" className="text-xs font-medium flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Your Question
              </Label>
              <Textarea
                id="widget-chat-message"
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
              className="w-full bg-green-600 hover:bg-green-700 gap-2"
              data-testid="button-whatsapp-submit"
            >
              <SiWhatsapp className="w-4 h-4" />
              <Send className="w-4 h-4" />
              Send via WhatsApp
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
            
            <p className="text-[10px] text-muted-foreground text-center">
              {widget.availabilityNote || "I respond during EST business hours (9 AM - 6 PM)."}
            </p>
          </form>
        </div>
      )}

      <Button
        size="lg"
        className={`rounded-full h-14 w-14 shadow-lg ${
          isExpanded ? "bg-muted hover:bg-muted" : "bg-primary hover:bg-primary/90"
        }`}
        onClick={handleToggle}
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
