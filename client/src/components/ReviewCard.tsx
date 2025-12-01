import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

interface ReviewCardProps {
  name: string;
  title?: string;
  company?: string;
  date: string;
  rating: number;
  text: string;
  session: string;
}

export default function ReviewCard({
  name,
  title,
  company,
  date,
  rating,
  text,
  session,
}: ReviewCardProps) {
  return (
    <Card className="h-full" data-testid={`card-review-${name.toLowerCase()}`}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold" data-testid={`text-reviewer-${name.toLowerCase()}`}>
                {name}
              </p>
              {title && (
                <p className="text-xs font-medium text-primary">{title}</p>
              )}
              {company && (
                <p className="text-xs text-muted-foreground">{company}</p>
              )}
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>
          <Quote className="w-8 h-8 text-primary/20" />
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground flex-1 line-clamp-4 mb-4">
          "{text}"
        </p>

        <Badge variant="secondary" className="w-fit text-xs">
          {session}
        </Badge>
      </CardContent>
    </Card>
  );
}
