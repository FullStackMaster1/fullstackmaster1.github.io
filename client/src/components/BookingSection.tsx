import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MessageCircle, ExternalLink, CheckCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const bookingOptions = [
  {
    title: "WhatsApp (Fastest)",
    description: "Message me directly for quick responses and scheduling",
    icon: MessageCircle,
    cta: "Start Chat",
    url: "https://wa.me/16094424081?text=Hi%20Rupesh,%20I'm%20interested%20in%20coaching%20sessions.",
    primary: true,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "IGotAnOffer",
    description: "Book through the verified coaching platform",
    icon: Calendar,
    cta: "View Profile",
    url: "https://igotanoffer.com/en/coach/rupesh",
    primary: false,
    color: "",
  },
];

const processSteps = [
  "Connect via WhatsApp or IGotAnOffer",
  "Free 15-min discovery call to discuss goals",
  "Personalized coaching plan created",
  "Schedule sessions at your convenience",
  "1:1 sessions via Google Meet or Zoom",
];

export default function BookingSection() {
  return (
    <section
      id="booking"
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-booking"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="w-3 h-3 mr-1" />
            Get Started
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-booking-title"
          >
            Ready to <span className="text-primary">Transform Your Career?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a free discovery call to discuss your goals and create a personalized coaching plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-xl mb-6">Choose How to Connect</h3>
            <div className="space-y-4">
              {bookingOptions.map((option) => (
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
                        <option.icon
                          className={`w-6 h-6 ${
                            option.primary ? "text-green-500" : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{option.title}</h4>
                          {option.primary && (
                            <Badge variant="secondary" className="text-xs">
                              Recommended
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
                            href={option.url}
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
              ))}
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">How It Works</h4>
                <ul className="space-y-3">
                  {processSteps.map((step, index) => (
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
            <h3 className="font-semibold text-xl mb-6">Schedule Directly</h3>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/AcZssZ2dMNXqXzYcl2NKLpclDV9w0p4-9cp4UvTHii0=?gv=true"
                  className="w-full h-[500px] border-0"
                  title="Schedule a coaching session with Rupesh Tiwari"
                  data-testid="iframe-calendar"
                />
              </CardContent>
            </Card>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>60-min sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Google Meet / Zoom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Card className="max-w-xl mx-auto border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <SiWhatsapp className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Fastest Way to Connect</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Send me a WhatsApp message and I'll respond within a few hours.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <a
                  href="https://wa.me/16094424081"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-booking-whatsapp-main"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  +1-609-442-4081
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
