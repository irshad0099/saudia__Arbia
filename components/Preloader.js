"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

const DURATION = 2200;
const EXIT_DURATION = 800;
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;
const BUBBLE_COUNT = 22;

function Bubble({ b }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${b.left}%`,
        top: 0,
        width: b.size,
        height: b.size,
        background: `radial-gradient(circle at 35% 30%, ${b.color}55, ${b.color}0a 70%)`,
        border: `1px solid ${b.color}40`,
        mixBlendMode: "screen",
        filter: "blur(0.5px)",
      }}
      initial={{ y: "100vh", x: 0, opacity: 0 }}
      animate={{ y: "-30vh", x: [0, b.drift, 0, -b.drift, 0], opacity: [0, b.maxOpacity, b.maxOpacity, 0] }}
      transition={{
        y: { duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay },
        x: { duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay },
        opacity: { duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay, times: [0, 0.15, 0.85, 1] },
      }}
    />
  );
}

export default function Preloader() {
  const { lang } = useLang();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const ringOffset = useMemo(() => RING_C * (1 - progress / 100), [progress]);

  useEffect(() => {
    // Bubble positions are randomized client-side only (post-mount) so the server-rendered
    // HTML and the first client render match exactly — no hydration mismatch warnings.
    setBubbles(
      Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 46,
        duration: 7 + Math.random() * 9,
        delay: -Math.random() * 12,
        drift: 20 + Math.random() * 60,
        maxOpacity: 0.35 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? "#00c4e0" : "#1847d4",
      }))
    );
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHide(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf;

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setProgress(pct);
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 280);
      }
    }
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setHide(true), EXIT_DURATION);
    return () => clearTimeout(t);
  }, [done]);

  if (hide) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
          transition={{ duration: EXIT_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-grad-dark overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,196,224,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,224,.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <motion.div
            className="absolute w-[560px] h-[560px] rounded-full bg-blue/20 blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 overflow-hidden">
            {bubbles.map((b) => (
              <Bubble key={b.id} b={b} />
            ))}
          </div>

          {/* Core content renders visible immediately (no opacity-0 entrance) so it shows in the
              very first paint instead of waiting on JS hydration. */}
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative w-[132px] h-[132px] flex items-center justify-center">
              <svg width="132" height="132" viewBox="0 0 108 108" className="absolute inset-0 -rotate-90">
                <circle cx="54" cy="54" r={RING_R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="54"
                  cy="54"
                  r={RING_R}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={ringOffset}
                  style={{ transition: "stroke-dashoffset 120ms linear" }}
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1847d4" />
                    <stop offset="100%" stopColor="#00c4e0" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-20 h-20 rounded-2xl bg-grad-main flex items-center justify-center shadow-blueGlow"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-4xl leading-none text-white"
                >
                  ⬡
                </motion.span>
              </motion.div>
            </div>

            <div className="font-display font-extrabold text-2xl bg-grad-main bg-clip-text text-transparent">NexaCore</div>

            <div className="flex items-center gap-2 text-white/45 text-xs font-semibold tracking-wide">
              <span>{lang === "ar" ? "جاري التحميل" : "Loading"}</span>
              <span className="text-cyan font-bold tabular-nums w-9 text-start">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
