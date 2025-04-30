
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { DragDropContext, Droppable, Draggable } from '@/components/ui/dnd';
import { 
  LayoutGrid, 
  Type, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  MoveVertical,
  Plus,
  Save
} from 'lucide-react';

// Define the types of blocks that can be added to a page
type BlockType = 'heading' | 'paragraph' | 'image' | 'cta';

// Define the structure of a block
interface Block {
  id: string;
  type: BlockType;
  content: {
    text?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

// Define the structure of a page
interface Page {
  id: string;
  name: string;
  slug: string;
  blocks: Block[];
}

const defaultPages: Page[] = [
  {
    id: '1',
    name: 'Home Page',
    slug: 'home',
    blocks: [
      {
        id: '1',
        type: 'heading',
        content: {
          text: 'Welcome to Datin Norehan',
        }
      },
      {
        id: '2',
        type: 'paragraph',
        content: {
          text: 'Discover natural wellness remedies and traditional herbal solutions.',
        }
      },
      {
        id: '3',
        type: 'image',
        content: {
          imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
        }
      },
      {
        id: '4',
        type: 'cta',
        content: {
          text: 'Explore our high-quality products',
          buttonText: 'Shop Now',
          buttonLink: '/products',
        }
      }
    ]
  }
];

// Component to render a specific block based on its type
const BlockRenderer = ({ 
  block, 
  onRemove, 
  onUpdate 
}: { 
  block: Block, 
  onRemove: (id: string) => void, 
  onUpdate: (id: string, content: any) => void 
}) => {
  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-2">
          <Label htmlFor={`heading-${block.id}`}>Heading Text</Label>
          <div className="flex gap-2">
            <Input 
              id={`heading-${block.id}`}
              value={block.content.text || ''}
              onChange={(e) => onUpdate(block.id, { text: e.target.value })}
              placeholder="Enter heading text"
            />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => onRemove(block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    
    case 'paragraph':
      return (
        <div className="space-y-2">
          <Label htmlFor={`paragraph-${block.id}`}>Paragraph Text</Label>
          <div className="flex gap-2">
            <Input 
              id={`paragraph-${block.id}`}
              value={block.content.text || ''}
              onChange={(e) => onUpdate(block.id, { text: e.target.value })}
              placeholder="Enter paragraph text"
            />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => onRemove(block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    
    case 'image':
      return (
        <div className="space-y-2">
          <Label htmlFor={`image-${block.id}`}>Image URL</Label>
          <div className="flex gap-2">
            <Input 
              id={`image-${block.id}`}
              value={block.content.imageUrl || ''}
              onChange={(e) => onUpdate(block.id, { imageUrl: e.target.value })}
              placeholder="Enter image URL"
            />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => onRemove(block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {block.content.imageUrl && (
            <img 
              src={block.content.imageUrl} 
              alt="Preview" 
              className="mt-2 h-24 object-cover rounded"
            />
          )}
        </div>
      );
    
    case 'cta':
      return (
        <div className="space-y-2">
          <Label htmlFor={`cta-text-${block.id}`}>CTA Text</Label>
          <Input 
            id={`cta-text-${block.id}`}
            value={block.content.text || ''}
            onChange={(e) => onUpdate(block.id, { ...block.content, text: e.target.value })}
            placeholder="Enter CTA text"
            className="mb-2"
          />
          <Label htmlFor={`cta-button-${block.id}`}>Button Text</Label>
          <Input 
            id={`cta-button-${block.id}`}
            value={block.content.buttonText || ''}
            onChange={(e) => onUpdate(block.id, { ...block.content, buttonText: e.target.value })}
            placeholder="Enter button text"
            className="mb-2"
          />
          <Label htmlFor={`cta-link-${block.id}`}>Button Link</Label>
          <div className="flex gap-2">
            <Input 
              id={`cta-link-${block.id}`}
              value={block.content.buttonLink || ''}
              onChange={(e) => onUpdate(block.id, { ...block.content, buttonLink: e.target.value })}
              placeholder="Enter button link"
            />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => onRemove(block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

const PageEditor = () => {
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const { toast } = useToast();

  // Load pages from localStorage on component mount
  useEffect(() => {
    const savedPages = localStorage.getItem('cmsPages');
    if (savedPages) {
      try {
        const parsedPages = JSON.parse(savedPages);
        setPages(parsedPages);
        if (parsedPages.length > 0) {
          setCurrentPage(parsedPages[0]);
        }
      } catch (e) {
        console.error('Error parsing saved pages:', e);
      }
    } else if (defaultPages.length > 0) {
      setCurrentPage(defaultPages[0]);
    }
  }, []);

  // Save pages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmsPages', JSON.stringify(pages));
  }, [pages]);

  // Handle page selection
  const handlePageChange = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setCurrentPage(page);
    }
  };

  // Add a new block to the current page
  const addBlock = (type: BlockType) => {
    if (!currentPage) return;
    
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: {}
    };
    
    const updatedPage = {
      ...currentPage,
      blocks: [...currentPage.blocks, newBlock]
    };
    
    setCurrentPage(updatedPage);
    setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
    
    toast({
      title: "Block added",
      description: `A new ${type} block has been added to the page.`,
    });
  };

  // Handle block removal
  const removeBlock = (blockId: string) => {
    if (!currentPage) return;
    
    const updatedBlocks = currentPage.blocks.filter(block => block.id !== blockId);
    const updatedPage = {
      ...currentPage,
      blocks: updatedBlocks
    };
    
    setCurrentPage(updatedPage);
    setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
    
    toast({
      title: "Block removed",
      description: "The block has been removed from the page.",
    });
  };

  // Handle block content update
  const updateBlock = (blockId: string, content: any) => {
    if (!currentPage) return;
    
    const updatedBlocks = currentPage.blocks.map(block => 
      block.id === blockId 
        ? { ...block, content: { ...block.content, ...content } } 
        : block
    );
    
    const updatedPage = {
      ...currentPage,
      blocks: updatedBlocks
    };
    
    setCurrentPage(updatedPage);
    setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination || !currentPage) return;
    
    const items = Array.from(currentPage.blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const updatedPage = {
      ...currentPage,
      blocks: items
    };
    
    setCurrentPage(updatedPage);
    setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
  };

  // Add a new page
  const addPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      name: `New Page ${pages.length + 1}`,
      slug: `new-page-${pages.length + 1}`,
      blocks: []
    };
    
    setPages([...pages, newPage]);
    setCurrentPage(newPage);
    
    toast({
      title: "Page created",
      description: "A new page has been created.",
    });
  };

  // Save current page changes
  const savePage = () => {
    if (!currentPage) return;
    
    setPages(pages.map(p => p.id === currentPage.id ? currentPage : p));
    
    toast({
      title: "Page saved",
      description: "Your changes have been saved successfully.",
    });
  };

  // Preview component to show how the page will look
  const PagePreview = ({ page }: { page: Page }) => (
    <div className="p-4 border rounded-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Page Preview</h2>
      <div className="space-y-4 p-4 border rounded-md">
        {page.blocks.map(block => (
          <div key={block.id} className="preview-block">
            {block.type === 'heading' && (
              <h2 className="text-2xl font-bold">{block.content.text}</h2>
            )}
            {block.type === 'paragraph' && (
              <p>{block.content.text}</p>
            )}
            {block.type === 'image' && block.content.imageUrl && (
              <img
                src={block.content.imageUrl}
                alt="Content"
                className="max-w-full h-auto rounded"
              />
            )}
            {block.type === 'cta' && (
              <div className="space-y-2">
                <p className="font-medium">{block.content.text}</p>
                <Button>{block.content.buttonText || 'Click Here'}</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (!currentPage) {
    return (
      <div className="text-center py-8">
        <p>No pages available.</p>
        <Button onClick={addPage} className="mt-4">Create a Page</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Page Editor</h2>
        <div className="flex gap-2">
          <Button onClick={addPage} variant="outline">Add New Page</Button>
          <Button onClick={savePage}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/3">
              <Label htmlFor="page-select">Select Page</Label>
              <Select
                value={currentPage.id}
                onValueChange={handlePageChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map(page => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/3">
              <Label htmlFor="page-name">Page Name</Label>
              <Input
                id="page-name"
                value={currentPage.name}
                onChange={(e) => {
                  const updatedPage = { ...currentPage, name: e.target.value };
                  setCurrentPage(updatedPage);
                  setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
                }}
              />
            </div>
            <div className="w-1/3">
              <Label htmlFor="page-slug">Page Slug</Label>
              <Input
                id="page-slug"
                value={currentPage.slug}
                onChange={(e) => {
                  const updatedPage = { ...currentPage, slug: e.target.value };
                  setCurrentPage(updatedPage);
                  setPages(pages.map(p => p.id === currentPage.id ? updatedPage : p));
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Page Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('heading')}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Add Heading
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('paragraph')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add Paragraph
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('image')}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('cta')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add CTA
                </Button>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {currentPage.blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border p-4 rounded-md bg-white"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">
                                  {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
                                </div>
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move"
                                >
                                  <MoveVertical className="h-4 w-4" />
                                </div>
                              </div>
                              <BlockRenderer
                                block={block}
                                onRemove={removeBlock}
                                onUpdate={updateBlock}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {currentPage.blocks.length === 0 && (
                        <div className="text-center py-8 border rounded-md bg-gray-50">
                          <LayoutGrid className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            This page is empty. Add blocks using the buttons above.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <PagePreview page={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
