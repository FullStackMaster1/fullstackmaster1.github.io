import { Helmet } from 'react-helmet-async';
import siteContent from '@/data/siteContent.json';
import profileData from '@/data/profile.json';
import faqsData from '@/data/faqs.json';
import coursesData from '@/data/courses.json';
import reviewsData from '@/data/reviews.json';
import playlistsData from '@/data/playlists.json';

interface SEOHeadProps {
  page?: 'home' | 'resources' | 'admin' | 'confidentiality' | 'privacy' | 'nda';
  customTitle?: string;
  customDescription?: string;
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

export default function SEOHead({ page = 'home', customTitle, customDescription }: SEOHeadProps) {
  const seo = siteContent.seo;
  const { personal, contact, brand, socialLinks, stats, credentials, descriptions } = profileData;
  
  const currentPageSEO = pageSEO[page] || null;
  
  const finalTitle = customTitle || currentPageSEO?.title || seo.title;
  const finalDescription = customDescription || currentPageSEO?.description || seo.description;

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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": seo.canonical,
    "name": brand.name,
    "description": descriptions.medium,
    "url": seo.canonical,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(stats.rating.number),
      "reviewCount": String(stats.rating.reviewCount),
      "bestRating": "5"
    }
  };

  const courseSchemas = [
    ...coursesData.udemy.map(course => ({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": `${course.title} - ${course.level} level course with ${course.lectures || 'multiple'} lectures`,
      "provider": {
        "@type": "Organization",
        "name": "Udemy",
        "sameAs": "https://www.udemy.com"
      },
      "instructor": {
        "@type": "Person",
        "name": personal.name
      },
      "url": course.url,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(course.rating),
        "reviewCount": String(course.reviews || 1),
        "bestRating": "5"
      }
    })),
    ...coursesData.pluralsight.map(course => ({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": `${course.title} - ${course.level} level course on Pluralsight`,
      "provider": {
        "@type": "Organization",
        "name": "Pluralsight",
        "sameAs": "https://www.pluralsight.com"
      },
      "instructor": {
        "@type": "Person",
        "name": personal.name
      },
      "url": course.url,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(course.rating),
        "bestRating": "5"
      }
    }))
  ];

  const reviewSchemas = reviewsData.slice(0, 10).map((review: any) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": String(review.rating),
      "bestRating": "5"
    },
    "reviewBody": review.text,
    "datePublished": review.date,
    "itemReviewed": {
      "@type": "Service",
      "name": review.session || "FAANG Interview Coaching",
      "provider": {
        "@type": "Person",
        "name": personal.name
      }
    }
  }));

  const videoObjectSchemas = (playlistsData as any[]).slice(0, 5).map((playlist: any) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": playlist.title,
    "description": playlist.description,
    "thumbnailUrl": playlist.thumbnail ? `https://www.fullstackmaster.net${playlist.thumbnail}` : undefined,
    "uploadDate": "2024-01-01",
    "contentUrl": playlist.url,
    "embedUrl": playlist.url,
    "publisher": {
      "@type": "Person",
      "name": personal.name,
      "url": socialLinks.youtube
    }
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": brand.name,
    "url": seo.canonical,
    "description": descriptions.short,
    "publisher": {
      "@type": "Person",
      "name": personal.name
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": seo.canonical
      }
    ]
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
        <>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
          {courseSchemas.slice(0, 3).map((schema, idx) => (
            <script key={`course-${idx}`} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
          {reviewSchemas.slice(0, 5).map((schema, idx) => (
            <script key={`review-${idx}`} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
          {videoObjectSchemas.map((schema, idx) => (
            <script key={`video-${idx}`} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
        </>
      )}
    </Helmet>
  );
}
