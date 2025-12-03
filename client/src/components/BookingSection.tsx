import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageCircle, ExternalLink, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import bookingData from "@/data/booking.json";
import CapacityIndicator from "@/components/CapacityIndicator";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  MessageCircle,
  Clock,
  Video,
};

interface BookingOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  cta: string;
  primary: boolean;
  color: string;
}

export default function BookingSection() {
  const { contact, socialLinks } = profileData;
  const { 
    sectionBadge, 
    sectionTitle, 
    sectionTitleHighlight, 
    sectionDescription,
    connectTitle,
    scheduleTitle,
    bookingOptions,
    processSteps,
    howItWorksTitle,
    calendarEmbed,
    sessionInfo,
    fastestConnect,
    labels
  } = bookingData;

  const getOptionUrl = (optionId: string): string => {
    switch (optionId) {
      case 'whatsapp':
        return `${contact.whatsappLink}?text=${encodeURIComponent(whatsappData.widget.defaultMessage)}`;
      case 'igotanoffer':
        return socialLinks.igotanoffer.url;
      default:
        return '#';
    }
  };

  return (
    <section
      id="booking"
      className="py-10 md:py-14 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-booking"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="w-3 h-3 mr-1" />
            {sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-booking-title"
          >
            {sectionTitle} <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {sectionDescription}
          </p>
          <div className="flex justify-center">
            <CapacityIndicator />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-xl mb-6">{connectTitle}</h3>
            <div className="space-y-4">
              {(bookingOptions as BookingOption[]).map((option) => {
                const IconComponent = iconMap[option.icon];
                const url = getOptionUrl(option.id);
                return (
                  <Card
                    key={option.title}
                    className={`hover-elevate transition-all duration-200 ${
                      option.primary ? "border-green-500/50" : ""
                    }`}
                    data-testid={`card-booking-${option.title.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            option.primary
                              ? "bg-green-500/10"
                              : "bg-primary/10"
                          }`}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`w-6 h-6 ${
                                option.primary ? "text-green-500" : "text-primary"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{option.title}</h4>
                            {option.primary && (
                              <Badge variant="secondary" className="text-xs">
                                {labels.recommended}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {option.description}
                          </p>
                          <Button
                            size="sm"
                            className={option.primary ? option.color : ""}
                            variant={option.primary ? "default" : "outline"}
                            asChild
                          >
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`button-booking-${option.title.toLowerCase().replace(/ /g, "-")}`}
                            >
                              {option.primary && (
                                <SiWhatsapp className="w-4 h-4 mr-2" />
                              )}
                              {option.cta}
                              {!option.primary && (
                                <ExternalLink className="w-3 h-3 ml-2" />
                              )}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">{howItWorksTitle}</h4>
                <ul className="space-y-3">
                  {processSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">{scheduleTitle}</h3>
            <Card className="hover-elevate">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{calendarEmbed.title}</h4>
                <p className="text-muted-foreground mb-6">
                  Pick a time that works for you. Free 15-min discovery call to discuss your career goals.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{sessionInfo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span>{sessionInfo.platform}</span>
                  </div>
                </div>
                <Button size="lg" asChild>
                  <a
                    href={calendarEmbed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-schedule-calendar"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Open Calendar & Book
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="max-w-xl mx-auto border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <SiWhatsapp className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{fastestConnect.title}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {fastestConnect.description}
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-booking-whatsapp-main"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
