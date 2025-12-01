import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Zap } from "lucide-react";

export default function UrgencyBanner() {
  const [slotsLeft, setSlotsLeft] = useState(5);
  const [viewersCount, setViewersCount] = useState(0);

  useEffect(() => {
    const storedSlots = localStorage.getItem("slots-left");
    if (storedSlots) {
      setSlotsLeft(parseInt(storedSlots));
    } else {
      const randomSlots = Math.floor(Math.random() * 4) + 3;
      setSlotsLeft(randomSlots);
      localStorage.setItem("slots-left", randomSlots.toString());
    }

    const randomViewers = Math.floor(Math.random() * 8) + 5;
    setViewersCount(randomViewers);

    const viewerInterval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(3, Math.min(15, newCount));
      });
    }, 8000);

    return () => clearInterval(viewerInterval);
  }, []);

  return (
    <motion.div 
      className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      data-testid="urgency-banner"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Zap className="w-4 h-4 text-amber-500" />
          </motion.div>
          <span className="text-foreground">
            <strong className="text-amber-600 dark:text-amber-400">{slotsLeft} slots</strong> left this month
          </span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-border" />
        
        <div className="flex items-center gap-2">
          <motion.div
            className="relative"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </motion.div>
          <span className="text-muted-foreground">
            <Users className="w-3 h-3 inline mr-1" />
            {viewersCount} people viewing now
          </span>
        </div>
        
        <div className="hidden md:block w-px h-4 bg-border" />
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>USA timezone slots: EST, CST, PST</span>
        </div>
      </div>
    </motion.div>
  );
}
