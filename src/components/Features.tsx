
import React from 'react';
import { Check, Leaf, Book, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const Feature = ({ icon, title, description, className }: FeatureProps) => {
  return (
    <div className={cn("bg-white p-8 rounded-lg shadow-sm border border-natural-green/30 flex flex-col items-center text-center", className)}>
      <div className="mb-4 bg-natural-green/30 w-16 h-16 rounded-full flex items-center justify-center text-natural-dark">
        {icon}
      </div>
      <h3 className="text-xl font-playfair font-semibold mb-3">{title}</h3>
      <p className="text-natural-gray">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">The Essence of Our Products</h2>
          <p className="section-subtitle">Discover what makes Datin Norehan's products unique and effective</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature 
            icon={<Check size={24} />}
            title="100% Natural & Organic"
            description="Made with pure, selected ingredients that deliver real health benefits."
            className="animate-fade-up [animation-delay:100ms]"
          />
          <Feature 
            icon={<Book size={24} />}
            title="Traditional Wisdom"
            description="A perfect blend of ancient herbal knowledge and modern wellness science."
            className="animate-fade-up [animation-delay:200ms]"
          />
          <Feature 
            icon={<Leaf size={24} />}
            title="Holistic & Healing"
            description="Supports overall health, detoxification, and rejuvenation from the inside out."
            className="animate-fade-up [animation-delay:300ms]"
          />
          <Feature 
            icon={<Pill size={24} />}
            title="Safe & Chemical-Free"
            description="No artificial colors, preservatives, or synthetic additives—just nature's best."
            className="animate-fade-up [animation-delay:400ms]"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
