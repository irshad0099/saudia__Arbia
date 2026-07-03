"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import ThreeParticles from "./ThreeParticles";

const BARS = [40, 58, 47, 72, 63, 88, 100];

function TypingBadge({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[13px] font-semibold text-cyan mb-7"
    >
      <span className="w-2 h-2 rounded-full bg-cyan pulse-dot" />
      {text}
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const [dash, setDash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDash(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-grad-dark pt-[130px] pb-16">
      <ThreeParticles className="absolute inset-0 w-full h-full opacity-90" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,224,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,224,.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-14 items-center w-full z-[5]">
        <div>
          <TypingBadge text={t.hero.badge} />

          <h1 className="font-display font-black text-white leading-[1.15] tracking-tight mb-6 text-[38px] sm:text-[52px] lg:text-[58px]">
            <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="block">
              {t.hero.h1a}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
              className="block bg-grad-gold bg-clip-text text-transparent"
            >
              {t.hero.h1gold}
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="block">
              {t.hero.h1b}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-[16px] sm:text-[17px] text-white/65 leading-relaxed max-w-lg mb-10"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold bg-grad-main text-white shadow-blueGlow hover:-translate-y-1 transition-transform"
            >
              {t.hero.btn1}
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              {t.hero.btn2}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-wrap gap-x-8 gap-y-4"
          >
            {t.hero.stats.map((s) => (
              <div key={s.l} className="text-center rtl:text-right ltr:text-left">
                <div className="font-display font-extrabold text-[30px] leading-none bg-grad-main bg-clip-text text-transparent">{s.n}</div>
                <div className="text-[12px] text-white/50 mt-1.5 font-medium">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="float-c ltr:-top-7 ltr:-right-7 rtl:-top-7 rtl:-left-7 absolute z-[3]"
          >
            <span className="text-xl">🎯</span> {t.hero.float1} <span className="fc-badge green">Live</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="float-c bottom-6 ltr:-left-12 rtl:-right-12 absolute z-[3]"
            style={{ animationDelay: "2.5s" }}
          >
            <span className="text-xl">📈</span> {t.hero.float2} <span className="fc-badge gold">AI</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="float-c top-[42%] ltr:-right-12 rtl:-left-12 absolute z-[3]"
            style={{ animationDelay: "5s" }}
          >
            <span className="text-xl">⚡</span> {t.hero.float3} <span className="fc-badge blue">SLA</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[520px] rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl relative z-[2]"
          >
            <div className="bg-grad-main px-5 py-3.5 flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-white/85 text-xs font-semibold">{t.hero.dashTitle}</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                {[
                  { l: t.hero.dml1, v: "2.4M" },
                  { l: t.hero.dml2, v: "98.7%" },
                  { l: t.hero.dml3, v: "20K" },
                ].map((m) => (
                  <div key={m.l} className="bg-white/[0.07] border border-white/10 rounded-[10px] p-3">
                    <div className="text-[9.5px] text-white/45 uppercase tracking-wide font-semibold">{m.l}</div>
                    <div className="font-display text-lg font-extrabold text-white mt-1">{m.v}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[10px] p-3.5 mb-3">
                <div className="text-[11px] text-white/40 font-semibold mb-2.5">{t.hero.dch}</div>
                <div className="flex items-end gap-1.5 h-16">
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 h-full flex items-end">
                      <div
                        className="chart-bar w-full rounded-t-sm bg-grad-main opacity-80"
                        style={{ height: dash ? `${h}%` : "0%", transition: "height 1s ease-out", animationDelay: `${i * 0.08}s` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-cyan/[0.08] border border-cyan/20 rounded-[10px] px-3.5 py-3">
                <div className="ai-pulse-icon w-8 h-8 rounded-lg bg-grad-main flex items-center justify-center text-base flex-shrink-0">🤖</div>
                <div className="text-[12px] text-white/60 leading-snug">
                  <strong className="block text-white font-bold mb-0.5">{t.hero.daiTitle}</strong>
                  {t.hero.daiMsg}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
