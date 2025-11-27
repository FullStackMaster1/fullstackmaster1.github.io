import { Card, CardContent } from "@/components/ui/card";
import { Play, Video } from "lucide-react";

interface PlaylistCardProps {
  title: string;
  url: string;
  videoCount: number;
  description: string;
}

export default function PlaylistCard({
  title,
  url,
  videoCount,
  description,
}: PlaylistCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      data-testid={`link-playlist-${title.toLowerCase().replace(/ /g, "-")}`}
    >
      <Card className="overflow-hidden h-full hover-elevate transition-all duration-200">
        <div className="relative aspect-video bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex flex-col items-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-white" />
            </div>
            <span className="text-sm font-medium">{videoCount} videos</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Video className="w-3 h-3" />
            <span>Watch Now</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
