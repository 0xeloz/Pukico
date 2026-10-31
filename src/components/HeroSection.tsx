import React, { useState, useRef, useEffect } from 'react';
import { ProductPreview } from './ProductPreview';
import { Reveal } from './Reveal';
import { sanitizeUsername, validateUsernameLocally, checkUsernameApi } from '../services/api';
import { useT } from '../i18n';

interface HeroSectionProps {
  onClaimId?: (id: string) => void;
}

type CheckStatus = 'idle' | 'checking' | 'available' | 'taken' | 'format_error' | 'server_error';

export const HeroSection: React.FC<HeroSectionProps> = ({ onClaimId }) => {
  const { t, format } = useT();
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

  // Sync status message if language changes while a status is displayed
  useEffect(() => {
    if (status === 'available' && checkedId) {
      setStatusMsg(format(t.hero.available, { id: checkedId }));
    } else if (status === 'taken' && checkedId) {
      setStatusMsg(format(t.hero.taken, { id: checkedId }));
    } else if (status === 'format_error') {
      setStatusMsg(t.hero.format);
    } else if (status === 'server_error') {
      setStatusMsg(t.hero.serverError);
    }
  }, [t, format, status, checkedId]);

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
      setStatusMsg(t.hero.empty);
      return;
    }

    const localVal = validateUsernameLocally(clean);
    if (!localVal.valid) {
      setStatus('format_error');
      setStatusMsg(t.hero.format);
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
      setStatusMsg(format(t.hero.available, { id: clean }));
    } else if (res.reason === 'taken' || res.reason === 'reserved') {
      setStatus('taken');
      setStatusMsg(format(t.hero.taken, { id: clean }));
    } else if (res.reason === 'format') {
      setStatus('format_error');
      setStatusMsg(t.hero.format);
    } else {
      setStatus('server_error');
      setStatusMsg(t.hero.serverError);
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
                <span>{t.hero.kicker}</span>
              </div>
            </Reveal>

            {/* H1 - font-weight 700, tracking-tight, with #0052FF highlight - Reveal delay 80 */}
            <Reveal delay={80}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0B0D] leading-[1.15] text-balance">
                {t.hero.h1Prefix}
                <span className="text-[#0052FF]">{t.hero.h1Highlight}</span>
                {t.hero.h1Suffix}
              </h1>
            </Reveal>

            {/* Sub - Reveal delay 160 */}
            <Reveal delay={160}>
              <p className="mt-5 text-base sm:text-lg text-[#3B4455] leading-relaxed max-w-xl">
                {t.hero.sub}
              </p>

              {/* Open beta notice & direct app link */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-lg">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EEF4FF] text-[#0052FF] border border-[#DBE6FF]">
                    {t.hero.closedBetaBadge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6577] leading-relaxed">
                  {t.hero.closedBetaText}
                </p>
                <div className="mt-2.5">
                  <a
                    href="https://app.pukico.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0052FF] hover:text-[#0042D6] hover:underline"
                  >
                    <span>{t.hero.haveAccessCode}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Interactive ID Checker - Reveal delay 240 */}
            <Reveal delay={240} className="w-full max-w-lg mt-8">
              <form onSubmit={status === 'available' ? (e) => e.preventDefault() : handleCheck}>
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
                      placeholder={t.hero.placeholder}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      enterKeyHint="go"
                      spellCheck="false"
                      className="w-full min-h-[48px] pl-8 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DBE6FF] text-[#3B4455] placeholder:text-[#5B6577]/60 text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent transition-all"
                      aria-label={t.hero.inputAriaLabel}
                    />
                  </div>

                  {status === 'available' ? (
                    <a
                      href="https://app.pukico.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] text-white text-sm font-semibold flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      {t.hero.claimButton}
                    </a>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'checking'}
                      className="btn min-h-[48px] px-6 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] disabled:bg-[#0052FF]/40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
                    >
                      {status === 'checking' ? t.hero.checking : t.hero.check}
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
                      <a
                        href="https://app.pukico.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn text-xs font-bold underline hover:no-underline text-[#047857] shrink-0"
                      >
                        {t.hero.claimLink}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Small fine-print text below input */}
              <p className="mt-3 text-xs text-[#5B6577] leading-relaxed">
                {t.hero.finePrint}
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
