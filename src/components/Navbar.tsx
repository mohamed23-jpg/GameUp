import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";
import { Moon, Sun, Menu, X, Crosshair } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const t = useT(lang);
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.features, path: "/features" },
    { name: t.nav.privacy, path: "/privacy" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const isAr = lang === "ar";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-primary/10 border border-primary text-primary overflow-hidden">
            <Crosshair className="w-5 h-5 animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-foreground">
            M.ADEL <span className="text-primary">hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              data-testid={`link-${link.path.replace("/", "") || "home"}`}
            >
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary relative group cursor-pointer ${location === link.path ? "text-primary" : "text-muted-foreground"}`}>
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${location === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
              </span>
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? "en" : "ar")}
            className="px-3 py-1.5 rounded-none border border-accent/40 hover:border-accent text-accent text-sm font-bold font-display tracking-widest transition-colors bg-accent/5 hover:bg-accent/10"
            data-testid="btn-lang-toggle"
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            {isAr ? "EN" : "عربي"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-none border border-primary/30 hover:border-primary text-primary transition-colors bg-primary/5 hover:bg-primary/10"
            data-testid="btn-theme-toggle"
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
            data-testid="btn-lang-toggle-mobile"
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            {isAr ? "EN" : "ع"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-none border border-primary/30 text-primary bg-primary/5"
            data-testid="btn-theme-toggle-mobile"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-primary"
            data-testid="btn-mobile-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
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
  );
}
