'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Globe, Lock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-t from-sky-950/20 via-indigo-950/10 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper Grid: Brand + Links + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-teal-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-base">
                  <Shield className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                OMNi<span className="text-sky-400">GRC</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Unified governance, risk, asset, and security-control management platform for lean GRC teams across India, UK, EU, and Australia. AI-assisted mapping with non-negotiable analyst verification.
            </p>

            {/* Regional Pod Badges */}
            <div className="pt-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Globe className="w-3 h-3 mr-1 text-sky-400" /> Live Data Residency Pods
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                  🇮🇳 India (DPDP Act)
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                  🇬🇧 UK (UK GDPR)
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/60 border border-slate-800/60 text-slate-400">
                  🇪🇺 EU (Q1 2027)
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/60 border border-slate-800/60 text-slate-400">
                  🇦🇺 Australia (Q1 2027)
                </span>
              </div>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Platform & Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-sky-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/for-enterprises" className="hover:text-sky-400 transition-colors">
                  For Enterprises
                </Link>
              </li>
              <li>
                <Link href="/why" className="hover:text-sky-400 transition-colors">
                  Why OMNiGRC
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sky-400 transition-colors">
                  Pricing & Tiers
                </Link>
              </li>
              <li>
                <Link href="/pilot" className="hover:text-sky-400 transition-colors text-teal-400 font-semibold">
                  6-Week Free Pilot
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-400 transition-colors text-amber-400 font-semibold">
                  Launch Interactive Demo App
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Frameworks */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Compliance Frameworks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/frameworks/iso-27001" className="hover:text-sky-400 transition-colors">
                  ISO/IEC 27001:2022
                </Link>
              </li>
              <li>
                <Link href="/frameworks/soc-2" className="hover:text-sky-400 transition-colors">
                  SOC 2 Type II
                </Link>
              </li>
              <li>
                <Link href="/frameworks/gdpr" className="hover:text-sky-400 transition-colors">
                  GDPR & UK GDPR
                </Link>
              </li>
              <li>
                <Link href="/frameworks/dpdp" className="hover:text-sky-400 transition-colors">
                  DPDP Act 2023 (India)
                </Link>
              </li>
              <li>
                <Link href="/frameworks" className="hover:text-sky-400 transition-colors text-sky-400 font-semibold">
                  View Framework Hub →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter & Security */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Compliance Insights
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Quarterly GRC enforcement trends, framework updates, and regional data mandates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="security@yourcompany.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Subscribed to compliance updates!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Lower Grid: Security Model + Copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center">
              <Lock className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
              Row-Level Tenant Isolation
            </span>
            <span>•</span>
            <span>Zero Data Retention with AI</span>
            <span>•</span>
            <span>Full Audit Trail</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/for-enterprises" className="hover:text-slate-200">
              Security Architecture
            </Link>
            <Link href="/why" className="hover:text-slate-200">
              Privacy & Data Pods
            </Link>
            <Link href="/demo" className="hover:text-slate-200">
              Request Audit Report
            </Link>
            <span className="text-slate-400">© 2026 OMNiGRC Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
