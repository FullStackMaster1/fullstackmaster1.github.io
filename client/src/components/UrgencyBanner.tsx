import { motion } from "framer-motion";
import { Clock, Globe, Shield } from "lucide-react";

export default function UrgencyBanner() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      data-testid="urgency-banner"
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-foreground">
            <strong className="text-primary">USA Timezone Friendly</strong> • EST, CST, MST & PST slots
          </span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-border" />
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            Flexible scheduling for busy professionals
          </span>
        </div>
        
        <div className="hidden md:block w-px h-4 bg-border" />
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-muted-foreground">
            Satisfaction guaranteed
          </span>
        </div>
      </div>
    </motion.div>
  );
}
