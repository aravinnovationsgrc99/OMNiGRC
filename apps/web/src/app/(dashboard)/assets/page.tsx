'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { Asset, Vendor, DataFlow } from '@omnigrc/types';
import { Server, Building2, Network, Plus } from 'lucide-react';

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState<'assets' | 'vendors' | 'flows'>('assets');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [flows, setFlows] = useState<DataFlow[]>([]);

  const loadData = async () => {
    try {
      const [aData, vData, fData] = await Promise.all([
        fetchApi<Asset[]>('/assets').catch(() => []),
        fetchApi<Vendor[]>('/vendors').catch(() => []),
        fetchApi<DataFlow[]>('/data-flows').catch(() => []),
      ]);
      setAssets(aData);
      setVendors(vData);
      setFlows(fData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
          <Server className="w-6 h-6 text-sky-400" />
          Asset & Vendor Inventory Management
        </h2>
        <p className="text-sm text-slate-400">Track critical infrastructure, SaaS vendor dependencies, and cross-border data flows.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('assets')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'assets' ? 'border-sky-500 text-sky-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Assets Inventory ({assets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vendors')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'vendors' ? 'border-sky-500 text-sky-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Vendor Directory ({vendors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flows')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'flows' ? 'border-sky-500 text-sky-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Data Flow Maps ({flows.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'assets' && (
        <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Asset Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Criticality</th>
                <th className="px-5 py-3 font-semibold">Environment</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-900/40">
                  <td className="px-5 py-3 font-medium text-slate-100">
                    <div className="font-semibold">{asset.name}</div>
                    <div className="text-[11px] text-slate-500">{asset.description}</div>
                  </td>
                  <td className="px-5 py-3 capitalize">{asset.type}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      asset.criticality === 'critical' ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-sky-950 text-sky-400 border-sky-800'
                    }`}>
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="px-5 py-3 capitalize">{asset.environment}</td>
                  <td className="px-5 py-3 capitalize">{asset.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Vendor Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-900/40">
                  <td className="px-5 py-3 font-semibold text-slate-100">{vendor.name}</td>
                  <td className="px-5 py-3 capitalize">{vendor.type}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 capitalize">
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{vendor.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'flows' && (
        <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Source</th>
                <th className="px-5 py-3 font-semibold">Destination</th>
                <th className="px-5 py-3 font-semibold">Data Category</th>
                <th className="px-5 py-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {flows.map((flow) => (
                <tr key={flow.id} className="hover:bg-slate-900/40">
                  <td className="px-5 py-3 font-semibold text-slate-100">{flow.source}</td>
                  <td className="px-5 py-3 text-sky-400">{flow.destination}</td>
                  <td className="px-5 py-3">{flow.data_category}</td>
                  <td className="px-5 py-3 text-slate-400">{flow.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
