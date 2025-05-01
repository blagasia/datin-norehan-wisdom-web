
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag } from 'lucide-react';
import LoyaltyWidget from '@/components/loyalty/LoyaltyWidget';

const UserActions = () => {
  return (
    <div className="flex items-center gap-4">
      <LoyaltyWidget />
      <Link to="/ask">
        <Button
          variant="outline"
          size="sm"
          className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white flex items-center gap-2"
        >
          Ask Datin
        </Button>
      </Link>
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
  );
};

export default UserActions;
