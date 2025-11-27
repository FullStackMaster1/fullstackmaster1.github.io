import { Helmet } from 'react-helmet-async';
import siteContent from '@/data/siteContent.json';
import aboutData from '@/data/about.json';
import faqsData from '@/data/faqs.json';

interface SEOHeadProps {
  page?: 'home' | 'resources' | 'admin';
}

export default function SEOHead({ page = 'home' }: SEOHeadProps) {
  const seo = siteContent.seo || {
    title: "Rupesh Tiwari | FAANG Interview Coach for Directors & VPs",
    description: "15+ years coaching 4,000+ senior engineers, architects, and executives for FAANG interviews. AWS Senior CSM with 85%+ offer success rate. Book your free discovery call.",
    keywords: "FAANG interview coach, AWS interview preparation, Director interview coaching, VP interview prep, system design interview, leadership principles, senior engineer coaching, solutions architect interview",
    canonical: "https://fullstackmaster.net",
    ogImage: "/og-image.png"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": aboutData.name,
    "jobTitle": aboutData.title,
    "description": siteContent.hero.description,
    "url": seo.canonical,
    "sameAs": [
      aboutData.linkedIn,
      "https://www.igotanoffer.com/en/coaches/rupesh-tiwari",
      "https://www.udemy.com/user/rupesh-tiwari-2/"
    ],
    "knowsAbout": [
      "AWS",
      "System Design",
      "FAANG Interviews",
      "Technical Leadership",
      "Solutions Architecture",
      "Cloud Computing"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Indian School of Business"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Amazon Web Services"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FAANG Interview Coaching",
    "provider": {
      "@type": "Person",
      "name": aboutData.name
    },
    "description": "1-on-1 interview coaching for senior engineers, architects, and executives targeting FAANG companies",
    "serviceType": "Career Coaching",
    "areaServed": "Worldwide",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const pageTitle = page === 'home' 
    ? seo.title 
    : page === 'resources' 
    ? `Resources | ${aboutData.name} - Courses, Articles & Playlists`
    : `Admin | ${aboutData.name}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.canonical} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:site_name" content={siteContent.navigation.brandName} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
      
      <meta name="author" content={aboutData.name} />
      <meta name="robots" content="index, follow" />
      
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
