
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AskDatin = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Question Submitted",
      description: "Datin Norehan will review your question and respond soon.",
    });
  };

  return (
    <section className="py-16 md:py-24 bg-natural-peach/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Ask Datin Norehan</h2>
            <p className="section-subtitle">Have questions about wellness, natural remedies, or our products? Submit your questions and let Datin Norehan share her wisdom.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-peach/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="What's your question about?" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium">Your Question</label>
                <Textarea 
                  id="question" 
                  placeholder="Ask your question about natural wellness, herbal remedies, or our products..." 
                  rows={5}
                  required
                />
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" className="btn-primary px-10">Submit Question</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskDatin;
