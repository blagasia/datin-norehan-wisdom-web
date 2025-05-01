import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Sparkles, Feather } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect as useEffectAutoPlay } from 'react';
import { useCallback, useRef } from 'react';
import VideoBackground from './VideoBackground';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [api, setApi] = useState<any>(null);
  const intervalRef = useRef<number | null>(null);
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });
  
  // Handle scroll position for effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set up auto-scroll for carousel
  useEffectAutoPlay(() => {
    if (!api) return;
    
    const autoPlay = () => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    intervalRef.current = window.setInterval(autoPlay, 5000);
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);
  
  const onSubmit = async (values: SubscribeFormValues) => {
    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Welcome to our community",
      description: "You've been added to our exclusive circle of wellness enthusiasts.",
    });
    form.reset();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative bg-gradient-to-b from-white to-brand-creamy-ivory pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          videoSrc="https://vimeo.com/1080492231"
          fallbackImageSrc="/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-brand-blush-rose text-brand-dark px-4 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-muted-rose" /> Artisanal Wellness
              </Badge>
            </div>
            <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-8 text-shimmer text-white text-shadow-lg">
              Natural holistic apothecary
            </h1>
            <p className="font-karla text-base md:text-lg mb-12 text-white leading-relaxed max-w-2xl mx-auto text-shadow">
              Discover our carefully crafted wellness elixirs—where ancestral wisdom meets modern science for your body, mind, and spirit.
            </p>
            <div className="flex justify-center">
              <Link to="/products">
                <Button className="bg-white/90 text-brand-dark hover:bg-white rounded-none border-none group">
                  Explore Collection
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section Above Image */}
      <section className="relative bg-brand-blush-rose/10 py-12 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Feather className="mx-auto mb-6 text-brand-orchid-pink h-8 w-8 opacity-80 subtle-breathe" />
            <blockquote className="font-italiana text-2xl md:text-3xl italic mb-6 text-brand-dark">
              "True beauty is not merely what we see on the surface, but the radiance that emanates from balanced wellness within."
            </blockquote>
            <p className="font-karla text-brand-deep-teal tracking-widest uppercase text-sm">— Datin Norehan</p>
          </div>
        </div>
      </section>
      
      {/* Scrolling Image Carousel - Full Width & Height */}
      <section className="w-full py-0 bg-white">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-10 pt-16">
            <div className="inline-block mb-5 relative">
              <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
              <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">WELLNESS JOURNEY</span>
              <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
            </div>
            <h2 className="font-italiana text-3xl md:text-4xl uppercase tracking-wide mb-6">Our Botanical Philosophy</h2>
          </div>
          
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {/* Slide 1: Traditional wisdom. Modern wellness. */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide">
                        <span className="block animate-fade-up" style={{animationDelay: '0.3s'}}>Traditional wisdom.</span>
                        <span className="block animate-fade-up" style={{animationDelay: '0.6s'}}>Modern wellness.</span>
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.9s'}}>
                        Celebrating diverse beauty through holistic self-care rituals passed down through generations.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 2: Nature's Treasures */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/1d2d4ba3-6798-432d-b239-3d1bdc235172.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Nature's Treasures
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Our formulations harness the power of Malaysia's botanical heritage, carefully selected and crafted to restore balance and harmony.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 3: Sacred Self-Care */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Sacred Self-Care
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Transform everyday moments into meaningful rituals that honor your body's innate wisdom and natural rhythms.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              
              {/* Slide 4: Botanical Harmony */}
              <CarouselItem>
                <div className="h-[600px] md:h-[700px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" 
                       style={{backgroundImage: `url("/lovable-uploads/5f0e6477-2199-4db9-babb-73c92b345eea.png")`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center animate-fade-in max-w-2xl">
                      <h2 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide animate-fade-up">
                        Botanical Harmony
                      </h2>
                      <p className="font-karla text-xl md:text-2xl text-white/90 animate-fade-up" style={{animationDelay: '0.3s'}}>
                        Each ingredient tells a story of our connection to nature—a delicate balance of science and ancient healing traditions.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6 absolute bottom-8 left-0 right-0 z-10">
              <CarouselPrevious className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
              <CarouselNext className="static translate-y-0 mx-2 bg-white/20 hover:bg-white/40 border-white/30" />
            </div>
          </Carousel>
        </div>
      </section>
            
      {/* Brand Statement - Enhanced with subtle animations */}
      <section className="py-24 bg-brand-creamy-ivory/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 relative">
              <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
              <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">ESSENCE</span>
              <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
            </div>
            <h2 className="font-italiana text-2xl md:text-3xl uppercase tracking-wide mb-8">The DNA Philosophy</h2>
            <p className="font-karla text-lg text-brand-soft-gray leading-relaxed mb-8 max-w-2xl mx-auto">
              Our collection honors Malaysian heritage botanicals and time-tested wellness practices. Each formulation is a 
              poetic blend of nature and science, carefully composed to enhance your daily rituals and nurture holistic wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              <span className="bg-brand-lavender-mist/20 text-brand-dark px-4 py-1 text-sm rounded-full">Plant-Based</span>
              <span className="bg-brand-blush-rose/20 text-brand-dark px-4 py-1 text-sm rounded-full">Heritage Recipes</span>
              <span className="bg-brand-orchid-pink/20 text-brand-dark px-4 py-1 text-sm rounded-full">Clean Formulations</span>
              <span className="bg-brand-creamy-ivory/60 text-brand-dark px-4 py-1 text-sm rounded-full border border-brand-muted-rose/20">Artisanal Process</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shop Categories - Refined grid with subtle hover effects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <h2 className="font-italiana text-2xl uppercase text-center tracking-wide relative z-10">Shop the Collection</h2>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-brand-blush-rose to-transparent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {/* DNA Elixirs */}
            <Link to="/products" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4 shadow-sm">
                <img 
                  src="/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png"
                  alt="DNA Elixirs" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide group-hover:text-brand-muted-rose transition-colors">Elixirs</h3>
            </Link>
            
            {/* DNA Ritual Kits */}
            <Link to="/rituals" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4 shadow-sm">
                <img 
                  src="/lovable-uploads/34f94502-8118-4f8e-95d0-13db35fd36bb.png"
                  alt="DNA Ritual Kits" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide group-hover:text-brand-muted-rose transition-colors">Rituals</h3>
            </Link>
            
            {/* DNA Wisdom */}
            <Link to="/articles" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4 shadow-sm">
                <img 
                  src="/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png" 
                  alt="DNA Wisdom" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide group-hover:text-brand-muted-rose transition-colors">Wisdom</h3>
            </Link>
            
            {/* DNA Curations */}
            <div className="group relative">
              <div className="aspect-square bg-white relative overflow-hidden mb-4 shadow-sm">
                <img 
                  src="/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png" 
                  alt="DNA Curations" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-karla uppercase tracking-widest text-xs bg-white/70 backdrop-blur-sm px-4 py-2 shadow-sm">Coming Soon</span>
                </div>
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide">Curations</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Second Quote Section */}
      <section className="quote-container bg-gradient-to-r from-brand-blush-rose/10 to-brand-lavender-mist/10">
        <div className="quote-mark quote-mark-left">"</div>
        <div className="quote-mark quote-mark-right">"</div>
        <div className="container mx-auto max-w-3xl text-center px-4">
          <Feather className="mx-auto mb-6 text-brand-orchid-pink h-8 w-8 opacity-80 subtle-breathe" />
          <blockquote className="font-italiana text-2xl md:text-3xl italic mb-6 text-brand-dark">
            "Our rituals are not merely routines, but sacred moments where we reconnect with ourselves and honor our wellbeing."
          </blockquote>
          <p className="font-karla text-brand-deep-teal tracking-widest uppercase text-sm">— Datin Norehan</p>
        </div>
      </section>
      
      {/* Natural Harmony section with better styling and clarity */}
      <section className="w-full h-[50vh] md:h-[60vh] bg-cover bg-center relative overflow-hidden" 
               style={{backgroundImage: `url("/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png")`}}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="container mx-auto h-full flex items-center relative z-10">
          <div className="px-6 md:px-8 py-8 md:py-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg max-w-lg">
            <h3 className="font-italiana text-white text-3xl md:text-4xl mb-6 drop-shadow-md">Natural Harmony</h3>
            <p className="font-karla text-white text-lg md:text-xl leading-relaxed drop-shadow-md">
              Our ingredients are thoughtfully sourced to bring you the purest essence of nature's gifts, 
              creating a perfect harmony between traditional wisdom and modern science.
            </p>
            <Link to="/philosophy" className="inline-block mt-8">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-brand-dark transition-all duration-300">
                Discover Our Ingredients <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - Enhanced with refined aesthetic */}
      <section className="py-24 bg-gradient-to-r from-brand-lavender-mist/10 via-brand-creamy-ivory to-brand-blush-rose/10 border-t border-brand-blush-rose/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block mb-6">
              <Sparkles className="h-5 w-5 text-brand-orchid-pink mx-auto subtle-breathe" />
            </div>
            <h2 className="font-italiana text-2xl uppercase tracking-wide mb-8">Join Our Inner Circle</h2>
            <p className="font-karla text-brand-soft-gray mb-12 max-w-lg mx-auto">
              Subscribe for early access to limited formulations, wellness wisdom, and exclusive invitations to our botanical gatherings.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              className="border-b border-brand-soft-gray/30 rounded-none focus-visible:ring-0 focus-visible:border-brand-muted-rose h-12 bg-transparent" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="rounded-none h-12 min-w-[120px] bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : (
                      <span className="flex items-center">
                        Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            
            <p className="text-xs text-brand-soft-gray/80">
              By subscribing, you join our community of wellness enthusiasts. We treat your information with care.
            </p>
          </div>
        </div>
      </section>
      
      {/* Final Quote - Closing inspiration */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-lg text-center px-4">
          <blockquote className="font-italiana text-xl md:text-2xl text-brand-dark italic">
            "When we embrace nature's gifts with intention and knowledge, we unlock the path to true harmony and vitality."
          </blockquote>
          <p className="font-karla text-brand-muted-rose mt-4 tracking-widest uppercase text-sm">— Datin Norehan</p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
