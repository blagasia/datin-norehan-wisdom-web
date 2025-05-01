
import React from 'react';
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
  
  return (
    <div className="relative">
      <Carousel className="w-full">
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
        <CarouselPrevious className="absolute left-4 bg-white/80 hover:bg-white" />
        <CarouselNext className="absolute right-4 bg-white/80 hover:bg-white" />
      </Carousel>
    </div>
  );
};

export default ProductGallery;
