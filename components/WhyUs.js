"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why" className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="mb-14">
          <SectionTag>{t.why.tag}</SectionTag>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[42px] leading-tight"
            dangerouslySetInnerHTML={{ __html: t.why.title }}
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.why.items.map((w, i) => (
            <Reveal key={w.h} delay={(i % 3) * 0.08} y={30}>
              <div
                className={`relative overflow-hidden rounded-[28px] p-9 h-full border transition-all duration-300 hover:-translate-y-1.5 ${
                  i === 1 ? "bg-grad-dark border-transparent" : "bg-white border-gray200 hover:shadow-xl"
                }`}
              >
                <div
                  className={`absolute top-4 end-5 font-display font-black text-[56px] leading-none select-none ${
                    i === 1 ? "text-white/15" : "bg-grad-main bg-clip-text text-transparent opacity-[0.08]"
                  }`}
                >
                  {w.n}
                </div>
                <div className="relative z-[1] text-4xl mb-4">{w.icon}</div>
                <h3 className={`relative z-[1] font-display font-extrabold text-[19px] mb-2.5 ${i === 1 ? "text-white" : "text-gray800"}`}>
                  {w.h}
                </h3>
                <p className={`relative z-[1] text-[13.5px] leading-relaxed ${i === 1 ? "text-white/70" : "text-gray600"}`}>{w.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
