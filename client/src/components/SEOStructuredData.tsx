import { Helmet } from "react-helmet-async";
import profile from "@/data/profile.json";
import faqs from "@/data/faqs.json";
import siteContent from "@/data/siteContent.json";

export default function SEOStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.personal.name,
    "jobTitle": profile.personal.title,
    "worksFor": {
      "@type": "Organization",
      "name": profile.personal.company
    },
    "url": profile.brand.website,
    "image": "https://www.fullstackmaster.net/og-image.png",
    "sameAs": [
      profile.socialLinks.linkedIn.personal,
      profile.socialLinks.youtube.channel,
      profile.socialLinks.github.url,
      profile.socialLinks.udemy.url,
      profile.socialLinks.pluralsight.url
    ],
    "knowsAbout": profile.descriptions.expertise,
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": profile.credentials.education.institution
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": profile.brand.name,
    "alternateName": "FullStack Master Coaching",
    "url": profile.brand.website,
    "logo": "https://www.fullstackmaster.net/icon-512.png",
    "image": "https://www.fullstackmaster.net/og-image.png",
    "description": profile.descriptions.seo,
    "telephone": profile.contact.phone,
    "email": profile.contact.email,
    "priceRange": "$120-$150",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": profile.stats.rating.number,
      "reviewCount": profile.stats.rating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "sameAs": [
      profile.socialLinks.linkedIn.personal,
      profile.socialLinks.youtube.channel,
      profile.socialLinks.igotanoffer.reviewsUrl
    ],
    "founder": {
      "@type": "Person",
      "name": profile.personal.name
    },
    "areaServed": "Worldwide",
    "serviceType": [
      "FAANG Interview Coaching",
      "System Design Interview Preparation",
      "Behavioral Interview Coaching",
      "Executive Interview Coaching",
      "Career Coaching for Tech Leaders"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FAANG Interview Coaching",
    "provider": {
      "@type": "Person",
      "name": profile.personal.name
    },
    "description": "1-on-1 interview coaching for senior engineers, architects, and executives targeting FAANG companies. Covers system design, leadership principles, and behavioral interviews.",
    "areaServed": "Worldwide",
    "serviceType": "Interview Coaching",
    "offers": [
      {
        "@type": "Offer",
        "name": "Single Coaching Session",
        "price": "150",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": profile.contact.bookingLink
      },
      {
        "@type": "Offer",
        "name": "5-Session Package",
        "price": "600",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": profile.contact.bookingLink
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": profile.stats.rating.number,
      "reviewCount": profile.stats.rating.reviewCount,
      "bestRating": 5
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": profile.brand.name,
    "alternateName": "FullStack Master",
    "url": profile.brand.website,
    "description": siteContent.seo.description
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.fullstackmaster.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Coaching Services",
        "item": "https://www.fullstackmaster.net/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing",
        "item": "https://www.fullstackmaster.net/#pricing"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Reviews",
        "item": "https://www.fullstackmaster.net/#reviews"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
