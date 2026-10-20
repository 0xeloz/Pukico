import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhySection } from './components/WhySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DifferentiatorSection } from './components/DifferentiatorSection';
import { HonestSection } from './components/HonestSection';
import { WaitlistSection } from './components/WaitlistSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SITE_URL } from './config';

export default function App() {
  const [claimedId, setClaimedId] = useState('');

  // Handle canonical and og:url only if VITE_SITE_URL is provided
  useEffect(() => {
    if (SITE_URL) {
      const cleanUrl = SITE_URL.replace(/\/+$/, '');

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = cleanUrl;

      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = cleanUrl;
    }
  }, []);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // If there's an email input, focus it for convenience
      const emailInput = document.getElementById('waitlist-email');
      if (emailInput) {
        setTimeout(() => {
          emailInput.focus();
        }, 500);
      }
    }
  };

  const handleClaimIdFromHero = (id: string) => {
    setClaimedId(id);
    scrollToWaitlist();
  };

  return (
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
  );
}
