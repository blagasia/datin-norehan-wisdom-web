
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">Datin Norehan</h3>
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
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">About Us</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Products</Link></li>
              <li><Link to="/articles" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Articles</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Events</Link></li>
              <li><Link to="/ask" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Ask Datin</Link></li>
              <li><Link to="/loyalty" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Loyalty Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Detox Drinks</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Collagen Supplements</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Herbal Tonics</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Beauty Solutions</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-brand-blush-rose transition-colors duration-300">Wellness Kits</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-white/70">Email: blagasia@gmail.com</li>
              <li className="text-white/70">Phone: +60 12 345 6789</li>
              <li className="text-white/70">Address: Kuala Lumpur, Malaysia</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Datin Norehan Apothecary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
