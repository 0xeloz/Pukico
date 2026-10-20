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
  const [submittedWithId, setSubmittedWithId] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const backendReady = isBackendConfigured();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkCountRef = useRef(0);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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

    const reqId = ++checkCountRef.current;
    setIdStatus('checking');
    setIdMessage('Mengecek ketersediaan...');

    debounceTimerRef.current = setTimeout(async () => {
      const res = await checkUsernameApi(clean);
      if (reqId !== checkCountRef.current) {
        return; // stale request
      }
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

  // Sync when initialId is updated from Hero
  useEffect(() => {
    if (initialId) {
      const clean = sanitizeUsername(initialId);
      setDesiredId(clean);
      triggerIdCheck(clean);
    }
  }, [initialId, backendReady]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = sanitizeUsername(raw);
    setDesiredId(clean);
    setSubmitError('');
    checkCountRef.current += 1;
    triggerIdCheck(clean);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Honeypot check: kalau terisi, tampilkan state sukses palsu langsung tanpa memanggil API
    if (websiteHoneypot && websiteHoneypot.trim().length > 0) {
      setSubmittedWithId(Boolean(desiredId.trim()));
      setIsSuccess(true);
      return;
    }

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
      setSubmittedWithId(Boolean(cleanId));
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
    <section id="waitlist" className="py-16 sm:py-24 bg-[#0052FF] scroll-mt-16 text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Masuk waitlist, amanin ID kamu.
          </h2>
        </div>

        <div className="rounded-2xl p-6 sm:p-10 bg-white border border-[#DBE6FF] text-[#3B4455]">
          {isSuccess ? (
            /* Success State */
            <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#3B4455] space-y-3">
              <h3 className="text-lg font-bold text-[#047857]">
                Udah masuk.
              </h3>
              <p className="text-sm sm:text-base text-[#3B4455] leading-relaxed">
                Kamu bakal kami kabarin pas beta dibuka. Biar gak ketinggalan, gabung Discord-nya sekarang.
              </p>
              {!submittedWithId && (
                <p className="text-sm text-[#5B6577] leading-relaxed">
                  Kamu belum amanin Pukico ID. Masih bisa kok: isi form ini lagi pakai email yang sama plus ID incaran kamu.
                </p>
              )}
              {DISCORD_INVITE_URL && (
                <div className="pt-2">
                  <a
                    href={DISCORD_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] text-white text-sm font-semibold transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                  >
                    Gabung Discord
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-5">
              {!backendReady && (
                <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#B45309]">
                  <p className="font-semibold">Perhatian:</p>
                  <p className="mt-0.5">
                    Konfigurasi backend belum diset di environment variables. Form tidak dapat mengirim data live.
                  </p>
                </div>
              )}

              {/* Email field (wajib) */}
              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-semibold text-[#3B4455]">
                  Email <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="kamu@email.com"
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="send"
                  className="mt-1.5 w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-white border border-[#DBE6FF] text-[#3B4455] placeholder:text-[#5B6577]/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                />
              </div>

              {/* Desired ID field (opsional) */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="waitlist-id" className="block text-xs font-semibold text-[#3B4455]">
                    Pukico ID incaran <span className="text-[#5B6577] font-normal">(opsional)</span>
                  </label>
                  {idStatus === 'checking' && (
                    <span className="text-xs text-[#5B6577]">Mengecek...</span>
                  )}
                </div>

                <div className="relative mt-1.5">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#5B6577] font-semibold text-sm pointer-events-none select-none"
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
                    autoComplete="off"
                    enterKeyHint="go"
                    spellCheck="false"
                    className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DBE6FF] text-[#3B4455] placeholder:text-[#5B6577]/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                  />
                </div>

                {/* ID live check feedback */}
                {idMessage && (
                  <p
                    className={`mt-1.5 text-xs font-medium ${
                      idStatus === 'available'
                        ? 'text-[#047857]'
                        : idStatus === 'taken'
                        ? 'text-[#B45309]'
                        : 'text-[#B91C1C]'
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
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
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
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] disabled:bg-[#0052FF]/40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
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
