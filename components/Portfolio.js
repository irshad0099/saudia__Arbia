"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const GRADS = [
  "linear-gradient(135deg,#dbeafe,#93c5fd)",
  "linear-gradient(135deg,#d1fae5,#6ee7b7)",
  "linear-gradient(135deg,#ede9fe,#c4b5fd)",
  "linear-gradient(135deg,#fef3c7,#fde68a)",
  "linear-gradient(135deg,#fce7f3,#f9a8d4)",
  "linear-gradient(135deg,#cffafe,#67e8f9)",
];

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.portfolio.items.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08} y={30}>
              <div className="port-card relative rounded-[28px] overflow-hidden cursor-pointer" style={{ aspectRatio: "4/3" }}>
                <div
                  className="port-img absolute inset-0 flex items-center justify-center text-6xl"
                  style={{ background: GRADS[i % GRADS.length] }}
                >
                  {p.icon}
                </div>
                <div
                  className="port-overlay absolute inset-0 flex items-end p-6"
                  style={{ background: "linear-gradient(to top, rgba(8,14,31,.95) 0%, rgba(8,14,31,.4) 50%, transparent 100%)" }}
                >
                  <div>
                    <div className="text-[11px] text-cyan font-bold uppercase tracking-wide mb-1.5">{p.tag}</div>
                    <div className="text-white font-display font-extrabold text-[16px] leading-snug">{p.name}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
