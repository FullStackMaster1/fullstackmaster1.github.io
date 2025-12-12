import { Helmet } from "react-helmet-async";
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
import { Clock, ExternalLink, FileText, ArrowRight, Star } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import articlesData from "@/data/articles.json";
import { trackEvent } from "@/lib/analytics";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  dateISO: string;
  readTime: string;
  category: string;
  image?: string;
  featured?: boolean;
}

export default function ArticlesSection() {
  const { articles, newsletterUrl, companyUrl, sectionTitle, sectionDescription } = articlesData;

  const handleArticleClick = (article: Article) => {
    trackEvent("article_click", "browse_intent", article.title);
  };

  const handleNewsletterClick = () => {
    trackEvent("newsletter_subscribe_click", "buy_intent", "articles_section");
  };

  const articleListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": articles.map((article: Article, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "url": article.url,
        "datePublished": article.dateISO,
        "author": {
          "@type": "Person",
          "name": "Rupesh Tiwari"
        },
        "publisher": {
          "@type": "Organization",
          "name": "FullStack Master"
        }
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleListSchema)}
        </script>
      </Helmet>
      <section
        id="articles"
        className="py-16 md:py-24"
        data-testid="section-articles"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary">
                <FileText className="w-3 h-3 mr-1" />
                Technical Blogs
              </Badge>
              <Badge className="bg-green-500 text-white border-0">
                FREE
              </Badge>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              data-testid="text-articles-title"
            >
              Latest <span className="text-primary">Articles & Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {sectionDescription}
            </p>
            <p className="text-sm text-primary font-medium mt-2">
              System Design, Leadership Principles, AWS Architecture & more
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
              {articles.map((article: Article) => (
                <CarouselItem
                  key={article.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full"
                    onClick={() => handleArticleClick(article)}
                    data-testid={`link-article-${article.id}`}
                  >
                    <Card className="h-full hover-elevate transition-all duration-200 overflow-hidden">
                      {article.image && (
                        <div className="relative h-32 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {article.featured && (
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between gap-2 mb-3">
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
                        <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <span className="text-xs text-muted-foreground">
                            {article.date}
                          </span>
                          <span className="text-xs text-primary flex items-center gap-1 group-hover:underline font-medium">
                            Read on LinkedIn
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
            <Button size="lg" asChild onClick={handleNewsletterClick} className="bg-primary hover:bg-primary/90">
              <a
                href={newsletterUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-subscribe-newsletter"
              >
                <SiLinkedin className="w-4 h-4 mr-2" />
                Subscribe to Newsletter
                <Badge className="ml-2 bg-green-500 text-white border-0 text-xs">FREE</Badge>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-company"
              >
                Follow FullStack Master
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Join 10,000+ engineers getting weekly System Design & Interview tips
          </p>
        </div>
      </section>
    </>
  );
}
