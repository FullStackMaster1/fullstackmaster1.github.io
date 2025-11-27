import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import playlistsData from "@/data/playlists.json";
import { ExternalLink, Youtube, PlayCircle, Loader2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface Playlist {
  id: string | number;
  title: string;
  description: string;
  thumbnail?: string;
  videoCount: number;
  url: string;
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Card className="overflow-hidden h-full hover-elevate" data-testid={`card-playlist-${playlist.id}`}>
      <a
        href={playlist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {playlist.thumbnail ? (
          <div className="aspect-video relative overflow-hidden bg-muted">
            <img
              src={playlist.thumbnail}
              alt={playlist.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <PlayCircle className="w-12 h-12 text-white" />
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
              {playlist.videoCount} videos
            </Badge>
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <Youtube className="w-12 h-12 text-white" />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{playlist.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {playlist.description || "Watch the full playlist on YouTube"}
          </p>
        </CardContent>
      </a>
    </Card>
  );
}

function PlaylistSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <Skeleton className="aspect-video" />
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}

export default function PlaylistsCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const { data: playlists, isLoading, isError } = useQuery<Playlist[]>({
    queryKey: ["/api/youtube/playlists"],
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const displayPlaylists = playlists && playlists.length > 0 ? playlists : playlistsData;

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

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <PlaylistSkeleton key={i} />
            ))}
          </div>
        ) : (
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
              {displayPlaylists.map((playlist: Playlist) => (
                <CarouselItem
                  key={playlist.id}
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <PlaylistCard playlist={playlist} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12" data-testid="button-youtube-prev" />
              <CarouselNext className="-right-12" data-testid="button-youtube-next" />
            </div>
          </Carousel>
        )}

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
