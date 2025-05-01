
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MobileNavLink from './MobileNavLink';

interface MobileNavCategoryProps {
  title: string;
  items: {
    name: string;
    path: string;
    description?: string;
  }[];
}

const MobileNavCategory = ({ title, items }: MobileNavCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="mb-6">
      <button 
        className="flex items-center justify-between w-full py-2 px-3 font-medium border-b border-brand-blush-rose/20"
        onClick={toggleCategory}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      
      {isOpen && (
        <ul className="pl-4 mt-2 space-y-1 bg-brand-sage-mist/10 py-2">
          {items.map((item) => (
            <li key={item.path}>
              <MobileNavLink name={item.name} path={item.path} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileNavCategory;
