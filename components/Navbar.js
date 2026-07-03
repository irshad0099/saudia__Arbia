"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: "#top" },
    { label: t.nav.services, href: "#services", mega: "services" },
    { label: t.nav.industries, href: "#sectors", mega: "industries" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.about, href: "#team" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      {/* Language bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-navy px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <span className="text-[11px] sm:text-xs text-white/50 truncate">{t.langBarMsg}</span>
        <div className="flex gap-1 bg-white/[0.08] rounded-full p-1 flex-shrink-0">
          <button
            onClick={() => setLang("ar")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "ar" ? "bg-grad-main text-white" : "text-white/50"}`}
          >
            العربية
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "en" ? "bg-grad-main text-white" : "text-white/50"}`}
          >
            English
          </button>
        </div>
      </div>

      {/* Main nav */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{
          top: 36,
          background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.6)",
          boxShadow: scrolled ? "0 6px 24px rgba(0,0,0,.09)" : "0 2px 20px rgba(0,0,0,.06)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 h-[70px] flex items-center gap-8">
          <a href="#top" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-grad-main flex items-center justify-center text-lg">⬡</div>
            <div>
              <div className="font-display font-extrabold text-lg leading-none bg-grad-main bg-clip-text text-transparent">
                NexaCore
              </div>
              <div className="text-[9px] font-bold text-gray400 uppercase tracking-wider">
                {lang === "ar" ? "الذكاء الاصطناعي والتحول الرقمي" : "AI & Digital Transformation"}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {links.map((l) => (
              <div key={l.label} className="relative nav-item group">
                <a
                  href={l.href}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray600 hover:text-blue hover:bg-blue/5 transition-colors whitespace-nowrap"
                >
                  {l.label}
                  {l.mega && <ChevronDown size={14} className="opacity-60 transition-transform group-hover:rotate-180" />}
                </a>
                {l.mega === "services" && (
                  <div className="mega">
                    {t.nav.servicesMenu.map((m) => (
                      <div key={m.title} className="mega-item">
                        <div className="w-9 h-9 rounded-lg bg-gray100 flex items-center justify-center text-lg flex-shrink-0">{m.icon}</div>
                        <div>
                          <strong className="block text-[13px] font-bold text-gray800">{m.title}</strong>
                          <span className="block text-[11px] text-gray400 mt-0.5">{m.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {l.mega === "industries" && (
                  <div className="mega" style={{ minWidth: 460 }}>
                    {t.nav.industriesMenu.map((m) => (
                      <div key={m.title} className="mega-item">
                        <div className="w-9 h-9 rounded-lg bg-gray100 flex items-center justify-center text-lg flex-shrink-0">{m.icon}</div>
                        <div>
                          <strong className="block text-[13px] font-bold text-gray800">{m.title}</strong>
                          <span className="block text-[11px] text-gray400 mt-0.5">{m.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center px-4.5 py-2 rounded-lg text-[13px] font-bold bg-grad-main text-white shadow-blueGlow hover:-translate-y-0.5 transition-transform flex-shrink-0"
          >
            {t.nav.cta}
          </a>

          <button className="lg:hidden ms-auto text-gray800" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray200"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-semibold text-gray600">
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-2 text-center py-3 rounded-lg bg-grad-main text-white text-sm font-bold">
                  {t.nav.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
