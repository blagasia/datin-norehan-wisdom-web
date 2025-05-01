
import React from 'react';
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
import { LoyaltyProvider } from '@/context/LoyaltyContext';

const Index = () => {
  return (
    <LoyaltyProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16 md:pt-20 lg:pt-24"> {/* Added padding-top to offset the fixed navbar */}
          <main className="flex-grow">
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
      </div>
    </LoyaltyProvider>
  );
};

export default Index;
