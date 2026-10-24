import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';

export const Timeline: React.FC = () => {
  const { experience } = portfolioData;
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-1': true, // Keep the first position expanded by default
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-3"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Chronological Track Record</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.08 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
        >
          Experience & Leadership
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.14 }}
          className="text-base text-zinc-400 leading-relaxed font-normal"
        >
          Hands-on engineering experience across full-stack applications, interactive reporting dashboards, and database-driven software systems.
        </motion.p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.08] space-y-12">
        {experience.map((item, index) => {
          const isExpanded = !!expandedIds[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 24, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Bead */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#121217] border-2 border-violet-500 shadow-md shadow-violet-500/50 group-hover:scale-125 transition-transform" />

              {/* Main Card */}
              <div className="rounded-2xl bg-[#121217] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 p-6 sm:p-7 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-violet-400 font-medium">
                      <span>{item.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-violet-400" />
                      {item.period}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.summary}
                </p>

                {/* Expandable Achievements Toggle */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center gap-2 text-xs font-mono text-violet-400 hover:text-violet-300 py-1 transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Hide Key Impact & Achievements' : `View ${item.achievements.length} Key Achievements`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-3 border-t border-white/[0.06] space-y-2.5">
                        {item.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tech Pills */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-900/90 text-[11px] font-mono text-zinc-400 border border-white/[0.04]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
