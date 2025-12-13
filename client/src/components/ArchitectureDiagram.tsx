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
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import { 
  SiRedis,
  SiApachekafka,
  SiElasticsearch,
  SiNginx,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRabbitmq,
  SiGraphql,
  SiSocketdotio
} from "react-icons/si";
import { 
  FaAws,
  FaDatabase,
  FaServer,
  FaCloud,
  FaNetworkWired,
  FaUserFriends,
  FaCogs,
  FaLayerGroup
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface ArchitectureDiagramProps {
  components: string[];
  className?: string;
}

type IconComponent = LucideIcon | IconType;

interface ComponentStyle {
  icon: IconComponent;
  color: string;
  bgGradient?: string;
}

const componentIconMap: Record<string, ComponentStyle> = {
  "clients": { icon: FaUserFriends, color: "bg-blue-500", bgGradient: "from-blue-500 to-blue-600" },
  "client": { icon: FaUserFriends, color: "bg-blue-500", bgGradient: "from-blue-500 to-blue-600" },
  "users": { icon: FaUserFriends, color: "bg-blue-500", bgGradient: "from-blue-500 to-blue-600" },
  
  "load balancer": { icon: SiNginx, color: "bg-emerald-500", bgGradient: "from-emerald-500 to-emerald-600" },
  "nginx": { icon: SiNginx, color: "bg-emerald-500", bgGradient: "from-emerald-500 to-emerald-600" },
  "elb": { icon: FaNetworkWired, color: "bg-orange-500", bgGradient: "from-orange-500 to-orange-600" },
  
  "api gateway": { icon: FaCloud, color: "bg-purple-500", bgGradient: "from-purple-500 to-purple-600" },
  "gateway": { icon: FaCloud, color: "bg-purple-500", bgGradient: "from-purple-500 to-purple-600" },
  "gateway/api": { icon: FaCloud, color: "bg-purple-500", bgGradient: "from-purple-500 to-purple-600" },
  
  "api servers": { icon: FaServer, color: "bg-green-500", bgGradient: "from-green-500 to-green-600" },
  "api server": { icon: FaServer, color: "bg-green-500", bgGradient: "from-green-500 to-green-600" },
  "server": { icon: FaServer, color: "bg-green-500", bgGradient: "from-green-500 to-green-600" },
  "servers": { icon: FaServer, color: "bg-green-500", bgGradient: "from-green-500 to-green-600" },
  "lambda": { icon: FaAws, color: "bg-orange-500", bgGradient: "from-orange-500 to-amber-500" },
  
  "cache layer (redis)": { icon: SiRedis, color: "bg-red-500", bgGradient: "from-red-500 to-red-600" },
  "cache": { icon: SiRedis, color: "bg-red-500", bgGradient: "from-red-500 to-red-600" },
  "redis": { icon: SiRedis, color: "bg-red-500", bgGradient: "from-red-500 to-red-600" },
  "cache (hot users)": { icon: SiRedis, color: "bg-red-500", bgGradient: "from-red-500 to-red-600" },
  "elasticache": { icon: SiRedis, color: "bg-red-500", bgGradient: "from-red-500 to-red-600" },
  
  "primary db": { icon: SiPostgresql, color: "bg-blue-600", bgGradient: "from-blue-600 to-blue-700" },
  "database": { icon: FaDatabase, color: "bg-amber-600", bgGradient: "from-amber-600 to-amber-700" },
  "db": { icon: FaDatabase, color: "bg-amber-600", bgGradient: "from-amber-600 to-amber-700" },
  "postgresql": { icon: SiPostgresql, color: "bg-blue-600", bgGradient: "from-blue-600 to-blue-700" },
  "postgres": { icon: SiPostgresql, color: "bg-blue-600", bgGradient: "from-blue-600 to-blue-700" },
  "mysql": { icon: SiMysql, color: "bg-blue-500", bgGradient: "from-blue-500 to-blue-600" },
  "mongodb": { icon: SiMongodb, color: "bg-green-600", bgGradient: "from-green-600 to-green-700" },
  "dynamodb": { icon: FaAws, color: "bg-blue-500", bgGradient: "from-blue-500 to-indigo-500" },
  
  "read replicas": { icon: HardDrive, color: "bg-amber-500", bgGradient: "from-amber-500 to-amber-600" },
  "replica": { icon: HardDrive, color: "bg-amber-500", bgGradient: "from-amber-500 to-amber-600" },
  
  "websocket gateway": { icon: SiSocketdotio, color: "bg-indigo-500", bgGradient: "from-indigo-500 to-indigo-600" },
  "websocket": { icon: SiSocketdotio, color: "bg-indigo-500", bgGradient: "from-indigo-500 to-indigo-600" },
  
  "connection manager": { icon: FaNetworkWired, color: "bg-teal-500", bgGradient: "from-teal-500 to-teal-600" },
  
  "message queue": { icon: SiApachekafka, color: "bg-slate-700", bgGradient: "from-slate-700 to-slate-800" },
  "queue": { icon: SiRabbitmq, color: "bg-orange-500", bgGradient: "from-orange-500 to-orange-600" },
  "kafka": { icon: SiApachekafka, color: "bg-slate-700", bgGradient: "from-slate-700 to-slate-800" },
  "rabbitmq": { icon: SiRabbitmq, color: "bg-orange-500", bgGradient: "from-orange-500 to-orange-600" },
  "sqs": { icon: FaAws, color: "bg-pink-500", bgGradient: "from-pink-500 to-pink-600" },
  
  "chat service": { icon: MessageSquare, color: "bg-sky-500", bgGradient: "from-sky-500 to-sky-600" },
  "service": { icon: FaCogs, color: "bg-sky-500", bgGradient: "from-sky-500 to-sky-600" },
  
  "user presence": { icon: Radio, color: "bg-emerald-500", bgGradient: "from-emerald-500 to-emerald-600" },
  "presence": { icon: Radio, color: "bg-emerald-500", bgGradient: "from-emerald-500 to-emerald-600" },
  
  "message store": { icon: FaDatabase, color: "bg-orange-500", bgGradient: "from-orange-500 to-orange-600" },
  "storage": { icon: HardDrive, color: "bg-orange-500", bgGradient: "from-orange-500 to-orange-600" },
  "s3": { icon: FaAws, color: "bg-green-600", bgGradient: "from-green-600 to-green-700" },
  
  "feed service": { icon: FaLayerGroup, color: "bg-violet-500", bgGradient: "from-violet-500 to-violet-600" },
  "ranking service": { icon: BarChart3, color: "bg-rose-500", bgGradient: "from-rose-500 to-rose-600" },
  "social graph": { icon: FaUserFriends, color: "bg-cyan-500", bgGradient: "from-cyan-500 to-cyan-600" },
  "post storage": { icon: FaDatabase, color: "bg-amber-600", bgGradient: "from-amber-600 to-amber-700" },
  
  "ml ranking model": { icon: Cpu, color: "bg-fuchsia-500", bgGradient: "from-fuchsia-500 to-fuchsia-600" },
  "ml": { icon: Cpu, color: "bg-fuchsia-500", bgGradient: "from-fuchsia-500 to-fuchsia-600" },
  "sagemaker": { icon: FaAws, color: "bg-fuchsia-500", bgGradient: "from-fuchsia-500 to-fuchsia-600" },
  
  "metadata service": { icon: FaLayerGroup, color: "bg-lime-600", bgGradient: "from-lime-600 to-lime-700" },
  "chunk servers": { icon: HardDrive, color: "bg-slate-500", bgGradient: "from-slate-500 to-slate-600" },
  "replication manager": { icon: RefreshCw, color: "bg-blue-600", bgGradient: "from-blue-600 to-blue-700" },
  "consistency protocol": { icon: Shield, color: "bg-emerald-600", bgGradient: "from-emerald-600 to-emerald-700" },
  
  "cdn": { icon: Globe, color: "bg-sky-400", bgGradient: "from-sky-400 to-sky-500" },
  "cloudfront": { icon: FaAws, color: "bg-sky-400", bgGradient: "from-sky-400 to-sky-500" },
  
  "elasticsearch": { icon: SiElasticsearch, color: "bg-yellow-500", bgGradient: "from-yellow-500 to-yellow-600" },
  "search": { icon: SiElasticsearch, color: "bg-yellow-500", bgGradient: "from-yellow-500 to-yellow-600" },
  
  "graphql": { icon: SiGraphql, color: "bg-pink-500", bgGradient: "from-pink-500 to-pink-600" },
};

function getComponentInfo(name: string): { icon: IconComponent; color: string; bgGradient: string; label: string } {
  const lowerName = name.toLowerCase();
  
  if (componentIconMap[lowerName]) {
    const match = componentIconMap[lowerName];
    return { 
      icon: match.icon, 
      color: match.color, 
      bgGradient: match.bgGradient || `from-gray-500 to-gray-600`,
      label: name 
    };
  }
  
  for (const [key, value] of Object.entries(componentIconMap)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return { 
        icon: value.icon, 
        color: value.color, 
        bgGradient: value.bgGradient || `from-gray-500 to-gray-600`,
        label: name 
      };
    }
  }
  
  return { 
    icon: Box, 
    color: "bg-gray-500", 
    bgGradient: "from-gray-500 to-gray-600",
    label: name 
  };
}

export default function ArchitectureDiagram({ components, className = "" }: ArchitectureDiagramProps) {
  if (!components || components.length === 0) return null;

  return (
    <div 
      className={`flex flex-wrap items-center justify-center gap-2 py-4 ${className}`}
      data-testid="architecture-diagram"
    >
      {components.map((component, idx) => {
        const { icon: IconComponent, bgGradient, label } = getComponentInfo(component);
        
        return (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div 
                className={`w-11 h-11 bg-gradient-to-br ${bgGradient} rounded-lg flex items-center justify-center shadow-md border border-white/20`}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <span className="text-[9px] font-medium text-center text-muted-foreground max-w-[65px] leading-tight line-clamp-2">
                {label}
              </span>
            </div>
            {idx < components.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}
