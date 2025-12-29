import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Star, Users, Award } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";

interface ComparisonRow {
  feature: string;
  yourCoaching: string | boolean;
  otherCoaches: string | boolean;
  selfStudy: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Current FAANG Interviewer",
    yourCoaching: true,
    otherCoaches: "Rare",
    selfStudy: false
  },
  {
    feature: "AWS Senior CSM Experience",
    yourCoaching: true,
    otherCoaches: false,
    selfStudy: false
  },
  {
    feature: "Director/VP Specialization",
    yourCoaching: true,
    otherCoaches: "General",
    selfStudy: false
  },
  {
    feature: "1-on-1 Personalized Coaching",
    yourCoaching: true,
    otherCoaches: "Sometimes",
    selfStudy: false
  },
  {
    feature: "Real Interview Feedback",
    yourCoaching: true,
    otherCoaches: "Generic",
    selfStudy: false
  },
  {
    feature: "Amazon Leadership Principles Expertise",
    yourCoaching: true,
    otherCoaches: "Basic",
    selfStudy: "Limited"
  },
  {
    feature: "92% Success Rate",
    yourCoaching: true,
    otherCoaches: "Unknown",
    selfStudy: "Low"
  },
  {
    feature: "Money-Back Guarantee",
    yourCoaching: true,
    otherCoaches: "Rare",
    selfStudy: false
  },
  {
    feature: "Average $285K Comp Increase",
    yourCoaching: true,
    otherCoaches: "Unknown",
    selfStudy: false
  },
  {
    feature: "50+ Verified Reviews",
    yourCoaching: true,
    otherCoaches: "Varies",
    selfStudy: false
  }
];

export default function ComparisonTable() {
  const sectionRef = useSectionTracking({
    sectionName: 'comparison',
    funnelStep: 'decision'
  });

  const renderValue = (value: string | boolean) => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex items-center justify-center">
          <X className="w-5 h-5 text-red-500" />
        </div>
      );
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="py-12 md:py-16 bg-muted/30"
      data-testid="section-comparison"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            <Award className="w-3 h-3 mr-1" />
            Why Choose Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Coaching vs. <span className="text-primary">Alternatives</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See why Directors, VPs, and Principal Engineers choose personalized coaching over generic prep
          </p>
        </div>

        <div className="overflow-x-auto">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold bg-primary/10">
                        <div className="flex flex-col items-center gap-2">
                          <Star className="w-5 h-5 text-primary" />
                          <span>Rupesh's Coaching</span>
                          <Badge className="bg-primary text-primary-foreground">Best Choice</Badge>
                        </div>
                      </th>
                      <th className="text-center p-4 font-semibold">Other Coaches</th>
                      <th className="text-center p-4 font-semibold">Self-Study</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                        onClick={() => trackEvent('comparison_row_view', 'engagement', row.feature)}
                      >
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center bg-primary/5">
                          {renderValue(row.yourCoaching)}
                        </td>
                        <td className="p-4 text-center">
                          {renderValue(row.otherCoaches)}
                        </td>
                        <td className="p-4 text-center">
                          {renderValue(row.selfStudy)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to get personalized coaching from a current FAANG interviewer?
          </p>
          <Button
            size="lg"
            onClick={() => {
              trackEvent('comparison_book_click', 'buy_intent', 'comparison_table');
              window.location.href = '/book';
            }}
          >
            Book Your Risk-Free Session
          </Button>
        </div>
      </div>
    </section>
  );
}

