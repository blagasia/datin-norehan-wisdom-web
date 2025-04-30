
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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-brand-creamy-ivory to-white border-brand-blush-rose/30">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl text-brand-dark">
            {promotion.content.heading}
          </DialogTitle>
          {promotion.content.subheading && (
            <DialogDescription className="text-brand-soft-gray">
              {promotion.content.subheading}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {promotion.content.imageUrl && (
          <div className="w-full h-48 rounded-md overflow-hidden mb-4 border border-brand-blush-rose/20">
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
              <Label htmlFor="name" className="text-brand-dark">Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-brand-blush-rose/30 focus:border-brand-blush-rose focus:ring-brand-blush-rose"
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('email') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-brand-dark">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-brand-blush-rose/30 focus:border-brand-blush-rose focus:ring-brand-blush-rose"
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('phone') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone" className="text-brand-dark">Phone</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-brand-blush-rose/30 focus:border-brand-blush-rose focus:ring-brand-blush-rose"
              />
            </div>
          )}
          
          {promotion.content.formFields?.includes('birthdate') && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="birthdate" className="text-brand-dark">Birth Date</Label>
              <Input 
                id="birthdate" 
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="border-brand-blush-rose/30 focus:border-brand-blush-rose focus:ring-brand-blush-rose"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              required
              className="border-brand-blush-rose text-brand-gilded-gold"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-brand-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and privacy policy
            </label>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button 
              type="submit"
              className="bg-brand-blush-rose hover:bg-brand-blush-rose/90 text-brand-dark"
            >
              {promotion.content.buttonText || "Submit"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-brand-blush-rose/30 hover:bg-brand-blush-rose/10 text-brand-dark"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
