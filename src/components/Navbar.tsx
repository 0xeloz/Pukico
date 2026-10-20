import React from 'react';
import { DISCORD_INVITE_URL } from '../config';

interface NavbarProps {
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWaitlist }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[#0F172A] hover:text-[#0EA5E9] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded-md px-1 py-0.5"
          aria-label="Pukico Beranda"
        >
          Pukico
        </a>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-xl transition-colors inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
          >
            Gabung Discord
          </a>

          <button
            type="button"
            onClick={onScrollToWaitlist}
            className="min-h-[44px] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0EA5E9] hover:bg-[#0284C7] active:bg-[#0369A1] rounded-xl transition-colors shadow-sm inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
          >
            Masuk Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};
