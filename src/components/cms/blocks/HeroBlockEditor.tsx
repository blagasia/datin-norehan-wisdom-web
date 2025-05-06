
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageBlockEditor } from './index';

export interface HeroBlockContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

interface HeroBlockEditorProps {
  content: HeroBlockContent;
  onChange: (content: HeroBlockContent) => void;
  readOnly?: boolean;
}

const HeroBlockEditor: React.FC<HeroBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  if (readOnly) {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-brand-deep-teal/80 to-natural-purple/80 p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-playfair mb-4">{content.title}</h1>
            <p className="text-lg mb-6">{content.subtitle}</p>
            <a 
              href={content.buttonLink}
              className="inline-block px-6 py-2 bg-white text-brand-deep-teal rounded-md font-medium"
            >
              {content.buttonText}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="hero-title">Title</Label>
        <Input
          id="hero-title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter hero title"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="hero-subtitle">Subtitle</Label>
        <Input
          id="hero-subtitle"
          value={content.subtitle}
          onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
          placeholder="Enter hero subtitle"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="hero-button-text">Button Text</Label>
        <Input
          id="hero-button-text"
          value={content.buttonText}
          onChange={(e) => onChange({ ...content, buttonText: e.target.value })}
          placeholder="Enter button text"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="hero-button-link">Button Link</Label>
        <Input
          id="hero-button-link"
          value={content.buttonLink}
          onChange={(e) => onChange({ ...content, buttonLink: e.target.value })}
          placeholder="Enter button link"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label>Background Image</Label>
        <div className="mt-2">
          <ImageBlockEditor
            content={{ url: content.backgroundImage, alt: "Hero background", caption: "" }}
            onChange={(imageContent) => onChange({ ...content, backgroundImage: imageContent.url })}
          />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gradient-to-r from-brand-deep-teal/80 to-natural-purple/80 p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-playfair mb-4">{content.title}</h1>
              <p className="text-lg mb-6">{content.subtitle}</p>
              <button className="px-6 py-2 bg-white text-brand-deep-teal rounded-md font-medium">
                {content.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBlockEditor;
