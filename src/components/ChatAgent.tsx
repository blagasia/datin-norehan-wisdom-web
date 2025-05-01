
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto responses based on keywords
  const autoResponses: Record<string, string> = {
    'hello': 'Hello! Welcome to Datin Norehan Apothecary. How may I assist you today?',
    'hi': 'Hi there! How can I help you with Datin Norehan\'s products today?',
    'product': 'We offer a range of wellness products under our DNA collection, including elixirs, rituals, and more. Would you like me to tell you about a specific category?',
    'elixir': 'Our DNA Elixirs collection features internal wellness formulations based on traditional recipes. Each is crafted to nourish your body from within.',
    'ritual': 'DNA Rituals features tools and accessories designed to enhance your wellness practices, including our handcrafted ceramic containers.',
    'price': 'Our products range in price depending on the collection. Is there a specific product you\'d like to know the price of?',
    'shipping': 'We offer free shipping on orders over $50. Standard shipping usually takes 3-5 business days.',
    'contact': 'You can contact our customer service team at support@datinnorehan.com or call us at 1-800-WELLNESS.',
    'help': 'I\'d be happy to help! You can ask about our products, shipping, company information, or place an order.',
    'order': 'To place an order, simply browse our collections, add items to your cart, and proceed to checkout. Would you like me to guide you to a specific collection?',
    'discount': 'Join our Devotee loyalty program for exclusive discounts and early access to new collections.',
    'ingredients': 'All our products are made with natural, ethically-sourced ingredients. Is there a specific product ingredient you\'d like to know about?',
    'datin': 'Datin Norehan is our founder who combines traditional Malaysian herbal wisdom with modern scientific understanding to create our unique wellness formulations.',
    'thanks': 'You\'re welcome! Is there anything else I can help you with?',
    'thank you': 'You\'re welcome! Is there anything else I can help you with?',
  };

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Welcome to Datin Norehan Apothecary! I\'m your virtual assistant. How may I help you today?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(msgs => [...msgs, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot thinking and generate response
    setTimeout(() => {
      const botResponse = generateResponse(message);
      setMessages(msgs => [...msgs, {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (input.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses if no keywords match
    const defaultResponses = [
      "Thank you for your message. Would you like to learn more about our DNA collections?",
      "I'd be happy to assist with that. Could you provide more details so I can better help you?",
      "That's an interesting question! Our wellness advisors would be happy to discuss this in more detail. Would you like me to arrange a consultation?",
      "I don't have that specific information right now, but I can connect you with someone who does. Would you like to leave your contact details?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-5 right-5 z-30">
        <Button
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          variant="teal"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-30 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-brand-deep-teal/30 flex flex-col h-[500px] max-h-[70vh]">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200 bg-brand-deep-teal text-white rounded-t-xl flex justify-between items-center">
            <h3 className="font-medium">DNA Wellness Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-brand-deep-teal/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-brand-deep-teal text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" variant="teal" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAgent;
