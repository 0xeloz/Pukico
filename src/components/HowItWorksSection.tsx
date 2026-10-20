import React from 'react';
import { Reveal } from './Reveal';

const steps = [
  {
    number: '1',
    title: 'Amanin Pukico ID',
    desc: 'Pilih username kamu. Sekali diklaim, gak bisa diganti atau dihapus.',
  },
  {
    number: '2',
    title: 'Masuk pakai email',
    desc: 'Dompet kamu dibuat lewat Privy. Kami gak nyimpen private key kamu di database kami.',
  },
  {
    number: '3',
    title: 'Kirim dan terima pakai @',
    desc: 'Alamat 0x tetap ada kalau kamu butuh buat kirim dari atau ke wallet lain.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-[#DBE6FF] bg-[#EEF4FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0B0D] tracking-tight">
            Cara kerjanya
          </h2>
        </Reveal>

        {/* List separated by thin hairline border, small numbers in #0052FF */}
        <div className="divide-y divide-[#DBE6FF] border-y border-[#DBE6FF] max-w-3xl">
          {steps.map((step, idx) => (
            <Reveal
              key={step.number}
              delay={idx * 70}
              className="py-6 flex items-start gap-5 sm:gap-6"
            >
              <span className="text-lg font-bold text-[#0052FF] tabular-nums shrink-0 pt-0.5">
                {step.number}
              </span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#0A0B0D]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3B4455] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
