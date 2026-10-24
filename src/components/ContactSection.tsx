import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight, Copy, Check, MessageSquare, Phone } from 'lucide-react';
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

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Engagement Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Channel</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Initiate a Dialogue
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed font-normal">
            Whether you need a Principal Architect to audit mission-critical frontend infrastructure, build a hardware-accelerated spatial canvas, or advise your product leadership team—let’s talk.
          </p>

          <div className="p-5 rounded-2xl bg-[#121217] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>DIRECT INBOX</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Response SLA: &lt; 24h
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06]">
              <span className="font-mono text-sm text-zinc-200 select-all truncate">
                {personal.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="shrink-0 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Copy email"
              >
                {emailCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
              <span>DIRECT PHONE LINE (PH)</span>
              <span className="text-violet-400 font-mono text-[11px]">Voice / SMS</span>
            </div>

            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06]">
              <a
                href={`tel:${personal.phoneRaw}`}
                className="font-mono text-sm text-zinc-200 hover:text-violet-300 transition-colors flex items-center gap-2 truncate"
                title="Call phone number"
              >
                <Phone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>{personal.phone}</span>
              </a>
              <button
                onClick={handleCopyPhone}
                className="shrink-0 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Copy phone number"
              >
                {phoneCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-mono uppercase text-zinc-500 block mb-3">Network & Field Notes</span>
            <div className="grid grid-cols-2 gap-3">
              {personal.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#121217] border border-white/[0.08] hover:border-violet-500/40 text-xs text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SocialLogo platform={link.platform} className="w-4 h-4 shrink-0 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium truncate">{link.platform}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inline Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#121217] border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
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
