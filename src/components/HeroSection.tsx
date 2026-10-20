import React, { useState, useRef, useEffect } from 'react';
import { ProductPreview } from './ProductPreview';
import { Reveal } from './Reveal';
import { sanitizeUsername, validateUsernameLocally, checkUsernameApi } from '../services/api';
import { isBackendConfigured } from '../config';

interface HeroSectionProps {
  onClaimId: (id: string) => void;
}

type CheckStatus = 'idle' | 'checking' | 'available' | 'taken' | 'format_error' | 'server_error';

export const HeroSection: React.FC<HeroSectionProps> = ({ onClaimId }) => {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<CheckStatus>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [checkedId, setCheckedId] = useState('');

  // Retain last non-empty message and status so text stays intact while animating closed
  const [lastStatusMsg, setLastStatusMsg] = useState('');
  const [lastStatus, setLastStatus] = useState<CheckStatus>('idle');

  const checkCountRef = useRef(0);

  useEffect(() => {
    if (statusMsg) {
      setLastStatusMsg(statusMsg);
      setLastStatus(status);
    }
  }, [statusMsg, status]);

  const isStatusOpen = Boolean(statusMsg);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeUsername(raw);
    setInputVal(clean);
    // Invalidate in-flight checks and reset status
    checkCountRef.current += 1;
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMsg('');
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sanitizeUsername(inputVal);

    if (!clean) {
      setStatus('format_error');
      setStatusMsg('Masukkan Pukico ID yang mau kamu cek.');
      return;
    }

    const localVal = validateUsernameLocally(clean);
    if (!localVal.valid) {
      setStatus('format_error');
      setStatusMsg('Format salah. Hanya boleh huruf kecil (a-z), angka (0-9), dan garis bawah (_), 3-20 karakter.');
      return;
    }

    if (!isBackendConfigured()) {
      setStatus('server_error');
      setStatusMsg('Konfigurasi backend (SUPABASE_URL) belum diatur di environment.');
      return;
    }

    const reqId = ++checkCountRef.current;
    setStatus('checking');
    setStatusMsg('');

    const res = await checkUsernameApi(clean);
    if (reqId !== checkCountRef.current) {
      return; // stale response
    }

    setCheckedId(clean);

    if (res.available) {
      setStatus('available');
      setStatusMsg(`@${clean} tersedia!`);
    } else if (res.reason === 'taken' || res.reason === 'reserved') {
      setStatus('taken');
      setStatusMsg(`@${clean} udah diambil, coba yang lain`);
    } else if (res.reason === 'format') {
      setStatus('format_error');
      setStatusMsg(res.errorMessage || 'Format salah. Hanya boleh huruf kecil, angka, dan garis bawah (_), 3-20 karakter.');
    } else {
      setStatus('server_error');
      setStatusMsg(res.errorMessage || 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.');
    }
  };

  const handleClaim = () => {
    if (checkedId) {
      onClaimId(checkedId);
    }
  };

  return (
    <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Interactive Check */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Plain text kicker with green dot, no box - Reveal delay 0 */}
            <Reveal delay={0}>
              <div className="flex items-center gap-2 text-xs font-medium text-[#5B6577] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" aria-hidden="true" />
                <span>Lagi waitlist · Beta di Base Sepolia (testnet)</span>
              </div>
            </Reveal>

            {/* H1 - font-weight 700, tracking-tight, with #0052FF highlight - Reveal delay 80 */}
            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0B0D] leading-[1.15] text-balance">
                Kirim crypto <span className="text-[#0052FF]">semudah kirim duit ke temen</span>.
              </h1>
            </Reveal>

            {/* Sub - Reveal delay 160 */}
            <Reveal delay={160}>
              <p className="mt-5 text-base sm:text-lg text-[#3B4455] leading-relaxed max-w-xl">
                Gak perlu hafalin alamat 0x yang panjangnya kayak kode rahasia. Cukup pakai Pukico ID, contohnya @andika, beres.
              </p>
            </Reveal>

            {/* Interactive ID Checker - Reveal delay 240 */}
            <Reveal delay={240} className="w-full max-w-lg mt-8">
              <form onSubmit={status === 'available' ? (e) => { e.preventDefault(); handleClaim(); } : handleCheck}>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#5B6577] font-semibold text-base pointer-events-none select-none"
                    >
                      @
                    </span>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={handleInputChange}
                      placeholder="andika"
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      enterKeyHint="go"
                      spellCheck="false"
                      className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DBE6FF] text-[#3B4455] placeholder:text-[#5B6577]/60 text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                      aria-label="Ketik Pukico ID yang mau dicek"
                    />
                  </div>

                  {status === 'available' ? (
                    <button
                      type="button"
                      onClick={handleClaim}
                      className="btn min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] text-white text-sm font-semibold flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      Amanin @{checkedId}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'checking'}
                      className="btn min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] disabled:bg-[#0052FF]/40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      {status === 'checking' ? 'Mengecek...' : 'Cek ID kamu'}
                    </button>
                  )}
                </div>
              </form>

              {/* Status Message - Always rendered in DOM, smooth grid-template-rows expansion */}
              <div
                role="status"
                aria-live="polite"
                className={`grid transition-[grid-template-rows] duration-[250ms] ${
                  isStatusOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
                style={{
                  transitionTimingFunction: 'var(--ease-out)',
                }}
              >
                <div className="overflow-hidden">
                  <div
                    style={{
                      transitionTimingFunction: 'var(--ease-out)',
                    }}
                    className={`mt-3 text-xs sm:text-sm font-medium rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 border transition-[opacity,transform] duration-[200ms] ${
                      isStatusOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'
                    } ${
                      lastStatus === 'available'
                        ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                        : lastStatus === 'taken'
                        ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          lastStatus === 'available'
                            ? 'bg-[#10B981]'
                            : lastStatus === 'taken'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#EF4444]'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{lastStatusMsg}</span>
                    </div>
                    {lastStatus === 'available' && (
                      <button
                        type="button"
                        onClick={handleClaim}
                        className="btn text-xs font-bold underline hover:no-underline text-[#047857] shrink-0"
                      >
                        Klaim sekarang &darr;
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Small fine-print text below input */}
              <p className="mt-3 text-xs text-[#5B6577] leading-relaxed">
                ID yang kamu amanin di waitlist dikunci buat kamu. Klaim finalnya tetap lewat proses resmi di Pukico pas beta dibuka.
              </p>
            </Reveal>
          </div>

          {/* Right Column: ProductPreview with Reveal delay 320 */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0 w-full">
            <Reveal delay={320} className="w-full flex justify-center lg:justify-end">
              <ProductPreview />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
