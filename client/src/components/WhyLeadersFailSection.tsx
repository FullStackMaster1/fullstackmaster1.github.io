import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingDown,
  MessageSquareX,
  Brain,
  BookX,
  AlertTriangle,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import whyLeadersFailData from "@/data/whyLeadersFail.json";

const iconMap: Record<string, LucideIcon> = {
  TrendingDown,
  MessageSquareX,
  Brain,
  BookX,
};

interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

interface ComparisonRow {
  category: string;
  engineer: string;
  leader: string;
}

export default function WhyLeadersFailSection() {
  const {
    sectionBadge,
    sectionTitle,
    sectionTitleHighlight,
    sectionSubtitle,
    tableHeaders,
    painPoints,
    systemDesignDifference,
    solution,
  } = whyLeadersFailData;

  return (
    <section
      id="why-leaders-fail"
      className="py-16 md:py-24 bg-gradient-to-b from-destructive/5 to-background"
      data-testid="section-why-leaders-fail"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {sectionBadge}
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-why-fail-title"
          >
            {sectionTitle}{" "}
            <span className="text-destructive">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {(painPoints as PainPoint[]).map((point) => {
            const IconComponent = iconMap[point.icon] || TrendingDown;
            return (
              <Card
                key={point.id}
                className="border-destructive/20 bg-destructive/5"
                data-testid={`card-pain-${point.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{point.title}</h3>
                        <Badge variant="outline" className="text-destructive border-destructive/30 w-fit text-xs md:text-sm">
                          {point.stat} {point.statLabel}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mb-16 border-primary/30 overflow-hidden" data-testid="card-sd-difference">
          <div className="bg-primary/5 p-6 border-b border-primary/20">
            <Badge variant="secondary" className="mb-3">{systemDesignDifference.badge}</Badge>
            <h3 className="text-2xl font-bold mb-2">{systemDesignDifference.title}</h3>
            <p className="text-muted-foreground">{systemDesignDifference.subtitle}</p>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-4 font-semibold">{tableHeaders.category}</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">{tableHeaders.engineer}</th>
                    <th className="text-left p-4 font-semibold text-primary">{tableHeaders.leader}</th>
                  </tr>
                </thead>
                <tbody>
                  {(systemDesignDifference.comparison as ComparisonRow[]).map((row, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-4 font-medium">{row.category}</td>
                      <td className="p-4 text-muted-foreground text-sm">{row.engineer}</td>
                      <td className="p-4 text-sm font-medium">{row.leader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-primary/5 border-t">
              <p className="text-sm italic text-muted-foreground">
                "{systemDesignDifference.callout}"
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5" data-testid="card-solution">
          <CardContent className="p-8">
            <Badge className="bg-green-500 mb-4">{solution.badge}</Badge>
            <h3 className="text-2xl font-bold mb-6">{solution.title}</h3>
            <ul className="space-y-3 mb-8">
              {solution.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <a
                href={solution.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-solution-cta"
              >
                <SiWhatsapp className="w-4 h-4 mr-2" />
                {solution.ctaText}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
