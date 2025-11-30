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
import playlistsData from "@/data/playlists.json";
import { ExternalLink, Youtube, PlayCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface Playlist {
  id: string | number;
  title: string;
  description: string;
  thumbnail?: string;
  videoCount: number;
  url: string;
}

const isValidThumbnail = (url?: string): boolean => {
  if (!url) return false;
  if (url.includes("no_thumbnail.jpg")) return false;
  if (url.includes("default.jpg") && url.includes("vi/")) return true;
  return true;
};

const getPlaylistGradient = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("system design")) return "from-blue-600 to-indigo-700";
  if (lowerTitle.includes("behavioral") || lowerTitle.includes("leadership")) return "from-amber-500 to-orange-600";
  if (lowerTitle.includes("coding") || lowerTitle.includes("swe") || lowerTitle.includes("software")) return "from-green-600 to-emerald-700";
  if (lowerTitle.includes("tpm") || lowerTitle.includes("program")) return "from-purple-600 to-violet-700";
  if (lowerTitle.includes("resume") || lowerTitle.includes("linkedin")) return "from-cyan-500 to-blue-600";
  if (lowerTitle.includes("director") || lowerTitle.includes("executive")) return "from-slate-600 to-zinc-800";
  if (lowerTitle.includes("data") || lowerTitle.includes("engineer")) return "from-teal-500 to-cyan-600";
  if (lowerTitle.includes("sre") || lowerTitle.includes("reliability")) return "from-rose-500 to-red-600";
  if (lowerTitle.includes("career") || lowerTitle.includes("coach")) return "from-pink-500 to-rose-600";
  if (lowerTitle.includes("aws") || lowerTitle.includes("cloud")) return "from-orange-500 to-amber-600";
  return "from-red-500 to-red-700";
};

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const hasValidThumbnail = isValidThumbnail(playlist.thumbnail);
  const gradientClass = getPlaylistGradient(playlist.title);
  
  return (
    <Card className="overflow-hidden h-full hover-elevate" data-testid={`card-playlist-${playlist.id}`}>
      <a
        href={playlist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {hasValidThumbnail ? (
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
          <div className={`aspect-video bg-gradient-to-br ${gradientClass} flex items-center justify-center relative`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <Youtube className="w-10 h-10 text-white/90 mb-2" />
              <p className="text-white/90 text-xs font-medium text-center line-clamp-2 px-2">
                {playlist.title.length > 40 ? playlist.title.substring(0, 40) + "..." : playlist.title}
              </p>
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/50 text-white">
              {playlist.videoCount} videos
            </Badge>
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

export default function PlaylistsCarousel() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const playlists = playlistsData as Playlist[];

  return (
    <section
      id="youtube"
      className="py-10 md:py-14"
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
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="-ml-4">
            {playlists.map((playlist: Playlist) => (
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
