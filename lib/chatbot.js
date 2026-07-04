// Lightweight, no-API "assistant" for the chat widget. Answers are generated
// from the same bilingual content used across the site (lib/content.js) via
// keyword scoring — no external LLM call, no API key, no cost.
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function buildIntents(t, lang) {
  const isAr = lang === "ar";

  return [
    {
      id: "greeting",
      keywords: isAr
        ? ["مرحبا", "اهلا", "أهلا", "السلام عليكم", "هاي", "صباح الخير", "مساء الخير"]
        : ["hi", "hello", "hey", "good morning", "good evening", "salam"],
      respond: () =>
        isAr
          ? "أهلاً بك! 👋 أنا المساعد الرقمي لنيكسا كور. كيف يمكنني مساعدتك اليوم؟"
          : "Hey there! 👋 I'm the NexaCore digital assistant. How can I help you today?",
    },
    {
      id: "thanks",
      keywords: isAr ? ["شكرا", "شكرًا", "يعطيك العافية", "تسلم"] : ["thank", "thanks", "appreciate"],
      respond: () => (isAr ? "العفو! 😊 هل يمكنني مساعدتك في شيء آخر؟" : "You're welcome! 😊 Anything else I can help with?"),
    },
    {
      id: "bye",
      keywords: isAr ? ["مع السلامة", "وداعا", "باي"] : ["bye", "goodbye", "see you"],
      respond: () => (isAr ? "إلى اللقاء! نتمنى أن نتحدث معك قريبًا. 👋" : "Goodbye! Hope to talk again soon. 👋"),
    },
    {
      id: "services",
      keywords: isAr
        ? ["خدمة", "خدمات", "تقدمون", "تعملون", "تصنعون", "تبنون"]
        : ["service", "services", "offer", "provide", "build", "develop", "capabilities", "what do you do"],
      respond: () => {
        const list = t.services.items.map((s) => s.title).join(isAr ? "، " : ", ");
        return isAr
          ? `نقدم مجموعة واسعة من الخدمات: ${list}. أي خدمة تودّ معرفة المزيد عنها؟`
          : `We offer a wide range of services: ${list}. Want details on any of these?`;
      },
      chips: (t) => t.services.items.slice(0, 4).map((s) => s.title),
    },
    {
      id: "pricing",
      keywords: isAr
        ? ["سعر", "اسعار", "أسعار", "تكلفة", "تكاليف", "كم", "ريال", "عرض سعر", "الاسعار"]
        : ["price", "pricing", "cost", "how much", "fee", "budget", "sar", "quote"],
      respond: () => {
        const lines = t.pricing.plans
          .map((p) => `• ${p.name} — ${isAr ? "ابتداءً من" : "from"} ${p.price} ${t.pricing.currency}`)
          .join("\n");
        return isAr
          ? `إليك باقاتنا:\n${lines}\n\nجميع الأسعار لا تشمل ضريبة القيمة المضافة 15%. لدينا أيضًا باقة مخصصة للمؤسسات الكبرى — تواصل معنا لعرض سعر خاص.`
          : `Here are our plans:\n${lines}\n\nAll prices exclude 15% VAT. We also offer a custom Enterprise+ tier for larger organizations — contact us for a tailored quote.`;
      },
    },
    {
      id: "industries",
      keywords: isAr
        ? ["قطاع", "قطاعات", "صناعة", "صناعات", "مجال"]
        : ["industry", "industries", "sector", "sectors", "healthcare", "banking", "government", "retail"],
      respond: () =>
        isAr
          ? `نخدم قطاعات متعددة منها: ${t.industries.items.join("، ")}.`
          : `We serve a wide range of industries including: ${t.industries.items.join(", ")}.`,
    },
    {
      id: "team",
      keywords: isAr
        ? ["فريق", "من انتم", "من أنتم", "الشركة", "عن الشركة", "خبرة", "جنسيات", "من نحن"]
        : ["team", "who are you", "about you", "company", "nationalities", "experience", "years", "about nexacore"],
      respond: () => {
        const statsLine = t.team.stats.map((s) => `${s.n} ${s.l}`).join(isAr ? "، " : ", ");
        return `${stripHtml(t.team.intro)}\n\n${statsLine}`;
      },
    },
    {
      id: "portfolio",
      keywords: isAr
        ? ["أعمال", "اعمال", "مشاريع", "بورتفوليو", "عملاء", "مشروع"]
        : ["portfolio", "projects", "work", "case study", "case studies", "clients", "examples"],
      respond: () =>
        isAr
          ? `من أبرز مشاريعنا: ${t.portfolio.items.map((p) => p.name).join("، ")}.`
          : `Some of our notable projects: ${t.portfolio.items.map((p) => p.name).join(", ")}.`,
    },
    {
      id: "certifications",
      keywords: isAr
        ? ["شهادة", "شهادات", "امتثال", "أيزو", "ايزو", "أمان", "امان"]
        : ["certified", "certification", "certifications", "iso", "soc", "security", "compliant", "compliance"],
      respond: () =>
        isAr
          ? `نلتزم بأعلى معايير الجودة والأمان: ${t.certs.items.map((c) => c.title).join("، ")}.`
          : `We hold and follow leading quality & security standards: ${t.certs.items.map((c) => c.title).join(", ")}.`,
    },
    {
      id: "process",
      keywords: isAr
        ? ["عملية", "كيف تعملون", "خطوات", "منهجية", "طريقة العمل"]
        : ["process", "how do you work", "steps", "methodology", "timeline", "workflow"],
      respond: () => `${t.process.steps.map((s, i) => `${i + 1}. ${s.h}`).join(isAr ? "  " : "  ")}`,
    },
    {
      id: "contact",
      keywords: isAr
        ? ["تواصل", "ايميل", "بريد", "هاتف", "اتصال", "عنوان", "واتساب", "رقم"]
        : ["contact", "email", "phone", "call", "reach", "address", "location", "whatsapp", "number"],
      respond: () => t.contact.items.map((c) => `${c.h}: ${c.t}`).join("\n"),
    },
    // FAQ items become their own intents, keyed off the meaningful words in the question.
    ...t.faq.items.map((f, i) => ({
      id: `faq-${i}`,
      keywords: tokenize(f.q).filter((w) => w.length > 2 && !STOPWORDS.has(w)),
      respond: () => f.a,
    })),
  ];
}

