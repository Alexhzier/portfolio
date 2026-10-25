import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  User, 
  CheckCircle2, 
  BookOpen, 
  MapPin,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';
import { GithubIcon, LinkedInIcon } from './Icons';

export const PersonalInfoEducation: React.FC = () => {
  const { personal } = portfolioData;
  const { education } = personal;

  const competencies = [
    'Data Structures & Algorithms',
    'Applied Machine Learning & NLP',
    'Database Systems (PostgreSQL)',
    'Full-Stack Web Architectures',
    'Deep Learning (CNN-LSTM)',
    'Hardware Device Integration'
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <span id="metrics" className="sr-only" />

      <div className="rounded-3xl bg-[#121217] border border-white/[0.08] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        {/* Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-xs font-mono text-violet-400 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Academic Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            About Me &amp; Education
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Computer Science graduate combining rigorous academic foundations with production-grade full-stack engineering and applied NLP research.
          </p>
        </div>

        {/* Responsive 2-Column Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
          
          {/* Card 1: Personal Profile & Photo (Spans 5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="lg:col-span-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Subtle Ambient Violet Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header with Photo and Identity */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5 relative z-10">
                {/* Profile Portrait */}
                <div className="relative shrink-0 group/photo">
                  <div className="w-28 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-violet-500/50 transition-all duration-300 shadow-2xl shadow-black/80 bg-zinc-900">
                    <img
                      src="/profile.png"
                      alt="Alexhzier C. Asdain"
                      className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                {/* Identity Text */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-white/[0.06] text-[10px] font-mono uppercase tracking-wider text-violet-400 mb-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED PROFILE</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {personal.name}
                  </h4>
                  <div className="text-xs font-mono text-violet-400 font-medium mt-0.5">
                    {personal.role}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] font-mono text-zinc-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5 relative z-10">
                {personal.bioParagraph}
              </p>
            </div>

            {/* Direct Social & Contact Channels */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/Alexhzier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] hover:border-violet-500/40 text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alexhzier-asdain-317664260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] hover:border-violet-500/40 text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-mono transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Academic Degree Showcase (Spans 7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 }}
            className="lg:col-span-7 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-violet-950/40 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 transition-colors">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 block font-semibold">
                      DEGREE CREDENTIAL
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

              <p className="text-sm text-zinc-300 leading-relaxed mb-5 font-normal">
                {education.summary}
              </p>

              {/* Undergraduate Research Focus Banner */}
              <div className="rounded-xl bg-zinc-900/80 border border-white/[0.06] p-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-1 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Undergraduate Thesis Research</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white">Social Media Listening for Mental Health in SOCCSARGEN</strong> — Designed and evaluated an NLP preprocessing pipeline and a CNN-LSTM deep learning sequence classification model across 5,067 manually gathered regional posts.
                </p>
              </div>
            </div>

            {/* Core Competencies Tags */}
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-semibold">
                CORE TECHNICAL COMPETENCIES
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

        </div>
      </div>
    </section>
  );
};
