
import { useState, useEffect } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  reverseDirection?: boolean;
  startOffset?: number;
  maxOffset?: number;
}

/**
 * Hook to create parallax scrolling effects
 * @param options Configuration options for the parallax effect
 * @returns The calculated transform style based on scroll position
 */
const useParallax = (options: ParallaxOptions = {}) => {
  const { 
    speed = 0.15, 
    direction = 'up', 
    reverseDirection = false,
    startOffset = 0,
    maxOffset = 100
  } = options;
  
  const [offset, setOffset] = useState(startOffset);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled down the page
      const scrollTop = window.pageYOffset;
      // Apply speed multiplier to control effect intensity
      let calculatedOffset = startOffset + (scrollTop * speed);
      
      // Apply direction and possibly reverse the effect
      // Limit the maximum offset to prevent extreme movement
      if (reverseDirection) {
        calculatedOffset = Math.max(startOffset, Math.min(maxOffset, startOffset - (scrollTop * speed)));
      } else {
        calculatedOffset = Math.max(startOffset, Math.min(maxOffset, startOffset + (scrollTop * speed)));
      }
      
      setOffset(calculatedOffset);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, reverseDirection, startOffset, maxOffset]);
  
  // Return appropriate transform style based on direction
  const getTransformStyle = () => {
    switch (direction) {
      case 'up':
        return { transform: `translateY(-${offset}px)` };
      case 'down':
        return { transform: `translateY(${offset}px)` };
      case 'left':
        return { transform: `translateX(-${offset}px)` };
      case 'right':
        return { transform: `translateX(${offset}px)` };
      default:
        return { transform: `translateY(-${offset}px)` };
    }
  };
  
  return {
    style: getTransformStyle(),
    offset
  };
};

export default useParallax;
