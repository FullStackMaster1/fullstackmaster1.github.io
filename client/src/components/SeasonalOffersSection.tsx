import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Users, ShieldCheck, Clock, Star, Gift, Check, ArrowRight, Timer, LucideIcon } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import promotionalOffers from "@/data/promotionalOffers.json";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  Clock,
  Star,
  Gift,
};

const themeColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  gold: {
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/20",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950/30 dark:via-sky-950/20 dark:to-cyan-950/20",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-700 dark:text-blue-400",
    badge: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
  },
  green: {
    bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/20 dark:to-teal-950/20",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-700 dark:text-green-400",
    badge: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  },
};

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  theme: string;
  badge: string;
  originalValue: string;
  offerValue: string;
  savings: string;
  includes: string[];
  bonus: string;
  ctaText: string;
  ctaLink: string;
  urgency: string;
}

interface TrustPoint {
  icon: string;
  text: string;
}

interface HolidayOffer {
  id: string;
  startDate: string;
  endDate: string;
  sectionTitle: string;
  sectionSubtitle: string;
  sectionBadge: string;
  offers: Offer[];
  trustPoints: TrustPoint[];
  footnote: string;
}

interface DefaultOffer {
  id: string;
  sectionTitle: string;
  sectionSubtitle: string;
  sectionBadge: string;
  offers: Offer[];
  trustPoints: TrustPoint[];
  footnote: string;
}

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiresAt).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap" data-testid="countdown-timer">
      <Timer className="w-5 h-5 text-red-500 animate-pulse" />
      <span className="text-sm font-medium text-muted-foreground">Offer ends in:</span>
      <div className="flex gap-2">
        {[
          { value: timeLeft.days, label: "days" },
          { value: timeLeft.hours, label: "hrs" },
          { value: timeLeft.minutes, label: "min" },
          { value: timeLeft.seconds, label: "sec" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-lg font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-2 py-1 rounded min-w-[36px] text-center">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getActiveHoliday(): { holiday: HolidayOffer | null; endDate: string | null } {
  const now = new Date();
  const holidays = promotionalOffers.holidays as HolidayOffer[];
  
  for (const holiday of holidays) {
    const startDate = new Date(holiday.startDate);
    const endDate = new Date(holiday.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    if (now >= startDate && now <= endDate) {
      return { holiday, endDate: holiday.endDate + "T23:59:59Z" };
    }
  }
  
  return { holiday: null, endDate: null };
}

export default function SeasonalOffersSection() {
  const { holiday: activeHoliday, endDate } = useMemo(() => getActiveHoliday(), []);
  
  const currentOffer = activeHoliday || (promotionalOffers.defaultOffer as DefaultOffer);
  const offers = currentOffer.offers as Offer[];
  const trustPoints = currentOffer.trustPoints as TrustPoint[];

  return (
    <section
      id="offers"
      className="py-10 md:py-14 bg-gradient-to-b from-background via-primary/5 to-background"
      data-testid="section-seasonal-offers"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-3 bg-gradient-to-r from-red-500 via-green-500 to-red-500 text-white animate-pulse">
            <Gift className="w-3 h-3 mr-1" />
            {currentOffer.sectionBadge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-offers-title">
            {currentOffer.sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {currentOffer.sectionSubtitle}
          </p>
          {activeHoliday && endDate && (
            <CountdownTimer expiresAt={endDate} />
          )}
        </motion.div>

        <div className={`grid grid-cols-1 ${offers.length === 1 ? 'md:max-w-md md:mx-auto' : offers.length === 2 ? 'md:grid-cols-2 md:max-w-3xl md:mx-auto' : 'md:grid-cols-3'} gap-6 mb-8`}>
          {offers.map((offer, index) => {
            const IconComponent = iconMap[offer.icon] || Gift;
            const theme = themeColors[offer.theme] || themeColors.gold;
            
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden h-full ${theme.bg} ${theme.border} border-2 shadow-lg`}
                  data-testid={`card-offer-${offer.id}`}
                >
                  <div className={`absolute top-0 right-0 ${theme.badge} px-4 py-1 text-xs font-bold rounded-bl-lg`}>
                    {offer.badge}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm`}>
                        <IconComponent className={`w-6 h-6 ${theme.text}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className={`text-4xl font-bold ${theme.text}`}>{offer.offerValue}</span>
                      {offer.originalValue !== offer.offerValue && (
                        <span className="text-lg text-muted-foreground line-through">{offer.originalValue}</span>
                      )}
                    </div>
                    {offer.savings && (
                      <Badge className={`mt-2 ${theme.badge} font-bold`}>
                        {offer.savings}
                      </Badge>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-2.5 mb-4">
                      {offer.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme.text}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className={`p-3 rounded-lg bg-white/70 dark:bg-slate-800/70 border ${theme.border} mb-4`}>
                      <p className="text-xs font-medium flex items-center gap-1.5">
                        <Sparkles className={`w-3.5 h-3.5 ${theme.text}`} />
                        <span className={theme.text}>Bonus:</span>
                        <span className="text-muted-foreground">{offer.bonus}</span>
                      </p>
                    </div>
                    
                    <Button
                      size="lg"
                      className={`w-full ${theme.badge} font-bold shadow-md`}
                      asChild
                    >
                      <a
                        href={offer.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-offer-${offer.id}`}
                      >
                        <SiWhatsapp className="w-4 h-4 mr-2" />
                        {offer.ctaText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      {offer.urgency}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {trustPoints.map((point, index) => {
            const PointIcon = iconMap[point.icon] || ShieldCheck;
            return (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <PointIcon className="w-4 h-4 text-green-500" />
                <span>{point.text}</span>
              </div>
            );
          })}
        </motion.div>

        <p className="text-xs text-center text-muted-foreground max-w-2xl mx-auto">
          {currentOffer.footnote}
        </p>
      </div>
    </section>
  );
}
