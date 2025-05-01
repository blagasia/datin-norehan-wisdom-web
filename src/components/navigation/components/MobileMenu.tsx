
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useToast } from '@/components/ui/use-toast';
import MobileNavCategory from './MobileNavCategory';
import BrandLogo from './BrandLogo';
import { 
  mainNavItems,
  dnaShopItems, 
  elixirsItems, 
  ritualsItems, 
  wisdomItems 
} from '../data/navigationLinks';

const MobileMenu = () => {
  const { isLoggedIn, logout } = useLoyalty();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  // Simplified navigation structure using the shared navigation data
  const mainLinks = [
    { name: 'Home', path: '/' },
    ...mainNavItems
  ];
  
  const shopItems = [
    ...dnaShopItems,
    ...elixirsItems.slice(0, 2),
    ...ritualsItems.slice(0, 2)
  ];
  
  const knowledgeLinks = [
    ...wisdomItems,
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="py-4 flex items-center justify-between border-b border-brand-blush-rose/20">
        <BrandLogo />
        
        {isLoggedIn ? (
          <Button
            variant="outline"
            size="sm"
            className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white"
            onClick={handleLogout}
          >
            <User size={16} className="mr-2" />
            <span className="text-sm">Logout</span>
          </Button>
        ) : (
          <Link to="/loyalty">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white"
            >
              <User size={16} className="mr-2" />
              <span className="text-sm">Login</span>
            </Button>
          </Link>
        )}
      </div>
      
      <div className="my-4 px-3 py-2 bg-brand-deep-teal/10 rounded">
        <div className="flex flex-col items-center">
          <span className="text-lg font-italiana tracking-wide">DNA</span>
          <span className="text-xs text-brand-deep-teal tracking-wider">BY DATIN NOREHAN</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        {/* Main Links */}
        <MobileNavLinks links={mainLinks} title="Main" />
        
        {/* Shop Section */}
        <MobileNavCategory title="Shop DNA Collection" items={shopItems} />
        
        {/* Knowledge Section */}
        <MobileNavCategory title="Wellness Knowledge" items={knowledgeLinks} />
      </nav>
      
      <div className="mt-auto mb-6">
        <Link to="/loyalty" className="w-full block">
          <Button variant="default" className="w-full bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90">
            <User className="mr-2 h-4 w-4" />
            Become a Devotee
          </Button>
        </Link>
      </div>
    </div>
  );
};

const MobileNavLinks = ({ links, title }: { links: { name: string; path: string }[], title: string }) => {
  return (
    <div className="mb-6">
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.path}>
            <MobileNavLink name={link.name} path={link.path} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
