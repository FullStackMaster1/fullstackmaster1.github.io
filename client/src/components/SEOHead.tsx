import { Helmet } from 'react-helmet-async';
import siteContent from '@/data/siteContent.json';
import profileData from '@/data/profile.json';
import faqsData from '@/data/faqs.json';

interface SEOHeadProps {
  page?: 'home' | 'resources' | 'admin';
}

export default function SEOHead({ page = 'home' }: SEOHeadProps) {
  const seo = siteContent.seo;
  const { personal, contact, brand, socialLinks, stats, credentials, descriptions } = profileData;

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

  const pageTitle = page === 'home' 
    ? seo.title 
    : page === 'resources' 
    ? `Resources | ${personal.name} - Courses, Articles & Playlists`
    : `Admin | ${personal.name}`;

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
      <meta property="og:site_name" content={brand.name} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
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
