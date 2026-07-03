"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Industries() {
  const { t } = useLang();

  return (
    <section className="bg-gray50 py-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="text-center mb-14 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.industries.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.industries.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{t.industries.sub}</p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.industries.items.map((name, i) => (
            <Reveal key={name} delay={(i % 6) * 0.05} y={24}>
              <div className="group relative overflow-hidden bg-white rounded-[18px] p-6 border border-gray200 text-center hover:border-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-grad-main scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                <div className="w-14 h-14 rounded-2xl bg-gray100 group-hover:bg-blue flex items-center justify-center text-2xl mx-auto mb-3.5 transition-colors">
                  {t.industries.icons[i]}
                </div>
                <div className="text-[13px] font-bold text-gray800">{name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
