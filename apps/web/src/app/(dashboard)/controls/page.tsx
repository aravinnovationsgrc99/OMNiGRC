'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { Control, ControlFrameworkMapping, FrameworkClause } from '@omnigrc/types';
import { SlidersHorizontal, Plus, Link as LinkIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ControlsPage() {
  const [controls, setControls] = useState<Control[]>([]);
  const [mappings, setMappings] = useState<ControlFrameworkMapping[]>([]);
  const [clauses, setClauses] = useState<FrameworkClause[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [newCtrl, setNewCtrl] = useState({
    control_code: '',
    name: '',
    description: '',
    category: 'technical',
    testing_frequency: 'quarterly',
  });

  const loadData = async () => {
    try {
      const [cData, mData, clData] = await Promise.all([
        fetchApi<Control[]>('/controls'),
        fetchApi<ControlFrameworkMapping[]>('/controls/mappings'),
        fetchApi<FrameworkClause[]>('/frameworks/clauses'),
      ]);
      setControls(cData);
      setMappings(mData);
      setClauses(clData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateControl = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchApi('/controls', {
        method: 'POST',
        body: JSON.stringify(newCtrl),
      });
      setShowModal(false);
      setNewCtrl({
        control_code: '',
        name: '',
        description: '',
        category: 'technical',
        testing_frequency: 'quarterly',
      });
      loadData();
    } catch (err: any) {
      alert(`Error creating control: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-sky-400" />
            Control Catalog & Framework Mapping Matrix
          </h2>
          <p className="text-sm text-slate-400">Single control maps to multiple clauses across ISO 27001, SOC 2, GDPR, DPDP, and Essential 8.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-medium transition-all shadow-md shadow-sky-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Control</span>
        </button>
      </div>

      {/* Controls List */}
      <div className="space-y-4">
        {controls.map((control) => {
          const ctrlMappings = mappings.filter((m) => m.control_id === control.id);

          return (
            <div key={control.id} className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-sky-400 text-sm px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/40">
                    {control.control_code}
                  </span>
                  <h3 className="font-semibold text-slate-100 text-base">{control.name}</h3>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">{control.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 capitalize">
                    {control.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{control.description}</p>

              {/* Mapped Clauses Section */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  Mapped Framework Clauses ({ctrlMappings.length})
                </h4>

                {ctrlMappings.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {ctrlMappings.map((m) => {
                      const clause = clauses.find((c) => c.id === m.framework_clause_id);

                      return (
                        <div key={m.id} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center space-x-2">
                          <span className="font-bold text-indigo-400">{clause?.clause_identifier || 'Clause'}</span>
                          <span className="text-slate-300 truncate max-w-[200px]">{clause?.title}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold uppercase">({m.mapping_type})</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-500 flex items-center justify-between">
                    <span>No framework clauses currently mapped to this control.</span>
                    <Link href="/ai-mapping" className="text-sky-400 hover:underline flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Run AI Mapping Advisory
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Control Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Add New Control</h3>

            <form onSubmit={handleCreateControl} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Control Code</label>
                <input
                  type="text"
                  required
                  value={newCtrl.control_code}
                  onChange={(e) => setNewCtrl({ ...newCtrl, control_code: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                  placeholder="e.g. CTRL-004"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Control Name</label>
                <input
                  type="text"
                  required
                  value={newCtrl.name}
                  onChange={(e) => setNewCtrl({ ...newCtrl, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                  placeholder="e.g. Automated Vulnerability Scanning"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  required
                  value={newCtrl.description}
                  onChange={(e) => setNewCtrl({ ...newCtrl, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-md"
                >
                  Save Control
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
