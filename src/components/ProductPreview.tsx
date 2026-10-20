import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const FULL_HANDLE = '@andika';

export const ProductPreview: React.FC = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [typedHandle, setTypedHandle] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const animationStarted = useRef(false);

  useEffect(() => {
    // If reduced motion is requested, show final state immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedHandle(FULL_HANDLE);
      setShowAddress(true);
      setShowChip(true);
      setButtonActive(true);
      return;
    }

    if (isInView && !animationStarted.current) {
      animationStarted.current = true;

      // 1. Type letter by letter (60ms each)
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        charIndex += 1;
        setTypedHandle(FULL_HANDLE.slice(0, charIndex));
        if (charIndex >= FULL_HANDLE.length) {
          clearInterval(typeInterval);

          // 2. Address fade in
          setTimeout(() => {
            setShowAddress(true);
          }, 120);

          // 3. Chip fade and scale (0.96 to 1)
          setTimeout(() => {
            setShowChip(true);
          }, 350);

          // 4. Button opacity rises from 0.5 to 1
          setTimeout(() => {
            setButtonActive(true);
          }, 650);
        }
      }, 60);

      return () => {
        clearInterval(typeInterval);
      };
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full flex flex-col items-center">
      {/* Panel container: rounded-3xl, #EEF4FF, p-5 (mobile) / p-8 (desktop) */}
      <div className="w-full max-w-[360px] sm:max-w-md rounded-3xl bg-[#EEF4FF] p-5 sm:p-8 border border-[#DBE6FF]">
        {/* Send Screen Card: pure white, #E5E7EB borders */}
        <div className="rounded-2xl bg-white border border-[#DBE6FF] p-4 sm:p-5 text-[#3B4455]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <span className="text-xs font-bold tracking-tight text-[#0A0B0D]">Pukico</span>
            <span className="text-[10px] font-medium text-[#5B6577] bg-[#F3F4F6] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
              Base Sepolia
            </span>
          </div>

          {/* Screen Content */}
          <div className="mt-4 space-y-3.5">
            <div>
              <p className="text-[11px] font-medium text-[#5B6577]">Kirim ke</p>
              <div className="mt-1.5 p-2.5 rounded-xl bg-[#EEF4FF] border border-[#DBE6FF] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#0052FF] text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    A
                  </div>
                  <div className="truncate">
                    {/* Reserved height & width for handle so no layout shift occurs */}
                    <div className="h-4 flex items-center">
                      <p className="text-xs font-bold text-[#0A0B0D] truncate">
                        {typedHandle || '\u00A0'}
                      </p>
                    </div>
                    {/* Resolved address fade-in */}
                    <div className="h-3 flex items-center">
                      <p
                        style={{
                          transitionProperty: 'opacity',
                          transitionDuration: 'var(--dur-base, 300ms)',
                          transitionTimingFunction: 'var(--ease-out)',
                        }}
                        className={`text-[10px] font-mono text-[#5B6577] truncate ${
                          showAddress ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        0x7a3F...c91B
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chip fade & scale 0.96 to 1 */}
                <div className="shrink-0 h-6 flex items-center">
                  <span
                    style={{
                      transitionProperty: 'opacity, transform',
                      transitionDuration: 'var(--dur-base, 300ms)',
                      transitionTimingFunction: 'var(--ease-out)',
                    }}
                    className={`text-[10px] font-medium text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] ${
                      showChip
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-[0.96]'
                    }`}
                  >
                    ID ketemu
                  </span>
                </div>
              </div>
            </div>

            {/* Amount input block */}
            <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
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
              <div className="flex justify-between items-center pt-1 border-t border-[#E5E7EB]">
                <span className="font-semibold text-[#3B4455]">Status</span>
                <span className="text-[10px] font-semibold text-[#047857]">Siap dikonfirmasi</span>
              </div>
            </div>

            {/* CTA inside preview */}
            <button
              type="button"
              disabled
              style={{
                transitionProperty: 'opacity',
                transitionDuration: 'var(--dur-base, 300ms)',
                transitionTimingFunction: 'var(--ease-out)',
              }}
              className={`w-full h-11 rounded-xl bg-[#0052FF] text-white font-medium text-xs flex items-center justify-center cursor-default tracking-wide ${
                buttonActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              Konfirmasi &amp; Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Required label below */}
      <p className="text-xs text-[#5B6577] mt-3 text-center">
        Ilustrasi tampilan Pukico di browser, bukan data asli
      </p>
    </div>
  );
};
