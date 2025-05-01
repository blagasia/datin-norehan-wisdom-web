
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({ videoSrc, fallbackImageSrc }: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [processedVideoSrc, setProcessedVideoSrc] = useState<string>('');
  const [isVimeo, setIsVimeo] = useState(false);
  const [vimeoIframeSrc, setVimeoIframeSrc] = useState<string>('');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!videoSrc) {
      setLoadError(true);
      return;
    }
    
    // Reset states on video source change
    setIsVideoLoaded(false);
    setLoadError(false);
    
    // Check if it's a Vimeo link
    if (videoSrc.includes('vimeo.com')) {
      console.log('Vimeo link detected');
      setIsVimeo(true);
      
      // Extract the Vimeo ID from the URL
      const vimeoId = videoSrc.replace(/^.+vimeo.com\//, '').replace(/\?.+$/, '');
      console.log('Vimeo ID:', vimeoId);
      
      // Create the embed URL with additional performance parameters
      const embedUrl = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=auto`;
      setVimeoIframeSrc(embedUrl);
      setIsVideoLoaded(true);
      return;
    }
    
    setIsVimeo(false);
    
    // Process OneDrive links if needed
    if (videoSrc.includes('onedrive.live.com')) {
      console.log('OneDrive link detected, using as is but might need transformation');
    }
    
    setProcessedVideoSrc(videoSrc);
    
    // Check if the video can be loaded
    const video = document.createElement('video');
    video.muted = true; // Important for autoplay to work in most browsers
    
    const timeoutId = setTimeout(() => {
      // Set error state if video takes too long to load
      if (!isVideoLoaded) {
        console.warn('Video loading timed out:', videoSrc);
        setLoadError(true);
      }
    }, 10000); // 10 second timeout
    
    video.onloadeddata = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
      clearTimeout(timeoutId);
    };
    
    video.onerror = (e) => {
      console.error('Error loading video:', videoSrc, e);
      setIsVideoLoaded(false);
      setLoadError(true);
      clearTimeout(timeoutId);
    };
    
    video.src = videoSrc;
    video.load();
    
    return () => {
      clearTimeout(timeoutId);
      video.onerror = null;
      video.onloadeddata = null;
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Vimeo iframe implementation */}
      {isVimeo && vimeoIframeSrc ? (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <iframe 
            src={vimeoIframeSrc}
            className="absolute top-0 left-0 w-[300%] h-[300%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            frameBorder="0" 
            allow="autoplay; fullscreen" 
            title="Vimeo Video Background"
            loading="eager"
          ></iframe>
        </div>
      ) : processedVideoSrc && !loadError ? (
        // Regular video element for other video sources
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={fallbackImageSrc}
          onError={() => {
            console.error('Video error event triggered');
            setLoadError(true);
          }}
        >
          <source src={processedVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      
      {/* Fallback image when video fails to load or is loading */}
      {(loadError || (!isVideoLoaded && !isVimeo) || (!processedVideoSrc && !isVimeo)) && fallbackImageSrc && (
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
