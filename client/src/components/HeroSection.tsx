import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Users, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { SiWhatsapp, SiAmazon } from "react-icons/si";
import profileImage from "@assets/rupesh-headshot_1764261897457.png";
import siteContent from "@/data/siteContent.json";

export default function HeroSection() {
  const { hero } = siteContent;

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex items-center pt-20 pb-12 bg-gradient-to-br from-background via-background to-primary/5"
      data-testid="section-hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">
                <SiAmazon className="w-3 h-3 mr-1" />
                AWS Senior CSM
              </Badge>
              <Badge variant="secondary">
                <Award className="w-3 h-3 mr-1" />
                20+ Years Experience
              </Badge>
              <Badge variant="outline">
                <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                50+ 5-Star Reviews
              </Badge>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              data-testid="text-hero-title"
            >
              {hero.titleLine1}{" "}
              <span className="text-primary">{hero.titleHighlight}</span> {hero.titleLine2}
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
              data-testid="text-hero-description"
            >
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {hero.coachingAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="text-xs"
                  data-testid={`badge-area-${area.toLowerCase().replace(/ /g, "-")}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  {area}
                </Badge>
              ))}
            </div>

            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{hero.package.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{hero.package.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{hero.package.originalPrice}</span>
                      <Badge variant="secondary" className="text-xs">{hero.package.savings}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{hero.package.perSession}</p>
                  </div>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <a
                      href={`${hero.contact.whatsapp}?text=Hi%20Rupesh,%20I'm%20interested%20in%20the%205-session%20coaching%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="button-hero-whatsapp"
                    >
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      Book via WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                size="lg"
                onClick={() => handleScrollTo("#booking")}
                data-testid="button-book-session"
              >
                {hero.buttons.primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a
                  href="https://igotanoffer.com/en/coach/rupesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-igotanoffer"
                >
                  {hero.buttons.secondary}
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <a
                href={hero.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                {hero.contact.phone}
              </a>
              <a
                href={`mailto:${hero.contact.email}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4 text-primary" />
                {hero.contact.email}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Rupesh Tiwari - AWS Solutions Architect & Technical Coach"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-3 shadow-lg border border-card-border">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">5.0</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  IGotAnOffer Verified
                </p>
              </div>
              <div className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {hero.companiesText}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {hero.targetRoles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="text-xs"
                data-testid={`badge-role-${role.toLowerCase().replace(/ /g, "-")}`}
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
