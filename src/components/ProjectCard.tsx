import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Info, Play, Pause, Cpu, Eye, Radio } from 'lucide-react';
import { Project } from '../content/portfolio-data';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Interactive state for AI Study Tracker widget
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(45 * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 45 * 60));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Interactive state for Penbrae Stall switcher
  const [activeStall, setActiveStall] = useState<'tea' | 'spice' | 'chilli'>('tea');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isWide = project.colSpan === 'wide';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      className={`group relative rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-8 ${
        isWide ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
    >
      {/* Spotlight Cursor Follow Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), transparent 75%)`,
        }}
      />

      {/* Card Header & Metrics */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-[11px] font-mono text-zinc-400">
              {project.category}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono text-xs">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-semibold">{project.impactMetric}</span>
            </div>
            {project.isPrototype && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                Prototype
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06] transition-colors"
                aria-label={`GitHub repo for ${project.title}`}
                title="View Source on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 hover:text-white border border-violet-500/30 text-xs font-mono transition-colors"
                aria-label={`Live website for ${project.title}`}
                title="Launch Live Project"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-violet-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-zinc-400 mb-3">{project.metricLabel}</p>
        <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Genuine Screenshot Preview (when available) */}
        {project.imageUrl && (
          <div
            onClick={() => onSelect(project)}
            className="mb-5 rounded-xl border border-white/[0.08] overflow-hidden bg-zinc-950/80 cursor-pointer relative group/img shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover/img:opacity-40 transition-opacity" />
            <img
              src={project.imageUrl}
              alt={`${project.title} genuine application screenshot`}
              className="w-full h-44 sm:h-52 object-cover object-top filter brightness-95 group-hover/img:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                <Eye className="w-3 h-3 text-violet-400" />
                Click to inspect full architecture spec
              </span>
            </div>
          </div>
        )}

        {/* Tactile Micro-Craft Visual Artifacts for Each Project */}
        <div className="mb-6 rounded-xl bg-zinc-950/70 border border-white/[0.06] p-4 overflow-hidden relative">
          {/* Project 1: Social Media Listening for Mental Health */}
          {project.id === 'social-media-listening' && (
            <div className="w-full flex flex-col justify-between font-mono text-[11px] space-y-3">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.06] pb-2">
                <span className="flex items-center gap-2 text-violet-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  SOCCSARGEN Dataset: 5,067 Manually Collected Posts
                </span>
                <span className="text-zinc-500 text-[10px]">Region XII • Highcharts</span>
              </div>

              {/* Multi-segment distribution bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                  <div className="h-full bg-amber-500 w-[30.96%]" title="Stress: 30.96%" />
                  <div className="h-full bg-rose-500 w-[18.69%]" title="Suicidal Behavior: 18.69%" />
                  <div className="h-full bg-purple-500 w-[17.64%]" title="Depression: 17.64%" />
                  <div className="h-full bg-blue-500 w-[15.53%]" title="Anxiety: 15.53%" />
                  <div className="h-full bg-emerald-500 w-[15.25%]" title="Addiction: 15.25%" />
                  <div className="h-full bg-zinc-600 w-[1.91%]" title="Other: 1.91%" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-[10px] text-zinc-400 pt-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Stress (31%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Suicidal (19%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>Depression (18%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Anxiety (16%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Addiction (15%)</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-zinc-600" />
                    <span>Other (2%)</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-zinc-500 pt-2 border-t border-white/[0.04]">
                <span>Sources: FB, X, TikTok, Threads</span>
                <span>Model: CNN-LSTM NLP Classifier</span>
              </div>
            </div>
          )}

          {/* Project 2: AI Study Tracker */}
          {project.id === 'ai-study-tracker' && (
            <div className="w-full flex flex-col justify-between font-mono text-[11px] space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  Synced Study Timer &amp; AI Planner Engine
                </span>
                <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Supabase RLS Active
                </span>
              </div>

              {/* Timer & Session State */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/90 border border-white/[0.06]">
                <div>
                  <span className="text-[10px] text-zinc-500 block">CURRENT SESSION</span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    {Math.floor(timerSeconds / 60)}:00
                  </span>
                  <span className="text-[10px] text-zinc-400 ml-2 font-sans">Distributed Systems</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{timerRunning ? 'Pause (Synced)' : 'Start Timer'}</span>
                </button>
              </div>

              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>Vercel AI SDK • Grounded Prompting</span>
                <span>Recharts Calendar Intensity</span>
              </div>
            </div>
          )}

          {/* Project 3: Penbrae & Co. */}
          {project.id === 'penbrae-and-co' && (
            <div className="w-full flex flex-col justify-between font-mono text-[11px] space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Single-Harvest Stall Provenance</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Paint: &lt; 50ms
                </span>
              </div>

              {/* Interactive Stall Selector */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveStall('tea')}
                  className={`p-1.5 rounded text-center transition-colors cursor-pointer ${
                    activeStall === 'tea'
                      ? 'bg-amber-900/40 border border-amber-500/40 text-amber-200'
                      : 'bg-zinc-900/60 border border-white/5 text-zinc-400'
                  }`}
                >
                  <span className="text-[9px] block text-zinc-500">STALL I</span>
                  <span className="text-[10px] font-semibold">Teas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStall('spice')}
                  className={`p-1.5 rounded text-center transition-colors cursor-pointer ${
                    activeStall === 'spice'
                      ? 'bg-orange-900/40 border border-orange-500/40 text-orange-200'
                      : 'bg-zinc-900/60 border border-white/5 text-zinc-400'
                  }`}
                >
                  <span className="text-[9px] block text-zinc-500">STALL II</span>
                  <span className="text-[10px] font-semibold">Spices</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStall('chilli')}
                  className={`p-1.5 rounded text-center transition-colors cursor-pointer ${
                    activeStall === 'chilli'
                      ? 'bg-rose-900/40 border border-rose-500/40 text-rose-200'
                      : 'bg-zinc-900/60 border border-white/5 text-zinc-400'
                  }`}
                >
                  <span className="text-[9px] block text-zinc-500">STALL III</span>
                  <span className="text-[10px] font-semibold">Chillies</span>
                </button>
              </div>

              <div className="text-[10px] text-zinc-400 bg-zinc-900/50 p-2 rounded border border-white/[0.04]">
                {activeStall === 'tea' && 'Lot 26-A: Upper Assam Tippy Orthodox • Lat 27.48°N, 95.01°E'}
                {activeStall === 'spice' && 'Lot 26-B: Lakadong Turmeric (7.8% Curcumin) • Jaintia Hills'}
                {activeStall === 'chilli' && 'Lot 26-C: Whole Alder-Smoked Naga King Chilli • Mon District'}
              </div>

              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>Zero-Bloat Vanilla JS</span>
                <span>Leaflet.js Cartography</span>
              </div>
            </div>
          )}

          {/* Project 4: Fingerprint Capture Prototype */}
          {project.id === 'fingerprint-prototype' && (
            <div className="w-full flex flex-col justify-between font-mono text-[11px] space-y-3">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                  Hardware Integration Prototype
                </span>
                <span className="text-amber-400 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Proof of Concept
                </span>
              </div>

              <div className="space-y-1.5 p-2.5 rounded-lg bg-zinc-900/80 border border-white/[0.06]">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500">HARDWARE READER:</span>
                  <span className="text-zinc-200">DigitalPersona U.are.U 4500</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500">SDK INTERFACE:</span>
                  <span className="text-emerald-400">DPUruNet Driver Connected</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-500">OPTICAL RESOLUTION:</span>
                  <span className="text-violet-300">500 DPI Raw FID Image Buffer</span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>React / Next.js Web Interface</span>
                <span>PostgreSQL Enrollment Logs</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Tech Stack Badges & Architecture Spec CTA */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-white/[0.06] text-[11px] font-mono text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md bg-zinc-900/60 text-[10px] font-mono text-zinc-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 hover:text-violet-300 font-medium py-1 px-2.5 rounded-lg hover:bg-violet-500/10 transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Inspect Architecture</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
