
import React from 'react';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, ShieldCheck, BookOpen } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import SEO from '@/components/SEO';

const DnaBrand = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <SEO 
        title="DNA by Datin Norehan | Premium Wellness Collection"
        description="Discover DNA by Datin Norehan, a premium collection of natural wellness products rooted in traditional wisdom and modern science."
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
              <span className="text-white font-italiana tracking-wider text-xl">Introducing</span>
              <h1 className="font-italiana text-5xl md:text-6xl text-white font-bold mb-8 text-shadow animate-fade-in">DNA by Datin Norehan</h1>
              <p className="text-xl md:text-2xl text-white text-shadow max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                A premium collection of natural wellness products rooted in traditional wisdom and enhanced by modern science.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/products">
                  <Button className="bg-white text-brand-deep-teal hover:bg-white/90">
                    Shop Collection
                  </Button>
                </Link>
                <Link to="/philosophy">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Our Philosophy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Pillars Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-italiana text-4xl md:text-5xl uppercase tracking-wide mb-8 animate-fade-in">The Four Pillars of DNA</h2>
                <p className="text-natural-gray max-w-3xl mx-auto text-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                  Our premium collection is built upon four foundational pillars that represent our holistic approach to wellness.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-brand-sage-mist/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-deep-teal/20 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                    <h3 className="font-italiana text-2xl ml-4">Elixirs</h3>
                  </div>
                  <p className="text-natural-gray mb-6">
                    Premium formulations that transform from within, featuring natural ingredients crafted for radiant results.
                  </p>
                  <Link to="/products">
                    <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                      Explore Elixirs <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-brand-blush-rose/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-blush-rose/40 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                    <h3 className="font-italiana text-2xl ml-4">Rituals</h3>
                  </div>
                  <p className="text-natural-gray mb-6">
                    Immersive wellness practices and accessories designed to elevate your daily self-care routine.
                  </p>
                  <Link to="/rituals">
                    <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                      Discover Rituals <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-brand-lavender-mist/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-lavender-mist/40 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                    <h3 className="font-italiana text-2xl ml-4">Wisdom</h3>
                  </div>
                  <p className="text-natural-gray mb-6">
                    Educational content sharing Datin Norehan's extensive knowledge, from free articles to premium courses.
                  </p>
                  <Link to="/articles">
                    <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                      Access Wisdom <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-brand-creamy-ivory/50 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-gilded-gold/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                    <h3 className="font-italiana text-2xl ml-4">Curations</h3>
                  </div>
                  <p className="text-natural-gray mb-6">
                    Limited edition collections and exclusive wellness sets handpicked by Datin Norehan.
                  </p>
                  <Link to="/curations">
                    <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                      View Curations <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Brand Story Section */}
        <section className="py-20 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="font-italiana text-4xl mb-6">The Birth of DNA</h2>
                  <p className="text-natural-gray mb-4">
                    After decades of sharing her wisdom through Datin Norehan's Apothecary, our founder recognized the need for a premium collection that would make her most effective formulations accessible to everyone.
                  </p>
                  <p className="text-natural-gray mb-4">
                    DNA was born from this vision - capturing the essence of Datin Norehan's expertise in a collection that balances time-honored traditional wisdom with modern scientific validation.
                  </p>
                  <p className="text-natural-gray mb-6">
                    Each product in the DNA collection represents the perfect equilibrium between nature's gifts and innovative wellness approaches.
                  </p>
                  <Link to="/story">
                    <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                      Our Complete Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png" 
                      alt="Datin Norehan with DNA products" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-italiana text-4xl md:text-5xl uppercase tracking-wide mb-8">Our Commitment</h2>
              <p className="text-natural-gray max-w-3xl mx-auto text-lg">
                Every DNA product embodies our unwavering commitment to excellence, sustainability, and holistic wellness.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-sage-mist/40 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="M12 22c0-5.523 4.477-10 10-10"></path>
                    <path d="M22 12c0 5.523-4.477 10-10 10"></path>
                    <path d="M2 12c0-5.523 4.477-10 10-10"></path>
                    <path d="M12 2C6.477 2 2 6.477 2 12"></path>
                  </svg>
                </div>
                <h3 className="font-italiana text-xl mb-3">Sustainable Sourcing</h3>
                <p className="text-natural-gray">
                  We source our ingredients responsibly, ensuring that our products support both environmental health and community wellbeing.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-blush-rose/30 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
                <h3 className="font-italiana text-xl mb-3">Pure Ingredients</h3>
                <p className="text-natural-gray">
                  Each DNA product is crafted without harmful additives, synthetic fragrances, or unnecessary fillers.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-lavender-mist/30 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-deep-teal">
                    <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1H8.3Z"></path>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                    <circle cx="17.5" cy="17.5" r="3.5"></circle>
                  </svg>
                </div>
                <h3 className="font-italiana text-xl mb-3">Balanced Approach</h3>
                <p className="text-natural-gray">
                  We honor ancient wisdom while embracing scientific validation, creating products that deliver real results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DnaBrand;
