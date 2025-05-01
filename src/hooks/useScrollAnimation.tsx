
import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollOptions {
  threshold?: number; // When to trigger (0-1)
  rootMargin?: string; // Margin around the root
  once?: boolean; // Only trigger once
}

const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, options: ScrollOptions = {}): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);

    // If once is true and element is visible, unobserve
    if (options.once && entry.isIntersecting && observerRef.current) {
      observerRef.current.unobserve(entry.target);
    }
  }, [options.once]);

  useEffect(() => {
    // Create new observer instance
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
