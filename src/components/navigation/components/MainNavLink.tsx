
import React from 'react';
import { NavLink } from 'react-router-dom';

interface MainNavLinkProps {
  name: string;
  path: string;
}

const MainNavLink = ({ name, path }: MainNavLinkProps) => {
  const navItemClasses = "text-sm font-medium hover:text-brand-deep-teal transition-colors";
  const activeNavItemClasses = "text-brand-deep-teal font-semibold";
  
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${navItemClasses} ${isActive ? activeNavItemClasses : ''}`
      }
      end={path === '/'}
    >
      {name}
    </NavLink>
  );
};

export default MainNavLink;
