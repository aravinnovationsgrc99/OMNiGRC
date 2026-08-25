'use client';

import React from 'react';
import Link from 'next/link';
import FourPillars from '@/components/marketing/FourPillars';
import AIMappingDiagram from '@/components/marketing/AIMappingDiagram';
import DataResidencyMap from '@/components/marketing/DataResidencyMap';
import ComparisonTable from '@/components/marketing/ComparisonTable';
import {
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Zap,
  Building2,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';

export default function MarketingHomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-slate-950">
        {/* Ambient Radial Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-600/20 via-teal-500/15 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-bold shadow-xl backdrop-blur-md animate-float">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Advisory AI • Non-Negotiable Human Sign-off</span>
              <span className="text-slate-500">|</span>
              <span className="text-teal-400 font-semibold">India & UK Hosting Live</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-sky-200 tracking-tight leading-[1.08]">
              Unified risk, asset, and control management for lean GRC teams.
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-3xl mx-auto">
              Map controls once, cite across frameworks. OMNiGRC's AI assists; your analysts approve. Native support for ISO 27001, SOC 2, GDPR, and India's DPDP Act 2023.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pilot"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-2xl shadow-sky-500/30 border border-white/20 transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center space-x-2 group"
              >
                <Sparkles className="w-5 h-5 text-sky-200 group-hover:rotate-12 transition-transform" />
                <span>Join 6-Week Free Pilot</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-bold text-sm sm:text-base border border-slate-800 hover:border-slate-700 transition-all backdrop-blur-md flex items-center justify-center space-x-2"
              >
                <span>Request 20-Min Demo</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 font-bold text-xs sm:text-sm border border-amber-800/60 transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Explore Live Platform</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/60 text-left">
              <div className="p-3">
                <p className="text-xl font-extrabold text-white">4 Frameworks</p>
                <p className="text-xs text-slate-400">1 Unified Control Record</p>
              </div>
              <div className="p-3">
                <p className="text-xl font-extrabold text-teal-400">100% Isolated</p>
                <p className="text-xs text-slate-400">Row-Level PostgreSQL RLS</p>
              </div>
              <div className="p-3">
                <p className="text-xl font-extrabold text-amber-400">Stage 7 Review</p>
                <p className="text-xs text-slate-400">Mandatory Human Sign-off</p>
              </div>
              <div className="p-3">
                <p className="text-xl font-extrabold text-sky-400">India & UK</p>
                <p className="text-xs text-slate-400">Data Pod Sovereignty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Visual Section */}
      <FourPillars />

      {/* AI Control-Mapping 8-Stage Flow */}
      <AIMappingDiagram />

      {/* Regional Data Residency & Pod Trust */}
      <DataResidencyMap />

      {/* Comparison Grid */}
      <ComparisonTable />

      {/* Pricing Teaser */}
      <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800/90 shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
                  Transparent Seat Pricing
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
                  Built for lean teams. Pilot organizations get 6 weeks free.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  No 6-figure upfront commitments. Choose from Starter, Growth, or Scale tiers with full multi-framework crosswalks and dedicated regional data hosting pods.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                  <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> ISO 27001, SOC 2, GDPR, DPDP</span>
                  <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> 3 to 5 Users included in Pilot</span>
                  <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5" /> Dedicated Onboarding Engineer</span>
                </div>
              </div>

              <div className="text-center lg:text-right space-y-3">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-xl shadow-sky-600/30 transition-all"
                >
                  <span>Explore All Plans & Tiers</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <p className="text-xs text-slate-400">6-week POC includes full native integrations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="py-20 bg-gradient-to-t from-slate-900 to-slate-950 relative overflow-hidden text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200">
            Ready to simplify compliance without compromising rigor?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Join security and GRC leaders across India, UK, and Europe pilot-testing OMNiGRC's unified risk, asset, and control platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/pilot"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-2xl shadow-sky-500/30 transition-all"
            >
              Apply for 6-Week Free Pilot
            </Link>
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-sm transition-all"
            >
              Book 20-Min Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
