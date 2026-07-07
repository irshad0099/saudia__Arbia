"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

function FeaturedCard({ f, delay }) {
  return (
    <Reveal y={30} delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative overflow-hidden rounded-[28px] p-7 sm:p-8 h-full flex flex-col bg-grad-dark border border-white/10 shadow-xl2 hover:border-gold-light/30 transition-colors duration-300"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -top-16 -end-16 w-40 h-40 rounded-full bg-gold/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-5">
            {f.logo ? (
              <img
                src={f.logo}
                alt={f.name}
                className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-lg2 group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg2 text-2xl group-hover:scale-105 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${f.color} 0%, ${f.color}cc 100%)` }}
              >
                {f.icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-[10.5px] text-gold-light font-bold uppercase tracking-wide mb-1 truncate">{f.tag}</div>
              <div className="text-white font-display font-black text-lg sm:text-xl leading-tight">{f.name}</div>
            </div>
          </div>

          <p className="text-white/70 text-[14px] font-semibold mb-2.5">{f.tagline}</p>
          <p className="text-white/55 text-[13px] leading-relaxed mb-5">{f.desc}</p>

          <ul className="flex flex-col gap-2 mb-6">
            {f.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-[12.5px] text-white/70">
                <CheckCircle2 size={14} className="text-gold-light flex-shrink-0 mt-0.5" />
                {feat}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
            <a
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-grad-gold text-navy text-[13px] font-bold hover:-translate-y-0.5 transition-transform flex-shrink-0"
            >
              {f.linkLabel}
              <ExternalLink size={14} />
            </a>

            {f.qr && (
              <div className="flex items-center gap-3 bg-white rounded-xl p-2.5 flex-shrink-0">
                <img src={f.qr} alt={f.qrLabel} className="w-14 h-14 object-contain flex-shrink-0" />
                <span className="text-[10.5px] font-bold text-gray600 leading-tight max-w-[90px]">{f.qrLabel}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Portfolio() {
  const { t } = useLang();

  return (
    <section id="portfolio" className="bg-gray50 py-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="text-center mb-14 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.portfolio.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[40px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.portfolio.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{t.portfolio.sub}</p>
        </Reveal>

        {t.portfolio.featured && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {t.portfolio.featured.map((f, i) => (
              <FeaturedCard key={f.name} f={f} delay={(i % 2) * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
