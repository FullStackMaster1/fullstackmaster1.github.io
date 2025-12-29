import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import bookingData from "@/data/booking.json";

interface CapacityProps {
  totalWeeklySlots?: number;
  bookedSlots?: number;
}

interface CapacityData {
  totalWeeklySlots: number;
  bookedSlots: number;
  lastUpdated?: string;
}

export default function CapacityIndicator({ 
  totalWeeklySlots: propTotalWeeklySlots,
  bookedSlots: propBookedSlots
}: CapacityProps) {
  const [capacity, setCapacity] = useState<CapacityData>({
    totalWeeklySlots: propTotalWeeklySlots || bookingData.capacity?.totalWeeklySlots || 6,
    bookedSlots: propBookedSlots || bookingData.capacity?.bookedSlots || 2,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch dynamic capacity from API if available
    const fetchCapacity = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/capacity");
        if (response.ok) {
          const data = await response.json();
          setCapacity(prev => ({
            totalWeeklySlots: data.totalWeeklySlots || prev.totalWeeklySlots,
            bookedSlots: data.bookedSlots || prev.bookedSlots,
            lastUpdated: data.lastUpdated,
          }));
        }
      } catch (error) {
        // Fallback to static data if API fails
        console.log("Using static capacity data");
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if props not provided (use dynamic data)
    if (propTotalWeeklySlots === undefined && propBookedSlots === undefined) {
      fetchCapacity();
      // Refresh every 5 minutes
      const interval = setInterval(fetchCapacity, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [propTotalWeeklySlots, propBookedSlots]);

  const slotsRemaining = capacity.totalWeeklySlots - capacity.bookedSlots;
  const percentFilled = (capacity.bookedSlots / capacity.totalWeeklySlots) * 100;

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
          <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse ${
            slotsRemaining > 2 ? "bg-green-500" : slotsRemaining > 0 ? "bg-yellow-500" : "bg-red-500"
          }`} />
        </div>
        <div className="text-sm">
          <span className="font-semibold text-foreground">{slotsRemaining} slots</span>
          <span className="text-muted-foreground"> this week</span>
          {isLoading && <span className="text-xs text-muted-foreground ml-1">(updating...)</span>}
        </div>
      </div>
      
      <div className="h-4 w-px bg-border" />
      
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${
              percentFilled < 50 ? "from-green-500 to-yellow-500" :
              percentFilled < 80 ? "from-yellow-500 to-orange-500" :
              "from-orange-500 to-red-500"
            }`}
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
  const [capacity, setCapacity] = useState({ totalSlots: 6, booked: 2 });

  useEffect(() => {
    fetch("/api/capacity")
      .then(res => res.json())
      .then(data => setCapacity({
        totalSlots: data.totalWeeklySlots || 6,
        booked: data.bookedSlots || 2,
      }))
      .catch(() => {
        // Fallback to static data
        setCapacity({
          totalSlots: bookingData.capacity?.totalWeeklySlots || 6,
          booked: bookingData.capacity?.bookedSlots || 2,
        });
      });
  }, []);

  const remaining = capacity.totalSlots - capacity.booked;
  
  return (
    <Badge 
      variant="outline" 
      className="gap-1.5 border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5"
    >
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      <span className="text-xs">{remaining} slots left this week</span>
    </Badge>
  );
}
