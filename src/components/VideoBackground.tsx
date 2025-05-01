
import React, { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  videoType?: string;
}

const VideoBackground = ({ 
  videoSrc, 
  fallbackImageSrc, 
  videoType = "video/mp4" 
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Reset states when video source changes
    setIsVideoLoaded(false);
    setHasError(false);
    
    const checkVideoValidity = () => {
      if (!videoSrc) return;
      
      // If we have a video ref already mounted, use that
      if (videoRef.current) {
        const video = videoRef.current;
        
        // Set up event listeners
        const handleCanPlay = () => {
          console.log('Video can play:', videoSrc);
          setIsVideoLoaded(true);
          setHasError(false);
        };
        
        const handleError = () => {
          console.error('Error loading video:', videoSrc);
          setHasError(true);
          setIsVideoLoaded(false);
        };
        
        // Remove any existing listeners first
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        
        // Add new listeners
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('error', handleError);
        
        // Try to load the video
        video.load();
        
        // Cleanup function
        return () => {
          video.removeEventListener('canplay', handleCanPlay);
          video.removeEventListener('error', handleError);
        };
      }
    };
    
    checkVideoValidity();
  }, [videoSrc]);
  
  // Determine if we should show the fallback image
  const shouldShowFallback = (!isVideoLoaded || !videoSrc || hasError) && fallbackImageSrc;
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
          poster={fallbackImageSrc}
        >
          <source src={videoSrc} type={videoType} />
          Your browser does not support the video tag.
        </video>
      )}
      
      {shouldShowFallback && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${fallbackImageSrc}")` }}
        ></div>
      )}
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default VideoBackground;
