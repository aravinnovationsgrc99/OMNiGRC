'use client';

import React from 'react';
import Link from 'next/link';
import DataResidencyMap from '@/components/marketing/DataResidencyMap';
import {
  Building2,
  ShieldCheck,
  Lock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Database,
  EyeOff,
  FileText,
  Users,
  Server,
  Layers,
} from 'lucide-react';

export default function ForEnterprisesPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-800/80 text-teal-400 text-xs font-bold uppercase tracking-widest">
          <Building2 className="w-3.5 h-3.5" />
          <span>Enterprise & Mid-Market Compliance</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200 tracking-tight max-w-4xl mx-auto">
          Built for Lean GRC Teams in Regulated Industries
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          From 50-person high-growth FinTechs to 1,000-employee mid-market enterprises across India, UK, EU, and Australia. OMNiGRC delivers row-level security, regional data residency, and audit-grade controls.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            href="/pilot"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-2"
          >
            <span>Request Enterprise Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all"
          >
            Schedule Security Deep-Dive
          </Link>
        </div>
      </section>

      {/* Target Buyer Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Who OMNiGRC Is Designed For
          </h2>
          <p className="text-xs text-slate-400">
            Tailored specifically for organizations scaling compliance operations without hiring armies of manual auditors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 w-max rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold text-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">Security & GRC Leads</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For Heads of Security at 50–1,000 person companies needing a single pane of glass across ISO 27001, SOC 2, and DPDP.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 w-max rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold text-xs">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">CTOs & Founders</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Handling compliance for the first time to unblock enterprise customer procurement and pass vendor risk assessments.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 w-max rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">Virtual CISOs & Consultants</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Managing multi-client GRC programs with instant framework crosswalks and audit-ready artifact exports.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 w-max rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">DevOps & Security Engineers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Looking for a lean, API-friendly alternative to bloated legacy enterprise GRC suites.
            </p>
          </div>
        </div>
      </section>

      {/* Security Architecture & Multi-Tenancy Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800/90 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
              Enterprise Trust & Security Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-100">
              Bank-Grade Security Controls Built In
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your compliance data includes sensitive vulnerability assessments, vendor risk scores, and technical asset topographies. OMNiGRC enforces strict defense-in-depth safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>Row-Level Tenant Isolation</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">PostgreSQL RLS Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every database query is enforced at the database kernel level with tenant-specific JWT authorization claims, rendering cross-tenant data leaks impossible.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
                <EyeOff className="w-4 h-4" />
                <span>Zero-Data Retention (ZDR)</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">AI Privacy Contract</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                External model providers operate under non-retention agreements. Prompts sent to Gemini or Claude are strictly processed in-memory and never used for model training.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <FileText className="w-4 h-4" />
                <span>Immutable Audit Logging</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">Full Audit Trail</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every control status modification, evidence upload, risk score change, and AI suggestion approval is logged with UTC timestamps and user cryptographic identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Pod Data Residency */}
      <DataResidencyMap />
    </div>
  );
}
