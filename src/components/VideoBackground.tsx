
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({ videoSrc, fallbackImageSrc }: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Check if the video source is valid
    if (videoSrc) {
      const video = document.createElement('video');
      video.onloadeddata = () => {
        setIsVideoLoaded(true);
      };
      video.onerror = () => {
        console.error('Error loading video:', videoSrc);
        setIsVideoLoaded(false);
      };
      video.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={fallbackImageSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {(!isVideoLoaded || !videoSrc) && fallbackImageSrc && (
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
