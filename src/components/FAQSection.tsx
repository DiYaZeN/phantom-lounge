import React, { useState } from 'react';
import { FAQS } from '../data/phantomData';
import { MauriDivider } from './MauriPatterns';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-900/60 overflow-hidden">
      <MauriDivider label="FREQUENT INQUIRIES" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            Everything You Need To Know
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full glass-pill text-mauri-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
