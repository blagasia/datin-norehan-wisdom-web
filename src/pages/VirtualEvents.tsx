
import React from 'react';
import { useEffect } from 'react';
import EventsPreview from '@/components/EventsPreview';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const VirtualEvents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Virtual Events | Datin Norehan"
        description="Join our virtual wellness events and learn about traditional remedies and natural products."
      />
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Virtual Events</h1>
          <EventsPreview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualEvents;
