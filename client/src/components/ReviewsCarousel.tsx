import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ReviewCard from "./ReviewCard";
import reviewsData from "@/data/reviews.json";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ReviewsCarousel() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 9);

  return (
    <section
      id="reviews"
      className="py-16 md:py-24"
      data-testid="section-reviews"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-reviews-title"
          >
            What My Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            50+ five-star reviews from engineers, architects, and leaders who
            landed their dream roles.
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

        <div className="flex justify-center gap-4 mt-8">
          {!showAll && reviewsData.length > 9 && (
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              data-testid="button-load-more-reviews"
            >
              Load More Reviews
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
    </section>
  );
}
