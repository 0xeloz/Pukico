import React, { useState, useEffect } from 'react';
import { DISCORD_INVITE_URL } from '../config';
import { useT } from '../i18n';

interface NavbarProps {
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useT();

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

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white border-b transition-colors duration-200 ${
        isScrolled ? 'border-[#E5E7EB]' : 'border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <a
          href={lang === 'id' ? '/id' : '/'}
          onClick={(e) => {
            if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-1 py-0.5 shrink-0"
          aria-label={t.nav.logoAriaLabel}
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

        {/* Action buttons & language switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Switch kecil EN | ID */}
          <div className="flex items-center text-xs font-semibold select-none text-[#5B6577] border border-[#DBE6FF] rounded-xl px-1 py-0.5 bg-white">
            <a
              href="/"
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  setLang('en');
                }
              }}
              className={`min-h-[44px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] ${
                lang === 'en'
                  ? 'font-bold text-[#0052FF]'
                  : 'text-[#5B6577] hover:text-[#0A0B0D]'
              }`}
              aria-label="Switch to English"
              aria-current={lang === 'en' ? 'page' : undefined}
            >
              EN
            </a>
            <span className="text-[#DBE6FF] px-0.5" aria-hidden="true">
              |
            </span>
            <a
              href="/id"
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  setLang('id');
                }
              }}
              className={`min-h-[44px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] ${
                lang === 'id'
                  ? 'font-bold text-[#0052FF]'
                  : 'text-[#5B6577] hover:text-[#0A0B0D]'
              }`}
              aria-label="Ganti ke Bahasa Indonesia"
              aria-current={lang === 'id' ? 'page' : undefined}
            >
              ID
            </a>
          </div>

          {DISCORD_INVITE_URL && (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden md:inline-flex min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#3B4455] hover:text-[#0A0B0D] bg-white hover:bg-[#EEF4FF] border border-[#DBE6FF] rounded-xl items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
            >
              {t.nav.joinDiscord}
            </a>
          )}

          <button
            type="button"
            onClick={onScrollToWaitlist}
            className="btn min-h-[44px] px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] rounded-xl inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
          >
            {t.nav.joinWaitlist}
          </button>
        </div>
      </div>
    </header>
  );
};
