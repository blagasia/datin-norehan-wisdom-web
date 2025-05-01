
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const [searchParams] = useSearchParams();
  const activeType = searchParams.get('type');
  
  // Define all the category types
  const categories = [
    {
      id: 'elixirs',
      title: 'DNA Elixirs',
      subtitle: 'Internal Wellness Formulations',
      description: 'Nourish your body from within with our carefully crafted elixirs, designed to support your natural systems through the power of botanical wisdom.',
      image: '/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png',
      color: 'bg-brand-deep-teal/10',
      buttonColor: 'teal',
      link: '/products',
      buttonText: 'Explore Elixirs',
      features: [
        'Meticulously sourced ingredients',
        'Based on traditional recipes',
        'Scientifically validated formulations',
        'Free from artificial additives'
      ]
    },
    {
      id: 'rituals',
      title: 'DNA Rituals',
      subtitle: 'Transformative Tools & Accessories',
      description: 'Elevate your wellness routine with our thoughtfully designed tools and accessories that bring intention and mindfulness to everyday practices.',
      image: '/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png',
      color: 'bg-brand-blush-rose/10',
      buttonColor: 'default',
      link: '/rituals',
      buttonText: 'Discover Rituals',
      features: [
        'Handcrafted ceramic containers',
        'Sustainable materials',
        'Designed for daily practice',
        'Beautiful and functional'
      ]
    },
    {
      id: 'wisdom',
      title: 'DNA Wisdom',
      subtitle: 'Knowledge & Education',
      description: 'Empower yourself with traditional knowledge and modern understanding through our educational resources, articles, and events.',
      image: '/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png',
      color: 'bg-brand-lavender/10',
      buttonColor: 'lavender',
      link: '/articles',
      buttonText: 'Access Wisdom',
      features: [
        'Expert-written articles',
        'Virtual wellness workshops',
        'Educational e-books',
        'Community knowledge sharing'
      ]
    },
    {
      id: 'curations',
      title: 'DNA Curations',
      subtitle: 'Limited Edition Collections',
      description: 'Experience the pinnacle of Datin Norehan\'s craft through our special collections and limited edition formulations created for specific wellness journeys.',
      image: '/lovable-uploads/5eff846b-47c1-4023-9c62-ddcf04020588.png',
      color: 'bg-brand-amber/10',
      buttonColor: 'amber',
      link: '/curations/upcoming',
      buttonText: 'View Curations',
      features: [
        'Seasonal wellness collections',
        'Limited edition formulations',
        'Exclusive member access',
        'Thematic wellness journeys'
      ]
    }
  ];

  // Filter categories if a type is selected, otherwise show all
  const displayCategories = activeType ? categories.filter(cat => cat.id === activeType) : categories;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              {activeType ? `DNA ${activeType.charAt(0).toUpperCase() + activeType.slice(1)}` : 'DNA Categories'}
            </h1>
            <p className="text-xl text-natural-dark max-w-3xl mx-auto">
              {activeType 
                ? `Discover our ${activeType} collection and its unique benefits.` 
                : 'Explore the four pillars of Datin Norehan\'s holistic wellness philosophy.'}
            </p>
            
            {/* Category navigation */}
            {!activeType && (
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/categories?type=${cat.id}`}>
                    <Button variant={cat.id === 'elixirs' ? 'teal' : cat.id === 'rituals' ? 'default' : cat.id === 'wisdom' ? 'lavender' : 'amber'} size="sm">
                      DNA {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {activeType && (
              <div className="mb-8 text-center">
                <Link to="/categories" className="text-brand-deep-teal hover:text-brand-deep-teal/80 flex items-center justify-center">
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to all categories
                </Link>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-16">
              {displayCategories.map((category, index) => (
                <div key={category.id} className={`rounded-xl overflow-hidden ${category.color}`}>
                  <div className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-5' : 'md:grid-cols-5 md:flex-row-reverse'}`}>
                    <div className={`${index % 2 === 0 ? 'md:col-span-3 md:order-1' : 'md:col-span-3 md:order-2'} p-8 md:p-12 flex flex-col justify-center`}>
                      <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-2">{category.title}</h2>
                      <p className="text-natural-gray/90 text-lg mb-4">{category.subtitle}</p>
                      <p className="text-natural-gray mb-8 leading-relaxed">{category.description}</p>
                      
                      <ul className="mb-8 space-y-2">
                        {category.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-brand-deep-teal mr-3 flex-shrink-0"></span>
                            <span className="text-natural-gray">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div>
                        <Link to={category.link}>
                          <Button variant={category.buttonColor as any}>
                            {category.buttonText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className={`${index % 2 === 0 ? 'md:col-span-2 md:order-2' : 'md:col-span-2 md:order-1'}`}>
                      <div className="aspect-square w-full h-full">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <Link to="/dna-brand">
                <Button variant="outline" size="lg">
                  Learn More About DNA Philosophy
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
