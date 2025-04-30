
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { VirtualEventProps } from './EventCard';

// Form validation schema using zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  specialRequests: z.string().optional(),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions to register.',
  }),
  shareInfo: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventRegistrationFormProps {
  event: VirtualEventProps;
}

const EventRegistrationForm = ({ event }: EventRegistrationFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
      agreeToTerms: false,
      shareInfo: false,
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    
    // Here you would normally send the registration data to your backend
    // For this demo, we'll just show a success toast
    
    toast({
      title: "Registration successful!",
      description: `Thank you for registering for "${event.title}". We've sent the details to your email.`,
      duration: 5000,
    });
    
    // Close the sheet after successful registration
    // This would normally be handled by the parent component via a callback
    // For a real implementation, you would pass an onSuccess prop
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-2">{event.title}</h3>
          <div className="text-natural-gray text-sm flex items-center gap-4">
            <div>{event.date}</div>
            <div>{event.time}</div>
          </div>
          <div className="mt-4 bg-natural-green/5 p-3 rounded-md text-sm">
            <div className="font-medium mb-1">Registration Fee:</div>
            <div className="text-lg font-bold">
              {event.price === 'Free' ? 'Free' : `RM ${event.price}`}
            </div>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" type="email" {...field} />
              </FormControl>
              <FormDescription>
                We'll send event details and access information to this email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+60 12 345 6789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests or Questions</FormLabel>
              <FormControl>
                <Textarea placeholder="Let us know if you have any special requests or questions..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-muted">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions and privacy policy
                </FormLabel>
                <FormDescription>
                  By registering, you agree to our event participation guidelines and cancellation policy.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="shareInfo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I'd like to receive updates about future events (optional)
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        {event.price !== 'Free' && (
          <div className="bg-natural-green/5 p-4 rounded-md text-sm mb-4">
            <p className="mb-2">For paid events, you'll proceed to payment after registration.</p>
            <p>We accept major credit/debit cards and online banking.</p>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          {event.price === 'Free' ? 'Register Now' : 'Continue to Payment'}
        </Button>
      </form>
    </Form>
  );
};

export default EventRegistrationForm;
