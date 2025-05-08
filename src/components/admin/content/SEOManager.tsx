
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  X
} from 'lucide-react';
import { Tables } from '@/types/supabase';

type SEOMetadata = Tables<'seo_metadata'>;

const SEOManager: React.FC = () => {
  const [seoEntries, setSEOEntries] = useState<SEOMetadata[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<SEOMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSEO, setCurrentSEO] = useState<SEOMetadata | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    page_path: '',
    title: '',
    description: '',
    keywords: [] as string[],
    og_title: '',
    og_description: '',
    og_image_url: '',
    canonical_url: ''
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    fetchSEOData();
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = seoEntries.filter(entry => 
        entry.page_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(seoEntries);
    }
  }, [searchTerm, seoEntries]);
  
  const fetchSEOData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('*')
        .order('page_path', { ascending: true });
      
      if (error) throw error;
      
      setSEOEntries(data || []);
      setFilteredEntries(data || []);
    } catch (error: any) {
      console.error('Error fetching SEO data:', error);
      toast({
        title: "Error",
        description: `Failed to fetch SEO data: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddTag = () => {
    if (!currentTag.trim()) return;
    
    if (!formData.keywords.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, currentTag.trim()]
      });
    }
    
    setCurrentTag('');
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(t => t !== tag)
    });
  };
  
  const handleEditSEO = (seo: SEOMetadata) => {
    setCurrentSEO(seo);
    setFormData({
      id: seo.id,
      page_path: seo.page_path,
      title: seo.title || '',
      description: seo.description || '',
      keywords: seo.keywords || [],
      og_title: seo.og_title || '',
      og_description: seo.og_description || '',
      og_image_url: seo.og_image_url || '',
      canonical_url: seo.canonical_url || ''
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  const handleCreateNew = () => {
    setCurrentSEO(null);
    setFormData({
      id: '',
      page_path: '',
      title: '',
      description: '',
      keywords: [],
      og_title: '',
      og_description: '',
      og_image_url: '',
      canonical_url: ''
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };
  
  const handleDeleteSEO = async (id: string) => {
    if (!confirm("Are you sure you want to delete this SEO data? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('seo_metadata')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "SEO data deleted successfully"
      });
      
      fetchSEOData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete SEO data: ${error.message}`,
        variant: "destructive"
      });
    }
  };
  
  const handleSaveSEO = async () => {
    try {
      if (!formData.page_path) {
        toast({
          title: "Validation Error",
          description: "Page path is required",
          variant: "destructive"
        });
        return;
      }
      
      if (isEditMode && currentSEO) {
        // Update existing entry
        const { error } = await supabase
          .from('seo_metadata')
          .update({
            title: formData.title || null,
            description: formData.description || null,
            keywords: formData.keywords.length > 0 ? formData.keywords : null,
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image_url: formData.og_image_url || null,
            canonical_url: formData.canonical_url || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentSEO.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "SEO data updated successfully"
        });
      } else {
        // Create new entry
        const { error } = await supabase
          .from('seo_metadata')
          .insert({
            page_path: formData.page_path,
            title: formData.title || null,
            description: formData.description || null,
            keywords: formData.keywords.length > 0 ? formData.keywords : null,
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image_url: formData.og_image_url || null,
            canonical_url: formData.canonical_url || null
          });
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "SEO data created successfully"
        });
      }
      
      setIsDialogOpen(false);
      fetchSEOData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to save SEO data: ${error.message}`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">SEO Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" /> Add SEO Data
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit SEO Data" : "Add New SEO Data"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the SEO metadata for this page" 
                : "Add SEO metadata to improve search engine visibility"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="page_path">Page Path</Label>
              <Input
                id="page_path"
                value={formData.page_path}
                onChange={(e) => setFormData({...formData, page_path: e.target.value})}
                placeholder="e.g. /about or /products/herbal-tea"
                readOnly={isEditMode}
              />
              {isEditMode && (
                <p className="text-sm text-muted-foreground">
                  Page path cannot be changed once created
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Meta Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Page title for search engines"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={formData.canonical_url}
                  onChange={(e) => setFormData({...formData, canonical_url: e.target.value})}
                  placeholder="Optional canonical URL"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description for search results"
                className="w-full min-h-[80px] p-2 border rounded-md resize-y"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="keywords"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add keywords..."
                    className="pl-9"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTag}
                  className="ml-2"
                >
                  Add
                </Button>
              </div>
              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.keywords.map(tag => (
                    <div 
                      key={tag} 
                      className="flex items-center bg-muted px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium">Open Graph (Social Media) Settings</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="og_title">OG Title</Label>
                  <Input
                    id="og_title"
                    value={formData.og_title}
                    onChange={(e) => setFormData({...formData, og_title: e.target.value})}
                    placeholder="Title for social media shares"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="og_image_url">OG Image URL</Label>
                  <Input
                    id="og_image_url"
                    value={formData.og_image_url}
                    onChange={(e) => setFormData({...formData, og_image_url: e.target.value})}
                    placeholder="Image URL for social media"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="og_description">OG Description</Label>
                <textarea
                  id="og_description"
                  value={formData.og_description}
                  onChange={(e) => setFormData({...formData, og_description: e.target.value})}
                  placeholder="Description for social media shares"
                  className="w-full min-h-[80px] p-2 border rounded-md resize-y"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSEO}>
              {isEditMode ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md">
          <p className="text-muted-foreground mb-4">No SEO data found</p>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" /> Add Your First SEO Entry
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Path</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {entry.page_path}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {entry.title || <span className="text-muted-foreground italic">Not set</span>}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {entry.description || <span className="text-muted-foreground italic">Not set</span>}
                  </TableCell>
                  <TableCell>
                    {new Date(entry.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditSEO(entry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteSEO(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SEOManager;
