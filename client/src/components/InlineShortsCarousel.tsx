import { useState } from "react";
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
import { Play, X, ExternalLink, Gift } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import youtubeData from "@/data/youtubeShorts.json";

interface PlaylistData {
  title: string;
  url: string;
  description: string;
}

interface Short {
  id: string;
  title: string;
  videoId: string;
  description: string;
}

function extractPlaylistId(url: string): string {
  const match = url.match(/list=([^&]+)/);
  return match ? match[1] : "";
}

function getAllPlaylists(): Short[] {
  const playlists = youtubeData.playlists as Record<string, PlaylistData>;
  return Object.entries(playlists).map(([key, playlist], index) => ({
    id: String(index + 1),
    title: playlist.title,
    videoId: extractPlaylistId(playlist.url),
    description: playlist.description
  }));
}

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

function VideoPlayer({ videoId, title, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
          onClick={onClose}
          data-testid="button-close-video"
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${videoId}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-white text-center mt-4 text-sm">{title}</p>
      </div>
    </div>
  );
}

interface ShortCardProps {
  short: Short;
  onPlay: (short: Short) => void;
}

function ShortCard({ short, onPlay }: ShortCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer group"
      onClick={() => onPlay(short)}
      data-testid={`card-short-${short.id}`}
    >
      <div className="aspect-video relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <SiYoutube className="w-12 h-12 text-white/80" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-white ml-1" />
          </div>
        </div>
        <Badge className="absolute top-2 left-2 bg-red-600 text-white border-0 text-xs">
          Playlist
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2">{short.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{short.description || "Click to watch playlist"}</p>
      </CardContent>
    </Card>
  );
}

export default function InlineShortsCarousel() {
  const [activeVideo, setActiveVideo] = useState<Short | null>(null);
  const featuredShorts = getAllPlaylists();

  const handlePlay = (short: Short) => {
    setActiveVideo(short);
    trackEvent("inline_video_play", "homepage", short.title);
  };

  const handleClose = () => {
    setActiveVideo(null);
    trackEvent("inline_video_close", "homepage", activeVideo?.title || "");
  };

  return (
    <>
      <section
        id="video-shorts"
        className="py-10 md:py-14 bg-gradient-to-b from-red-500/5 to-background"
        data-testid="section-video-shorts"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SiYoutube className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex justify-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                <Play className="w-3 h-3 mr-1" />
                Watch & Learn
              </Badge>
              <Badge className="bg-green-500 text-white border-0">
                <Gift className="w-3 h-3 mr-1" />
                100% FREE
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-shorts-title">
              Quick Video <span className="text-red-600">Playlists</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch interview tips right here. No redirects. Click any playlist to start learning instantly.
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
              {featuredShorts.map((short) => (
                <CarouselItem
                  key={short.id}
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ShortCard short={short} onPlay={handlePlay} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12" data-testid="button-shorts-prev" />
              <CarouselNext className="-right-12" data-testid="button-shorts-next" />
            </div>
          </Carousel>

          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <a
                href="https://www.youtube.com/@FullStackMaster/playlists"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-all-playlists"
              >
                <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
                View All Playlists
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoPlayer
          videoId={activeVideo.videoId}
          title={activeVideo.title}
          onClose={handleClose}
        />
      )}
    </>
  );
}
