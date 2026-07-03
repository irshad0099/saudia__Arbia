"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import ThreeSphere from "./ThreeSphere";

export default function AISection() {
  const { t } = useLang();

  return (
    <section id="ai" className="relative overflow-hidden bg-navy py-24 px-6">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <SectionTag>{t.ai.tag}</SectionTag>
            <h2 className="font-display font-black text-white text-[28px] sm:text-[42px] leading-tight mb-5">
              {t.ai.titleA}{" "}
              <em className="not-italic bg-gradient-to-r from-cyan to-[#a5f3fc] bg-clip-text text-transparent">{t.ai.titleEm}</em>
              <br />
              {t.ai.titleB}
            </h2>
            <p className="text-white/55 text-[16px] leading-relaxed max-w-lg mb-9">{t.ai.sub}</p>
          </Reveal>

          <div className="flex flex-col gap-3.5">
            {t.ai.features.map((f, i) => (
              <Reveal key={f.h} delay={i * 0.08} y={20}>
                <div className="flex gap-4 items-start p-4.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-cyan/20 transition-all">
                  <div className="w-11 h-11 rounded-[10px] bg-blue/50 flex items-center justify-center text-xl flex-shrink-0">{f.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-[15px] mb-1">{f.h}</h4>
                    <p className="text-white/45 text-[13px] leading-relaxed">{f.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="flex items-center justify-center" delay={0.2}>
          <ThreeSphere size={420} className="max-w-full h-auto opacity-90" />
        </Reveal>
      </div>
    </section>
  );
}
