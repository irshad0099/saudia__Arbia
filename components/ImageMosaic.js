"use client";

import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const TILE_STYLES = [
  { grad: "linear-gradient(135deg,#1847d4,#00c4e0)", icon: "🖥️" },
  { grad: "linear-gradient(135deg,#4f46e5,#8b5cf6)", icon: "👩‍💻" },
  { grad: "linear-gradient(135deg,#00c4e0,#0d9488)", icon: "🤖" },
  { grad: "linear-gradient(135deg,#d4a017,#f0c040)", icon: "🤝" },
  { grad: "linear-gradient(135deg,#1a2035,#374151)", icon: "☁️" },
];

export default function ImageMosaic() {
  const { t } = useLang();

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="mb-12">
          <SectionTag>{t.mosaic.tag}</SectionTag>
          <h2
            className="grad-em font-display font-black text-gray800 text-[26px] sm:text-[40px] leading-tight"
            dangerouslySetInnerHTML={{ __html: t.mosaic.title }}
          />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ gridAutoRows: "160px" }}>
          {t.mosaic.labels.map((label, i) => (
            <Reveal
              key={label}
              delay={i * 0.06}
              className={`relative rounded-[18px] overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: TILE_STYLES[i % TILE_STYLES.length].grad }}>
                <span className="opacity-90">{TILE_STYLES[i % TILE_STYLES.length].icon}</span>
              </div>
              <div className="absolute bottom-3 start-3 bg-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
