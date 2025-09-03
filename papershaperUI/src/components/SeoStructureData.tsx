// src/components/SeoStructure.tsx
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  pageType?: "website" | "article" | "product";
}

const SeoStructure = ({
  title = "Papershapers - AI CBSE Mock Paper Generator",
  description = "Create customized CBSE 9th-12th mock papers in minutes using AI. Smart question selection, automatic formatting & syllabus-aligned papers for teachers and students.",
  keywords = "CBSE mock papers, AI question generator, Class 9-12 question papers, CBSE practice papers, AI education tools, Paper generator India",
  path = "/",
  pageType = "website",
}: SeoProps) => {
  const canonicalUrl = `https://papershapers.in${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "WebSite"],
    name: "Papershapers",
    url: "https://papershapers.in",
    description: description,
    founder: {
      "@type": "Person",
      name: "Ankit Varshney",
      jobTitle: "Founder & CEO",
    },
    foundingDate: "2025-01",
    sameAs: [
      "https://twitter.com/papershapers",
      "https://www.facebook.com/papershapers",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "papershaper07x@gmail.com",
      contactType: "customer service",
      areaServed: "IN",
    },
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={pageType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://papershapers.in/og-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://papershapers.in/twitter-image.png"
        />

        {/* Additional Educational Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Papershapers",
            url: "https://papershapers.in",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://papershapers.in",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};

export default SeoStructure;
