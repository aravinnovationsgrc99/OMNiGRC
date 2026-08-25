'use client';

import React, { useState } from 'react';
import { Globe, Lock, ShieldCheck, EyeOff, FileText, CheckCircle2, Server } from 'lucide-react';

const REGIONS = [
  {
    id: 'india',
    country: 'India',
    flag: '🇮🇳',
    status: 'Live at MVP',
    badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    title: 'DPDP-Compliant India Pod',
    hosting: 'AWS India (Mumbai / Hyderabad)',
    mandate: 'Mandatory for Data Fiduciaries & Indian enterprise data residency laws under DPDP Act 2023.',
    features: ['Local PII data storage', 'Zero cross-border transfer', 'Indian Rupee invoicing'],
    live: true,
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'Live at MVP',
    badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    title: 'UK GDPR-Ready Pod',
    hosting: 'AWS UK (London)',
    mandate: 'Meets UK Data Protection Act 2018 & UK GDPR adequacy requirements for UK enterprises.',
    features: ['UK Sovereign hosting', 'ICO reporting readiness', 'GBP currency support'],
    live: true,
  },
  {
    id: 'eu',
    country: 'European Union',
    flag: '🇪🇺',
    status: 'Launching Q1 2027',
    badgeColor: 'bg-sky-950 text-sky-400 border-sky-800',
    title: 'EU Pod (Schrems II Compliant)',
    hosting: 'AWS EU (Frankfurt / Dublin)',
    mandate: 'Strict EU GDPR Article 45/46 transfer safeguard compliance and NIS2 Directive readiness.',
    features: ['Schrems II compliant', 'EUR currency billing', 'NIS2 cross-framework mapping'],
    live: false,
  },
  {
    id: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    status: 'Launching Q1 2027',
    badgeColor: 'bg-sky-950 text-sky-400 border-sky-800',
    title: 'Australia Pod (Essential 8)',
    hosting: 'AWS Australia (Sydney)',
    mandate: 'Privacy Act 1988 & ACSC Essential 8 cybersecurity mitigation strategy alignment.',
    features: ['Essential 8 reporting', 'AUD currency support', 'APRA CPS 234 controls'],
    live: false,
  },
];

export default function DataResidencyMap() {
  const [activeRegion, setActiveRegion] = useState('india');

  const selectedRegion = REGIONS.find((r) => r.id === activeRegion) || REGIONS[0];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-800/80 text-teal-400 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Globe className="w-3.5 h-3.5" />
            <span>Regional Data Residency & Sovereignty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200 tracking-tight">
            Your Compliance Data Stays In Your Region
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Data sovereignty is non-negotiable for GRC leads. OMNiGRC deploys isolated regional pods so your evidence, risk logs, and asset metadata never cross legal boundaries.
          </p>
        </div>

        {/* Interactive World Map Pod Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Visual SVG Map & Pins (7 Columns) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden min-h-[340px] flex flex-col justify-between">
            {/* World Map Stylized SVG Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 1000 500" className="w-full h-full text-slate-500 fill-current">
                <path d="M150,150 Q200,100 250,160 T350,180 T450,120 T600,150 T750,140 T900,180 V350 H100 Z" />
              </svg>
            </div>

            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center">
                <Server className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
                OMNiGRC Pod Topology
              </span>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="flex items-center text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" /> Live MVP Pods
                </span>
                <span className="flex items-center text-sky-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-sky-400 mr-1.5" /> Planned Q1 2027
                </span>
              </div>
            </div>

            {/* Region Interactive Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 my-6 z-10">
              {REGIONS.map((r) => {
                const isSelected = activeRegion === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegion(r.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                      isSelected
                        ? 'bg-slate-900/90 border-teal-500 shadow-xl shadow-teal-950/60 scale-[1.03] ring-1 ring-teal-500/40'
                        : r.live
                        ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-800/60 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{r.flag}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                        {r.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{r.country}</h4>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                      {r.hosting}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 z-10 flex items-center justify-between border-t border-slate-800/80 pt-3">
              <span>Click any region pod to inspect compliance mandates & hosting specs</span>
              <span className="text-teal-400 font-mono">Zero Cross-Region Transfer</span>
            </div>
          </div>

          {/* Region Details Drawer (5 Columns) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{selectedRegion.flag}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedRegion.badgeColor}`}>
                {selectedRegion.status}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-100">
                {selectedRegion.title}
              </h3>
              <p className="text-xs font-mono text-teal-400 mt-1">
                Hosting: {selectedRegion.hosting}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              {selectedRegion.mandate}
            </p>

            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Pod Capability Breakdown
              </p>
              {selectedRegion.features.map((f, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Trust Callout Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="p-3 w-max rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <EyeOff className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Data Redaction Before AI Calls</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              PII, names, and internal credentials are automatically redacted locally before any LLM prompt leaves OMNiGRC.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="p-3 w-max rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Zero-Data-Retention Agreements</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              External model providers (Gemini/Claude) operate under binding ZDR clauses — model training is strictly disabled.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="p-3 w-max rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Full Audit Trail Logging</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every control mapping, evidence upload, and analyst review creates an immutable timestamped audit log.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="p-3 w-max rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-100 text-sm">Row-Level Tenant Isolation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              PostgreSQL Row-Level Security (RLS) ensures strict tenant data segregation at the database engine level.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
