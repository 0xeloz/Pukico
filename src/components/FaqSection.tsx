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
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C3D51] tracking-tight">
            Yang sering ditanyain
          </h2>
        </div>

        {/* Separated by thin lines instead of cards */}
        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div key={faq.q} className="py-2">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[52px] py-4 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#2C3D51] hover:text-[#22303F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded-md transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className="text-xl font-bold text-[#2C3D51] shrink-0 w-6 text-center select-none"
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 pt-1 text-sm sm:text-base text-[#334155] leading-relaxed"
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
