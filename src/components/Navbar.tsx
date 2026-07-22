import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { Moon, Sun, Menu, X, Gamepad2, Bell, Zap, MousePointerClick, AppWindow, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icon map for notification items
const notifIcons = [Gamepad2, MousePointerClick, AppWindow, SlidersHorizontal];
const notifColors = ["text-secondary", "text-primary", "text-accent", "text-yellow-400"];

function NotificationModal({ open, onClose, t }: {
  open: boolean;
  onClose: () => void;
  t: ReturnType<typeof useT>;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-md bg-card border border-yellow-400/30 shadow-[0_0_40px_rgba(250,204,21,0.12)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
                    {t.notif.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans">{t.notif.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-colors rounded"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature list */}
            <div className="divide-y divide-border">
              {t.notif.items.map((item, i) => {
                const Icon = notifIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className={`mt-0.5 w-9 h-9 rounded border border-current/20 bg-current/5 flex items-center justify-center shrink-0 ${notifColors[i]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground">
                          {item.title}
                        </span>
                        <span className="px-1.5 py-0.5 text-[9px] font-display font-bold tracking-widest bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 uppercase">
                          {t.notif.badge}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-muted/20 border-t border-border flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs text-muted-foreground font-display uppercase tracking-widest">
                GameUp Pro — Latest Build
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const t = useT(lang);
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.features, path: "/features" },
    { name: t.nav.privacy, path: "/privacy" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const isAr = lang === "ar";

  return (
    <>
      <NotificationModal open={notifOpen} onClose={() => setNotifOpen(false)} t={t} />

      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded bg-primary/10 border border-primary text-primary overflow-hidden">
              <Gamepad2 className="w-5 h-5" />
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-foreground">
              M.ADEL <span className="text-primary">hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary relative group cursor-pointer ${location === link.path ? "text-primary" : "text-muted-foreground"}`}>
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${location === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
                </span>
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="px-3 py-1.5 border border-accent/40 hover:border-accent text-accent text-sm font-bold font-display tracking-widest transition-colors bg-accent/5 hover:bg-accent/10"
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              {isAr ? "EN" : "عربي"}
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 border border-yellow-500/30 hover:border-yellow-400 text-yellow-400 transition-colors bg-yellow-500/5 hover:bg-yellow-500/10"
              aria-label="What's new"
            >
              <Bell className="w-5 h-5" />
              {/* Red dot indicator */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 border border-primary/30 hover:border-primary text-primary transition-colors bg-primary/5 hover:bg-primary/10"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="px-2 py-1 border border-accent/40 text-accent text-xs font-bold font-display bg-accent/5"
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              {isAr ? "EN" : "ع"}
            </button>
            {/* Notification Bell (mobile) */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 border border-yellow-500/30 text-yellow-400 bg-yellow-500/5"
              aria-label="What's new"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-background animate-pulse" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 border border-primary/30 text-primary bg-primary/5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-background border-b border-primary/20 md:hidden shadow-lg shadow-primary/5"
            >
              <div className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-4 text-lg font-display uppercase tracking-widest border-b border-border/50 cursor-pointer ${location === link.path ? "text-primary" : "text-foreground"}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
