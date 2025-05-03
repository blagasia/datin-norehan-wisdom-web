
import { useState, useEffect, useRef } from 'react';

interface ImageLoaderOptions {
  onLoad?: () => void;
  onError?: () => void;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  loading?: 'eager' | 'lazy';
  timeout?: number; // Add timeout to prevent infinite loading
  placeholderSrc?: string; // Fallback image path
}

const useImageLoader = (src: string | undefined, options: ImageLoaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    setIsLoading(true);
    setCurrentSrc(src);

    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    const img = new Image();
    if (options.crossOrigin) {
      img.crossOrigin = options.crossOrigin;
    }

    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      if (options.onLoad) options.onLoad();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      
      // Try fallback image if provided
      if (options.placeholderSrc && options.placeholderSrc !== src) {
        setCurrentSrc(options.placeholderSrc);
      }
      
      if (options.onError) options.onError();
    };

    // Set timeout to prevent infinite loading state
    if (options.timeout) {
      timeoutRef.current = window.setTimeout(() => {
        if (isLoading) {
          setHasError(true);
          setIsLoading(false);
          if (options.onError) options.onError();
        }
      }, options.timeout);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [src, options.onLoad, options.onError, options.crossOrigin, options.timeout, options.placeholderSrc]);

  // Props to spread onto an img element
  const imgProps = {
    src: currentSrc,
    loading: options.loading || 'lazy',
    className: `${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
  };

  return {
    isLoaded,
    hasError,
    isLoading,
    imgProps,
    currentSrc,
  };
};

export default useImageLoader;
