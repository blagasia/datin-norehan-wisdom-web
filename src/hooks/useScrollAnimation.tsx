
import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollOptions {
  threshold?: number; // When to trigger (0-1)
  rootMargin?: string; // Margin around the root
  once?: boolean; // Only trigger once
  delay?: number; // Delay before applying animation class
}

const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, options: ScrollOptions = {}): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef<boolean>(false);
  
  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    // If "once" is true and we've already triggered, don't toggle visibility off
    if (options.once && hasTriggered.current && isVisible) {
      return;
    }
    
    if (entry.isIntersecting) {
      // Apply delay if specified
      if (options.delay) {
        const timer = setTimeout(() => {
          setIsVisible(true);
          hasTriggered.current = true;
        }, options.delay);
        
        return () => clearTimeout(timer);
      } else {
        setIsVisible(true);
        hasTriggered.current = true;
      }
      
      // If once is true and element is visible, unobserve
      if (options.once && observerRef.current) {
        observerRef.current.unobserve(entry.target);
      }
    } else if (!options.once) {
      // Only toggle off visibility if not using "once" option
      setIsVisible(false);
    }
  }, [options.once, options.delay, isVisible]);

  useEffect(() => {
    // Create new observer instance with improved options
    observerRef.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });

    const element = elementRef.current;
    const observer = observerRef.current;

    if (element && observer) {
      observer.observe(element);
    }

    // Clean up function to remove observer when component unmounts
    return () => {
      if (element && observer) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, options.threshold, options.rootMargin, callback]);

  return isVisible;
};

export default useScrollAnimation;
