
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Promotion } from '@/types/loyalty';
import { useToast } from '@/hooks/use-toast';
import { useLoyalty } from '@/context/LoyaltyContext';

interface PromoPopupProps {
  promotion: Promotion;
  onClose: () => void;
}

const PromoPopup = ({ promotion, onClose }: PromoPopupProps) => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { toast } = useToast();
  const { register } = useLoyalty();

  // Set a flag in localStorage to prevent showing the popup again if needed
  useEffect(() => {
    if (promotion.displayFrequency === 'once') {
      localStorage.setItem(`promo_shown_${promotion.id}`, 'true');
    } else if (promotion.displayFrequency === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`promo_shown_${promotion.id}`, today);
    }
  }, [promotion]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the submission (would be sent to blagasia@gmail.com in a real implementation)
    console.log('Promotion signup to be sent to blagasia@gmail.com:', {
      name,
      email,
      phone,
      birthdate,
      promotionId: promotion.id,
      promotionTitle: promotion.title
    });
    
    if (promotion.content.loyaltySignup) {
      register({
        email,
        name,
        phone,
        birthDate: birthdate || undefined
      });
    }

    if (promotion.content.discountCode) {
      localStorage.setItem('current_promo_code', promotion.content.discountCode);
      localStorage.setItem('current_promo_value', promotion.content.discountValue?.toString() || '');
      localStorage.setItem('current_promo_unit', promotion.content.discountUnit || '');
      
      toast({
        title: "Promotion code applied",
        description: `You've unlocked the promo code: ${promotion.content.discountCode}`,
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your information has been saved.",
      });
    }
    
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl">
            {promotion.content.heading}
          </DialogTitle>
          {promotion.content.subheading && (
            <DialogDescription>
              {promotion.content.subheading}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {promotion.content.imageUrl && (
          <div className="w-full h-48 rounded-md overflow-hidden mb-4">
            <img 
              src={promotion.content.imageUrl} 
              alt={promotion.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {promotion.content.formFields?.includes('name') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('email') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('phone') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('birthdate') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="birthdate">Birth Date</Label>
              <Input 
                id="birthdate" 
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              required
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and privacy policy
            </label>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button type="submit">
              {promotion.content.buttonText}
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Maybe Later
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
