import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "./ReviewCard";
import reviewsData from "@/data/reviews.json";
import { useState, useRef } from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { ExternalLink, Star, Trophy, CheckCircle, Quote, ChevronRight, Sparkles, Shield, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";
import Autoplay from "embla-carousel-autoplay";
import { SectionShareButtons } from "@/components/SocialShare";
import { motion } from "framer-motion";

// Helper to parse date strings like "Nov 09, 2025" to Date objects
const parseReviewDate = (dateStr: string): Date => {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

// Sort reviews by date (newest first)
const sortedReviews = [...reviewsData].sort((a, b) => 
  parseReviewDate(b.date).getTime() - parseReviewDate(a.date).getTime()
);

export default function ReviewsCarousel() {
  const sectionRef = useSectionTracking({ 
    sectionName: 'reviews',
    funnelStep: 'desire'
  });

  const [showAll, setShowAll] = useState(false);
  const [filterCompany, setFilterCompany] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'success'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalReviews = sortedReviews.length;
  
  // Get unique companies and roles for filters
  const companies = Array.from(new Set(sortedReviews.map((r: any) => r.company || r.offerCompany).filter(Boolean)));
  const roles = Array.from(new Set(sortedReviews.map((r: any) => r.title).filter(Boolean)));
  
  // Filter reviews based on active filters
  const filteredReviews = sortedReviews.filter((r: any) => {
    if (filterCompany && r.company !== filterCompany && r.offerCompany !== filterCompany) return false;
    if (filterRole && !r.title?.toLowerCase().includes(filterRole.toLowerCase())) return false;
    if (filterOutcome === 'success' && !r.gotOffer) return false;
    if (searchQuery && !r.text.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
  // Featured reviews with offers - sorted newest first
  const featuredReviews = filteredReviews.filter((r: any) => r.gotOffer === true).slice(0, 3);
  
  // Other reviews for carousel - sorted newest first
  const carouselReviews = filteredReviews.filter((r: any) => !r.gotOffer).slice(0, showAll ? 30 : 12);
  
  const hasActiveFilters = filterCompany || filterRole || filterOutcome !== 'all' || searchQuery;
  
  const clearFilters = () => {
    setFilterCompany(null);
    setFilterRole(null);
    setFilterOutcome('all');
    setSearchQuery('');
    trackEvent('review_filters_cleared', 'engagement', 'reviews');
  };
  
  const handleFilterChange = (type: string, value: string) => {
    trackEvent('review_filter_applied', 'engagement', `${type}_${value}`);
    if (type === 'company') setFilterCompany(value === filterCompany ? null : value);
    if (type === 'role') setFilterRole(value === filterRole ? null : value);
    if (type === 'outcome') setFilterOutcome(value as 'all' | 'success');
  };

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  // Aggregate rating for structured data
  const avgRating = (reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length).toFixed(1);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-12 md:py-16"
      data-testid="section-reviews"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content="FAANG Interview Coaching by Rupesh Tiwari" />
      <div 
        itemProp="aggregateRating" 
        itemScope 
        itemType="https://schema.org/AggregateRating"
        className="hidden"
      >
        <meta itemProp="ratingValue" content={avgRating} />
        <meta itemProp="reviewCount" content={String(totalReviews)} />
        <meta itemProp="bestRating" content="5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with trust signals */}
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm px-4 py-1.5 shadow-sm cursor-pointer">
                <Star className="w-4 h-4 fill-white mr-1.5" />
                {avgRating} Average Rating
              </Badge>
            </motion.div>
            <Badge variant="secondary" className="text-sm px-3 py-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
              {totalReviews}+ Verified Reviews
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1.5 border-green-500 text-green-600">
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              IGotAnOffer Verified
            </Badge>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-reviews-title"
          >
            What <span className="text-primary">Rupesh's Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real feedback from engineers, architects, and executives who 
            landed offers at Amazon, Google, DraftKings, Red Hat, and more.
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  trackEvent('review_search', 'engagement', e.target.value);
                }}
                className="flex-1"
              />
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Filter className="w-4 h-4" />
                Filter by:
              </span>
              
              <Button
                variant={filterOutcome === 'success' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('outcome', filterOutcome === 'success' ? 'all' : 'success')}
              >
                <Trophy className="w-3 h-3 mr-1" />
                Success Stories Only
              </Button>
              
              {companies.slice(0, 5).map((company) => (
                <Button
                  key={company}
                  variant={filterCompany === company ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('company', company)}
                >
                  {company}
                </Button>
              ))}
              
              {roles.slice(0, 3).map((role) => (
                <Button
                  key={role}
                  variant={filterRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('role', role)}
                >
                  {role}
                </Button>
              ))}
            </div>
            
            {hasActiveFilters && (
              <p className="text-sm text-center text-muted-foreground">
                Showing {filteredReviews.length} of {totalReviews} reviews
              </p>
            )}
          </div>
        </div>

        {/* STATIC FEATURED REVIEWS - Best for SEO */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold text-center">Success Stories - They Got The Offer</h3>
            <Sparkles className="w-5 h-5 text-green-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                itemScope
                itemType="https://schema.org/Review"
                itemProp="review"
              >
                <meta itemProp="author" content={review.name} />
                <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden">
                  <meta itemProp="ratingValue" content={String(review.rating)} />
                  <meta itemProp="bestRating" content="5" />
                </div>
                <ReviewCard
                  name={review.name}
                  title={(review as any).title}
                  company={(review as any).company}
                  date={review.date}
                  rating={review.rating}
                  text={review.text}
                  session={review.session}
                  gotOffer={(review as any).gotOffer}
                  offerCompany={(review as any).offerCompany}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CAROUSEL - More reviews for engagement */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="text-lg font-medium text-muted-foreground text-center">More Client Reviews</h3>
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
              {carouselReviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <ReviewCard
                    name={review.name}
                    title={(review as any).title}
                    company={(review as any).company}
                    date={review.date}
                    rating={review.rating}
                    text={review.text}
                    session={review.session}
                    gotOffer={(review as any).gotOffer}
                    offerCompany={(review as any).offerCompany}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12" data-testid="button-reviews-prev" />
              <CarouselNext className="-right-12" data-testid="button-reviews-next" />
            </div>
          </Carousel>
          
          {/* Manual navigation hint for mobile */}
          <p className="text-xs text-center text-muted-foreground mt-4 md:hidden">
            Swipe to see more reviews
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Showing {featuredReviews.length + carouselReviews.length} of {totalReviews} reviews</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {!showAll && (
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                data-testid="button-load-more-reviews"
                className="group"
              >
                Load More Reviews
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            {showAll && (
              <Button
                variant="ghost"
                onClick={() => setShowAll(false)}
                data-testid="button-show-less-reviews"
              >
                Show Less
              </Button>
            )}
            <Button className="bg-gradient-to-r from-primary to-blue-600" asChild>
              <a
                href="https://igotanoffer.com/en/coach/rupesh"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-all-reviews"
              >
                <Star className="w-4 h-4 mr-2 fill-white" />
                View All {totalReviews} Reviews on IGotAnOffer
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          
          <SectionShareButtons sectionName="Client Success Stories" />
        </div>
      </div>
    </section>
  );
}
