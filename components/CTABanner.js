"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";

export default function CTABanner() {
  const { t } = useLang();

  return (
    <div className="relative overflow-hidden bg-grad-dark py-24 px-6 text-center">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(24,71,212,.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,196,224,.2) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <h2 className="font-display font-black text-white text-[26px] sm:text-[46px] leading-tight mb-5" dangerouslySetInnerHTML={{ __html: t.cta.h2 }} />
          <p className="text-white/60 text-[16px] sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">{t.cta.p}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 rounded-xl text-[15px] font-bold bg-white text-blue hover:-translate-y-1 hover:shadow-xl transition-all">
              {t.cta.btn1}
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-xl text-[15px] font-bold bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/70 hover:-translate-y-1 transition-all"
            >
              {t.cta.btn2}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
