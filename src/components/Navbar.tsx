
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MainNavigation from '@/components/navigation/MainNavigation';
import MobileNavigation from '@/components/navigation/MobileNavigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full transition-all duration-300 z-30 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {!isMobile ? (
            <MainNavigation />
          ) : (
            <>
              <div>
                <a href="/" className="text-xl md:text-2xl font-italiana tracking-wide">
                  Datin Norehan
                </a>
              </div>
              <MobileNavigation />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
