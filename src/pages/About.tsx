
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 md:py-24 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">About Datin Norehan</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Coming soon! Learn more about Datin Norehan and her passion for natural wellness.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
