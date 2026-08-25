'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { ShieldAlert, Server, SlidersHorizontal, CheckCircle2, Sparkles, AlertTriangle, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    risksCount: 3,
    highRisksCount: 2,
    assetsCount: 2,
    controlsCount: 2,
    tasksCount: 3,
    pendingAI: 1,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [risks, assets, controls, tasks, aiSuggestions] = await Promise.all([
          fetchApi('/risks').catch(() => []),
          fetchApi('/assets').catch(() => []),
          fetchApi('/controls').catch(() => []),
          fetchApi('/compliance/tasks').catch(() => []),
          fetchApi('/ai/mapping/suggestions').catch(() => []),
        ]);

        setStats({
          risksCount: risks.length,
          highRisksCount: risks.filter((r: any) => r.risk_score >= 12).length,
          assetsCount: assets.length,
          controlsCount: controls.length,
          tasksCount: tasks.length,
          pendingAI: aiSuggestions.length,
        });
      } catch (err) {
        console.error('Failed loading stats:', err);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-200 to-indigo-200">
            GRC Executive Stance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time unified compliance posture across Risk, Assets, Controls, Frameworks, and AI.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
            System Healthy
          </span>
        </div>
      </div>

      {/* KPI Cards Grid - Responsive columns for Mobile Portrait / Landscape / Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Risks */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 card-3d flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Active Risks</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{stats.risksCount}</p>
            <span className="text-[11px] text-rose-400 font-semibold flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1 text-rose-400" /> {stats.highRisksCount} High/Critical
            </span>
          </div>
          <div className="p-3 bg-gradient-to-br from-rose-500/20 to-rose-600/10 rounded-xl text-rose-400 border border-rose-500/30 glow-rose">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Tracked Assets */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 card-3d flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Tracked Assets</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{stats.assetsCount}</p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">100% Tenant Isolated</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-sky-500/20 to-sky-600/10 rounded-xl text-sky-400 border border-sky-500/30 glow-blue">
            <Server className="w-6 h-6" />
          </div>
        </div>

        {/* Mapped Controls */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 card-3d flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Mapped Controls</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{stats.controlsCount}</p>
            <span className="text-[11px] text-slate-400 mt-1 block">ISO 27001 / SOC 2 / DPDP</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-xl text-indigo-400 border border-indigo-500/30">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
        </div>

        {/* Compliance Tasks */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 card-3d flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Compliance Tasks</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{stats.tasksCount}</p>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Kanban Active</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl text-emerald-400 border border-emerald-500/30 glow-emerald">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* AI Reviews */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800/90 card-3d flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">AI Reviews</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">{stats.pendingAI}</p>
            <span className="text-[11px] text-amber-400 font-semibold mt-1 block">Human Review Req.</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl text-amber-400 border border-amber-500/30 glow-amber">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Pillars Quick Access */}
        <div className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/90 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3 gap-2">
            <h3 className="font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              Supported Frameworks & Extensible Controls
            </h3>
            <span className="text-[11px] font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded-full border border-sky-800/60 self-start sm:self-auto">
              Generic Relational Model
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-sky-500/40 transition-colors">
              <h4 className="font-bold text-slate-200 text-sm flex items-center justify-between">
                <span>ISO/IEC 27001:2022</span>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Annex A.5 (Access Control), A.8.24 (Cryptography), A.8.8 (Vulnerabilities).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-sky-500/40 transition-colors">
              <h4 className="font-bold text-slate-200 text-sm flex items-center justify-between">
                <span>SOC 2 Type II</span>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Common Criteria CC6.1 (Logical Access) and CC6.6 (Boundary Protection).</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-sky-500/40 transition-colors">
              <h4 className="font-bold text-slate-200 text-sm flex items-center justify-between">
                <span>GDPR / UK GDPR</span>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Article 32 Security of Processing and Personal Data Flow maps.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-sky-500/40 transition-colors">
              <h4 className="font-bold text-slate-200 text-sm flex items-center justify-between">
                <span>DPDP Act 2023 (India)</span>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Digital Personal Data Protection safeguards for Data Fiduciaries.</p>
            </div>
          </div>
        </div>

        {/* Advisory AI Engine Panel */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/90 space-y-4 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">Advisory AI Mapping Pipeline</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tiered LLM router (Gemini 2.5 Flash-Lite / Claude Haiku) performs automated data redaction and clause matching suggestions.
            </p>

            <div className="mt-4 p-3.5 bg-amber-950/40 border border-amber-800/50 rounded-xl text-xs space-y-2 text-amber-200 shadow-inner">
              <p className="font-bold flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400 flex-shrink-0" /> Human Approval Mandatory
              </p>
              <p className="text-amber-300/80 leading-snug">AI suggestions never directly set controls or tasks compliant. High-confidence suggestions await analyst review.</p>
            </div>
          </div>

          <Link
            href="/ai-mapping"
            className="w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2"
          >
            <span>Open AI Mapping Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
