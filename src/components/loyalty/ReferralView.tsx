
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Copy, Tag, BadgePercent, BadgeDollarSign, User } from 'lucide-react';
import { useLoyalty } from '@/context/LoyaltyContext';

const ReferralView = () => {
  const { customer, referrals, commissionTier, totalReferralValue, totalCommissionEarned, generateReferralLink } = useLoyalty();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const referralLink = generateReferralLink();

  const handleCopyReferralLink = () => {
    if (!referralLink) return;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  if (!customer || !customer.referralCode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
          <CardDescription>Sign up to join our referral program</CardDescription>
        </CardHeader>
        <CardContent>
          <p>You need to be registered to participate in our referral program.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>Share this link with friends to earn commissions</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {commissionTier?.name || "Starter"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input 
              value={referralLink}
              readOnly
              className="pr-24"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute right-1 top-1 h-8"
              onClick={handleCopyReferralLink}
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          
          <p className="mt-4 text-sm">
            Your referral code: <span className="font-mono font-medium">{customer.referralCode}</span>
          </p>
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-col items-start gap-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-sm text-muted-foreground">Referrals</p>
              <p className="text-xl font-bold">{referrals.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-xl font-bold">RM {totalReferralValue.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commissions</p>
              <p className="text-xl font-bold">RM {totalCommissionEarned.toFixed(2)}</p>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
          <CardDescription>
            Your current tier: <Badge variant="secondary" className="ml-2">{commissionTier?.name}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>As your referral value increases, you'll climb through our commission tiers:</p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Min. Referral Value</TableHead>
                  <TableHead>Commission Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Starter", value: 0, rate: "5%" },
                  { name: "Bronze Partner", value: 500, rate: "8%" },
                  { name: "Silver Partner", value: 2000, rate: "10%" },
                  { name: "Gold Partner", value: 5000, rate: "15%" },
                  { name: "Platinum Partner", value: 10000, rate: "20%" }
                ].map((tier) => (
                  <TableRow key={tier.name} className={tier.name === commissionTier?.name ? "bg-secondary/20" : ""}>
                    <TableCell className="font-medium">{tier.name}</TableCell>
                    <TableCell>RM {tier.value.toLocaleString()}</TableCell>
                    <TableCell>{tier.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <p className="text-sm text-muted-foreground mt-2">
              Note: Commission rates may vary by product. Some products offer additional flat commissions.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completed">
            <TabsList className="mb-4">
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="completed">
              {referrals.filter(r => r.status === 'completed').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Purchase</TableHead>
                      <TableHead>Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals
                      .filter(r => r.status === 'completed')
                      .map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            User #{referral.referredCustomerId.substring(referral.referredCustomerId.length - 4)}
                          </TableCell>
                          <TableCell>Product #{referral.productId}</TableCell>
                          <TableCell>RM {referral.purchaseAmount?.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">RM {referral.commissionEarned?.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed referrals yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending">
              {referrals.filter(r => r.status === 'pending').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals
                      .filter(r => r.status === 'pending')
                      .map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            User #{referral.referredCustomerId.substring(referral.referredCustomerId.length - 4)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Pending</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending referrals</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralView;
