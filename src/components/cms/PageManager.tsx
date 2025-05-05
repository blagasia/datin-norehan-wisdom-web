
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { 
  Edit, 
  EyeIcon, 
  FileEdit, 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Trash2 
} from 'lucide-react';
import ContentBuilder from './ContentBuilder';

interface Page {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const PageManager = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditPageOpen, setIsEditPageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    meta_description: '',
    published: false
  });
  
  const { isAdmin, isEditor } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pages.filter(page => 
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(filtered);
    } else {
      setFilteredPages(pages);
    }
  }, [searchTerm, pages]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setPages(data as Page[]);
      setFilteredPages(data as Page[]);
    } catch (error: any) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error",
        description: `Failed to fetch pages: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    try {
      // Validate inputs
      if (!newPage.title.trim()) {
        toast({
          title: "Validation Error",
          description: "Page title is required",
          variant: "destructive"
        });
        return;
      }
      
      // Generate slug if empty
      const slug = newPage.slug.trim() || 
        newPage.title.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      
      const { data, error } = await supabase
        .from('content_pages')
        .insert([{
          title: newPage.title,
          slug,
          meta_description: newPage.meta_description || null,
          published: newPage.published,
          content: { blocks: [] }
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Page created successfully"
      });
      
      // Reset form
      setNewPage({
        title: '',
        slug: '',
        meta_description: '',
        published: false
      });
      
      setIsCreateDialogOpen(false);
      
      // Refresh pages
      fetchPages();
      
      // Open page editor for the new page
      if (data && data.length > 0) {
        setCurrentPage(data[0] as Page);
        setIsEditPageOpen(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create page: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('content_pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Page deleted successfully"
      });
      
      // Refresh pages
      fetchPages();
      
      // Close editor if open
      if (currentPage && currentPage.id === id) {
        setIsEditPageOpen(false);
        setCurrentPage(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete page: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleUpdatePageStatus = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('content_pages')
        .update({ published })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Page ${published ? 'published' : 'unpublished'} successfully`
      });
      
      // Refresh pages
      fetchPages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update page status: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleEditPage = (page: Page) => {
    setCurrentPage(page);
    setIsEditPageOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div>
      {isEditPageOpen && currentPage ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditPageOpen(false);
                  setCurrentPage(null);
                }}
              >
                Back to Pages
              </Button>
              <h2 className="text-2xl font-semibold mt-4">{currentPage.title}</h2>
              <p className="text-muted-foreground">/{currentPage.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                {currentPage.published ? 'Published' : 'Draft'}
              </span>
              <Switch 
                checked={currentPage.published}
                onCheckedChange={(checked) => handleUpdatePageStatus(currentPage.id, checked)}
              />
              <Button variant="outline" size="sm">
                <EyeIcon className="h-4 w-4 mr-2" /> Preview
              </Button>
            </div>
          </div>
          
          <ContentBuilder 
            pageId={currentPage.id}
            initialContent={[]} // In a real implementation, we'd fetch content from the page data
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Pages</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-[250px]"
                />
              </div>
              
              {/* Create new page dialog */}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!isEditor()}>
                    <PlusCircle className="h-4 w-4 mr-2" /> New Page
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Page</DialogTitle>
                    <DialogDescription>
                      Create a new page for your website. You can add content to it after creation.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Page Title</Label>
                      <Input
                        id="title"
                        value={newPage.title}
                        onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                        placeholder="e.g. About Us"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slug">
                        URL Slug <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <div className="flex items-center">
                        <span className="mr-1 text-muted-foreground">/</span>
                        <Input
                          id="slug"
                          value={newPage.slug}
                          onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                          placeholder="e.g. about-us (leave empty to generate from title)"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meta_description">
                        Meta Description <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="meta_description"
                        value={newPage.meta_description}
                        onChange={(e) => setNewPage({...newPage, meta_description: e.target.value})}
                        placeholder="Brief description for search engines"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={newPage.published}
                        onCheckedChange={(checked) => setNewPage({...newPage, published: checked})}
                      />
                      <Label htmlFor="published">Publish page immediately</Label>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePage}>
                      Create Page
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border rounded-md">
              <p className="text-muted-foreground mb-4">No pages found</p>
              {isEditor() && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create Your First Page
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map(page => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        {page.title}
                      </TableCell>
                      <TableCell>/{page.slug}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${page.published ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                          <span>{page.published ? 'Published' : 'Draft'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(page.updated_at)}</TableCell>
                      <TableCell>{formatDate(page.created_at)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditPage(page)}>
                              <FileEdit className="h-4 w-4 mr-2" /> Edit Content
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={!isEditor()}>
                              <Edit className="h-4 w-4 mr-2" /> Edit Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdatePageStatus(page.id, !page.published)}
                              disabled={!isEditor()}
                            >
                              {page.published ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeletePage(page.id)}
                              disabled={!isAdmin()}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageManager;
