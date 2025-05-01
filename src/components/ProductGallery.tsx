
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { images as GalleryImages } from '@/data/productImages';

interface ProductGalleryProps {
  productId: number;
  mainImage: string;
}

const ProductGallery = ({ productId, mainImage }: ProductGalleryProps) => {
  // Get additional images for this product from our gallery
  const additionalImages = GalleryImages[productId] || [];
  
  // Combine main image with additional images, if main image isn't already in additional images
  const allImages = additionalImages.includes(mainImage) 
    ? additionalImages 
    : [mainImage, ...additionalImages];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="relative">
      <Carousel 
        className="w-full"
        onSelect={(api) => setActiveIndex(api.selectedScrollSnap())}
      >
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className="aspect-square rounded-xl overflow-hidden bg-natural-green/10">
                <img 
                  src={image} 
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between">
          <CarouselPrevious className="relative left-0 ml-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="relative right-0 mr-2 bg-white/80 hover:bg-white" />
        </div>
      </Carousel>
      
      {/* Thumbnail navigation */}
      {allImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-16 border-2 rounded overflow-hidden transition-all ${
                activeIndex === index ? 'border-brand-deep-teal' : 'border-transparent opacity-70'
              }`}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
