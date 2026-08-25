'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck2, ArrowRight, CheckCircle2, Lock, Globe } from 'lucide-react';

const FRAMEWORKS = [
  {
    slug: 'iso-27001',
    name: 'ISO/IEC 27001:2022',
    region: 'Global / International',
    tag: 'Information Security Management System (ISMS)',
    desc: 'The global benchmark for information security risk assessment, Annex A controls, access management, and cryptography.',
    mandatory: [
      'Annex A.5 Organizational controls (Access, Roles, Supplier relationships)',
      'Annex A.8 Technological controls (Cryptography A.8.24, Vulnerabilities A.8.8)',
      'Risk assessment and treatment methodology',
      'Management review & internal audit records',
    ],
  },
  {
    slug: 'soc-2',
    name: 'SOC 2 Type II',
    region: 'US & Global SaaS Buyers',
    tag: 'AICPA Trust Services Criteria',
    desc: 'Demonstrates operational effectiveness of Security, Availability, Processing Integrity, Confidentiality, and Privacy over 6–12 month observation windows.',
    mandatory: [
      'Common Criteria CC6.1 Logical Access Controls',
      'CC6.6 Boundary Protection & Firewalls',
      'CC7.1 Vulnerability Scanning & Incident Response',
      'Evidence collection across cloud infrastructure',
    ],
  },
  {
    slug: 'gdpr',
    name: 'GDPR & UK GDPR',
    region: 'EU & United Kingdom',
    tag: 'Data Protection & Privacy Sovereignty',
    desc: 'Strict legal mandate governing personal data processing, Data Protection Impact Assessments (DPIAs), Article 32 security, and breach notification.',
    mandatory: [
      'Article 32 Security of processing (encryption, resilience)',
      'Article 30 Records of processing activities (ROPA)',
      'DPIA assessments for high-risk data processing',
      'UK Sovereign Data Pod hosting in AWS London',
    ],
  },
  {
    slug: 'dpdp',
    name: 'DPDP Act 2023 (India)',
    region: 'India Data Fiduciaries',
    tag: 'Digital Personal Data Protection Act',
    desc: 'India’s enacted privacy law establishing obligations for Data Fiduciaries, Data Processors, and mandatory localized security safeguards.',
    mandatory: [
      'Section 8(5) Reasonable security safeguards for personal data',
      'Section 8(6) Mandatory breach notification to Data Protection Board',
      'Consent manager integration & data subject rights',
      'In-country data residency hosting in AWS India',
    ],
  },
];

export default function FrameworksHubPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Supported Framework Library</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight max-w-4xl mx-auto">
          Compliance Framework Explainers & Coverage
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          OMNiGRC comes pre-seeded with 4 core international compliance frameworks. Learn what each framework mandates and how our unified relational model maps controls across them automatically.
        </p>
      </section>

      {/* Grid of Framework Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FRAMEWORKS.map((fw) => (
            <div
              key={fw.slug}
              className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-5 hover:border-sky-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800">
                    {fw.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {fw.region}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-100">{fw.name}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{fw.desc}</p>

                <div className="pt-2 space-y-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Mandatory Scope & Clauses
                  </p>
                  {fw.mandatory.map((m, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" /> Seeded & Ready
                </span>
                <Link
                  href={`/frameworks/${fw.slug}`}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                >
                  <span>Read Explainer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
