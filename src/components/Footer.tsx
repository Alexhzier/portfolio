import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';
import { SocialLogo } from './Icons';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const tz = personal.timezone || 'Asia/Manila';
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        const tzLabel = tz === 'Asia/Manila' ? 'PHT' : 'UTC';
        setTimeString(`${formatted} ${tzLabel}`);
      } catch {
        setTimeString('12:00:00 PHT');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#09090b] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier: Identity, Timezone Telemetry, Quick Return */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-violet-400">
                {personal.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                {personal.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              {personal.role}. {personal.positioningStatement}
            </p>
          </div>

          {/* Local Timezone Clock & Engineering Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/[0.08] text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-zinc-400">{personal.location.split('&')[0].trim()}:</span>
              <span className="text-zinc-100 font-semibold">{timeString}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Tier: Architecture Specifications & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block mb-3 font-semibold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#hero" className="hover:text-violet-300 transition-colors">Overview</a></li>
              <li><a href="#projects" className="hover:text-violet-300 transition-colors">Selected Work</a></li>
              <li><a href="#metrics" className="hover:text-violet-300 transition-colors">Quantified Proof</a></li>
              <li><a href="#experience" className="hover:text-violet-300 transition-colors">Chronology</a></li>
              <li><a href="#contact" className="hover:text-violet-300 transition-colors">Direct Channel</a></li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block mb-3 font-semibold">
              CONNECT
            </span>
            <ul className="space-y-2 text-zinc-400">
              {personal.socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-violet-300 transition-colors group"
                  >
                    <SocialLogo platform={s.platform} className="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-400 transition-colors shrink-0" />
                    <span>{s.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block mb-3 font-semibold">
              SYSTEM STANDARDS
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>WCAG 2.2 AAA Contrast</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Zero Horizontal Overflow</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Prefers-Reduced-Motion Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span>Deterministic React 19 State</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block mb-3 font-semibold">
              SECURITY & PRIVACY
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              No tracking cookies, no cross-site pixels, and zero telemetry collection. Hosted on high-performance edge nodes with 100% cryptographic HTTPS enforcement.
            </p>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Colophon */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Engineered with React 19, TypeScript, Tailwind &amp; Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
