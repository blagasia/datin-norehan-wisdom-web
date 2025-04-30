
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import TikTokVideo from '@/components/TikTokVideo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TikTokVideoType {
  id: string;
  title: string;
  category: string;
}

const TikTokManager = () => {
  const [storedVideos, setStoredVideos] = useState<TikTokVideoType[]>([]);
  const [newVideoId, setNewVideoId] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('events');
  const [currentTab, setCurrentTab] = useState<string>('all');
  const { toast } = useToast();

  // Load videos from localStorage on component mount
  useEffect(() => {
    const savedVideos = localStorage.getItem('tikTokVideos');
    if (savedVideos) {
      try {
        setStoredVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Error parsing saved TikTok videos:', e);
        setStoredVideos([]);
      }
    }
  }, []);

  // Save videos to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem('tikTokVideos', JSON.stringify(storedVideos));
  }, [storedVideos]);

  const handleAddVideo = () => {
    if (!newVideoId) {
      toast({
        title: "Missing information",
        description: "Please enter a TikTok video ID",
        variant: "destructive",
      });
      return;
    }

    const newVideo = {
      id: newVideoId,
      title: newVideoTitle || `TikTok video ${newVideoId.substring(0, 8)}`,
      category: newVideoCategory
    };

    setStoredVideos(prev => [...prev, newVideo]);
    setNewVideoId('');
    setNewVideoTitle('');
    
    toast({
      title: "Video added",
      description: "The TikTok video has been added successfully",
    });
  };

  const handleRemoveVideo = (videoId: string) => {
    setStoredVideos(prev => prev.filter(video => video.id !== videoId));
    
    toast({
      title: "Video removed",
      description: "The TikTok video has been removed",
    });
  };

  // Filter videos based on selected category
  const filteredVideos = currentTab === 'all' 
    ? storedVideos 
    : storedVideos.filter(video => video.category === currentTab);

  const helpContent = `
    To find your TikTok video ID:
    
    1. Open the TikTok video in a web browser
    2. Look at the URL, which will be in this format:
       https://www.tiktok.com/@username/video/7309308101889242378
    3. The long number at the end is your video ID
    
    Copy this number and paste it in the "TikTok Video ID" field.
  `;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">TikTok Content Manager</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Help: How to find TikTok ID</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Finding Your TikTok Video ID</DialogTitle>
            </DialogHeader>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
              {helpContent}
            </pre>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New TikTok Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="video-id">TikTok Video ID</Label>
              <Input 
                id="video-id" 
                placeholder="e.g., 7309308101889242378" 
                value={newVideoId}
                onChange={(e) => setNewVideoId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-title">Video Title</Label>
              <Input 
                id="video-title" 
                placeholder="Enter a descriptive title" 
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video-category">Category</Label>
            <Select value={newVideoCategory} onValueChange={setNewVideoCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="events">Event Highlights</SelectItem>
                <SelectItem value="tips">Wellness Tips</SelectItem>
                <SelectItem value="products">Product Showcases</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleAddVideo}>Add Video</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage TikTok Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="events">Event Highlights</TabsTrigger>
              <TabsTrigger value="tips">Wellness Tips</TabsTrigger>
              <TabsTrigger value="products">Product Showcases</TabsTrigger>
            </TabsList>
            
            {filteredVideos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <div className="w-32 h-32 overflow-hidden">
                          <TikTokVideo videoId={video.id} />
                        </div>
                      </TableCell>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>
                        {video.category === 'events' && 'Event Highlights'}
                        {video.category === 'tips' && 'Wellness Tips'}
                        {video.category === 'products' && 'Product Showcases'}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveVideo(video.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-natural-gray">
                No videos found in this category.
              </div>
            )}
          </CardContent>
        </CardContent>
      </Card>
      
      <div className="bg-natural-green/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Help Center</h3>
        <p className="text-sm text-natural-gray mb-2">
          TikTok videos added here will appear on the website's TikTok section. Make sure to categorize them correctly for better organization.
        </p>
        <p className="text-sm text-natural-gray">
          For best results, use high-quality videos that showcase your brand's values and products.
        </p>
      </div>
    </div>
  );
};

export default TikTokManager;
