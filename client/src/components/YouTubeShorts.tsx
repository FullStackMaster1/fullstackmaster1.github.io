import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, Play, ExternalLink } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import youtubeData from "@/data/youtubeShorts.json";
import { trackEvent } from "@/lib/analytics";

interface Playlist {
  title: string;
  url: string;
  description: string;
}

interface YouTubeShortsProps {
  pageKey: keyof typeof youtubeData.pageMapping;
  className?: string;
}

export default function YouTubeShorts({ pageKey, className = "" }: YouTubeShortsProps) {
  const playlistKeys = youtubeData.pageMapping[pageKey] || [];
  const playlists = playlistKeys
    .map(key => youtubeData.playlists[key as keyof typeof youtubeData.playlists])
    .filter(Boolean) as Playlist[];

  if (playlists.length === 0) return null;

  const handlePlaylistClick = (title: string) => {
    trackEvent("youtube_shorts_click", pageKey, title);
  };

  return (
    <section className={`py-12 bg-gradient-to-b from-red-500/5 to-background ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-red-500/10 text-red-600 border-red-500/20">
            <SiYoutube className="w-3 h-3 mr-1" />
            YouTube Shorts
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Quick Video Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch these short video playlists for quick, actionable interview tips you can apply immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((playlist, idx) => (
            <Card 
              key={idx} 
              className="group hover-elevate transition-all duration-300"
              data-testid={`card-playlist-${idx}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {playlist.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      onClick={() => handlePlaylistClick(playlist.title)}
                    >
                      <a 
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-playlist-${idx}`}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch Playlist
                        <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            asChild
            onClick={() => trackEvent("youtube_channel_click", pageKey, "view_all")}
          >
            <a 
              href="https://www.youtube.com/@FullStackMaster/playlists"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-youtube-channel"
            >
              <SiYoutube className="w-5 h-5 mr-2 text-red-600" />
              View All Playlists on YouTube
              <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
