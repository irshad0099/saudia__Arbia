"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { logos } from "@/lib/logos";
import Reveal from "./Reveal";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function LogoCard({ name, nameAr, color, file, lang }) {
  const [broken, setBroken] = useState(false);
  const showImage = file && !broken;
  const label = lang === "ar" ? nameAr : name;

  return (
    <div className="group flex flex-col items-center justify-center gap-2.5 w-[168px] flex-shrink-0 mx-2.5 px-4 py-5 rounded-2xl border border-gray200 bg-white shadow-sm2 hover:border-blue/40 hover:shadow-md2 hover:-translate-y-1.5 transition-all duration-300">
      {showImage ? (
        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${file}`}
            alt={label}
            className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
            onError={() => setBroken(true)}
          />
        </div>
      ) : (
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-[13px] tracking-tight leading-none shadow-sm2 group-hover:scale-110 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
        >
          {initials(name)}
        </div>
      )}
      <span className="text-[11px] font-bold text-gray400 group-hover:text-gray600 text-center leading-tight transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}

export default function TrustedMarquee() {
  const { t, lang } = useLang();
  const loop = [...logos, ...logos];

  return (
    <div className="relative bg-gray50 border-y border-gray100 py-14 overflow-hidden">
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
        <div className="marquee-wrap mb-3" dir="ltr">
          <div className="marquee-track">
            {loop.map((l, i) => (
              <LogoCard key={i} {...l} lang={lang} />
            ))}
          </div>
        </div>
        <div className="marquee-wrap" dir="ltr">
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
