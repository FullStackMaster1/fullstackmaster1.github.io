import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, X, ExternalLink, Gift } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import Autoplay from "embla-carousel-autoplay";
import youtubeData from "@/data/youtubeShorts.json";

interface PlaylistData {
  title: string;
  url: string;
  description: string;
}

interface Playlist {
  id: string;
  key: string;
  title: string;
  playlistId: string;
  url: string;
  description: string;
}

function extractPlaylistId(url: string): string {
  const match = url.match(/list=([^&]+)/);
  return match ? match[1] : "";
}

function getPlaylistsForPage(pageKey: string): Playlist[] {
  const playlists = youtubeData.playlists as Record<string, PlaylistData>;
  const pageMapping = youtubeData.pageMapping as Record<string, string[]>;
  
  const playlistKeys = pageMapping[pageKey] || [];
  
  return playlistKeys
    .filter(key => playlists[key])
    .map((key, index) => ({
      id: String(index + 1),
      key,
      title: playlists[key].title,
      playlistId: extractPlaylistId(playlists[key].url),
      url: playlists[key].url,
      description: playlists[key].description
    }));
}

function getAllPlaylists(): Playlist[] {
  const playlists = youtubeData.playlists as Record<string, PlaylistData>;
  return Object.entries(playlists).map(([key, playlist], index) => ({
    id: String(index + 1),
    key,
    title: playlist.title,
    playlistId: extractPlaylistId(playlist.url),
    url: playlist.url,
    description: playlist.description
  }));
}

interface VideoPlayerProps {
  playlistId: string;
  title: string;
  onClose: () => void;
}

function VideoPlayer({ playlistId, title, onClose }: VideoPlayerProps) {
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
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`}
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

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: (playlist: Playlist) => void;
}

function PlaylistCard({ playlist, onPlay }: PlaylistCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer group h-full"
      onClick={() => onPlay(playlist)}
      data-testid={`card-playlist-${playlist.key}`}
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
        <h3 className="font-semibold text-sm line-clamp-2">{playlist.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{playlist.description}</p>
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto mt-2 text-red-600 hover:text-red-700 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            window.open(playlist.url, "_blank");
          }}
          data-testid={`link-playlist-${playlist.key}`}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View on YouTube
        </Button>
      </CardContent>
    </Card>
  );
}

interface VideoTipsCarouselProps {
  pageKey?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoTipsCarousel({ 
  pageKey, 
  title = "Quick Video Tips",
  subtitle = "Watch interview tips right here. Click any playlist to start learning instantly."
}: VideoTipsCarouselProps) {
  const [activeVideo, setActiveVideo] = useState<Playlist | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const playlists = pageKey ? getPlaylistsForPage(pageKey) : getAllPlaylists();
  
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handlePlay = (playlist: Playlist) => {
    setActiveVideo(playlist);
    trackEvent("video_tips_play", pageKey || "all", playlist.title);
  };

  const handleClose = () => {
    setActiveVideo(null);
    trackEvent("video_tips_close", pageKey || "all", activeVideo?.title || "");
  };

  if (playlists.length === 0) return null;

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  return (
    <>
      <section
        className="py-10 md:py-14 bg-gradient-to-b from-red-500/5 to-background"
        data-testid="section-video-tips"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <SiYoutube className="w-6 h-6 text-red-500" />
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-video-tips-title">
              {title} <span className="text-red-600">Playlists</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {playlists.map((playlist) => (
                <CarouselItem
                  key={playlist.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PlaylistCard playlist={playlist} onPlay={handlePlay} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {playlists.length > 2 && (
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" data-testid="button-video-prev" />
                <CarouselNext className="-right-12" data-testid="button-video-next" />
              </div>
            )}
          </Carousel>

          <div className="flex items-center justify-center gap-2 mt-4">
            {playlists.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  current === idx ? "bg-red-500" : "bg-muted-foreground/30"
                }`}
                onClick={() => api?.scrollTo(idx)}
                data-testid={`dot-${idx}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" size="sm" asChild>
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
          playlistId={activeVideo.playlistId}
          title={activeVideo.title}
          onClose={handleClose}
        />
      )}
    </>
  );
}
