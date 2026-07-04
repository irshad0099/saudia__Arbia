"use client";

import { Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const socials = [Globe, Mail, MessageCircle, Share2];

export default function Footer() {
  const { t } = useLang();

  const cols = [
    { h: t.footer.colServices, items: t.footer.services },
    { h: t.footer.colSolutions, items: t.footer.solutions },
    { h: t.footer.colCompany, items: t.footer.company },
    { h: t.footer.colResources, items: t.footer.resources },
  ];

  return (
    <footer className="bg-navy text-white pt-20 pb-8 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-10 sm:gap-10 mb-14">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display font-black text-2xl bg-grad-main bg-clip-text text-transparent block mb-4">NexaCore</span>
            <p className="text-sm text-white/45 leading-relaxed max-w-[280px] mb-6">{t.footer.desc}</p>
            <div className="flex gap-2.5">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-[38px] h-[38px] rounded-lg bg-white/[0.08] flex items-center justify-center text-white/60 hover:bg-blue hover:text-white hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.h}>
              <h5 className="text-xs font-extrabold text-white/90 uppercase tracking-widest mb-4.5">{col.h}</h5>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-white/45 hover:text-cyan transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/35">{t.footer.copy}</p>
          <div className="flex gap-2.5">
            {t.footer.badges.map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-white/[0.07] text-[11px] text-white/40 font-semibold">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
