
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Natural Ingredients',
    description: 'Sourced from sustainable farms and ethical suppliers.',
    icon: 'Leaf'
  },
  {
    id: '2',
    title: 'Traditional Wisdom',
    description: 'Based on generations of herbal knowledge.',
    icon: 'Book'
  },
  {
    id: '3',
    title: 'Scientific Research',
    description: 'Backed by modern scientific studies.',
    icon: 'Microscope'
  }
];

const FeaturesManager = () => {
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Load features from localStorage on component mount
  useEffect(() => {
    const savedFeatures = localStorage.getItem('cmsFeatures');
    if (savedFeatures) {
      try {
        setFeatures(JSON.parse(savedFeatures));
      } catch (e) {
        console.error('Error parsing saved features:', e);
      }
    }
  }, []);

  // Save features to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmsFeatures', JSON.stringify(features));
  }, [features]);

  const handleCreateNew = () => {
    setEditingFeature({
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: 'Star'
    });
    setIsCreating(true);
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature({...feature});
    setIsCreating(false);
  };

  const handleSaveFeature = () => {
    if (!editingFeature || !editingFeature.title) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isCreating) {
      setFeatures([...features, editingFeature]);
      toast({
        title: "Feature added",
        description: "The new feature has been added successfully",
      });
    } else {
      setFeatures(features.map(f => f.id === editingFeature.id ? editingFeature : f));
      toast({
        title: "Feature updated",
        description: "The feature has been updated successfully",
      });
    }

    setEditingFeature(null);
  };

  const handleDeleteFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
    toast({
      title: "Feature deleted",
      description: "The feature has been deleted successfully",
    });
  };

  // Common Lucide icons for features
  const iconOptions = [
    'Star', 'Heart', 'Award', 'Leaf', 'Sun', 'Droplet', 
    'Zap', 'Shield', 'Gift', 'Check', 'ThumbsUp', 'Smile',
    'Book', 'Microscope', 'Activity', 'Clock', 'Globe'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Features Manager</h2>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Feature
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.icon}</TableCell>
                  <TableCell className="font-medium">{feature.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{feature.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditFeature(feature)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteFeature(feature.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {features.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No features found. Add your first feature using the button above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editingFeature && (
        <Dialog open={!!editingFeature} onOpenChange={(open) => !open && setEditingFeature(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Add New Feature' : 'Edit Feature'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="feature-title">Feature Title</Label>
                <Input 
                  id="feature-title" 
                  value={editingFeature.title} 
                  onChange={(e) => setEditingFeature({...editingFeature, title: e.target.value})}
                  placeholder="e.g., Natural Ingredients"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feature-description">Description</Label>
                <Textarea 
                  id="feature-description" 
                  value={editingFeature.description} 
                  onChange={(e) => setEditingFeature({...editingFeature, description: e.target.value})}
                  placeholder="Brief description of this feature"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feature-icon">Icon Name</Label>
                <div className="flex gap-2">
                  <Input 
                    id="feature-icon" 
                    value={editingFeature.icon} 
                    onChange={(e) => setEditingFeature({...editingFeature, icon: e.target.value})}
                    placeholder="Lucide icon name"
                    list="icon-options"
                    className="flex-1"
                  />
                  <datalist id="icon-options">
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon} />
                    ))}
                  </datalist>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the name of a Lucide icon (e.g., Star, Heart, Leaf)
                </p>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingFeature(null)}>Cancel</Button>
                <Button onClick={handleSaveFeature}>
                  {isCreating ? 'Add Feature' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Features Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium">{feature.icon} {feature.title}</div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesManager;
