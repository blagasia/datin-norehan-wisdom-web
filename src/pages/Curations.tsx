
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Package, Calendar, Users, Clock, Star, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const Curations = () => {
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterInterest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interest registered!",
      description: "We'll notify you when new curations are available.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Exclusive Curations | Datin Norehan"
        description="Discover limited edition wellness collections and exclusive sets curated by Datin Norehan."
      />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-4">Exclusive Collections</Badge>
              <h1 className="font-italiana text-4xl md:text-5xl font-bold mb-6">DNA Curations</h1>
              <p className="text-xl text-natural-gray max-w-3xl mx-auto mb-8">
                Limited edition, premium collections that bring together the finest products, accessories, and wisdom in a beautifully curated experience.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="#upcoming">
                  <Button variant="outline">Upcoming Collections</Button>
                </Link>
                <Link to="#register">
                  <Button>Register Interest</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* What are Curations */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="font-italiana text-4xl mb-6">What Are DNA Curations?</h2>
                  <p className="text-natural-gray mb-4">
                    DNA Curations are exclusive, limited-release collections of our most premium offerings, thoughtfully assembled around specific wellness themes.
                  </p>
                  <p className="text-natural-gray mb-4">
                    Each curation is released just a few times per year and includes rare formulations, limited edition accessories, and exclusive educational content not available elsewhere.
                  </p>
                  <p className="text-natural-gray mb-6">
                    These meticulously crafted sets represent the pinnacle of what DNA has to offer, with each component selected to complement and enhance the others.
                  </p>
                </div>
                <div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png" 
                      alt="DNA Curations" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-sage-mist/40 flex items-center justify-center mb-6">
                    <Package className="h-6 w-6 text-brand-deep-teal" />
                  </div>
                  <h3 className="font-italiana text-2xl mb-3">Limited Edition</h3>
                  <p className="text-natural-gray">
                    Each curation is produced in small quantities to ensure exclusivity and the highest standards of quality.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-blush-rose/40 flex items-center justify-center mb-6">
                    <Calendar className="h-6 w-6 text-brand-deep-teal" />
                  </div>
                  <h3 className="font-italiana text-2xl mb-3">Seasonal Releases</h3>
                  <p className="text-natural-gray">
                    Our curations align with seasonal wellness needs, offering timely support for your changing health priorities throughout the year.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-lavender-mist/40 flex items-center justify-center mb-6">
                    <Users className="h-6 w-6 text-brand-deep-teal" />
                  </div>
                  <h3 className="font-italiana text-2xl mb-3">Member Priority</h3>
                  <p className="text-natural-gray">
                    Loyalty program members receive early access to new curations before they're available to the general public.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Collections */}
        <section id="upcoming" className="py-16 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-italiana text-4xl mb-6">Upcoming Collections</h2>
                <p className="text-natural-gray max-w-3xl mx-auto">
                  Here's a preview of what we're preparing to release in the coming months. Register your interest to be notified when these limited collections become available.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src="/lovable-uploads/17b2f70d-878c-47a4-b942-4f69f9dc2c5b.png" 
                      alt="Summer Radiance Collection" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="text-brand-deep-teal border-brand-deep-teal">Summer 2025</Badge>
                      <div className="flex items-center text-sm text-natural-gray">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                    <h3 className="font-italiana text-2xl mb-2">Summer Radiance Collection</h3>
                    <p className="text-natural-gray mb-4">
                      A luxurious curation focusing on skin radiance and hydration during the summer months, featuring our new Luminous Collagen Elixir, Crystal Face Roller, and exclusive Glow Guide.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                        </div>
                        <div className="text-sm text-natural-gray">Limited to 100 sets</div>
                      </div>
                      <Button variant="outline">Notify Me</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src="/lovable-uploads/0eac78ee-8a47-4f36-82e6-165e32f3d2d0.png" 
                      alt="Autumn Wellness Retreat" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="text-brand-deep-teal border-brand-deep-teal">Autumn 2025</Badge>
                      <div className="flex items-center text-sm text-natural-gray">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>September 2025</span>
                      </div>
                    </div>
                    <h3 className="font-italiana text-2xl mb-2">Autumn Wellness Retreat</h3>
                    <p className="text-natural-gray mb-4">
                      Transform your home into a personal wellness retreat with this collection featuring our Immunity Boost Elixir, Ceramic Diffuser, exclusive Essential Oil Blend, and digital Seasonal Wellness Guide.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                          <Star className="h-4 w-4 text-brand-gilded-gold" />
                        </div>
                        <div className="text-sm text-natural-gray">Limited to 75 sets</div>
                      </div>
                      <Button variant="outline">Notify Me</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Membership Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-brand-deep-teal to-brand-sage-mist rounded-lg overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="font-italiana text-3xl text-white mb-4">Exclusive Access for Members</h2>
                  <p className="text-white/90 mb-6">
                    Join our loyalty program to receive priority access to limited edition curations before they're available to the public, plus enjoy special pricing and exclusive content.
                  </p>
                  <Link to="/loyalty">
                    <Button className="bg-white text-brand-deep-teal hover:bg-white/90 w-full sm:w-auto">
                      Become a Devotee <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src="/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png" 
                    alt="Membership Benefits" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Register Interest Section */}
        <section id="register" className="py-16 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-md">
              <div className="text-center mb-8">
                <h2 className="font-italiana text-3xl mb-3">Register Your Interest</h2>
                <p className="text-natural-gray">
                  Be the first to know when new curations become available. No spam, just timely notifications about our exclusive collections.
                </p>
              </div>
              
              <form onSubmit={handleRegisterInterest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Which collections interest you?</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-brand-blush-rose/20 px-3 py-1">
                      Summer Collection
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-brand-blush-rose/20 px-3 py-1">
                      Autumn Collection
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-brand-blush-rose/20 px-3 py-1">
                      Winter Wellness
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-brand-blush-rose/20 px-3 py-1">
                      Limited Editions
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-brand-blush-rose/20 px-3 py-1">
                      All Collections
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-center">
                  <Button type="submit" className="px-8">Register Interest</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Curations;
