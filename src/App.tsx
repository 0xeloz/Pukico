import React, { useState } from 'react';
import { LangProvider, useT } from './i18n';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhySection } from './components/WhySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiatorSection } from './components/DifferentiatorSection';
import { HonestSection } from './components/HonestSection';
import { WaitlistSection } from './components/WaitlistSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function AppContent({
  claimedId,
  onClaimId,
  onScrollToWaitlist,
}: {
  claimedId: string;
  onClaimId: (id: string) => void;
  onScrollToWaitlist: () => void;
}) {
  const { phase, pathname } = useT();

  const norm = (pathname || '').toLowerCase();
  const isPrivacy = norm.includes('/privacy');
  const isTerms = norm.includes('/terms');

  return (
    <div className="min-h-screen bg-white text-[#3B4455] flex flex-col font-sans">
      <Navbar onScrollToWaitlist={onScrollToWaitlist} />

      <div className="lang-content flex-1 flex flex-col" data-phase={phase}>
        <main className="flex-1">
          {isPrivacy ? (
            <PrivacyPage />
          ) : isTerms ? (
            <TermsPage />
          ) : (
            <>
              <HeroSection onClaimId={onClaimId} />
              <WhySection />
              <HowItWorksSection />
              <DifferentiatorSection />
              <HonestSection />
              <WaitlistSection initialId={claimedId} />
              <FaqSection />
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [claimedId, setClaimedId] = useState('');

  const scrollToWaitlist = () => {
    const norm = (typeof window !== 'undefined' ? window.location.pathname : '').toLowerCase();
    if (norm.includes('/privacy') || norm.includes('/terms')) {
      const isId = norm.startsWith('/id');
      const targetHome = isId ? '/id' : '/';
      window.history.pushState({}, '', targetHome);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.getElementById('waitlist');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          const emailInput = document.getElementById('waitlist-email');
          if (emailInput) {
            setTimeout(() => {
              emailInput.focus({ preventScroll: true });
            }, 600);
          }
        }
      }, 100);
      return;
    }

    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Fokus ke input email setelah scroll selesai (600ms) tanpa loncatan
      const emailInput = document.getElementById('waitlist-email');
      if (emailInput) {
        setTimeout(() => {
          emailInput.focus({ preventScroll: true });
        }, 600);
      }
    }
  };

  const handleClaimIdFromHero = (id: string) => {
    setClaimedId(id);
    scrollToWaitlist();
  };

  return (
    <LangProvider>
      <AppContent
        claimedId={claimedId}
        onClaimId={handleClaimIdFromHero}
        onScrollToWaitlist={scrollToWaitlist}
      />
    </LangProvider>
  );
}
