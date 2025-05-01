import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useToast } from '@/components/ui/use-toast';
import CartButton from './cart/CartButton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useLoyalty();
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const mainNavItems = [
    { href: "/products", label: "DNA Elixirs" },
    { href: "/rituals", label: "DNA Rituals" },
    { href: "/articles", label: "Wellness Articles" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="fixed w-full z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="DNA Code" className="h-8 mr-2" />
            <span className="font-bold text-xl">DNA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <Link key={item.href} to={item.href} className="px-3 py-2 text-sm font-medium text-natural-black hover:text-brand-deep-teal transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Nav Buttons */}
          <div className="flex items-center">
            <Link to="/loyalty" className="hidden lg:block">
              <Button variant="ghost" className="text-natural-black hover:text-brand-deep-teal">
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </Button>
            </Link>
            
            {/* Cart Button */}
            <CartButton />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="p-4 flex flex-col space-y-2">
            {mainNavItems.map((item) => (
              <Link key={item.href} to={item.href} className="block py-2 text-natural-black hover:text-brand-deep-teal font-medium">
                {item.label}
              </Link>
            ))}
            <Link to="/loyalty" className="block py-2 text-natural-black hover:text-brand-deep-teal font-medium">
              {isLoggedIn ? 'My Account' : 'Sign In'}
            </Link>
            {isLoggedIn && (
              <Button variant="ghost" className="text-natural-black hover:text-brand-deep-teal" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
