import React from 'react';

const honestPoints = [
  'Ini masih testnet. Semua aset di beta gak ada nilai uang aslinya.',
  'Transaksi blockchain tetap ada biaya jaringan (gas).',
  'Transaksi bisa agak lama, bahkan bisa gagal. Makanya kami tampilin statusnya jelas.',
  'Namanya juga beta, bakal ada bug. Laporin di Discord, kami baca.',
];

export const HonestSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl p-6 sm:p-10 bg-[#EEF4FF] border border-[#DBE6FF]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A0B0D] tracking-tight">
            Jujur dulu ya
          </h2>
          <p className="mt-2 text-sm text-[#5B6577]">
            Sebelum daftar, kamu perlu tau ini:
          </p>

          <ul className="mt-6 space-y-3.5">
            {honestPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm sm:text-base text-[#3B4455] leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] mt-2.5 shrink-0" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
