import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, FileText, CheckCircle } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight } from "react-icons/si";

const trustMetrics = [
  {
    icon: Star,
    value: "50+",
    label: "5-Star Reviews",
    color: "text-yellow-500",
  },
  {
    icon: Award,
    value: "20+",
    label: "Years Experience",
    color: "text-primary",
  },
  {
    icon: FileText,
    value: "300+",
    label: "Technical Articles",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: "100+",
    label: "Leaders Coached",
    color: "text-green-500",
  },
];

const platformLogos = [
  {
    name: "IGotAnOffer",
    icon: CheckCircle,
    label: "Verified Coach",
    url: "https://igotanoffer.com/en/coach/rupesh",
    color: "text-green-500",
  },
  {
    name: "Pluralsight",
    icon: SiPluralsight,
    label: "Author",
    url: "https://www.pluralsight.com/authors/rupesh-tiwari",
    color: "text-pink-600",
  },
  {
    name: "Udemy",
    icon: SiUdemy,
    label: "Instructor",
    url: "https://www.udemy.com/user/rupesh-k-tiwari/",
    color: "text-purple-600",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    label: "Creator",
    url: "https://www.youtube.com/@FullStackMaster",
    color: "text-red-500",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    label: "Newsletter",
    url: "https://www.linkedin.com/newsletters/technical-blogs-6871207419859615744/",
    color: "text-blue-600",
  },
];

export default function TrustBar() {
  return (
    <section
      className="py-8 bg-card border-y border-card-border"
      data-testid="section-trust"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {trustMetrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center"
              data-testid={`metric-${metric.label.toLowerCase().replace(/ /g, "-")}`}
            >
              <div className="flex justify-center mb-2">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            As Featured On
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {platformLogos.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover-elevate transition-all"
                data-testid={`link-platform-${platform.name.toLowerCase()}`}
              >
                {platform.icon && (
                  <platform.icon className={`w-5 h-5 ${platform.color || ""}`} />
                )}
                {platform.name === "IGotAnOffer" && (
                  <span className="font-semibold text-primary">iGotAnOffer</span>
                )}
                {platform.name !== "IGotAnOffer" && (
                  <span className="font-medium">{platform.name}</span>
                )}
                <Badge variant="secondary" className="text-xs">
                  {platform.label}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
