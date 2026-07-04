"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-black text-white text-[28px] sm:text-[42px] lg:text-[54px] leading-none tracking-tight whitespace-nowrap">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="bg-grad-main py-16 px-6">
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-4 rounded-[28px] overflow-hidden bg-white/20" style={{ gap: "1px" }}>
        {t.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-4 sm:p-8 lg:p-11 text-center"
          >
            <Counter target={s.target} suffix={s.suffix} />
            <div className="text-[13px] sm:text-sm text-white/75 font-semibold mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
