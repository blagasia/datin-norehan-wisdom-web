
import React, { useState, useEffect } from 'react';
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
  Settings,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, isAdmin, userRole, user } = useAuth();
  const [activeTab, setActiveTab] = useState('pages');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out"
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to log out: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pages': return <PageManager />;
      case 'events': return <EventsManager />;
      case 'products': return <ProductsManager />;
      case 'articles': return <ArticlesManager />;
      case 'tiktok': return <TikTokManager />;
      case 'crm': return <AdminCRM />;
      case 'loyalty': return <LoyaltyManager />;
      case 'referrals': return <ReferralManager />;
      case 'features': return <FeaturesManager />;
      case 'about': return <AboutManager />;
      case 'guides': return <UserGuide />;
      case 'settings': return isAdmin() ? <AdminSettings /> : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You need administrator privileges to access these settings.</p>
        </div>
      );
      default: return <PageManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            )}
            <h1 className="font-playfair text-xl md:text-2xl font-bold">Datin Norehan CMS</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <HelpAssistant />
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              View Website
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {user?.email}
              </span>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6">
          <div className="bg-white rounded-md shadow-sm p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Welcome to the Admin Dashboard</h2>
              <p className="text-muted-foreground text-sm">
                You are logged in as: <span className="font-medium capitalize">{userRole || 'User'}</span>
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
              className="sm:hidden"
            >
              View Site
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Side navigation for desktop */}
          {!isMobile && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md shadow-sm p-3">
                <ul className="space-y-1">
                  <NavItem icon={<FileText className="h-4 w-4" />} label="Pages" value="pages" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Database className="h-4 w-4" />} label="Events" value="events" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Folder className="h-4 w-4" />} label="Products" value="products" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<FolderOpen className="h-4 w-4" />} label="Articles" value="articles" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Video className="h-4 w-4" />} label="TikTok" value="tiktok" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<UserSquare className="h-4 w-4" />} label="CRM" value="crm" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Gift className="h-4 w-4" />} label="Loyalty" value="loyalty" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Tag className="h-4 w-4" />} label="Referrals" value="referrals" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Award className="h-4 w-4" />} label="Features" value="features" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<User className="h-4 w-4" />} label="About" value="about" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<FileQuestion className="h-4 w-4" />} label="Guides" value="guides" activeTab={activeTab} onClick={setActiveTab} />
                  <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" value="settings" activeTab={activeTab} onClick={setActiveTab} />
                </ul>
              </div>
            </div>
          )}
          
          {/* Mobile menu */}
          {isMobile && mobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-white p-4 pt-20">
              <ul className="space-y-2">
                <NavItem icon={<FileText className="h-5 w-5" />} label="Pages" value="pages" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Database className="h-5 w-5" />} label="Events" value="events" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Folder className="h-5 w-5" />} label="Products" value="products" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<FolderOpen className="h-5 w-5" />} label="Articles" value="articles" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Video className="h-5 w-5" />} label="TikTok" value="tiktok" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<UserSquare className="h-5 w-5" />} label="CRM" value="crm" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Gift className="h-5 w-5" />} label="Loyalty" value="loyalty" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Tag className="h-5 w-5" />} label="Referrals" value="referrals" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Award className="h-5 w-5" />} label="Features" value="features" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<User className="h-5 w-5" />} label="About" value="about" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<FileQuestion className="h-5 w-5" />} label="Guides" value="guides" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
                <NavItem icon={<Settings className="h-5 w-5" />} label="Settings" value="settings" activeTab={activeTab} onClick={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} />
              </ul>
            </div>
          )}
          
          {/* Main content area */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-10'}`}>
            <div className="bg-white p-6 rounded-md shadow-sm">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  activeTab: string;
  onClick: (value: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, value, activeTab, onClick }) => {
  const isActive = activeTab === value;
  
  return (
    <li>
      <button
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-muted'
        }`}
        onClick={() => onClick(value)}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
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
      This section allows administrators to configure system settings and manage users.
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
        <div className="flex flex-wrap gap-3">
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
