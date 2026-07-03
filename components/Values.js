"use client";

import { Shield, Globe2, Gem, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const ICONS = [Shield, Globe2, Gem, TrendingUp];

export default function Values() {
  const { t } = useLang();

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-14 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.values.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.values.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{t.values.sub}</p>
        </Reveal>

        <Reveal
          className="relative overflow-hidden rounded-[24px] border border-gold/20 p-8 sm:p-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ background: "linear-gradient(135deg,#fefcf5 0%,#fdf6e3 100%)" }}
        >
          {t.values.items.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <div key={v.h} className="text-center relative z-[1]">
                <div
                  className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center mx-auto mb-4.5 border border-gold/25 text-[#c49010]"
                  style={{ background: "linear-gradient(135deg,#fef9ec,#fdeec5)" }}
                >
                  <Icon size={30} />
                </div>
                <h4 className="font-display font-extrabold text-[15px] text-gray800 mb-2">{v.h}</h4>
                <p className="text-[12.5px] text-gray600 leading-relaxed max-w-[180px] mx-auto">{v.p}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
