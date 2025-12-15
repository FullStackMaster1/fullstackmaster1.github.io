import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Award, 
  CheckCircle, 
  Clock, 
  Shield,
  XCircle,
  ArrowRight,
  LucideIcon
} from "lucide-react";
import whoThisIsForData from "@/data/whoThisIsFor.json";
import { trackBookCall } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/useSectionTracking";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Users,
  TrendingUp,
  Briefcase,
  Award,
  CheckCircle,
  Clock,
  Shield,
};

interface IdealItem {
  icon: string;
  title: string;
  description: string;
}

export default function WhoThisIsForSection() {
  const sectionRef = useSectionTracking({ 
    sectionName: 'who_this_is_for',
    funnelStep: 'interest'
  });

  const { 
    sectionBadge, 
    sectionTitle, 
    sectionTitleHighlight, 
    sectionDescription, 
    idealFor, 
    notIdealFor, 
    differentiation,
    ctaButton 
  } = whoThisIsForData;

  return (
    <section 
      ref={sectionRef}
      id="who-this-is-for" 
      className="py-10 md:py-14 bg-muted/30"
      data-testid="section-who-this-is-for"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">{sectionBadge}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-who-title">
            {sectionTitle} <span className="text-primary">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <Card className="border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  {idealFor.title}
                </h3>
              </div>
              <div className="space-y-4">
                {(idealFor.items as IdealItem[]).map((item, index) => {
                  const IconComponent = iconMap[item.icon] || Target;
                  return (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-3 bg-background/80 rounded-lg"
                      data-testid={`ideal-item-${index}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-950/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">
                  {notIdealFor.title}
                </h3>
              </div>
              <div className="space-y-3">
                {notIdealFor.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-background/80 rounded-lg"
                    data-testid={`not-ideal-item-${index}`}
                  >
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-center mb-6">{differentiation.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(differentiation.items as IdealItem[]).map((item, index) => {
              const IconComponent = iconMap[item.icon] || Award;
              return (
                <Card 
                  key={index} 
                  className="hover-elevate text-center"
                  data-testid={`differentiator-${index}`}
                >
                  <CardContent className="p-5">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => {
              trackBookCall('who-this-is-for');
              window.location.href = ctaButton.link;
            }}
            data-testid="button-who-cta"
          >
            {ctaButton.text}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
