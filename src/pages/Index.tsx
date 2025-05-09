
import React from 'react';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Products from '@/components/Products';
import RitualsPreview from '@/components/RitualsPreview';
import Articles from '@/components/Articles';
import EventsPreview from '@/components/EventsPreview';
import TikTokContent from '@/components/TikTokContent';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/CookieConsent';
import SEO from '@/components/SEO';

const Index = () => {
  // Optimize performance by scrolling to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <SEO 
        title="Datin Norehan - Natural Wellness Products & Remedies"
        description="Discover premium natural wellness products and traditional remedies by Datin Norehan for holistic health and beauty."
      />
      <Navbar />
      <div className="pt-20 md:pt-24 lg:pt-28 relative z-10">
        <main className="flex-grow overflow-hidden">
          <Hero />
          <Features />
          <Products />
          <RitualsPreview />
          <About />
          <Articles />
          <EventsPreview />
          <TikTokContent />
        </main>
      </div>
      <Footer />
      <Toaster />
      <CookieConsent />
    </div>
  );
};

export default Index;
