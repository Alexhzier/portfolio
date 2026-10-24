import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu } from 'lucide-react';
import { portfolioData, Project } from '../content/portfolio-data';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const BentoGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { projects } = portfolioData;

  const flagshipProjects = projects.filter((p) => !p.isPrototype);
  const prototypeProjects = projects.filter((p) => p.isPrototype);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] radial-glow-ambient pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mb-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-4"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Flagship Technical Showcase</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.08 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Featured Projects &amp; Architectures
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.14 }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal"
        >
          Production web applications and academic deep learning research initiatives across regional NLP analysis, full-stack AI study productivity, and zero-bloat archival e-commerce architecture.
        </motion.p>
      </div>

      {/* Flagship Trio: Social Media Listening, AI Study Tracker, Penbrae & Co. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
        {flagshipProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Hardware & Systems Lab: Fingerprint Capture Prototype */}
      {prototypeProjects.length > 0 && (
        <div className="relative z-10 pt-12 border-t border-white/[0.08]">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-amber-400 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware &amp; Systems Lab</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Hardware Device Integration &amp; Prototypes
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal">
              Exploratory hardware driver investigations, biometric reader integration experiments, and proof-of-concept capture pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {prototypeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Architecture Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
