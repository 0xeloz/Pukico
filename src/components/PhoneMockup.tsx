import React from 'react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Device frame - flat with thin border, no shadow */}
      <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-[32px] p-3 bg-white border border-[#DBE6FF]">
        {/* Screen inner container */}
        <div className="relative rounded-[22px] bg-[#FAFCFF] border border-slate-100 overflow-hidden pt-5 pb-5 px-4 text-[#3B4455]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold tracking-tight text-[#0A0B0D]">Pukico</span>
            <span className="text-[10px] font-medium text-[#5B6577] bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              Base Sepolia
            </span>
          </div>

          {/* Screen Content: Send Screen */}
          <div className="mt-4 space-y-3.5">
            <div>
              <p className="text-[11px] font-medium text-[#5B6577]">Kirim ke</p>
              <div className="mt-1.5 p-2.5 rounded-xl bg-[#EEF4FF] border border-[#DBE6FF] flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0052FF] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    A
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#0A0B0D] truncate">@andika</p>
                    <p className="text-[10px] font-mono text-[#5B6577] truncate">0x7a3F...c91B</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] shrink-0">
                  ID ketemu
                </span>
              </div>
            </div>

            {/* Amount input block */}
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-medium text-[#5B6577]">Jumlah kirim</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-bold tracking-tight text-[#0A0B0D] tabular-nums">15.00</span>
                <span className="text-xs font-bold text-[#0052FF]">USDC</span>
              </div>
              <p className="text-[10px] text-[#5B6577] mt-0.5">Testnet token (tidak bernilai asli)</p>
            </div>

            {/* Transaction breakdown */}
            <div className="space-y-1.5 px-1 text-[11px] text-[#5B6577]">
              <div className="flex justify-between">
                <span>Biaya gas</span>
                <span className="font-mono text-[#3B4455] tabular-nums">~0.00004 ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Jaringan</span>
                <span className="font-medium text-[#3B4455]">Base Sepolia</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                <span className="font-semibold text-[#3B4455]">Status</span>
                <span className="text-[10px] font-semibold text-[#047857]">Siap dikonfirmasi</span>
              </div>
            </div>

            {/* CTA inside app */}
            <button
              type="button"
              disabled
              className="w-full h-11 rounded-xl bg-[#0052FF] text-white font-medium text-xs flex items-center justify-center cursor-default tracking-wide"
            >
              Konfirmasi &amp; Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Required label */}
      <p className="text-xs text-[#5B6577] mt-3 text-center">
        Ilustrasi tampilan, bukan data asli
      </p>
    </div>
  );
};
