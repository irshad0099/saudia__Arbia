"use client";

import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

function FeaturedCard({ f, delay }) {
  return (
    <Reveal y={26} delay={delay} className="mb-6">
      <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-grad-dark border border-white/10 shadow-xl2">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,160,23,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center gap-4 mb-5">
              <img src={f.logo} alt={f.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-lg2" />
              <div>
                <div className="text-[11px] text-gold-light font-bold uppercase tracking-wide mb-1">{f.tag}</div>
                <div className="text-white font-display font-black text-xl sm:text-2xl leading-tight">{f.name}</div>
              </div>
            </div>

            <p className="text-white/70 text-[15px] font-semibold mb-3">{f.tagline}</p>
            <p className="text-white/55 text-[13.5px] leading-relaxed mb-6 max-w-xl">{f.desc}</p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
              {f.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-[12.5px] text-white/70">
                  <CheckCircle2 size={15} className="text-gold-light flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-grad-gold text-navy text-[13px] font-bold hover:-translate-y-0.5 transition-transform"
            >
              {f.linkLabel}
              <ExternalLink size={14} />
            </a>
          </div>

          {f.qr && (
            <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-white rounded-2xl p-5 shadow-xl2">
              <img src={f.qr} alt={f.qrLabel} className="w-[160px] h-[160px] object-contain" />
              <span className="text-[11px] font-bold text-gray600 text-center">{f.qrLabel}</span>
            </div>
          )}
        </div>
      </div>
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
          <div>
            {t.portfolio.featured.map((f, i) => (
              <FeaturedCard key={f.name} f={f} delay={i * 0.06} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
