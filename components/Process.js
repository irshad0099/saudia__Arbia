"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Process() {
  const { t } = useLang();

  return (
    <section className="bg-gray50 py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-16 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.process.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[40px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.process.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{t.process.sub}</p>
        </Reveal>

        <div className="relative grid sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-4">
          <div className="hidden lg:block absolute top-[44px] start-[10%] end-[10%] h-0.5 bg-gradient-to-r from-blue to-cyan" />
          {t.process.steps.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.08} y={24} className="relative z-[1] text-center">
              <div
                className="relative w-[88px] h-[88px] rounded-full bg-white border-[3px] border-blue flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ boxShadow: "0 0 0 10px #f7f9fc" }}
              >
                {s.icon}
                <span className="absolute -top-1 end-[-4px] w-6 h-6 rounded-full bg-grad-main text-white text-[11px] font-extrabold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h4 className="font-display font-extrabold text-[14px] text-gray800 mb-1.5">{s.h}</h4>
              <p className="text-[12px] text-gray400 leading-relaxed">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
