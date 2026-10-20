import React, { useState, useEffect, useRef } from 'react';
import {
  sanitizeUsername,
  validateUsernameLocally,
  checkUsernameApi,
  joinWaitlistApi,
  EMAIL_REGEX,
} from '../services/api';
import { isBackendConfigured, DISCORD_INVITE_URL } from '../config';

interface WaitlistSectionProps {
  initialId?: string;
}

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({ initialId = '' }) => {
  const [email, setEmail] = useState('');
  const [desiredId, setDesiredId] = useState(initialId);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  // ID validation & live check state
  const [idStatus, setIdStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'format_error'>('idle');
  const [idMessage, setIdMessage] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const backendReady = isBackendConfigured();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync when initialId is updated from Hero
  useEffect(() => {
    if (initialId) {
      const clean = sanitizeUsername(initialId);
      setDesiredId(clean);
      triggerIdCheck(clean);
    }
  }, [initialId]);

  const triggerIdCheck = (idToTest: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const clean = sanitizeUsername(idToTest);
    if (!clean) {
      setIdStatus('idle');
      setIdMessage('');
      return;
    }

    const localCheck = validateUsernameLocally(clean);
    if (!localCheck.valid) {
      setIdStatus('format_error');
      setIdMessage('Format salah. Hanya boleh huruf kecil (a-z), angka (0-9), dan garis bawah (_), 3-20 karakter.');
      return;
    }

    if (!backendReady) {
      setIdStatus('idle');
      setIdMessage('');
      return;
    }

    setIdStatus('checking');
    setIdMessage('Mengecek ketersediaan...');

    debounceTimerRef.current = setTimeout(async () => {
      const res = await checkUsernameApi(clean);
      if (res.available) {
        setIdStatus('available');
        setIdMessage(`@${clean} tersedia!`);
      } else if (res.reason === 'taken' || res.reason === 'reserved') {
        setIdStatus('taken');
        setIdMessage(`@${clean} udah diambil, coba yang lain`);
      } else if (res.reason === 'format') {
        setIdStatus('format_error');
        setIdMessage(res.errorMessage || 'Format salah. Hanya boleh huruf kecil, angka, dan garis bawah (_).');
      } else {
        setIdStatus('idle');
        setIdMessage('');
      }
    }, 400);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeUsername(raw);
    setDesiredId(clean);
    setSubmitError('');
    triggerIdCheck(clean);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!backendReady) {
      setSubmitError('Lagi ada masalah di sisi kami. Coba lagi bentar ya.');
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setSubmitError('Masukkan alamat email yang valid.');
      return;
    }

    const cleanId = desiredId.trim() ? sanitizeUsername(desiredId) : undefined;
    if (cleanId) {
      const idCheck = validateUsernameLocally(cleanId);
      if (!idCheck.valid) {
        setSubmitError('Format ID salah. Hanya boleh huruf kecil, angka, dan garis bawah (_), 3-20 karakter.');
        return;
      }
      if (idStatus === 'taken') {
        setSubmitError(`@${cleanId} udah diambil orang lain, coba yang lain.`);
        return;
      }
    }

    setIsSubmitting(true);

    const res = await joinWaitlistApi({
      email: cleanEmail,
      desired_id: cleanId,
      website: websiteHoneypot,
    });

    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
    } else {
      if (res.error === 'email_exists') {
        setSubmitError('Email ini udah masuk waitlist, aman.');
      } else if (res.error === 'id_taken' || res.error === 'reserved') {
        setSubmitError(cleanId ? `@${cleanId} udah diambil orang lain, coba yang lain.` : 'ID diambil.');
      } else {
        setSubmitError(res.message || 'Lagi ada masalah di sisi kami. Coba lagi bentar ya.');
      }
    }
  };

  return (
    <section id="waitlist" className="py-16 sm:py-24 border-t border-[#E2E8F0] bg-white scroll-mt-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#BAE6FD] shadow-[0_10px_35px_-10px_rgba(14,165,233,0.1)]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Masuk waitlist, amanin ID kamu.
          </h2>

          {isSuccess ? (
            /* Success State */
            <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Berhasil Terdaftar</span>
              </div>
              <p className="text-base text-slate-800 leading-relaxed font-medium">
                Udah masuk. Kamu bakal kami kabarin pas beta dibuka. Biar gak ketinggalan, gabung Discord-nya sekarang.
              </p>
              <div>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-semibold transition-colors inline-flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
                >
                  Gabung Discord
                </a>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {!backendReady && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  <p className="font-semibold">Perhatian:</p>
                  <p className="mt-0.5">
                    Konfigurasi backend belum diset di environment variables. Form tidak dapat mengirim data live.
                  </p>
                </div>
              )}

              {/* Email field (wajib) */}
              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-semibold text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="kamu@email.com"
                  className="mt-1.5 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#BAE6FD] text-[#0F172A] placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all shadow-sm"
                />
              </div>

              {/* Desired ID field (opsional) */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="waitlist-id" className="block text-xs font-semibold text-slate-700">
                    Pukico ID incaran <span className="text-slate-400 font-normal">(opsional)</span>
                  </label>
                  {idStatus === 'checking' && (
                    <span className="text-xs text-slate-500">Mengecek...</span>
                  )}
                </div>

                <div className="relative mt-1.5">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-semibold text-sm pointer-events-none select-none"
                  >
                    @
                  </span>
                  <input
                    id="waitlist-id"
                    type="text"
                    value={desiredId}
                    onChange={handleIdChange}
                    placeholder="andika"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#BAE6FD] text-[#0F172A] placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all shadow-sm"
                  />
                </div>

                {/* ID live check feedback */}
                {idMessage && (
                  <p
                    className={`mt-1.5 text-xs font-medium ${
                      idStatus === 'available'
                        ? 'text-[#10B981]'
                        : idStatus === 'taken'
                        ? 'text-[#F59E0B]'
                        : 'text-[#EF4444]'
                    }`}
                  >
                    {idMessage}
                  </p>
                )}
              </div>

              {/* Honeypot field (hidden from real users) */}
              <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                <label htmlFor="website-hp">Website</label>
                <input
                  id="website-hp"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              {/* Global Error Banner */}
              {submitError && (
                <div
                  className={`p-3 rounded-xl text-xs sm:text-sm font-medium border ${
                    submitError.includes('udah masuk waitlist')
                      ? 'bg-amber-50 text-[#F59E0B] border-amber-200'
                      : 'bg-red-50 text-[#EF4444] border-red-200'
                  }`}
                  role="alert"
                >
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !backendReady}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
              >
                {isSubmitting ? 'Mengirim data...' : 'Masuk Waitlist'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
