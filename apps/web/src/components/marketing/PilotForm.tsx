'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Globe } from 'lucide-react';

export default function PilotForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    orgName: '',
    fullName: '',
    email: '',
    country: 'India',
    companySize: '50-500',
    primaryFramework: 'ISO 27001',
    teamSize: '5-15',
    challenge: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.orgName.trim()) errs.orgName = 'Organization name is required';
    if (!formData.fullName.trim()) errs.fullName = 'Your full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid work email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Save submission to sessionStorage for thank-you page personalization
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('omnigrc_pilot_signup', JSON.stringify(formData));
    }

    setTimeout(() => {
      setSubmitting(false);
      router.push('/thank-you?type=pilot');
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Org Name + Full Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Organization Name *
          </label>
          <input
            type="text"
            required
            placeholder="Acme FinTech Corp"
            value={formData.orgName}
            onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
              errors.orgName ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
            } text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
          />
          {errors.orgName && <p className="text-[11px] text-rose-400 mt-1">{errors.orgName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            required
            placeholder="Anupam Shrivastava"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
              errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
            } text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
          />
          {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
        </div>
      </div>

      {/* Work Email */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          Work Email *
        </label>
        <input
          type="email"
          required
          placeholder="anupam@acmefintech.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
            errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
          } text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
        />
        {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
      </div>

      {/* Country (Geo Target Priority) + Company Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Primary Country *</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Live Pods</span>
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            <option value="India">🇮🇳 India (DPDP Act Pod Live)</option>
            <option value="United Kingdom">🇬🇧 United Kingdom (UK GDPR Pod Live)</option>
            <option value="Europe">🇪🇺 Europe (EU Pod Q1 2027)</option>
            <option value="Australia">🇦🇺 Australia (Australia Pod Q1 2027)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Company Size *
          </label>
          <select
            value={formData.companySize}
            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            <option value="50-500">50 – 500 employees (Lean GRC Team)</option>
            <option value="500-2K">500 – 2,000 employees (Mid-Market)</option>
            <option value="2K+">2,000+ employees (Enterprise)</option>
          </select>
        </div>
      </div>

      {/* Primary Framework Priority + GRC Team Seats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Target Compliance Framework *
          </label>
          <select
            value={formData.primaryFramework}
            onChange={(e) => setFormData({ ...formData, primaryFramework: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            <option value="ISO 27001">ISO/IEC 27001:2022</option>
            <option value="SOC 2">SOC 2 Type II</option>
            <option value="DPDP">DPDP Act 2023 (India)</option>
            <option value="GDPR">GDPR / UK GDPR</option>
            <option value="Multiple">Multiple / All 4 Frameworks</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Expected GRC User Seats *
          </label>
          <select
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            <option value="1-5">3 – 5 users (Included in Free Pilot)</option>
            <option value="5-15">5 – 15 users</option>
            <option value="15-30">15 – 30 users</option>
            <option value="30+">30+ enterprise users</option>
          </select>
        </div>
      </div>

      {/* Biggest GRC Challenge */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          What is your biggest GRC or audit challenge? (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="E.g., We are preparing for ISO 27001 audit next quarter and need to map controls from existing spreadsheets..."
          value={formData.challenge}
          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {submitting ? (
          <span>Processing Pilot Application...</span>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Apply for 6-Week Free Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Zero credit card required • Dedicated onboarding engineer assigned within 24h</span>
      </p>
    </form>
  );
}
