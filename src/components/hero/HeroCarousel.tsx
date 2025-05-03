
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect } from 'react';

interface HeroCarouselProps {
  slides: {
    image: string;
    title: string;
    description: string;
  }[];
}

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Set up auto-scroll for carousel
  useEffect(() => {
    if (!api) return;
    
    const autoPlay = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    const intervalRef = window.setInterval(autoPlay, 5000);
    
    // Update current slide when carousel changes
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      window.clearInterval(intervalRef);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="h-[600px] md:h-[700px] relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" 
                   style={{backgroundImage: `url("${slide.image}")`}}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center animate-fade-in max-w-2xl">
                  <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                    {slide.title}
                  </h2>
                  <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-6 absolute bottom-8 left-0 right-0 z-10">
        <CarouselPrevious className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
        {/* Add indicators */}
        <div className="flex gap-2 items-center">
          {slides.map((_, index) => (
            <button 
              key={`indicator-${index}`}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselNext className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
      </div>
    </Carousel>
  );
};

export default HeroCarousel;
