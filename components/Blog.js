"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const GRADS = [
  "linear-gradient(135deg,#1847d4,#00c4e0)",
  "linear-gradient(135deg,#4f46e5,#8b5cf6)",
  "linear-gradient(135deg,#d4a017,#f0c040)",
];
const ICONS = ["🧠", "☁️", "🛡️"];

export default function Blog() {
  const { t, isRtl } = useLang();

  return (
    <section className="bg-gray50 py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-5 mb-12">
          <div>
            <SectionTag>{t.blog.tag}</SectionTag>
            <h2
              className="grad-em font-display font-black text-gray800 text-[24px] sm:text-[36px] leading-tight"
              dangerouslySetInnerHTML={{ __html: t.blog.title }}
            />
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray200 text-gray600 text-sm font-bold hover:border-blue hover:text-blue transition-colors">
            {t.blog.more}
          </a>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.blog.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} y={26}>
              <div className="bg-white rounded-[24px] border border-gray200 overflow-hidden hover:shadow-lg2 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="relative h-[180px] flex items-center justify-center text-5xl" style={{ background: GRADS[i % 3] }}>
                  {ICONS[i % 3]}
                  <span className="absolute top-3.5 start-3.5 bg-blue text-white text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {b.cat}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-[11.5px] text-gray400 mb-2 font-medium">{b.meta}</div>
                  <div className="font-display font-extrabold text-[15.5px] text-gray800 leading-snug mb-2.5">{b.title}</div>
                  <p className="text-[12.5px] text-gray600 leading-relaxed mb-3">{b.exc}</p>
                  <span className="inline-flex items-center gap-1 text-blue text-xs font-bold">
                    {isRtl ? "اقرأ المزيد" : "Read more"} <ArrowRight size={13} className={isRtl ? "rotate-180" : ""} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
