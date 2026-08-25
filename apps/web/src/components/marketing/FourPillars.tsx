'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Server,
  Link2,
  KanbanSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
} from 'lucide-react';

const PILLARS = [
  {
    id: 'risk-register',
    title: 'Risk Register',
    subtitle: 'Dynamic Heatmap & Auto-Scoring',
    icon: ShieldAlert,
    color: 'from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400',
    hoverGlow: 'hover:shadow-rose-500/20 hover:border-rose-500/50',
    description: 'Log, score, and track operational, cybersecurity, and vendor risks with auto-calculating inherent & residual risk heatmaps.',
    features: [
      'Inherent & Residual scoring (Likelihood x Impact matrix)',
      'Automated risk owner assignments & review cycles',
      'Real-time link to affected technical assets & vendors',
      'Export audit-ready risk registers for board reporting',
    ],
    metric: 'Auto-Calculated Scores',
    preview: {
      tag: 'Risk Heatmap Active',
      title: 'Unencrypted S3 Bucket Data Risk',
      score: '16 (Critical Risk)',
      details: 'Inherent: 20 -> Controls Applied -> Residual: 6 (Acceptable)',
    },
  },
  {
    id: 'asset-inventory',
    title: 'Asset & Vendor Inventory',
    subtitle: 'Central Infrastructure Hub',
    icon: Server,
    color: 'from-sky-500/20 to-teal-500/10 border-sky-500/30 text-sky-400',
    hoverGlow: 'hover:shadow-sky-500/20 hover:border-sky-500/50',
    description: 'Central hub for servers, cloud databases, SaaS apps, and third-party vendors — inextricably linked to every risk and control.',
    features: [
      'Row-level tenant isolated asset repository',
      'Vendor risk classification & data processing agreements',
      'Data flow tracking (Personal Data / Financial / PII)',
      'Direct mapping to ISO 27001 Annex A.8.24 & GDPR Art 32',
    ],
    metric: '100% Isolated Data',
    preview: {
      tag: 'Asset Topology',
      title: 'Production PostgreSQL Cluster (Mumbai Pod)',
      score: 'Class 1 Critical Asset',
      details: 'Contains PII • DPDP Regulated • Linked to ISO A.8.24 Control',
    },
  },
  {
    id: 'control-mapping',
    title: 'Control Mapping Engine',
    subtitle: 'Map Once, Cite Across Frameworks',
    icon: Link2,
    color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    hoverGlow: 'hover:shadow-indigo-500/20 hover:border-indigo-500/50',
    description: 'Map a single security policy or technical control across ISO 27001, SOC 2, GDPR, and DPDP simultaneously. AI suggests; analysts decide.',
    features: [
      'Tiered LLM router generates advisory clause suggestions',
      'Mandatory Stage 7 human analyst sign-off before marking compliant',
      'Zero training data retention with external AI providers',
      'Multi-framework crosswalk eliminates duplicate audit effort by 70%',
    ],
    metric: 'AI-Assisted • Human Verified',
    preview: {
      tag: 'Cross-Framework Crosswalk',
      title: 'Multi-Factor Authentication (MFA) Policy',
      score: '4 Frameworks Satisfied',
      details: 'ISO 27001 A.5.17 | SOC 2 CC6.1 | GDPR Art 32 | DPDP Sec 8(5)',
    },
  },
  {
    id: 'compliance-board',
    title: 'Compliance Board',
    subtitle: 'Jira-Style Control Workflows',
    icon: KanbanSquare,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    hoverGlow: 'hover:shadow-emerald-500/20 hover:border-emerald-500/50',
    description: 'Assign controls, set recurring testing cadence, attach evidence, and track due dates across your engineering and security team.',
    features: [
      'Kanban board views: To Do, Evidence Review, Tested, Compliant',
      'Automated reminder notifications for recurring controls',
      'Immutable evidence attachment & reviewer timestamp logs',
      'Role-based access for external auditors & virtual CISOs',
    ],
    metric: 'Jira-Style Execution',
    preview: {
      tag: 'Control Kanban Task',
      title: 'Quarterly IAM User Access Certification',
      score: 'Due in 4 Days',
      details: 'Assigned to DevOps Team • 14 Sub-assets Verified',
    },
  },
];

export default function FourPillars() {
  const [activeTab, setActiveTab] = useState('risk-register');

  const selectedPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Four Product Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight">
            One Unified Architecture for Governance, Risk & Compliance
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate fragmented spreadsheets and siloed compliance tools. OMNiGRC connects your risks, assets, controls, and tasks into a single immutable ledger.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 relative group border ${
                  isSelected
                    ? 'bg-slate-900/90 border-sky-500/60 shadow-2xl shadow-sky-950/50 scale-[1.02] ring-1 ring-sky-500/30'
                    : 'glass-card hover:bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                } ${pillar.hoverGlow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br border ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    Pillar
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-sky-400/90 mt-0.5 mb-2">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-slate-300">
                    {pillar.metric}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Interactive Tab Drawer / Feature View */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Pillar Feature Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br border ${selectedPillar.color}`}>
                  <selectedPillar.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-100">
                    {selectedPillar.title}
                  </h3>
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    {selectedPillar.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPillar.description}
              </p>

              <div className="space-y-3">
                {selectedPillar.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/pilot"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all flex items-center space-x-2"
                >
                  <span>Test {selectedPillar.title} in Pilot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs transition-all"
                >
                  See Architecture Deep Dive
                </Link>
              </div>
            </div>

            {/* Right: Simulated Live Dashboard Component Preview */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800/90 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300">{selectedPillar.preview.tag}</span>
                </div>
                <span className="text-[10px] font-mono bg-slate-900 text-sky-400 border border-slate-800 px-2 py-0.5 rounded">
                  OMNiGRC Live Core
                </span>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">
                    {selectedPillar.preview.title}
                  </h4>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300">
                    {selectedPillar.preview.score}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedPillar.preview.details}
                </p>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 h-full w-4/5 rounded-full" />
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  Multi-tenant Isolation Verified
                </span>
                <span className="text-teal-400 font-semibold">Stage 7 Review Passed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
