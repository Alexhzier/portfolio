import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, Cpu } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';

export const MetricsCounter: React.FC = () => {
  const { metrics } = portfolioData;

  const icons = [
    <ShieldCheck key="shield" className="w-5 h-5 text-emerald-400" />,
    <Users key="users" className="w-5 h-5 text-violet-400" />,
    <Activity key="activity" className="w-5 h-5 text-purple-400" />,
    <Cpu key="cpu" className="w-5 h-5 text-indigo-400" />,
  ];

  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#121217] border border-white/[0.08] p-8 sm:p-12 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-emerald-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Empirical Production Proof</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Quantified Engineering Impact
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal">
            Verifiable telemetry metrics from scaled production deployments across consumer and developer platforms.
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 180, damping: 24, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-950/60 border border-white/[0.06] hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-violet-500/30 transition-colors">
                  {icons[idx % icons.length]}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1 font-mono group-hover:text-violet-200 transition-colors">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-2 tracking-tight">
                  {item.label}
                </div>
              </div>
              <div className="text-xs text-zinc-400 pt-3 border-t border-white/[0.06] leading-relaxed">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
