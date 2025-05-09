
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MainNavigation from './navigation/MainNavigation';
import MobileNavigation from './navigation/MobileNavigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white/80 backdrop-blur-sm py-3'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="block lg:hidden">
            <div className="flex flex-col items-center">
              <span className="text-xl font-italiana tracking-wide">DNA</span>
              <span className="text-xs text-brand-deep-teal tracking-wider">BY DATIN NOREHAN</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center justify-between w-full">
            <MainNavigation />
          </div>
          
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
