
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote, Book, Image } from 'lucide-react';

const Story = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-natural-dark max-w-3xl mx-auto">
              The journey of Datin Norehan and her quest to preserve the wisdom of natural wellness.
            </p>
          </div>
        </div>

        {/* Origin Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-8">The Origins</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="md:col-span-2">
                    <p className="text-natural-gray mb-6 leading-relaxed">
                      Born into a family where traditional healing practices were revered and preserved, Datin Norehan's earliest memories are filled with the scents of herbs drying in her grandmother's kitchen and the patient teachings of plant identification in the family garden.
                    </p>
                    
                    <p className="text-natural-gray mb-6 leading-relaxed">
                      "My grandmother was the keeper of knowledge," Datin Norehan recalls. "She could identify hundreds of plants by their scent alone and knew precisely which part—root, stem, leaf, or flower—contained the medicine and when it should be harvested."
                    </p>
                    
                    <p className="text-natural-gray leading-relaxed">
                      This inheritance of wisdom became the foundation upon which Datin Norehan would later build her wellness philosophy. But first, she would embark on a journey that took her far from home, seeking to complement traditional knowledge with formal education.
                    </p>
                  </div>
                  
                  <div className="bg-natural-peach/10 p-6 rounded-lg flex items-center">
                    <div>
                      <Book className="h-10 w-10 mb-4 text-natural-peach/80" />
                      <p className="italic text-natural-dark/80 font-playfair">
                        "The most profound lessons often come wrapped in the simplest packages—a grandmother's gentle hands showing you how to press oil from seeds, or the patience to wait for the perfect moment to harvest."
                      </p>
                      <p className="text-right mt-3 font-medium text-natural-dark/70">— Datin Norehan</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-12">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-natural-purple/20 flex items-center justify-center">
                      <Image className="h-16 w-16 text-natural-dark/30" />
                    </div>
                  </div>
                  <p className="text-sm text-center text-natural-gray italic">Datin Norehan in her grandmother's garden, learning the traditional ways of identifying healing herbs</p>
                </div>
                
                <p className="text-natural-gray mb-6 leading-relaxed">
                  After completing her formal education in botanical sciences and traditional medicine, Datin Norehan spent years traveling throughout Southeast Asia, studying with master herbalists and traditional healers. Each encounter added to her understanding of how different cultures approach wellness and healing.
                </p>
                
                <p className="text-natural-gray leading-relaxed">
                  "What struck me most during my travels was the common thread running through all these healing traditions—a profound reverence for nature and an understanding that true healing comes from restoring balance, not just treating symptoms," she explains.
                </p>
              </div>
              
              <div className="bg-natural-green/10 p-10 rounded-xl mb-16">
                <div className="flex items-start">
                  <Quote className="h-10 w-10 text-natural-dark/60 mr-6 flex-shrink-0 mt-2" />
                  <p className="italic text-natural-dark/80 font-playfair text-xl leading-relaxed">
                    "I realized that my purpose wasn't to choose between tradition and modernity, but to create a bridge between them—honoring ancestral wisdom while embracing scientific understanding. Only by holding both could I create something truly meaningful."
                  </p>
                </div>
                <p className="text-right mt-4 font-medium text-natural-dark/70">— Datin Norehan</p>
              </div>
              
              <div>
                <h2 className="text-3xl font-playfair font-semibold mb-8">The Birth of a Vision</h2>
                
                <p className="text-natural-gray mb-6 leading-relaxed">
                  Returning to Malaysia with a wealth of knowledge and experience, Datin Norehan began experimenting in earnest—creating formulations that combined her grandmother's teachings with the insights gained during her travels and studies.
                </p>
                
                <p className="text-natural-gray mb-6 leading-relaxed">
                  What began as small batches of herbal remedies shared with family and friends gradually evolved into something larger. Word spread about the effectiveness of her creations, and soon Datin Norehan found herself at a crossroads—continue as a small, local herbalist or expand her vision to reach more people.
                </p>
                
                <p className="text-natural-gray mb-8 leading-relaxed">
                  "The decision to establish a brand was not made lightly," she says. "I worried that scaling production might compromise the integrity of the formulations. But I realized that keeping this knowledge and these remedies to myself was counter to everything I had learned—that healing wisdom is meant to be shared."
                </p>
                
                <div className="text-center">
                  <Link to="/philosophy">
                    <Button className="btn-outline mr-4">Explore Our Philosophy</Button>
                  </Link>
                  <Link to="/products">
                    <Button className="btn-primary">Discover Our Products</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
