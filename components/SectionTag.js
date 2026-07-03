"use client";

export default function SectionTag({ children, center = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-display font-bold text-[12px] uppercase tracking-widest text-blue mb-4 ${center ? "justify-center" : ""}`}
    >
      <span className="w-5 h-0.5 bg-grad-main rounded-full" />
      {children}
    </div>
  );
}
