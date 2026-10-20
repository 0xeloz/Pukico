import React from 'react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Device frame */}
      <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-[36px] p-3 bg-white border border-[#BAE6FD] shadow-[0_20px_50px_-15px_rgba(14,165,233,0.15)] ring-1 ring-slate-900/5">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20" />

        {/* Screen inner container */}
        <div className="relative rounded-[26px] bg-[#FAFCFF] border border-slate-100 overflow-hidden pt-8 pb-5 px-4 text-[#0F172A]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold tracking-tight text-slate-800">Pukico</span>
            <span className="text-[10px] font-medium text-slate-500 bg-sky-50 px-2 py-0.5 rounded-md border border-[#BAE6FD]/60">
              Base Sepolia
            </span>
          </div>

          {/* Screen Content: Send Screen */}
          <div className="mt-4 space-y-3.5">
            <div>
              <p className="text-[11px] font-medium text-slate-600">Kirim ke</p>
              <div className="mt-1.5 p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    A
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#0F172A] truncate">@andika</p>
                    <p className="text-[10px] font-mono text-slate-500 truncate">0x7a3F...c91B</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  Terverifikasi
                </span>
              </div>
            </div>

            {/* Amount input block */}
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-medium text-slate-600">Jumlah kirim</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-bold tracking-tight text-[#0F172A] tabular-nums">15.00</span>
                <span className="text-xs font-bold text-[#0EA5E9]">USDC</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Testnet token (tidak bernilai asli)</p>
            </div>

            {/* Transaction breakdown */}
            <div className="space-y-1.5 px-1 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>Biaya gas</span>
                <span className="font-mono text-slate-700 tabular-nums">~0.00004 ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Jaringan</span>
                <span className="font-medium text-slate-700">Base Sepolia</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-800">Status</span>
                <span className="text-[10px] font-semibold text-emerald-600">Siap dikonfirmasi</span>
              </div>
            </div>

            {/* CTA inside app */}
            <button
              type="button"
              disabled
              className="w-full h-11 rounded-xl bg-[#0EA5E9] text-white font-medium text-xs shadow-sm flex items-center justify-center cursor-default tracking-wide"
            >
              Konfirmasi &amp; Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Required label */}
      <p className="text-xs text-slate-600 mt-3 text-center">
        Ilustrasi tampilan, bukan data asli
      </p>
    </div>
  );
};
