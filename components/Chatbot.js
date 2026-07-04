"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { matchIntent, getStarterChips } from "@/lib/chatbot";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray100 rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const { t, lang, isRtl } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => !open && setShowTeaser(true), 4500);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setTyping(true);
      const timer = setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            sender: "bot",
            text: lang === "ar" ? "أهلاً بك! 👋 أنا المساعد الرقمي لنيكسا كور. كيف يمكنني مساعدتك اليوم؟" : "Hey there! 👋 I'm the NexaCore digital assistant. How can I help you today?",
            chips: getStarterChips(t, lang),
          },
        ]);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [open]);

  function respond(userText) {
    setMessages((m) => [...m, { sender: "user", text: userText }]);
    setInput("");
    setTyping(true);
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const result = matchIntent(userText, t, lang);
      setTyping(false);
      setMessages((m) => [...m, { sender: "bot", text: result.text }]);
    }, delay);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    respond(trimmed);
  }

  return (
    <>
      <div className="fixed bottom-6 end-6 z-[70] flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTeaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-[220px] bg-white rounded-2xl rounded-ee-sm shadow-lg2 border border-gray200 px-4 py-3 text-[13px] font-semibold text-gray800 cursor-pointer"
              onClick={() => {
                setOpen(true);
                setShowTeaser(false);
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="absolute -top-2 -start-2 w-5 h-5 rounded-full bg-gray800 text-white flex items-center justify-center text-[10px]"
                aria-label="Dismiss"
              >
                <X size={11} />
              </button>
              {lang === "ar" ? "👋 محتاج مساعدة؟ اسألني أي شيء!" : "👋 Need help? Ask me anything!"}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setOpen((v) => !v);
            setShowTeaser(false);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 rounded-full bg-grad-main shadow-blueGlow flex items-center justify-center text-white"
          aria-label="Chat"
        >
          {!open && (
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan/40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 end-6 z-[70] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray200 flex flex-col overflow-hidden"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="bg-grad-main px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-[14px] leading-tight truncate">
                  {lang === "ar" ? "مساعد نيكسا كور" : "NexaCore Assistant"}
                </div>
                <div className="text-white/75 text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] pulse-dot" />
                  {lang === "ar" ? "متصل الآن" : "Online now"}
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gray50">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col gap-2 ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-grad-main text-white rounded-2xl rounded-ee-sm"
                        : "bg-white border border-gray200 text-gray800 rounded-2xl rounded-es-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.chips && (
                    <div className="flex flex-wrap gap-1.5 max-w-[95%]">
                      {m.chips.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => respond(chip)}
                          className="px-3 py-1.5 rounded-full border border-blue/30 text-blue text-[11.5px] font-semibold hover:bg-blue/5 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex items-start">
                  <TypingDots />
                </div>
              )}
            </div>

            <div className="flex-shrink-0 border-t border-gray200 p-3 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type your message..."}
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-gray50 border border-gray200 text-[13px] text-gray800 focus:outline-none focus:border-blue"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-grad-main text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
                aria-label="Send"
              >
                <Send size={16} className={isRtl ? "-scale-x-100" : ""} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
