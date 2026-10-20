import React from 'react';

export const WhySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Asymmetric left: visual contrast between 0x and @username */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            {/* The stressful 0x address block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Cara lama</span>
                <span className="text-red-500 font-medium">Bikin cemas</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-800 break-all p-3 bg-white rounded-xl border border-slate-200 select-all">
                0x7a3Fd49A6E941bFc392390Ab9D2C91B48E18c91B
              </p>
              <p className="text-[11px] text-slate-600">
                Salah satu huruf/angka = transaksi gagal atau aset hilang permanen.
              </p>
            </div>

            {/* The effortless Pukico way */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Cara Pukico</span>
                <span className="text-emerald-700 font-medium">Jelas &amp; manusiawi</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#BAE6FD] flex items-center justify-between">
                <span className="font-bold text-base sm:text-lg text-[#0F172A]">@andika</span>
                <span className="text-xs font-medium text-slate-600 bg-sky-50 px-2 py-0.5 rounded border border-[#BAE6FD]/70">
                  Andika Pratama
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Ketik nama temenmu, sistem yang cocokin ke alamat aslinya.
              </p>
            </div>
          </div>

          {/* Asymmetric right: the copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Alamat wallet itu serem.
            </h2>
            <div className="mt-5 space-y-4 text-base sm:text-lg text-[#1E293B]/85 leading-relaxed">
              <p>
                Bayangin harus ngetik 0x7a3F...c91B tiap mau transfer. Salah satu karakter aja, aset bisa nyasar dan gak bisa balik. Wajar banyak orang males mulai.
              </p>
              <p className="font-medium text-[#0F172A]">
                Di Pukico, kamu cukup ketik @username. Kami cariin alamat aslinya, lalu kamu cek dulu sebelum kirim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
