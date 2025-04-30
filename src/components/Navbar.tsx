
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';

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

  const navItemClasses = "text-sm font-medium hover:text-brand-gilded-gold transition-colors";
  const activeNavItemClasses = "text-brand-gilded-gold font-semibold";

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Articles', path: '/articles' },
    { name: 'Events', path: '/events' },
    { name: 'Ask Datin', path: '/ask' },
    { name: 'About', path: '/about' },
    { name: 'Loyalty', path: '/loyalty' },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`
            }
            end={item.path === '/'}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <header
      className={`fixed w-full transition-all duration-300 z-30 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-playfair font-bold">
            Datin Norehan
          </Link>

          {!isMobile ? (
            <nav className="flex items-center gap-8">
              <ul className="flex items-center space-x-8">{renderNavItems()}</ul>
              <div className="flex items-center gap-4">
                <LoyaltyWidget />
                <Link to="/contact">
                  <Button variant="outline" className="border-brand-gilded-gold/30 hover:bg-brand-gilded-gold/10">Contact</Button>
                </Link>
              </div>
            </nav>
          ) : (
            <div className="flex items-center gap-4">
              <LoyaltyWidget />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white border-l border-brand-blush-rose/20">
                  <nav className="flex flex-col h-full">
                    <div className="py-4 border-b border-brand-blush-rose/20">
                      <Link to="/" className="text-xl font-playfair font-bold">
                        Datin Norehan
                      </Link>
                    </div>
                    <ul className="flex flex-col gap-4 mt-8">{renderNavItems()}</ul>
                    <Link to="/contact" className="mt-auto mb-8 w-full">
                      <Button className="w-full bg-brand-blush-rose hover:bg-brand-blush-rose/90 text-brand-dark">Contact</Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
