import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import PlaylistCard from "./PlaylistCard";
import playlistsData from "@/data/playlists.json";
import { ExternalLink, Youtube } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function PlaylistsCarousel() {
  return (
    <section
      id="youtube"
      className="py-16 md:py-24"
      data-testid="section-youtube"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Youtube className="w-8 h-8 text-red-500" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-youtube-title"
          >
            YouTube Playlists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free educational content on system design, AWS, DevOps, and career
            growth.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {playlistsData.map((playlist) => (
              <CarouselItem
                key={playlist.id}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <PlaylistCard
                  title={playlist.title}
                  url={playlist.url}
                  videoCount={playlist.videoCount}
                  description={playlist.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" data-testid="button-youtube-prev" />
            <CarouselNext className="-right-12" data-testid="button-youtube-next" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <a
              href="https://www.youtube.com/@FullStackMaster"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-youtube-channel"
            >
              <Youtube className="w-4 h-4 mr-2 text-red-500" />
              Visit Full Stack Master Channel
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
