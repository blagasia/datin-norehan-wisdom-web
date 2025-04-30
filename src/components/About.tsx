
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
              The Essence of Datin Norehan
            </h2>
            <p className="text-natural-gray mb-6 leading-relaxed">
              With grace that matches her wisdom, Datin Norehan has journeyed through life with a singular purpose — to harness nature's gifts and transform them into healing treasures. Her story begins with a humble appreciation for traditional remedies passed through generations of her family.
            </p>
            <p className="text-natural-gray mb-6 leading-relaxed">
              Each product under the Datin Norehan brand reflects not just ingredients, but a philosophy of living in harmony with nature. Her meticulous approach ensures that every formulation honors the delicate balance between scientific understanding and ancestral wisdom.
            </p>
            
            <div className="bg-natural-peach/20 p-6 rounded-lg mb-8 border-l-4 border-natural-peach">
              <div className="flex items-start">
                <Quote className="h-8 w-8 text-natural-dark/60 mr-4 flex-shrink-0 mt-1" />
                <p className="italic text-natural-dark/80 font-playfair text-lg">
                  "In nature's gentle whispers, I found my calling. Every leaf, root, and flower has a story to tell and a gift to offer. My journey has been about listening carefully and crafting these gifts into remedies that honor both body and spirit."
                </p>
              </div>
              <p className="text-right mt-3 font-medium text-natural-dark/70">— Datin Norehan</p>
            </div>
            
            <Link to="/about">
              <Button className="btn-outline">Explore Our Story</Button>
            </Link>
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
                  "True wellness starts with nature's wisdom."
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
