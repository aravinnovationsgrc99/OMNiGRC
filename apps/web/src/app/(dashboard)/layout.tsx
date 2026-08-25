'use client';

import React, { useState } from 'react';
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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#070a12] text-slate-100">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-shrink-0 glass-panel border-r border-slate-800/80 flex-col justify-between z-20 transition-all duration-300 ${
          desktopCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Header / Logo */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-sky-500/25 ring-1 ring-white/20 animate-float flex-shrink-0">
                O
              </div>
              {!desktopCollapsed && (
                <div>
                  <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-200 to-indigo-300 text-lg tracking-tight">
                    OMNiGRC
                  </h1>
                  <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase bg-sky-950/90 border border-sky-800/60 px-2 py-0.5 rounded-full shadow-inner">
                    Initial Working Model
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setDesktopCollapsed(!desktopCollapsed)}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title={desktopCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {desktopCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={desktopCollapsed ? item.label : undefined}
                  className={`flex items-center space-x-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600/30 via-indigo-600/20 to-purple-600/10 text-sky-300 border border-sky-500/40 shadow-lg shadow-sky-950/50 glow-blue'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-sky-400 scale-110' : 'text-slate-400'}`} />
                  {!desktopCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Left Footer - User Profile (Anupam, GRC Admin) */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0">
              AN
            </div>
            {!desktopCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-slate-100 truncate">Anupam</p>
                <p className="text-[11px] font-semibold text-sky-400 truncate">GRC Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Slide-Over Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Drawer Sidebar (Phone openable/closable) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 z-50 glass-panel border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-md">
                O
              </div>
              <div>
                <h1 className="font-extrabold text-slate-100 text-base">OMNiGRC</h1>
                <span className="text-[9px] font-bold text-sky-400 uppercase bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                  Initial Working Model
                </span>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600/30 to-indigo-600/20 text-sky-300 border border-sky-500/40 glow-blue'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Bottom Left Footer - User Profile (Anupam, GRC Admin) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md">
              AN
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-100">Anupam</p>
              <p className="text-[11px] font-bold text-sky-400">GRC Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800/80 glass-panel px-4 sm:px-6 flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* 3 Horizontal Lines (Hamburger Menu) Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 hover:text-white shadow-md flex items-center justify-center space-x-1 active:scale-95 transition-transform"
              aria-label="Toggle Navigation Sidebar Menu"
            >
              <Menu className="w-6 h-6 text-sky-400" />
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Building2 className="w-4 h-4 text-sky-400 hidden sm:inline" />
              <span className="truncate max-w-[150px] sm:max-w-none">
                Org: <strong className="text-slate-200 font-extrabold">Acme Global</strong>
              </span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-bold shadow-inner">
                RLS Active
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 shadow-inner">
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Logged as: </span>
              <strong className="text-slate-100 font-extrabold text-[11px] sm:text-xs">Anupam (GRC Admin)</strong>
            </div>
          </div>
        </header>

        {/* Dynamic Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6 bg-[#070a12]">
          {children}
        </main>

        {/* Mobile Quick Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 glass-panel border-t border-slate-800/80 px-3 flex items-center justify-around z-30 shadow-2xl backdrop-blur-xl">
          <Link
            href="/"
            className={`flex flex-col items-center space-y-0.5 ${pathname === '/' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </Link>

          <Link
            href="/risks"
            className={`flex flex-col items-center space-y-0.5 ${pathname === '/risks' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px]">Risks</span>
          </Link>

          <Link
            href="/compliance"
            className={`flex flex-col items-center space-y-0.5 ${pathname === '/compliance' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
          >
            <KanbanSquare className="w-4 h-4" />
            <span className="text-[10px]">Compliance</span>
          </Link>

          <Link
            href="/ai-mapping"
            className={`flex flex-col items-center space-y-0.5 ${pathname === '/ai-mapping' ? 'text-sky-400 font-bold' : 'text-slate-400'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px]">AI Studio</span>
          </Link>

          {/* 3 Horizontal Lines Button for Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center space-y-0.5 text-slate-400 hover:text-sky-400"
          >
            <Menu className="w-4 h-4 text-sky-400" />
            <span className="text-[10px]">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
