
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, HelpCircle, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const HelpAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm your CMS assistant. How can I help you today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Placeholder function for AI response
  const getAIResponse = async (userMessage: string) => {
    // In a real implementation, this would call an AI service
    setIsLoading(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate responses based on keywords
    let response = '';
    
    if (userMessage.toLowerCase().includes('page')) {
      response = "Pages are content containers that you can create and manage in the CMS. To create a new page, go to the 'Pages' tab and click 'New Page'. You can then add content blocks to build your page.";
    } else if (userMessage.toLowerCase().includes('lead') || userMessage.toLowerCase().includes('crm')) {
      response = "The CRM system helps you manage leads and customer relationships. You can add new leads, track their status, and record activities. Navigate to the 'CRM' tab to manage your leads.";
    } else if (userMessage.toLowerCase().includes('content') || userMessage.toLowerCase().includes('block')) {
      response = "Content blocks are the building elements of your pages. When editing a page, you can add various block types like text, images, heroes, features, and more. Each block type has its own set of configurable options.";
    } else if (userMessage.toLowerCase().includes('publish')) {
      response = "To publish a page, edit it and toggle the 'Published' switch in the top right corner. Published pages will be visible to visitors, while drafts are only visible in the CMS.";
    } else {
      response = "I'm here to help with all aspects of your CMS and website management. You can ask about pages, content blocks, the CRM system, or any other features. What would you like to know more about?";
    }
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Get AI response
    const aiResponse = await getAIResponse(inputValue);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    
    // Scroll to bottom after messages update
    setTimeout(scrollToBottom, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              CMS Assistant
            </SheetTitle>
            <SheetDescription>
              Get help with managing your website content
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <Card className={`max-w-[85%] ${message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                    <CardContent className="p-3">
                      <p className="text-sm">{message.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Card className="max-w-[85%] bg-muted">
                    <CardContent className="p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="p-4 border-t mt-auto">
            <div className="flex">
              <Input
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                className="ml-2" 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpAssistant;
