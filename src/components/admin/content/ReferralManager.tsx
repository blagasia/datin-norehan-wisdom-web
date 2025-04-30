
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';

import { ProductCommission, CommissionTier } from '@/types/loyalty';
import { productCommissions, commissionTiers } from '@/data/referral';

const ReferralManager = () => {
  const [productsCommissions, setProductsCommissions] = useState<ProductCommission[]>([...productCommissions]);
  const [commissionTiersData, setCommissionTiersData] = useState<CommissionTier[]>([...commissionTiers]);
  const [selectedProductCommission, setSelectedProductCommission] = useState<ProductCommission | null>(null);
  const [selectedTier, setSelectedTier] = useState<CommissionTier | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Load saved data from localStorage
  useEffect(() => {
    const savedCommissions = localStorage.getItem('cms_productCommissions');
    if (savedCommissions) {
      try {
        setProductsCommissions(JSON.parse(savedCommissions));
      } catch (e) {
        console.error('Failed to parse saved product commissions', e);
      }
    }
    
    const savedTiers = localStorage.getItem('cms_commissionTiers');
    if (savedTiers) {
      try {
        setCommissionTiersData(JSON.parse(savedTiers));
      } catch (e) {
        console.error('Failed to parse saved commission tiers', e);
      }
    }
  }, []);
  
  // Save to database mock function
  const saveToDatabase = async (data: any, type: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(`cms_${type}`, JSON.stringify(data));
        resolve(true);
      }, 500);
    });
  };

  // Handle product commission change
  const handleProductCommissionChange = (field: keyof ProductCommission, value: any) => {
    if (!selectedProductCommission) return;
    
    setSelectedProductCommission({
      ...selectedProductCommission,
      [field]: value
    });
  };
  
  // Handle tier change
  const handleTierChange = (field: keyof CommissionTier, value: any) => {
    if (!selectedTier) return;
    
    setSelectedTier({
      ...selectedTier,
      [field]: value
    });
  };

  // Save product commission
  const handleSaveProductCommission = async () => {
    if (!selectedProductCommission) return;
    
    setIsSaving(true);
    
    try {
      const updated = productsCommissions.map(pc => 
        pc.productId === selectedProductCommission.productId ? selectedProductCommission : pc
      );
      
      await saveToDatabase(updated, 'productCommissions');
      setProductsCommissions(updated);
      
      toast({
        title: "Commission saved",
        description: "Product commission settings have been updated",
      });
    } catch (error) {
      toast({
        title: "Error saving commission",
        description: "There was an error saving the commission settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Save tier
  const handleSaveTier = async () => {
    if (!selectedTier) return;
    
    setIsSaving(true);
    
    try {
      const updated = commissionTiersData.map(tier => 
        tier.id === selectedTier.id ? selectedTier : tier
      );
      
      await saveToDatabase(updated, 'commissionTiers');
      setCommissionTiersData(updated);
      
      toast({
        title: "Tier saved",
        description: "Commission tier settings have been updated",
      });
    } catch (error) {
      toast({
        title: "Error saving tier",
        description: "There was an error saving the tier settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderProductCommissionsTab = () => (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Product-Specific Commissions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-md overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h3 className="font-medium">Products</h3>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto">
            {productsCommissions.map((commission) => (
              <div
                key={commission.productId}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedProductCommission?.productId === commission.productId ? 'bg-brand-blush-rose/10' : ''
                }`}
                onClick={() => setSelectedProductCommission(commission)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Product #{commission.productId}</p>
                    <p className="text-xs text-gray-500">
                      {commission.commissionRate * 100}% commission
                    </p>
                  </div>
                  <div>
                    {commission.isActive ? (
                      <Badge variant="secondary">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          {selectedProductCommission ? (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Edit Product Commission</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <Input 
                    id="productId" 
                    value={selectedProductCommission.productId}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input 
                    id="commissionRate" 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={selectedProductCommission.commissionRate * 100}
                    onChange={(e) => handleProductCommissionChange('commissionRate', Number(e.target.value) / 100)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="flatCommission">Flat Commission (RM)</Label>
                  <Input 
                    id="flatCommission" 
                    type="number"
                    min="0"
                    step="1"
                    value={selectedProductCommission.flatCommission || 0}
                    onChange={(e) => handleProductCommissionChange('flatCommission', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedProductCommission.isActive}
                      onCheckedChange={(checked) => handleProductCommissionChange('isActive', checked)}
                    />
                    <Label>Active</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveProductCommission} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-md p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select a product to edit commission settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTiersTab = () => (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Commission Tiers</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-md overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h3 className="font-medium">Tiers</h3>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto">
            {commissionTiersData.map((tier) => (
              <div
                key={tier.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedTier?.id === tier.id ? 'bg-brand-blush-rose/10' : ''
                }`}
                onClick={() => setSelectedTier(tier)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{tier.name}</p>
                    <p className="text-xs text-gray-500">
                      Min: RM {tier.minReferralValue}
                    </p>
                  </div>
                  <div>
                    <Badge>{(tier.baseCommissionRate * 100).toFixed(0)}%</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          {selectedTier ? (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Edit Commission Tier</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="tierName">Tier Name</Label>
                  <Input 
                    id="tierName" 
                    value={selectedTier.name}
                    onChange={(e) => handleTierChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minReferralValue">Min Referral Value (RM)</Label>
                  <Input 
                    id="minReferralValue" 
                    type="number"
                    min="0"
                    step="100"
                    value={selectedTier.minReferralValue}
                    onChange={(e) => handleTierChange('minReferralValue', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="baseCommissionRate">Commission Rate (%)</Label>
                  <Input 
                    id="baseCommissionRate" 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={selectedTier.baseCommissionRate * 100}
                    onChange={(e) => handleTierChange('baseCommissionRate', Number(e.target.value) / 100)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveTier} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-md p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select a tier to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderStatisticsTab = () => (
    <div>
      <h2 className="text-xl font-semibold mb-6">Referral Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Commission Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM 568.50</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Referrers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>
      
      <p className="mb-6">Coming soon: Detailed referral analytics and reports.</p>
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Product Commissions</TabsTrigger>
          <TabsTrigger value="tiers">Commission Tiers</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          {renderProductCommissionsTab()}
        </TabsContent>
        
        <TabsContent value="tiers">
          {renderTiersTab()}
        </TabsContent>
        
        <TabsContent value="statistics">
          {renderStatisticsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralManager;
