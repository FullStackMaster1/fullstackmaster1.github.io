import { Helmet } from "react-helmet-async";
import profile from "@/data/profile.json";
import faqs from "@/data/faqs.json";
import siteContent from "@/data/siteContent.json";
import reviews from "@/data/reviews.json";

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

  const topReviews = reviews.slice(0, 10);
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "FAANG Interview Coaching by Rupesh Tiwari",
    "description": "1-on-1 interview coaching for senior engineers, architects, and executives targeting FAANG companies",
    "brand": {
      "@type": "Brand",
      "name": "FullStack Master"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": String(reviews.length),
      "reviewCount": String(reviews.length)
    },
    "review": topReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "datePublished": review.date,
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(review.rating),
        "bestRating": "5"
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Prepare for FAANG Interviews with Coaching",
    "description": "Step-by-step process to prepare for Amazon, Google, Meta, Apple, and Netflix interviews with professional coaching",
    "totalTime": "PT4W",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "150-600"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Book a Free Discovery Call",
        "text": "Schedule a 15-minute consultation to discuss your background, target role, and interview timeline"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Get Your Personalized Prep Plan",
        "text": "Receive a customized roadmap based on your target company, role level, and areas needing improvement"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Practice with Mock Interviews",
        "text": "Work through realistic mock interviews with immediate feedback using FAANG evaluation rubrics"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Master System Design",
        "text": "Learn frameworks for designing scalable distributed systems that FAANG interviewers expect"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Nail Behavioral Questions",
        "text": "Build compelling STAR stories demonstrating leadership principles and senior-level impact"
      }
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Interview Preparation Courses by Rupesh Tiwari",
    "description": "Online courses for FAANG interview preparation, system design, and cloud architecture",
    "itemListElement": [
      {
        "@type": "Course",
        "position": 1,
        "name": "AWS Solutions Architect Interview Preparation",
        "description": "Complete preparation guide for AWS Solutions Architect interviews",
        "provider": {"@type": "Organization", "name": "Udemy"},
        "instructor": {"@type": "Person", "name": "Rupesh Tiwari"}
      },
      {
        "@type": "Course",
        "position": 2,
        "name": "System Design for Senior Engineers",
        "description": "Master system design interviews for FAANG companies",
        "provider": {"@type": "Organization", "name": "Pluralsight"},
        "instructor": {"@type": "Person", "name": "Rupesh Tiwari"}
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FullStack Master - FAANG Interview Coaching",
    "description": profile.descriptions.seo,
    "url": profile.brand.website,
    "telephone": profile.contact.phone,
    "email": profile.contact.email,
    "priceRange": "$120-$600",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.2171,
        "longitude": -74.7429
      },
      "geoRadius": "10000"
    },
    "sameAs": [
      profile.socialLinks.linkedIn.personal,
      profile.socialLinks.youtube.channel,
      profile.socialLinks.igotanoffer.reviewsUrl
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
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}
