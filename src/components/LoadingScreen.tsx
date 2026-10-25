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
    // Strictly 3.0 seconds total: 100 ticks incrementing exactly +1 every 30ms (zero skipped numbers)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 25 && progress < 55 && statusIndex !== 1) setStatusIndex(1);
    else if (progress >= 55 && progress < 100 && statusIndex !== 2) setStatusIndex(2);
    else if (progress >= 100 && statusIndex !== 3) setStatusIndex(3);

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, statusIndex, onComplete]);

  // Calculate vertical fill for 4 leaves (0-25%, 25-50%, 50-75%, 75-100%)
  const getLeafClipY = (index: number) => {
    const start = index * 25;
    const p = Math.max(0, Math.min(100, (progress - start) * 4));
    const h = (p / 100) * 32;
    return {
      y: 32 - h,
      height: h,
      pct: p,
    };
  };

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

      {/* SVG Gradient Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="leafGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Avatar with Animated Pulsing Ring */}
        <div className="relative mb-5">
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
        <div className="space-y-1 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
            {portfolioData.personal.name}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Stack Engineer &amp; Web Developer</span>
          </div>
        </div>

        {/* 4 Tea Leaves Botanical Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {[0, 1, 2, 3].map((idx) => {
            const leaf = getLeafClipY(idx);
            const clipId = `loading-leaf-clip-${idx}`;
            return (
              <div key={idx} className="relative flex flex-col items-center">
                <svg
                  viewBox="0 0 32 32"
                  className="w-8 h-8 transition-transform duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id={clipId}>
                      <rect x="0" y={leaf.y} width="32" height={leaf.height} />
                    </clipPath>
                  </defs>
                  {/* Outline / empty state */}
                  <path
                    d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="0.8"
                  />
                  {/* Progressive Fill on Clip */}
                  <g clipPath={`url(#${clipId})`}>
                    <path
                      d="M16 2 C24 7, 28 16, 26 26 C20 28, 10 25, 6 16 C6 8, 12 3, 16 2 Z"
                      fill="url(#leafGrad)"
                      stroke="#34d399"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M16 2 C16 11, 17 20, 26 26 M16 10 C19 12, 22 13, 24 14 M16 16 C19 18, 21 19, 23 20 M16 14 C13 16, 10 17, 8 18"
                      fill="none"
                      stroke="#ecfdf5"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              </div>
            );
          })}
        </div>

        {/* Progress Bar & Telemetry Status */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Terminal className="w-3 h-3 text-violet-400" />
              <span>{statuses[statusIndex]}</span>
            </span>
            <span className="font-semibold text-zinc-200 tabular-nums">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/[0.06] p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.05 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
