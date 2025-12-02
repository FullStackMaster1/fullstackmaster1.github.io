import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Crown, Rocket, Clock, DollarSign, Target, Shield, ArrowRight, Code, Gamepad2 } from "lucide-react";
import caseStudiesData from "@/data/executiveCaseStudies.json";

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp,
  Crown,
  Rocket,
  Code,
  Gamepad2,
};

export default function ExecutiveCaseStudies() {
  const { sectionBadge, sectionTitle, sectionTitleHighlight, sectionDescription, caseStudies, aggregateStats, confidentialityNote } = caseStudiesData;

  return (
    <section id="case-studies" className="py-16 bg-gradient-to-b from-background to-muted/30" data-testid="section-case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4" data-testid="badge-case-studies">
            <Target className="w-3 h-3 mr-1" />
            {sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-case-studies-title">
            {sectionTitle} <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            {sectionDescription}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>{confidentialityNote}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-card rounded-xl border">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{aggregateStats.avgCompUplift}</p>
            <p className="text-sm text-muted-foreground">Avg Comp Increase</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{aggregateStats.avgTimeline}</p>
            <p className="text-sm text-muted-foreground">Avg Prep Time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{aggregateStats.successRate}</p>
            <p className="text-sm text-muted-foreground">Offer Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{aggregateStats.clientsAtLevel}</p>
            <p className="text-sm text-muted-foreground">Client Level</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.filter(cs => cs.featured).map((study) => {
            const IconComponent = iconMap[study.icon] || TrendingUp;
            return (
              <Card key={study.id} className="overflow-hidden hover-elevate" data-testid={`card-case-study-${study.id}`}>
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {study.compUplift} Comp Uplift
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {study.timeline}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{study.beforeRole}</p>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        <p className="font-semibold">{study.afterRole}</p>
                      </div>
                      <p className="text-sm text-primary font-medium">{study.afterCompany}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Challenge</p>
                    <p className="text-sm">{study.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Solution</p>
                    <p className="text-sm">{study.solution}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg border-l-2 border-primary">
                    <p className="text-sm italic">"{study.quote}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{study.compDetails}</span>
                    </div>
                    <span>{study.sessions} sessions</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          {caseStudiesData.disclaimer}
        </p>
      </div>
    </section>
  );
}
