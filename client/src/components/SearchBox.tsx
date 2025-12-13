import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  HelpCircle, 
  Target, 
  Users, 
  Presentation,
  Briefcase,
  X
} from "lucide-react";
import faqs from "@/data/faqs.json";
import systemDesignFaqs from "@/data/systemDesignPage.json";
import behavioralFaqs from "@/data/behavioralPage.json";
import execCommFaqs from "@/data/executiveCommunicationPage.json";
import resumeFaqs from "@/data/resumeChecklistPage.json";

interface SearchResult {
  id: string;
  type: "page" | "faq" | "section";
  title: string;
  description: string;
  href: string;
  icon: typeof FileText;
  iconColor: string;
}

const pages: SearchResult[] = [
  {
    id: "page-system-design",
    type: "page",
    title: "System Design Mastery",
    description: "IFRAIL+T Framework for system design interviews",
    href: "/system-design",
    icon: Target,
    iconColor: "text-blue-600"
  },
  {
    id: "page-behavioral",
    type: "page",
    title: "Behavioral Interview Guide",
    description: "STAR Method & Amazon Leadership Principles",
    href: "/behavioral-interview",
    icon: Users,
    iconColor: "text-green-600"
  },
  {
    id: "page-executive-comm",
    type: "page",
    title: "Executive Communication",
    description: "CLEAR Framework for VP/Director presentations",
    href: "/executive-communication",
    icon: Presentation,
    iconColor: "text-purple-600"
  },
  {
    id: "page-resume",
    type: "page",
    title: "Resume Checklist",
    description: "Role-specific resume guides for senior roles",
    href: "/resume-checklist",
    icon: FileText,
    iconColor: "text-amber-600"
  },
  {
    id: "page-book",
    type: "page",
    title: "Book a Session",
    description: "Schedule your coaching session",
    href: "/book",
    icon: Briefcase,
    iconColor: "text-primary"
  }
];

const sections: SearchResult[] = [
  {
    id: "section-services",
    type: "section",
    title: "Coaching Services",
    description: "See all coaching packages and services",
    href: "/#services",
    icon: Briefcase,
    iconColor: "text-primary"
  },
  {
    id: "section-pricing",
    type: "section",
    title: "Pricing",
    description: "View coaching package prices",
    href: "/#pricing",
    icon: Briefcase,
    iconColor: "text-primary"
  },
  {
    id: "section-reviews",
    type: "section",
    title: "Client Reviews",
    description: "Read testimonials from successful candidates",
    href: "/#reviews",
    icon: Users,
    iconColor: "text-green-600"
  },
  {
    id: "section-about",
    type: "section",
    title: "About Rupesh",
    description: "Learn about your coach's background",
    href: "/#about",
    icon: Users,
    iconColor: "text-blue-600"
  },
  {
    id: "section-faq",
    type: "section",
    title: "FAQs",
    description: "Frequently asked questions",
    href: "/#faq",
    icon: HelpCircle,
    iconColor: "text-amber-600"
  }
];

const allFaqs: SearchResult[] = [
  ...faqs.map((faq, idx) => ({
    id: `faq-main-${idx}`,
    type: "faq" as const,
    title: faq.question,
    description: faq.answer.substring(0, 100) + "...",
    href: "/#faq",
    icon: HelpCircle,
    iconColor: "text-amber-600"
  })),
  ...systemDesignFaqs.faqs.map((faq, idx) => ({
    id: `faq-sd-${idx}`,
    type: "faq" as const,
    title: faq.question,
    description: faq.answer.substring(0, 100) + "...",
    href: "/system-design#faqs",
    icon: Target,
    iconColor: "text-blue-600"
  })),
  ...behavioralFaqs.faqs.map((faq, idx) => ({
    id: `faq-bh-${idx}`,
    type: "faq" as const,
    title: faq.question,
    description: faq.answer.substring(0, 100) + "...",
    href: "/behavioral-interview#faqs",
    icon: Users,
    iconColor: "text-green-600"
  })),
  ...execCommFaqs.faqs.map((faq, idx) => ({
    id: `faq-exec-${idx}`,
    type: "faq" as const,
    title: faq.question,
    description: faq.answer.substring(0, 100) + "...",
    href: "/executive-communication#faqs",
    icon: Presentation,
    iconColor: "text-purple-600"
  })),
  ...resumeFaqs.faqs.map((faq, idx) => ({
    id: `faq-resume-${idx}`,
    type: "faq" as const,
    title: faq.question,
    description: faq.answer.substring(0, 100) + "...",
    href: "/resume-checklist#faqs",
    icon: FileText,
    iconColor: "text-amber-600"
  }))
];

const allSearchItems = [...pages, ...sections, ...allFaqs];

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBox({ className = "", placeholder = "Search guides, FAQs..." }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allSearchItems.filter(
      item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );

    // Sort by relevance: title matches first, then description matches
    filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(lowerQuery);
      const bTitle = b.title.toLowerCase().includes(lowerQuery);
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });

    setResults(filtered.slice(0, 8));
    setIsOpen(filtered.length > 0);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setIsOpen(false);

    if (result.href.startsWith("/") && !result.href.includes("#")) {
      setLocation(result.href);
    } else if (result.href.includes("#")) {
      const [path, hash] = result.href.split("#");
      if (path && path !== "/") {
        setLocation(path);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const listboxId = "search-listbox";
  const getOptionId = (idx: number) => `search-option-${idx}`;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && results.length > 0 ? getOptionId(selectedIndex) : undefined}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          className="pl-9 pr-8 h-9 w-full"
          data-testid="input-search"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
            aria-label="Clear search"
            data-testid="button-clear-search"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div 
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto"
          data-testid="search-results"
        >
          {results.map((result, idx) => {
            const IconComponent = result.icon;
            return (
              <button
                key={result.id}
                id={getOptionId(idx)}
                role="option"
                aria-selected={idx === selectedIndex}
                onClick={() => handleSelect(result)}
                className={`w-full flex items-start gap-3 p-3 text-left transition-colors ${
                  idx === selectedIndex ? "bg-muted" : "hover:bg-muted/50"
                }`}
                data-testid={`search-result-${idx}`}
              >
                <div className={`p-1.5 rounded-md bg-muted ${result.iconColor}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{result.title}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 flex-shrink-0">
                      {result.type === "page" ? "Page" : result.type === "faq" ? "FAQ" : "Section"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {result.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
