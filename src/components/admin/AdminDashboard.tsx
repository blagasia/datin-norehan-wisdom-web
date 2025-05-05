
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
import ReferralManager from './content/ReferralManager';
import AboutManager from './content/AboutManager';
import FeaturesManager from './content/FeaturesManager';
import AdminCRM from './AdminCRM';
import PageManager from '../cms/PageManager';
import { useAuth } from '@/context/AuthContext';
import HelpAssistant from './components/HelpAssistant';

import { 
  Database, 
  Folder, 
  FolderOpen, 
  Video, 
  Columns, 
  Gift, 
  Tag, 
  User, 
  Award, 
  FileText,
  UserSquare,
  FileQuestion,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, isAdmin, userRole } = useAuth();
  
  const handleLogout = () => {
    signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-playfair text-2xl font-bold">Datin Norehan CMS</h1>
          <div className="flex items-center gap-4">
            <HelpAssistant />
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
        <div className="mb-6">
          <div className="bg-white rounded-md shadow-sm p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Welcome to the Admin Dashboard</h2>
              <p className="text-muted-foreground text-sm">
                You are logged in as: <span className="font-medium capitalize">{userRole || 'User'}</span>
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid grid-cols-12 mb-8">
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Pages
            </TabsTrigger>
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
            <TabsTrigger value="crm" className="flex items-center gap-2">
              <UserSquare className="h-4 w-4" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Loyalty
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pages" className="bg-white p-6 rounded-md shadow-sm">
            <PageManager />
          </TabsContent>
          
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
          
          <TabsContent value="crm" className="bg-white p-6 rounded-md shadow-sm">
            <AdminCRM />
          </TabsContent>
          
          <TabsContent value="loyalty" className="bg-white p-6 rounded-md shadow-sm">
            <LoyaltyManager />
          </TabsContent>
          
          <TabsContent value="referrals" className="bg-white p-6 rounded-md shadow-sm">
            <ReferralManager />
          </TabsContent>
          
          <TabsContent value="features" className="bg-white p-6 rounded-md shadow-sm">
            <FeaturesManager />
          </TabsContent>
          
          <TabsContent value="about" className="bg-white p-6 rounded-md shadow-sm">
            <AboutManager />
          </TabsContent>
          
          <TabsContent value="guides" className="bg-white p-6 rounded-md shadow-sm">
            <UserGuide />
          </TabsContent>
          
          <TabsContent value="settings" className="bg-white p-6 rounded-md shadow-sm">
            {isAdmin() ? (
              <AdminSettings />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You need administrator privileges to access these settings.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Simple placeholder component for User Guide
const UserGuide = () => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6">CMS User Guide</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-medium mb-3">Getting Started</h3>
        <p className="text-muted-foreground mb-4">
          Welcome to the Datin Norehan CMS! This guide will help you understand how to use the content management system effectively.
        </p>
        <div className="bg-muted p-4 rounded-md">
          <h4 className="font-medium mb-2">Quick Tips:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use the tabs above to navigate between different sections</li>
            <li>Click the help icon in the top-right corner for contextual assistance</li>
            <li>Preview your changes by clicking "View Website"</li>
            <li>Remember to save your changes before leaving a page</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-medium mb-3">Working with Pages</h3>
        <p className="text-muted-foreground mb-3">
          Pages are the core of your website. Each page can contain multiple content blocks that you can arrange as needed.
        </p>
        <h4 className="font-medium mb-2">To create a new page:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-4">
          <li>Go to the "Pages" tab</li>
          <li>Click "New Page"</li>
          <li>Enter a title and optionally customize the URL slug</li>
          <li>Choose whether to publish immediately or save as draft</li>
          <li>Click "Create Page"</li>
        </ol>
        <h4 className="font-medium mb-2">To edit a page:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Find the page in the list</li>
          <li>Click the three dots and select "Edit Content"</li>
          <li>Add content blocks using the left sidebar</li>
          <li>Arrange blocks by dragging and dropping</li>
          <li>Click "Save" to update the page</li>
        </ol>
      </section>
      
      <section>
        <h3 className="text-xl font-medium mb-3">Content Blocks</h3>
        <p className="text-muted-foreground mb-3">
          Content blocks are the building elements of your pages. Each block type serves a different purpose.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Text Block</h4>
            <p className="text-sm text-muted-foreground">Add formatted text content to your page</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Image Block</h4>
            <p className="text-sm text-muted-foreground">Upload and display images with captions</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Hero Block</h4>
            <p className="text-sm text-muted-foreground">Create attention-grabbing headers</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Features Block</h4>
            <p className="text-sm text-muted-foreground">Highlight key features or services</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Products Block</h4>
            <p className="text-sm text-muted-foreground">Display a selection of products</p>
          </div>
          <div className="border rounded-md p-3">
            <h4 className="font-medium mb-1">Articles Block</h4>
            <p className="text-sm text-muted-foreground">Showcase blog posts or articles</p>
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-medium mb-3">CRM System</h3>
        <p className="text-muted-foreground mb-4">
          The CRM (Customer Relationship Management) system helps you manage leads and customer relationships.
        </p>
        <h4 className="font-medium mb-2">Key features:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Track leads from different sources</li>
          <li>Manage lead statuses through the sales pipeline</li>
          <li>Record activities and notes for each lead</li>
          <li>Tag leads for better organization</li>
          <li>Filter and search to quickly find leads</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-medium mb-3">Need More Help?</h3>
        <p className="text-muted-foreground mb-3">
          If you need additional assistance, there are several resources available to you:
        </p>
        <div className="bg-muted p-4 rounded-md">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Use the CMS Assistant (help icon in the top right)</li>
            <li>Contact technical support at support@datinnorehan.com</li>
            <li>Refer to the detailed documentation [link]</li>
            <li>Schedule a training session for personalized guidance</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

// Simple placeholder component for Admin Settings
const AdminSettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>
    <p className="text-muted-foreground mb-6">
      This section allows administrators to configure system settings an manage users.
    </p>
    
    <div className="space-y-8 max-w-3xl">
      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">User Management</h3>
        <p className="text-muted-foreground mb-4">Administrators can manage user accounts and permissions here.</p>
        <Button disabled>Manage Users</Button>
      </div>
      
      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Global Settings</h3>
        <p className="text-muted-foreground mb-4">Configure global settings for the CMS and website.</p>
        <Button disabled>Edit Settings</Button>
      </div>
      
      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Backup & Restore</h3>
        <p className="text-muted-foreground mb-4">Create backups of your content or restore from previous backups.</p>
        <div className="flex gap-3">
          <Button variant="outline" disabled>Create Backup</Button>
          <Button variant="outline" disabled>Restore Backup</Button>
        </div>
      </div>
      
      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">API Integration</h3>
        <p className="text-muted-foreground mb-4">Manage API keys and external integrations.</p>
        <Button disabled>Manage Integrations</Button>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
