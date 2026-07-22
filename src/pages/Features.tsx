import { motion } from "framer-motion";
import {
  Shield, Smartphone, Zap, Settings, Eye, Lock, Layers, Crosshair,
  Focus, Moon, Activity, Plus, Minus, Gamepad2, Play, Trash2, Globe,
  Sun, LifeBuoy, MousePointerClick, AppWindow, SlidersHorizontal,
  BellRing, PanelRight, Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

/* ── Interactive Overlay Mockup ─────────────────────────────────────────── */
function OverlayMockup({ f }: { f: ReturnType<typeof useT>["features"] }) {
  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const [minimized, setMinimized] = useState(false);
  const [toggles, setToggles] = useState({ focus: false, accel: true, nv: false, perf: true });

  const tabs = [f.tabCrosshair, f.tabQuick, f.tabApps];
  const sliders = [
    { label: f.s1Size, val: 65 },
    { label: f.s1Length, val: 48 },
    { label: f.s1Thickness, val: 30 },
    { label: f.s1Opacity, val: 85 },
  ];
  const quickItems = [
    { key: "focus" as const, label: f.focusMode,    icon: Focus,    color: "text-accent" },
    { key: "accel" as const, label: f.gameAccel,    icon: Zap,      color: "text-primary" },
    { key: "nv"    as const, label: f.nightVision,  icon: Moon,     color: "text-secondary", badge: f.filters },
    { key: "perf"  as const, label: f.perfMonitor,  icon: Activity, color: "text-primary" },
  ];

  if (minimized) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-2">{f.f4li1}</div>
        <button
          onClick={() => setMinimized(false)}
          className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:scale-110 transition-transform"
        >
          <Layers className="w-6 h-6 text-primary" />
        </button>
        <div className="text-xs text-primary font-display animate-pulse uppercase tracking-widest">tap to expand</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-black/90 border border-primary/40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.15)]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-primary" />
            <span className="text-primary font-display font-bold text-xs tracking-widest uppercase">GameUp Pro</span>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="w-6 h-6 border border-primary/40 flex items-center justify-center hover:bg-primary/20 transition-colors rounded"
            aria-label="Minimize overlay"
          >
            <Minus className="w-3 h-3 text-primary" />
          </button>
        </div>
        <div className="flex border-b border-primary/20">
          {tabs.map((label, i) => (
            <button
              key={i}
              onClick={() => setTab(i as 0 | 1 | 2)}
              className={`flex-1 py-2 text-xs font-display uppercase tracking-wider transition-colors ${tab === i ? "text-primary border-b-2 border-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 min-h-[200px]">
          {tab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center bg-primary/5">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 text-primary drop-shadow-[0_0_6px_rgba(0,245,255,0.8)]">
                    <path d="M 50 20 L 50 40 M 50 60 L 50 80 M 20 50 L 40 50 M 60 50 L 80 50" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                  </svg>
                </div>
              </div>
              {sliders.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-display mb-1">
                    <span className="text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    <span className="text-primary">{s.val}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.val}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-1.5">
                  {["#00f5ff","#ff0080","#00ff88","#ffffff","#ffff00"].map(c => (
                    <div key={c} className="w-4 h-4 rounded-sm border border-white/10 cursor-pointer hover:scale-110 transition-transform" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {["+","•","○"].map(s => (
                    <div key={s} className="w-6 h-6 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold cursor-pointer hover:bg-primary/20 transition-colors rounded">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {tab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {quickItems.map(item => (
                <div key={item.key} className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <div>
                      <div className="text-xs font-display font-bold text-foreground">{item.label}</div>
                      {"badge" in item && item.badge && (
                        <div className="text-[10px] text-secondary font-display">{item.badge}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setToggles(p => ({ ...p, [item.key]: !p[item.key] }))}
                    className={`w-10 h-5 rounded-full transition-colors relative ${toggles[item.key] ? "bg-primary" : "bg-muted/50"}`}
                    aria-label={`Toggle ${item.label}`}
                    aria-pressed={toggles[item.key]}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${toggles[item.key] ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
          {tab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Calc",  color: "bg-primary/20 border-primary/40 text-primary" },
                  { label: "Notes", color: "bg-secondary/20 border-secondary/40 text-secondary" },
                  { label: "Maps",  color: "bg-accent/20 border-accent/40 text-accent" },
                  { label: "Chat",  color: "bg-primary/20 border-primary/40 text-primary" },
                  { label: "Music", color: "bg-secondary/20 border-secondary/40 text-secondary" },
                  { label: `+ ${f.addApp}`, color: "bg-muted/20 border-muted-foreground/20 text-muted-foreground" },
                ].map((app, i) => (
                  <div key={i} className={`border rounded-lg p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform ${app.color}`}>
                    <div className="w-6 h-6 rounded border border-current flex items-center justify-center">
                      <Plus className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-display text-center leading-tight">{app.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3 font-sans">{f.s3Desc}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Features() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const f = t.features;

  /* Smooth-scroll to hash on mount (from Home feature-card clicks) */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <section className="w-full pt-20 pb-12 bg-background border-b border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4">
            <span className="text-primary">{f.title}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-sans max-w-2xl">
            {f.subtitle}
          </motion.p>
        </div>
      </section>

      {/* FEATURE 1: CROSSHAIR */}
      <section id="crosshair" className="w-full py-24 bg-card border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-accent font-display tracking-widest uppercase mb-4 text-sm border border-accent/30 px-3 py-1 bg-accent/5">
              <Eye className="w-4 h-4" /> {f.f1Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
              {f.f1Title}{" "}
              <span className="text-muted-foreground text-2xl font-sans font-normal block md:inline mt-2 md:mt-0">{f.f1Arabic}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f1Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f1li1, f.f1li2, f.f1li3, f.f1li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-accent shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-full max-w-sm aspect-square bg-black border border-accent/50 rounded-lg overflow-hidden flex items-center justify-center group neon-border">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff881a_1px,transparent_1px),linear-gradient(to_bottom,#00ff881a_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="relative z-10 w-48 h-48 border border-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="absolute w-full h-[1px] bg-accent/40" />
                <div className="absolute h-full w-[1px] bg-accent/40" />
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]">
                  <path d="M 50 20 L 50 40 M 50 60 L 50 80 M 20 50 L 40 50 M 60 50 L 80 50" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-display text-accent uppercase">
                <span>X: 50%</span><span>Opacity: 100%</span><span>Y: 50%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: DND */}
      <section id="dnd" className="w-full py-24 bg-background border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-secondary font-display tracking-widest uppercase mb-4 text-sm border border-secondary/30 px-3 py-1 bg-secondary/5">
              <Shield className="w-4 h-4" /> {f.f2Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
              {f.f2Title}{" "}
              <span className="text-muted-foreground text-2xl font-sans font-normal block md:inline mt-2 md:mt-0">{f.f2Arabic}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f2Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f2li1, f.f2li2, f.f2li3, f.f2li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-secondary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-sm h-80 bg-card border border-border rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#ff0080_0,transparent_50%)]" />
              <motion.div
                animate={{ y: [-100, 20, 20, -100], opacity: [0, 1, 1, 0], scale: [1, 1, 0.9, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.4, 0.5] }}
                className="absolute top-4 w-64 bg-background border border-border rounded-lg shadow-xl p-3 flex items-center gap-3 z-10"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="w-16 h-2 bg-muted rounded mb-1" />
                  <div className="w-24 h-2 bg-muted/50 rounded" />
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.4, 0.5] }}
                className="absolute top-12 z-20"
              >
                <Shield className="w-16 h-16 text-secondary fill-secondary/20 drop-shadow-[0_0_15px_rgba(255,0,128,0.8)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-white font-bold text-xs uppercase tracking-wider">
                  {f.blocked}
                </div>
              </motion.div>
              <div className="mt-auto pt-8 flex items-center gap-2 text-secondary font-display uppercase tracking-widest text-sm">
                <Lock className="w-4 h-4" /> {f.secureSession}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3: RAM/CPU */}
      <section id="ram" className="w-full py-24 bg-card border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-primary font-display tracking-widest uppercase mb-4 text-sm border border-primary/30 px-3 py-1 bg-primary/5">
              <Zap className="w-4 h-4" /> {f.f3Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f3Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f3Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f3li1, f.f3li2, f.f3li3, f.f3li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-primary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-sm p-8 bg-background border border-border rounded-xl">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <span className="font-display font-bold text-muted-foreground">{f.sysMonitor}</span>
                <Settings className="w-5 h-5 text-muted-foreground animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-display text-sm mb-2">
                    <span className="text-primary uppercase tracking-widest">{f.cpuAlloc}</span>
                    <span>{f.cpuMax}</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex gap-1">
                    {[...Array(20)].map((_, i) => (
                      <motion.div key={i}
                        animate={{ opacity: i < 16 ? [0.5, 1, 0.5] : 0.2 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className={`flex-1 h-full ${i < 12 ? "bg-primary" : i < 16 ? "bg-primary/70" : "bg-primary/20"}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-display text-sm mb-2">
                    <span className="text-primary uppercase tracking-widest">{f.ramCleared}</span>
                    <span>{f.ramFree}</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                      animate={{ width: ["40%", "85%"] }}
                      transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                      className="absolute left-0 top-0 h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-border flex justify-center">
                  <div className="px-4 py-2 border border-primary text-primary font-display font-bold text-lg uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-5 h-5" /> {f.boostActive}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 4: SMART OVERLAY PANEL */}
      <section id="overlay" className="w-full py-24 bg-background border-b border-border relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,245,255,0.05),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-start gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-primary font-display tracking-widest uppercase mb-4 text-sm border border-primary/30 px-3 py-1 bg-primary/5">
              <Layers className="w-4 h-4" /> {f.f4Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f4Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f4Desc}</p>
            <ul className="space-y-4 font-sans text-foreground mb-10">
              {[f.f4li1, f.f4li2, f.f4li3, f.f4li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-primary shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="grid gap-4">
              {[
                { icon: Crosshair, title: f.s1Title, desc: f.s1Desc, color: "border-accent/30 text-accent" },
                { icon: Zap,       title: f.s2Title, desc: f.gameAccelDesc, color: "border-primary/30 text-primary" },
                { icon: Layers,    title: f.s3Title, desc: f.s3Desc, color: "border-secondary/30 text-secondary" },
              ].map((card, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 bg-card border rounded-lg flex items-start gap-3 ${card.color}`}
                >
                  <card.icon className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-bold text-sm uppercase tracking-wider mb-1">{card.title}</div>
                    <div className="text-muted-foreground text-sm font-sans leading-relaxed">{card.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full flex flex-col items-center gap-4"
          >
            <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-2">— {f.f4Title} —</div>
            <OverlayMockup f={f} />
            <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mt-2 text-center">{f.f4li1}</div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE 5: GAMES LIBRARY */}
      <section id="library" className="w-full py-24 bg-card border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-secondary font-display tracking-widest uppercase mb-4 text-sm border border-secondary/30 px-3 py-1 bg-secondary/5">
              <Gamepad2 className="w-4 h-4" /> {f.f5Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f5Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f5Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f5li1, f.f5li2, f.f5li3, f.f5li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-secondary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-sm bg-background border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="font-display font-bold text-sm uppercase tracking-widest text-secondary">{f.f5Title}</span>
                <Plus className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="divide-y divide-border">
                {[
                  { name: "PUBG Mobile", color: "from-secondary/40 to-secondary/5" },
                  { name: "Call of Duty", color: "from-primary/40 to-primary/5" },
                  { name: "Free Fire",   color: "from-accent/40 to-accent/5" },
                ].map((game, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.color} border border-white/10 flex items-center justify-center shrink-0`}>
                      <Gamepad2 className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-display font-bold truncate">{game.name}</div>
                      <div className="h-1.5 w-2/3 bg-muted/40 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-secondary/60" style={{ width: `${70 - i * 15}%` }} />
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-secondary/15 border border-secondary/40 flex items-center justify-center text-secondary shrink-0" aria-label="Launch">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <Trash2 className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 6: LANGUAGES, THEMES & SUPPORT */}
      <section id="languages" className="w-full py-24 bg-background border-b border-border relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,136,0.05),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-accent font-display tracking-widest uppercase mb-4 text-sm border border-accent/30 px-3 py-1 bg-accent/5">
              <Globe className="w-4 h-4" /> {f.f6Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f6Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f6Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f6li1, f.f6li2, f.f6li3, f.f6li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-accent shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-sm p-6 bg-card border border-border rounded-xl space-y-6">
              <div>
                <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-3">{f.f6li1}</div>
                <div className="grid grid-cols-2 gap-2">
                  {[f.langEN, f.langAR, f.langFA, f.langZH].map((l, i) => (
                    <div key={l} className={`px-3 py-2 rounded-lg border text-xs font-display text-center ${i === 0 ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground"}`}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm font-display">
                  <Sun className="w-4 h-4 text-accent" /> {f.themeLight}
                </div>
                <div className="w-12 h-6 rounded-full bg-muted/50 relative">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-accent rounded-full shadow" />
                </div>
                <div className="flex items-center gap-2 text-sm font-display text-muted-foreground">
                  <Moon className="w-4 h-4" /> {f.themeDark}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center">
                  <LifeBuoy className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-display font-bold uppercase tracking-widest">{f.supportCenter}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHAT'S NEW — 4 NEW FEATURES
          ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 bg-card border-b border-yellow-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.04),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-yellow-500/40 bg-yellow-500/5 text-yellow-400 text-sm font-display tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" /> {f.newSectionBadge}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">{f.newSectionTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{f.newSectionDesc}</p>
        </div>
      </section>

      {/* NEW FEATURE 7: AUTO-CLICKER & PUBG */}
      <section id="auto-clicker" className="w-full py-24 bg-card border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-secondary font-display tracking-widest uppercase mb-4 text-sm border border-secondary/30 px-3 py-1 bg-secondary/5">
              <MousePointerClick className="w-4 h-4" /> {f.f7Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f7Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f7Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f7li1, f.f7li2, f.f7li3, f.f7li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-secondary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-sm p-8 bg-background border border-border rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,128,0.06),transparent_70%)]" />
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-secondary/40 bg-secondary/10 text-secondary font-display uppercase tracking-widest text-sm mb-4">
                    <Gamepad2 className="w-4 h-4" /> PUBG Mobile
                  </div>
                  <div className="text-5xl font-display font-black text-secondary">30 CPS</div>
                  <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mt-1">Auto-Click Rate</div>
                </div>
                <div className="space-y-3">
                  {["1 CPS", "15 CPS", "30 CPS", "60 CPS"].map((rate, i) => (
                    <div key={rate} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${i === 2 ? "bg-secondary animate-pulse" : "bg-muted"}`} />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(i + 1) * 25}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${i === 2 ? "bg-secondary" : "bg-muted-foreground/30"}`}
                        />
                      </div>
                      <span className={`text-xs font-display ${i === 2 ? "text-secondary" : "text-muted-foreground"}`}>{rate}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  {["PUBG", "CoD", "Free Fire", "Custom"].map((g, i) => (
                    <div key={g} className={`flex-1 py-2 border text-[10px] font-display text-center uppercase tracking-wide ${i === 0 ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground"}`}>
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE 8: HOLD-TO-TAP */}
      <section id="smart-trigger" className="w-full py-24 bg-background border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-primary font-display tracking-widest uppercase mb-4 text-sm border border-primary/30 px-3 py-1 bg-primary/5">
              <MousePointerClick className="w-4 h-4" /> {f.f8Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f8Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f8Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f8li1, f.f8li2, f.f8li3, f.f8li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-primary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-sm p-8 bg-card border border-border rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.05),transparent_70%)]" />
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-display uppercase tracking-widest">Smart Trigger Mode</div>
                  <div className="text-2xl font-display font-black text-primary">HOLD-TO-TAP</div>
                </div>
                {/* Visual hold diagram */}
                <div className="w-full space-y-4">
                  {[
                    { label: "Hold ▼", active: true,  desc: "Firing begins…" },
                    { label: "Held  ●", active: true,  desc: "Continuous fire" },
                    { label: "Release ▲", active: false, desc: "Stops instantly" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border-2 ${step.active ? "border-primary bg-primary/30 animate-pulse" : "border-muted-foreground bg-transparent"}`} />
                      <div className="flex-1 flex items-center justify-between">
                        <span className={`text-xs font-display uppercase tracking-widest ${step.active ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
                        <span className="text-xs text-muted-foreground font-sans">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full pt-4 border-t border-border flex justify-between text-xs font-display text-muted-foreground uppercase tracking-widest">
                  <span>Zero Drift</span>
                  <span className="text-primary">✓ Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE 9: MINI-WINDOW FLOATING APPS */}
      <section id="mini-window" className="w-full py-24 bg-card border-b border-border relative scroll-mt-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-accent font-display tracking-widest uppercase mb-4 text-sm border border-accent/30 px-3 py-1 bg-accent/5">
              <AppWindow className="w-4 h-4" /> {f.f9Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f9Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f9Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f9li1, f.f9li2, f.f9li3, f.f9li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-accent shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            {/* Floating window stack mockup */}
            <div className="relative w-full max-w-sm h-80">
              {/* Background game screen */}
              <div className="absolute inset-0 bg-background border border-border rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gamepad2 className="w-16 h-16 text-muted-foreground/20" />
                </div>
                <div className="absolute top-3 left-3 text-xs font-display text-muted-foreground/40 uppercase tracking-widest">Game Running…</div>
              </div>
              {/* Floating window 1 – Calculator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute top-8 left-4 w-36 bg-card border border-primary/40 rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.15)] overflow-hidden z-10"
              >
                <div className="flex items-center justify-between px-2 py-1.5 bg-primary/10 border-b border-primary/20">
                  <span className="text-[10px] font-display text-primary uppercase tracking-widest">Calc</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="p-2 grid grid-cols-3 gap-1">
                  {["7","8","9","4","5","6","1","2","3","0","+","="].map(k => (
                    <div key={k} className={`h-5 rounded text-center flex items-center justify-center text-[9px] font-display ${k === "=" ? "bg-primary text-primary-foreground" : "bg-muted/30 text-foreground"}`}>{k}</div>
                  ))}
                </div>
              </motion.div>
              {/* Floating window 2 – Notes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="absolute top-16 right-4 w-40 bg-card border border-accent/40 rounded-lg shadow-[0_0_20px_rgba(0,255,136,0.12)] overflow-hidden z-20"
              >
                <div className="flex items-center justify-between px-2 py-1.5 bg-accent/10 border-b border-accent/20">
                  <span className="text-[10px] font-display text-accent uppercase tracking-widest">Notes</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent/40" />
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  {["Strategy notes…", "Loadout: SMG", "Rush B next round"].map(line => (
                    <div key={line} className="h-2 bg-muted/40 rounded-full text-[8px] font-sans text-muted-foreground leading-none overflow-hidden whitespace-nowrap px-1">{line}</div>
                  ))}
                </div>
              </motion.div>
              {/* Panel launch button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary/20 border-2 border-primary shadow-[0_0_16px_rgba(0,245,255,0.4)] flex items-center justify-center z-30"
              >
                <Layers className="w-4 h-4 text-primary" />
              </motion.div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-display text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap">Launched from Panel</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE 10: FULL CUSTOMIZATION */}
      <section id="customization" className="w-full py-24 bg-background border-b border-border relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,204,21,0.04),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-16 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-yellow-400 font-display tracking-widest uppercase mb-4 text-sm border border-yellow-500/30 px-3 py-1 bg-yellow-500/5">
              <SlidersHorizontal className="w-4 h-4" /> {f.f10Label}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">{f.f10Title}</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">{f.f10Desc}</p>
            <ul className="space-y-4 font-sans text-foreground">
              {[f.f10li1, f.f10li2, f.f10li3, f.f10li4].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-yellow-400 shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-sm bg-card border border-border rounded-xl overflow-hidden">
              {/* Settings header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/20">
                <Settings className="w-4 h-4 text-yellow-400" />
                <span className="font-display font-bold text-sm uppercase tracking-widest">Customization</span>
              </div>
              <div className="divide-y divide-border">
                {/* Notifications */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <BellRing className="w-4 h-4 text-yellow-400" />
                    <div>
                      <div className="text-xs font-display font-bold uppercase tracking-widest">Daily Alerts</div>
                      <div className="text-[10px] text-muted-foreground">Smart session reminders</div>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-yellow-500/30 border border-yellow-500/50 relative">
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-yellow-400 rounded-full" />
                  </div>
                </div>
                {/* Panel style */}
                <div className="px-4 py-3">
                  <div className="text-xs font-display font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-primary" /> Panel Style
                  </div>
                  <div className="flex gap-2">
                    {["Cyber", "Minimal", "Glass"].map((s, i) => (
                      <div key={s} className={`flex-1 py-1.5 border text-[10px] font-display text-center uppercase tracking-wide ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{s}</div>
                    ))}
                  </div>
                </div>
                {/* Side panel mode */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PanelRight className="w-4 h-4 text-accent" />
                    <div>
                      <div className="text-xs font-display font-bold uppercase tracking-widest">Side Panel Mode</div>
                      <div className="text-[10px] text-muted-foreground">Compact edge panel</div>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-muted/50 relative">
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-muted-foreground/40 rounded-full" />
                  </div>
                </div>
                {/* Animations */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <div>
                      <div className="text-xs font-display font-bold uppercase tracking-widest">Smooth Animations</div>
                      <div className="text-[10px] text-muted-foreground">UI motion quality</div>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-secondary/30 border border-secondary/50 relative">
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-secondary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
