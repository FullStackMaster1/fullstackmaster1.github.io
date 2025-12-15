import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiGoogle } from "react-icons/si";

interface GoogleBusinessBadgeProps {
  variant?: "compact" | "full";
  className?: string;
}

export default function GoogleBusinessBadge({ variant = "compact", className = "" }: GoogleBusinessBadgeProps) {
  const googleBusinessUrl = "https://g.page/fullstackmaster";
  const rating = "5.0";
  const reviewCount = "50+";

  if (variant === "compact") {
    return (
      <a
        href={googleBusinessUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-card border border-border rounded-lg hover-elevate cursor-pointer ${className}`}
        data-testid="badge-google-business-compact"
      >
        <SiGoogle className="w-4 h-4 text-[#4285F4]" />
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm">{rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      </a>
    );
  }

  return (
    <Card className={`border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-950/20 dark:to-card ${className}`} data-testid="card-google-business">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white dark:bg-card shadow-sm flex items-center justify-center">
              <SiGoogle className="w-6 h-6 text-[#4285F4]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">{rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Google Verified
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{reviewCount} reviews</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline" asChild>
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-google-business"
            >
              View on Google
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
