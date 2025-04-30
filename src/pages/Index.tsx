
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Products from '@/components/Products';
import RitualsPreview from '@/components/RitualsPreview';
import Articles from '@/components/Articles';
import EventsPreview from '@/components/EventsPreview';
import AskDatin from '@/components/AskDatin';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Products />
        <RitualsPreview />
        <Articles />
        <EventsPreview />
        <AskDatin />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
