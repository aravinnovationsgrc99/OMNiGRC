'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Building2,
  FileCheck2,
  Lock,
  Layers,
  Zap,
  Globe2,
} from 'lucide-react';

const FRAMEWORKS = [
  { name: 'ISO/IEC 27001:2022', slug: 'iso-27001', desc: 'Information security management system controls & clauses' },
  { name: 'SOC 2 Type II', slug: 'soc-2', desc: 'Trust Services Criteria (Security, Availability, Confidentiality)' },
  { name: 'GDPR / UK GDPR', slug: 'gdpr', desc: 'EU & UK data protection, DPIAs, and data processing security' },
  { name: 'DPDP Act 2023 (India)', slug: 'dpdp', desc: 'Data Fiduciary compliance for Indian data residency' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frameworksDropdown, setFrameworksDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-teal-500 to-indigo-600 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-lg">
                <Shield className="w-5 h-5 text-sky-400 fill-sky-400/20" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200">
                  OMNi<span className="text-sky-400">GRC</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-800/60 rounded-full">
                  B2B Compliance
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 hidden md:block">Advisory AI • Analyst Verified</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            <Link
              href="/how-it-works"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/how-it-works'
                  ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              How It Works
            </Link>

            <Link
              href="/for-enterprises"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/for-enterprises'
                  ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              For Enterprises
            </Link>

            <Link
              href="/why"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/why'
                  ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Why OMNiGRC
            </Link>

            {/* Frameworks Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFrameworksDropdown(true)}
              onMouseLeave={() => setFrameworksDropdown(false)}
            >
              <button
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/frameworks')
                    ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Frameworks</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {frameworksDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900/95 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50">
                  <div className="p-2 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Supported Frameworks
                    </span>
                    <Link
                      href="/frameworks"
                      className="text-[11px] text-sky-400 hover:underline font-semibold"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="py-1 space-y-1">
                    {FRAMEWORKS.map((fw) => (
                      <Link
                        key={fw.slug}
                        href={`/frameworks/${fw.slug}`}
                        className="block p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors group"
                      >
                        <div className="text-xs font-bold text-slate-200 group-hover:text-sky-400 flex items-center justify-between">
                          <span>{fw.name}</span>
                          <span className="text-[9px] bg-sky-950 border border-sky-800 text-sky-300 px-1.5 py-0.5 rounded">
                            Native
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {fw.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/pricing'
                  ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/pilot"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/pilot'
                  ? 'text-sky-400 bg-sky-950/80 border border-sky-800/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Pilot Program
            </Link>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Live Platform Link */}
            <Link
              href="/dashboard"
              className="text-xs font-bold text-slate-300 hover:text-sky-400 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1.5 border border-slate-800 hover:border-sky-500/40 bg-slate-900/40"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch App</span>
            </Link>

            <Link
              href="/demo"
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
            >
              Request Demo
            </Link>

            <Link
              href="/pilot"
              className="relative inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-600/25 border border-white/20 transition-all transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Join Free Pilot</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/pilot"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white shadow"
            >
              Pilot
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-6 backdrop-blur-2xl space-y-4 shadow-2xl">
          <div className="space-y-1">
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              How It Works
            </Link>
            <Link
              href="/for-enterprises"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              For Enterprises
            </Link>
            <Link
              href="/why"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Why OMNiGRC
            </Link>
            <Link
              href="/frameworks"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Framework Explainers (ISO 27001, SOC 2, DPDP, GDPR)
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Pricing
            </Link>
            <Link
              href="/pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Pilot Program (6 Weeks Free)
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-sky-400 hover:bg-slate-900 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Launch Live App</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col space-y-2">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-200 bg-slate-900"
            >
              Request a 20-Min Demo
            </Link>
            <Link
              href="/pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-indigo-600 shadow-md"
            >
              Join 6-Week Free Pilot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
