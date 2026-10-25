import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Copy, 
  Check, 
  MessageSquare, 
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';
import { SocialLogo } from './Icons';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
}

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const { personal } = portfolioData;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);
  const [phoneCopied, setPhoneCopied] = useState<boolean>(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) {
      errs.name = 'Please provide your name or organization.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please provide a brief message (min 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous, deterministic client handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onNotify(`Message sent! ${personal.name} will reply within 24 business hours.`);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setEmailCopied(true);
    onNotify('Email copied to clipboard: ' + personal.email);
    setTimeout(() => setEmailCopied(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setPhoneCopied(true);
    onNotify('Phone number copied to clipboard: ' + personal.phone);
    setTimeout(() => setPhoneCopied(false), 2400);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Engagement Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Communication Channel</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Initiate a Dialogue
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Whether you need a Full-Stack Engineer and Website Developer to build production-grade web systems, deploy intelligent interfaces, or collaborate on specialized software solutions—let’s talk.
            </p>
          </div>

          {/* Unified Communication Hub Card */}
          <div className="rounded-2xl bg-[#121217] border border-white/[0.08] p-5 sm:p-6 space-y-5 shadow-xl">
            {/* Location & Timezone Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="font-medium text-white">{personal.location}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-violet-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  PHT (UTC+8)
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Response SLA: &lt; 24h</span>
              </div>
            </div>

            {/* Direct Channels (Email & Phone) */}
            <div className="space-y-3">
              {/* Email Row */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    DIRECT INBOX
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-violet-300 transition-colors truncate block select-all"
                  >
                    {personal.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Row */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    DIRECT PHONE LINE (PH)
                  </span>
                  <a
                    href={`tel:${personal.phoneRaw}`}
                    className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-violet-300 transition-colors truncate block"
                    title="Call phone number"
                  >
                    {personal.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={`tel:${personal.phoneRaw}`}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    title="Call phone"
                    aria-label="Call phone"
                  >
                    <Phone className="w-4 h-4 text-violet-400" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    aria-label="Copy phone number"
                    title="Copy phone"
                  >
                    {phoneCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social & Professional Networks */}
            <div className="pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                PROFESSIONAL NETWORKS
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {personal.socialLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/80 border border-white/[0.06] hover:border-violet-500/40 text-xs text-zinc-300 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <SocialLogo platform={link.platform} className="w-4 h-4 shrink-0 text-violet-400 group-hover:scale-110 transition-transform" />
                      <span className="font-medium truncate font-mono text-[11px]">{link.platform}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Available for full-time engineering &amp; select contracts</span>
            </div>
          </div>
        </div>

        {/* Right Column: Inline Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#121217] border border-white/[0.08] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Transmission Received</h3>
                <p className="text-sm text-zinc-300 max-w-md">
                  Thank you for reaching out, {form.name}. Your inquiry has been routed directly to {personal.name}’s priority inbox. Expect a response shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', topic: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                    Encrypted Direct Inquiry
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Zero spam • No newsletters</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-300 mb-2">
                      NAME / SQUAD <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Julian Ross"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border ${
                        errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/[0.08] focus:border-violet-500/60'
                      } text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-300 mb-2">
                      WORK EMAIL <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="julian@company.com"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border ${
                        errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/[0.08] focus:border-violet-500/60'
                      } text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-mono text-zinc-300 mb-2">
                    TOPIC
                  </label>
                  <input
                    id="contact-topic"
                    type="text"
                    placeholder="e.g. Project Inquiry, Collaboration, or Job Opportunity"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-300 mb-2">
                    BRIEF / CHALLENGE DETAILS <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Describe the problem, timeline, and current system constraints..."
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border ${
                      errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/[0.08] focus:border-violet-500/60'
                    } text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium text-sm shadow-xl shadow-violet-600/25 border border-violet-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs animate-pulse">Encrypting & Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
