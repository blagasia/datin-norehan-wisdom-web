
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import EventsManager from './content/EventsManager';
import ProductsManager from './content/ProductsManager';
import ArticlesManager from './content/ArticlesManager';
import TikTokManager from './content/TikTokManager';
import PageEditor from './content/PageEditor';
import LoyaltyManager from './content/LoyaltyManager';
import { Database, Folder, FolderOpen, Video, Columns, Gift } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('cmsAuthenticated');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-playfair text-2xl font-bold">Datin Norehan CMS</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              View Website
            </Button>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              TikTok
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Loyalty
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <Columns className="h-4 w-4" />
              Pages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="bg-white p-6 rounded-md shadow-sm">
            <EventsManager />
          </TabsContent>
          
          <TabsContent value="products" className="bg-white p-6 rounded-md shadow-sm">
            <ProductsManager />
          </TabsContent>
          
          <TabsContent value="articles" className="bg-white p-6 rounded-md shadow-sm">
            <ArticlesManager />
          </TabsContent>
          
          <TabsContent value="tiktok" className="bg-white p-6 rounded-md shadow-sm">
            <TikTokManager />
          </TabsContent>
          
          <TabsContent value="loyalty" className="bg-white p-6 rounded-md shadow-sm">
            <LoyaltyManager />
          </TabsContent>
          
          <TabsContent value="pages" className="bg-white p-6 rounded-md shadow-sm">
            <PageEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
