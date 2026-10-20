import React from 'react';
import { DISCORD_INVITE_URL, X_URL } from '../config';

export const Footer: React.FC = () => {
  const hasLinks = Boolean(DISCORD_INVITE_URL || X_URL);

  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand note */}
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm font-semibold text-[#2C3D51]">
            Pukico dibikin bareng komunitas.
          </p>
          <p className="text-xs text-[#475569]">
            Beta di Base Sepolia testnet. Bukan nasihat keuangan.
          </p>
        </div>

        {/* Right: Social community links */}
        {hasLinks && (
          <div className="flex items-center gap-6">
            {DISCORD_INVITE_URL && (
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center text-sm font-medium text-[#334155] hover:text-[#2C3D51] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded-md px-2 py-1"
              >
                Discord
              </a>
            )}
            {X_URL && (
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center text-sm font-medium text-[#334155] hover:text-[#2C3D51] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] rounded-md px-2 py-1"
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
