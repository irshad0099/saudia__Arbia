"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const LEFT_ICONS = ["🏥", "🏗️", "⚖️", "✅", "🏭", "⚡"];
const RIGHT_ICONS = ["💻", "🏦", "🎓", "🚚", "🏠", "🛍️"];

function TreeNode({ icon, h, p, fromSide, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromSide === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.2, 0.64, 1] }}
      className={`flex items-center gap-5 ${fromSide === "right" ? "flex-row-reverse text-end" : "text-start"}`}
    >
      <div
        className="relative flex-shrink-0 w-[78px] h-[78px] rounded-full bg-white flex items-center justify-center text-3xl"
        style={{
          boxShadow: "0 0 0 2px #C5992A, 0 0 0 9px rgba(197,153,42,.08), 0 0 0 18px rgba(197,153,42,.04)",
        }}
      >
        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}>
          {icon}
        </motion.span>
        <span
          className="absolute rounded-full border-2 border-dashed"
          style={{ inset: -12, borderColor: "rgba(197,153,42,.35)", animation: "rotateDash 12s linear infinite" }}
        />
      </div>
      <div className="max-w-[220px]">
        <h4 className="font-display font-extrabold text-[14.5px] text-gray800 mb-1 leading-snug">{h}</h4>
        <p className="text-[12px] text-gray600 leading-relaxed">{p}</p>
      </div>
    </motion.div>
  );
}

export default function SectorsTree() {
  const { t } = useLang();
  const pairs = t.sectors.left.map((l, i) => [l, t.sectors.right[i]]);

  return (
    <section id="sectors" className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <Reveal className="text-center mb-16">
          <div className="flex justify-center">
            <SectionTag center>{t.sectors.tag}</SectionTag>
          </div>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[40px] leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t.sectors.title }}
          />
          <p className="text-gray600 text-[15px] leading-relaxed max-w-xl mx-auto">{t.sectors.sub}</p>
        </Reveal>

        <div className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0 start-1/2 -translate-x-1/2 w-[3px] rounded-full"
            style={{ background: "linear-gradient(#C5992A, #C5992A)" }}
          />
          <motion.div
            className="hidden md:block absolute top-0 start-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex flex-col gap-10 md:gap-6">
            {pairs.map(([leftItem, rightItem], i) => (
              <div key={i} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <TreeNode icon={LEFT_ICONS[i]} h={leftItem.h} p={leftItem.p} fromSide="left" delay={i * 0.06} />
                <TreeNode icon={RIGHT_ICONS[i]} h={rightItem.h} p={rightItem.p} fromSide="right" delay={i * 0.06 + 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
