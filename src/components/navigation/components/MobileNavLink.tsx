
import React from 'react';
import { NavLink } from 'react-router-dom';

interface MobileNavLinkProps {
  name: string;
  path: string;
}

const MobileNavLink = ({ name, path }: MobileNavLinkProps) => {
  return (
    <NavLink 
      to={path}
      className={({ isActive }) => 
        `block py-2 px-3 text-base ${isActive 
          ? 'text-brand-deep-teal font-medium' 
          : 'text-natural-dark hover:bg-brand-blush-rose/10'}`
      }
      end={path === '/'}
    >
      {name}
    </NavLink>
  );
};

export default MobileNavLink;
