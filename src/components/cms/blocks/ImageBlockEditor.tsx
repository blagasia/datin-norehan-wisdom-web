
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ImageBlockContent {
  url: string;
  alt: string;
  caption?: string;
}

interface ImageBlockEditorProps {
  content: ImageBlockContent;
  onChange: (content: ImageBlockContent) => void;
  readOnly?: boolean;
}

const ImageBlockEditor: React.FC<ImageBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    setUploading(true);

    try {
      // Check if storage bucket exists, if not this will fail
      const { data: bucketExists } = await supabase.storage.getBucket('cms-images');
      
      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        await supabase.storage.createBucket('cms-images', {
          public: true
        });
      }
      
      const { error: uploadError } = await supabase.storage
        .from('cms-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('cms-images').getPublicUrl(filePath);
      
      onChange({
        ...content,
        url: data.publicUrl
      });
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Upload failed: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  if (readOnly) {
    return (
      <figure className="my-4">
        {content.url && (
          <img 
            src={content.url} 
            alt={content.alt} 
            className="max-w-full h-auto rounded-md"
          />
        )}
        {content.caption && (
          <figcaption className="text-sm text-center mt-2 text-muted-foreground">
            {content.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-url">Image URL</Label>
        <div className="flex mt-2">
          <Input
            id="image-url"
            value={content.url}
            onChange={(e) => onChange({ ...content, url: e.target.value })}
            placeholder="Enter image URL or upload"
            className="flex-1"
          />
          <div className="ml-2">
            <label className="cursor-pointer">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <Button variant="outline" disabled={uploading}>
                <Upload className="h-4 w-4 mr-2" /> {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </label>
          </div>
          {content.url && (
            <Button 
              variant="ghost" 
              className="ml-1" 
              onClick={() => onChange({ ...content, url: '' })}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="image-alt">Alt Text</Label>
        <Input
          id="image-alt"
          value={content.alt}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
          placeholder="Describe the image for accessibility"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="image-caption">Caption (Optional)</Label>
        <Input
          id="image-caption"
          value={content.caption || ''}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
          placeholder="Add a caption for the image"
          className="mt-2"
        />
      </div>
      
      {content.url && (
        <div>
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div className="border rounded-md p-4 bg-white">
            <figure>
              <img 
                src={content.url} 
                alt={content.alt} 
                className="max-w-full h-auto rounded-md"
              />
              {content.caption && (
                <figcaption className="text-sm text-center mt-2 text-muted-foreground">
                  {content.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlockEditor;
