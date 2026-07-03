"use client";

import { Star } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const AVATAR_GRADS = ["bg-grad-main", "bg-gradient-to-br from-emerald-500 to-cyan-500", "bg-gradient-to-br from-amber-500 to-red-500"];

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="bg-gray50 py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-14">
          <div className="flex justify-center">
            <SectionTag center>{t.testimonials.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px]"
            dangerouslySetInnerHTML={{ __html: t.testimonials.title }}
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.testimonials.items.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 0.1} y={26}>
              <div className="bg-white rounded-[28px] p-8 border border-gray200 h-full hover:shadow-lg2 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[14.5px] text-gray600 italic leading-relaxed mb-6">"{tm.q}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${AVATAR_GRADS[i % 3]} flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-extrabold text-gray800">{tm.name}</div>
                    <div className="text-[11.5px] text-gray400 mt-0.5">{tm.role}</div>
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
