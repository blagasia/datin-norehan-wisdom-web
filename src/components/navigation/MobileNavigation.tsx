
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';

// DNA brand menu items
const dnaNavItems = [
  { name: 'DNA Brand Story', path: '/dna-brand', description: 'The philosophy behind our collections' },
  { name: 'Explore Categories', path: '/categories', description: 'Discover all four DNA pillars' },
];

// DNA Elixirs items
const elixirsItems = [
  { name: 'All Elixirs', path: '/products', description: 'Browse all wellness formulations' },
  { name: 'Detox Drinks', path: '/products?category=Detox', description: 'Refresh and rejuvenate your system' },
  { name: 'Collagen Supplements', path: '/products?category=Collagen', description: 'Enhance your natural beauty' },
  { name: 'Herbal Tonics', path: '/products?category=Herbal', description: 'Traditional remedies for modern wellness' },
  { name: 'Beauty Solutions', path: '/products?category=Beauty', description: 'Radiance from within' },
];

// DNA Rituals items
const ritualsItems = [
  { name: 'Premium Accessories', path: '/rituals', description: 'Elevate your wellness experience' },
  { name: 'Custom Ritual Kits', path: '/rituals/custom', description: 'Create your personalized ritual set' },
  { name: 'Ready Bundles', path: '/rituals/bundles', description: 'Curated collections for optimal results' },
  { name: 'Gift Options', path: '/rituals/gifts', description: 'Perfect presents for loved ones' },
];

// DNA Wisdom items
const wisdomItems = [
  { name: 'Articles', path: '/articles', description: 'Free wellness knowledge' },
  { name: 'Events & Workshops', path: '/events', description: 'Interactive learning experiences' },
  { name: 'E-Books', path: '/articles?type=pdf', description: 'Premium digital publications' },
];

// DNA Curations items
const curationsItems = [
  { name: 'Upcoming Collections', path: '/curations/upcoming', description: 'Preview our upcoming curation releases' },
  { name: 'Exclusive Sets', path: '/curations/exclusive', description: 'Limited edition wellness collections' },
  { name: 'Membership Access', path: '/curations/membership', description: 'Special access for loyal customers' },
  { name: 'Register Interest', path: '/curations/register', description: 'Be notified when curations launch' },
];

const mainNavItems = [
  { name: 'Our Story', path: '/story' },
  { name: 'Our Philosophy', path: '/philosophy' },
  { name: 'Our Brand', path: '/dna-brand' },
];

const MobileNavigation = () => {
  const navItemClasses = "text-sm font-medium hover:text-brand-deep-teal transition-colors";
  const activeNavItemClasses = "text-brand-deep-teal font-semibold";
  
  return (
    <div className="flex items-center gap-4">
      <LoyaltyWidget />
      <Link to="/cart">
        <Button variant="ghost" size="icon" className="text-brand-deep-teal">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-white border-l border-brand-blush-rose/20 overflow-y-auto">
          <nav className="flex flex-col h-full">
            <div className="py-4 border-b border-brand-blush-rose/20 flex items-center justify-between">
              <Link to="/" className="text-xl font-italiana tracking-wide">
                Datin Norehan
              </Link>
              <div className="flex items-center gap-2">
                <Link to="/loyalty">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white h-8 w-8 p-0"
                  >
                    <User size={16} />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Main navigation items */}
            <div className="pt-6 pb-3">
              <p className="text-xs uppercase font-semibold text-brand-soft-gray px-2 mb-2">Navigation</p>
              <ul className="space-y-2 pl-2">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${navItemClasses} ${isActive ? activeNavItemClasses : ''} block py-1`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/ask"
                    className={({ isActive }) =>
                      `${navItemClasses} ${isActive ? activeNavItemClasses : ''} block py-1`
                    }
                  >
                    Ask Datin
                  </NavLink>
                </li>
              </ul>
            </div>
            
            {/* Shop DNA Section */}
            <div className="py-3 border-t border-brand-blush-rose/10">
              <p className="text-xs uppercase font-semibold text-brand-soft-gray px-2 mb-2">Shop DNA</p>
              <ul className="space-y-2 pl-2">
                {dnaNavItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-deep-teal block py-1">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* DNA Collections */}
            <div className="border-t border-brand-blush-rose/10 py-3">
              <div className="px-2 mb-2">
                <p className="text-xs uppercase font-semibold text-brand-soft-gray">DNA Collections</p>
              </div>
              
              <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4 ml-2">
                <h3 className="font-medium mb-1 text-brand-deep-teal">DNA Elixirs</h3>
                <ul className="space-y-1">
                  {elixirsItems.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-deep-teal block py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4 ml-2">
                <h3 className="font-medium mb-1 text-brand-deep-teal">DNA Rituals</h3>
                <ul className="space-y-1">
                  {ritualsItems.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-deep-teal block py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4 ml-2">
                <h3 className="font-medium mb-1 text-brand-deep-teal">DNA Wisdom</h3>
                <ul className="space-y-1">
                  {wisdomItems.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-deep-teal block py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-2 border-brand-blush-rose/30 pl-3 mb-4 ml-2">
                <h3 className="font-medium mb-1 text-brand-deep-teal">DNA Curations</h3>
                <ul className="space-y-1">
                  {curationsItems.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-brand-soft-gray hover:text-brand-deep-teal block py-1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Link to="/loyalty" className="mt-auto mb-8 w-full">
              <Button variant="default" className="w-full bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90">
                <User className="mr-2 h-4 w-4" />
                Become a Devotee
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
