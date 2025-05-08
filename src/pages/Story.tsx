
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote, Book, Image as ImageIcon, ArrowRight, Feather } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Story = () => {
  const [api, setApi] = useState<any>(null);
  
  useEffect(() => {
    if (!api) return;
    
    const autoPlay = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const interval = window.setInterval(autoPlay, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              The journey of Datin Norehan and her quest to preserve the wisdom of natural wellness.
            </p>
          </div>
        </div>

        {/* Story Image Carousel */}
        <section className="w-full bg-white">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {/* Slide 1: The Origins */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        The Origins
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        A heritage of healing passed down through generations, rooted in respect for nature's wisdom.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 2: The Journey */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/1d2d4ba3-6798-432d-b239-3d1bdc235172.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        The Journey
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Years of exploration through Southeast Asia, studying with master herbalists and traditional healers.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 3: The Vision */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/5f0e6477-2199-4db9-babb-73c92b345eea.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        The Vision
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Creating a bridge between ancient wisdom and modern science, honoring tradition while embracing innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 absolute bottom-8 left-0 right-0 z-10">
              <CarouselPrevious className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
              <CarouselNext className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
            </div>
          </Carousel>
        </section>

        {/* Origin Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollArea className="h-auto">
                <div className="mb-16">
                  <div className="inline-block mb-5 relative">
                    <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                    <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">HERITAGE</span>
                    <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                  </div>
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
                  
                  {/* Herb Garden Image - New Addition */}
                  <div className="mb-12">
                    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-4">
                      <img 
                        src="/lovable-uploads/56c8ecfc-b55a-466b-8542-f2c698fb2dc3.png" 
                        alt="Datin Norehan in her herb garden" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-sm text-center text-natural-gray italic">
                      Datin Norehan in her herb garden, carefully tending to medicinal plants passed down through generations
                    </p>
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
                  <div className="inline-block mb-5 relative">
                    <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                    <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">CREATION</span>
                    <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                  </div>
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
                  
                  <div className="text-center mt-12">
                    <Link to="/philosophy">
                      <Button className="bg-transparent rounded-none text-natural-dark border-natural-dark hover:bg-natural-dark hover:text-white group mr-4">
                        Explore Our Philosophy
                        <span className="inline-block transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link to="/products">
                      <Button className="bg-natural-peach hover:bg-natural-peach/90 text-white rounded-none group">
                        Discover Our Products
                        <span className="inline-block transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>
        
        {/* Closing Quote */}
        <section className="py-16 bg-natural-green/10">
          <div className="container mx-auto max-w-2xl text-center px-4">
            <Feather className="mx-auto mb-6 text-brand-orchid-pink h-8 w-8 opacity-80 subtle-breathe" />
            <blockquote className="font-italiana text-2xl md:text-3xl italic mb-6 text-natural-dark">
              "Our story is one of reverence—for ancestral wisdom, for the gifts of nature, and for the delicate balance that sustains all life."
            </blockquote>
            <p className="font-karla text-brand-deep-teal tracking-widest uppercase text-sm">— Datin Norehan</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