const STOPWORDS = new Set([
  // English
  "the", "a", "an", "is", "are", "you", "your", "for", "and", "of", "to", "do", "does", "what", "how", "we", "our", "this", "that", "with", "from",
  // Arabic
  "من", "في", "على", "الى", "إلى", "هل", "هذا", "هذه", "ما", "كم", "او", "أو", "لدي", "لدينا", "كيف", "التي", "الذي",
]);

function tokenize(str) {
  return str
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export function matchIntent(message, t, lang) {
  const intents = buildIntents(t, lang);
  const normalized = message.toLowerCase().trim();
  const tokens = new Set(tokenize(message));

  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const k = kw.toLowerCase().trim();
      if (!k) continue;
      // Multi-word phrases: substring match is safe (specific enough).
      // Single words: require an exact token match so short/common words
      // (e.g. "and") can't false-positive inside unrelated words (e.g. "random").
      const isPhrase = k.includes(" ");
      const matched = isPhrase ? normalized.includes(k) : tokens.has(k);
      if (matched) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best || bestScore === 0) {
    return {
      text:
        lang === "ar"
          ? "لم أفهم ذلك تمامًا 🤔 يمكنني مساعدتك في: الخدمات، الأسعار، القطاعات، فريقنا، أعمالنا، أو بيانات التواصل. أو تواصل مع فريقنا مباشرة."
          : "I didn't quite catch that 🤔 I can help with: services, pricing, industries, our team, portfolio, or contact details — or you can reach our team directly.",
      fallback: true,
    };
  }

  return { text: best.respond(t), fallback: false };
}

export function getStarterChips(t, lang) {
  return lang === "ar"
    ? ["الخدمات", "الأسعار", "القطاعات", "تواصل معنا"]
    : ["Services", "Pricing", "Industries", "Contact"];
}
