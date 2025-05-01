
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

interface NewsletterSubscriptionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  className?: string;
}

const NewsletterSubscription = ({
  title = "Join Our Inner Circle",
  subtitle = "Subscribe for early access to limited formulations, wellness wisdom, and exclusive invitations to our botanical gatherings.",
  buttonLabel = "Subscribe",
  className = "",
}: NewsletterSubscriptionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (values: SubscribeFormValues) => {
    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Welcome to our community",
      description: "You've been added to our exclusive circle of wellness enthusiasts.",
    });
    form.reset();
  };
  
  return (
    <div className={`max-w-2xl mx-auto text-center ${className}`}>
      {title && <h2 className="font-italiana text-2xl uppercase tracking-wide mb-8">{title}</h2>}
      {subtitle && <p className="font-karla text-brand-soft-gray mb-12 max-w-lg mx-auto">{subtitle}</p>}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        className="border-b border-brand-soft-gray/30 rounded-none focus-visible:ring-0 focus-visible:border-brand-muted-rose h-12 bg-transparent" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="submit"
              className="rounded-none h-12 min-w-[120px] bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : (
                <span className="flex items-center">
                  {buttonLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      <p className="text-xs text-brand-soft-gray/80">
        By subscribing, you join our community of wellness enthusiasts. We treat your information with care.
      </p>
    </div>
  );
};

export default NewsletterSubscription;
