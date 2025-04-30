
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { VirtualEventProps } from './EventCard';
import { Ticket, TicketType } from '@/types/ticket';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  ticketTypeId: z.string().min(1, { message: 'Please select a ticket type.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface TicketPurchaseFormProps {
  event: VirtualEventProps;
  onTicketPurchased: (ticket: Ticket) => void;
}

const TicketPurchaseForm = ({ event, onTicketPurchased }: TicketPurchaseFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      ticketTypeId: '',
    },
  });
  
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Find selected ticket type
    const selectedTicketType = event.ticketTypes?.find(t => t.id === data.ticketTypeId);
    if (!selectedTicketType) {
      toast({
        title: "Error",
        description: "Selected ticket type not found",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Create ticket object
    const ticket: Ticket = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      eventId: event.id,
      name: data.fullName,
      email: data.email,
      ticketType: data.ticketTypeId as 'standard' | 'vip' | 'early-bird',
      price: selectedTicketType.price,
      purchaseDate: new Date().toISOString(),
      redeemed: false,
    };
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, you would save the ticket to a database here
      onTicketPurchased(ticket);
      
      toast({
        title: "Ticket purchased successfully!",
        description: `We've emailed your ticket to ${data.email}`,
      });
      
      setIsSubmitting(false);
    }, 1500);
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
          <div className="text-natural-gray text-sm flex items-center gap-1 mt-1">
            <MapPinIcon size={14} />
            <div>{event.location}</div>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="ticketTypeId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Ticket Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {event.ticketTypes?.map((ticketType) => (
                    <FormItem key={ticketType.id} className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                      <FormControl>
                        <RadioGroupItem value={ticketType.id} />
                      </FormControl>
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <FormLabel className="font-medium">{ticketType.name}</FormLabel>
                          <div className="font-semibold">RM {ticketType.price}</div>
                        </div>
                        <FormDescription>{ticketType.description}</FormDescription>
                        <div className="text-xs text-natural-gray mt-1">
                          {ticketType.available - ticketType.sold} tickets remaining
                        </div>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                We'll send your ticket to this email address.
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
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Purchase Ticket'}
        </Button>
      </form>
    </Form>
  );
};

export default TicketPurchaseForm;
