import React from 'react';
import { DISCORD_INVITE_URL, X_URL } from '../config';

export const Footer: React.FC = () => {
  const hasLinks = Boolean(DISCORD_INVITE_URL || X_URL);

  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand note */}
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm font-semibold text-[#0A0B0D]">
            Dibikin sambil dengerin masukan kalian di Discord.
          </p>
          <p className="text-xs text-[#5B6577]">
            Beta di Base Sepolia testnet. Bukan nasihat keuangan.
          </p>
        </div>

        {/* Right: Social community links with .btn */}
        {hasLinks && (
          <div className="flex items-center gap-6">
            {DISCORD_INVITE_URL && (
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn min-h-[44px] inline-flex items-center text-sm font-medium text-[#3B4455] hover:text-[#0052FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                Discord
              </a>
            )}
            {X_URL && (
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn min-h-[44px] inline-flex items-center text-sm font-medium text-[#3B4455] hover:text-[#0052FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                X
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
