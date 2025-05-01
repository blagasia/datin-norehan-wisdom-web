
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

  useEffect(() => {
    if (!videoSrc) return;
    
    // Check if it's a Vimeo link
    if (videoSrc.includes('vimeo.com')) {
      console.log('Vimeo link detected');
      setIsVimeo(true);
      
      // Extract the Vimeo ID from the URL
      const vimeoId = videoSrc.replace(/^.+vimeo.com\//, '').replace(/\?.+$/, '');
      console.log('Vimeo ID:', vimeoId);
      
      // Create the embed URL
      const embedUrl = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`;
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
    video.onloadeddata = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
    };
    video.onerror = (e) => {
      console.error('Error loading video:', videoSrc, e);
      setIsVideoLoaded(false);
    };
    video.src = videoSrc;
    video.load();
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {isVimeo && vimeoIframeSrc ? (
        <div className="relative w-full h-full">
          <iframe 
            src={vimeoIframeSrc}
            className="absolute top-0 left-0 w-[300%] h-[300%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            frameBorder="0" 
            allow="autoplay; fullscreen" 
            title="Vimeo Video Background"
          ></iframe>
        </div>
      ) : processedVideoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={fallbackImageSrc}
          onError={() => {
            console.error('Video error event triggered');
            setIsVideoLoaded(false);
          }}
        >
          <source src={processedVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      
      {(!isVideoLoaded || (!processedVideoSrc && !isVimeo)) && fallbackImageSrc && (
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
