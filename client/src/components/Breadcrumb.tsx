import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-3 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b"
      data-testid="nav-breadcrumb"
    >
      <ol className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
        <li>
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            data-testid="link-breadcrumb-home"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            {item.href && idx < items.length - 1 ? (
              <Link 
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`link-breadcrumb-${idx}`}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-foreground font-medium"
                aria-current="page"
                data-testid={`text-breadcrumb-${idx}`}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
