import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Amanin Pukico ID',
    desc: 'Pilih username kamu. Sekali diklaim, gak bisa diganti atau dihapus.',
  },
  {
    number: '02',
    title: 'Masuk pakai email',
    desc: 'Dompet kamu dibuat lewat Privy. Kami gak nyimpen private key kamu di database kami.',
  },
  {
    number: '03',
    title: 'Kirim dan terima pakai @',
    desc: 'Alamat 0x tetap ada kalau kamu butuh buat kirim dari atau ke wallet lain.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-[#F0F9FF]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Cara kerjanya
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tiga langkah simpel tanpa perlu paham teknis blockchain yang rumit.
          </p>
        </div>

        {/* 3 vertical steps with large numbers, no icons */}
        <div className="mt-12 space-y-6 sm:space-y-8 max-w-3xl">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#BAE6FD] shadow-sm flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8 transition-shadow hover:shadow-md"
            >
              <div className="font-extrabold text-4xl sm:text-5xl text-[#38BDF8] tabular-nums shrink-0 select-none">
                {step.number}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1E293B]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
