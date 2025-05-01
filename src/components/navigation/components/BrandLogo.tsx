
import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className = '' }: BrandLogoProps) => {
  return (
    <Link to="/" className={`flex flex-col items-center ${className}`}>
      {/* Botanical watercolor logo */}
      <span className="font-italiana text-lg md:text-xl tracking-wide">Datin Norehan</span>
      <span className="text-xs text-brand-deep-teal tracking-wider">APOTHECARY</span>
    </Link>
  );
};

export default BrandLogo;
