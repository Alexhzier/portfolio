import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, Cpu, Globe } from 'lucide-react';
import { portfolioData, Project } from '../content/portfolio-data';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const BentoGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'prototypes'>('all');

  const { projects } = portfolioData;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'flagship') return !p.isPrototype;
    if (activeFilter === 'prototypes') return p.isPrototype;
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projects.length, icon: Layers },
    { id: 'flagship', label: 'Web & AI Applications', count: projects.filter(p => !p.isPrototype).length, icon: Globe },
    { id: 'prototypes', label: 'Hardware Prototypes', count: projects.filter(p => p.isPrototype).length, icon: Cpu },
  ] as const;

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] radial-glow-ambient pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Selected Work</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Featured Projects &amp; Architectures
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.14 }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal"
        >
          Production web applications, academic deep learning research, and hardware capture systems built with strict attention to performance and craft.
        </motion.p>
      </div>

      {/* Smooth Filter Tabs with Animated Indicator */}
      <div className="relative z-10 flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.06]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectFilterTab"
                  className="absolute inset-0 rounded-xl bg-violet-600/30 border border-violet-500/50 shadow-md shadow-violet-600/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10 text-violet-400" />
              <span className="relative z-10">{tab.label}</span>
              <span className="relative z-10 px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] text-zinc-300">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className={project.colSpan === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1'}
            >
              <ProjectCard
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Architecture Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
