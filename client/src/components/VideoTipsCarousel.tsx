import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, X, ExternalLink, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import youtubeData from "@/data/youtubeShorts.json";
import ScrollReveal from "@/components/ScrollReveal";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  position: number;
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
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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

interface PlaylistRowProps {
  playlist: Playlist;
}

function PlaylistRow({ playlist }: PlaylistRowProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");
  
  const autoplayPlugin = Autoplay({ delay: 4000, stopOnInteraction: true });
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoplayPlugin]
  );
  
  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['/api/youtube/playlist', playlist.playlistId, 'videos'],
    queryFn: async () => {
      const response = await fetch(`/api/youtube/playlist/${playlist.playlistId}/videos?maxResults=12`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!playlist.playlistId,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handlePlayVideo = (video: Video) => {
    setActiveVideoId(video.id);
    setActiveVideoTitle(video.title);
    trackEvent("video_play", playlist.key, video.title);
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
    setActiveVideoTitle("");
  };

  return (
    <div className="mb-10" data-testid={`playlist-row-${playlist.key}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <SiYoutube className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{playlist.title}</h3>
            <p className="text-sm text-muted-foreground">{playlist.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-playlist-${playlist.key}`}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              YouTube
            </a>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="flex-none w-[280px] md:w-[320px]"
                >
                  <Card 
                    className="overflow-hidden hover-elevate cursor-pointer group"
                    onClick={() => handlePlayVideo(video)}
                    data-testid={`video-card-${video.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-2">{video.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {videos.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background shadow-lg hidden md:flex"
                onClick={scrollPrev}
                data-testid={`button-prev-${playlist.key}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-background shadow-lg hidden md:flex"
                onClick={scrollNext}
                data-testid={`button-next-${playlist.key}`}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video md:aspect-[21/9] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`}
                title={playlist.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeVideoId && (
        <VideoPlayer
          videoId={activeVideoId}
          title={activeVideoTitle}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}

interface VideoTipsCarouselProps {
  pageKey?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoTipsCarousel({ 
  pageKey, 
  title = "Video Playlists",
  subtitle = "Watch these curated video playlists for quick, actionable interview tips you can apply immediately."
}: VideoTipsCarouselProps) {
  const playlists = pageKey ? getPlaylistsForPage(pageKey) : getAllPlaylists().slice(0, 4);

  if (playlists.length === 0) return null;

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-b from-red-500/5 to-background"
      data-testid="section-video-tips"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal type="fade">
          <div className="text-center mb-10">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                <SiYoutube className="w-3 h-3 mr-1" />
                YouTube Shorts
              </Badge>
              <Badge className="bg-green-500 text-white border-0">
                <Gift className="w-3 h-3 mr-1" />
                FREE
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-video-tips-title">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {playlists.map((playlist) => (
          <ScrollReveal key={playlist.id} type="slide-up">
            <PlaylistRow playlist={playlist} />
          </ScrollReveal>
        ))}

        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild>
            <a
              href="https://www.youtube.com/@FullStackMaster/playlists"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-all-playlists"
            >
              <SiYoutube className="w-4 h-4 mr-2 text-red-500" />
              View All Playlists on YouTube
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
