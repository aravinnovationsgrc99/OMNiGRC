'use client';

import React from 'react';
import PilotForm from '@/components/marketing/PilotForm';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Clock,
  UserCheck,
  XCircle,
} from 'lucide-react';

export default function PilotProgramPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>6-Week Proof-of-Concept Program</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight max-w-4xl mx-auto">
          Join the OMNiGRC Free Pilot Program
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Test OMNiGRC in your organization for 6 weeks with zero credit card required. Experience advisory AI control mapping, native integrations, and dedicated regional data residency.
        </p>
      </section>

      {/* Main Form + Scope Breakdown Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Pilot Signup Form (7 Columns) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">
                Pilot Application Form
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Priority given to organizations in India (DPDP Act) and the UK (UK GDPR).
              </p>
            </div>

            <PilotForm />
          </div>

          {/* Right Column: What's Included vs Post-POC Scope (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Included in 6-Week Pilot */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 space-y-4 bg-emerald-950/10">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>What's Included in Your 6-Week POC</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>3 to 5 Named User Seats</strong> for your security & GRC team.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>1 Primary Compliance Framework</strong> (ISO 27001, SOC 2, or DPDP).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Advisory AI Mapping Studio</strong> with mandatory Stage 7 analyst review.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Native Integrations</strong> (Jira, Slack, Google Workspace).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Dedicated Onboarding Engineer</strong> & 24h setup window.</span>
                </li>
              </ul>
            </div>

            {/* Post-POC Scope */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm">
                <Clock className="w-5 h-5" />
                <span>Post-POC Scale Capabilities (Paid Tier)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Full 4-Framework Simultaneous Crosswalk Library</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Enterprise Okta / Azure AD SAML Single Sign-On (SSO)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>GraphQL API & Custom Auditor Export Workflows</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>•</span>
                  <span>Custom VPC Sovereign Pod Deployments (EU & Australia)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
