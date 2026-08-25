'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Globe,
  HelpCircle,
  Zap,
} from 'lucide-react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'pilot';

  const [signupData, setSignupData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored =
        type === 'pilot'
          ? sessionStorage.getItem('omnigrc_pilot_signup')
          : sessionStorage.getItem('omnigrc_demo_request');
      if (stored) {
        try {
          setSignupData(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [type]);

  const isPilot = type === 'pilot';

  return (
    <div className="space-y-12 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Confirmation Hero Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 text-center space-y-6 bg-gradient-to-b from-emerald-950/30 via-slate-950 to-slate-950 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto glow-emerald">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            {isPilot ? 'Pilot Application Confirmed' : 'Demo Request Received'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
            {isPilot
              ? `Thank you for applying, ${signupData?.fullName || 'there'}!`
              : `Demo Request Confirmed, ${signupData?.fullName || 'there'}!`}
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            {isPilot
              ? `We are configuring a dedicated 6-week pilot tenant for ${signupData?.orgName || 'your organization'} in our ${signupData?.country || 'selected'} data residency pod.`
              : `Our GRC engineering team will reach out to ${signupData?.email || 'your email'} within 24 hours to confirm your 20-minute live demonstration.`}
          </p>
        </div>

        {/* Timeline Next Steps */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5" /> What to expect next in 24 hours:
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 font-bold border border-sky-800 flex items-center justify-center flex-shrink-0 text-[10px]">
                1
              </span>
              <span>
                <strong>Dedicated Engineer Assignment:</strong> You will receive a direct email from your assigned GRC Onboarding Engineer.
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 font-bold border border-sky-800 flex items-center justify-center flex-shrink-0 text-[10px]">
                2
              </span>
              <span>
                <strong>Tenant Provisioning:</strong> We deploy your tenant schema under PostgreSQL Row-Level Security (RLS) in your chosen sovereign region.
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-sky-950 text-sky-400 font-bold border border-sky-800 flex items-center justify-center flex-shrink-0 text-[10px]">
                3
              </span>
              <span>
                <strong>Pre-Seeded Controls:</strong> Your primary framework (ISO 27001, SOC 2, or DPDP) will be pre-loaded and ready for initial asset linking.
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Launch Live Interactive App Demo</span>
          </Link>
          <Link
            href="/frameworks"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs text-center"
          >
            Browse Framework Explainers
          </Link>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion/Grid */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <span>Frequently Asked Questions While You Wait</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-200">Is data kept in India or UK during the pilot?</h4>
            <p className="text-slate-400 leading-relaxed">
              Yes! If you selected India, your pilot environment is hosted in AWS India (Mumbai). If UK, AWS London.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-200">Do we need to enter a credit card?</h4>
            <p className="text-slate-400 leading-relaxed">
              No. The 6-week pilot is 100% free with zero payment method required.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-200">What if we operate outside India & UK?</h4>
            <p className="text-slate-400 leading-relaxed">
              Orgs in EU or Australia can test on our live UK pod prior to Q1 2027 sovereign EU/AU pod launches.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-200">Can our auditor join the pilot?</h4>
            <p className="text-slate-400 leading-relaxed">
              Yes, you can invite external auditors as read-only reviewers during the 6-week trial window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-slate-400 text-sm">
        Loading confirmation...
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
