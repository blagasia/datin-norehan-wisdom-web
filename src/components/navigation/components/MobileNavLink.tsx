
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
        `block py-2.5 px-4 text-base ${isActive 
          ? 'text-brand-deep-teal font-medium bg-brand-blush-rose/10 rounded' 
          : 'text-natural-dark hover:bg-brand-blush-rose/10 hover:rounded transition-all duration-200'}`
      }
      end={path === '/'}
    >
      {name}
    </NavLink>
  );
};

export default MobileNavLink;
