"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const initialForm = { firstName: "", lastName: "", email: "", company: "", service: "", message: "" };

export default function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-[10px] text-sm border-[1.5px] border-gray200 bg-gray50 text-gray800 outline-none transition-colors focus:border-blue focus:bg-white focus:shadow-[0_0_0_4px_rgba(24,71,212,.08)]";

  return (
    <section id="contact" className="relative overflow-hidden bg-grad-hero py-24 px-6">
      <div
        className="absolute -top-16 end-0 w-[520px] h-[520px] pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage: "url(/visuals/ai-sphere-glass.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(circle at 60% 40%, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(circle at 60% 40%, black 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <SectionTag>{t.contact.tag}</SectionTag>
          <h2
            className="grad-em font-display font-black text-gray800 text-[28px] sm:text-[42px] leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: `${t.contact.h2a}<br/><em>${t.contact.h2em}</em> ${t.contact.h2b}` }}
          />
          <p className="text-gray600 text-[15px] sm:text-base leading-relaxed mb-9">{t.contact.p}</p>

          <div className="flex flex-col gap-3.5">
            {t.contact.items.map((c) => (
              <div key={c.h} className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray200 shadow-sm2">
                <div className="w-[46px] h-[46px] rounded-xl bg-gray100 flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                <div>
                  <strong className="block text-[13px] font-extrabold text-gray800">{c.h}</strong>
                  <span className="text-[13px] text-gray600">{c.t}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="bg-white rounded-[24px] p-7 sm:p-11 shadow-xl2 border border-gray200 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-14"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-blue/10 border border-blue/30 flex items-center justify-center mb-5"
                >
                  <Check size={28} className="text-blue" />
                </motion.div>
                <p className="text-gray800 font-bold text-lg">{t.contact.success}</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit}>
                <div className="font-display font-extrabold text-[20px] text-gray800 mb-7">{t.contact.formTitle}</div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl1}</label>
                    <input required name="firstName" value={form.firstName} onChange={handleChange} placeholder={t.contact.fi1} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl2}</label>
                    <input required name="lastName" value={form.lastName} onChange={handleChange} placeholder={t.contact.fi2} className={inputClass} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl3}</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder={t.contact.fi3} className={inputClass} />
                </div>

                <div className="mb-4">
                  <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl4}</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder={t.contact.fi4} className={inputClass} />
                </div>

                <div className="mb-4">
                  <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl5}</label>
                  <select required name="service" value={form.service} onChange={handleChange} className={inputClass}>
                    {t.contact.services.map((s, i) => (
                      <option key={s} value={i === 0 ? "" : s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-[13px] font-bold text-gray800 mb-1.5">{t.contact.fl6}</label>
                  <textarea required rows={4} name="message" value={form.message} onChange={handleChange} placeholder={t.contact.fi6} className={inputClass} />
                </div>

                {status === "error" && (
                  <p className="mb-4 text-sm text-red-600 font-semibold">
                    {lang === "ar" ? "حدث خطأ، حاول مرة أخرى." : "Something went wrong, please try again."}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl text-[15px] font-bold bg-grad-main text-white shadow-blueGlow disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> {t.contact.submitting}
                    </>
                  ) : (
                    t.contact.submit
                  )}
                </motion.button>
                <p className="text-center text-xs text-gray400 mt-3">{t.contact.note}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
