
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

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
      {/* Hero Section - Asever-inspired full-width minimal hero */}
      <section className="relative bg-white pt-6 pb-16 md:pt-10 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Natural holistic wellness
            </h1>
            <p className="font-karla text-base md:text-lg mb-10 text-brand-soft-gray leading-relaxed max-w-2xl mx-auto">
              Premium formulations with traditional wisdom for modern wellbeing.
            </p>
            <div className="flex justify-center">
              <Link to="/products">
                <Button className="asever-button bg-transparent rounded-none text-brand-dark border-brand-dark hover:bg-brand-dark hover:text-white">
                  Shop Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full-width hero image - Asever style */}
      <section className="w-full h-[70vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1564305736039-3d0f7c23fd0e?q=80" 
          alt="DNA by Datin Norehan" 
          className="w-full h-full object-cover object-center"
        />
      </section>
      
      {/* Brand Statement - Clean minimalist text block */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-italiana text-2xl md:text-3xl uppercase tracking-wide mb-6">The DNA Vision</h2>
            <p className="font-karla text-lg text-brand-soft-gray leading-relaxed mb-6 max-w-2xl mx-auto">
              A curated collection of natural formulations that embody our commitment to traditional wellness practices. 
              Each product celebrates the harmony between ancient knowledge and modern self-care rituals.
            </p>
          </div>
        </div>
      </section>
      
      {/* Shop Categories - Asever-inspired grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="font-italiana text-2xl uppercase text-center tracking-wide mb-16">Shop the Collection</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* DNA Elixirs */}
            <Link to="/products" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1564305736039-3d0f7c23fd0e?q=80" 
                  alt="DNA Elixirs" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide">Elixirs</h3>
            </Link>
            
            {/* DNA Ritual Kits */}
            <Link to="/rituals" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80" 
                  alt="DNA Ritual Kits" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide">Rituals</h3>
            </Link>
            
            {/* DNA Wisdom */}
            <Link to="/articles" className="group">
              <div className="aspect-square bg-white relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80" 
                  alt="DNA Wisdom" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide">Wisdom</h3>
            </Link>
            
            {/* DNA Curations */}
            <div className="group relative">
              <div className="aspect-square bg-white relative overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611242320536-f12d3541249b?q=80" 
                  alt="DNA Curations" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-karla uppercase tracking-widest text-xs bg-white/70 backdrop-blur-sm px-4 py-2">Coming Soon</span>
                </div>
              </div>
              <h3 className="font-italiana text-center text-xl tracking-wide">Curations</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section - Asever-inspired minimalist form */}
      <section className="py-20 bg-brand-creamy-ivory border-t border-brand-blush-rose/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-italiana text-2xl uppercase tracking-wide mb-6">Join Our Community</h2>
            <p className="font-karla text-brand-soft-gray mb-10 max-w-lg mx-auto">
              Subscribe to receive exclusive content, early access to product launches, and invitations to our wellness events.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
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
                              className="border-b border-brand-soft-gray/30 rounded-none focus-visible:ring-0 focus-visible:border-brand-dark h-12 bg-transparent" 
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
                    className="asever-button rounded-none h-12 min-w-[120px]"
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
