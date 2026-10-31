import React, { useState, useEffect } from 'react';
import { DISCORD_INVITE_URL } from '../config';
import { useT, Language, enMerged, idTranslations } from '../i18n';

interface NavbarProps {
  onScrollToWaitlist: () => void;
}

interface StackedLabelProps {
  en: string;
  id: string;
  activeLang: Language;
}

const StackedLabel: React.FC<StackedLabelProps> = ({ en, id, activeLang }) => {
  return (
    <span className="grid inline-grid items-center justify-items-center">
      <span
        className={`col-start-1 row-start-1 transition-opacity duration-200 ease-out whitespace-nowrap ${
          activeLang === 'en' ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
        }`}
        aria-hidden={activeLang !== 'en'}
      >
        {en}
      </span>
      <span
        className={`col-start-1 row-start-1 transition-opacity duration-200 ease-out whitespace-nowrap ${
          activeLang === 'id' ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
        }`}
        aria-hidden={activeLang !== 'id'}
      >
        {id}
      </span>
    </span>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { uiLang, setLang, navigate, pathname } = useT();

  const norm = (pathname || '').toLowerCase();
  const isPrivacy = norm.includes('/privacy');
  const isTerms = norm.includes('/terms');
  const enHref = isPrivacy ? '/privacy' : isTerms ? '/terms' : '/';
  const idHref = isPrivacy ? '/id/privacy' : isTerms ? '/id/terms' : '/id';

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoAriaLabel = uiLang === 'id' ? idTranslations.nav.logoAriaLabel : enMerged.nav.logoAriaLabel;

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white border-b transition-colors duration-200 ${
        isScrolled ? 'border-[#E5E7EB]' : 'border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <a
          href={uiLang === 'id' ? '/id' : '/'}
          onClick={(e) => {
            if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              const homePath = uiLang === 'id' ? '/id' : '/';
              if (isPrivacy || isTerms) {
                navigate(homePath);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-1 py-0.5 shrink-0"
          aria-label={logoAriaLabel}
        >
          <img
            src="/pukico-logo-112.png"
            width={28}
            height={28}
            alt=""
            className="h-7 w-7 shrink-0 rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-[#0A0B0D]">
            Pukico
          </span>
        </a>

        {/* Action buttons & segmented language switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Segmented Control EN | ID */}
          <div
            className="relative flex items-center p-0.5 w-[92px] h-[44px] rounded-[12px] border border-[#DBE6FF] bg-white select-none shrink-0"
            role="group"
            aria-label="Language selector"
          >
            {/* Sliding Pill */}
            <span
              className="absolute top-0.5 bottom-0.5 left-0.5 w-[44px] rounded-[10px] bg-[#EEF4FF] pointer-events-none transition-transform duration-[250ms]"
              style={{
                transform: uiLang === 'en' ? 'translateX(0px)' : 'translateX(44px)',
                transitionTimingFunction: 'var(--ease-out)',
              }}
              aria-hidden="true"
            />

            {/* EN link */}
            <a
              href={enHref}
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  setLang('en');
                }
              }}
              className={`relative z-10 w-[44px] h-[38px] flex items-center justify-center text-xs font-semibold rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] ${
                uiLang === 'en'
                  ? 'font-bold text-[#0052FF]'
                  : 'text-[#5B6577] hover:text-[#0A0B0D]'
              }`}
              aria-label="Switch to English"
              aria-current={uiLang === 'en' ? 'page' : undefined}
            >
              EN
            </a>

            {/* ID link */}
            <a
              href={idHref}
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  setLang('id');
                }
              }}
              className={`relative z-10 w-[44px] h-[38px] flex items-center justify-center text-xs font-semibold rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] ${
                uiLang === 'id'
                  ? 'font-bold text-[#0052FF]'
                  : 'text-[#5B6577] hover:text-[#0A0B0D]'
              }`}
              aria-label="Ganti ke Bahasa Indonesia"
              aria-current={uiLang === 'id' ? 'page' : undefined}
            >
              ID
            </a>
          </div>

          {DISCORD_INVITE_URL && (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden md:inline-flex min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#3B4455] hover:text-[#0A0B0D] bg-white hover:bg-[#EEF4FF] border border-[#DBE6FF] rounded-xl items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 shrink-0"
            >
              <StackedLabel
                en={enMerged.nav.joinDiscord}
                id={idTranslations.nav.joinDiscord}
                activeLang={uiLang}
              />
            </a>
          )}

          <a
            href="https://app.pukico.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn min-h-[44px] px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] rounded-xl inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF] shrink-0"
          >
            <StackedLabel
              en={enMerged.nav.joinWaitlist}
              id={idTranslations.nav.joinWaitlist}
              activeLang={uiLang}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
