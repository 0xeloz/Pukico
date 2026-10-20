import React, { useState } from 'react';
import { LangProvider } from './i18n';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhySection } from './components/WhySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiatorSection } from './components/DifferentiatorSection';
import { HonestSection } from './components/HonestSection';
import { WaitlistSection } from './components/WaitlistSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [claimedId, setClaimedId] = useState('');

  const scrollToWaitlist = () => {
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
      <div className="min-h-screen bg-white text-[#3B4455] flex flex-col font-sans">
        <Navbar onScrollToWaitlist={scrollToWaitlist} />

        <main className="flex-1">
          <HeroSection onClaimId={handleClaimIdFromHero} />
          <WhySection />
          <HowItWorksSection />
          <DifferentiatorSection />
          <HonestSection />
          <WaitlistSection initialId={claimedId} />
          <FaqSection />
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}
