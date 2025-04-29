
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-natural-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4">Datin Norehan</h3>
            <p className="text-white/70 mb-6">
              Experience premium, 100% natural and organic wellness products crafted with passion and perfected by nature.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-natural-purple transition-colors duration-300" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-natural-purple transition-colors duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-white hover:text-natural-purple transition-colors duration-300" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-natural-purple transition-colors duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors duration-300">Products</Link></li>
              <li><Link to="/articles" className="text-white/70 hover:text-white transition-colors duration-300">Articles</Link></li>
              <li><Link to="/ask" className="text-white/70 hover:text-white transition-colors duration-300">Ask Datin</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors duration-300">Detox Drinks</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors duration-300">Collagen Supplements</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors duration-300">Herbal Tonics</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors duration-300">Beauty Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-white/70">Email: info@datinnorehan.com</li>
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
