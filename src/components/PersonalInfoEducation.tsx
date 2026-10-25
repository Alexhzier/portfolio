import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  User, 
  CheckCircle2, 
  BookOpen, 
  Terminal
} from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';

export const PersonalInfoEducation: React.FC = () => {
  const { personal } = portfolioData;
  const { education } = personal;

  const competencies = [
    'Data Structures & Algorithms',
    'Machine Learning & NLP',
    'Database Systems (PostgreSQL)',
    'Full-Stack Web Architectures',
    'Neural Networks (CNN-LSTM)',
    'Biometric Hardware Integration'
  ];

  const profileHighlights = [
    { label: 'Primary Discipline', value: 'Full-Stack Engineering & Web Platforms' },
    { label: 'Applied AI & ML', value: 'NLP, Neural Classification & Data Visualizations' },
    { label: 'Systems & Hardware', value: 'Biometric SDKs & Hardware Telemetry' },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Anchor alias so any legacy #metrics links scroll here seamlessly */}
      <span id="metrics" className="sr-only" />

      <div className="rounded-3xl bg-[#121217] border border-white/[0.08] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        {/* Ambient Radial Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background &amp; Profile</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Personal Information &amp; Education
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Academic credentials in Computer Science paired with hands-on full-stack development, applied machine learning research, and verified personal background.
          </p>
        </div>

        {/* Responsive 2-Column Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
          
          {/* Card 1: Academic Degree Showcase (Spans 7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="lg:col-span-7 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 block font-semibold">
                      DEGREE &amp; ACADEMIC CREDENTIAL
                    </span>
                    <span className="text-xs text-zinc-400">Formal Higher Education</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {education.graduationStatus}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-violet-200 transition-colors">
                {education.degree}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                {education.summary}
              </p>

              {/* Undergraduate Research Focus Banner */}
              <div className="rounded-xl bg-zinc-900/80 border border-white/[0.06] p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-1.5 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Undergraduate Thesis Focus</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Social Media Listening for Mental Health Issues in SOCCSARGEN</strong> — Developed and evaluated an NLP pipeline with a CNN-LSTM deep learning classification model across 5,067 manually collected regional posts, featuring interactive Highcharts telemetry.
                </p>
              </div>
            </div>

            {/* Core Competencies Tags */}
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                CURRICULAR &amp; APPLIED FOCUS AREAS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {competencies.map((comp) => (
                  <span
                    key={comp}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 text-[11px] font-mono text-zinc-300 border border-white/[0.05]"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Personal Profile & Photo Card (Spans 5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 180, damping: 24, delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Subtle Ambient Violet Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header with Photo and Identity */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-6 relative z-10">
                {/* Profile Portrait */}
                <div className="relative shrink-0 group/photo">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-violet-500/50 transition-all duration-300 shadow-xl shadow-black/70 bg-zinc-900">
                    <img
                      src="/profile.png"
                      alt="Alexhzier C. Asdain"
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Identity Text */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-white/[0.06] text-[10px] font-mono uppercase tracking-wider text-violet-400 mb-1.5 font-semibold">
                    <User className="w-3 h-3" />
                    <span>VERIFIED PROFILE</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {personal.name}
                  </h4>
                  <div className="text-xs font-mono text-violet-400 font-medium mt-1">
                    {personal.role}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-mono text-emerald-300 mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{personal.availability.label}</span>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5 relative z-10">
                {personal.bioParagraph}
              </p>
            </div>

            {/* Structured Engineering Capabilities Checklist */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2 relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                CORE TECHNICAL DISCIPLINES
              </span>
              {profileHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <Terminal className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-400 font-mono text-[11px] block">{item.label}</span>
                    <span className="text-zinc-200 font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
