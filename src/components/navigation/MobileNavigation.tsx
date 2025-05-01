
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartButton from '@/components/cart/CartButton';
import MobileMenu from './components/MobileMenu';

const MobileNavigation = () => {
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
          <MobileMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
