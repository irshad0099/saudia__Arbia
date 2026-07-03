"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[820px] mx-auto">
        <Reveal className="text-center mb-14">
          <div className="flex justify-center">
            <SectionTag center>{t.faq.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px]"
            dangerouslySetInnerHTML={{ __html: t.faq.title }}
          />
        </Reveal>

        <div className="flex flex-col gap-3">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} y={16} className="border border-gray200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-3 px-6 py-5 text-start text-[15px] font-bold text-gray800 hover:text-blue transition-colors"
                >
                  {f.q}
                  <ChevronDown size={18} className={`flex-shrink-0 text-gray400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`faq-a ${isOpen ? "open" : ""}`} style={{ maxHeight: isOpen ? "320px" : "0" }}>
                  <div className="px-6 pb-5 text-[14px] text-gray600 leading-relaxed">{f.a}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
