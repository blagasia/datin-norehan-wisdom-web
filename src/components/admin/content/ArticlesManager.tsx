
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { blogArticles } from '@/data/blogArticles';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Use the existing blog articles as the initial data
const defaultArticles = [...blogArticles];

const ArticlesManager = () => {
  const [articles, setArticles] = useState(defaultArticles);
  const [filteredArticles, setFilteredArticles] = useState(defaultArticles);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Load articles from localStorage on component mount
  useEffect(() => {
    const savedArticles = localStorage.getItem('cmsArticles');
    if (savedArticles) {
      try {
        setArticles(JSON.parse(savedArticles));
      } catch (e) {
        console.error('Error parsing saved articles:', e);
      }
    }
  }, []);

  // Save articles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmsArticles', JSON.stringify(articles));
    filterArticles(currentFilter);
  }, [articles, currentFilter]);

  // Filter articles based on selected type
  const filterArticles = (filterType: string) => {
    if (filterType === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.type === filterType));
    }
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setCurrentFilter(value);
    filterArticles(value);
  };

  // Reset form for creating a new article
  const handleCreateNew = () => {
    setEditingArticle({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      image: '',
      type: 'article',
      category: '',
      author: 'Datin Norehan',
      authorImage: 'https://randomuser.me/api/portraits/women/17.jpg',
    });
    setIsCreating(true);
  };

  // Handle edit article
  const handleEditArticle = (article: any) => {
    setEditingArticle({...article});
    setIsCreating(false);
  };

  // Handle save article
  const handleSaveArticle = () => {
    if (!editingArticle.title || !editingArticle.excerpt) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isCreating) {
      setArticles([...articles, editingArticle]);
      toast({
        title: "Article created",
        description: "The article has been created successfully",
      });
    } else {
      setArticles(articles.map(a => a.id === editingArticle.id ? editingArticle : a));
      toast({
        title: "Article updated",
        description: "The article has been updated successfully",
      });
    }

    setEditingArticle(null);
  };

  // Handle delete article
  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(a => a.id !== id));
    toast({
      title: "Article deleted",
      description: "The article has been deleted successfully",
    });
  };

  const articleTypes = [
    { value: 'article', label: 'Article' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Podcast' },
    { value: 'infographic', label: 'Infographic' },
    { value: 'pdf', label: 'Guide' },
    { value: 'event', label: 'Event' },
    { value: 'reflection', label: 'Reflection' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Content Manager</h2>
        <Button onClick={handleCreateNew}>Add New Content</Button>
      </div>

      <Tabs defaultValue="all" onValueChange={handleFilterChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          {articleTypes.map(type => (
            <TabsTrigger key={type.value} value={type.value}>{type.label}</TabsTrigger>
          ))}
        </TabsList>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    {articleTypes.find(t => t.value === article.type)?.label || article.type}
                  </TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditArticle(article)}>
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{article.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive" onClick={() => handleDeleteArticle(article.id)}>
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No content found in this category
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Tabs>

      {editingArticle && (
        <Dialog open={!!editingArticle} onOpenChange={(open) => !open && setEditingArticle(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Create New Content' : 'Edit Content'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={editingArticle.title} 
                  onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                  placeholder="Content title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select 
                  value={editingArticle.type} 
                  onValueChange={(val) => setEditingArticle({...editingArticle, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {articleTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={editingArticle.category} 
                  onChange={(e) => setEditingArticle({...editingArticle, category: e.target.value})}
                  placeholder="e.g., Wellness, Herbal Wisdom"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  value={editingArticle.date} 
                  onChange={(e) => setEditingArticle({...editingArticle, date: e.target.value})}
                  placeholder="April 30, 2025"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <Input 
                  id="image" 
                  value={editingArticle.image} 
                  onChange={(e) => setEditingArticle({...editingArticle, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Content URL</Label>
                <Input 
                  id="url" 
                  value={editingArticle.url || ''} 
                  onChange={(e) => setEditingArticle({...editingArticle, url: e.target.value})}
                  placeholder="For videos, podcasts, or external links"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="excerpt">Excerpt/Summary</Label>
                <Textarea 
                  id="excerpt" 
                  value={editingArticle.excerpt} 
                  onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                  placeholder="Brief summary of the content"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="content">Full Content</Label>
                <Textarea 
                  id="content" 
                  value={editingArticle.content || ''} 
                  onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                  placeholder="Full article content (for articles only)"
                  rows={10}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditingArticle(null)}>Cancel</Button>
              <Button onClick={handleSaveArticle}>
                {isCreating ? 'Create Content' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ArticlesManager;
