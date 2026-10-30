import React from 'react';
import { FEST_EVENTS, DAY_THEMES, FEST_METRICS } from '@/data/events';
import { Calendar, MapPin, Sparkles, Terminal, Users, ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';

export default function Home() {
  const culturalEvents = FEST_EVENTS.filter((e) => e.category === 'cultural');
  const technicalEvents = FEST_EVENTS.filter((e) => e.category === 'technical');

  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section
        id="hero"
        className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 relative overflow-hidden"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-avinya-cyan animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            IIIT DHARWAD PRESENTS • MARCH 12-14, 2027
          </span>
        </div>

        <h1 className="font-orbitron text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 max-w-6xl">
          AVINYA <span className="text-avinya-cyan">'27</span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-slate-300 font-syne font-medium max-w-3xl">
          The Annual Techno-Cultural Odyssey of Indian Institute of Information Technology, Dharwad.
        </p>

        <p className="mt-3 text-sm sm:text-base text-white/50 font-grotesk max-w-2xl">
          Three days. Three realities. 24 high-octane cultural spectacles and technical showdowns spanning quantum computing, competitive programming, AI agentics, and pro-night carnivals.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#events"
            className="px-8 py-3.5 rounded-full bg-avinya-cyan text-black font-orbitron font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all"
            data-cursor-text="DISCOVER"
          >
            Explore 24 Events
          </a>
          <a
            href="#voyage"
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur text-white font-orbitron font-medium text-xs tracking-wider uppercase hover:border-avinya-magenta hover:text-avinya-magenta transition-all"
            data-cursor-text="VOYAGE"
          >
            View The 3 Days
          </a>
        </div>

        {/* Hero Quick Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full text-left">
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">CHRONOLOGY</span>
            <span className="font-orbitron text-xl font-bold text-avinya-gold">3 ODYSSEY DAYS</span>
            <span className="text-xs text-white/60 block mt-1">March 12 - 14, 2027</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">COMPETITIONS</span>
            <span className="font-orbitron text-xl font-bold text-avinya-cyan">24 ARENA EVENTS</span>
            <span className="text-xs text-white/60 block mt-1">17 Cultural + 7 Tech</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">BASE SECTOR</span>
            <span className="font-orbitron text-xl font-bold text-white">IIIT DHARWAD</span>
            <span className="text-xs text-white/60 block mt-1">Hubballi-Dharwad Campus</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/10">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">ORGANIZERS</span>
            <span className="font-orbitron text-xl font-bold text-avinya-magenta">15+ CLUBS</span>
            <span className="text-xs text-white/60 block mt-1">United Techno-Cultural</span>
          </div>
        </div>
      </section>

      {/* Voyage Section: The 3 Day Themes */}
      <section id="voyage" className="w-full max-w-7xl px-4 py-24">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-avinya-gold">
            // THE 3-DAY CONTINUUM
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-white mt-2">
            THE TRI-THEME VOYAGE
          </h2>
          <p className="font-grotesk text-white/60 max-w-xl mx-auto mt-3">
            Each day of Avinya 2027 plunges participants into a fully transformed cinematic aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(DAY_THEMES).map((theme) => (
            <div
              key={theme.day}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-300"
              style={{
                boxShadow: `0 0 30px -10px ${theme.glowColor}`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">
                  DAY 0{theme.day}
                </span>
                <span
                  className="font-mono text-xs font-semibold uppercase tracking-wider"
                  style={{ color: theme.accentColor }}
                >
                  {theme.date}
                </span>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest block text-white/40">
                  CODENAME
                </span>
                <h3 className="font-orbitron text-2xl font-black text-white mt-1 group-hover:text-avinya-cyan transition-colors">
                  {theme.codename}
                </h3>
                <h4
                  className="font-syne text-sm font-semibold mt-1"
                  style={{ color: theme.accentColor }}
                >
                  {theme.themeSubtitle}
                </h4>
                <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>SECTOR LOCK: ACTIVE</span>
                <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  VIEW DAY <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Arena Section */}
      <section id="events" className="w-full max-w-7xl px-4 py-24">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-avinya-cyan">
              // OFFICIAL PROGRAMME SCHEDULE
            </span>
            <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-white mt-2">
              THE 24 ARENA EVENTS
            </h2>
            <p className="font-grotesk text-white/60 max-w-xl mt-3">
              Explore the complete lineup of 17 cultural celebrations and 7 technical challenges scheduled across all three days.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-full bg-avinya-cyan/15 border border-avinya-cyan/30 text-avinya-cyan">
              17 Cultural
            </span>
            <span className="px-3 py-1.5 rounded-full bg-avinya-magenta/15 border border-avinya-magenta/30 text-avinya-magenta">
              7 Technical
            </span>
          </div>
        </div>

        {/* Technical Events Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
            <Terminal className="w-5 h-5 text-avinya-cyan" />
            <h3 className="font-orbitron text-xl font-bold text-white tracking-wide">
              TECHNICAL ARENA (7 EVENTS)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalEvents.map((event) => (
              <div
                key={event.id}
                className="glass-panel p-6 rounded-xl border border-white/10 hover:border-avinya-cyan/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span className="text-avinya-cyan font-semibold">DAY 0{event.day}</span>
                    <span>{event.time}</span>
                  </div>

                  <h4 className="font-orbitron text-lg font-bold text-white group-hover:text-avinya-cyan transition-colors">
                    {event.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60 font-grotesk">
                    <span className="font-mono text-avinya-gold">Club:</span>
                    <span className="font-medium text-white/80">{event.club}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-white/60 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-avinya-cyan/80" />
                    <span>{event.venue}</span>
                  </div>

                  <p className="mt-4 text-xs text-white/70 font-grotesk leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Events Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
            <Sparkles className="w-5 h-5 text-avinya-magenta" />
            <h3 className="font-orbitron text-xl font-bold text-white tracking-wide">
              CULTURAL SPECTACLE (17 EVENTS)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalEvents.map((event) => (
              <div
                key={event.id}
                className="glass-panel p-6 rounded-xl border border-white/10 hover:border-avinya-magenta/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span className="text-avinya-magenta font-semibold">DAY 0{event.day}</span>
                    <span>{event.time}</span>
                  </div>

                  <h4 className="font-orbitron text-lg font-bold text-white group-hover:text-avinya-magenta transition-colors">
                    {event.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60 font-grotesk">
                    <span className="font-mono text-avinya-gold">Club:</span>
                    <span className="font-medium text-white/80">{event.club}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-white/60 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-avinya-magenta/80" />
                    <span>{event.venue}</span>
                  </div>

                  <p className="mt-4 text-xs text-white/70 font-grotesk leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hack2Future Flagship Section */}
      <section id="hack2future" className="w-full max-w-7xl px-4 py-24">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-avinya-cyan/30 relative overflow-hidden bg-gradient-to-br from-avinya-cyan/5 via-transparent to-avinya-magenta/5">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-avinya-cyan flex items-center gap-2">
              <Flame className="w-4 h-4 text-avinya-cyan" />
              FLAGSHIP 36-HOUR HACKATHON
            </span>
            <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white mt-3">
              HACK2FUTURE
            </h2>
            <p className="font-grotesk text-white/70 mt-4 leading-relaxed">
              The marquee national engineering sprint of Avinya 2027. Bring your crew, assemble cutting-edge stacks across Agentic AI, Quantum Simulation, DePIN, and Next-Gen Web, and present before industry luminaries.
            </p>

            <div className="flex flex-wrap gap-6 mt-8 font-mono text-xs text-white/60">
              <div>
                <span className="text-white/40 block">PRIZE POOL</span>
                <span className="font-orbitron text-lg font-bold text-avinya-gold">₹3,00,000+</span>
              </div>
              <div>
                <span className="text-white/40 block">MODE</span>
                <span className="font-orbitron text-lg font-bold text-white">OFFLINE @ CAMPUS</span>
              </div>
              <div>
                <span className="text-white/40 block">SPONSORED BY</span>
                <span className="font-orbitron text-lg font-bold text-avinya-cyan">GLOBAL TECH LABS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register CTA Section */}
      <section id="register" className="w-full max-w-5xl px-4 py-24 text-center">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-white/10 relative overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-widest text-avinya-magenta">
            // JOIN THE EXPEDITION
          </span>
          <h2 className="font-orbitron text-3xl sm:text-6xl font-black text-white mt-3">
            SECURE YOUR PASS
          </h2>
          <p className="font-grotesk text-white/60 max-w-lg mx-auto mt-4">
            Registrations open for all university delegates and individual competitors across India. Experience the convergence of tech and culture.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-avinya-cyan to-avinya-magenta text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,127,0.6)] transition-all"
              data-cursor-text="CONFIRM"
            >
              Get All-Access Delegate Pass
            </button>
            <a
              href="#events"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-orbitron font-medium text-xs tracking-wider uppercase hover:bg-white/5 transition-all"
            >
              Register by Event
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-12 px-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 max-w-7xl">
        <div className="flex items-center gap-2">
          <span className="font-orbitron font-bold text-white">AVINYA 2027</span>
          <span>© INDIAN INSTITUTE OF INFORMATION TECHNOLOGY DHARWAD</span>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-6">
          <span>MARCH 12, 13, 14, 2027</span>
          <span className="text-avinya-cyan">15.2917° N, 75.0505° E</span>
        </div>
      </footer>
    </main>
  );
}
