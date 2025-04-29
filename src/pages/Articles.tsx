
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Articles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 md:py-24 bg-natural-purple/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Wellness Articles</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Coming soon! Explore our wellness wisdom and natural health articles.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
