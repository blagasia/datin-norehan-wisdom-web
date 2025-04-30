
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Book, Calendar, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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

  // Updated navigation structure based on brand architecture
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ask Datin', path: '/ask' },
    { name: 'Contact', path: '/contact' },
  ];

  // DNA by Datin Norehan Categories
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
    { name: 'Articles', path: '/articles', description: 'Free wellness knowledge', icon: Book },
    { name: 'Events & Workshops', path: '/events', description: 'Interactive learning experiences', icon: Calendar },
    { name: 'E-Books', path: '/articles?type=pdf', description: 'Premium digital publications', icon: Book },
  ];

  const renderMainNavItems = () => (
    <>
      {mainNavItems.map((item) => (
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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blush-rose/10 hover:text-brand-gilded-gold focus:bg-brand-blush-rose/10",
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
            <nav className="flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-brand-gilded-gold">
                      DNA Elixirs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {elixirsItems.map((item) => (
                          <ListItem
                            key={item.name}
                            title={item.name}
                            href={item.path}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-brand-gilded-gold">
                      DNA Rituals
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {ritualsItems.map((item) => (
                          <ListItem
                            key={item.name}
                            title={item.name}
                            href={item.path}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-brand-gilded-gold">
                      DNA Wisdom
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {wisdomItems.map((item) => (
                          <ListItem
                            key={item.name}
                            title={item.name}
                            href={item.path}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navItemClasses}>
                      <Link to="/curations">
                        DNA Curations <span className="text-xs text-brand-blush-rose ml-1">(Coming Soon)</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navItemClasses}>
                      <Link to="/loyalty">
                        Loyalty
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <ul className="flex items-center space-x-6 ml-4">{renderMainNavItems()}</ul>
              
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
                    
                    <div className="mt-6">
                      <p className="text-xs uppercase font-semibold text-brand-soft-gray px-2 mb-2">DNA Collections</p>
                      <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4">
                        <h3 className="font-medium mb-1">DNA Elixirs</h3>
                        <ul className="space-y-2 pl-2">
                          {elixirsItems.map((item) => (
                            <li key={item.name}>
                              <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-gilded-gold">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4">
                        <h3 className="font-medium mb-1">DNA Rituals</h3>
                        <ul className="space-y-2 pl-2">
                          {ritualsItems.map((item) => (
                            <li key={item.name}>
                              <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-gilded-gold">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4">
                        <h3 className="font-medium mb-1">DNA Wisdom</h3>
                        <ul className="space-y-2 pl-2">
                          {wisdomItems.map((item) => (
                            <li key={item.name}>
                              <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-gilded-gold">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-6">
                        <h3 className="font-medium mb-1">DNA Curations</h3>
                        <p className="text-xs text-brand-blush-rose">Coming Soon</p>
                      </div>
                    </div>
                    
                    <p className="text-xs uppercase font-semibold text-brand-soft-gray px-2 mb-2">Navigation</p>
                    <ul className="flex flex-col gap-3 mb-6">
                      {mainNavItems.map((item) => (
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
                      <li>
                        <NavLink
                          to="/loyalty"
                          className={({ isActive }) =>
                            `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`
                          }
                        >
                          Loyalty Program
                        </NavLink>
                      </li>
                    </ul>
                    
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
