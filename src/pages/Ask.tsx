
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AskDatin from '@/components/AskDatin';

const Ask = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 md:py-24 bg-natural-peach/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ask Datin Norehan</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto mb-12">
              Have questions about natural wellness? Submit your questions below and let Datin Norehan share her wisdom.
            </p>
            <AskDatin />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ask;
