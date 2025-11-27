import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users } from "lucide-react";
import profileImage from "@assets/generated_images/professional_coach_headshot_portrait.png";

const roles = [
  "Cloud Engineer",
  "Data Engineer",
  "Product Manager",
  "Engineering Manager",
  "Manager of TPMs",
  "Program Manager",
  "Site Reliability Engineer",
  "Solutions Architect",
  "Staff Software Engineer",
  "Technical Program Manager",
];

export default function HeroSection() {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-background via-background to-accent/30"
      data-testid="section-hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
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
                  50+ Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                AWS Senior CSM
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                SuperCoach
              </Badge>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              data-testid="text-hero-title"
            >
              Hi, I'm{" "}
              <span className="text-primary">Rupesh Tiwari</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0"
              data-testid="text-hero-description"
            >
              Senior Customer Solutions Manager at AWS. I help engineers,
              architects, and leaders ace their interviews and accelerate their
              careers with structured frameworks and actionable feedback.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {roles.map((role) => (
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

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                onClick={() => handleScrollTo("#booking")}
                data-testid="button-book-session"
              >
                Book a Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScrollTo("#reviews")}
                data-testid="button-view-reviews"
              >
                View Reviews
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <span>50+ 5-star reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
