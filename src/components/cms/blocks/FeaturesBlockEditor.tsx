
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FeaturesBlockContent {
  title: string;
  features: Feature[];
}

interface FeaturesBlockEditorProps {
  content: FeaturesBlockContent;
  onChange: (content: FeaturesBlockContent) => void;
  readOnly?: boolean;
}

const FeaturesBlockEditor: React.FC<FeaturesBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  const addFeature = () => {
    const newFeature: Feature = {
      id: `feature-${Date.now()}`,
      title: 'New Feature',
      description: 'Feature description',
      icon: 'star'
    };
    
    onChange({ 
      ...content, 
      features: [...content.features, newFeature] 
    });
  };

  const updateFeature = (index: number, featureData: Partial<Feature>) => {
    const updatedFeatures = [...content.features];
    updatedFeatures[index] = { ...updatedFeatures[index], ...featureData };
    
    onChange({ ...content, features: updatedFeatures });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = content.features.filter((_, i) => i !== index);
    onChange({ ...content, features: updatedFeatures });
  };

  if (readOnly) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-playfair text-center mb-8">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.features.map((feature) => (
            <div key={feature.id} className="p-4 border rounded-md text-center">
              <div className="h-12 w-12 mx-auto mb-4 flex items-center justify-center bg-brand-sage-mist/30 rounded-full">
                <span role="img" aria-label={feature.title}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="features-title">Section Title</Label>
        <Input
          id="features-title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter section title"
          className="mt-2"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">Features</h4>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addFeature}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Feature
          </Button>
        </div>
        
        {content.features.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground mb-4">No features added yet</p>
            <Button onClick={addFeature}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Feature
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {content.features.map((feature, index) => (
              <Card key={feature.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-medium">Feature {index + 1}</h5>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`feature-title-${index}`}>Title</Label>
                      <Input
                        id={`feature-title-${index}`}
                        value={feature.title}
                        onChange={(e) => updateFeature(index, { title: e.target.value })}
                        placeholder="Feature title"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`feature-description-${index}`}>Description</Label>
                      <Input
                        id={`feature-description-${index}`}
                        value={feature.description}
                        onChange={(e) => updateFeature(index, { description: e.target.value })}
                        placeholder="Feature description"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`feature-icon-${index}`}>Icon (emoji or icon name)</Label>
                      <Input
                        id={`feature-icon-${index}`}
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, { icon: e.target.value })}
                        placeholder="Feature icon"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border rounded-md p-6 bg-white">
          <h2 className="text-2xl font-playfair text-center mb-8">{content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.features.map((feature) => (
              <div key={feature.id} className="p-4 border rounded-md text-center">
                <div className="h-12 w-12 mx-auto mb-4 flex items-center justify-center bg-brand-sage-mist/30 rounded-full">
                  <span role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBlockEditor;
