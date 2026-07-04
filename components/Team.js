"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { flagUrl } from "@/lib/flags";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Team() {
  const { t } = useLang();

  return (
    <section id="team" className="bg-white py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-12">
          <div className="flex justify-center">
            <SectionTag center>{t.team.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[42px] leading-tight"
            dangerouslySetInnerHTML={{ __html: t.team.title }}
          />
        </Reveal>

        <Reveal
          className="text-center max-w-3xl mx-auto mb-14 p-8 rounded-[20px] border border-gray200 text-[16px] sm:text-lg text-gray600 leading-relaxed grad-em"
          style={{ background: "linear-gradient(135deg,#f8f9fc,#f0f4ff)" }}
        >
          <p dangerouslySetInnerHTML={{ __html: t.team.intro }} />
        </Reveal>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4 mb-14" style={{ perspective: 1200 }}>
          {t.team.flags.map((code, i) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 26, scale: 0.4, rotateY: -110 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 90, damping: 12, delay: (i % 9) * 0.06 }}
              whileHover={{ y: -6, scale: 1.08 }}
              className="flex flex-col items-center gap-2.5 p-3.5 rounded-[20px] bg-white border border-gray200 shadow-sm2 cursor-default"
              style={{ transformOrigin: "center", transformStyle: "preserve-3d" }}
            >
              <div
                className="globe-ring tree-circle-float relative w-[58px] h-[58px]"
                style={{ animationDelay: `${(i % 6) * 0.35}s` }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden ring-[3px] ring-white shadow-md2">
                  <img
                    src={flagUrl(code)}
                    alt={`${t.team.countries[i]} flag`}
                    width={58}
                    height={58}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.45), transparent 42%), radial-gradient(circle at 70% 82%, rgba(0,0,0,0.18), transparent 55%)" }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray400 uppercase">{code}</span>
              <span className="text-[10px] font-semibold text-gray600 text-center leading-tight">{t.team.countries[i]}</span>
            </motion.div>
          ))}
        </div>

        <Reveal className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 bg-grad-dark rounded-[20px] px-8 py-9">
          {t.team.stats.map((s, i) => (
            <div key={s.l} className="flex items-center">
              <div className="text-center px-7">
                <div className="font-display font-black text-[36px] leading-none bg-grad-main bg-clip-text text-transparent">{s.n}</div>
                <div className="text-[13px] text-white/60 font-semibold mt-2">{s.l}</div>
              </div>
              {i < t.team.stats.length - 1 && <div className="hidden sm:block w-px h-14 bg-white/15" />}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
