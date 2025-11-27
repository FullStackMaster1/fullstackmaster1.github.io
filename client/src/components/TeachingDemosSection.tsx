import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Users, Code, FileText, Lightbulb } from "lucide-react";

import lpImage from "@assets/2_1764272631453.png";
import sysDesignImage from "@assets/1_1764272631453.png";
import resumeImage from "@assets/3_1764272631453.png";
import codingImage from "@assets/image_1764272813360.png";

const teachingDemos = [
  {
    id: "leadership-principles",
    title: "Leadership Principles Coaching",
    description: "Master Amazon's 16 Leadership Principles with real-world STAR stories and behavioral interview techniques.",
    image: lpImage,
    icon: Lightbulb,
    tags: ["Behavioral", "STAR Method", "Amazon LP"],
  },
  {
    id: "system-design",
    title: "System Design Deep-Dive",
    description: "Learn to design scalable distributed systems with hands-on whiteboarding sessions and real architecture diagrams.",
    image: sysDesignImage,
    icon: Code,
    tags: ["Architecture", "Scalability", "AWS"],
  },
  {
    id: "resume-review",
    title: "Resume & Profile Review",
    description: "Get your resume optimized with bar-raiser keywords, quantified impact statements, and FAANG-ready formatting.",
    image: resumeImage,
    icon: FileText,
    tags: ["Resume", "LinkedIn", "Bar Raiser"],
  },
  {
    id: "coding-interview",
    title: "Coding Interview Practice",
    description: "Practice coding problems with live feedback, optimal solutions, and time management strategies.",
    image: codingImage,
    icon: Code,
    tags: ["DSA", "Problem Solving", "Live Coding"],
  },
];

export default function TeachingDemosSection() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section
      id="coaching-sessions"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-teaching-demos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-3 h-3 mr-1" />
            Live Coaching Sessions
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-demos-title"
          >
            See Real Coaching in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Screenshots from actual 1-on-1 sessions. This is exactly what you'll experience - 
            interactive whiteboarding, personalized feedback, and hands-on learning.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="-ml-4">
            {teachingDemos.map((demo) => {
              const IconComponent = demo.icon;
              return (
                <CarouselItem
                  key={demo.id}
                  className="pl-4 md:basis-1/2"
                >
                  <Card className="overflow-hidden h-full" data-testid={`card-demo-${demo.id}`}>
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={demo.image}
                        alt={demo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur-sm">
                          <IconComponent className="w-3 h-3 mr-1" />
                          Live Session
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg mb-2">{demo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {demo.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {demo.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" data-testid="button-demos-prev" />
            <CarouselNext className="-right-12" data-testid="button-demos-next" />
          </div>
        </Carousel>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Every session is personalized to your target role, company, and interview timeline.
          </p>
        </div>
      </div>
    </section>
  );
}
