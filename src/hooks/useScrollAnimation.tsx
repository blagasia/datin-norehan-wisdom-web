
import { useState, useEffect, useCallback } from 'react';

interface ScrollOptions {
  threshold?: number; // When to trigger (0-1)
  rootMargin?: string; // Margin around the root
  once?: boolean; // Only trigger once
}

const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, options: ScrollOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);

    // If once is true and element is visible, unobserve
    if (options.once && entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  }, [options.once]);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });

    const element = elementRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, options.threshold, options.rootMargin, callback]);

  return isVisible;
};

export default useScrollAnimation;
