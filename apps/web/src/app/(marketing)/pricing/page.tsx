'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Globe,
  ArrowRight,
  HelpCircle,
  Zap,
} from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    badge: 'Ideal for Seed & Series A',
    price: '$299',
    period: '/month billed annually',
    seats: 'Up to 10 GRC User Seats',
    description: 'Perfect for startups and lean teams tackling their first ISO 27001, SOC 2, or DPDP audit.',
    features: [
      '1 Primary Compliance Framework included',
      'Tier 1 Advisory AI Router (Gemini Flash-Lite)',
      'Stage 7 Analyst Sign-off & Audit Trail',
      'Live India (DPDP) or UK (UK GDPR) Pod Hosting',
      'Jira, Slack & Google Workspace Integrations',
      'Standard Email & In-App Support',
    ],
    cta: 'Apply for Free Starter Pilot',
    highlighted: false,
  },
  {
    name: 'Growth',
    badge: 'Most Popular for Mid-Market',
    price: '$699',
    period: '/month billed annually',
    seats: 'Up to 30 GRC User Seats',
    description: 'For growing enterprises maintaining multi-framework compliance across global customers.',
    features: [
      'All 4 Frameworks Included (ISO 27001, SOC 2, GDPR, DPDP)',
      'Tier 1 + Tier 2 Advisory AI (Deep Clause Router)',
      'Stage 7 Analyst Sign-off & Immutable Audit Trail',
      'Live India & UK Pods + Pre-reservation for EU/AU',
      'Native Jira, Teams, Slack, GitHub & Okta SSO',
      'Dedicated Onboarding Engineer & 99.9% Uptime SLA',
    ],
    cta: 'Apply for Free Growth Pilot',
    highlighted: true,
  },
  {
    name: 'Scale',
    badge: 'Custom Dedicated Pods',
    price: 'Custom',
    period: 'Tailored enterprise pricing',
    seats: '50+ Enterprise Seats',
    description: 'For enterprise orgs requiring dedicated VPC pods, custom AI router models, and virtual CISO support.',
    features: [
      'Unlimited Frameworks + Custom Internal Control Schema',
      'Dedicated Private AI Model Deployment (ZDR Enforced)',
      'Custom Sovereign Data Pods (EU & Australia VPCs)',
      '24/7 Priority Support & Named Technical Account Manager',
      'Custom GraphQL API & External Audit Firm Access',
      'Custom Vendor Risk & DPIA Workflows',
    ],
    cta: 'Contact Enterprise Sales',
    highlighted: false,
  },
];

const FAQS = [
  {
    q: 'How long does the free pilot program run?',
    a: 'The pilot program runs for 6 full weeks with 3 to 5 named user seats included at zero cost or commitment.',
  },
  {
    q: 'What is included during the 6-week pilot?',
    a: 'Pilot organizations receive 1 primary framework setup, advisory AI control mapping, native integrations (Jira/Slack), and a dedicated onboarding engineer.',
  },
  {
    q: 'Where does our compliance data reside?',
    a: 'Data residency is determined by your country selection. Indian orgs are hosted in AWS India (DPDP Act compliant); UK orgs live in AWS London (UK GDPR compliant). Zero data leaves your sovereign region.',
  },
  {
    q: 'Can we add custom controls beyond ISO 27001 and SOC 2?',
    a: 'Yes! OMNiGRC uses a generic relational model allowing you to define custom internal security controls and map them alongside standard framework clauses.',
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-800/80 text-teal-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Predictable Seat Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200 tracking-tight max-w-4xl mx-auto">
          Pricing Built for Lean GRC Teams
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          No mandatory $50,000 upfront annual commitments. Simple per-seat pricing designed so growing companies can adopt enterprise compliance software early.
        </p>

        {/* 6-Week Free Banner Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/90 via-slate-900 to-sky-950/90 border border-teal-500/40 max-w-2xl mx-auto text-xs sm:text-sm text-teal-200 font-semibold shadow-xl flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Qualified Pilot Organizations Get 6 Weeks Free Access (3–5 Named Users Included)</span>
        </div>
      </section>

      {/* 3 Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
                tier.highlighted
                  ? 'bg-slate-900/95 border-sky-500/80 shadow-2xl shadow-sky-950/80 scale-[1.03] ring-1 ring-sky-500/50'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg">
                  Recommended for Most Orgs
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800">
                    {tier.badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-100 mt-2">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                </div>

                <div className="border-t border-b border-slate-800/80 py-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-xs text-slate-400">{tier.period}</span>
                  </div>
                  <p className="text-xs font-bold text-sky-400 mt-1">{tier.seats}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Included Features & Capabilities
                  </p>
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/pilot"
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    tier.highlighted
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-100">
            Frequently Asked Pricing Questions
          </h2>
          <p className="text-xs text-slate-400">
            Have a custom requirement? Contact our team for dedicated pod pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-100 text-sm flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
