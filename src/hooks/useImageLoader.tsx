
import { useState, useEffect } from 'react';

interface ImageLoaderOptions {
  onLoad?: () => void;
  onError?: () => void;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  loading?: 'eager' | 'lazy';
}

const useImageLoader = (src: string | undefined, options: ImageLoaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);
    setIsLoading(true);

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
      if (options.onError) options.onError();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, options.onLoad, options.onError, options.crossOrigin]);

  // Props to spread onto an img element
  const imgProps = {
    src,
    loading: options.loading || 'lazy',
    className: `${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
  };

  return {
    isLoaded,
    hasError,
    isLoading,
    imgProps,
  };
};

export default useImageLoader;
