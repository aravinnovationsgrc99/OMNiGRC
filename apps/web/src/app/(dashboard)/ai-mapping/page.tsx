'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { AIMappingSuggestion, Control, FrameworkClause } from '@omnigrc/types';
import { Sparkles, Check, X, ShieldAlert, SlidersHorizontal, ArrowRight, Eye } from 'lucide-react';

export default function AIMappingStudioPage() {
  const [controls, setControls] = useState<Control[]>([]);
  const [clauses, setClauses] = useState<FrameworkClause[]>([]);
  const [suggestions, setSuggestions] = useState<AIMappingSuggestion[]>([]);
  const [selectedControlId, setSelectedControlId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastRequest, setLastRequest] = useState<any>(null);

  const loadData = async () => {
    try {
      const [cData, clData, sData] = await Promise.all([
        fetchApi<Control[]>('/controls'),
        fetchApi<FrameworkClause[]>('/frameworks/clauses'),
        fetchApi<AIMappingSuggestion[]>('/ai/mapping/suggestions'),
      ]);
      setControls(cData);
      setClauses(clData);
      setSuggestions(sData);
      if (cData.length > 0) setSelectedControlId(cData[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRunAI = async () => {
    if (!selectedControlId) return;
    setIsProcessing(true);
    try {
      const res = await fetchApi('/ai/mapping/request', {
        method: 'POST',
        body: JSON.stringify({ control_id: selectedControlId }),
      });
      setLastRequest(res.request);
      loadData();
    } catch (err: any) {
      alert(`AI Request failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReview = async (suggestionId: string, decision: 'approved' | 'overridden' | 'rejected', overrideClauseId?: string) => {
    try {
      await fetchApi(`/ai/mapping/suggestions/${suggestionId}/review`, {
        method: 'POST',
        body: JSON.stringify({
          decision,
          override_clause_id: overrideClauseId,
          comments: `Human analyst review decision: ${decision}`,
        }),
      });
      loadData();
    } catch (err: any) {
      alert(`Review failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          AI Control Mapping Advisory Studio
        </h2>
        <p className="text-sm text-slate-400">Tiered LLM router (Gemini / Claude) with automated PII redaction and mandatory Human-in-the-Loop approval.</p>
      </div>

      {/* Control Selector & Run Bar */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="font-semibold text-slate-100 text-sm">Execute AI Clause Mapping Request</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedControlId}
            onChange={(e) => setSelectedControlId(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
          >
            {controls.map((c) => (
              <option key={c.id} value={c.id}>
                {c.control_code} - {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleRunAI}
            disabled={isProcessing}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{isProcessing ? 'Processing AI Pipeline...' : 'Generate Advisory Suggestions'}</span>
          </button>
        </div>

        {/* Sanitization Inspector */}
        {lastRequest && (
          <div className="mt-3 p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-sky-400">
                <Eye className="w-3.5 h-3.5" /> Redaction Inspector (Data Minimization Verified)
              </span>
              <span>Provider: <strong className="text-amber-400 uppercase">{lastRequest.provider}</strong> ({lastRequest.model_tier})</span>
            </div>
            <pre className="text-[11px] text-slate-300 font-mono bg-slate-950 p-2 rounded overflow-x-auto">
              {lastRequest.sanitized_prompt}
            </pre>
          </div>
        )}
      </div>

      {/* Suggestions Review Feed */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-100 text-sm">Pending AI Advisory Suggestions ({suggestions.length})</h3>

        {suggestions.length === 0 ? (
          <div className="glass-panel p-8 rounded-xl border border-slate-800 text-center text-xs text-slate-400 space-y-2">
            <Check className="w-8 h-8 mx-auto text-emerald-400" />
            <p className="font-medium text-slate-200">No pending AI mapping suggestions awaiting review.</p>
            <p>Select a control above to trigger advisory clause recommendations.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((sug) => {
              const targetCtrl = controls.find((c) => c.id === sug.control_id);
              const targetClause = clauses.find((c) => c.id === sug.framework_clause_id);

              return (
                <div key={sug.id} className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium">Control Target:</span>
                      <h4 className="font-bold text-slate-100 text-sm">
                        {targetCtrl?.control_code} - {targetCtrl?.name}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-950/80 text-amber-400 border border-amber-800/50">
                        Confidence: {(sug.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Proposed Mapping */}
                  <div className="flex items-center space-x-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                    <span className="font-bold text-indigo-400">{targetClause?.clause_identifier}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-200 font-semibold">{targetClause?.title}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-slate-300">AI Reasoning:</strong> {sug.reasoning}</p>

                  {/* Human Review Decision Buttons */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-end space-x-3">
                    <button
                      onClick={() => handleReview(sug.id, 'rejected')}
                      className="px-3 py-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 text-xs font-semibold flex items-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => handleReview(sug.id, 'approved')}
                      className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Map Clause</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
