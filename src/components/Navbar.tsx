import React, { useState, useEffect } from 'react';
import { DISCORD_INVITE_URL } from '../config';

interface NavbarProps {
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
          aria-label="Pukico Beranda"
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

        {/* Action buttons with .btn class */}
        <div className="flex items-center gap-2 sm:gap-3">
          {DISCORD_INVITE_URL && (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden sm:inline-flex min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#3B4455] hover:text-[#0A0B0D] bg-white hover:bg-[#EEF4FF] border border-[#DBE6FF] rounded-xl items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2"
            >
              Gabung Discord
            </a>
          )}

          <button
            type="button"
            onClick={onScrollToWaitlist}
            className="btn min-h-[44px] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0052FF] hover:bg-[#0042D6] active:bg-[#0036B0] rounded-xl inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052FF]"
          >
            Masuk Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};
