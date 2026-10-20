import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Pukico itu apa sih?',
    a: 'Wallet crypto yang bisa kirim dan terima pakai username, bukan alamat panjang.',
  },
  {
    q: 'Beneran pakai duit?',
    a: 'Belum. Beta cuma di Base Sepolia testnet, asetnya gak ada nilainya.',
  },
  {
    q: 'Pukico ID bisa diganti?',
    a: 'Gak bisa. Sekali diklaim, permanen. Jadi pikirin dulu.',
  },
  {
    q: 'Kalau ganti HP, dompetku hilang?',
    a: 'Kamu bisa pulihin lewat login dan mekanisme pemulihan Privy. Kami bakal uji ini serius di beta.',
  },
  {
    q: 'Kapan beta dibuka?',
    a: 'Belum ada tanggal pasti. Kabar terbaru kami taruh di Discord.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-[#F0F9FF]/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Pertanyaan yang sering ditanya
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-[#BAE6FD] overflow-hidden transition-all shadow-sm"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[52px] px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#0EA5E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0EA5E9] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0EA5E9]' : 'text-slate-500'
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#1E293B]/85 leading-relaxed border-t border-slate-100"
                  >
                    <p>{faq.a}</p>
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
