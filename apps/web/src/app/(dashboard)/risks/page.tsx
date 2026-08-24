'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { Risk } from '@omnigrc/types';
import { calculateRiskScore, getRiskSeverityLabel } from '@omnigrc/shared';
import { ShieldAlert, Plus, Flame, ShieldCheck } from 'lucide-react';

export default function RiskIntelligencePage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [heatmap, setHeatmap] = useState<Record<string, number>>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    category: 'security',
    likelihood: 3,
    impact: 3,
    treatment_plan: '',
  });

  const loadData = async () => {
    try {
      const data = await fetchApi<Risk[]>('/risks');
      setRisks(data);

      const map = await fetchApi<Record<string, number>>('/risks/heatmap');
      setHeatmap(map);
    } catch (err) {
      console.error('Failed fetching risks:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/risks', {
        method: 'POST',
        body: JSON.stringify(newRisk),
      });
      setShowCreateModal(false);
      setNewRisk({
        title: '',
        description: '',
        category: 'security',
        likelihood: 3,
        impact: 3,
        treatment_plan: '',
      });
      loadData();
    } catch (err: any) {
      alert(`Error creating risk: ${err.message}`);
    }
  };

  const filteredRisks = selectedCell
    ? risks.filter((r) => `${r.likelihood}-${r.impact}` === selectedCell)
    : risks;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-rose-200 to-amber-200 flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-rose-400 flex-shrink-0" />
            Risk Register & Scoring Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deterministic scoring (`Likelihood × Impact`) with append-only score history logging.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-sky-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Identify New Risk</span>
        </button>
      </div>

      {/* Grid: 5x5 Heatmap Matrix + Scoring Formula Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Matrix with horizontal overflow safety on mobile */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              5×5 Risk Matrix Heatmap
            </h3>
            {selectedCell && (
              <button
                onClick={() => setSelectedCell(null)}
                className="text-xs font-bold text-sky-400 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="min-w-[260px] grid grid-cols-6 gap-1.5 text-center text-xs">
              <div className="font-extrabold text-slate-500 flex items-center justify-center">L \ I</div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="font-bold text-slate-400 py-1">{i}</div>
              ))}

              {[5, 4, 3, 2, 1].map((l) => (
                <React.Fragment key={l}>
                  <div className="font-bold text-slate-400 py-2 flex items-center justify-center">{l}</div>
                  {[1, 2, 3, 4, 5].map((i) => {
                    const score = l * i;
                    const key = `${l}-${i}`;
                    const count = heatmap[key] || 0;
                    const isSelected = selectedCell === key;

                    let bgColor = 'bg-emerald-950/70 border-emerald-800/50 text-emerald-300';
                    if (score > 4 && score <= 9) bgColor = 'bg-yellow-950/70 border-yellow-800/50 text-yellow-300';
                    if (score > 9 && score <= 16) bgColor = 'bg-amber-950/70 border-amber-800/50 text-amber-300';
                    if (score > 16) bgColor = 'bg-rose-950/70 border-rose-800/50 text-rose-300';

                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCell(key)}
                        className={`h-9 rounded-lg border flex items-center justify-center font-black text-xs transition-all ${bgColor} ${
                          isSelected ? 'ring-2 ring-sky-400 scale-105 shadow-lg' : 'hover:opacity-90'
                        }`}
                      >
                        {count > 0 ? count : ''}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-center">Tap any cell to filter risks by exact Likelihood / Impact rating.</p>
        </div>

        {/* Scoring Standards Panel */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-slate-200 text-xs sm:text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Deterministic Risk Calculation Standard
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Score range: 1 to 25 (`Likelihood [1-5] × Impact [1-5]`). Risk severity dictates automated compliance task priority and audit testing frequencies.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                <span className="font-bold text-emerald-400 block text-xs sm:text-sm">Low (1-4)</span>
                <span className="text-[10px] text-slate-400">Routine monitoring</span>
              </div>
              <div className="p-3 rounded-xl bg-yellow-950/40 border border-yellow-800/50">
                <span className="font-bold text-yellow-400 block text-xs sm:text-sm">Medium (5-9)</span>
                <span className="text-[10px] text-slate-400">Quarterly review</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50">
                <span className="font-bold text-amber-400 block text-xs sm:text-sm">High (10-16)</span>
                <span className="text-[10px] text-slate-400">Active mitigation</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50">
                <span className="font-bold text-rose-400 block text-xs sm:text-sm">Critical (17-25)</span>
                <span className="text-[10px] text-slate-400">Immediate fix</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 gap-1">
            <span>Score History Log: <strong className="text-emerald-400">Append-Only Active</strong></span>
            <span>Tenant Isolation: <strong className="text-sky-400">organization_id Verified</strong></span>
          </div>
        </div>
      </div>

      {/* Risks Table Container */}
      <div className="glass-panel rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-xs sm:text-sm">
            Registered Risks ({filteredRisks.length})
          </h3>
        </div>

        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-xs text-slate-300 min-w-[650px]">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-bold">Title & Category</th>
                <th className="px-5 py-3.5 font-bold">Likelihood</th>
                <th className="px-5 py-3.5 font-bold">Impact</th>
                <th className="px-5 py-3.5 font-bold">Risk Score</th>
                <th className="px-5 py-3.5 font-bold">Severity</th>
                <th className="px-5 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRisks.map((risk) => {
                const label = getRiskSeverityLabel(risk.risk_score);
                let badgeStyle = 'bg-emerald-950 text-emerald-400 border-emerald-800';
                if (label === 'Medium') badgeStyle = 'bg-yellow-950 text-yellow-400 border-yellow-800';
                if (label === 'High') badgeStyle = 'bg-amber-950 text-amber-400 border-amber-800';
                if (label === 'Critical') badgeStyle = 'bg-rose-950 text-rose-400 border-rose-800';

                return (
                  <tr key={risk.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-100 max-w-[250px]">
                      <div className="font-bold text-slate-100 truncate">{risk.title}</div>
                      <div className="text-[10px] text-slate-400 capitalize truncate">{risk.category} • {risk.description}</div>
                    </td>
                    <td className="px-5 py-3.5">{risk.likelihood} / 5</td>
                    <td className="px-5 py-3.5">{risk.impact} / 5</td>
                    <td className="px-5 py-3.5 font-black text-slate-100 text-sm">{risk.risk_score}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border capitalize ${badgeStyle}`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 capitalize text-slate-300">{risk.status}</td>
                    <td className="px-5 py-3.5 text-slate-400">{risk.due_date || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg space-y-4 shadow-2xl my-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-100">Identify New Risk</h3>

            <form onSubmit={handleCreateRisk} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Risk Title</label>
                <input
                  type="text"
                  required
                  value={newRisk.title}
                  onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                  placeholder="e.g. Unencrypted Production Backups"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  required
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-sky-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={newRisk.category}
                    onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-slate-100"
                  >
                    <option value="security">Security</option>
                    <option value="compliance">Compliance</option>
                    <option value="operational">Operational</option>
                    <option value="financial">Financial</option>
                    <option value="third_party">Third Party</option>
                    <option value="privacy">Privacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Likelihood (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newRisk.likelihood}
                    onChange={(e) => setNewRisk({ ...newRisk, likelihood: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Impact (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({ ...newRisk, impact: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="p-3 bg-sky-950/40 border border-sky-800/40 rounded-xl text-sky-300 font-bold text-center">
                Calculated Score: <strong>{calculateRiskScore(newRisk.likelihood, newRisk.impact)}</strong> / 25
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-md"
                >
                  Create Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
