
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsGrid from '@/components/events/EventsGrid';
import FeaturedEvent from '@/components/events/FeaturedEvent';

const VirtualEvents = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-natural-green/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Virtual Events & Courses</h1>
              <p className="text-natural-gray text-lg">
                Join Datin Norehan for interactive live sessions, workshops, and courses
                on natural wellness, herbal remedies, and holistic living.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/zoom-2752078-2284891.png" alt="Zoom" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Zoom Integration</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" alt="Google Meet" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Google Meet Integration</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" alt="Microsoft Teams" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Microsoft Teams Integration</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedEvent />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
            <EventsGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualEvents;
