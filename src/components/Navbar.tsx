import React from 'react';
import { DISCORD_INVITE_URL } from '../config';

interface NavbarProps {
  onScrollToWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToWaitlist }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded-md px-1 py-0.5"
          aria-label="Pukico Beranda"
        >
          <img
            src="/pukico-logo.png"
            alt="Pukico Logo"
            className="h-7 w-7 shrink-0 rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-[#2C3D51]">
            Pukico
          </span>
        </a>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {DISCORD_INVITE_URL && (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#334155] hover:text-[#2C3D51] bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-xl transition-colors inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
            >
              Gabung Discord
            </a>
          )}

          <button
            type="button"
            onClick={onScrollToWaitlist}
            className="min-h-[44px] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#2C3D51] hover:bg-[#22303F] active:bg-[#1A2532] rounded-xl transition-colors inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0EA5E9]"
          >
            Masuk Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};
