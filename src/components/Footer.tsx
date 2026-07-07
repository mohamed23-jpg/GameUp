import { Link } from "wouter";
import { Send, MapPin, User, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export function Footer() {
  const { lang } = useLanguage();
  const t = useT(lang);

  return (
    <footer className="border-t border-primary/20 bg-card py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-2xl tracking-widest text-foreground">
                GAMEUP <span className="text-primary">PRO</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm font-sans text-lg">
              {t.footer.tagline}
            </p>
            <a
              href="https://t.me/TTAEO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 uppercase tracking-widest text-sm font-bold"
              data-testid="link-footer-telegram"
            >
              <Send className="w-4 h-4" />
              {t.footer.telegramBtn}
            </a>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-primary tracking-widest">
              {t.footer.devTitle}
            </h4>
            <ul className="space-y-3 text-muted-foreground font-sans">
              <li className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary shrink-0" />
                <span>Mohamed Adel</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary shrink-0" />
                <span>M.ADEL hub</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Egypt, Monufia, Senegerg</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-secondary tracking-widest">
              {t.footer.linksTitle}
            </h4>
            <ul className="space-y-3 font-sans">
              <li>
                <Link href="/features">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t.footer.features}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t.footer.privacy}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {t.footer.contact}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-sans">
            {t.footer.rights.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "200ms" }} />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
