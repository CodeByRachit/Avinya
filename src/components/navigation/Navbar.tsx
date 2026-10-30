'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, ChevronRight } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  tag?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Voyage', href: '#voyage', tag: '3 DAYS' },
  { name: 'Themes', href: '#themes', tag: 'ART' },
  { name: 'Events', href: '#events', tag: '24' },
  { name: 'Venues', href: '#venues', tag: 'MAP' },
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

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 220;

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
          className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full ${
            scrolled
              ? 'glass-pill bg-[#0a0d14]/85 shadow-[0_12px_40px_rgba(0,0,0,0.7)] border-white/15 scale-[0.98]'
              : 'glass-pill bg-[#0a0d14]/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/10'
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group pr-2"
            data-cursor-text="TOP"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/15 group-hover:border-amber-400/60 transition-colors">
              <Compass className="w-4 h-4 text-amber-200 transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-syne font-bold tracking-wider text-sm sm:text-base text-white">
                  AVINYA
                </span>
                <span className="font-syne text-xs font-semibold text-amber-300">
                  '27
                </span>
              </div>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                IIIT DHARWAD
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] p-1 rounded-full border border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.name;
              const isRegister = item.name === 'Register';

              if (isRegister) return null;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-grotesk tracking-wide transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                  data-cursor-text="GO"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-glow"
                      className="absolute inset-0 rounded-full bg-white/10 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name}
                    {item.tag && (
                      <span className="font-mono text-[8px] px-1.5 py-0.2 rounded bg-white/10 text-amber-200/90 border border-white/10">
                        {item.tag}
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Action Button: Register (Desktop) */}
          <div className="hidden lg:flex items-center pl-2">
            <a
              href="#register"
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden group font-grotesk font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 hover:text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              data-cursor-text="PASS"
            >
              Get Pass
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white hover:text-amber-300 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#06080e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300/80">
                // AVINYA 2027 NAVIGATION
              </span>
              <nav className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setActiveItem(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02] active:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/30">
                        0{index + 1}
                      </span>
                      <span className="font-syne text-lg font-bold text-white tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    {item.tag && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
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
                <span>MARCH 12-14, 2027</span>
                <span>IIIT DHARWAD</span>
              </div>
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 font-syne font-bold text-white tracking-wider text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)]"
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
