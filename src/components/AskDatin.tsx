
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MessageCircle, Check, ThumbsUp, Send, Users } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  question: z.string().min(10, 'Your question must be at least 10 characters')
});

// Sample conversation threads for demonstration
const sampleConversations = [
  {
    id: 1,
    name: "Sarah Lim",
    question: "I've been experiencing hormonal imbalance lately. Are there any natural remedies I can try before resorting to medication?",
    date: "April 25, 2025",
    response: "Dear Sarah, hormonal imbalances can be addressed with several natural approaches. First, I recommend incorporating adaptogenic herbs like ashwagandha and holy basil in your routine. These herbs help the body manage stress, which often disrupts hormonal balance. Also, consider adding omega-3 rich foods like flaxseeds, chia seeds, and fatty fish to your diet. Our Harmony Balance Tea contains a blend of herbs specifically formulated for women's hormonal health. For best results, drink it twice daily for at least 3 weeks. Remember to prioritize quality sleep and regular exercise as well. Feel free to reach out if you need more personalized guidance.",
    responseDate: "April 27, 2025",
    likes: 24,
    commentCount: 3
  },
  {
    id: 2,
    name: "Ahmad Kamal",
    question: "My mother has arthritis and struggles with joint pain. Which of your products would you recommend to help ease her discomfort?",
    date: "April 22, 2025",
    response: "Dear Ahmad, I'm sorry to hear about your mother's arthritis pain. For joint discomfort, I would recommend two of our products: our Turmeric & Ginger Joint Relief Capsules and our Healing Touch Massage Oil. The capsules contain a potent blend of anti-inflammatory herbs that work from within, while the massage oil provides immediate topical relief when gently massaged into painful areas. For best results, use them together - the capsules daily with food, and the oil as needed for pain flare-ups. Additionally, warm compresses and gentle movement can complement these remedies. If her condition is severe, please consult with her healthcare provider before starting any new supplement.",
    responseDate: "April 24, 2025",
    likes: 18,
    commentCount: 5
  },
  {
    id: 3,
    name: "Mei Lin",
    question: "I've been using your Radiance Face Serum for two weeks now but haven't seen much improvement in my hyperpigmentation. Am I using it correctly?",
    date: "April 18, 2025",
    response: "Dear Mei Lin, thank you for your patience with our Radiance Face Serum. Hyperpigmentation typically requires consistent treatment for 6-8 weeks before significant results appear. Make sure you're applying it to clean, dry skin every evening and following with moisturizer. Also important: use sunscreen daily (SPF 30+), as sun exposure can counteract the serum's benefits. For faster results, pair it with our Brightening Facial Mask once weekly. If after 8 weeks you still don't see improvement, your hyperpigmentation might benefit from our more intensive Professional Strength Spot Treatment instead. Feel free to send me photos of your concern if you'd like more personalized advice.",
    responseDate: "April 20, 2025",
    likes: 31,
    commentCount: 7
  }
];

// Featured topics to browse
const featuredTopics = [
  "Skincare Routines",
  "Traditional Remedies",
  "Hormonal Balance",
  "Stress Relief",
  "Natural Sleep Aids",
  "Anti-Aging Tips",
  "Hair Health",
  "Joint Pain Relief"
];

const AskDatin = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  // Initialize the form with validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      question: ''
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    
    // Show success message
    toast({
      title: "Question Submitted Successfully",
      description: "Thank you for your question. Datin Norehan will respond to you soon.",
    });
    
    // Reset the form
    form.reset();
  };

  const toggleConversation = (id: number) => {
    setActiveConversationId(activeConversationId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Ask Datin Norehan</h2>
            <p className="text-lg text-natural-gray max-w-2xl mx-auto mb-8">
              Join our community of natural wellness enthusiasts and get personalized advice from 
              Datin Norehan, our traditional wellness expert.
            </p>

            {/* Community Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-sm">
                <Users className="h-5 w-5 text-primary-purple mr-2" />
                <span className="font-medium">1,240+ Community Members</span>
              </div>
              <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-sm">
                <MessageCircle className="h-5 w-5 text-primary-purple mr-2" />
                <span className="font-medium">3,500+ Questions Answered</span>
              </div>
              <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-sm">
                <ThumbsUp className="h-5 w-5 text-primary-purple mr-2" />
                <span className="font-medium">98% Helpful Responses</span>
              </div>
            </div>
          </div>
          
          {/* Featured Topics Carousel */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair text-2xl font-semibold">Browse by Topic</h3>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredTopics.map((topic, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-4 h-24 flex items-center justify-center bg-gradient-to-r from-purple-100 to-natural-peach/20 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <span className="text-lg font-medium text-center">{topic}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" />
                <CarouselNext className="-right-12" />
              </div>
            </Carousel>
          </div>
          
          {/* Sample Conversations */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-playfair text-2xl font-semibold">Community Conversations</h3>
              <Button 
                variant="ghost" 
                onClick={() => setShowConversations(!showConversations)}
                className="text-natural-gray hover:text-natural-dark"
              >
                {showConversations ? 'Hide' : 'Show'} Conversations
              </Button>
            </div>
            
            {showConversations && (
              <div className="space-y-8">
                {sampleConversations.map((conv) => (
                  <Collapsible 
                    key={conv.id}
                    open={activeConversationId === conv.id}
                    onOpenChange={() => toggleConversation(conv.id)}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-natural-peach/20 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="p-6 border-b border-natural-peach/20 bg-natural-peach/5">
                      <CollapsibleTrigger className="w-full text-left">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold text-lg">{conv.name}</h4>
                          <span className="text-sm text-natural-gray">{conv.date}</span>
                        </div>
                        <p className="text-natural-dark line-clamp-2">{conv.question}</p>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="p-6 bg-white">
                        <div className="flex items-start mb-4">
                          <div className="w-12 h-12 rounded-full bg-natural-peach/30 flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="font-playfair font-bold text-xl text-natural-dark">D</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h5 className="font-semibold">Datin Norehan</h5>
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Verified
                              </span>
                              <span className="text-sm text-natural-gray ml-auto">{conv.responseDate}</span>
                            </div>
                            <p className="text-natural-dark mb-4">{conv.response}</p>
                            <div className="flex items-center justify-between border-t border-natural-peach/10 pt-3 mt-2">
                              <div className="flex items-center space-x-6">
                                <button className="flex items-center text-natural-gray hover:text-primary-purple">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  <span>{conv.likes}</span>
                                </button>
                                <button className="flex items-center text-natural-gray hover:text-primary-purple">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  <span>{conv.commentCount}</span>
                                </button>
                              </div>
                              <button className="text-natural-gray hover:text-primary-purple text-sm">
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>
          
          {/* Question Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-primary-purple/20">
            <h3 className="font-playfair text-xl font-semibold mb-6">Submit Your Question</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
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
                        <FormLabel className="text-sm font-medium">Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What's your question about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Your Question</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ask your question about natural wellness, herbal remedies, or our products..." 
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your question will be visible to the community after Datin Norehan responds.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary-purple hover:bg-primary-purple/90 px-10 py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Question
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskDatin;
