import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/translations";

import enLibrary from "@/assets/screenshots/en-library.png";
import enAbout from "@/assets/screenshots/en-about.jpg";
import enCreator from "@/assets/screenshots/en-crosshair-creator.jpg";
import enCustomizer from "@/assets/screenshots/en-crosshair-customizer.jpg";
import arLibrary from "@/assets/screenshots/ar-library.png";
import arAbout from "@/assets/screenshots/ar-about.jpg";
import arCreator from "@/assets/screenshots/ar-crosshair-creator.jpg";
import arCustomizer from "@/assets/screenshots/ar-crosshair-customizer.jpg";

export function Gallery() {
  const { lang } = useLanguage();
  const t = useT(lang);
  const h = t.home;

  const shots =
    lang === "ar"
      ? [
          { src: arLibrary, caption: h.galleryLibrary },
          { src: arAbout, caption: h.galleryAbout },
          { src: arCreator, caption: h.galleryCreator },
          { src: arCustomizer, caption: h.galleryCustomizer },
        ]
      : [
          { src: enLibrary, caption: h.galleryLibrary },
          { src: enAbout, caption: h.galleryAbout },
          { src: enCreator, caption: h.galleryCreator },
          { src: enCustomizer, caption: h.galleryCustomizer },
        ];

  return (
    <section className="w-full py-24 bg-card border-t border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">{h.galleryTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{h.galleryDesc}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {shots.map((shot, i) => (
            <motion.div
              key={shot.caption + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-[16/10] rounded-xl border-2 border-border bg-black overflow-hidden shadow-xl group">
                <img
                  src={shot.src}
                  alt={shot.caption}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 rounded-xl pointer-events-none" />
              </div>
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground text-center">
                {shot.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
