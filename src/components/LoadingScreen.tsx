import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);

  const statuses = [
    'Initializing portfolio runtime...',
    'Loading 3D vector geometries...',
    'Compiling project telemetry...',
    'System ready.',
  ];

  useEffect(() => {
    // Smooth progress counter increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate slightly near the end
        const increment = prev < 70 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 12) + 8;
        const next = Math.min(prev + increment, 100);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 25 && statusIndex === 0) setStatusIndex(1);
    else if (progress > 65 && statusIndex === 1) setStatusIndex(2);
    else if (progress >= 100 && statusIndex === 2) setStatusIndex(3);

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, statusIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -16,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-zinc-100 select-none overflow-hidden px-4"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Avatar with Animated Pulsing Ring */}
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-violet-600 via-purple-500 to-emerald-400 shadow-2xl shadow-violet-600/30"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-[#09090b]">
              <img
                src="/profile.png"
                alt="Alexhzier C. Asdain"
                className="w-full h-full object-cover object-top filter brightness-[1.05]"
              />
            </div>
          </motion.div>

          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#09090b] shadow-md flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>
        </div>

        {/* Name & Identity Monogram */}
        <div className="space-y-1 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
            {portfolioData.personal.name}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Stack Engineer &amp; Web Developer</span>
          </div>
        </div>

        {/* Progress Bar & Telemetry Status */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Terminal className="w-3 h-3 text-violet-400" />
              <span>{statuses[statusIndex]}</span>
            </span>
            <span className="font-semibold text-zinc-200">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/[0.06] p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
