
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TikTokVideo from '@/components/TikTokVideo';
import { Button } from '@/components/ui/button';

// Default TikTok videos if no user-managed content is found
const defaultTikTokVideos = [
  {
    id: "7309308101889242378",
    title: "Natural skincare tips",
    category: "tips"
  },
  {
    id: "7305418278915120390",
    title: "Workshop preview: DIY remedies",
    category: "events"
  },
  {
    id: "7290938496971303211",
    title: "Natural ingredients spotlight",
    category: "products"
  },
  {
    id: "7287034233679590662",
    title: "Event highlight: Herbal masterclass",
    category: "events"
  }
];

const TikTokContent = () => {
  const [tikTokVideos, setTikTokVideos] = useState(defaultTikTokVideos);

  // Load videos from localStorage if available (set by TikTokManager)
  useEffect(() => {
    const savedVideos = localStorage.getItem('tikTokVideos');
    if (savedVideos) {
      try {
        const parsedVideos = JSON.parse(savedVideos);
        if (Array.isArray(parsedVideos) && parsedVideos.length > 0) {
          setTikTokVideos(parsedVideos);
        }
      } catch (e) {
        console.error('Error parsing saved TikTok videos:', e);
      }
    }
  }, []);

  return (
    <section className="py-16 bg-white border-t border-natural-purple/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="bg-natural-purple/20 text-purple-700 text-xs px-3 py-1 rounded-full">@datinnorehanapo</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-4 mb-4">Follow Us on TikTok</h2>
          <p className="text-natural-gray">
            Join our 200K+ followers on TikTok for daily wellness tips, event previews, and behind-the-scenes content with Datin Norehan.
          </p>
        </div>
        
        <Tabs defaultValue="events" className="mb-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-natural-purple/20">
              <TabsTrigger value="events">Event Highlights</TabsTrigger>
              <TabsTrigger value="tips">Wellness Tips</TabsTrigger>
              <TabsTrigger value="products">Product Showcases</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="events" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tikTokVideos.filter(video => video.category === 'events').map((video) => (
                <div key={video.id} className="rounded-lg overflow-hidden shadow-sm border border-natural-purple/10 hover:shadow-md transition-all">
                  <TikTokVideo videoId={video.id} />
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tikTokVideos.filter(video => video.category === 'tips').map((video) => (
                <div key={video.id} className="rounded-lg overflow-hidden shadow-sm border border-natural-purple/10 hover:shadow-md transition-all">
                  <TikTokVideo videoId={video.id} />
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tikTokVideos.filter(video => video.category === 'products').map((video) => (
                <div key={video.id} className="rounded-lg overflow-hidden shadow-sm border border-natural-purple/10 hover:shadow-md transition-all">
                  <TikTokVideo videoId={video.id} />
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          <a href="https://www.tiktok.com/@datinnorehanapo" target="_blank" rel="noopener noreferrer">
            <Button variant="purple" className="gap-2">
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" className="h-5 w-5" alt="TikTok" />
              Follow us on TikTok
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TikTokContent;
