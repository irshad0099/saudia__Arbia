"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { techstack } from "@/lib/techstack";
import { useLang } from "@/lib/LanguageContext";

const HUB_NAMES = ["React", "Node.js", "TypeScript", "Docker", "PostgreSQL", "AWS", "Python", "Next.js", "Kubernetes", "OpenAI"];
const ORBIT_DURATION = 45;

function HubLine({ index, count, scrollYProgress, radius }) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const x2 = useTransform(radius, (r) => 50 + r * Math.cos(angle));
  const y2 = useTransform(radius, (r) => 50 + r * Math.sin(angle));
  const start = 0.04 + index * 0.035;
  const pathLength = useTransform(scrollYProgress, [start, start + 0.42], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.line
      x1="50"
      y1="50"
      x2={x2}
      y2={y2}
      stroke="url(#hubLineGradient)"
      strokeWidth="0.55"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

function HubNode({ node, index, count, scrollYProgress, radius }) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const left = useTransform(radius, (r) => `${50 + r * Math.cos(angle)}%`);
  const top = useTransform(radius, (r) => `${50 + r * Math.sin(angle)}%`);
  const start = 0.02 + index * 0.03;
  const opacity = useTransform(scrollYProgress, [start, start + 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, start + 0.35], [0.3, 1]);
  const Icon = node.icon;

  return (
    // Position is handled by this outer div using plain left/top (not a transform), so its
    // Tailwind -translate-x/y-1/2 centering classes stay intact. Framer Motion's `scale`/`rotate`
    // must live on the INNER element only — mixing a Tailwind transform utility with Framer's
    // transform-driven style props on the *same* element makes Framer silently drop the class's
    // transform (inline style always wins), which was throwing every node off-center.
    <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        style={{ opacity, scale, boxShadow: `0 0 18px ${node.color}30` }}
        className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center justify-center"
      >
        <Icon size={20} color={node.color} style={{ filter: `drop-shadow(0 0 6px ${node.color}90)` }} />
      </motion.div>
    </motion.div>
  );
}

export default function TechHub() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.32"] });

  const nodes = HUB_NAMES.map((name) => techstack.find((it) => it.name === name)).filter(Boolean);
  const count = nodes.length;

  const radius = useTransform(scrollYProgress, [0, 1], [5, 37]);
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 1.85]);
  const centerGlow = useTransform(scrollYProgress, [0, 1], [0.25, 0.9]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div className="relative mb-4">
      <div ref={ref} className="relative w-full max-w-[560px] aspect-square mx-auto">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="hubLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1847d4" />
                <stop offset="100%" stopColor="#00c4e0" />
              </linearGradient>
            </defs>
            {nodes.map((node, i) => (
              <HubLine key={node.name} index={i} count={count} scrollYProgress={scrollYProgress} radius={radius} />
            ))}
          </svg>

          {nodes.map((node, i) => (
            <HubNode key={node.name} node={node} index={i} count={count} scrollYProgress={scrollYProgress} radius={radius} />
          ))}
        </motion.div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
          <motion.div
            className="flex flex-col items-center justify-center w-[76px] h-[76px] sm:w-[96px] sm:h-[96px] rounded-full bg-grad-main border border-white/20"
            style={{
              scale: centerScale,
              boxShadow: useTransform(centerGlow, (g) => `0 0 ${40 + g * 60}px rgba(0,196,224,${g})`),
            }}
          >
            <span className="text-2xl sm:text-3xl leading-none">⬡</span>
            <span className="text-[8px] sm:text-[9px] font-bold text-white/90 uppercase tracking-wide mt-1 text-center px-1">
              {t.tech.hubLabel}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.p
        style={{ opacity: hintOpacity }}
        className="text-center text-[12px] text-white/40 font-semibold mt-2"
      >
        {t.tech.hubHint}
      </motion.p>
    </div>
  );
}
