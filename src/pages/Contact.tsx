import { motion } from "framer-motion";
import { Send, MapPin, User, Terminal, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function Contact() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const c = t.contact;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <section className="w-full pt-20 pb-12 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#00f5ff15,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase"
          >
            {c.title} <span className="text-primary">{c.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto"
          >
            {c.subtitle}
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full py-16 bg-card min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-5xl">

          <div className="grid md:grid-cols-2 gap-12">

            {/* Developer Info Card */}
            <div>
              <div className="border border-border bg-background p-8 rounded-none relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 start-0 w-1 h-full bg-primary" />

                <h2 className="text-2xl font-display font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-primary" />
                  {c.devProfileTitle}
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-1">{c.leadDev}</div>
                    <div className="text-lg flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Mohamed Adel</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-1">{c.studio}</div>
                    <div className="text-lg font-bold font-display tracking-wider">M.ADEL <span className="text-primary">hub</span></div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-1">{c.baseOps}</div>
                    <div className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Egypt, Monufia, Senegerg</div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground font-sans mb-6">{c.telegramText}</p>
                    <a
                      href="https://t.me/TTAEO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-3 px-6 py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                      data-testid="btn-contact-telegram"
                    >
                      <Send className="w-5 h-5" />
                      {c.telegramBtn}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-secondary" />
                {c.faqTitle}
              </h2>

              <div className="space-y-4">
                {c.faq.map((faq, i) => (
                  <div key={i} className="border border-border bg-background overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-start p-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-panel-${i}`}
                      data-testid={`btn-faq-${i}`}
                    >
                      <span className="font-display font-bold text-sm tracking-wide">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>

                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={false}
                      animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-muted-foreground font-sans text-sm border-t border-border/50 bg-muted/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
