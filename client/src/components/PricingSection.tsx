import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap, Clock, Video, Calendar, MessageCircle, Star, Quote } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const pricingTestimonials = [
  {
    quote: "Worth every penny! Rupesh's coaching helped me land a Sr. Manager role at AWS.",
    author: "Former Client",
    role: "Now Sr. Manager at AWS",
    rating: 5,
  },
  {
    quote: "The 5-session package was perfect. Got offers from both Google and Meta.",
    author: "Engineering Director",
    role: "FAANG Interview Success",
    rating: 5,
  },
  {
    quote: "Best investment in my career. Rupesh's LP coaching is unmatched.",
    author: "Principal Engineer",
    role: "Amazon Leadership Prep",
    rating: 5,
  },
];

const packageFeatures = [
  "5 x 60-minute 1:1 sessions",
  "System design deep-dive",
  "Behavioral/LP coaching",
  "Executive communication training",
  "Resume & intro pitch review",
  "Priority WhatsApp support",
  "Personalized prep plan",
  "Mock interview practice",
];

const singleSessionFeatures = [
  "60-minute 1:1 session",
  "Focused topic of your choice",
  "Actionable feedback",
  "Recording available",
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24"
      data-testid="section-pricing"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Simple Pricing</Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-pricing-title"
          >
            Invest in Your <span className="text-primary">Career Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book directly with me and save. Same quality coaching, 
            better value for your interview preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
              Best Value
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>5-Session Package</CardTitle>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$600</span>
                  <span className="text-lg text-muted-foreground line-through">$705</span>
                </div>
                <p className="text-sm text-muted-foreground">$120 per session</p>
                <Badge variant="secondary" className="mt-2">
                  Save $105 vs platform
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {packageFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a
                  href="https://wa.me/16094424081?text=Hi%20Rupesh,%20I%20want%20to%20book%20the%205-session%20coaching%20package%20for%20$600."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-package-whatsapp"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Book Package via WhatsApp
                </a>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Payment via Zelle to +1-609-442-4081
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <CardTitle>Single Session</CardTitle>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$141</span>
                </div>
                <p className="text-sm text-muted-foreground">60-minute session</p>
                <Badge variant="outline" className="mt-2">
                  Via IGotAnOffer
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {singleSessionFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <a
                    href="https://igotanoffer.com/en/coach/rupesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-single-igotanoffer"
                  >
                    Book on IGotAnOffer
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="w-full" asChild>
                  <a
                    href="https://wa.me/16094424081?text=Hi%20Rupesh,%20I'd%20like%20to%20book%20a%20single%20coaching%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-single-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2 text-green-500" />
                    Or contact me directly
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 text-center mb-12">
          <h3 className="font-semibold mb-2">How Direct Booking Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span>1. Message me on WhatsApp</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>2. We schedule your sessions</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Video className="w-4 h-4 text-blue-500" />
              <span>3. Meet via Google Meet/Zoom</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground mb-6">
            What clients say about the investment
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50" data-testid={`testimonial-pricing-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30 mb-2" />
                  <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
