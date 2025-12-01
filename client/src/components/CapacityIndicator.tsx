import { motion } from "framer-motion";
import { Clock, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CapacityIndicator() {
  const currentWeekSlots = 2;
  const totalWeeklySlots = 6;
  const slotsRemaining = totalWeeklySlots - currentWeekSlots;
  const percentFilled = (currentWeekSlots / totalWeeklySlots) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-lg shadow-sm"
      data-testid="capacity-indicator"
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className="text-sm">
          <span className="font-semibold text-foreground">{slotsRemaining} slots</span>
          <span className="text-muted-foreground"> this week</span>
        </div>
      </div>
      
      <div className="h-4 w-px bg-border" />
      
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${percentFilled}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.round(percentFilled)}% booked
        </span>
      </div>
    </motion.div>
  );
}

export function MiniCapacityBadge() {
  return (
    <Badge 
      variant="outline" 
      className="gap-1.5 border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5"
    >
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      <span className="text-xs">4 slots left this week</span>
    </Badge>
  );
}
