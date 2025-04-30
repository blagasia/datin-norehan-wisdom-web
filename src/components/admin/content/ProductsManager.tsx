
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { products } from '@/data/products';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Use the existing products as the initial data
const defaultProducts = [...products];

const ProductsManager = () => {
  const [productsList, setProductsList] = useState(defaultProducts);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('cmsProducts');
    if (savedProducts) {
      try {
        setProductsList(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Error parsing saved products:', e);
      }
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmsProducts', JSON.stringify(productsList));
  }, [productsList]);

  // Reset form for creating a new product
  const handleCreateNew = () => {
    setEditingProduct({
      id: productsList.length + 1,
      name: '',
      price: '',
      description: '',
      longDescription: '',
      image: '',
      category: '',
      ingredients: [],
      benefits: [],
      usage: '',
      featured: false,
    });
    setIsCreating(true);
  };

  // Handle edit product
  const handleEditProduct = (product: any) => {
    setEditingProduct({...product});
    setIsCreating(false);
  };

  // Handle save product
  const handleSaveProduct = () => {
    if (!editingProduct.name || !editingProduct.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isCreating) {
      setProductsList([...productsList, editingProduct]);
      toast({
        title: "Product created",
        description: "The product has been created successfully",
      });
    } else {
      setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
      toast({
        title: "Product updated",
        description: "The product has been updated successfully",
      });
    }

    setEditingProduct(null);
  };

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Products Manager</h2>
        <Button onClick={handleCreateNew}>Add New Product</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsList.length > 0 ? (
            productsList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">No img</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
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
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
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
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Create New Product' : 'Edit Product'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  value={editingProduct.name} 
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  placeholder="Product name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={editingProduct.category} 
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  placeholder="e.g., Skincare, Wellness"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  value={editingProduct.price} 
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  placeholder="RM 125"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={editingProduct.image} 
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea 
                  id="description" 
                  value={editingProduct.description} 
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  placeholder="Brief product description"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="longDescription">Full Description</Label>
                <Textarea 
                  id="longDescription" 
                  value={editingProduct.longDescription} 
                  onChange={(e) => setEditingProduct({...editingProduct, longDescription: e.target.value})}
                  placeholder="Detailed product description"
                  rows={5}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="usage">Usage Instructions</Label>
                <Textarea 
                  id="usage" 
                  value={editingProduct.usage} 
                  onChange={(e) => setEditingProduct({...editingProduct, usage: e.target.value})}
                  placeholder="How to use this product"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Featured Product</Label>
                <Select 
                  value={editingProduct.featured ? "yes" : "no"} 
                  onValueChange={(val) => setEditingProduct({...editingProduct, featured: val === "yes"})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button onClick={handleSaveProduct}>
                {isCreating ? 'Create Product' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductsManager;
