import { motion } from "framer-motion";
import { Play, Clock, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import profile from "@/data/profile.json";
import { trackEvent } from "@/lib/analytics";

export default function VideoIntroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "YKmWfEhRGZ8";

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent("video_intro_played", "engagement", "intro_video");
  };

  return (
    <section 
      className="py-16 bg-gradient-to-b from-background to-muted/30"
      data-testid="section-video-intro"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              <Play className="w-3 h-3 mr-1" />
              2-Minute Introduction
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Your Coach: <span className="text-primary">Rupesh Tiwari</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Before we work together, I want you to know exactly who I am and how I can help you land your dream role at a top tech company.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Award, text: "AWS Senior Customer Solutions Manager" },
                { icon: CheckCircle, text: "20+ years in enterprise tech" },
                { icon: Clock, text: "100+ leaders coached to FAANG offers" },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
            
            <Button asChild>
              <a 
                href={profile.contact.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("video_section_cta", "buy_intent", "book_call")}
              >
                Book a Free Strategy Call
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border bg-card">
              {!isPlaying ? (
                <div 
                  className="relative w-full h-full cursor-pointer group"
                  onClick={handlePlay}
                >
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-black/70 text-white border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      2:34
                    </Badge>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Introduction Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-3 shadow-lg border border-border hidden md:block">
              <p className="text-sm font-medium">No fluff, just value</p>
              <p className="text-xs text-muted-foreground">Watch before you decide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
