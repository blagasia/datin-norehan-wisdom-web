
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useToast } from '@/components/ui/use-toast';
import CartButton from './cart/CartButton';
import MobileNavigation from './navigation/MobileNavigation';
import MainNavigation from './navigation/MainNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { isLoggedIn, logout } = useLoyalty();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="fixed w-full z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - with improved mobile sizing */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="DNA Code" 
              className="h-6 md:h-8 mr-2" 
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg'; 
                e.currentTarget.alt = 'DNA';
              }}
            />
            <span className="font-italiana text-lg md:text-xl">Datin Norehan</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden lg:flex justify-between w-full pl-10">
              <MainNavigation />
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && <MobileNavigation />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
