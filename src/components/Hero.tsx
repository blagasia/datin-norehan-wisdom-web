
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
import { Mail } from 'lucide-react';

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
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background with elegant botanical pattern overlay */}
      <div className="absolute inset-0 bg-gradient-blush opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-dark mb-6 leading-tight">
            Datin Norehan's Apothecary:<br />
            <span className="text-brand-deep-teal">Natural Wellness Formulations</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-brand-soft-gray font-montserrat leading-relaxed">
            Experience our premium wellness solutions that nourish the body, mind, and soul. 
            Crafted with traditional wisdom, perfected by modern science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="bg-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/90 font-medium">
                Explore Collections
              </Button>
            </Link>
            <Link to="/philosophy">
              <Button variant="outline" className="border-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/10">
                Learn Our Philosophy
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* DNA Brand Vision - Refined from personal introduction */}
      <div className="container mx-auto px-4 relative z-10 mt-16 mb-12">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-lg border border-brand-blush-rose/20 shadow-sm">
          <div className="text-center mb-4">
            <h3 className="font-cormorant text-2xl md:text-3xl font-semibold mb-4 text-brand-deep-teal">The DNA Vision</h3>
            <div className="w-16 h-1 bg-brand-gilded-gold mx-auto mb-6"></div>
          </div>
          <p className="text-brand-soft-gray text-center text-lg leading-relaxed mb-2">
            DNA by Datin Norehan represents the culmination of ancient wellness traditions and modern scientific innovation. 
            Our formulations capture the essence of natural healing, carefully crafted to enhance your daily rituals and elevate 
            your wellbeing journey. Each product embodies our commitment to purity, efficacy, and sustainable luxury.
          </p>
          <p className="mt-4 text-right text-brand-deep-teal font-playfair italic">
            — Nurturing radiance from within
          </p>
        </div>
      </div>
      
      {/* DNA Brand Architecture Section - Adjusted layout for desktop */}
      <div className="container mx-auto px-4 relative z-10 mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-4">DNA by Datin Norehan</h2>
          <div className="w-16 h-1 bg-brand-gilded-gold mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* DNA Elixirs */}
            <Card className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">1</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Elixirs</h3>
              <p className="text-center text-brand-soft-gray mb-4 flex-grow">
                Premium wellness formulations that transform from within, featuring our flagship Collary Collagen.
              </p>
              <div className="text-center">
                <Link to="/products">
                  <Button variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10">
                    Browse Elixirs
                  </Button>
                </Link>
              </div>
            </Card>
            
            {/* DNA Ritual Kits */}
            <Card className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">2</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Ritual Kits</h3>
              <p className="text-center text-brand-soft-gray mb-4 flex-grow">
                Elevate your wellness routine with our curated ritual kits designed to enhance your daily self-care practice.
              </p>
              <div className="text-center">
                <Link to="/rituals">
                  <Button variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10">
                    Explore Ritual Kits
                  </Button>
                </Link>
              </div>
            </Card>
            
            {/* DNA Wisdom */}
            <Card className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">3</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Wisdom</h3>
              <p className="text-center text-brand-soft-gray mb-4 flex-grow">
                Educational content sharing extensive knowledge, from free articles to premium courses on natural healing practices.
              </p>
              <div className="text-center">
                <Link to="/articles">
                  <Button variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10">
                    Explore Knowledge
                  </Button>
                </Link>
              </div>
            </Card>
            
            {/* DNA Curations */}
            <Card className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-brand-blush-rose/80 text-white text-xs py-1 px-2 rounded-full">
                Coming Soon
              </div>
              <div className="w-14 h-14 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">4</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Curations</h3>
              <p className="text-center text-brand-soft-gray mb-4 flex-grow">
                Co-branded or partner products that expand our offerings with complementary brands that meet our quality standards.
              </p>
              <div className="text-center">
                <Button disabled variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10 opacity-60">
                  Discover Soon
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup Section */}
      <div className="container mx-auto px-4 relative z-10 mt-24 mb-16">
        <div className="max-w-4xl mx-auto bg-brand-blush-rose/10 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-brand-blush-rose/30 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="font-cormorant text-2xl md:text-3xl font-semibold mb-3 text-brand-deep-teal">Join Our Inner Circle</h3>
              <p className="text-brand-soft-gray mb-4">
                Become a part of our exclusive community to receive:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-teal"></div>
                  <span>Early access to new product launches</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-teal"></div>
                  <span>Member-only content and wellness guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-teal"></div>
                  <span>Exclusive event invitations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-teal"></div>
                  <span>Special offers and complimentary gifts</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-deep-teal/60 h-4 w-4" />
                            <Input 
                              placeholder="Your email address" 
                              className="pl-10 border-brand-blush-rose/30 bg-white focus-visible:ring-brand-deep-teal/50" 
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>
                  <p className="text-center text-xs text-brand-soft-gray/80 mt-2">
                    By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
