'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { ShieldAlert, Server, SlidersHorizontal, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
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
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">GRC Executive Stance</h2>
        <p className="text-sm text-slate-400">Integrated view across Risk, Assets, Controls, Frameworks, and AI Mappings.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Active Risks</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{stats.risksCount}</p>
            <span className="text-xs text-rose-400 flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" /> {stats.highRisksCount} High/Critical
            </span>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Tracked Assets</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{stats.assetsCount}</p>
            <span className="text-xs text-emerald-400 mt-1 block">100% Tenant Isolated</span>
          </div>
          <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-500/20">
            <Server className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Mapped Controls</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{stats.controlsCount}</p>
            <span className="text-xs text-slate-400 mt-1 block">ISO 27001 / SOC 2 / DPDP</span>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Compliance Tasks</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{stats.tasksCount}</p>
            <span className="text-xs text-emerald-400 mt-1 block">Kanban Workflow Active</span>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">AI Reviews</p>
            <p className="text-2xl font-bold text-slate-100 mt-1">{stats.pendingAI}</p>
            <span className="text-xs text-amber-400 mt-1 block">Human Approval Req.</span>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Pillars Quick Access */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-semibold text-slate-100">Supported Core Frameworks & Pillars</h3>
            <span className="text-xs text-sky-400 bg-sky-950 px-2 py-1 rounded border border-sky-800">Generic Relational Model</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-medium text-slate-200 text-sm flex items-center justify-between">
                <span>ISO/IEC 27001:2022</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Mapped controls across Annex A.5 (Access Control), A.8.24 (Cryptography), and A.8.8 (Vulnerability Management).</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-medium text-slate-200 text-sm flex items-center justify-between">
                <span>SOC 2 Type II</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Trust Services Criteria for Logical Access (CC6.1) and Encryption Boundary Protection (CC6.6).</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-medium text-slate-200 text-sm flex items-center justify-between">
                <span>GDPR / UK GDPR</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Data protection requirements covering Article 32 Security of Processing and Data Flow mappings.</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-medium text-slate-200 text-sm flex items-center justify-between">
                <span>DPDP Act 2023 (India)</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Seeded</span>
              </h4>
              <p className="text-xs text-slate-400">Digital Personal Data Protection Act requirements for Data Fiduciaries and reasonable security safeguards.</p>
            </div>
          </div>
        </div>

        {/* Advisory AI Engine Panel */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100">Advisory AI Mapping Pipeline</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tiered LLM router (Gemini 2.5 Flash-Lite / Claude Haiku) performs automated data redaction and clause matching suggestions.
            </p>

            <div className="mt-4 p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs space-y-2 text-amber-200">
              <p className="font-semibold flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-400" /> Human Approval Mandatory
              </p>
              <p className="text-amber-300/80">AI suggestions never directly set controls or tasks compliant. High-confidence suggestions await analyst review.</p>
            </div>
          </div>

          <Link
            href="/ai-mapping"
            className="w-full text-center py-2 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all shadow-md shadow-sky-600/30 block"
          >
            Open AI Mapping Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
