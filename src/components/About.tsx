
import React from 'react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
              Meet Datin Norehan
            </h2>
            <p className="text-natural-gray mb-6 leading-relaxed">
              Datin Norehan is a name synonymous with purity, wellness, and natural healing. With a deep passion for holistic health, she has dedicated herself to formulating 100% natural and organic wellness products, ensuring that every ingredient used is of the highest quality.
            </p>
            <p className="text-natural-gray mb-6 leading-relaxed">
              Each product under the Datin Norehan brand is a testament to her commitment to authenticity, sustainability, and well-being. She carefully selects and sources only the best natural ingredients, ensuring that they are free from harmful chemicals, additives, and preservatives.
            </p>
            <p className="text-natural-gray mb-8 leading-relaxed">
              From detox drinks and collagen supplements to herbal tonics and natural beauty solutions, Datin Norehan's creations are designed to enhance overall well-being, proving that true wellness starts with nature.
            </p>
            <Button className="btn-outline">Learn More About Datin Norehan</Button>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-natural-green/30 shadow-lg">
                <div className="w-full h-full bg-natural-purple/20 flex items-center justify-center">
                  <h3 className="font-playfair text-2xl text-natural-dark">Datin Norehan</h3>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-natural-peach/80 rounded-lg p-6 shadow-md">
                <p className="font-playfair text-lg italic">
                  "True wellness starts with nature."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
