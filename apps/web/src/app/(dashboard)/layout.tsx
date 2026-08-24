'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Server,
  FileCheck2,
  SlidersHorizontal,
  KanbanSquare,
  FileText,
  Sparkles,
  LayoutDashboard,
  Building2,
  UserCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Risk Intelligence', href: '/risks', icon: ShieldAlert },
  { label: 'Assets & Vendors', href: '/assets', icon: Server },
  { label: 'Requirements / Frameworks', href: '/frameworks', icon: FileCheck2 },
  { label: 'Control Intelligence', href: '/controls', icon: SlidersHorizontal },
  { label: 'Compliance Board', href: '/compliance', icon: KanbanSquare },
  { label: 'Evidence & Audit', href: '/evidence', icon: FileText },
  { label: 'AI Mapping Studio', href: '/ai-mapping', icon: Sparkles },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-panel border-r border-slate-800 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-600/30">
              O
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-lg tracking-tight">OMNiGRC</h1>
              <span className="text-[10px] font-semibold tracking-wider text-sky-400 uppercase bg-sky-950/80 border border-sky-800/50 px-1.5 py-0.5 rounded">
                Initial Working Model
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tenant Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
              AG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Acme Global GRC Demo</p>
              <p className="text-[11px] text-slate-500 truncate">Alex Morgan (GRC Lead)</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 glass-panel px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Organization: <strong className="text-slate-200">Acme Global GRC Demo</strong></span>
            <span className="text-slate-700">|</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[11px]">
              RLS Isolation Active
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md text-xs text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Role: <strong className="text-slate-100">Owner / Admin</strong></span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
