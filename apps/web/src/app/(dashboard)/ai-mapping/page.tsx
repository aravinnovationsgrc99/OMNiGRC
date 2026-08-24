'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { AIMappingSuggestion, Control, FrameworkClause } from '@omnigrc/types';
import { Sparkles, Check, X, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

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
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-200 to-indigo-200 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-400 flex-shrink-0 animate-pulse" />
          AI Control Mapping Studio
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tiered LLM router (Gemini / Claude) with automated PII redaction and mandatory Human-in-the-Loop approval.
        </p>
      </div>

      {/* Control Selector & Run Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800/90 space-y-4 shadow-xl">
        <h3 className="font-bold text-slate-100 text-xs sm:text-sm">Execute AI Clause Mapping Request</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedControlId}
            onChange={(e) => setSelectedControlId(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
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
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-100" />
            <span>{isProcessing ? 'Processing AI Pipeline...' : 'Generate AI Suggestions'}</span>
          </button>
        </div>

        {/* Sanitization Inspector */}
        {lastRequest && (
          <div className="mt-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs space-y-1.5 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-slate-400 font-bold text-[11px] gap-1">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Eye className="w-4 h-4" /> Redaction Inspector (Data Minimization Verified)
              </span>
              <span>Provider: <strong className="text-amber-400 uppercase">{lastRequest.provider}</strong> ({lastRequest.model_tier})</span>
            </div>
            <pre className="text-[10px] sm:text-[11px] text-slate-300 font-mono bg-slate-950 p-2.5 rounded-lg overflow-x-auto border border-slate-800">
              {lastRequest.sanitized_prompt}
            </pre>
          </div>
        )}
      </div>

      {/* Suggestions Review Feed */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-100 text-xs sm:text-sm">Pending AI Advisory Suggestions ({suggestions.length})</h3>

        {suggestions.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl border border-slate-800/90 text-center text-xs text-slate-400 space-y-2 shadow-xl">
            <ShieldCheck className="w-10 h-10 mx-auto text-emerald-400" />
            <p className="font-bold text-slate-200 text-sm">No pending AI mapping suggestions awaiting review.</p>
            <p>Select a control above to trigger advisory clause recommendations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((sug) => {
              const targetCtrl = controls.find((c) => c.id === sug.control_id);
              const targetClause = clauses.find((c) => c.id === sug.framework_clause_id);

              return (
                <div key={sug.id} className="glass-panel p-5 rounded-2xl border border-slate-800/90 space-y-4 card-3d shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Target Control:</span>
                      <h4 className="font-extrabold text-slate-100 text-xs sm:text-sm">
                        {targetCtrl?.control_code} - {targetCtrl?.name}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800/60 shadow-inner">
                        Confidence: {(sug.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Proposed Mapping */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <span className="font-black text-indigo-400 text-xs sm:text-sm">{targetClause?.clause_identifier}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:inline" />
                    <span className="text-slate-200 font-bold">{targetClause?.title}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">AI Reasoning:</strong> {sug.reasoning}
                  </p>

                  {/* Human Review Decision Buttons */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-end space-x-3">
                    <button
                      onClick={() => handleReview(sug.id, 'rejected')}
                      className="px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-bold flex items-center space-x-1 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => handleReview(sug.id, 'approved')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
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
