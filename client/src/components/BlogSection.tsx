import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, ExternalLink, BookOpen, FileText } from "lucide-react";
import blogPosts from "@/data/blogposts.json";

const categoryColors: Record<string, string> = {
  "Interview Prep": "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  "System Design": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Coding Interview": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Cloud Architecture": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  "Cloud Security": "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  "Architecture": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  "AWS": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
};

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visiblePosts = blogPosts.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section
      id="blog"
      className="py-16 md:py-24 bg-background"
      data-testid="section-blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <FileText className="w-3 h-3 mr-1" />
            Technical Blog
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-blog-title"
          >
            300+ Technical Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep-dive technical content on cloud architecture, system design, 
            and interview preparation. Published since 2010.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <Card
                key={post.id}
                className="group hover-elevate transition-all"
                data-testid={`card-blog-${post.id}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={categoryColors[post.category] || ""}
                    >
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-blog-read-${post.id}`}
                    >
                      Read Article
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={totalPages <= 1}
              data-testid="button-blog-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-blog-dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={totalPages <= 1}
              data-testid="button-blog-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://blog.rupeshtiwari.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-blog-all"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explore All 300+ Articles
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
