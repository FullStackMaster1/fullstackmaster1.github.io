import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Video, Bell, ExternalLink } from "lucide-react";
import { SiWhatsapp, SiYoutube } from "react-icons/si";
import webinarsData from "@/data/webinars.json";
import { trackEvent } from "@/lib/analytics";

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  spots: string;
  topics: string[];
  active: boolean;
  interested?: number;
  registrationUrl?: string;
  registrationLabel?: string;
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
  const handleRegisterClick = () => {
    trackEvent("webinar_register_click", "buy_intent", webinar.title);
  };

  return (
    <Card
      className="hover-elevate transition-all duration-200 h-full"
      data-testid={`card-webinar-${webinar.id}`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {webinar.date}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {webinar.time}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
        
        <div className="flex items-center gap-1 text-xs text-primary font-medium mb-3">
          <Users className="w-3 h-3" />
          {webinar.interested || 0}+ people interested
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {webinar.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 flex-grow">
          {webinar.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs h-fit">
              {topic}
            </Badge>
          ))}
        </div>
        
        <Button 
          className="w-full mt-auto" 
          asChild
          data-testid={`button-register-${webinar.id}`}
        >
          <a
            href={webinar.registrationUrl || "https://rupeshtiwari.gumroad.com"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRegisterClick}
          >
            <Bell className="w-4 h-4 mr-2" />
            {webinar.registrationLabel || "Register Free"}
            <ExternalLink className="w-3 h-3 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function WebinarSection() {
  const activeWebinars = (webinarsData.webinars as Webinar[]).filter(w => w.active);

  const handleFreeKitClick = () => {
    trackEvent("free_kit_click", "buy_intent", "webinar_section");
  };

  return (
    <section
      id="webinars"
      className="py-10 md:py-14 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-webinars"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Video className="w-3 h-3 mr-1" />
            {webinarsData.sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-webinars-title"
          >
            Upcoming <span className="text-primary">Free Webinars</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {webinarsData.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {activeWebinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>

        {/* Free Kit Promotion */}
        <div className="mb-12">
          <Card className="max-w-3xl mx-auto border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-6 text-center">
              <Badge className="mb-3">Free Download</Badge>
              <h3 className="font-bold text-xl mb-2">
                {webinarsData.freeKit?.title || "Free Career Coaching Vault"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {webinarsData.freeKit?.description || "CAMPERSO Framework, IFRAIL+T System Design, STAR Builder, Resume Checklist"}
              </p>
              <Button size="lg" asChild>
                <a
                  href={webinarsData.freeKit?.url || "https://rupeshtiwari.gumroad.com/l/rupesh-kit"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleFreeKitClick}
                  data-testid="button-free-kit-webinar"
                >
                  {webinarsData.freeKit?.label || "Get Free Kit"}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                {webinarsData.stayUpdatedTitle}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {webinarsData.stayUpdatedDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a
                    href={webinarsData.socialLinks.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    {webinarsData.socialLinks.whatsapp.label}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={webinarsData.socialLinks.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-youtube"
                  >
                    <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                    {webinarsData.socialLinks.youtube.label}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
