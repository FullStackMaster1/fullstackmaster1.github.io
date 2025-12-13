import { Badge } from "@/components/ui/badge";
import profile from "@/data/profile.json";
import { MapPin, Clock, MessageCircle, Users, Shield } from "lucide-react";

export default function USATrustBar() {
  const trust = profile.usaTrust;
  
  return (
    <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-200" />
            <span className="font-medium">{trust.location}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-200" />
            <span>{trust.timezone}</span>
          </div>
          
          <a 
            href={profile.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-green-300" />
            <span>WhatsApp</span>
          </a>
          
          <div className="hidden sm:flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-200" />
            <span>{trust.clients}</span>
          </div>
          
          <Badge variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
            <Shield className="w-3 h-3 mr-1" />
            NDA Available
          </Badge>
        </div>
      </div>
    </section>
  );
}
