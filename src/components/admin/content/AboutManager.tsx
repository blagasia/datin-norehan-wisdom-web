
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  founderStatement: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  founderImage: string;
}

const defaultAboutContent: AboutContent = {
  title: "About Datin Norehan",
  subtitle: "The Story & Philosophy Behind Our Brand",
  description: "Founded by wellness visionary Datin Norehan, our brand brings together ancient healing traditions with modern scientific understanding.",
  founderStatement: "My journey began with a simple belief: that nature provides everything we need for wellness and beauty.",
  missionTitle: "Our Mission",
  missionDescription: "To create premium wellness products inspired by traditional wisdom and backed by modern science.",
  visionTitle: "Our Vision",
  visionDescription: "A world where natural wellness solutions are accessible to all, respecting both tradition and innovation.",
  founderImage: "https://randomuser.me/api/portraits/women/17.jpg"
};

const AboutManager = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const { toast } = useToast();

  // Load about content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('cmsAboutContent');
    if (savedContent) {
      try {
        setAboutContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Error parsing saved about content:', e);
      }
    }
  }, []);

  // Save about content to localStorage whenever it changes
  const saveContent = () => {
    localStorage.setItem('cmsAboutContent', JSON.stringify(aboutContent));
    toast({
      title: "Content saved",
      description: "About section content has been saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">About Section Manager</h2>
        <Button onClick={saveContent}>Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Main Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={aboutContent.title} 
                onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input 
                id="subtitle" 
                value={aboutContent.subtitle} 
                onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={aboutContent.description} 
              onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="founder-image">Founder Image URL</Label>
            <Input 
              id="founder-image" 
              value={aboutContent.founderImage} 
              onChange={(e) => setAboutContent({...aboutContent, founderImage: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
            {aboutContent.founderImage && (
              <div className="mt-2">
                <img 
                  src={aboutContent.founderImage} 
                  alt="Founder" 
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="founder-statement">Founder Statement</Label>
            <Textarea 
              id="founder-statement" 
              value={aboutContent.founderStatement} 
              onChange={(e) => setAboutContent({...aboutContent, founderStatement: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission-title">Mission Title</Label>
            <Input 
              id="mission-title" 
              value={aboutContent.missionTitle} 
              onChange={(e) => setAboutContent({...aboutContent, missionTitle: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mission-description">Mission Description</Label>
            <Textarea 
              id="mission-description" 
              value={aboutContent.missionDescription} 
              onChange={(e) => setAboutContent({...aboutContent, missionDescription: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vision-title">Vision Title</Label>
            <Input 
              id="vision-title" 
              value={aboutContent.visionTitle} 
              onChange={(e) => setAboutContent({...aboutContent, visionTitle: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vision-description">Vision Description</Label>
            <Textarea 
              id="vision-description" 
              value={aboutContent.visionDescription} 
              onChange={(e) => setAboutContent({...aboutContent, visionDescription: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Preview</h3>
        <div className="prose prose-sm max-w-none">
          <h1>{aboutContent.title}</h1>
          <h2>{aboutContent.subtitle}</h2>
          <p>{aboutContent.description}</p>
          <blockquote>"{aboutContent.founderStatement}"</blockquote>
          <h3>{aboutContent.missionTitle}</h3>
          <p>{aboutContent.missionDescription}</p>
          <h3>{aboutContent.visionTitle}</h3>
          <p>{aboutContent.visionDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutManager;
