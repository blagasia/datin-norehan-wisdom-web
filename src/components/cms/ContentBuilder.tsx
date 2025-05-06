
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2, Save, Eye, Copy, Upload, Download, Image, Type, Layout, Columns } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@/components/ui/dnd';
import { useToast } from '@/components/ui/use-toast';
import TextBlockEditor from './blocks/TextBlockEditor';
import ImageBlockEditor from './blocks/ImageBlockEditor';
import HeroBlockEditor from './blocks/HeroBlockEditor';
import FeaturesBlockEditor from './blocks/FeaturesBlockEditor';
import ProductsBlockEditor from './blocks/ProductsBlockEditor';
import ArticlesBlockEditor from './blocks/ArticlesBlockEditor';
import { supabase } from '@/integrations/supabase/client';

// Use a more specific type that matches Json
export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'hero' | 'features' | 'products' | 'articles' | 'custom';
  content: Record<string, any>; // Changed to Record<string, any> to match Json type
}

interface ContentBuilderProps {
  initialContent?: ContentBlock[];
  pageId?: string;
  onSave?: (blocks: ContentBlock[]) => void;
  readOnly?: boolean;
}

const ContentBuilder: React.FC<ContentBuilderProps> = ({ 
  initialContent = [], 
  pageId, 
  onSave,
  readOnly = false 
}) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialContent);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      content: getDefaultContentForType(type)
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockIndex(blocks.length);
  };

  const getDefaultContentForType = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        return { text: '<p>Enter your text here</p>' };
      case 'image':
        return { url: '', alt: '', caption: '' };
      case 'hero':
        return { 
          title: 'Hero Title', 
          subtitle: 'Hero Subtitle', 
          buttonText: 'Learn More', 
          buttonLink: '/',
          backgroundImage: '' 
        };
      case 'features':
        return { 
          title: 'Features', 
          features: [
            { id: '1', title: 'Feature 1', description: 'Description', icon: 'star' },
            { id: '2', title: 'Feature 2', description: 'Description', icon: 'heart' },
            { id: '3', title: 'Feature 3', description: 'Description', icon: 'zap' }
          ] 
        };
      case 'products':
        return { 
          title: 'Products',
          description: 'Our featured products',
          products: [] 
        };
      case 'articles':
        return { 
          title: 'Articles',
          description: 'Latest articles',
          articles: [] 
        };
      default:
        return {};
    }
  };

  const updateBlockContent = (index: number, content: any) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      content: {
        ...updatedBlocks[index].content,
        ...content
      }
    };
    setBlocks(updatedBlocks);
  };

  const removeBlock = (index: number) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
    setSelectedBlockIndex(null);
  };

  const duplicateBlock = (index: number) => {
    const blockToDuplicate = blocks[index];
    const duplicatedBlock = {
      ...blockToDuplicate,
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, duplicatedBlock);
    setBlocks(updatedBlocks);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setBlocks(items);
    setSelectedBlockIndex(result.destination.index);
  };

  const handleSave = async () => {
    if (onSave) {
      onSave(blocks);
      return;
    }

    if (!pageId) {
      toast({
        title: "Error",
        description: "No page ID provided for saving",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      // Fix for TS2322 error - explicitly shape the content object to match Json type
      const { error } = await supabase
        .from('content_pages')
        .update({ 
          content: { 
            blocks: blocks.map(block => ({
              id: block.id,
              type: block.type,
              content: block.content
            }))
          } 
        })
        .eq('id', pageId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Content saved successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to save content: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "page-content.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        try {
          const content = JSON.parse(e.target?.result as string);
          if (Array.isArray(content)) {
            setBlocks(content);
            toast({
              title: "Success",
              description: "Content imported successfully"
            });
          } else {
            throw new Error("Invalid content format");
          }
        } catch (error: any) {
          toast({
            title: "Error",
            description: `Failed to import content: ${error.message}`,
            variant: "destructive"
          });
        }
      };
    }
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    const isSelected = selectedBlockIndex === index;
    
    switch (block.type) {
      case 'text':
        return (
          <TextBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      case 'image':
        return (
          <ImageBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      case 'hero':
        return (
          <HeroBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      case 'features':
        return (
          <FeaturesBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      case 'products':
        return (
          <ProductsBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      case 'articles':
        return (
          <ArticlesBlockEditor 
            content={block.content} 
            onChange={(content) => updateBlockContent(index, content)} 
            readOnly={previewMode || readOnly}
          />
        );
      default:
        return <div>Unsupported block type</div>;
    }
  };

  if (readOnly) {
    return (
      <div className="space-y-8">
        {blocks.map((block, index) => (
          <div key={block.id} className="mb-8">
            {renderBlockEditor(block, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Page Content Builder</h2>
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer">
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={importJSON} 
            />
            <Button variant="outline" size="sm" asChild>
              <span><Upload className="h-4 w-4 mr-2" /> Import</span>
            </Button>
          </label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportJSON}
          >
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" /> {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" /> {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {!previewMode && (
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="blocks">
                  <TabsList className="grid grid-cols-1 w-full">
                    <TabsTrigger value="blocks">Add Blocks</TabsTrigger>
                  </TabsList>
                  <TabsContent value="blocks" className="pt-4">
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('text')}
                      >
                        <Type className="h-4 w-4 mr-2" /> Text Block
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('image')}
                      >
                        <Image className="h-4 w-4 mr-2" /> Image Block
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('hero')}
                      >
                        <Layout className="h-4 w-4 mr-2" /> Hero Block
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('features')}
                      >
                        <Columns className="h-4 w-4 mr-2" /> Features Block
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('products')}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Products Block
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => addBlock('articles')}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Articles Block
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={`${previewMode ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="content-blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-md ${selectedBlockIndex === index && !previewMode ? 'border-primary' : 'border-muted'}`}
                        >
                          {!previewMode && (
                            <div 
                              className="flex items-center justify-between p-2 bg-muted border-b" 
                              {...provided.dragHandleProps}
                            >
                              <span className="text-sm font-medium capitalize">{block.type} Block</span>
                              <div className="flex items-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => duplicateBlock(index)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeBlock(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          )}
                          <div 
                            className="p-4" 
                            onClick={() => !previewMode && setSelectedBlockIndex(index)}
                          >
                            {renderBlockEditor(block, index)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  
                  {blocks.length === 0 && !previewMode && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-md">
                      <p className="text-muted-foreground mb-4">No content blocks added yet</p>
                      <Button onClick={() => addBlock('text')}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Your First Block
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ContentBuilder;
