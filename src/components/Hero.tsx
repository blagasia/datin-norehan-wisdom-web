
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowRight } from 'lucide-react';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (values: SubscribeFormValues) => {
    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Success!",
      description: "You've been added to our exclusive community.",
    });
    form.reset();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Clean, minimal with subtle background */}
      <section className="relative bg-brand-creamy-ivory py-16 md:py-24 border-b border-brand-blush-rose/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-normal text-brand-dark mb-6 tracking-tight">
              Premium wellness formulations derived from traditional wisdom
            </h1>
            <p className="text-base md:text-lg mb-10 text-brand-soft-gray font-montserrat leading-relaxed">
              Datin Norehan's natural wellness solutions that nourish the body, mind, and soul.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/products">
                <Button className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white px-8 py-6 rounded-none h-auto">
                  Shop Bestsellers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shop Categories - GOOP-inspired grid with large bold text */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="font-cormorant text-3xl font-normal text-center mb-16">Shop DNA by Datin Norehan</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* DNA Elixirs */}
            <Link to="/products" className="group">
              <div className="aspect-square bg-brand-sage-mist/20 relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1564305736039-3d0f7c23fd0e?q=80" 
                  alt="DNA Elixirs" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-cormorant text-xl text-center">DNA Elixirs</h3>
            </Link>
            
            {/* DNA Ritual Kits */}
            <Link to="/rituals" className="group">
              <div className="aspect-square bg-brand-blush-rose/20 relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80" 
                  alt="DNA Ritual Kits" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-cormorant text-xl text-center">DNA Ritual Kits</h3>
            </Link>
            
            {/* DNA Wisdom */}
            <Link to="/articles" className="group">
              <div className="aspect-square bg-brand-orchid-pink/10 relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80" 
                  alt="DNA Wisdom" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-cormorant text-xl text-center">DNA Wisdom</h3>
            </Link>
            
            {/* DNA Curations */}
            <div className="group relative">
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-white text-xs px-3 py-1 font-medium">Coming Soon</span>
              </div>
              <div className="aspect-square bg-brand-gilded-gold/10 relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611242320536-f12d3541249b?q=80" 
                  alt="DNA Curations" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
              </div>
              <h3 className="font-cormorant text-xl text-center">DNA Curations</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brand Vision - Clean card with elegant typography */}
      <section className="py-12 md:py-16 bg-brand-creamy-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cormorant text-3xl font-normal text-center mb-3">The DNA Vision</h2>
            <div className="w-16 h-px bg-brand-gilded-gold mx-auto mb-8"></div>
            <p className="text-brand-soft-gray text-center text-lg leading-relaxed mb-6">
              DNA by Datin Norehan represents the culmination of ancient wellness traditions and modern scientific innovation. 
              Our formulations capture the essence of natural healing, carefully crafted to enhance your daily rituals and elevate 
              your wellbeing journey. Each product embodies our commitment to purity, efficacy, and sustainable luxury.
            </p>
            <p className="text-right text-brand-deep-teal font-playfair italic">
              — Nurturing radiance from within
            </p>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - GOOP-inspired clean newsletter */}
      <section className="py-16 md:py-20 bg-white border-t border-brand-blush-rose/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-cormorant text-3xl font-normal mb-4">Join Our Community</h2>
            <p className="text-brand-soft-gray mb-8">
              Subscribe to receive exclusive content, early access to product launches, and invitations to our wellness events.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              className="border-brand-soft-gray/30 rounded-none focus-visible:ring-brand-deep-teal/30 h-12" 
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
                    className="bg-brand-dark hover:bg-brand-dark/90 text-white rounded-none h-12 px-8"
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
              By subscribing, you agree to our Privacy Policy. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
