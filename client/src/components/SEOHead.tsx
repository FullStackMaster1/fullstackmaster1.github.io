import { Helmet } from 'react-helmet-async';
import siteContent from '@/data/siteContent.json';
import profileData from '@/data/profile.json';
import faqsData from '@/data/faqs.json';

interface SEOHeadProps {
  page?: 'home' | 'resources' | 'admin' | 'confidentiality' | 'privacy';
}

const pageSEO: Record<string, { title: string; description: string; canonical: string }> = {
  confidentiality: {
    title: "Confidentiality & NDA | FullStackMaster Executive Coaching",
    description: "Your career move stays between us. Executive-level discretion guaranteed with formal NDA protection. 100% confidential coaching for Directors, VPs, and senior leaders.",
    canonical: "https://www.fullstackmaster.net/confidentiality"
  },
  privacy: {
    title: "Privacy Policy | FullStackMaster",
    description: "Privacy policy for FullStackMaster executive coaching services.",
    canonical: "https://www.fullstackmaster.net/privacy-policy"
  }
};

export default function SEOHead({ page = 'home' }: SEOHeadProps) {
  const seo = siteContent.seo;
  const { personal, contact, brand, socialLinks, stats, credentials, descriptions } = profileData;
  
  const currentPageSEO = pageSEO[page] || null;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personal.name,
    "jobTitle": personal.title,
    "description": descriptions.medium,
    "url": seo.canonical,
    "sameAs": [
      socialLinks.linkedIn.personal,
      socialLinks.igotanoffer.reviewsUrl,
      socialLinks.udemy.url
    ],
    "knowsAbout": descriptions.expertise,
    "alumniOf": {
      "@type": "Organization",
      "name": credentials.education.institution
    },
    "worksFor": {
      "@type": "Organization",
      "name": personal.company
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FAANG Interview Coaching",
    "provider": {
      "@type": "Person",
      "name": personal.name
    },
    "description": "1-on-1 interview coaching for senior engineers, architects, and executives targeting FAANG companies",
    "serviceType": "Career Coaching",
    "areaServed": "Worldwide",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(stats.rating.number),
      "reviewCount": String(stats.rating.reviewCount),
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

  const pageTitle = currentPageSEO?.title 
    || (page === 'home' 
      ? seo.title 
      : page === 'resources' 
      ? `Resources | ${personal.name} - Courses, Articles & Playlists`
      : `Admin | ${personal.name}`);
  
  const pageDescription = currentPageSEO?.description || seo.description;
  const pageCanonical = currentPageSEO?.canonical || seo.canonical;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={pageCanonical} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:site_name" content={brand.name} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={seo.ogImage} />
      
      <meta name="author" content={personal.name} />
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
