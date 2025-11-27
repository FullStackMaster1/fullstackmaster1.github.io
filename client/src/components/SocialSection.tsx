import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight } from "react-icons/si";

const socialLinks = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@FullStackMaster",
    icon: SiYoutube,
    description: "Full Stack Master Channel",
    stats: "Educational content on AWS, DevOps & more",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/fullstack-master",
    icon: SiLinkedin,
    description: "Full Stack Master",
    stats: "Professional network & updates",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    name: "Udemy",
    url: "https://www.udemy.com/user/rupesh-k-tiwari/",
    icon: SiUdemy,
    description: "Udemy Instructor",
    stats: "50,000+ students enrolled",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    name: "Pluralsight",
    url: "https://www.pluralsight.com/authors/rupesh-tiwari",
    icon: SiPluralsight,
    description: "Pluralsight Author",
    stats: "Enterprise-grade courses",
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
  },
];

export default function SocialSection() {
  return (
    <section
      id="social"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-social"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-social-title"
          >
            Connect With Me
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow me on social platforms for more content and updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link) => (
            <Card
              key={link.name}
              className="hover-elevate transition-all duration-200"
              data-testid={`card-social-${link.name.toLowerCase()}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${link.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <link.icon className={`w-6 h-6 ${link.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{link.description}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {link.stats}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-social-${link.name.toLowerCase()}`}
                      >
                        Visit {link.name}
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
