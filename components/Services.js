"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const cardVariants = {
  hidden: { opacity: 0, y: -110, rotateX: -75, scale: 0.88 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 11,
      mass: 0.9,
      delay: (i % 4) * 0.12,
      staggerChildren: 0.09,
      delayChildren: (i % 4) * 0.12 + 0.32,
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative overflow-hidden bg-navy py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,196,224,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,224,.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute top-10 -left-20 w-[400px] h-[400px] rounded-full bg-blue/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1440px] mx-auto">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex justify-center">
            <SectionTag center>{t.services.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-white text-[30px] sm:text-[44px] leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t.services.title }}
          />
          <p className="text-white/60 text-[16px] leading-relaxed">{t.services.sub}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: 1400 }}>
          {t.services.items.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="h-full"
              style={{ transformOrigin: "top center" }}
            >
              <div className="group relative overflow-hidden bg-white/5 backdrop-blur-md rounded-[18px] p-7 border border-white/10 hover:-translate-y-1.5 hover:border-transparent transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-grad-main opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  variants={textVariants}
                  className="relative z-[1] w-[52px] h-[52px] rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl mb-4.5 group-hover:bg-white/20 transition-colors"
                >
                  {s.icon}
                </motion.div>
                <motion.h3 variants={textVariants} className="relative z-[1] font-display font-extrabold text-[16px] text-white mb-2">
                  {s.title}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="relative z-[1] text-[13.5px] text-white/55 group-hover:text-white/80 leading-relaxed transition-colors"
                >
                  {s.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
