import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Zap, Cpu, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { Project } from '../content/portfolio-data';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#121217] border border-white/[0.12] p-6 sm:p-8 shadow-2xl overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.08] text-[11px] font-mono text-zinc-400">
                  {project.category}
                </span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono text-xs">
                  <Zap className="w-3.5 h-3.5 text-violet-400" />
                  <span>{project.impactMetric}</span>
                </div>
                {project.isPrototype && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                    Hardware Prototype
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{project.title}</h3>
              <p className="text-sm text-zinc-400 font-normal mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Genuine Screenshot Banner (if available) */}
          {project.imageUrl && (
            <div className="mb-6 rounded-xl border border-white/[0.08] overflow-hidden bg-zinc-950 shadow-inner">
              <img
                src={project.imageUrl}
                alt={`${project.title} live interface preview`}
                className="w-full max-h-72 object-cover object-top"
              />
              <div className="p-2.5 bg-zinc-950/90 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Genuine Application Interface</span>
                <span className="text-emerald-400">Production / Source Verified</span>
              </div>
            </div>
          )}

          {/* Prototype Notice Banner (if applicable) */}
          {project.isPrototype && (
            <div className="mb-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-1">PROTOTYPE-LEVEL IMPLEMENTATION</strong>
                This project was engineered as a hardware capture workflow prototype utilizing the DigitalPersona U.are.U 4500 reader and DPUruNet SDK for enrollment tracking. Automated biometric 1:N or 1:1 matching verification was not implemented.
              </div>
            </div>
          )}

          {/* Architecture Deep Dive Breakdown */}
          <div className="space-y-5 text-sm mb-8">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400/90 font-semibold block mb-1.5">
                The Core Problem / Research Challenge
              </span>
              <p className="text-zinc-300 leading-relaxed">{project.details.problem}</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Technical Architecture & Implementation
              </span>
              <p className="text-zinc-300 leading-relaxed">{project.details.architecture}</p>
            </div>

            {/* Dataset Breakdown (for Thesis / Social Media Listening) */}
            {project.details.datasetBreakdown && (
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-semibold block mb-3">
                  Dataset Corpus Distribution (5,067 Manually Collected Posts)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                  {project.details.datasetBreakdown.map((item) => (
                    <div key={item.category} className="p-2.5 rounded-lg bg-zinc-900/80 border border-white/[0.04]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-zinc-300 font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-baseline justify-between text-[11px]">
                        <span className="text-white font-bold">{item.count.toLocaleString()} posts</span>
                        <span className="text-zinc-400">{item.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Contributions & Engineering Role */}
            {project.details.contributions && (
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2.5 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Key Personal Contributions & Implementation Scope
                </span>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {project.details.contributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Measurable Impact & Result
              </span>
              <p className="text-zinc-300 leading-relaxed">{project.details.result}</p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-zinc-500 block mb-2">Verified Technology Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.06] text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source on GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium shadow-md transition-colors"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
