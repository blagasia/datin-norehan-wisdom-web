
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

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });
  
  // Handle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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

  const getParallaxStyle = (speed: number) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Elegant minimalist hero with refined typography */}
      <section className="relative bg-gradient-to-b from-white to-brand-creamy-ivory pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-brand-blush-rose text-brand-dark px-4 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-muted-rose" /> Artisanal Wellness
              </Badge>
            </div>
            <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-8 text-shimmer">
              Natural holistic apothecary
            </h1>
            <p className="font-karla text-base md:text-lg mb-12 text-brand-soft-gray leading-relaxed max-w-2xl mx-auto">
              Discover our carefully crafted wellness elixirs—where ancestral wisdom meets modern science for your body, mind, and spirit.
            </p>
            <div className="flex justify-center">
              <Link to="/products">
                <Button className="bg-transparent rounded-none text-brand-dark border-brand-dark hover:bg-brand-dark hover:text-white group">
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
      
      {/* Full-width hero image with parallax effect - Updated with new conceptual lifestyle image */}
      <section className="parallax-container w-full h-[80vh] relative overflow-hidden">
        <div 
          className="parallax-bg bg-cover bg-center w-full h-[100vh] absolute" 
          style={{
            backgroundImage: `url("/lovable-uploads/1581091226825-a6a2a5aee158.png")`,
            ...getParallaxStyle(0.3)
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-20">
          <div className="container mx-auto">
            <p className="font-italiana text-white text-lg md:text-xl tracking-wide">Traditional wisdom. Modern wellness.</p>
          </div>
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
      
      {/* Dreamy Nature Imagery Section with Parallax - Updated with new image */}
      <section className="parallax-container h-[60vh] relative overflow-hidden">
        <div 
          className="parallax-bg bg-cover bg-center w-full h-[70vh] absolute dreamy-filter" 
          style={{
            backgroundImage: `url("/lovable-uploads/5a036f15-ad25-4f98-b74e-196eb003b9c9.png")`,
            ...getParallaxStyle(0.4)
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 dreamy-overlay z-10"></div>
        <div className="container mx-auto relative z-20 h-full flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 max-w-lg text-center" 
               style={{backgroundImage: "url('/lovable-uploads/56c8ecfc-b55a-466b-8542-f2c698fb2dc3.png')", backgroundSize: '400px', backgroundBlendMode: 'overlay'}}>
            <h3 className="font-italiana text-2xl md:text-3xl mb-4">Nature's Treasures</h3>
            <p className="font-karla text-brand-soft-gray">
              Our formulations harness the power of Malaysia's botanical heritage, carefully selected and crafted to restore balance and harmony.
            </p>
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
                  src="/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png"
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
            
            {/* DNA Curations - Updated with new image */}
            <div className="group relative">
              <div className="aspect-square bg-white relative overflow-hidden mb-4 shadow-sm">
                <img 
                  src="/lovable-uploads/34f94502-8118-4f8e-95d0-13db35fd36bb.png" 
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
      
      {/* Whimsical Natural Elements with Parallax - Updated with new image */}
      <section className="parallax-container h-[50vh] relative overflow-hidden">
        <div 
          className="parallax-bg bg-cover bg-center w-full h-[60vh] absolute dreamy-filter" 
          style={{
            backgroundImage: `url("/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png")`,
            ...getParallaxStyle(0.5)
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 dreamy-overlay z-10"></div>
        <div className="container mx-auto relative z-20 h-full flex items-center">
          <div className="px-4 md:max-w-lg">
            <h3 className="font-italiana text-white text-3xl md:text-4xl mb-3 text-shadow">Natural Harmony</h3>
            <p className="font-karla text-white text-shadow-sm">
              Our ingredients are thoughtfully sourced to bring you the purest essence of nature's gifts.
            </p>
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
