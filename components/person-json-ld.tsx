import React from 'react';
import { personalInfo } from '@/data/personal';
import { socialLinks } from '@/data/social';

export default function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: 'Senior Frontend Developer / Team Lead',
    email: `mailto:${personalInfo.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressCountry: 'ES',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    sameAs: socialLinks.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
