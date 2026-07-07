import { motion } from "framer-motion";
import { ShieldAlert, FileText, Server, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

export default function Privacy() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const p = t.privacy;

  return (
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <section className="w-full pt-20 pb-12 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-muted-foreground/30 bg-muted/50 text-muted-foreground text-sm font-display tracking-widest uppercase mb-6">
            <ShieldAlert className="w-4 h-4" /> {p.badge}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase"
          >
            {p.title} <span className="text-primary">{p.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-sans"
          >
            {p.lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">

          <div className="prose prose-invert prose-p:font-sans prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest max-w-none">

            <div className="p-6 border border-primary/20 bg-primary/5 rounded-lg mb-12 flex gap-4 items-start">
              <Server className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mt-0 mb-2">{p.zeroTitle}</h3>
                <p className="text-muted-foreground m-0 leading-relaxed">{p.zeroDesc}</p>
              </div>
            </div>

            <h2 className="text-2xl text-foreground border-b border-border pb-2">{p.s1Title}</h2>
            <p className="text-muted-foreground">{p.s1Text}</p>

            <h2 className="text-2xl text-foreground border-b border-border pb-2 mt-12">{p.s2Title}</h2>
            <p className="text-muted-foreground">{p.s2Text}</p>
            <ul className="text-muted-foreground">
              <li><strong className="text-foreground">{p.s2li1Bold}</strong>{p.s2li1}</li>
              <li><strong className="text-foreground">{p.s2li2Bold}</strong>{p.s2li2}</li>
              <li><strong className="text-foreground">{p.s2li3Bold}</strong>{p.s2li3}</li>
            </ul>
            <p className="text-muted-foreground">{p.s2Extra}</p>

            <h2 className="text-2xl text-foreground border-b border-border pb-2 mt-12">{p.s3Title}</h2>
            <p className="text-muted-foreground">{p.s3Text}</p>

            <h2 className="text-2xl text-foreground border-b border-border pb-2 mt-12">{p.s4Title}</h2>
            <div className="bg-background border border-border p-6 rounded mt-4">
              <ul className="list-none pl-0 m-0 space-y-3 font-sans text-muted-foreground">
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span><strong className="text-foreground">{p.devLabel}</strong> Mohamed Adel</span>
                </li>
                <li className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-primary shrink-0" />
                  <span><strong className="text-foreground">{p.studioLabel}</strong> M.ADEL hub</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span><strong className="text-foreground">{p.locationLabel}</strong> Egypt, Monufia, Senegerg</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl text-foreground border-b border-border pb-2 mt-12">{p.s5Title}</h2>
            <p className="text-muted-foreground">{p.s5Text}</p>

          </div>
        </div>
      </section>

    </div>
  );
}
