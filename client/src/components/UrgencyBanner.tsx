import { motion } from "framer-motion";
import { Clock, User, Calendar, Shield } from "lucide-react";

export default function UrgencyBanner() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      data-testid="urgency-banner"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 text-center">
          <User className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm font-medium text-foreground">
            <span className="text-amber-700 dark:text-amber-300">I personally coach every session</span> — no assistants, no delegation
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm border-t border-amber-500/20 pt-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">4-6 USA slots</strong> per week
            </span>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-border" />
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              EST, CST, MST & PST friendly
            </span>
          </div>
          
          <div className="hidden md:block w-px h-4 bg-border" />
          
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">
              Waitlist when full
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
