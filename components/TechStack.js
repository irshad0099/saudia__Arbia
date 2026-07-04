"use client";

import { forwardRef, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { techstack } from "@/lib/techstack";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import TechHub from "./TechHub";

const CATEGORIES = ["all", "frontend", "backend", "database", "cloud", "ai"];

const TechCard = forwardRef(function TechCard({ item, i }, ref) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [14, -14]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-14, 14]), { stiffness: 260, damping: 20 });
  const glowX = useTransform(x, [-40, 40], [0, 100]);
  const glowY = useTransform(y, [-40, 40], [0, 100]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: -60, scale: 0.7, rotateX: -55 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 16, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 100, damping: 13, delay: (i % 12) * 0.035 }}
      style={{ transformOrigin: "top center" }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 700 }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-6 flex flex-col items-center gap-3 cursor-default"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(120px circle at ${gx}% ${gy}%, ${item.color}33, transparent 70%)`
            ),
          }}
        />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1" style={{ boxShadow: `inset 0 0 0 1px ${item.color}55` }} />

        <div
          className="relative z-[1] w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300"
          style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
        >
          <Icon size={26} color={item.color} style={{ filter: `drop-shadow(0 0 10px ${item.color}80)` }} />
        </div>
        <span className="relative z-[1] text-[12px] font-bold text-white/75 group-hover:text-white text-center leading-tight transition-colors">
          {item.name}
        </span>
      </motion.div>
    </motion.div>
  );
});

export default function TechStack() {
  const { t } = useLang();
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => (active === "all" ? techstack : techstack.filter((it) => it.category === active)),
    [active]
  );

  return (
    <section className="relative overflow-hidden bg-navy py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,224,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,224,.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <motion.div
        className="absolute top-0 -left-24 w-[420px] h-[420px] rounded-full bg-blue/20 blur-[130px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-24 w-[420px] h-[420px] rounded-full bg-cyan/15 blur-[130px]"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1240px] mx-auto" style={{ perspective: 1400 }}>
        <Reveal className="text-center mb-8 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.tech.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-white text-[26px] sm:text-[38px] mb-3"
            dangerouslySetInnerHTML={{ __html: t.tech.title }}
          />
          <p className="text-white/55 text-[14.5px] leading-relaxed">{t.tech.sub}</p>
        </Reveal>

        <TechHub />

        <Reveal delay={0.08} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-4 py-2 rounded-full text-[12.5px] font-bold transition-colors ${
                active === cat ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="techPill"
                  className="absolute inset-0 bg-grad-main rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-[1]">{t.tech.categories[cat]}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <TechCard key={item.name} item={item} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
