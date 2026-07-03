"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content } from "./content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", content[lang].dir);
  }, [lang]);

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
