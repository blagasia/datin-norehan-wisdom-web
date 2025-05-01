
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote, Heart, Star, Feather } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Philosophy = () => {
  const [api, setApi] = useState<any>(null);
  
  React.useEffect(() => {
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
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Philosophy</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Discover the core principles and wisdom that guide Datin Norehan's approach to wellness and natural living.
            </p>
          </div>
        </div>

        {/* Philosophy Image Carousel */}
        <section className="w-full bg-white">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {/* Slide 1: Nature's Wisdom */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Nature's Wisdom
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        We honor the ancient connection between humans and the natural world, drawing from traditions that have withstood the test of time.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 2: Balance & Harmony */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/1d2d4ba3-6798-432d-b239-3d1bdc235172.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Balance & Harmony
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        True wellness emerges when all aspects of our being—physical, mental, and spiritual—exist in perfect equilibrium.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 3: Intentional Living */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/5f0e6477-2199-4db9-babb-73c92b345eea.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Intentional Living
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Every choice we make—from the ingredients we select to the rituals we practice—is infused with purpose and mindful intention.
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

        {/* Core Philosophy */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-5 relative">
                  <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                  <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">ESSENCE</span>
                  <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                </div>
                <h2 className="font-italiana text-3xl md:text-4xl uppercase tracking-wide mb-6">The Essence of Our Philosophy</h2>
                <p className="text-natural-gray text-lg">
                  Datin Norehan's approach to wellness is built on timeless principles that honor both tradition and innovation.
                </p>
              </div>
              
              <div className="bg-natural-peach/10 p-10 rounded-xl mb-16 shadow-sm border border-natural-peach/30">
                <div className="flex items-start">
                  <Quote className="h-10 w-10 text-natural-dark/60 mr-6 flex-shrink-0 mt-2" />
                  <p className="italic text-natural-dark/80 font-playfair text-2xl leading-relaxed">
                    "True wellness is not merely the absence of illness, but the harmonious balance of body, mind, and spirit. Nature provides everything we need to achieve this balance; our role is simply to listen and learn."
                  </p>
                </div>
                <p className="text-right mt-4 font-medium text-natural-dark/70">— Datin Norehan</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <div className="bg-natural-purple/10 p-8 rounded-lg mb-6">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Heart className="mr-3 h-6 w-6 text-natural-purple/80" />
                      Harmony with Nature
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      At the core of Datin Norehan's philosophy lies a deep respect for the natural world. She believes that nature provides everything we need for wellness if we approach it with reverence and understanding. Each ingredient is selected not merely for its individual properties but for how it harmonizes with others and with the human body.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-purple/50">
                      "Nature speaks in whispers. Those who listen carefully will discover its most profound healing secrets."
                    </div>
                  </div>
                  
                  <div className="bg-natural-green/10 p-8 rounded-lg">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Star className="mr-3 h-6 w-6 text-natural-green/80" />
                      The Wisdom of Tradition
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      Datin Norehan draws deeply from traditional knowledge passed through generations. These time-tested approaches to wellness form the foundation of her formulations, honoring ancestral wisdom while incorporating modern understanding.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-green/50">
                      "Our ancestors understood the language of plants and minerals. Their wisdom, refined over centuries, remains our most valuable inheritance."
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-natural-peach/10 p-8 rounded-lg mb-6">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Heart className="mr-3 h-6 w-6 text-natural-peach/80" />
                      Balance and Wholeness
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      True wellness, in Datin Norehan's philosophy, emerges from balance—not from treating symptoms but from addressing the whole person. Her approach considers physical health inseparable from mental clarity and spiritual well-being.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-peach/50">
                      "Healing is not about combating illness but about restoring harmony. When we return to balance, wellness follows naturally."
                    </div>
                  </div>
                  
                  <div className="bg-natural-purple/10 p-8 rounded-lg">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Star className="mr-3 h-6 w-6 text-natural-purple/80" />
                      Purity of Intent
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      Perhaps most fundamental to Datin Norehan's approach is the belief that intention matters. The energy and care with which each product is formulated becomes part of its healing essence. This is why she oversees every aspect of creation, ensuring that each product carries not just ingredients but purpose.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-purple/50">
                      "The hands that prepare a remedy infuse it with energy. This is why I approach each formulation as a sacred act—with clear intention and an open heart."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16 md:py-24 bg-natural-green/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-8 text-center">A Lifelong Journey</h2>
              
              <div className="prose prose-lg max-w-none text-natural-gray">
                <p>
                  Datin Norehan's path to natural wellness began in her childhood, surrounded by the lush landscapes of Malaysia. Under the guidance of her grandmother, a respected traditional healer, she learned to identify healing plants and understand their properties.
                </p>
                
                <p className="my-6">
                  "My grandmother would take me into the garden at dawn," she recalls. "She taught me that the most potent time to harvest leaves and flowers is when they're still kissed with morning dew. But more importantly, she taught me to ask permission from the plants—to approach them with gratitude and respect."
                </p>
                
                <p>
                  This early education formed the seedbed for what would later become her life's work. After formal education in botany and traditional medicine, Datin Norehan began experimenting with her own formulations, guided by both scientific understanding and intuitive wisdom.
                </p>
                
                <div className="bg-white p-8 rounded-lg shadow-sm my-8 border border-natural-green/30">
                  <div className="flex items-start">
                    <Quote className="h-8 w-8 text-natural-dark/60 mr-4 flex-shrink-0 mt-1" />
                    <p className="italic text-natural-dark/80 font-playfair text-lg">
                      "Each plant has its own intelligence and purpose. My work is not to impose my will upon these natural elements but to understand how they wish to serve, and then to become a bridge between nature's wisdom and human need."
                    </p>
                  </div>
                  <p className="text-right mt-3 font-medium text-natural-dark/70">— Datin Norehan</p>
                </div>
                
                <p>
                  Today, Datin Norehan's philosophy has evolved into a holistic approach that respects both ancient traditions and modern understanding. She insists that true luxury in wellness products comes not from expensive packaging or marketing but from the integrity of ingredients and the knowledge with which they are combined.
                </p>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/products">
                  <Button className="bg-transparent rounded-none text-natural-dark border-natural-dark hover:bg-natural-dark hover:text-white group">
                    Experience Our Products
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Closing Quote */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-2xl text-center px-4">
            <Feather className="mx-auto mb-6 text-brand-orchid-pink h-8 w-8 opacity-80 subtle-breathe" />
            <blockquote className="font-italiana text-2xl md:text-3xl italic mb-6 text-brand-dark">
              "Wellness is not a destination but a journey—one that requires mindfulness, compassion, and a deep reverence for the wisdom of nature."
            </blockquote>
            <p className="font-karla text-brand-deep-teal tracking-widest uppercase text-sm">— Datin Norehan</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Philosophy;
