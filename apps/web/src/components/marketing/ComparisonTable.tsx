'use client';

import React from 'react';
import { Check, X, Sparkles, Shield, AlertCircle } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Risk Tracking & Auto Heatmaps',
    spreadsheets: 'Manual formulas, fragile vlookups, static state',
    enterprise: 'Complex custom modules, high maintenance',
    omnigrc: 'Automated Likelihood x Impact scoring & live heatmaps',
    spreadsheetsCheck: false,
    enterpriseCheck: true,
    omnigrcCheck: true,
  },
  {
    feature: 'Asset & Vendor Inventory Linking',
    spreadsheets: 'Disconnected tabs, manual cross-referencing',
    enterprise: 'Heavy CMDB integration required',
    omnigrc: 'Central Hub linked to risks, controls & PII flows',
    spreadsheetsCheck: false,
    enterpriseCheck: true,
    omnigrcCheck: true,
  },
  {
    feature: 'Multi-Framework Control Crosswalk',
    spreadsheets: 'Duplicate rows per framework (ISO, SOC2, DPDP)',
    enterprise: 'Expensive add-on framework packs',
    omnigrc: 'Map once, cite across 4 frameworks natively',
    spreadsheetsCheck: false,
    enterpriseCheck: true,
    omnigrcCheck: true,
  },
  {
    feature: 'AI Control Mapping (Analyst Approved)',
    spreadsheets: 'No AI assistance',
    enterprise: 'Black-box automated AI (high hallucination risk)',
    omnigrc: 'Advisory AI router + Mandatory Stage 7 Analyst Review',
    spreadsheetsCheck: false,
    enterpriseCheck: false,
    omnigrcCheck: true,
  },
  {
    feature: 'Jira-Style Kanban Workflow',
    spreadsheets: 'No task assignments or due-date tracking',
    enterprise: 'Rigid enterprise workflow engines',
    omnigrc: 'Agile Kanban board with recurring testing reminders',
    spreadsheetsCheck: false,
    enterpriseCheck: true,
    omnigrcCheck: true,
  },
  {
    feature: 'Regional Data Pod Residency (India & UK)',
    spreadsheets: 'Uncontrolled email attachments & local drives',
    enterprise: 'US-only or multi-month custom pod setup',
    omnigrc: 'Native India (DPDP) & UK (UK GDPR) pods from Day 1',
    spreadsheetsCheck: false,
    enterpriseCheck: false,
    omnigrcCheck: true,
  },
  {
    feature: 'Time to Audit Readiness',
    spreadsheets: '6–12 months of manual document chasing',
    enterprise: '3–6 months onboarding & consultant setup',
    omnigrc: '2–4 weeks with pre-seeded framework controls',
    spreadsheetsCheck: false,
    enterpriseCheck: true,
    omnigrcCheck: true,
  },
  {
    feature: 'Pricing Model',
    spreadsheets: 'Free (Hidden cost in lost engineering hours)',
    enterprise: '$50,000–$150,000/yr upfront contracts',
    omnigrc: 'Lean seat pricing • 6-Week Free Pilot Program',
    spreadsheetsCheck: false,
    enterpriseCheck: false,
    omnigrcCheck: true,
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Shield className="w-3.5 h-3.5" />
            <span>Why Lean Teams Upgrade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight">
            Spreadsheets Don't Scale. Enterprise GRC Costs Too Much.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how OMNiGRC delivers enterprise-grade compliance rigor without the $100k annual price tag or the brittleness of static spreadsheets.
          </p>
        </div>

        {/* Table Container */}
        <div className="glass-panel rounded-3xl border border-slate-800/90 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-400 w-1/3">
                    Capability / Feature
                  </th>
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-400 w-1/5">
                    Spreadsheets
                  </th>
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-400 w-1/5">
                    Enterprise Suites
                  </th>
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950/40 w-1/4">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>OMNiGRC Platform</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-slate-200">
                      {row.feature}
                    </td>

                    {/* Spreadsheets */}
                    <td className="py-4 px-6 text-slate-400 space-y-1">
                      <div className="flex items-center space-x-1.5">
                        {row.spreadsheetsCheck ? (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                        <span className="text-[11px] leading-snug">{row.spreadsheets}</span>
                      </div>
                    </td>

                    {/* Enterprise Suites */}
                    <td className="py-4 px-6 text-slate-400 space-y-1">
                      <div className="flex items-center space-x-1.5">
                        {row.enterpriseCheck ? (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                        <span className="text-[11px] leading-snug">{row.enterprise}</span>
                      </div>
                    </td>

                    {/* OMNiGRC Highlighted Column */}
                    <td className="py-4 px-6 bg-sky-950/20 border-l border-r border-sky-800/40 font-semibold text-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[3]" />
                        <span className="text-[11px] text-sky-200 leading-snug">{row.omnigrc}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
