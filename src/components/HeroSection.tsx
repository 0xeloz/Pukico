import React, { useState, useRef } from 'react';
import { PhoneMockup } from './PhoneMockup';
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

  const checkCountRef = useRef(0);

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
            {/* Plain text kicker with green dot, no box */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#5B6577] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" aria-hidden="true" />
              <span>Lagi waitlist · Beta di Base Sepolia (testnet)</span>
            </div>

            {/* H1 - font-weight 700, tracking-tight, with #0052FF highlight */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0B0D] leading-[1.15] text-balance">
              Kirim crypto <span className="text-[#0052FF]">semudah kirim duit ke temen</span>.
            </h1>

            {/* Sub */}
            <p className="mt-5 text-base sm:text-lg text-[#3B4455] leading-relaxed max-w-xl">
              Gak perlu hafalin alamat 0x yang panjangnya kayak kode rahasia. Cukup pakai Pukico ID, contohnya @andika, beres.
            </p>

            {/* Interactive ID Checker */}
            <div className="mt-8 w-full max-w-lg">
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
                      spellCheck="false"
                      className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DBE6FF] text-[#3B4455] placeholder:text-[#5B6577]/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                      aria-label="Ketik Pukico ID yang mau dicek"
                    />
                  </div>

                  {status === 'available' ? (
                    <button
                      type="button"
                      onClick={handleClaim}
                      className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] text-white text-sm font-semibold transition-colors flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      Amanin @{checkedId}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'checking'}
                      className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      {status === 'checking' ? 'Mengecek...' : 'Cek ID kamu'}
                    </button>
                  )}
                </div>
              </form>

              {/* Status Message */}
              {statusMsg && (
                <div
                  className={`mt-3 text-xs sm:text-sm font-medium rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 border ${
                    status === 'available'
                      ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                      : status === 'taken'
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                  }`}
                  role="status"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        status === 'available'
                          ? 'bg-[#10B981]'
                          : status === 'taken'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#EF4444]'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{statusMsg}</span>
                  </div>
                  {status === 'available' && (
                    <button
                      type="button"
                      onClick={handleClaim}
                      className="text-xs font-bold underline hover:no-underline text-[#047857] shrink-0"
                    >
                      Klaim sekarang &darr;
                    </button>
                  )}
                </div>
              )}

              {/* Small fine-print text below input */}
              <p className="mt-3 text-xs text-[#5B6577] leading-relaxed">
                ID yang kamu amanin di waitlist dikunci buat kamu pas beta dibuka. Tapi klaim finalnya tetap lewat proses resmi di aplikasi.
              </p>
            </div>
          </div>

          {/* Right Column: HTML/CSS Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
