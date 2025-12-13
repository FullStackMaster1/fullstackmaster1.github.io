import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, X, ExternalLink, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { trackEvent } from "@/lib/analytics";
import youtubeData from "@/data/youtubeShorts.json";
import ScrollReveal from "@/components/ScrollReveal";

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
      <div className="relative w-full max-w-5xl">
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

interface PlaylistRowProps {
  playlist: Playlist;
  onPlay: (playlist: Playlist) => void;
}

function PlaylistRow({ playlist, onPlay }: PlaylistRowProps) {
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
            variant="default"
            size="sm"
            onClick={() => onPlay(playlist)}
            data-testid={`button-play-${playlist.key}`}
          >
            <Play className="w-4 h-4 mr-1" />
            Play All
          </Button>
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
  const [activeVideo, setActiveVideo] = useState<Playlist | null>(null);
  
  const playlists = pageKey ? getPlaylistsForPage(pageKey) : getAllPlaylists().slice(0, 4);

  const handlePlay = (playlist: Playlist) => {
    setActiveVideo(playlist);
    trackEvent("video_tips_play", pageKey || "all", playlist.title);
  };

  const handleClose = () => {
    setActiveVideo(null);
    trackEvent("video_tips_close", pageKey || "all", activeVideo?.title || "");
  };

  if (playlists.length === 0) return null;

  return (
    <>
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

          {playlists.map((playlist, idx) => (
            <ScrollReveal key={playlist.id} type="slide-up">
              <PlaylistRow playlist={playlist} onPlay={handlePlay} />
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
