import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AdminCRM from './AdminCRM';
import PageManager from '@/components/cms/PageManager';
import { Separator } from '@/components/ui/separator';
import SEOManager from './content/SEOManager';
import { DataIcon, Users, FileText, Tag, BarChart3, ShoppingCart, Monitor } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and data</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1 py-2">
                  <TabsList className="flex flex-col h-auto w-full bg-background space-y-1 p-2">
                    <TabsTrigger 
                      value="dashboard"
                      className="justify-start"
                      onClick={() => setActiveTab('dashboard')}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pages" 
                      className="justify-start"
                      onClick={() => setActiveTab('pages')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Pages
                    </TabsTrigger>
                    <TabsTrigger 
                      value="seo" 
                      className="justify-start"
                      onClick={() => setActiveTab('seo')}
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      SEO
                    </TabsTrigger>
                    <TabsTrigger 
                      value="crm" 
                      className="justify-start"
                      onClick={() => setActiveTab('crm')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Lead Management
                    </TabsTrigger>
                    {/* More tabs may exist here */}
                  </TabsList>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-10">
            <Card>
              <CardContent className="p-6">
                {activeTab === 'dashboard' && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                            <Users className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">365</div>
                            <p className="text-muted-foreground">Total Leads</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-muted-foreground">Content Pages</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                            <ShoppingCart className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">52</div>
                            <p className="text-muted-foreground">Products</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                      <Separator className="mb-4" />
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">New lead captured</p>
                            <p className="text-sm text-muted-foreground">From contact form submission</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Page content updated</p>
                            <p className="text-sm text-muted-foreground">Homepage hero section</p>
                            <p className="text-xs text-muted-foreground">Yesterday</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <Monitor className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">SEO metadata updated</p>
                            <p className="text-sm text-muted-foreground">For 5 pages</p>
                            <p className="text-xs text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'pages' && <PageManager />}
                {activeTab === 'seo' && <SEOManager />}
                {activeTab === 'crm' && <AdminCRM />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
