import { 
  Users, 
  Server, 
  Database, 
  HardDrive,
  MessageSquare,
  Globe,
  Layers,
  Cloud,
  RefreshCw,
  Zap,
  Radio,
  Box,
  Cpu,
  Network,
  Shield,
  BarChart3,
  ArrowRight
} from "lucide-react";

interface ArchitectureDiagramProps {
  components: string[];
  className?: string;
}

const componentIconMap: Record<string, { icon: typeof Server; color: string }> = {
  "clients": { icon: Users, color: "bg-blue-500" },
  "client": { icon: Users, color: "bg-blue-500" },
  "users": { icon: Users, color: "bg-blue-500" },
  "load balancer": { icon: Network, color: "bg-purple-500" },
  "api servers": { icon: Server, color: "bg-green-500" },
  "api server": { icon: Server, color: "bg-green-500" },
  "server": { icon: Server, color: "bg-green-500" },
  "servers": { icon: Server, color: "bg-green-500" },
  "cache layer (redis)": { icon: Zap, color: "bg-red-500" },
  "cache": { icon: Zap, color: "bg-red-500" },
  "redis": { icon: Zap, color: "bg-red-500" },
  "cache (hot users)": { icon: Zap, color: "bg-red-500" },
  "primary db": { icon: Database, color: "bg-amber-600" },
  "database": { icon: Database, color: "bg-amber-600" },
  "db": { icon: Database, color: "bg-amber-600" },
  "read replicas": { icon: HardDrive, color: "bg-amber-500" },
  "replica": { icon: HardDrive, color: "bg-amber-500" },
  "websocket gateway": { icon: Radio, color: "bg-indigo-500" },
  "gateway": { icon: Globe, color: "bg-indigo-500" },
  "gateway/api": { icon: Globe, color: "bg-indigo-500" },
  "connection manager": { icon: Network, color: "bg-teal-500" },
  "message queue": { icon: MessageSquare, color: "bg-pink-500" },
  "queue": { icon: MessageSquare, color: "bg-pink-500" },
  "chat service": { icon: MessageSquare, color: "bg-sky-500" },
  "service": { icon: Box, color: "bg-sky-500" },
  "user presence": { icon: Radio, color: "bg-emerald-500" },
  "presence": { icon: Radio, color: "bg-emerald-500" },
  "message store": { icon: Database, color: "bg-orange-500" },
  "storage": { icon: HardDrive, color: "bg-orange-500" },
  "feed service": { icon: Layers, color: "bg-violet-500" },
  "ranking service": { icon: BarChart3, color: "bg-rose-500" },
  "social graph": { icon: Users, color: "bg-cyan-500" },
  "post storage": { icon: Database, color: "bg-amber-600" },
  "ml ranking model": { icon: Cpu, color: "bg-fuchsia-500" },
  "ml": { icon: Cpu, color: "bg-fuchsia-500" },
  "metadata service": { icon: Layers, color: "bg-lime-600" },
  "chunk servers": { icon: HardDrive, color: "bg-slate-500" },
  "replication manager": { icon: RefreshCw, color: "bg-blue-600" },
  "consistency protocol": { icon: Shield, color: "bg-emerald-600" },
  "cdn": { icon: Cloud, color: "bg-sky-400" },
};

function getComponentInfo(name: string): { icon: typeof Server; color: string; label: string } {
  const lowerName = name.toLowerCase();
  
  if (componentIconMap[lowerName]) {
    return { ...componentIconMap[lowerName], label: name };
  }
  
  for (const [key, value] of Object.entries(componentIconMap)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return { ...value, label: name };
    }
  }
  
  return { icon: Box, color: "bg-gray-500", label: name };
}

export default function ArchitectureDiagram({ components, className = "" }: ArchitectureDiagramProps) {
  if (!components || components.length === 0) return null;

  return (
    <div 
      className={`flex flex-wrap items-center justify-center gap-3 py-4 ${className}`}
      data-testid="architecture-diagram"
    >
      {components.map((component, idx) => {
        const { icon: IconComponent, color, label } = getComponentInfo(component);
        
        return (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div 
                className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center shadow-sm`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-medium text-center text-muted-foreground max-w-[70px] leading-tight">
                {label}
              </span>
            </div>
            {idx < components.length - 1 && (
              <ArrowRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 -mx-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
