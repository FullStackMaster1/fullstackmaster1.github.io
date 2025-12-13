import { ArrowRight } from "lucide-react";

interface FlowDiagramProps {
  components: string[];
  className?: string;
}

export default function FlowDiagram({ components, className = "" }: FlowDiagramProps) {
  if (!components || components.length === 0) return null;

  return (
    <div 
      className={`flex flex-wrap items-center gap-2 ${className}`}
      data-testid="flow-diagram"
    >
      {components.map((component, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-md text-xs font-medium text-foreground whitespace-nowrap">
            {component}
          </div>
          {idx < components.length - 1 && (
            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
