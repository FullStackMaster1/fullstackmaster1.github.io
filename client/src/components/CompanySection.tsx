import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Globe, Award, Shield, Users, Briefcase, ExternalLink } from "lucide-react";
import { SiLinkedin, SiFacebook, SiYoutube } from "react-icons/si";
import companyData from "@/data/company.json";
import profileData from "@/data/profile.json";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Target,
  Globe,
  Award,
  Shield,
};

export default function CompanySection() {
  const { mission, founder, stats, careers, socialProof } = companyData;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30" id="company" data-testid="section-company">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-primary border-primary/30">
            <Briefcase className="w-3 h-3 mr-2" />
            About FullStack Master
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-company-headline">
            {mission.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {mission.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mission.points.map((point, index) => {
            const IconComponent = iconMap[point.icon];
            return (
              <Card key={index} className="hover-elevate border-border/50" data-testid={`card-mission-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="font-semibold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" data-testid="card-founder">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4">
                <Users className="w-3 h-3 mr-1" />
                {founder.highlight}
              </Badge>
              <h3 className="text-xl font-bold mb-2">{founder.title}</h3>
              <p className="text-muted-foreground mb-4">{founder.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-background">
                  AWS Senior CSM
                </Badge>
                <Badge variant="outline" className="bg-background">
                  ISB CTO Scholar
                </Badge>
                <Badge variant="outline" className="bg-background">
                  15+ Years Experience
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50" data-testid="card-stats">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center" data-testid={`stat-${index}`}>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/50 rounded-lg border border-border/50">
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-1">Follow FullStack Master</h3>
            <p className="text-sm text-muted-foreground">Stay updated with coaching tips, success stories, and career insights</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={profileData.socialLinks.linkedIn.company}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-company-linkedin"
              >
                <SiLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={(profileData.socialLinks as any).facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-company-facebook"
              >
                <SiFacebook className="w-4 h-4 mr-2 text-blue-500" />
                Facebook
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={profileData.socialLinks.youtube.channel}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-company-youtube"
              >
                <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                YouTube
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a
                href="https://igotanoffer.com/en/coach/rupesh"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-company-igotanoffer"
              >
                <Award className="w-4 h-4 mr-2" />
                IGotAnOffer (5.0 ⭐)
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 p-6 border border-dashed border-primary/30 rounded-lg bg-primary/5 text-center" data-testid="card-careers">
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
            <Briefcase className="w-3 h-3 mr-1" />
            We're Hiring
          </Badge>
          <h3 className="text-lg font-semibold mb-2">{careers.headline}</h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">{careers.description}</p>
          <Button variant="outline" asChild>
            <a
              href={careers.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-careers-cta"
            >
              {careers.ctaText}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
