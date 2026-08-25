'use client';

import React from 'react';
import Link from 'next/link';
import ComparisonTable from '@/components/marketing/ComparisonTable';
import {
  Sparkles,
  ShieldCheck,
  Globe,
  KanbanSquare,
  Link2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Lock,
  Layers,
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    icon: Link2,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    title: '4 Compliance Frameworks, 1 Control Record',
    subtitle: 'Eliminate Duplicate Audit Fatigue',
    desc: 'Map a single security policy or technical control (e.g., Multi-Factor Authentication) once, and OMNiGRC automatically crosswalks it across ISO 27001 Annex A, SOC 2 Common Criteria, GDPR Art 32, and India DPDP Act 2023.',
  },
  {
    icon: Globe,
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    title: 'Regional Data Residency From Day One',
    subtitle: 'India (DPDP) & UK (UK GDPR) Live Pods',
    desc: 'Keep compliance data in your sovereign region. India workloads live in AWS India under DPDP Act rules; UK workloads live in AWS London. Post-POC EU & Australia pods launching Q1 2027.',
  },
  {
    icon: Sparkles,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    title: 'AI Suggests, Humans Decide',
    subtitle: 'Advisory Discovery with Mandatory Stage 7 Sign-off',
    desc: 'Tiered LLM router accelerates clause research, but human analysts retain 100% decision authority. No control status changes autonomously without an explicit analyst approval signature.',
  },
  {
    icon: KanbanSquare,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    title: 'Jira-Style Agile Compliance Workflow',
    subtitle: 'Assigned Owners & Recurring Due Dates',
    desc: 'Track control testing like software bugs. Kanban boards for To Do, Evidence Review, and Compliant states with automated reminder notifications for quarterly access reviews and annual DPIAs.',
  },
];

export default function WhyOmniGRCPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5" />
          <span>Core Product Differentiators</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight max-w-4xl mx-auto">
          Why Modern GRC Leads Choose OMNiGRC
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Designed from the ground up to outperform static spreadsheets and replace clunky $100k legacy GRC suites with speed, rigor, and regional compliance.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            href="/pilot"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center space-x-2"
          >
            <span>Apply for Free Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all"
          >
            View Seat Pricing
          </Link>
        </div>
      </section>

      {/* 4 Pillars Differentiator Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3.5 rounded-2xl border ${d.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                      {d.subtitle}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-100">
                      {d.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {d.desc}
                </p>

                <div className="pt-2 flex items-center text-xs font-semibold text-teal-400">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Native Out-of-the-Box Capability
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Grid */}
      <ComparisonTable />
    </div>
  );
}
