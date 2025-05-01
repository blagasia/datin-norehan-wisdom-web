
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const mainNavItems = [
  { name: 'Our Story', path: '/story' },
  { name: 'About', path: '/about' },
  { name: 'Ask Datin', path: '/ask' },
];

const dnaShopItems = [
  { name: 'All DNA Products', path: '/products', description: 'Browse all DNA by Datin Norehan products' },
  { name: 'Collections Overview', path: '/categories', description: 'Explore all four DNA pillars' },
];

const elixirsItems = [
  { name: 'All Elixirs', path: '/products', description: 'Browse all wellness formulations' },
  { name: 'Detox Drinks', path: '/products?category=Detox', description: 'Refresh and rejuvenate your system' },
  { name: 'Collagen Supplements', path: '/products?category=Collagen', description: 'Enhance your natural beauty' },
  { name: 'Herbal Tonics', path: '/products?category=Herbal', description: 'Traditional remedies for modern wellness' },
  { name: 'Beauty Solutions', path: '/products?category=Beauty', description: 'Radiance from within' },
];

const ritualsItems = [
  { name: 'Premium Accessories', path: '/rituals', description: 'Elevate your wellness experience' },
  { name: 'Custom Ritual Kits', path: '/rituals/custom', description: 'Create your personalized ritual set' },
  { name: 'Ready Bundles', path: '/rituals/bundles', description: 'Curated collections for optimal results' },
  { name: 'Gift Options', path: '/rituals/gifts', description: 'Perfect presents for loved ones' },
];

const wisdomItems = [
  { name: 'Articles', path: '/articles', description: 'Free wellness knowledge' },
  { name: 'Events & Workshops', path: '/events', description: 'Interactive learning experiences' },
  { name: 'E-Books', path: '/articles?type=pdf', description: 'Premium digital publications' },
];

const curationsItems = [
  { name: 'Upcoming Collections', path: '/curations/upcoming', description: 'Preview our upcoming curation releases' },
  { name: 'Exclusive Sets', path: '/curations/exclusive', description: 'Limited edition wellness collections' },
  { name: 'Membership Access', path: '/curations/membership', description: 'Special access for loyal customers' },
  { name: 'Register Interest', path: '/curations/register', description: 'Be notified when curations launch' },
];

const MainNavigation = () => {
  const navItemClasses = "text-sm font-medium hover:text-brand-deep-teal transition-colors";
  const activeNavItemClasses = "text-brand-deep-teal font-semibold";
  
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="text-xl md:text-2xl font-italiana tracking-wide mr-8">
              Datin Norehan Apothecary
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-brand-deep-teal">
              Shop DNA
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-5 gap-3 p-4 w-[900px]">
                <div className="col-span-1 border-r border-brand-blush-rose/20 pr-3">
                  <div className="mb-3 font-semibold text-brand-deep-teal">DNA Collections</div>
                  <ul className="space-y-1">
                    {dnaShopItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-1">
                  <div className="mb-3 font-semibold text-brand-deep-teal">DNA Elixirs</div>
                  <ul className="space-y-1">
                    {elixirsItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-1">
                  <div className="mb-3 font-semibold text-brand-deep-teal">DNA Rituals</div>
                  <ul className="space-y-1">
                    {ritualsItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-1">
                  <div className="mb-3 font-semibold text-brand-deep-teal">DNA Wisdom</div>
                  <ul className="space-y-1">
                    {wisdomItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-1">
                  <div className="mb-3 font-semibold text-brand-deep-teal">DNA Curations</div>
                  <ul className="space-y-1">
                    {curationsItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-r from-brand-sage-mist/20 to-brand-blush-rose/20 p-3">
                <Link to="/dna-brand" className="text-brand-deep-teal hover:underline text-sm flex justify-center">
                  Learn more about DNA by Datin Norehan →
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          {mainNavItems.map((item) => (
            <NavigationMenuItem key={item.name} className="px-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`
                }
                end={item.path === '/'}
              >
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        <LoyaltyWidget />
        <Link to="/loyalty">
          <Button
            variant="outline"
            size="sm"
            className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white flex items-center gap-2"
          >
            <User size={16} />
            <span>Become a Devotee</span>
          </Button>
        </Link>
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="text-brand-deep-teal">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MainNavigation;
