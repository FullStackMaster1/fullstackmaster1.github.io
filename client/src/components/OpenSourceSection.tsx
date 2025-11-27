import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Github, Code2 } from "lucide-react";
import openSourceData from "@/data/opensource.json";

export default function OpenSourceSection() {
  return (
    <section
      id="opensource"
      className="py-16 md:py-24 bg-muted/30"
      data-testid="section-opensource"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Code2 className="w-3 h-3 mr-1" />
            Open Source
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-opensource-title"
          >
            Free <span className="text-primary">Projects & Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep-dive projects I use with clients. Build real skills with these 
            open-source resources and courses.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {openSourceData.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  data-testid={`link-opensource-${project.id}`}
                >
                  <Card className="overflow-hidden h-full hover-elevate transition-all duration-200">
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/480x270?text=Project";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" data-testid="button-opensource-prev" />
            <CarouselNext className="-right-12" data-testid="button-opensource-next" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <a
              href="https://github.com/FullStackMaster1"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github"
            >
              <Github className="w-4 h-4 mr-2" />
              View All on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
