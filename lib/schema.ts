/**
 * SEO Schema Generation for LDASD Estate Planning
 * Generates JSON-LD structured data for rich search results
 */

import { contactInfo, services, testimonials, faqs, stats } from "./content-data";

// Organization Schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: contactInfo.company,
    url: contactInfo.url,
    logo: `${contactInfo.url}/logo.png`,
    description: "Affordable online estate planning services including living trusts, wills, and guardianship documents.",
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contactInfo.address.street}, ${contactInfo.address.suite}`,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: contactInfo.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: `$${stats.startingPrice}+`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.averageRating,
      reviewCount: stats.ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// Service Schema
export function generateServiceSchema(service?: typeof services[0]) {
  if (service) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "LegalService",
        name: contactInfo.company,
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    };
  }

  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    provider: {
      "@type": "LegalService",
      name: contactInfo.company,
    },
    offers: {
      "@type": "Offer",
      price: s.price,
      priceCurrency: "USD",
    },
  }));
}

// FAQ Schema
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Review Schema
export function generateReviewSchema() {
  return testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: t.author,
    },
    reviewBody: t.quote,
    itemReviewed: {
      "@type": "LegalService",
      name: contactInfo.company,
    },
  }));
}

// Aggregate Rating Schema
export function generateAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: contactInfo.company,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.averageRating,
      reviewCount: stats.ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(pathname: string) {
  const pathParts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: contactInfo.url,
    },
  ];

  let currentPath = "";
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      item: `${contactInfo.url}${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// HowTo Schema for estate planning process
export function generateHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create Your Estate Plan Online",
    description: "Simple steps to protect your family with a comprehensive estate plan.",
    totalTime: "PT30M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose Your Plan",
        text: "Select the estate planning package that fits your needs - from a simple will to a complete estate plan.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Answer Questions",
        text: "Complete our guided questionnaire about your family, assets, and wishes.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Review Documents",
        text: "Review your customized estate planning documents prepared by our team.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Sign and Notarize",
        text: "Follow our instructions to properly sign and notarize your documents.",
      },
    ],
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: contactInfo.company,
    url: contactInfo.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${contactInfo.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// Get all schemas for a page
export function getSchemasForPage(pathname: string) {
  const schemas: object[] = [];

  // Always include organization
  schemas.push(generateOrganizationSchema());
  schemas.push(generateBreadcrumbSchema(pathname));

  // Page-specific schemas
  if (pathname === "/" || pathname === "") {
    schemas.push(generateWebsiteSchema());
    schemas.push(generateFAQSchema());
    schemas.push(generateHowToSchema());
    schemas.push(generateAggregateRatingSchema());
  }

  if (pathname.includes("/learn/faq")) {
    schemas.push(generateFAQSchema());
  }

  if (pathname.includes("/products") || pathname.includes("/pricing")) {
    schemas.push(...(generateServiceSchema() as object[]));
  }

  return schemas;
}
