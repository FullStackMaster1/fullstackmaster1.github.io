import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote, CheckCircle, Building2, Sparkles, Trophy } from "lucide-react";
import { SiAmazon, SiGoogle, SiDatabricks, SiRedhat } from "react-icons/si";

const companyIcons: Record<string, any> = {
  "Amazon": SiAmazon,
  "Google": SiGoogle,
  "Databricks": SiDatabricks,
  "Red Hat": SiRedhat,
  "DraftKings": Trophy,
  "FAANG": Sparkles,
};

const companyStyles: Record<string, { text: string; bg: string; border: string }> = {
  "Amazon": { text: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800" },
  "Google": { text: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
  "Databricks": { text: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800" },
  "Red Hat": { text: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800" },
  "DraftKings": { text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
  "FAANG": { text: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800" },
};

interface ReviewCardProps {
  name: string;
  title?: string;
  company?: string;
  date: string;
  rating: number;
  text: string;
  session: string;
  gotOffer?: boolean;
  offerCompany?: string;
}

export default function ReviewCard({
  name,
  title,
  company,
  date,
  rating,
  text,
  session,
  gotOffer,
  offerCompany,
}: ReviewCardProps) {
  const CompanyIcon = company ? companyIcons[company] : null;
  const companyStyle = company ? companyStyles[company] : null;
  const OfferIcon = offerCompany ? companyIcons[offerCompany] : null;
  const offerStyle = offerCompany ? companyStyles[offerCompany] : null;

  // Determine card styling based on offer status and company
  const getCardStyle = () => {
    if (gotOffer && offerStyle) {
      return `${offerStyle.bg} ${offerStyle.border} border-2`;
    }
    if (gotOffer) {
      return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-2 border-green-300 dark:border-green-700';
    }
    if (companyStyle) {
      return `${companyStyle.bg} ${companyStyle.border} border`;
    }
    return 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border border-slate-200 dark:border-slate-700';
  };

  return (
    <Card className={`h-full ${getCardStyle()} shadow-sm hover:shadow-md transition-shadow`} data-testid={`card-review-${name.toLowerCase()}`}>
      <CardContent className="p-6 flex flex-col h-full">
        {gotOffer && (
          <div className="flex items-center gap-2 mb-3 -mt-1">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs shadow-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              Got Offer
            </Badge>
            {offerCompany && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">at</span>
                {OfferIcon && <OfferIcon className={`w-4 h-4 ${offerStyle?.text || 'text-green-600'}`} />}
                <span className={`text-xs font-bold ${offerStyle?.text || 'text-green-600'}`}>{offerCompany}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className={`ring-2 ${gotOffer ? 'ring-green-400' : companyStyle ? companyStyle.border.replace('border-', 'ring-') : 'ring-primary/20'}`}>
              <AvatarFallback className={`font-semibold ${gotOffer ? 'bg-green-500/20 text-green-700 dark:text-green-400' : companyStyle ? `${companyStyle.bg} ${companyStyle.text}` : 'bg-primary/10 text-primary'}`}>
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
                <div className="flex items-center gap-1.5">
                  {CompanyIcon ? (
                    <CompanyIcon className={`w-3.5 h-3.5 ${companyStyle?.text || 'text-muted-foreground'}`} />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <p className={`text-xs font-medium ${companyStyle?.text || 'text-muted-foreground'}`}>{company}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>
          <Quote className={`w-8 h-8 ${companyStyle?.text || 'text-primary'} opacity-20`} />
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-foreground/80 flex-1 line-clamp-4 mb-4 leading-relaxed">
          "{text}"
        </p>

        <Badge variant="secondary" className={`w-fit text-xs ${companyStyle ? `${companyStyle.bg} ${companyStyle.text} border ${companyStyle.border}` : ''}`}>
          {session}
        </Badge>
      </CardContent>
    </Card>
  );
}
