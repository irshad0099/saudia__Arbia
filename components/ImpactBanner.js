"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";

export default function ImpactBanner() {
  const { t, isRtl } = useLang();

  return (
    <div className="relative overflow-hidden bg-navy py-24 px-6 text-center">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(24,71,212,.35), transparent 65%)" }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <h2
            className="grad-em font-display font-black text-white text-[26px] sm:text-[44px] leading-tight mb-5"
            dangerouslySetInnerHTML={{ __html: `${t.video.h2a}<br/><em>${t.video.h2em}</em>` }}
          />
          <p className="text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-lg mx-auto mb-9">{t.video.p}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold bg-grad-main text-white shadow-blueGlow hover:-translate-y-1 transition-transform"
          >
            {t.video.cta}
            <ArrowRight size={16} className={isRtl ? "rotate-180" : ""} />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
