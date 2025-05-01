
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Import components
import BrandLogo from './components/BrandLogo';
import MainNavLink from './components/MainNavLink';
import ShopDnaMenu from './components/ShopDnaMenu';
import UserActions from './components/UserActions';

// Import data
import { mainNavItems } from './data/navigationLinks';

// ListItem component kept for potential future use
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal focus:bg-brand-blush-rose/10",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MainNavigation = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <BrandLogo className="mr-8" />
          </NavigationMenuItem>
          
          <ShopDnaMenu />
          
          {mainNavItems.map((item) => (
            <NavigationMenuItem key={item.name} className="px-2">
              <MainNavLink name={item.name} path={item.path} />
            </NavigationMenuItem>
          ))}
          
          <NavigationMenuItem className="px-2">
            <MainNavLink name="About DNA" path="/dna-brand" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <UserActions />
    </>
  );
};

export default MainNavigation;
