import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialProofItem {
  type: 'viewing' | 'booking' | 'recent';
  message: string;
  timestamp?: string;
}

export default function SocialProofWidget() {
  const [currentProof, setCurrentProof] = useState<SocialProofItem | null>(null);
  const [viewingCount, setViewingCount] = useState(0);

  useEffect(() => {
    // Simulate real-time viewing count (in production, use WebSocket or polling)
    const baseCount = Math.floor(Math.random() * 5) + 2; // 2-6 people
    setViewingCount(baseCount);
    
    const interval = setInterval(() => {
      // Randomly update count
      setViewingCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(8, prev + change));
      });
    }, 30000); // Update every 30 seconds

    // Rotate social proof messages
    const proofs: SocialProofItem[] = [
      {
        type: 'viewing',
        message: `${baseCount} people viewing this page`
      },
      {
        type: 'booking',
        message: 'Sarah from Seattle just booked a session',
        timestamp: '2 hours ago'
      },
      {
        type: 'booking',
        message: '3 people booked sessions today',
        timestamp: 'Today'
      },
      {
        type: 'recent',
        message: 'Last booking: 2 hours ago'
      }
    ];

    let currentIndex = 0;
    const rotateProofs = () => {
      setCurrentProof(proofs[currentIndex]);
      currentIndex = (currentIndex + 1) % proofs.length;
    };

    rotateProofs();
    const proofInterval = setInterval(rotateProofs, 8000); // Change every 8 seconds

    return () => {
      clearInterval(interval);
      clearInterval(proofInterval);
    };
  }, []);

  if (!currentProof) return null;

  const getIcon = () => {
    switch (currentProof.type) {
      case 'viewing':
        return <Users className="w-4 h-4" />;
      case 'booking':
        return <TrendingUp className="w-4 h-4" />;
      case 'recent':
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentProof.message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 right-4 z-40 hidden lg:block"
      >
        <Badge 
          className="bg-green-500 text-white shadow-lg px-3 py-2 flex items-center gap-2 animate-pulse"
          variant="default"
        >
          {getIcon()}
          <span className="text-sm font-medium">{currentProof.message}</span>
          {currentProof.timestamp && (
            <span className="text-xs opacity-80">{currentProof.timestamp}</span>
          )}
        </Badge>
      </motion.div>
    </AnimatePresence>
  );
}

