
import { useState, useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  reverseDirection?: boolean;
  startOffset?: number;
  maxOffset?: number;
  disabled?: boolean;
}

interface ParallaxReturn {
  style: React.CSSProperties;
  offset: number;
}

/**
 * Hook to create parallax scrolling effects
 * @param options Configuration options for the parallax effect
 * @returns The calculated transform style based on scroll position
 */
const useParallax = (options: ParallaxOptions = {}): ParallaxReturn => {
  const { 
    speed = 0.15, 
    direction = 'up', 
    reverseDirection = false,
    startOffset = 0,
    maxOffset = 100,
    disabled = false
  } = options;
  
  const [offset, setOffset] = useState<number>(startOffset);
  const isMobile = useIsMobile();
  const effectivelyDisabled = disabled || isMobile;
  
  useEffect(() => {
    // Don't set up scroll events if parallax is disabled
    if (effectivelyDisabled) {
      return;
    }
    
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
  }, [speed, direction, reverseDirection, startOffset, maxOffset, effectivelyDisabled]);
  
  // Return appropriate transform style based on direction
  const getTransformStyle = (): React.CSSProperties => {
    if (effectivelyDisabled) {
      return {}; // Return empty object for no transform on mobile
    }
    
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
