import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, FileText, CheckCircle, RefreshCw, LucideIcon, Shield, Lock, FileCheck, ShieldCheck, GraduationCap } from "lucide-react";
import { SiYoutube, SiLinkedin, SiUdemy, SiPluralsight, SiAmazonwebservices, SiGooglecloud } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import trustData from "@/data/trustMetrics.json";
import { IconType } from "react-icons";

const lucideIconMap: Record<string, LucideIcon> = {
  Star,
  Award,
  FileText,
  Users,
  CheckCircle,
  RefreshCw,
  Shield,
  Lock,
  FileCheck,
  ShieldCheck,
  GraduationCap,
};

const siIconMap: Record<string, IconType> = {
  SiYoutube,
  SiLinkedin,
  SiUdemy,
  SiPluralsight,
  SiAmazonwebservices,
  SiGooglecloud,
  FaMicrosoft,
};

interface Metric {
  id: string;
  icon: string;
  value: number;
  suffix: string;
  label: string;
  context?: string;
  verifyLink?: string;
  color: string;
}

interface Platform {
  name: string;
  icon: string;
  label: string;
  url: string;
  color: string;
}

interface Certification {
  name: string;
  icon: string;
  label: string;
  color: string;
}

interface SecurityBadge {
  name: string;
  icon: string;
  label: string;
  description: string;
}

function AnimatedCounter({ 
  target, 
  suffix, 
  duration = 2000 
}: { 
  target: number; 
  suffix: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-bold"
    >
      {count}{suffix}
    </motion.div>
  );
}

export default function TrustBar() {
  const metrics = trustData.metrics as Metric[];
  const platforms = trustData.platforms as Platform[];
  const certifications = (trustData as any).certifications as Certification[] || [];
  const securityBadges = (trustData as any).securityBadges as SecurityBadge[] || [];

  return (
    <section
      className="py-6 bg-card border-y border-card-border"
      data-testid="section-trust"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => {
            const IconComponent = lucideIconMap[metric.icon];
            const MetricContent = (
              <motion.div
                key={metric.id}
                className={`text-center ${metric.verifyLink ? 'cursor-pointer group' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`metric-${metric.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <motion.div 
                  className="flex justify-center mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: index * 0.1 + 0.2 
                  }}
                >
                  {IconComponent && (
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  )}
                </motion.div>
                <AnimatedCounter 
                  target={metric.value} 
                  suffix={metric.suffix}
                  duration={1500 + index * 200}
                />
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{metric.label}</div>
                {metric.context && (
                  <div className="text-xs text-muted-foreground/70 mt-1 group-hover:text-primary transition-colors">
                    {metric.context}
                    {metric.verifyLink && <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>}
                  </div>
                )}
              </motion.div>
            );
            
            return metric.verifyLink ? (
              <a 
                key={metric.id}
                href={metric.verifyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {MetricContent}
              </a>
            ) : MetricContent;
          })}
        </div>

        {certifications.length > 0 && (
          <div className="border-t border-border pt-6 mb-6">
            <p className="text-center text-sm text-muted-foreground mb-4">
              {(trustData as any).certificationsText || "Certified & Verified"}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              {certifications.map((cert, index) => {
                const LucideIcon = lucideIconMap[cert.icon];
                const SiIcon = siIconMap[cert.icon];
                const IconComponent = LucideIcon || SiIcon;
                
                return (
                  <motion.div
                    key={cert.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border"
                    data-testid={`cert-${cert.name.toLowerCase().replace(/ /g, "-")}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {IconComponent && (
                      <IconComponent className={`w-5 h-5 ${cert.color || ""}`} />
                    )}
                    <div className="text-left">
                      <span className="font-medium text-sm">{cert.name}</span>
                      <p className="text-xs text-muted-foreground">{cert.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {securityBadges.length > 0 && (
          <div className="border-t border-border pt-6 mb-6">
            <p className="text-center text-sm text-muted-foreground mb-4">
              {(trustData as any).securityText || "Enterprise-Level Confidentiality"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {securityBadges.map((badge, index) => {
                const IconComponent = lucideIconMap[badge.icon];
                
                return (
                  <motion.div
                    key={badge.name}
                    className="flex flex-col items-center text-center p-3 rounded-lg bg-green-500/5 border border-green-500/20"
                    data-testid={`security-${badge.name.toLowerCase().replace(/ /g, "-")}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 text-green-600 mb-2" />
                    )}
                    <span className="font-medium text-sm">{badge.name}</span>
                    <Badge variant="secondary" className="text-xs mt-1 bg-green-500/10 text-green-600 border-green-500/20">
                      {badge.label}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {trustData.featuredOnText}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {platforms.map((platform, index) => {
              const LucideIcon = lucideIconMap[platform.icon];
              const SiIcon = siIconMap[platform.icon];
              const IconComponent = LucideIcon || SiIcon;
              
              return (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover-elevate transition-all"
                  data-testid={`link-platform-${platform.name.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {IconComponent && (
                    <IconComponent className={`w-5 h-5 ${platform.color || ""}`} />
                  )}
                  {platform.name === "IGotAnOffer" && (
                    <span className="font-semibold text-primary">iGotAnOffer</span>
                  )}
                  {platform.name !== "IGotAnOffer" && (
                    <span className="font-medium">{platform.name}</span>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {platform.label}
                  </Badge>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
