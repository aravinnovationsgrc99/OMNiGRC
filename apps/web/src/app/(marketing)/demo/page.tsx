'use client';

import React from 'react';
import DemoForm from '@/components/marketing/DemoForm';
import { Calendar, ShieldCheck, Clock, UserCheck, MessageSquare } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <Calendar className="w-3.5 h-3.5" />
          <span>Interactive 20-Minute Product Walkthrough</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight max-w-3xl mx-auto">
          See OMNiGRC Live in Action
        </h1>

        <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
          Schedule a personalized 20-minute session with a compliance architect. We will demonstrate live control mapping, risk heatmaps, and regional data residency pods.
        </p>
      </section>

      {/* Main Grid: Demo Form + Direct Contact */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Demo Form (7 Cols) */}
          <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl space-y-4">
            <h2 className="text-xl font-extrabold text-slate-100">
              Request Your Demo Session
            </h2>
            <DemoForm />
          </div>

          {/* Direct Talk to Human (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
                <MessageSquare className="w-5 h-5" />
                <span>Prefer Direct Email?</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Skip the form and email our GRC engineering team directly. We answer technical architecture questions within 1 business day.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200">
                pilot@omnigrc.com
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider text-teal-400">
                What We Cover in 20 Mins
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-teal-400">•</span>
                  <span>Live Risk Register & Auto-Scoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-teal-400">•</span>
                  <span>8-Stage Advisory AI Pipeline Demo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-teal-400">•</span>
                  <span>Crosswalk: ISO 27001 ↔ SOC 2 ↔ DPDP</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-teal-400">•</span>
                  <span>India & UK Regional Pod Isolation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
