"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function TechStack() {
  const { t } = useLang();

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-14">
          <div className="flex justify-center">
            <SectionTag center>{t.tech.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px]"
            dangerouslySetInnerHTML={{ __html: t.tech.title }}
          />
        </Reveal>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
          {t.tech.items.map((name, i) => (
            <Reveal key={name} delay={(i % 8) * 0.04} y={20}>
              <div className="bg-white rounded-[10px] py-5 px-2.5 border border-gray200 text-center hover:border-blue hover:-translate-y-1 hover:shadow-md2 transition-all">
                <div className="text-[11px] font-bold text-gray600">{name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
