import React from 'react';
import { useT } from '../i18n';
import { CONTACT_EMAIL } from '../config';

export const TermsPage: React.FC = () => {
  const { t, uiLang, navigate } = useT();
  const termsData = t.terms;

  const homePath = uiLang === 'id' ? '/id' : '/';

  const hasContact = typeof CONTACT_EMAIL === 'string' && CONTACT_EMAIL.trim().length > 0;

  // Filter out contact section if CONTACT_EMAIL is empty
  const visibleSections = termsData.sections.filter((sec) => {
    if (sec.id === 'section-11') {
      return hasContact;
    }
    return true;
  });

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back to Home Link */}
        <div className="mb-8">
          <a
            href={homePath}
            onClick={(e) => {
              if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                navigate(homePath);
              }
            }}
            className="inline-flex items-center text-sm font-semibold text-[#0052FF] hover:text-[#0042D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md py-1 pr-2"
          >
            {termsData.backHome}
          </a>
        </div>

        {/* Header: Title and Last Updated */}
        <header className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0B0D]">
            {termsData.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-[#5B6577]">
            {termsData.lastUpdated}
          </p>
        </header>

        {/* Numbered Clickable Table of Contents */}
        <nav
          aria-label={termsData.tocTitle}
          className="mb-12 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
        >
          <h2 className="text-base font-bold text-[#0A0B0D] mb-4">
            {termsData.tocTitle}
          </h2>
          <ol className="space-y-2 text-sm text-[#3B4455]">
            {visibleSections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="hover:text-[#0052FF] hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections Content */}
        <div className="space-y-10 max-w-[65ch]">
          {visibleSections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight text-[#0A0B0D] mb-3">
                {sec.title}
              </h2>
              {sec.id === 'section-11' ? (
                <p className="text-base leading-relaxed text-[#3B4455]">
                  {uiLang === 'id' ? (
                    <>
                      Hubungi kami di{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[#0052FF] underline hover:text-[#0042D6]"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Contact us at{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[#0052FF] underline hover:text-[#0042D6]"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </>
                  )}
                </p>
              ) : (
                <p className="text-base leading-relaxed text-[#3B4455]">
                  {sec.content}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Back to Home Link */}
        <div className="mt-14 pt-8 border-t border-[#E5E7EB]">
          <a
            href={homePath}
            onClick={(e) => {
              if (e.button === 0 && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                navigate(homePath);
              }
            }}
            className="inline-flex items-center text-sm font-semibold text-[#0052FF] hover:text-[#0042D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 rounded-md py-1 pr-2"
          >
            {termsData.backHome}
          </a>
        </div>
      </div>
    </div>
  );
};
