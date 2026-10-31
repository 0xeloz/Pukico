import React from 'react';
import { DISCORD_INVITE_URL, X_URL } from '../config';
import { useT } from '../i18n';

export const Footer: React.FC = () => {
  const { t, uiLang, navigate } = useT();
  const hasLinks = Boolean(DISCORD_INVITE_URL || X_URL);

  const privacyPath = uiLang === 'id' ? '/id/privacy' : '/privacy';
  const termsPath = uiLang === 'id' ? '/id/terms' : '/terms';

  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand note, testnet notice, and legal links */}
        <div className="text-center sm:text-left space-y-2">
          <p className="text-sm font-semibold text-[#0A0B0D]">
            {t.footer.feedback}
          </p>
          <p className="text-xs text-[#5B6577]">
            {t.footer.disclaimer}
          </p>
          <p className="text-xs text-[#5B6577] font-medium">
            {t.footer.testnetNotice}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-semibold text-[#5B6577]">
            <a
              href={privacyPath}
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigate(privacyPath);
                }
              }}
              className="hover:text-[#0052FF] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
            >
              {t.footer.privacy}
            </a>
            <span aria-hidden="true" className="text-[#D1D5DB]">•</span>
            <a
              href={termsPath}
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  navigate(termsPath);
                }
              }}
              className="hover:text-[#0052FF] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
            >
              {t.footer.terms}
            </a>
          </div>
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
                {t.footer.discord}
              </a>
            )}
            {X_URL && (
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn min-h-[44px] inline-flex items-center text-sm font-medium text-[#3B4455] hover:text-[#0052FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                {t.footer.x}
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
