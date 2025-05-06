
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Image, Plus, X, Loader2 } from 'lucide-react';

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  multiple?: boolean;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelect, multiple = false }) => {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('media')
        .list('', {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        throw error;
      }

      if (data) {
        // Filter out folders, only show files
        const files = data.filter(item => !item.id.endsWith('/'));
        setImages(files);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching media",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    setUploading(true);

    try {
      // Ensure the bucket exists or create it
      try {
        await supabase.storage.getBucket('media');
      } catch {
        await supabase.storage.createBucket('media', {
          public: true,
          fileSizeLimit: 10485760 // 10MB
        });
      }

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: "Upload successful",
          description: "Image has been uploaded to media library"
        });
        fetchImages();
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (publicUrl: string) => {
    setSelectedImage(publicUrl);
    if (onSelect) {
      onSelect(publicUrl);
    }
  };

  const getPublicUrl = (path: string) => {
    return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
  };

  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Media Library</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Label className="cursor-pointer">
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={uploadImage}
                disabled={uploading}
              />
              <Button variant="outline" size="sm" disabled={uploading}>
                {uploading ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
                ) : (
                  <><Plus className="h-4 w-4 mr-2" /> Upload</>
                )}
              </Button>
            </Label>
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
            <Image className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-3">No images found</p>
            <Label className="cursor-pointer">
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={uploadImage}
                disabled={uploading}
              />
              <Button variant="outline" size="sm" disabled={uploading}>
                Upload your first image
              </Button>
            </Label>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredImages.map((image) => {
              const publicUrl = getPublicUrl(image.name);
              return (
                <div 
                  key={image.id} 
                  className={`
                    relative border rounded-md overflow-hidden aspect-square cursor-pointer
                    hover:border-primary transition-colors
                    ${selectedImage === publicUrl ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
                  `}
                  onClick={() => handleImageSelect(publicUrl)}
                >
                  <img 
                    src={publicUrl} 
                    alt={image.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaLibrary;
