"use client";

import { ShieldCheck, Lock, FileCheck2, CreditCard, BadgeCheck, Cloud, Search, FileSignature } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const ICONS = [ShieldCheck, Lock, FileCheck2, CreditCard, BadgeCheck, Cloud, Search, FileSignature];

export default function Certifications() {
  const { t } = useLang();

  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(160deg,#f8f9fc 0%,#f0f4ff 50%,#f8f9fc 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-14 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.certs.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.certs.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{t.certs.sub}</p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {t.certs.items.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={c.title} delay={(i % 4) * 0.06} y={24}>
                <div className="group bg-white rounded-2xl p-6 border border-gray200 text-center hover:border-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-blue/[0.07] group-hover:bg-blue flex items-center justify-center mx-auto mb-3.5 text-blue group-hover:text-white transition-colors">
                    <Icon size={26} />
                  </div>
                  <div className="text-[13px] font-extrabold text-gray800 mb-0.5">{c.title}</div>
                  <div className="text-[10.5px] text-gray400">{c.sub}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
