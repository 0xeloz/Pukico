import React from 'react';

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
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-[#F0F9FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3D51] tracking-tight">
            Cara kerjanya
          </h2>
        </div>

        {/* List separated by thin hairline border, small navy numbers 1 2 3 */}
        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0] max-w-3xl">
          {steps.map((step) => (
            <div
              key={step.number}
              className="py-6 flex items-start gap-5 sm:gap-6"
            >
              <span className="text-lg font-bold text-[#2C3D51] tabular-nums shrink-0 pt-0.5">
                {step.number}
              </span>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#2C3D51]">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
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
