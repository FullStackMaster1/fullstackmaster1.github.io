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
import { Clock, ExternalLink, FileText, ArrowRight } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import articlesData from "@/data/articles.json";

export default function ArticlesSection() {
  return (
    <section
      id="articles"
      className="py-16 md:py-24"
      data-testid="section-articles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <FileText className="w-3 h-3 mr-1" />
            Technical Blogs
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-articles-title"
          >
            Latest <span className="text-primary">Articles & Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free insights on system design, leadership interviews, and career growth. 
            Subscribe to my LinkedIn newsletter for weekly updates.
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
            {articlesData.map((article) => (
              <CarouselItem
                key={article.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                  data-testid={`link-article-${article.id}`}
                >
                  <Card className="h-full hover-elevate transition-all duration-200">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {article.date}
                        </span>
                        <span className="text-xs text-primary flex items-center gap-1 group-hover:underline">
                          Read More
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" data-testid="button-articles-prev" />
            <CarouselNext className="-right-12" data-testid="button-articles-next" />
          </div>
        </Carousel>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild>
            <a
              href="https://www.linkedin.com/newsletters/technical-blogs-6871207419859615744/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-subscribe-newsletter"
            >
              <SiLinkedin className="w-4 h-4 mr-2" />
              Subscribe to Newsletter
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://www.linkedin.com/company/fullstack-master"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin-company"
            >
              Follow FullStack Master
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
