
import React from 'react';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, History } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';

const Story = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <SEO 
        title="Our Story | Datin Norehan's Journey"
        description="Discover the inspiring journey of Datin Norehan from traditional herbalist to founder of a premium wellness brand."
      />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <VideoBackground 
            videoSrc="https://vimeo.com/1080492231"
            fallbackImageSrc="/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="bg-white/70 text-brand-deep-teal mb-4">Our Journey</Badge>
              <h1 className="font-italiana text-5xl md:text-6xl text-white font-bold mb-8 text-shadow animate-fade-in">The Datin Norehan Story</h1>
              <p className="text-xl md:text-2xl text-white text-shadow max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                From traditional herbalist to founder of a premium wellness brand - a journey of passion, wisdom, and natural healing.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png" 
                      alt="Datin Norehan" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                <div>
                  <Badge className="mb-3">The Founder</Badge>
                  <h2 className="font-italiana text-4xl mb-6">Meet Datin Norehan</h2>
                  <p className="text-natural-gray mb-4">
                    Datin Norehan's journey began over three decades ago in her grandmother's kitchen, where she was first introduced to the healing power of herbs and natural remedies.
                  </p>
                  <p className="text-natural-gray mb-4">
                    With roots deeply embedded in traditional Malaysian healing practices and an insatiable curiosity for botanical science, she soon became known in her community as the woman who could "heal with nature's gifts."
                  </p>
                  <p className="text-natural-gray mb-8">
                    Her dedication to natural wellness became her life's work, transforming from a passionate herbalist to the founder of a wellness brand that bridges ancestral wisdom with modern science.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-brand-deep-teal mr-2" />
                      <span className="text-natural-gray">30+ Years Experience</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-brand-deep-teal mr-2" />
                      <span className="text-natural-gray">Master Herbalist</span>
                    </div>
                    <div className="flex items-center">
                      <History className="h-5 w-5 text-brand-deep-teal mr-2" />
                      <span className="text-natural-gray">Third Generation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <h3 className="font-italiana text-3xl mb-6 text-center">The Evolution of Our Brand</h3>
                
                <div className="relative border-l-2 border-brand-deep-teal/30 pl-8 ml-4 space-y-12 my-16">
                  <div className="relative">
                    <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-brand-deep-teal flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">1</span>
                    </div>
                    <h4 className="font-playfair text-xl mb-3">The Early Years (1990s)</h4>
                    <p className="text-natural-gray">
                      Datin Norehan began sharing her handcrafted herbal remedies with friends and family. Word spread quickly about the efficacy of her formulations, particularly her signature detoxification tonic.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-brand-deep-teal flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">2</span>
                    </div>
                    <h4 className="font-playfair text-xl mb-3">First Apothecary (2003)</h4>
                    <p className="text-natural-gray">
                      After years of perfecting her recipes, Datin Norehan opened her first small apothecary in Kuala Lumpur. The modest shop quickly became a sanctuary for those seeking natural alternatives to conventional wellness approaches.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-brand-deep-teal flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">3</span>
                    </div>
                    <h4 className="font-playfair text-xl mb-3">Scientific Validation (2010-2015)</h4>
                    <p className="text-natural-gray">
                      Passionate about bridging traditional wisdom with modern science, Datin Norehan collaborated with researchers to validate the efficacy of her formulations. This period marked a significant evolution in her approach to product development.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-brand-deep-teal flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">4</span>
                    </div>
                    <h4 className="font-playfair text-xl mb-3">Birth of DNA (2018)</h4>
                    <p className="text-natural-gray">
                      Recognizing the growing demand for premium natural wellness products, Datin Norehan launched DNA - a carefully curated collection that represents the perfect balance between ancestral wisdom and modern science.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-brand-deep-teal flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">5</span>
                    </div>
                    <h4 className="font-playfair text-xl mb-3">Present Day</h4>
                    <p className="text-natural-gray">
                      Today, Datin Norehan's Apothecary and DNA represent a holistic ecosystem that offers not just products, but education, community, and a pathway to balanced wellness. With devotees across Southeast Asia and beyond, our mission to share nature's wisdom continues to grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-italiana text-4xl md:text-5xl uppercase tracking-wide mb-8">Our Core Values</h2>
              <p className="text-natural-gray max-w-3xl mx-auto text-lg">
                These principles have guided our journey from a small apothecary to a beloved wellness brand.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-brand-sage-mist/40 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="M18.5 2h-13L2 9.5 12 22 22 9.5 18.5 2Z"></path>
                    <path d="M12 22 2 9.5l3.5-7.5"></path>
                    <path d="m12 22 10-12.5-3.5-7.5"></path>
                    <path d="M7 8.5h10"></path>
                    <path d="M12 2v6.5"></path>
                  </svg>
                </div>
                <h3 className="font-italiana text-2xl mb-3">Authenticity</h3>
                <p className="text-natural-gray">
                  We stay true to the pure essence of natural ingredients and ancient wisdom, ensuring that every product delivers authentic benefits without compromise.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-brand-blush-rose/30 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"></path>
                    <path d="M8.5 2h7"></path>
                    <path d="M14.5 16h-5"></path>
                  </svg>
                </div>
                <h3 className="font-italiana text-2xl mb-3">Education</h3>
                <p className="text-natural-gray">
                  We believe in empowering our community through knowledge, sharing both ancestral wisdom and scientific understanding about natural wellness.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-brand-lavender-mist/30 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <h3 className="font-italiana text-2xl mb-3">Holistic Balance</h3>
                <p className="text-natural-gray">
                  We recognize that true wellness emerges from balance - between tradition and innovation, between mind and body, between humans and nature.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Our Journey Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-italiana text-4xl mb-8">Join Our Journey</h2>
              <p className="text-natural-gray mb-8 text-lg">
                Discover a world where ancestral wisdom meets modern wellness - explore our products, attend our events, or connect with our community of wellness seekers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/products">
                  <Button className="w-full" variant="outline">Shop Collection</Button>
                </Link>
                <Link to="/events">
                  <Button className="w-full" variant="outline">Attend Events</Button>
                </Link>
                <Link to="/loyalty">
                  <Button className="w-full" variant="outline">Join Community</Button>
                </Link>
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
