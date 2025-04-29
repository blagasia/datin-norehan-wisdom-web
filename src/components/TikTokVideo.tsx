
import React from 'react';
import { Film } from 'lucide-react';

interface TikTokVideoProps {
  videoId: string;
}

const TikTokVideo: React.FC<TikTokVideoProps> = ({ videoId }) => {
  if (!videoId) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg text-center">
        <Film className="h-12 w-12 text-natural-gray mb-3" />
        <p className="text-natural-gray">No video available for this product</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full">
      <iframe 
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        className="w-full h-full border-0 rounded-lg"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="TikTok video player"
      ></iframe>
    </div>
  );
};

export default TikTokVideo;
