"use client";

import { useLang } from "@/lib/LanguageContext";
import { logos } from "@/lib/logos";
import Reveal from "./Reveal";

function LogoCard({ abbr, name, nameAr, color, lang }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 w-[168px] flex-shrink-0 mx-2.5 px-4 py-5 rounded-2xl border border-gray200 bg-white opacity-80 hover:opacity-100 hover:border-blue/40 hover:shadow-md2 hover:-translate-y-1 transition-all duration-300">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-[11px] tracking-tight leading-none shadow-sm2"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
      >
        {abbr.length > 5 ? abbr.slice(0, 4) : abbr}
      </div>
      <span className="text-[11px] font-bold text-gray600 text-center leading-tight">
        {lang === "ar" ? nameAr : name}
      </span>
    </div>
  );
}

export default function TrustedMarquee() {
  const { t, lang } = useLang();
  const loop = [...logos, ...logos];

  return (
    <div className="bg-gray50 border-y border-gray100 py-14 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <Reveal className="text-center mb-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[3px] text-gray400 relative inline-block before:content-[''] before:inline-block before:w-10 before:h-px before:bg-gray200 before:align-middle before:me-3.5 after:content-[''] after:inline-block after:w-10 after:h-px after:bg-gray200 after:align-middle after:ms-3.5">
            {t.trusted}
          </span>
        </Reveal>
        <Reveal delay={0.08} className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-[13px] text-gray400 leading-relaxed">{t.trustedSub}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="marquee-wrap mb-3">
          <div className="marquee-track">
            {loop.map((l, i) => (
              <LogoCard key={i} {...l} lang={lang} />
            ))}
          </div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track reverse">
            {[...loop].reverse().map((l, i) => (
              <LogoCard key={i} {...l} lang={lang} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
