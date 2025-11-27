import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReviewCard from "./ReviewCard";
import reviewsData from "@/data/reviews.json";
import { useState } from "react";
import { ExternalLink, Star, Users } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function ReviewsCarousel() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 9);
  const totalReviews = reviewsData.length;

  return (
    <section
      id="reviews"
      className="py-16 md:py-24"
      data-testid="section-reviews"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
              {totalReviews}+ Five-Star Reviews
            </Badge>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-reviews-title"
          >
            What My Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from engineers, architects, and leaders who
            landed their dream roles at FAANG and top tech companies.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {displayedReviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard
                  name={review.name}
                  date={review.date}
                  rating={review.rating}
                  text={review.text}
                  session={review.session}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" data-testid="button-reviews-prev" />
            <CarouselNext className="-right-12" data-testid="button-reviews-next" />
          </div>
        </Carousel>

        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-sm text-muted-foreground">
            Showing {displayedReviews.length} of {totalReviews} reviews
          </p>
          <div className="flex justify-center gap-4">
            {!showAll && reviewsData.length > 9 && (
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                data-testid="button-load-more-reviews"
              >
                Load All {totalReviews - 9} More Reviews
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
            <Button variant="outline" asChild>
              <a
                href="https://www.igotanoffer.com/en/coaching/rupesh-tiwari"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-all-reviews"
              >
                View All on IGotAnOffer
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
