import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Award, Users, Star, CheckCircle, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import aboutData from "@/data/about.json";
import profileImage from "@assets/rupesh-headshot_1764261897457.png";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Award,
  Users,
  Star,
};

interface Credential {
  icon: string;
  label: string;
  description: string;
}

export default function AboutSection() {
  const { sectionBadge, name, title, tagline, story, credentials, philosophy, cta } = aboutData;

  return (
    <section
      id="about"
      className="py-16 md:py-24"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">{sectionBadge}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                <p className="font-semibold text-sm">{title}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-about-name">
                {name}
              </h2>
              <p className="text-lg text-primary font-medium">{tagline}</p>
            </div>

            <div className="space-y-4 text-muted-foreground">
              {story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(credentials as Credential[]).map((cred, index) => {
                const IconComponent = iconMap[cred.icon] || Briefcase;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{cred.label}</p>
                      <p className="text-xs text-muted-foreground">{cred.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">{philosophy.title}</h3>
                <ul className="space-y-2">
                  {philosophy.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button size="lg" asChild>
              <a
                href={cta.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-about-cta"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {cta.text}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
