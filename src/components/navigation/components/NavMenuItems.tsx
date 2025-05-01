
import React from 'react';
import { Link } from 'react-router-dom';

interface NavMenuItemProps {
  name: string;
  path: string;
  description?: string;
}

const NavMenuItem = ({ name, path }: NavMenuItemProps) => {
  return (
    <li>
      <Link
        to={path}
        className="block p-2 text-sm hover:bg-brand-blush-rose/10 hover:text-brand-deep-teal rounded-md"
      >
        {name}
      </Link>
    </li>
  );
};

interface NavMenuItemsProps {
  title: string;
  items: NavMenuItemProps[];
}

const NavMenuItems = ({ title, items }: NavMenuItemsProps) => {
  return (
    <div className="col-span-1">
      <div className="mb-3 font-semibold text-brand-deep-teal">{title}</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <NavMenuItem key={item.name} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default NavMenuItems;
