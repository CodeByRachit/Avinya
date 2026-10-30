'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight, Compass } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  tag?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Voyage', href: '#voyage', tag: '3 DAYS' },
  { name: 'Events', href: '#events', tag: '24' },
  { name: 'Hack2Future', href: '#hack2future', tag: 'FLAGSHIP' },
  { name: 'Register', href: '#register' },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('About');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy to highlight current active link
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPos) {
          setActiveItem(NAV_ITEMS[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full ${
            scrolled
              ? 'glass-pill bg-black/85 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border-white/15 scale-[0.98]'
              : 'glass-pill bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/10'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group pr-2"
            data-cursor-text="TOP"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-avinya-cyan/20 to-avinya-magenta/20 border border-white/15 group-hover:border-avinya-cyan transition-colors">
              <Compass className="w-4 h-4 text-avinya-cyan transition-transform duration-500 group-hover:rotate-45" />
              <div className="absolute inset-0 rounded-lg bg-avinya-cyan/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-orbitron font-extrabold tracking-wider text-sm sm:text-base text-white">
                  AVINYA
                </span>
                <span className="font-orbitron text-xs font-bold text-avinya-cyan">
                  '27
                </span>
              </div>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                IIIT DHARWAD
              </span>
            </div>
          </a>

          {/* Center Links (Desktop Pill) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.name;
              const isRegister = item.name === 'Register';

              if (isRegister) return null; // Register rendered as CTA button

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-grotesk tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                  data-cursor-text="GO"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-glow"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-avinya-cyan/25 to-avinya-magenta/25 border border-avinya-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name}
                    {item.tag && (
                      <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-white/10 text-avinya-cyan border border-white/10">
                        {item.tag}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Action Button: Register (Desktop) */}
          <div className="hidden md:flex items-center pl-2">
            <a
              href="#register"
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden group font-grotesk font-semibold text-xs tracking-wider uppercase transition-all duration-300"
              data-cursor-text="JOIN"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-avinya-cyan via-purple-600 to-avinya-magenta opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-[1px] bg-black/85 rounded-full group-hover:bg-black/60 transition-colors" />
              <span className="relative z-10 flex items-center gap-1.5 text-white group-hover:text-avinya-cyan transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-avinya-cyan animate-pulse" />
                Register
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white hover:text-avinya-cyan transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-avinya-cyan">
                // AVINYA 2027 NAVIGATION
              </span>
              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => {
                      setActiveItem(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.03] active:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-orbitron text-lg font-bold text-white tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    {item.tag && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-avinya-cyan/15 text-avinya-cyan border border-avinya-cyan/30">
                        {item.tag}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span>DATES: MARCH 12-14, 2027</span>
                <span>IIIT DHARWAD</span>
              </div>
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-avinya-cyan to-avinya-magenta font-orbitron font-bold text-white tracking-wider text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                SECURE ACCESS PASS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

