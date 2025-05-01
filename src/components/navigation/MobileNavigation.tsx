
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, User, ShoppingBag, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';
import CartButton from '@/components/cart/CartButton';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useToast } from '@/components/ui/use-toast';

const MobileNavigation = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { isLoggedIn, logout } = useLoyalty();
  const { toast } = useToast();
  
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  // Simplified navigation structure
  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/story' },
    { name: 'Our Philosophy', path: '/philosophy' },
    { name: 'About DNA', path: '/dna-brand' },
  ];
  
  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'DNA Elixirs', path: '/products?category=Elixirs' },
    { name: 'DNA Rituals', path: '/rituals' },
  ];
  
  const knowledgeLinks = [
    { name: 'Wellness Articles', path: '/articles' },
    { name: 'Events & Workshops', path: '/events' },
    { name: 'Ask Datin', path: '/ask' },
  ];

  return (
    <div className="flex items-center">
      <CartButton />
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] max-w-sm bg-white overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="py-4 flex items-center justify-between border-b border-brand-blush-rose/20">
              {/* Updated logo styling to match the botanical watercolor logo */}
              <div className="flex flex-col">
                <span className="font-italiana text-xl tracking-wide">Datin Norehan</span>
                <span className="text-xs text-brand-deep-teal tracking-wider">APOTHECARY</span>
              </div>
              
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
              <div className="mb-6">
                <ul className="space-y-1">
                  {mainLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink 
                        to={link.path}
                        className={({ isActive }) => 
                          `block py-2 px-3 text-base ${isActive 
                            ? 'text-brand-deep-teal font-medium' 
                            : 'text-natural-dark hover:bg-brand-blush-rose/10'}`
                        }
                        end={link.path === '/'}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Shop Section */}
              <div className="mb-6">
                <button 
                  className="flex items-center justify-between w-full py-2 px-3 font-medium border-b border-brand-blush-rose/20"
                  onClick={() => toggleCategory('shop')}
                >
                  <span>Shop DNA Collection</span>
                  {openCategory === 'shop' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {openCategory === 'shop' && (
                  <ul className="pl-4 mt-2 space-y-1 bg-brand-sage-mist/10 py-2">
                    {productCategories.map((link) => (
                      <li key={link.path}>
                        <NavLink 
                          to={link.path}
                          className={({ isActive }) => 
                            `block py-2 px-3 text-base ${isActive 
                              ? 'text-brand-deep-teal font-medium' 
                              : 'text-natural-dark hover:bg-brand-blush-rose/10'}`
                          }
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Knowledge Section */}
              <div className="mb-6">
                <button 
                  className="flex items-center justify-between w-full py-2 px-3 font-medium border-b border-brand-blush-rose/20"
                  onClick={() => toggleCategory('knowledge')}
                >
                  <span>Wellness Knowledge</span>
                  {openCategory === 'knowledge' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {openCategory === 'knowledge' && (
                  <ul className="pl-4 mt-2 space-y-1 bg-brand-sage-mist/10 py-2">
                    {knowledgeLinks.map((link) => (
                      <li key={link.path}>
                        <NavLink 
                          to={link.path}
                          className={({ isActive }) => 
                            `block py-2 px-3 text-base ${isActive 
                              ? 'text-brand-deep-teal font-medium' 
                              : 'text-natural-dark hover:bg-brand-blush-rose/10'}`
                          }
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
