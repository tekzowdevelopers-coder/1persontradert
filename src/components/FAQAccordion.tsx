"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/data";

interface FAQAccordionProps {
  limit?: number;
}

export default function FAQAccordion({ limit }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayedFaqs = limit ? FAQS.slice(0, limit) : FAQS;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {displayedFaqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all ${
              isOpen
                ? "border-brand-green/40 bg-white shadow-card"
                : "border-slate-200 bg-white/80 hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-brand-green rounded-2xl"
            >
              <span className="text-base font-bold text-brand-dark flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-brand-green shrink-0" />
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180 text-brand-green" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm text-brand-subtle leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
