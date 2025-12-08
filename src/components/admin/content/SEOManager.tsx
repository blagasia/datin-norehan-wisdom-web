
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { SEOMetadata } from '@/types/seo';

const SEOManager = () => {
  const [seoEntries, setSeoEntries] = useState<SEOMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEntry, setActiveEntry] = useState<SEOMetadata | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<SEOMetadata>>({
    page_path: '',
    title: '',
    description: '',
    keywords: [],
    og_title: '',
    og_description: '',
    og_image_url: '',
    canonical_url: ''
  });
  
  useEffect(() => {
    fetchSEOEntries();
  }, []);
  
  const fetchSEOEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase
        .from('seo_metadata' as any)
        .select('*')
        .order('page_path') as any);
      
      if (error) {
        throw error;
      }
      
      setSeoEntries(data as SEOMetadata[]);
    } catch (error) {
      console.error('Error fetching SEO entries:', error);
      toast({
        title: 'Error',
        description: 'Could not load SEO entries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddNew = () => {
    setActiveEntry(null);
    setFormData({
      page_path: '',
      title: '',
      description: '',
      keywords: [],
      og_title: '',
      og_description: '',
      og_image_url: '',
      canonical_url: ''
    });
    setIsEditMode(true);
  };
  
  const handleEdit = (entry: SEOMetadata) => {
    setActiveEntry(entry);
    setFormData({
      page_path: entry.page_path,
      title: entry.title || '',
      description: entry.description || '',
      keywords: entry.keywords || [],
      og_title: entry.og_title || '',
      og_description: entry.og_description || '',
      og_image_url: entry.og_image_url || '',
      canonical_url: entry.canonical_url || ''
    });
    setIsEditMode(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const keywordArray = value.split(',').map(k => k.trim()).filter(k => k);
    setFormData(prev => ({ ...prev, keywords: keywordArray }));
  };
  
  const handleSave = async () => {
    try {
      if (!formData.page_path) {
        toast({
          title: 'Validation Error',
          description: 'Page path is required',
          variant: 'destructive',
        });
        return;
      }
      
      if (activeEntry) {
        // Update existing entry
        const { error } = await (supabase
          .from('seo_metadata' as any)
          .update({
            title: formData.title || null,
            description: formData.description || null,
            keywords: formData.keywords || [],
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image_url: formData.og_image_url || null,
            canonical_url: formData.canonical_url || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', activeEntry.id) as any);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'SEO metadata updated successfully'
        });
      } else {
        // Create new entry
        const { error } = await (supabase
          .from('seo_metadata' as any)
          .insert({
            page_path: formData.page_path,
            title: formData.title || null,
            description: formData.description || null,
            keywords: formData.keywords || [],
            og_title: formData.og_title || null,
            og_description: formData.og_description || null,
            og_image_url: formData.og_image_url || null,
            canonical_url: formData.canonical_url || null
          }) as any);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'SEO metadata created successfully'
        });
      }
      
      // Reset and refresh
      setIsEditMode(false);
      fetchSEOEntries();
      
    } catch (error) {
      console.error('Error saving SEO entry:', error);
      toast({
        title: 'Error',
        description: 'Could not save SEO entry',
        variant: 'destructive',
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const { error } = await (supabase
        .from('seo_metadata' as any)
        .delete()
        .eq('id', id) as any);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'SEO entry deleted successfully'
      });
      
      fetchSEOEntries();
      
      if (activeEntry?.id === id) {
        setActiveEntry(null);
        setIsEditMode(false);
      }
      
    } catch (error) {
      console.error('Error deleting SEO entry:', error);
      toast({
        title: 'Error',
        description: 'Could not delete SEO entry',
        variant: 'destructive',
      });
    }
  };
  
  const handleCancel = () => {
    setIsEditMode(false);
    setActiveEntry(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">SEO Manager</h2>
        <Button onClick={handleAddNew} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Add New
        </Button>
      </div>
      
      {isEditMode ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-medium mb-4">
              {activeEntry ? 'Edit SEO Metadata' : 'Add New SEO Metadata'}
            </h3>
            
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="page_path">Page Path</Label>
                <Input 
                  id="page_path"
                  name="page_path"
                  value={formData.page_path}
                  onChange={handleInputChange}
                  placeholder="/about"
                  disabled={!!activeEntry} // Can't change path for existing entries
                />
                <p className="text-xs text-muted-foreground">
                  Example: /about, /products, /contact
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Page Title</Label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  placeholder="About Datin Norehan | Natural Wellness"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Learn about Datin Norehan's journey and our commitment to natural wellness."
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input 
                  id="keywords"
                  name="keywords"
                  value={formData.keywords ? formData.keywords.join(', ') : ''}
                  onChange={handleKeywordsChange}
                  placeholder="wellness, natural, organic"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="og_title">OG Title (Social Media)</Label>
                <Input 
                  id="og_title"
                  name="og_title"
                  value={formData.og_title || ''}
                  onChange={handleInputChange}
                  placeholder="About Datin Norehan"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="og_description">OG Description</Label>
                <Textarea 
                  id="og_description"
                  name="og_description"
                  value={formData.og_description || ''}
                  onChange={handleInputChange}
                  placeholder="Discover the story behind our premium wellness products."
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="og_image_url">OG Image URL</Label>
                <Input 
                  id="og_image_url"
                  name="og_image_url"
                  value={formData.og_image_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="canonical_url">Canonical URL (optional)</Label>
                <Input 
                  id="canonical_url"
                  name="canonical_url"
                  value={formData.canonical_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://datinnorehan.com/about"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" /> Save
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {loading ? (
            <p className="text-center py-8">Loading SEO data...</p>
          ) : seoEntries.length > 0 ? (
            <div className="grid gap-4">
              {seoEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 border-b flex justify-between items-center">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {entry.page_path}
                          {entry.title && (
                            <Badge variant="outline" className="font-normal">
                              {entry.title}
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {entry.description ? 
                            entry.description.length > 100 ? 
                              `${entry.description.substring(0, 100)}...` : 
                              entry.description
                            : 
                            "No description"
                          }
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(entry)}>
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(entry.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No SEO entries found.</p>
              <p className="mt-2">
                Click "Add New" to create your first SEO entry.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SEOManager;
