
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartButton from '@/components/cart/CartButton';
import MobileMenu from './components/MobileMenu';
import { useCart } from '@/context/CartContext';

const MobileNavigation = () => {
  return (
    <div className="flex items-center gap-4">
      <CartButton />
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Menu" 
            className="focus:outline-none focus:ring-2 focus:ring-brand-deep-teal/20 focus:ring-offset-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[85%] sm:max-w-sm bg-white overflow-y-auto p-0 pt-safe-area"
        >
          <MobileMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
