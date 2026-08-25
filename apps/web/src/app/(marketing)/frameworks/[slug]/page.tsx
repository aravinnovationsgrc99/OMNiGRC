'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Lock,
  Sparkles,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

const FRAMEWORK_DATA: { [key: string]: any } = {
  'iso-27001': {
    name: 'ISO/IEC 27001:2022',
    tagline: 'Information Security Management System (ISMS) Standard',
    officialDef: 'ISO/IEC 27001:2022 specifies requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS).',
    basics: [
      'Information security risk assessment and treatment methodology.',
      'Annex A.5 (Organizational Controls): Access control, supplier relationships, policies.',
      'Annex A.8 (Technological Controls): Cryptography (A.8.24), vulnerability management (A.8.8), capacity management.',
      'Incident management, business continuity, and physical security controls.',
    ],
    whoNeedsIt: 'Technology SaaS companies, cloud service providers, financial institutions, healthcare tech firms, and any organization handling enterprise customer data.',
    howOmniGRCHelps: [
      'Pre-seeded with ISO/IEC 27001:2022 Annex A control clauses out-of-the-box.',
      'Advisory AI discovers matching policy evidence and generates candidate clause mappings in minutes.',
      'Stage 7 Analyst Sign-off guarantees every mapped control has human verification and an immutable timestamped audit log.',
      'Crosswalk engine automatically maps ISO 27001 controls to SOC 2 CC6.1 and DPDP Section 8(5).',
      'Hosted in local India (DPDP) or UK (UK GDPR) data residency pods.',
    ],
  },
  'soc-2': {
    name: 'SOC 2 Type II',
    tagline: 'AICPA Trust Services Criteria Compliance',
    officialDef: 'SOC 2 Type II evaluates an organization’s operational controls over time against the AICPA Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
    basics: [
      'Common Criteria CC6.1 – Logical Access Security & Identity Management.',
      'CC6.6 – Boundary Protection, Firewalls, & Network Segmentation.',
      'CC7.1 – Vulnerability Management & Continuous Threat Monitoring.',
      '6 to 12-month audit observation period requiring continuous evidence sampling.',
    ],
    whoNeedsIt: 'B2B SaaS companies selling into North American and enterprise markets where procurement mandates third-party audit reports.',
    howOmniGRCHelps: [
      'Automated Kanban compliance board tracks recurring evidence sampling tasks.',
      'Maps CC6.1 and CC6.6 directly to technical assets in your central inventory.',
      'Advisory AI suggests evidence attachments while analyst sign-off maintains audit integrity.',
      'Export audit-ready evidence packages for CPA auditor review.',
    ],
  },
  gdpr: {
    name: 'GDPR & UK GDPR',
    tagline: 'General Data Protection Regulation & UK Data Protection Act 2018',
    officialDef: 'GDPR mandates how personal data of EU and UK data subjects must be collected, processed, encrypted, stored, and protected against breaches.',
    basics: [
      'Article 32 – Security of Processing (Encryption, pseudonymization, resilience).',
      'Article 30 – Records of Processing Activities (ROPA & Data Flow Mapping).',
      'Article 35 – Data Protection Impact Assessments (DPIA) for high-risk processing.',
      'Strict 72-hour regulatory breach notification requirements.',
    ],
    whoNeedsIt: 'Any business collecting or processing personal data of individuals located in the European Union or United Kingdom.',
    howOmniGRCHelps: [
      'UK Sovereign Data Pod (AWS London) ensures full UK GDPR data residency compliance.',
      'Asset inventory maps personal data flows directly to Article 32 security controls.',
      'Multi-framework crosswalk maps GDPR Art 32 to ISO 27001 Annex A.8.24 & India DPDP.',
      'Redacts all PII locally before any advisory LLM evaluation.',
    ],
  },
  dpdp: {
    name: 'DPDP Act 2023 (India)',
    tagline: 'Digital Personal Data Protection Act (India)',
    officialDef: 'India’s Digital Personal Data Protection Act 2023 sets obligations for Data Fiduciaries processing digital personal data of Indian Data Principals.',
    basics: [
      'Section 8(5) – Duty to implement reasonable security safeguards to prevent personal data breaches.',
      'Section 8(6) – Mandatory intimation of personal data breaches to DPB & affected Data Principals.',
      'Data Fiduciary governance, consent manager requirements, and Data Subject Rights.',
      'Significant Data Fiduciary (SDF) audit and Data Protection Officer (DPO) mandates.',
    ],
    whoNeedsIt: 'Any organization processing digital personal data within India or handling Indian citizens’ personal data globally.',
    howOmniGRCHelps: [
      'Native India Data Pod (AWS Mumbai / Hyderabad) guarantees 100% in-country data residency.',
      'Pre-seeded Section 8(5) security safeguards linked to technical asset inventory.',
      'Single control mapping crosswalks Indian DPDP requirements with ISO 27001 and GDPR.',
      'Analyst sign-off logs provide statutory compliance records for Data Protection Board audits.',
    ],
  },
};

export default function FrameworkSlugPage({ params }: { params: { slug: string } }) {
  const fw = FRAMEWORK_DATA[params.slug];

  if (!fw) {
    return notFound();
  }

  return (
    <div className="space-y-16 py-12">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/frameworks" className="hover:text-slate-200">
            Frameworks
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-sky-400 font-bold">{fw.name}</span>
        </nav>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>{fw.tagline}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight">
          {fw.name} Compliance Explainer
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-4xl leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
          "{fw.officialDef}"
        </p>
      </section>

      {/* Main 3 Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: The Basics */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>1. What {fw.name} Mandates</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {fw.basics.map((b: string, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Who Needs It */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-100 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>2. Who Needs {fw.name} Compliance?</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            {fw.whoNeedsIt}
          </p>
        </div>

        {/* Section 3: How OMNiGRC Helps */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/40 bg-gradient-to-br from-sky-950/20 via-slate-950 to-slate-950 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">OMNiGRC Automated Coverage</span>
              <h2 className="text-2xl font-extrabold text-slate-100">3. How OMNiGRC Streamlines {fw.name}</h2>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {fw.howOmniGRCHelps.map((h: string, idx: number) => (
              <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/pilot"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Test {fw.name} in Free Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs transition-all text-center"
            >
              Request 20-Min Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
