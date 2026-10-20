import React, { useState } from 'react';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeUsername(raw);
    setInputVal(clean);
    // Reset status when user starts typing again
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

    setStatus('checking');
    setStatusMsg('');

    const res = await checkUsernameApi(clean);
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
    <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      {/* Very subtle background light sky gradient wash */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(186,230,253,0.35),rgba(255,255,255,0))]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Interactive Check */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Badge / Kicker */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-semibold text-slate-700 mb-5">
              <span>Lagi waitlist</span>
              <span className="text-[#38BDF8]" aria-hidden="true">·</span>
              <span>Beta di Base Sepolia (testnet)</span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15] text-balance">
              Kirim crypto semudah kirim duit ke temen.
            </h1>

            {/* Sub */}
            <p className="mt-5 text-base sm:text-lg text-[#1E293B]/85 leading-relaxed max-w-xl">
              Gak perlu hafalin alamat 0x yang panjangnya kayak kode rahasia. Cukup pakai Pukico ID, contohnya @andika, beres.
            </p>

            {/* Interactive ID Checker */}
            <div className="mt-8 w-full max-w-lg">
              <form onSubmit={status === 'available' ? (e) => { e.preventDefault(); handleClaim(); } : handleCheck}>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-semibold text-base pointer-events-none select-none"
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
                      className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#BAE6FD] text-[#0F172A] placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all shadow-sm"
                      aria-label="Ketik Pukico ID yang mau dicek"
                    />
                  </div>

                  {status === 'available' ? (
                    <button
                      type="button"
                      onClick={handleClaim}
                      className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
                    >
                      Amanin @{checkedId}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'checking'}
                      className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
                    >
                      {status === 'checking' ? 'Mengecek...' : 'Cek ID kamu'}
                    </button>
                  )}
                </div>
              </form>

              {/* Status Message */}
              {statusMsg && (
                <div
                  className={`mt-3 text-xs sm:text-sm font-medium rounded-lg px-3 py-2 flex items-center justify-between gap-2 ${
                    status === 'available'
                      ? 'bg-emerald-50 text-[#10B981] border border-emerald-200'
                      : status === 'taken'
                      ? 'bg-amber-50 text-[#F59E0B] border border-amber-200'
                      : 'bg-red-50 text-[#EF4444] border border-red-200'
                  }`}
                  role="status"
                >
                  <span>{statusMsg}</span>
                  {status === 'available' && (
                    <button
                      type="button"
                      onClick={handleClaim}
                      className="text-xs font-bold underline hover:no-underline text-emerald-800 shrink-0"
                    >
                      Klaim sekarang &darr;
                    </button>
                  )}
                </div>
              )}

              {/* Small fine-print text below input */}
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
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
