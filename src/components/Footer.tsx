
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Book, Calendar, ShoppingBag, Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-xl font-semibold mb-4">Datin Norehan's Apothecary</h3>
            <p className="text-white/70 mb-6">
              Experience premium, 100% natural and organic wellness products crafted with passion and perfected by nature.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook size={24} />
              </Link>
              <Link to="#" className="text-white hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram size={24} />
              </Link>
              <Link to="#" className="text-white hover:text-brand-gilded-gold transition-colors duration-300" aria-label="Twitter">
                <Twitter size={24} />
              </Link>
              <Link to="#" className="text-white hover:text-brand-gilded-gold transition-colors duration-300" aria-label="YouTube">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-5 h-5 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Elixirs</h4>
            </div>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">All Elixirs</Link></li>
              <li><Link to="/products?category=Detox" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Detox Drinks</Link></li>
              <li><Link to="/products?category=Collagen" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Collagen Supplements</Link></li>
              <li><Link to="/products?category=Herbal" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Herbal Tonics</Link></li>
              <li><Link to="/products?category=Beauty" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Beauty Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Wisdom</h4>
            </div>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Articles</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Events & Workshops</Link></li>
              <li><Link to="/articles?type=pdf" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">E-Books</Link></li>
            </ul>
            
            <div className="flex items-center mt-6 mb-2">
              <Compass className="w-5 h-5 mr-2 text-brand-gilded-gold" />
              <h4 className="font-playfair text-lg font-semibold">DNA Curations</h4>
            </div>
            <p className="text-white/50 text-sm">Coming Soon</p>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-white/70">Email: blagasia@gmail.com</li>
              <li className="text-white/70">Phone: +60 12 345 6789</li>
              <li className="text-white/70">Address: Kuala Lumpur, Malaysia</li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-playfair text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><Link to="/" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Home</Link></li>
                <li><Link to="/about" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">About Us</Link></li>
                <li><Link to="/ask" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Ask Datin</Link></li>
                <li><Link to="/loyalty" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Loyalty Program</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} DNA by Datin Norehan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
