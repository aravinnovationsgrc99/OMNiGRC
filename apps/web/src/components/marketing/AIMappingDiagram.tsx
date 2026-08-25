'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Lock,
  UserCheck,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  EyeOff,
  Filter,
} from 'lucide-react';

const STAGES = [
  {
    stage: 1,
    title: 'Analyst Control Request',
    zone: 'green',
    zoneName: 'Trusted Internal Zone',
    icon: UserCheck,
    desc: 'Compliance analyst initiates control mapping for a security policy against ISO 27001 or SOC 2.',
    dataPassed: 'Unstructured Security Policy Text & Target Framework Identifier',
    validation: 'Tenant token & RBAC role permission verified.',
  },
  {
    stage: 2,
    title: 'PII & Secrets Redaction',
    zone: 'green',
    zoneName: 'Trusted Internal Zone',
    icon: EyeOff,
    desc: 'Automated local regex & NER redactor strips employee names, credentials, internal IP addresses, and customer data.',
    dataPassed: 'Redacted Policy Payload (Sanitized Tokens)',
    validation: '100% local execution — zero external telemetry.',
  },
  {
    stage: 3,
    title: 'Tiered LLM Router',
    zone: 'green',
    zoneName: 'Trusted Internal Zone',
    icon: Filter,
    desc: 'Router evaluates task complexity and selects optimal LLM tier (Tier 1 Flash-Lite vs Tier 2 Deep Reasoner).',
    dataPassed: 'Sanitized prompt + system instruction format',
    validation: 'Token cost budget & latency SLA verified.',
  },
  {
    stage: 4,
    title: 'External Model Execution',
    zone: 'amber',
    zoneName: 'External LLM Call (Amber Zone)',
    icon: Cpu,
    desc: 'Encrypted API call sent to LLM provider (Gemini 2.5 / Claude Haiku) under zero-data-retention agreement.',
    dataPassed: 'Sanitized JSON prompt payload over TLS 1.3',
    validation: 'Zero Data Retention (ZDR) headers enforced.',
  },
  {
    stage: 5,
    title: 'Advisory JSON Payload',
    zone: 'amber',
    zoneName: 'External LLM Call (Amber Zone)',
    icon: Sparkles,
    desc: 'LLM generates advisory response mapping control clauses with confidence percentages and reasoning.',
    dataPassed: 'Raw LLM JSON suggestion response',
    validation: 'Schema structure & confidence threshold check.',
  },
  {
    stage: 6,
    title: 'Local Schema Validator',
    zone: 'green',
    zoneName: 'Trusted Internal Zone',
    icon: ShieldCheck,
    desc: 'OMNiGRC backend validates LLM response against official framework schema database.',
    dataPassed: 'Validated Clause Candidate List',
    validation: 'Rejects invalid clause references automatically.',
  },
  {
    stage: 7,
    title: 'Mandatory Analyst Sign-off',
    zone: 'critical',
    zoneName: 'Human Review (Stage 7 Non-Negotiable)',
    icon: CheckCircle2,
    desc: 'Human compliance analyst reviews AI suggestion in side-by-side Diff View and clicks "Approve", "Modify", or "Reject".',
    dataPassed: 'Analyst Approval Signature + Audit Note',
    validation: 'MANDATORY: AI cannot mark any control compliant autonomously.',
  },
  {
    stage: 8,
    title: 'Immutable Ledger Storage',
    zone: 'green',
    zoneName: 'Trusted Internal Zone',
    icon: Database,
    desc: 'Approved mapping is committed to tenant PostgreSQL database with full timestamped audit log.',
    dataPassed: 'Committed Control Mapping & Audit Trail Record',
    validation: 'Row-level tenant isolated storage.',
  },
];

export default function AIMappingDiagram() {
  const [selectedStage, setSelectedStage] = useState(7); // Default to Stage 7 highlight

  const activeStageObj = STAGES.find((s) => s.stage === selectedStage) || STAGES[6];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-400 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Control Mapping Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 tracking-tight">
            AI-Assisted, Human-Verified Control Mapping
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            AI accelerates clause discovery, but compliance requires accountability. Every suggestion passes through an 8-stage pipeline where human analyst approval is mandatory.
          </p>
        </div>

        {/* 8 Stage Visual Pipeline Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {STAGES.map((s) => {
              const isSelected = selectedStage === s.stage;
              const isCritical = s.stage === 7;

              return (
                <button
                  key={s.stage}
                  onClick={() => setSelectedStage(s.stage)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 border relative ${
                    isSelected
                      ? isCritical
                        ? 'bg-amber-950/90 border-amber-400 shadow-xl shadow-amber-950/80 scale-105 ring-2 ring-amber-400/50'
                        : 'bg-sky-950/90 border-sky-400 shadow-xl shadow-sky-950/80 scale-105 ring-2 ring-sky-400/50'
                      : s.zone === 'amber'
                      ? 'bg-slate-900/60 border-amber-900/40 hover:border-amber-700/60'
                      : isCritical
                      ? 'bg-amber-950/40 border-amber-800/60 hover:border-amber-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : s.zone === 'amber'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      S{s.stage}
                    </span>
                    {isCritical && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 line-clamp-1">
                    {s.title}
                  </p>
                  <p className="text-[9px] text-slate-400 capitalize mt-0.5">
                    {s.zone === 'critical' ? 'Mandatory Review' : s.zone}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left 2 Cols: Stage Information */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 rounded-2xl border ${
                    activeStageObj.stage === 7
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 glow-amber'
                      : activeStageObj.zone === 'amber'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-sky-500/10 border-sky-500/30 text-sky-400 glow-blue'
                  }`}
                >
                  <activeStageObj.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2 py-0.5 rounded">
                      Stage {activeStageObj.stage} of 8
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        activeStageObj.stage === 7
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : activeStageObj.zone === 'amber'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {activeStageObj.zoneName}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mt-1">
                    {activeStageObj.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStageObj.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Data Payload Passed
                  </p>
                  <p className="text-xs font-mono text-slate-200">
                    {activeStageObj.dataPassed}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Validation & Integrity Protocol
                  </p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {activeStageObj.validation}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Non-Negotiable Stage 7 Callout / Visual Guardrail */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-amber-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <h4 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">
                  Stage 7 Non-Negotiable
                </h4>
              </div>

              <p className="text-xs text-amber-200/90 leading-relaxed">
                In OMNiGRC, AI is advisory only. No LLM suggestion can ever directly mark a control compliant, create audit evidence, or close a task without explicit human sign-off.
              </p>

              <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-800/60 space-y-2 text-xs text-amber-100 font-mono">
                <p className="flex items-center justify-between">
                  <span>analyst_approval:</span>
                  <span className="text-amber-400 font-bold">REQUIRED</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>audit_trail_log:</span>
                  <span className="text-emerald-400 font-bold">IMMUTABLE</span>
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 flex items-center">
                  <Lock className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
                  SOC 2 & ISO 27001 Auditor Approved Pattern
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
