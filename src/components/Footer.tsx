
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Book, Calendar, ShoppingBag, Compass, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would connect to an API
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter",
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Footer Section with Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-2xl font-semibold mb-6 text-brand-blush-rose">Datin Norehan's Apothecary</h3>
            <p className="text-white/80 mb-8 max-w-md leading-relaxed">
              Experience premium, 100% natural and organic wellness products crafted with passion and perfected by nature. Our mission is to bring holistic healing solutions to everyday life.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-5">
              <Link to="#" className="text-white/80 hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-white/80 hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-white/80 hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-white/80 hover:text-brand-gilded-gold transition-colors duration-300" aria-label="YouTube">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <div className="flex items-center mb-5">
              <ShoppingBag className="w-4 h-4 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Elixirs</h4>
            </div>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">All Elixirs</Link></li>
              <li><Link to="/products?category=Detox" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Detox Drinks</Link></li>
              <li><Link to="/products?category=Collagen" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Collagen Supplements</Link></li>
              <li><Link to="/products?category=Herbal" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Herbal Tonics</Link></li>
              <li><Link to="/products?category=Beauty" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Beauty Solutions</Link></li>
            </ul>
          </div>
          
          {/* Wisdom & Curations */}
          <div>
            <div className="flex items-center mb-5">
              <Book className="w-4 h-4 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Wisdom</h4>
            </div>
            <ul className="space-y-3">
              <li><Link to="/articles" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Articles</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">Events & Workshops</Link></li>
              <li><Link to="/articles?type=pdf" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300 block">E-Books</Link></li>
            </ul>
            
            <div className="flex items-center mt-8 mb-3">
              <Compass className="w-4 h-4 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Curations</h4>
            </div>
            <div className="pl-6">
              <Link to="/curations/upcoming" className="text-white/50 text-sm hover:text-brand-blush-rose transition-colors duration-300 inline-flex items-center">
                Coming Soon 
                <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-gilded-gold"></span>
              </Link>
            </div>
          </div>
          
          {/* Contact & Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-1 text-brand-gilded-gold flex-shrink-0" />
                <span className="text-white/80">blagasia@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 mr-2 mt-1 text-brand-gilded-gold flex-shrink-0" />
                <span className="text-white/80">+60 12 345 6789</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-brand-gilded-gold flex-shrink-0" />
                <span className="text-white/80">Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-playfair text-lg font-semibold mb-3">Quick Links</h4>
              <div className="grid grid-cols-2 gap-y-2">
                <Link to="/" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Home</Link>
                <Link to="/about" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">About Us</Link>
                <Link to="/ask" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Ask Datin</Link>
                <Link to="/loyalty" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Loyalty Program</Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Newsletter */}
        <div className="border-t border-white/10 mt-12 pt-10 pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="font-playfair text-xl mb-4">Join Our Newsletter</h4>
            <p className="text-white/70 mb-6">Stay updated with our latest products, wellness tips, and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-gilded-gold focus:border-brand-gilded-gold text-white w-full"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="taupe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer - Copyright & Legal */}
        <div className="border-t border-white/10 mt-6 pt-8 flex flex-col md:flex-row md:items-center justify-between">
          <p className="text-white/50 text-sm mb-4 md:mb-0">&copy; {currentYear} DNA by Datin Norehan. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            <Link to="/terms-of-service" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/shipping-policy" className="hover:text-white transition-colors duration-200">Shipping</Link>
            <Link to="/return-policy" className="hover:text-white transition-colors duration-200">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
