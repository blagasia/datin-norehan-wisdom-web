
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Articles', path: '/articles' },
    { name: 'Ask Datin', path: '/ask' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="w-full bg-white py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-playfair font-semibold">Datin Norehan</h1>
          <span className="text-xs uppercase tracking-widest ml-2 text-natural-gray">Apothecary</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className="text-natural-dark hover:text-natural-gray transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Button className="btn-primary">Shop Now</Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-natural-dark"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b shadow-lg animate-fade-in">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-natural-dark py-2 hover:text-natural-gray transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="btn-primary w-full">Shop Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
