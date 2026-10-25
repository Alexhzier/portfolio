import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../content/portfolio-data';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Selected Work', href: '#projects', id: 'projects' },
    { label: 'Education & Profile', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 py-2.5 rounded-full border border-white/[0.08] transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/80 backdrop-blur-xl shadow-2xl shadow-black/60 border-white/[0.12]'
            : 'bg-zinc-900/60 backdrop-blur-md'
        } max-w-5xl w-full mx-auto`}
        aria-label="Main Navigation"
      >
        {/* Brand Monogram & Availability Beacon */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="flex items-center gap-2.5 text-zinc-100 hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-full"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-zinc-900 group-hover:border-violet-500/50 transition-colors shadow-inner shrink-0">
            <img src="/profile.png" alt={portfolioData.personal.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-tight leading-tight text-zinc-200 group-hover:text-white transition-colors">
              {portfolioData.personal.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available Q3/Q4
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-950/40 p-1 rounded-full border border-white/[0.04]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Telemetry / Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/60 border border-white/[0.06] text-[11px] font-mono text-zinc-400">
            <Terminal className="w-3 h-3 text-violet-400" />
            <span>{portfolioData.personal.timezone === 'Asia/Manila' ? 'PH/PHT (UTC+8)' : 'SF/PST'}</span>
          </div>

          {/* Primary CTA */}
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              } else {
                e.preventDefault();
                scrollTo('#contact');
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium shadow-md shadow-violet-600/25 border border-violet-400/20 transition-all duration-150 cursor-pointer group"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 border border-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 bg-zinc-950/95 border border-white/[0.1] rounded-2xl p-4 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                    : 'text-zinc-300 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between px-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Available for advisory
              </span>
              <span className="font-mono text-[11px] text-zinc-500">Dark Luxury v2.4</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
