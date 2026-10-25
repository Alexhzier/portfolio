import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';
import { Floating3DCanvas } from './Floating3DCanvas';
import { TechLogo } from './Icons';

interface HeroProps {
  onCopyEmail: (email: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopyEmail }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const { personal, techCategories } = portfolioData;

  const handleCopy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    onCopyEmail(personal.email);
    setTimeout(() => setCopied(false), 2400);
  };

  const allSkills = techCategories.flatMap((c) =>
    c.skills.map((s) => ({ ...s, category: c.category }))
  );

  const displayedSkills =
    activeCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  const categories = ['All', ...techCategories.map((c) => c.category)];

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] pt-28 sm:pt-36 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-subtle w-full max-w-full"
    >
      {/* 3D Moving Objects Canvas behind text */}
      <Floating3DCanvas />

      {/* Editorial Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[480px] radial-glow-hero pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Profile Pill & Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-zinc-900/90 border border-white/[0.1] backdrop-blur-md shadow-xl shadow-black/50 mb-6 max-w-full group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-violet-500/40 bg-zinc-800 shrink-0">
            <img
              src="/profile.png"
              alt="Alexhzier C. Asdain"
              className="w-full h-full object-cover object-top filter brightness-[1.05]"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-zinc-950" />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-200">
            Alexhzier C. Asdain
          </span>
          <span className="text-zinc-600 font-mono">·</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Available for Roles</span>
            <span className="sm:hidden">Available</span>
          </span>
        </motion.div>

        {/* Name and Disciplines */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.15 }}
          className="space-y-3 mb-6 w-full max-w-full"
        >
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white break-words">
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {personal.role}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-violet-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Modern Web Applications · Applied Machine Learning · Hardware Prototypes</span>
          </div>
        </motion.div>

        {/* Punchy 1-line Positioning Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto tracking-tight mb-8 px-2"
        >
          {personal.positioningStatement}
        </motion.p>

        {/* Quick Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 w-full max-w-md px-4"
        >
          {/* Scroll to work */}
          <motion.a
            href="#projects"
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto sm:min-w-[170px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm shadow-xl shadow-violet-600/25 border border-violet-400/30 transition-all duration-150 cursor-pointer group"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Copy Email CTA with interactive feedback */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="w-full sm:w-auto sm:min-w-[170px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm border border-white/[0.08] hover:border-white/[0.16] backdrop-blur-md shadow-lg transition-all duration-150 cursor-pointer"
            aria-label="Copy contact email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-mono text-xs">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span className="font-mono text-xs truncate">{personal.email}</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Live Interactive Architecture Stack */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.3 }}
          className="w-full max-w-3xl pt-8 border-t border-white/[0.06] flex flex-col items-center px-2"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              Specialized Architecture Stack
            </span>

            {/* Filter Category Pills */}
            <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-white/[0.06] text-[11px] font-mono overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-violet-600/30 text-violet-200 border border-violet-500/40'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {cat === 'All' ? `All (${allSkills.length})` : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Badges Cloud with official SVG logos */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-full">
            {displayedSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121217] hover:bg-[#181820] border border-white/[0.08] hover:border-violet-500/40 text-xs text-zinc-300 hover:text-white transition-colors shadow-sm cursor-default"
              >
                <TechLogo name={skill.name} className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">{skill.name}</span>
                {skill.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 group-hover:text-violet-300 group-hover:bg-violet-500/10 border border-transparent group-hover:border-violet-500/20 transition-colors">
                    {skill.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
