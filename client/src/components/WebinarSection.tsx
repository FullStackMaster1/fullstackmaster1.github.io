import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Video, Bell, ArrowRight } from "lucide-react";
import { SiWhatsapp, SiYoutube } from "react-icons/si";

const upcomingWebinars = [
  {
    id: 1,
    title: "System Design for Senior Leaders",
    description: "Learn the frameworks and communication patterns that Staff+ engineers and Directors use in FAANG interviews.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["Scalability", "Trade-offs", "Communication"],
  },
  {
    id: 2,
    title: "Mastering Amazon Leadership Principles",
    description: "Deep-dive into LPs with real examples. How to structure stories that resonate with bar-raisers.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["STAR Method", "Story Crafting", "Bar-raiser Tips"],
  },
  {
    id: 3,
    title: "Executive Communication Masterclass",
    description: "How to compress complex technical ideas into executive-ready narratives for VP and C-suite interviews.",
    date: "Coming Soon",
    time: "Free Webinar",
    spots: "Register Interest",
    topics: ["Exec Framing", "Stakeholder Influence", "Brevity"],
  },
];

export default function WebinarSection() {
  return (
    <section
      id="webinars"
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/10"
      data-testid="section-webinars"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Video className="w-3 h-3 mr-1" />
            Free Learning
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-webinars-title"
          >
            Upcoming <span className="text-primary">Free Webinars</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join my free webinars to learn interview strategies, system design patterns, 
            and leadership communication skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {upcomingWebinars.map((webinar) => (
            <Card
              key={webinar.id}
              className="hover-elevate transition-all duration-200"
              data-testid={`card-webinar-${webinar.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {webinar.date}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {webinar.time}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {webinar.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {webinar.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {webinar.spots}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Get Notified About Upcoming Webinars
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to know when I announce new free webinars. 
                Connect with me on WhatsApp or subscribe to my YouTube channel.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a
                    href="https://wa.me/16094424081?text=Hi%20Rupesh,%20please%20notify%20me%20about%20your%20upcoming%20free%20webinars."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-whatsapp"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    Get Notified
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.youtube.com/@FullStackMaster?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-webinar-youtube"
                  >
                    <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                    Subscribe on YouTube
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
