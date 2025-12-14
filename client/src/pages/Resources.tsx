import Navigation from "@/components/Navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import GumroadSection from "@/components/GumroadSection";
import CoursesCarousel from "@/components/CoursesCarousel";
import PlaylistsCarousel from "@/components/PlaylistsCarousel";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { 
  BookOpen, 
  FolderOpen, 
  Youtube, 
  HelpCircle, 
  PenTool, 
  GitBranch, 
  Calculator, 
  Timer,
  ExternalLink,
  Star,
  Layers,
  Target,
  MessageSquare
} from "lucide-react";
import resourcesData from "@/data/resources.json";
import profileData from "@/data/profile.json";

const iconMap: Record<string, any> = {
  FolderOpen,
  Youtube,
  BookOpen,
  HelpCircle,
  PenTool,
  GitBranch,
  Calculator,
  Timer
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{resourcesData.seo.title}</title>
        <meta name="description" content={resourcesData.seo.description} />
        <meta name="keywords" content={resourcesData.seo.keywords.join(", ")} />
        <meta property="og:title" content={resourcesData.seo.title} />
        <meta property="og:description" content={resourcesData.seo.description} />
        <meta property="og:image" content="https://www.fullstackmaster.net/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.fullstackmaster.net/og-image.png" />
      </Helmet>
      <AnnouncementBar />
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-resources">
              <BookOpen className="w-3 h-3 mr-1" />
              {resourcesData.hero.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {resourcesData.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {resourcesData.hero.description}
            </p>
          </div>
        </section>

        {/* Free Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Star className="w-3 h-3 mr-1" />
                Start Here
              </Badge>
              <h2 className="text-3xl font-bold">{resourcesData.freeResources.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourcesData.freeResources.items.map((item) => {
                const IconComponent = iconMap[item.icon] || BookOpen;
                return (
                  <Card key={item.id} className="hover-elevate relative" data-testid={`card-resource-${item.id}`}>
                    {item.badge && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full" data-testid={`button-resource-${item.id}`}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          Access Free
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <PenTool className="w-3 h-3 mr-1" />
                Tools
              </Badge>
              <h2 className="text-3xl font-bold">{resourcesData.tools.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourcesData.tools.items.map((tool) => {
                const IconComponent = iconMap[tool.icon] || PenTool;
                return (
                  <Card key={tool.id} className="hover-elevate" data-testid={`card-tool-${tool.id}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <Badge variant="secondary" className="text-xs">{tool.useCase}</Badge>
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription className="text-sm">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="ghost" size="sm" className="w-full" data-testid={`button-tool-${tool.id}`}>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          Open Tool
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <BookOpen className="w-3 h-3 mr-1" />
                Reading List
              </Badge>
              <h2 className="text-3xl font-bold">{resourcesData.books.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData.books.items.map((book) => (
                <Card key={book.id} className="hover-elevate" data-testid={`card-book-${book.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                      <Badge 
                        variant={book.priority === "Essential" ? "default" : "outline"}
                        className={book.priority === "Essential" ? "bg-primary text-primary-foreground" : ""}
                      >
                        {book.priority}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <CardDescription className="mt-2">{book.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Layers className="w-3 h-3 mr-1" />
                Proven Methods
              </Badge>
              <h2 className="text-3xl font-bold">{resourcesData.frameworks.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {resourcesData.frameworks.items.map((framework) => (
                <Card key={framework.id} className="hover-elevate" data-testid={`card-framework-${framework.id}`}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default" className="text-lg font-bold px-3 py-1">
                        {framework.name}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-primary">{framework.fullName}</p>
                    <CardDescription className="mt-2">{framework.description}</CardDescription>
                    <Badge variant="outline" className="mt-2 w-fit">{framework.useCase}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {framework.steps.map((step, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {step}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rubrics Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-3 h-3 mr-1" />
                Insider Knowledge
              </Badge>
              <h2 className="text-3xl font-bold">{resourcesData.rubrics.title}</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Understand exactly how interviewers evaluate you. These are the actual criteria used in FAANG interview debriefs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* System Design Rubric */}
              <Card data-testid="card-rubric-system-design">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    {resourcesData.rubrics.systemDesign.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resourcesData.rubrics.systemDesign.criteria.map((criterion, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 min-w-[50px] justify-center">
                        {criterion.weight}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{criterion.name}</p>
                        <p className="text-xs text-muted-foreground">{criterion.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Behavioral Rubric */}
              <Card data-testid="card-rubric-behavioral">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    {resourcesData.rubrics.behavioral.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resourcesData.rubrics.behavioral.criteria.map((criterion, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Badge variant="outline" className="shrink-0 min-w-[50px] justify-center">
                        {criterion.weight}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{criterion.name}</p>
                        <p className="text-xs text-muted-foreground">{criterion.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{resourcesData.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{resourcesData.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-cta-primary">
                <a href={profileData.contact.bookingLink} target="_blank" rel="noopener noreferrer">
                  {resourcesData.cta.primaryButton}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-cta-secondary">
                <a href="/#pricing">
                  {resourcesData.cta.secondaryButton}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Existing Content Sections */}
        <GumroadSection />
        <CoursesCarousel />
        <PlaylistsCarousel />
        <ArticlesSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
