import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import {
  sanitizeUsername,
  validateUsernameLocally,
  checkUsernameApi,
  joinWaitlistApi,
  EMAIL_REGEX,
  JoinWaitlistErrorType,
} from '../services/api';
import { isBackendConfigured, DISCORD_INVITE_URL } from '../config';
import { useT } from '../i18n';

interface WaitlistSectionProps {
  initialId?: string;
}

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({ initialId = '' }) => {
  const { t, format } = useT();
  const [email, setEmail] = useState('');
  const [desiredId, setDesiredId] = useState(initialId);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  // ID validation & live check state
  const [idStatus, setIdStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'format_error'>('idle');
  const [idMessage, setIdMessage] = useState('');
  const [checkedId, setCheckedId] = useState('');

  // Retain last ID feedback message and status for smooth collapsing transition
  const [lastIdMessage, setLastIdMessage] = useState('');
  const [lastIdStatus, setLastIdStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'format_error'>('idle');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedWithId, setSubmittedWithId] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitErrorCode, setSubmitErrorCode] = useState<JoinWaitlistErrorType | null>(null);

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

  useEffect(() => {
    if (idMessage) {
      setLastIdMessage(idMessage);
      setLastIdStatus(idStatus);
    }
  }, [idMessage, idStatus]);

  // Update messages when language changes
  useEffect(() => {
    if (idStatus === 'available' && checkedId) {
      setIdMessage(format(t.hero.available, { id: checkedId }));
    } else if (idStatus === 'taken' && checkedId) {
      setIdMessage(format(t.hero.taken, { id: checkedId }));
    } else if (idStatus === 'format_error') {
      setIdMessage(t.waitlist.errors.invalidId);
    } else if (idStatus === 'checking') {
      setIdMessage(t.waitlist.checking);
    }

    if (submitErrorCode) {
      const cleanId = desiredId.trim() ? sanitizeUsername(desiredId) : undefined;
      if (submitErrorCode === 'email_exists') {
        setSubmitError(t.waitlist.errors.emailExists);
      } else if (submitErrorCode === 'id_taken' || submitErrorCode === 'reserved') {
        setSubmitError(
          cleanId ? format(t.waitlist.errors.idTaken, { id: cleanId }) : t.waitlist.errors.idTakenFallback
        );
      } else if (submitErrorCode === 'invalid_email') {
        setSubmitError(t.waitlist.errors.invalidEmail);
      } else if (submitErrorCode === 'invalid_id') {
        setSubmitError(t.waitlist.errors.invalidId);
      } else {
        setSubmitError(t.waitlist.errors.server);
      }
    }
  }, [t, format, idStatus, checkedId, submitErrorCode, desiredId]);

  const isIdFeedbackOpen = Boolean(idMessage);

  const triggerIdCheck = (idToTest: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const clean = sanitizeUsername(idToTest);
    if (!clean) {
      setIdStatus('idle');
      setIdMessage('');
      setCheckedId('');
      return;
    }

    const localCheck = validateUsernameLocally(clean);
    if (!localCheck.valid) {
      setIdStatus('format_error');
      setIdMessage(t.waitlist.errors.invalidId);
      setCheckedId(clean);
      return;
    }

    if (!backendReady) {
      setIdStatus('idle');
      setIdMessage('');
      return;
    }

    const reqId = ++checkCountRef.current;
    setIdStatus('checking');
    setIdMessage(t.waitlist.checking);
    setCheckedId(clean);

    debounceTimerRef.current = setTimeout(async () => {
      const res = await checkUsernameApi(clean);
      if (reqId !== checkCountRef.current) {
        return; // stale request
      }
      if (res.available) {
        setIdStatus('available');
        setIdMessage(format(t.hero.available, { id: clean }));
      } else if (res.reason === 'taken' || res.reason === 'reserved') {
        setIdStatus('taken');
        setIdMessage(format(t.hero.taken, { id: clean }));
      } else if (res.reason === 'format') {
        setIdStatus('format_error');
        setIdMessage(t.waitlist.errors.invalidId);
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
    setSubmitErrorCode(null);
    checkCountRef.current += 1;
    triggerIdCheck(clean);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitError('');
    setSubmitErrorCode(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitErrorCode(null);

    // Honeypot check: if filled, show fake success without calling API
    if (websiteHoneypot && websiteHoneypot.trim().length > 0) {
      setSubmittedWithId(Boolean(desiredId.trim()));
      setIsSuccess(true);
      return;
    }

    if (!backendReady) {
      setSubmitErrorCode('server');
      setSubmitError(t.waitlist.errors.server);
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setSubmitErrorCode('invalid_email');
      setSubmitError(t.waitlist.errors.invalidEmail);
      return;
    }

    const cleanId = desiredId.trim() ? sanitizeUsername(desiredId) : undefined;
    if (cleanId) {
      const idCheck = validateUsernameLocally(cleanId);
      if (!idCheck.valid) {
        setSubmitErrorCode('invalid_id');
        setSubmitError(t.waitlist.errors.invalidId);
        return;
      }
      if (idStatus === 'taken') {
        setSubmitErrorCode('id_taken');
        setSubmitError(format(t.waitlist.errors.idTaken, { id: cleanId }));
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
      const err = res.error || 'server';
      setSubmitErrorCode(err);
      if (err === 'email_exists') {
        setSubmitError(t.waitlist.errors.emailExists);
      } else if (err === 'id_taken' || err === 'reserved') {
        setSubmitError(
          cleanId ? format(t.waitlist.errors.idTaken, { id: cleanId }) : t.waitlist.errors.idTakenFallback
        );
      } else if (err === 'invalid_email') {
        setSubmitError(t.waitlist.errors.invalidEmail);
      } else if (err === 'invalid_id') {
        setSubmitError(t.waitlist.errors.invalidId);
      } else {
        setSubmitError(t.waitlist.errors.server);
      }
    }
  };

  return (
    <section id="waitlist" className="py-16 sm:py-24 bg-[#0052FF] scroll-mt-16 text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <Reveal delay={0} className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.waitlist.title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="rounded-2xl p-6 sm:p-10 bg-white border border-[#DBE6FF] text-[#3B4455]">
          {isSuccess ? (
            /* Success State - fade-up keyframe, scale-in green dot */
            <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#3B4455] space-y-3 animate-fade-up">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#10B981] shrink-0 animate-scale-in" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[#047857]">
                  {t.waitlist.successTitle}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#3B4455] leading-relaxed">
                {t.waitlist.successText}
              </p>
              {!submittedWithId && (
                <p className="text-sm text-[#5B6577] leading-relaxed">
                  {t.waitlist.noIdNote}
                </p>
              )}
              {DISCORD_INVITE_URL && (
                <div className="pt-2">
                  <a
                    href={DISCORD_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] text-white text-sm font-semibold inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                  >
                    {t.waitlist.successButton}
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field (wajib) */}
              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-semibold text-[#3B4455]">
                  {t.waitlist.emailLabel} <span className="text-[#B91C1C]">*</span>
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
                    {t.waitlist.idLabel} <span className="text-[#5B6577] font-normal">{t.waitlist.optional}</span>
                  </label>
                  {idStatus === 'checking' && (
                    <span className="text-xs text-[#5B6577]">{t.waitlist.checking}</span>
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

                {/* ID live check feedback - always in DOM, smooth grid collapse */}
                <div
                  role="status"
                  aria-live="polite"
                  className={`grid transition-[grid-template-rows] duration-[250ms] ${
                    isIdFeedbackOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                  style={{
                    transitionTimingFunction: 'var(--ease-out)',
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      style={{
                        transitionTimingFunction: 'var(--ease-out)',
                      }}
                      className={`mt-1.5 text-xs font-medium transition-[opacity,transform] duration-[200ms] ${
                        isIdFeedbackOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[6px]'
                      } ${
                        lastIdStatus === 'available'
                          ? 'text-[#047857]'
                          : lastIdStatus === 'taken'
                          ? 'text-[#B45309]'
                          : 'text-[#B91C1C]'
                      }`}
                    >
                      {lastIdMessage}
                    </p>
                  </div>
                </div>
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
                    submitErrorCode === 'email_exists'
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
                className="btn w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] disabled:bg-[#0052FF]/40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
              >
                {isSubmitting ? t.waitlist.submitting : t.waitlist.button}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
