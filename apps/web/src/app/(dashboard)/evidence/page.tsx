'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { Evidence, AuditLog } from '@omnigrc/types';
import { FileText, Download, ShieldCheck, History, Plus } from 'lucide-react';

export default function EvidenceAuditPage() {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [newEvidence, setNewEvidence] = useState({
    entity_type: 'control',
    entity_id: '60000000-0000-0000-0000-000000000001',
    file_name: '',
    mime_type: 'application/pdf',
    file_size: 1048576,
  });

  const loadData = async () => {
    try {
      const [eData, aData] = await Promise.all([
        fetchApi<Evidence[]>('/evidence').catch(() => []),
        fetchApi<AuditLog[]>('/audit-logs').catch(() => []),
      ]);
      setEvidenceList(eData);
      setAuditLogs(aData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDownload = async (id: string, name: string) => {
    try {
      const { signedUrl } = await fetchApi<{ signedUrl: string }>(`/evidence/${id}/download`);
      window.open(signedUrl || '#', '_blank');
    } catch (err: any) {
      alert(`Error fetching signed URL: ${err.message}`);
    }
  };

  const handleRegisterEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filePath = `00000000-0000-0000-0000-000000000001/${newEvidence.entity_type}/${newEvidence.entity_id}/${Date.now()}-${newEvidence.file_name}`;
      await fetchApi('/evidence', {
        method: 'POST',
        body: JSON.stringify({ ...newEvidence, file_path: filePath }),
      });
      setShowUploadModal(false);
      setNewEvidence({
        entity_type: 'control',
        entity_id: '60000000-0000-0000-0000-000000000001',
        file_name: '',
        mime_type: 'application/pdf',
        file_size: 1048576,
      });
      loadData();
    } catch (err: any) {
      alert(`Error storing evidence: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-400" />
            Evidence Vault & Append-Only Audit Logging
          </h2>
          <p className="text-sm text-slate-400">Private `omni-evidence` Supabase bucket with signed URL authorization and immutable activity trails.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-medium transition-all shadow-md shadow-sky-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Evidence Artifact</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Vault Table */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-slate-800 p-5 space-y-4">
          <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Private Storage Evidence Catalog ({evidenceList.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Document Name</th>
                  <th className="px-4 py-3 font-semibold">Entity Binding</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {evidenceList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-semibold text-slate-100">
                      <div>{item.file_name}</div>
                      <div className="text-[10px] text-slate-500">{item.mime_type}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-sky-400">
                      {item.entity_type} ({item.entity_id.substring(0, 8)}...)
                    </td>
                    <td className="px-4 py-3 text-slate-400">{(item.file_size / 1024).toFixed(1)} KB</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDownload(item.id, item.file_name)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                      >
                        <Download className="w-3 h-3 text-sky-400" />
                        <span>Signed Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Append-Only Audit Feed */}
        <div className="glass-panel rounded-xl border border-slate-800 p-5 space-y-4">
          <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            Append-Only Audit Trail
          </h3>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold text-sky-400 capitalize">{log.action}</span>
                  <span>{new Date(log.created_at).toLocaleTimeString()}</span>
                </div>
                <p className="text-slate-300 font-medium">{log.entity_type} ({log.entity_id.substring(0, 8)}...)</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Upload Evidence Metadata</h3>

            <form onSubmit={handleRegisterEvidence} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={newEvidence.file_name}
                  onChange={(e) => setNewEvidence({ ...newEvidence, file_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                  placeholder="e.g. Q3_Access_Review_Attestation.pdf"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Entity Type</label>
                <select
                  value={newEvidence.entity_type}
                  onChange={(e) => setNewEvidence({ ...newEvidence, entity_type: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                >
                  <option value="control">Control</option>
                  <option value="compliance_task">Compliance Task</option>
                  <option value="risk">Risk</option>
                  <option value="asset">Asset</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-md"
                >
                  Store Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
