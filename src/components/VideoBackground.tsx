
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({ videoSrc, fallbackImageSrc }: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [processedVideoSrc, setProcessedVideoSrc] = useState<string>('');

  useEffect(() => {
    // Process OneDrive links if needed
    if (videoSrc) {
      // If it's a OneDrive link, we may need to transform it
      // OneDrive sharing links typically need to be transformed from:
      // https://onedrive.live.com/?authkey=xxx&cid=xxx&id=xxx&parId=xxx
      // to something like:
      // https://onedrive.live.com/download?cid=xxx&resid=xxx&authkey=xxx
      
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
    }
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {processedVideoSrc && (
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
      )}
      {(!isVideoLoaded || !processedVideoSrc) && fallbackImageSrc && (
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
