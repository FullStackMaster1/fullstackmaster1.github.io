import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, ExternalLink } from "lucide-react";

interface CourseCardProps {
  title: string;
  url: string;
  thumbnail: string;
  students: number;
  rating: number;
  platform: "udemy" | "pluralsight";
}

export default function CourseCard({
  title,
  url,
  thumbnail,
  students,
  rating,
  platform,
}: CourseCardProps) {
  const platformColors = {
    udemy: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    pluralsight: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  };

  const formatStudents = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      data-testid={`link-course-${title.toLowerCase().replace(/ /g, "-")}`}
    >
      <Card className="overflow-hidden h-full hover-elevate transition-all duration-200">
        <div className="relative aspect-video bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/480x270?text=Course";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <CardContent className="p-4">
          <Badge className={`mb-2 text-xs ${platformColors[platform]}`}>
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </Badge>
          <h3 className="font-semibold text-sm line-clamp-2 mb-3">{title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{formatStudents(students)} students</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
