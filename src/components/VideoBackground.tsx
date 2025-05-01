
import React from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

const VideoBackground = ({ videoSrc, fallbackImageSrc }: VideoBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
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
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default VideoBackground;
