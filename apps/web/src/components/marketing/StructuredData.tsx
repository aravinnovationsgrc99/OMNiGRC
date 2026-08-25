import React from 'react';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OMNiGRC',
    url: 'https://omnigrc.com',
    logo: 'https://omnigrc.com/logo.png',
    description: 'Unified risk, asset, and control management platform for lean GRC teams with AI-assisted, human-verified control mapping.',
    sameAs: [
      'https://www.linkedin.com/company/omnigrc',
      'https://github.com/aravinnovationsgrc99/OMNiGRC',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'pilot@omnigrc.com',
      availableLanguage: ['English'],
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OMNiGRC Platform',
    operatingSystem: 'Web-based SaaS',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      description: '6-Week Free Pilot Program for qualified GRC teams',
    },
    featureList: [
      'AI-assisted control mapping with mandatory analyst sign-off',
      'Unified Risk Register with auto-refreshing heatmaps',
      'Asset and vendor inventory linking risks to controls',
      'Jira-style compliance board for workflow management',
      'Multi-framework crosswalk (ISO 27001, SOC 2, GDPR, DPDP Act 2023)',
      'Regional data residency pods in India (DPDP) and UK (UK GDPR)',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
