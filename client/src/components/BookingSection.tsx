import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageCircle, ExternalLink, LucideIcon, Heart, Shield, Infinity, AlertCircle, MapPin } from "lucide-react";
import { SiWhatsapp, SiGoogle } from "react-icons/si";
import profileData from "@/data/profile.json";
import whatsappData from "@/data/whatsapp.json";
import bookingData from "@/data/booking.json";
import CapacityIndicator from "@/components/CapacityIndicator";
import { useSectionTracking } from "@/hooks/useSectionTracking";

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

interface AvailabilitySlot {
  time: string;
  status: "available" | "expiringSoon" | "booked";
}

export default function BookingSection() {
  const sectionRef = useSectionTracking({ 
    sectionName: 'booking',
    funnelStep: 'action'
  });

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
    labels,
    availability,
    sidebarWidget
  } = bookingData as typeof bookingData & {
    availability?: {
      title: string;
      timezoneNote: string;
      slots: AvailabilitySlot[];
      expiringSoonLabel: string;
      updateNote: string;
    };
    sidebarWidget?: {
      credits: string;
      perSession: string;
      benefits: string[];
      saveButton: string;
      buyButton: string;
    };
  };

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
      ref={sectionRef}
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

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Main Content - Left Side */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Availability Section */}
            {availability && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-xl">{availability.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{availability.timezoneNote}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availability.slots.map((slot, index) => (
                    <a
                      key={index}
                      href={calendarEmbed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 border rounded-lg hover-elevate cursor-pointer ${
                        slot.status === "expiringSoon" 
                          ? "border-orange-300 bg-orange-50/50" 
                          : "border-border"
                      }`}
                      data-testid={`slot-${index}`}
                    >
                      <span className="text-sm font-medium">{slot.time}</span>
                      {slot.status === "expiringSoon" && (
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs text-orange-600 border-orange-300 bg-orange-50">
                            {availability.expiringSoonLabel}
                          </Badge>
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        </div>
                      )}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">{availability.updateNote}</p>
              </div>
            )}

            {/* Inline Google Calendar Embed */}
            <Card className="mb-8" data-testid="card-calendar-embed">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-xl">{calendarEmbed.title}</h3>
                </div>
                <div className="rounded-lg overflow-hidden border">
                  <iframe 
                    src={calendarEmbed.iframeUrl || calendarEmbed.url}
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    title="Book a coaching session"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer-when-downgrade"
                    data-testid="iframe-calendar"
                  />
                </div>
              </CardContent>
            </Card>

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

          {/* Sticky Sidebar - Right Side */}
          <div className="lg:w-80" data-testid="sidebar-booking">
            <div className="lg:sticky lg:top-24 z-40">
              {/* Pricing Card */}
              {sidebarWidget && (
                <Card className="mb-6 border-2 border-primary/20" data-testid="card-sidebar-pricing">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold" data-testid="text-credits">{sidebarWidget.credits}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{sidebarWidget.perSession}</p>
                    
                    <div className="space-y-3 mb-6">
                      <Button variant="outline" className="w-full" size="lg" data-testid="button-save-coach">
                        <Heart className="w-4 h-4 mr-2" />
                        {sidebarWidget.saveButton}
                      </Button>
                      <Button className="w-full bg-primary" size="lg" asChild>
                        <a 
                          href={socialLinks.igotanoffer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="button-buy-credits"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {sidebarWidget.buyButton}
                        </a>
                      </Button>
                    </div>

                    <div className="space-y-3 text-sm">
                      {sidebarWidget.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2" data-testid={`benefit-${index}`}>
                          {index === 0 && <Shield className="w-4 h-4 text-muted-foreground" />}
                          {index === 1 && <Infinity className="w-4 h-4 text-muted-foreground" />}
                          {index === 2 && <Shield className="w-4 h-4 text-green-500" />}
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Schedule Card */}
              <Card className="hover-elevate" data-testid="card-sidebar-schedule">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{calendarEmbed.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pick a time that works for you.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{sessionInfo.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      <span>{sessionInfo.platform}</span>
                    </div>
                  </div>
                  <Button size="default" className="w-full" asChild>
                    <a
                      href={calendarEmbed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-sidebar-schedule"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Google Maps Location Card */}
              <Card className="mt-6" data-testid="card-google-maps">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">Location</h4>
                  </div>
                  <div className="rounded-lg overflow-hidden border mb-3">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.25176947664!2d78.24323234999999!3d17.412608499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1702656000000!5m2!1sen!2sus"
                      width="100%"
                      height="150"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location - Hyderabad, India"
                      data-testid="iframe-google-maps"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>Hyderabad, Telangana, India</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <a
                      href="https://g.page/fullstackmaster"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-view-google-business"
                    >
                      <SiGoogle className="w-3 h-3 mr-2 text-[#4285F4]" />
                      View on Google
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
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
