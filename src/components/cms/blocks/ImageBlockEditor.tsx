
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

interface ImageBlockContent {
  url: string;
  alt: string;
  caption: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large' | 'full';
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
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);

  const handleMediaSelect = (url: string) => {
    onChange({ ...content, url });
    setMediaLibraryOpen(false);
  };

  const getSizeClass = () => {
    switch (content.size) {
      case 'small': return 'max-w-sm mx-auto';
      case 'medium': return 'max-w-md mx-auto';
      case 'large': return 'max-w-lg mx-auto';
      case 'full': return 'w-full';
      default: return 'max-w-md mx-auto';
    }
  };

  const getAlignClass = () => {
    switch (content.align) {
      case 'left': return 'ml-0 mr-auto';
      case 'right': return 'mr-0 ml-auto';
      case 'center': return 'mx-auto';
      default: return 'mx-auto';
    }
  };

  if (readOnly) {
    return (
      <figure className={`${getSizeClass()} ${getAlignClass()}`}>
        {content.url ? (
          <>
            <img 
              src={content.url} 
              alt={content.alt || ''} 
              className="rounded-md w-full h-auto"
            />
            {content.caption && (
              <figcaption className="text-sm text-muted-foreground text-center mt-2">
                {content.caption}
              </figcaption>
            )}
          </>
        ) : (
          <div className="bg-muted rounded-md flex items-center justify-center p-12">
            <p className="text-muted-foreground">No image selected</p>
          </div>
        )}
      </figure>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-url" className="mb-2 block">Image</Label>
        <div className="flex flex-col space-y-2">
          {content.url ? (
            <div className="relative rounded-md overflow-hidden mb-2">
              <img 
                src={content.url} 
                alt={content.alt || ''} 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setMediaLibraryOpen(true)}
                >
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed rounded-md p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => setMediaLibraryOpen(true)}
            >
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-2">No image selected</p>
              <Button variant="secondary" size="sm">Choose Image</Button>
            </div>
          )}

          <Dialog open={mediaLibraryOpen} onOpenChange={setMediaLibraryOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Media Library</DialogTitle>
                <DialogDescription>
                  Select an image from the media library or upload a new one.
                </DialogDescription>
              </DialogHeader>
              <MediaLibrary onSelect={handleMediaSelect} />
              <DialogFooter>
                <Button variant="outline" onClick={() => setMediaLibraryOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <Label htmlFor="image-alt" className="mb-2 block">Alt Text</Label>
        <Input
          id="image-alt"
          placeholder="Describe the image for accessibility"
          value={content.alt || ''}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="image-caption" className="mb-2 block">Caption (optional)</Label>
        <Input
          id="image-caption"
          placeholder="Add a caption for the image"
          value={content.caption || ''}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image-align" className="mb-2 block">Alignment</Label>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              type="button"
              variant={content.align === 'left' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, align: 'left' })}
            >
              Left
            </Button>
            <Button
              type="button"
              variant={!content.align || content.align === 'center' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, align: 'center' })}
            >
              Center
            </Button>
            <Button
              type="button"
              variant={content.align === 'right' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, align: 'right' })}
            >
              Right
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="image-size" className="mb-2 block">Size</Label>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              type="button"
              variant={content.size === 'small' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, size: 'small' })}
            >
              S
            </Button>
            <Button
              type="button"
              variant={!content.size || content.size === 'medium' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, size: 'medium' })}
            >
              M
            </Button>
            <Button
              type="button"
              variant={content.size === 'large' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, size: 'large' })}
            >
              L
            </Button>
            <Button
              type="button"
              variant={content.size === 'full' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => onChange({ ...content, size: 'full' })}
            >
              Full
            </Button>
          </div>
        </div>
      </div>

      {content.url && (
        <div className="mt-4">
          <Label className="mb-2 block">Preview</Label>
          <Card>
            <CardContent className="p-4">
              <figure className={`${getSizeClass()} ${getAlignClass()}`}>
                <img 
                  src={content.url} 
                  alt={content.alt || ''} 
                  className="rounded-md w-full h-auto"
                />
                {content.caption && (
                  <figcaption className="text-sm text-muted-foreground text-center mt-2">
                    {content.caption}
                  </figcaption>
                )}
              </figure>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImageBlockEditor;
