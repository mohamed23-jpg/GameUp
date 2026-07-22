import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Crosshair, Shield, Zap, ChevronRight, Download, Activity, Cpu, Layers, Gamepad2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { Gallery } from "@/components/Gallery";
import { useEffect, useState } from "react";

const APK_URL = "https://uwgtfxujvufntydifbyq.supabase.co/storage/v1/object/public/Gameup/gameup.apk";

// Feature card to Features-page section ID mapping
const featureSectionIds = ["crosshair", "dnd", "ram", "overlay", "library", "languages"];

/** Fires the glitch class for `duration` ms every `interval` ms. */
function usePeriodicGlitch(interval = 3000, duration = 800) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), duration);
    }, interval);
    return () => clearInterval(id);
  }, [interval, duration]);
  return active;
}

export default function Home() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const h = t.home;
  const [, navigate] = useLocation();
  const glitchActive = usePeriodicGlitch(3000, 800);

  /** Navigate to /features and smoothly scroll to the target section. */
  const goToFeature = (sectionId: string) => {
    navigate("/features");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const featureCards = [
    { icon: Crosshair, title: h.crosshairTitle, desc: h.crosshairDesc, color: "text-primary",   border: "hover:border-primary",   glow: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]" },
    { icon: Shield,    title: h.dndTitle,       desc: h.dndDesc,       color: "text-secondary", border: "hover:border-secondary", glow: "group-hover:shadow-[0_0_30px_rgba(255,0,128,0.2)]" },
    { icon: Cpu,       title: h.ramTitle,       desc: h.ramDesc,       color: "text-accent",    border: "hover:border-accent",    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]" },
    { icon: Layers,    title: h.overlayTitle,   desc: h.overlayDesc,   color: "text-primary",   border: "hover:border-primary",   glow: "group-hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]" },
    { icon: Gamepad2,  title: h.libraryTitle,   desc: h.libraryDesc,   color: "text-secondary", border: "hover:border-secondary", glow: "group-hover:shadow-[0_0_30px_rgba(255,0,128,0.2)]" },
    { icon: Globe,     title: h.langTitle,      desc: h.langDesc,      color: "text-accent",    border: "hover:border-accent",    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]" },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-12 pt-20">
          <div className="flex-1 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/5 text-primary text-sm font-display tracking-widest uppercase"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {h.badge}
            </motion.div>

            {/* Title with periodic glitch every 3 s */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none"
            >
              <span
                className={`text-foreground glitch-text${glitchActive ? " glitch-active" : ""}`}
                data-text="GAME"
              >
                GAME
              </span>
              <br />
              <span
                className={`text-primary glitch-text${glitchActive ? " glitch-active" : ""}`}
                data-text="UP PRO"
              >
                UP PRO
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-sans max-w-xl"
            >
              {h.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-4"
            >
              <a
                href={APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest overflow-hidden neon-border"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{h.downloadBtn}</span>
              </a>
              <Link href="/features">
                <span className="group inline-flex items-center gap-2 px-8 py-4 border border-border bg-card hover:border-secondary hover:text-secondary text-foreground font-display font-bold uppercase tracking-widest transition-colors cursor-pointer">
                  {h.exploreBtn}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Hero phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
          >
            <div className="relative w-[300px] h-[600px] rounded-[3rem] border-[8px] border-card bg-black shadow-2xl overflow-hidden neon-border-secondary group">
              <div className="absolute top-0 inset-x-0 h-6 bg-card rounded-b-3xl w-40 mx-auto z-50 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-12 h-1 rounded-full bg-gray-700" />
              </div>
              <div className="absolute inset-0 bg-background/50 flex flex-col p-6 pt-12 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-20 z-40"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%)", backgroundSize: "100% 4px" }}
                />
                <header className="flex justify-between items-center mb-8 relative z-10">
                  <div className="text-primary font-display font-bold tracking-wider text-sm">HUD_ACTIVE</div>
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <span key={i} className="w-2 h-4 bg-primary" />)}
                    <span className="w-2 h-4 bg-muted" />
                  </div>
                </header>
                <div className="flex-1 flex flex-col gap-4 relative z-10">
                  <div className="p-3 border border-primary/30 bg-primary/5 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-muted-foreground font-display uppercase tracking-widest">CPU Temp</span>
                      <span className="text-lg font-display font-bold text-primary">42°C</span>
                    </div>
                    <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                      <div className="w-[60%] h-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="p-3 border border-secondary/30 bg-secondary/5 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-muted-foreground font-display uppercase tracking-widest">RAM</span>
                      <span className="text-lg font-display font-bold text-secondary">Optimum</span>
                    </div>
                    <div className="w-full h-2 bg-black rounded-full overflow-hidden flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="flex-1 h-full bg-secondary" />)}
                      <div className="flex-1 h-full bg-black" />
                    </div>
                  </div>
                  <div className="p-3 border border-accent/30 bg-accent/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-accent font-display uppercase tracking-widest">OVERLAY</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 border border-accent/50 rounded flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-accent" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {["Focus","Boost","NV"].map(s => (
                        <div key={s} className="flex-1 h-6 border border-accent/20 flex items-center justify-center">
                          <span className="text-[8px] text-accent font-display">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex justify-center py-4">
                    <div className="relative w-24 h-24 flex items-center justify-center border border-dashed border-primary/30 rounded-full animate-[spin_10s_linear_infinite]">
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-accent overflow-visible">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,15" className="animate-[spin_4s_linear_infinite_reverse]" />
                        <path d="M 50 10 L 50 40 M 50 60 L 50 90 M 10 50 L 40 50 M 60 50 L 90 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="4" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center font-display text-accent text-xs tracking-widest uppercase animate-pulse">
                    {h.crosshairEngaged}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-card border-y border-border py-12 relative z-20">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
          {[
            { label: h.downloads, value: "2M+", icon: Download },
            { label: h.pingDrop,  value: "-50ms", icon: Activity },
            { label: h.fpsBoost,  value: "Max",   icon: Zap },
            { label: h.inputLag,  value: "Zero",  icon: Cpu },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <stat.icon className="w-6 h-6 text-primary mb-4 opacity-70" />
              <div className="text-3xl md:text-5xl font-display font-black text-foreground mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-display uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES TEASER ─────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">{h.arsenalTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{h.arsenalDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => goToFeature(featureSectionIds[i])}
                className={`group relative p-6 bg-card border border-border transition-all duration-300 cursor-pointer h-full ${feat.border} ${feat.glow} overflow-hidden`}
              >
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-foreground/[0.03] rounded-full group-hover:scale-150 transition-transform duration-700" />
                <feat.icon className={`w-10 h-10 mb-5 ${feat.color} transition-transform group-hover:scale-110`} />
                <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">{feat.title}</h3>
                <p className="text-muted-foreground font-sans text-sm">{feat.desc}</p>
                <div className="mt-5 flex items-center text-xs font-display uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                  {h.viewSpecs} <ChevronRight className="w-3 h-3 ms-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-card border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-black mb-16 text-center">{h.howTitle}</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            {[
              { step: "01", title: h.step1Title, text: h.step1Text },
              { step: "02", title: h.step2Title, text: h.step2Text },
              { step: "03", title: h.step3Title, text: h.step3Text },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 mb-16 relative ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 p-6 bg-background border border-border w-full relative z-10">
                  <div className={`text-5xl font-display font-black text-border opacity-20 absolute top-4 ${i % 2 === 0 ? "left-4" : "right-4"}`}>{step.step}</div>
                  <h4 className="text-xl font-display font-bold text-primary mb-2 relative z-10 uppercase tracking-widest">{step.title}</h4>
                  <p className="text-muted-foreground relative z-10">{step.text}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-card border-2 border-primary z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
