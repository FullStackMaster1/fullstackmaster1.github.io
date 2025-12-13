import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Award, Users, Star, CheckCircle, Calendar, Code, Layers, Cloud, Rocket, ExternalLink, LucideIcon, Globe } from "lucide-react";
import { SiWhatsapp, SiLinkedin } from "react-icons/si";
import aboutData from "@/data/about.json";
import profileData from "@/data/profile.json";
import profileImage from "@assets/rupesh-seating-confidently_1764278393371.png";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Award,
  Users,
  Star,
  Calendar,
  Code,
  Layers,
  Cloud,
  Rocket,
};

interface Credential {
  icon: string;
  label: string;
  description: string;
}

interface Milestone {
  role: string;
  company: string;
  period: string;
  icon: string;
  description: string;
}

export default function AboutSection() {
  const { sectionBadge, tagline, linkedInText, story, careerJourney, credentials, certifications, philosophy, cta } = aboutData;
  const { personal, contact, socialLinks } = profileData;

  return (
    <section
      id="about"
      className="py-10 md:py-14 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">{sectionBadge}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto lg:mx-0">
                <img
                  src={profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-center mt-4 mx-auto max-w-md lg:mx-0">
                <p className="font-semibold text-sm">{personal.title}</p>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-primary/20">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-center">{careerJourney.title}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{careerJourney.subtitle}</p>
                <div className="space-y-3">
                  {(careerJourney.milestones as Milestone[]).map((milestone, index) => {
                    const IconComponent = iconMap[milestone.icon] || Code;
                    return (
                      <div key={index} className="flex items-start gap-3 relative">
                        {index < careerJourney.milestones.length - 1 && (
                          <div className="absolute left-5 top-10 w-0.5 h-full bg-primary/20" />
                        )}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{milestone.role}</p>
                          <p className="text-xs text-primary">{milestone.company}</p>
                          <p className="text-xs text-muted-foreground">{milestone.period}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-about-name">
                {personal.name}
              </h2>
              <p className="text-lg text-primary font-medium mb-3">{tagline}</p>
              <a
                href={socialLinks.linkedIn.personal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin-profile"
              >
                <SiLinkedin className="w-4 h-4" />
                {linkedInText}
                <ExternalLink className="w-3 h-3" />
              </a>
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
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center flex-shrink-0 shadow-sm">
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

            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
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

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button size="lg" asChild className="flex-1">
                <a
                  href={`${contact.whatsappLink}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-about-cta"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  {cta.text}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="flex-1">
                <a
                  href={socialLinks.linkedIn.personal}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-linkedin"
                >
                  <SiLinkedin className="w-4 h-4 mr-2" />
                  View LinkedIn
                </a>
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <a
                href={(socialLinks as any).personalWebsite?.url || "https://rupeshtiwari.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                data-testid="link-personal-website"
              >
                <Globe className="w-4 h-4" />
                Learn more about me at rupeshtiwari.com
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
