"use client";

import { Check, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section id="pricing" className="bg-white py-24 px-6">
      <div className="max-w-[1240px] mx-auto">
        <Reveal className="text-center mb-14 max-w-xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{p.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[38px] mb-3"
            dangerouslySetInnerHTML={{ __html: p.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed">{p.sub}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} y={28}>
              <div
                className={`relative h-full flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-grad-dark border border-white/10 shadow-xl2 lg:-translate-y-3"
                    : "bg-white border border-gray200 hover:border-blue/40 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 start-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-grad-gold text-navy text-[11px] font-extrabold shadow-sm2 whitespace-nowrap">
                    <Sparkles size={12} /> {p.popular}
                  </span>
                )}

                <h3 className={`font-display font-extrabold text-lg mb-1.5 ${plan.highlight ? "text-white" : "text-gray800"}`}>
                  {plan.name}
                </h3>
                <p className={`text-[12.5px] leading-relaxed mb-5 min-h-[54px] ${plan.highlight ? "text-white/60" : "text-gray400"}`}>
                  {plan.desc}
                </p>

                <div className={`mb-5 pb-5 border-b ${plan.highlight ? "border-white/10" : "border-gray100"}`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${plan.highlight ? "text-cyan" : "text-blue"}`}>
                    {p.priceFrom}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-display font-black text-3xl ${plan.highlight ? "text-white" : "text-gray800"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-bold ${plan.highlight ? "text-white/50" : "text-gray400"}`}>{p.currency}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.highlight ? "bg-cyan/20 text-cyan" : "bg-blue/[0.08] text-blue"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className={`text-[13px] leading-snug ${plan.highlight ? "text-white/80" : "text-gray600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`text-center py-3 rounded-lg text-[13px] font-bold transition-all ${
                    plan.highlight
                      ? "bg-grad-main text-white shadow-blueGlow hover:-translate-y-0.5"
                      : "bg-gray50 text-gray800 border border-gray200 hover:border-blue hover:text-blue"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8">
          <div className="rounded-2xl bg-grad-hero border border-gray200 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-start">
              <h3 className="font-display font-extrabold text-gray800 text-lg sm:text-xl mb-2">{p.custom.title}</h3>
              <p className="text-gray600 text-[13.5px] leading-relaxed max-w-2xl">{p.custom.desc}</p>
            </div>
            <a
              href="#contact"
              className="flex-shrink-0 inline-flex items-center px-6 py-3.5 rounded-lg text-sm font-bold bg-navy text-white hover:-translate-y-0.5 transition-transform whitespace-nowrap"
            >
              {p.custom.cta}
            </a>
          </div>
        </Reveal>

        <p className="text-center text-[11.5px] text-gray400 mt-6">{p.note}</p>
      </div>
    </section>
  );
}
