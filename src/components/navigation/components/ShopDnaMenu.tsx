
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavMenuItems from './NavMenuItems';
import { 
  dnaShopItems, 
  elixirsItems, 
  ritualsItems, 
  wisdomItems, 
  curationsItems 
} from '../data/navigationLinks';

const ShopDnaMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-brand-deep-teal">
        Shop DNA
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid grid-cols-5 gap-3 p-4 w-[900px]">
          <div className="col-span-1 border-r border-brand-blush-rose/20 pr-3">
            <NavMenuItems title="DNA Collections" items={dnaShopItems} />
          </div>
          
          <NavMenuItems title="DNA Elixirs" items={elixirsItems} />
          <NavMenuItems title="DNA Rituals" items={ritualsItems} />
          <NavMenuItems title="DNA Wisdom" items={wisdomItems} />
          <NavMenuItems title="DNA Curations" items={curationsItems} />
        </div>
        <div className="bg-gradient-to-r from-brand-sage-mist/20 to-brand-blush-rose/20 p-3">
          <Link to="/dna-brand" className="text-brand-deep-teal hover:underline text-sm flex justify-center">
            About DNA by Datin Norehan →
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ShopDnaMenu;
