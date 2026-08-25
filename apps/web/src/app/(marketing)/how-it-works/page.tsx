'use client';

import React from 'react';
import Link from 'next/link';
import FourPillars from '@/components/marketing/FourPillars';
import AIMappingDiagram from '@/components/marketing/AIMappingDiagram';
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
  FileCheck2,
  UserCheck,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5" />
          <span>Product Architecture & Workflow</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight max-w-4xl mx-auto">
          How OMNiGRC Transforms Compliance Complexity
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          From fragmented spreadsheets to a unified relational compliance ledger. Understand the problem, our architecture, and how advisory AI accelerates evidence discovery without bypassing analyst sign-off.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            href="/pilot"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all flex items-center space-x-2"
          >
            <span>Start 6-Week Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/why"
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all"
          >
            Read Technical Differentiators
          </Link>
        </div>
      </section>

      {/* Problem -> Solution -> Outcome Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Problem */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-900/40 space-y-4 relative bg-rose-950/10">
            <div className="p-3 w-max rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs">
              01 • The Problem
            </div>
            <h3 className="text-xl font-extrabold text-slate-100">
              Spreadsheet Hell & Duplicate Audit Fatigue
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Lean security teams spend 60% of their time copy-pasting evidence across separate spreadsheets for ISO 27001, SOC 2, and DPDP. When an auditor asks for evidence, nobody knows who last updated the file.
            </p>
            <div className="pt-2 text-[11px] text-rose-400 font-mono">
              Result: Audit delays, missed control tests, unmanaged risks.
            </div>
          </div>

          {/* Card 2: The OMNiGRC Solution */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/40 space-y-4 relative bg-sky-950/20 shadow-xl">
            <div className="p-3 w-max rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 font-bold text-xs">
              02 • The Solution
            </div>
            <h3 className="text-xl font-extrabold text-slate-100">
              One Control Record, Advisory AI, Regional Pods
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              OMNiGRC centralizes your risks, technical assets, and vendor inventory. Map a single control once, and cite it across all 4 frameworks simultaneously. Advisory AI discovery suggests clauses; your analyst approves.
            </p>
            <div className="pt-2 text-[11px] text-teal-400 font-mono">
              Result: 70% reduction in compliance overhead.
            </div>
          </div>

          {/* Card 3: The Outcome */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-900/40 space-y-4 relative bg-emerald-950/10">
            <div className="p-3 w-max rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
              03 • The Outcome
            </div>
            <h3 className="text-xl font-extrabold text-slate-100">
              Audit Readiness in Weeks, Not Months
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuous audit readiness with immutable logs. When external auditors request proof, generate crisp PDF reports or grant read-only Kanban auditor views instantly.
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 font-mono">
              Result: Faster enterprise deals & board confidence.
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars Deep Dive */}
      <FourPillars />

      {/* The 8-Stage Advisory AI Pipeline */}
      <AIMappingDiagram />

      {/* Analyst Non-Negotiable Sign-off Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 space-y-6">
          <div className="flex items-center space-x-3 text-amber-400">
            <UserCheck className="w-8 h-8" />
            <h3 className="text-2xl font-black text-slate-100">
              "AI Suggests, Humans Decide" — Why We Built Stage 7 Sign-off
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            Autonomous AI agents sound appealing until an auditor asks who validated the cryptographic control mapping. In OMNiGRC, AI acts purely as a tire-less research assistant—discovering clauses, identifying gaps, and calculating confidence scores. Every final approval is timestamped with the exact analyst ID and tenant key.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Zero Autonomous Approvals</span>
              <p className="text-slate-400">No control status changes without analyst click.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-sky-400">Immutable Audit Logs</span>
              <p className="text-slate-400">Every diff edit & decision timestamped.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-400">Zero Model Training Data</span>
              <p className="text-slate-400">ZDR API agreements with LLM vendors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-2xl font-bold text-slate-100">Experience How It Works Live</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Test OMNiGRC's Risk Register, Asset Inventory, Control Engine, and Advisory AI Studio in a 6-week free pilot.
          </p>
          <div className="pt-2 flex justify-center space-x-4">
            <Link
              href="/pilot"
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30"
            >
              Apply for 6-Week Free Pilot
            </Link>
            <Link
              href="/demo"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs"
            >
              Book 20-Min Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
