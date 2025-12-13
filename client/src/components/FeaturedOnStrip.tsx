import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SiUdemy, SiPluralsight, SiYoutube, SiLinkedin } from "react-icons/si";
import { Star, Users, BookOpen, Play } from "lucide-react";

const platforms = [
  {
    name: "Udemy",
    icon: SiUdemy,
    color: "text-purple-600",
    stat: "4.6",
    statLabel: "Rating",
    statIcon: Star,
    url: "https://www.udemy.com/user/rupesh-k-tiwari/",
  },
  {
    name: "Pluralsight",
    icon: SiPluralsight,
    color: "text-pink-500",
    stat: "5",
    statLabel: "Courses",
    statIcon: BookOpen,
    url: "https://www.pluralsight.com/authors/rupesh-tiwari",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    color: "text-red-600",
    stat: "500+",
    statLabel: "Videos",
    statIcon: Play,
    url: "https://www.youtube.com/@FullStackMaster",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    color: "text-blue-600",
    stat: "10K+",
    statLabel: "Followers",
    statIcon: Users,
    url: "https://www.linkedin.com/in/rupesh-tiwari/",
  },
];

export default function FeaturedOnStrip() {
  return (
    <section className="py-6 bg-gradient-to-r from-primary/5 via-background to-primary/5" data-testid="section-featured-on">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            Published Author & Educator
          </Badge>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const StatIcon = platform.statIcon;
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-border/50 hover-elevate transition-all"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                data-testid={`featured-${platform.name.toLowerCase()}`}
              >
                <Icon className={`w-6 h-6 ${platform.color}`} />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{platform.name}</span>
                  <div className="flex items-center gap-1">
                    <StatIcon className="w-3 h-3 text-amber-500" />
                    <span className="text-sm font-bold">{platform.stat}</span>
                    <span className="text-xs text-muted-foreground">{platform.statLabel}</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
