'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DemoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    interest: 'See 20-minute live demo',
    timeSlot: 'Tomorrow 2:00 PM IST / 9:30 AM BST',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid work email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('omnigrc_demo_request', JSON.stringify(formData));
    }

    setTimeout(() => {
      setSubmitting(false);
      router.push('/thank-you?type=demo');
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
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

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Work Email *
        </label>
        <input
          type="email"
          required
          placeholder="anupam@yourcompany.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
            errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
          } text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
        />
        {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Company Name *
        </label>
        <input
          type="text"
          required
          placeholder="Acme Global Inc."
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
            errors.company ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
          } text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
        />
        {errors.company && <p className="text-[11px] text-rose-400 mt-1">{errors.company}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          What would you like to discuss?
        </label>
        <select
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
        >
          <option value="See 20-minute live demo">See 20-minute live platform demo</option>
          <option value="Join pilot program">Join 6-week free pilot program</option>
          <option value="Discuss custom regional data pod">Discuss custom India / UK data pod hosting</option>
          <option value="Ask technical questions">Technical security & API question</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Preferred Time Slot
        </label>
        <select
          value={formData.timeSlot}
          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
        >
          <option value="Tomorrow 2:00 PM IST / 9:30 AM BST">Tomorrow 2:00 PM IST / 9:30 AM BST</option>
          <option value="Tomorrow 6:00 PM IST / 1:30 PM BST">Tomorrow 6:00 PM IST / 1:30 PM BST</option>
          <option value="Day after 3:30 PM IST / 11:00 AM BST">Day after 3:30 PM IST / 11:00 AM BST</option>
          <option value="Send Calendly link to email">Send me a Calendly link to pick my time</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {submitting ? (
          <span>Scheduling Demo...</span>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Confirm Demo Request</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
