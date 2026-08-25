'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { Framework, FrameworkClause } from '@omnigrc/types';
import { FileCheck2, Search, BookOpen } from 'lucide-react';

export default function FrameworksPage() {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [clauses, setClauses] = useState<FrameworkClause[]>([]);
  const [selectedFw, setSelectedFw] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const fwList = await fetchApi<Framework[]>('/frameworks');
        setFrameworks(fwList);
        if (fwList.length > 0) setSelectedFw(fwList[0].id);

        const clauseList = await fetchApi<FrameworkClause[]>('/frameworks/clauses');
        setClauses(clauseList);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const filteredClauses = clauses.filter((c) => {
    const matchesFw = !selectedFw || c.framework_id === selectedFw;
    const matchesSearch =
      !search ||
      c.clause_identifier.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesFw && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-indigo-400" />
          Supported Compliance Frameworks & Clause Catalog
        </h2>
        <p className="text-sm text-slate-400">Extensible framework model supporting multi-framework mapping without hardcoding columns into controls.</p>
      </div>

      {/* Framework Selector Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedFw(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            selectedFw === null ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
          }`}
        >
          All Frameworks ({clauses.length})
        </button>

        {frameworks.map((fw) => {
          const count = clauses.filter((c) => c.framework_id === fw.id).length;
          const isSelected = selectedFw === fw.id;

          return (
            <button
              key={fw.id}
              onClick={() => setSelectedFw(fw.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSelected ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
              }`}
            >
              {fw.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
        <input
          type="text"
          placeholder="Search framework clauses by identifier, title, or requirement text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Clauses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClauses.map((clause) => {
          const parentFw = frameworks.find((f) => f.id === clause.framework_id);

          return (
            <div key={clause.id} className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-indigo-400 text-xs px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">
                    {clause.clause_identifier}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{parentFw?.name}</span>
                </div>
                <h4 className="font-semibold text-slate-100 text-sm">{clause.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{clause.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Category: {clause.category || 'General'}</span>
                <span className="text-emerald-400">Extensible Model</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
