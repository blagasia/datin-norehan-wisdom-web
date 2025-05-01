
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WELCOME_MESSAGE = "Welcome to Datin Norehan Apothecary! How may I assist you today?";

const AUTO_RESPONSES: Record<string, string[]> = {
  "product": [
    "Our DNA Elixirs are formulated with the finest natural ingredients. Would you like to learn more about a specific product?",
    "We have a range of wellness products designed for holistic health. You can browse our complete collection at /products.",
    "Each of our products is carefully crafted by Datin Norehan herself, combining traditional wisdom with modern science."
  ],
  "delivery": [
    "We offer free shipping on orders over RM250 within Malaysia.",
    "International shipping is available to selected countries. Delivery times vary between 5-14 business days.",
    "Our express delivery option ensures your products arrive within 2-3 business days."
  ],
  "return": [
    "We have a 30-day return policy for unopened products.",
    "If you're not satisfied with your purchase, please contact our customer service team at support@datinnorehan.com."
  ],
  "help": [
    "I'd be happy to help! What would you like to know about our products or services?",
    "You can find answers to frequently asked questions on our FAQ page, or I can assist you right here."
  ],
  "price": [
    "Our products range from RM89 to RM350, reflecting their premium quality and effectiveness.",
    "We occasionally offer special promotions and discounts for our Devotee members."
  ],
  "ingredient": [
    "All our products use natural, sustainably-sourced ingredients without harmful chemicals.",
    "We prioritize organic ingredients whenever possible and never test on animals.",
    "Is there a specific ingredient you'd like to know more about?"
  ],
  "hello": [
    "Hello! How can I assist you today?",
    "Hi there! Welcome to Datin Norehan Apothecary. What can I help you with?",
    "Greetings! I'm here to help with any questions about our products and services."
  ],
  "thanks": [
    "You're welcome! Is there anything else I can help you with?",
    "My pleasure! Don't hesitate to reach out if you have more questions.",
    "Happy to help! I'm here anytime you need assistance."
  ],
  "bye": [
    "Thank you for chatting with us! Have a wonderful day.",
    "Goodbye! We hope to see you again soon.",
    "Take care! Feel free to return if you have more questions."
  ]
};

const DEFAULT_RESPONSE = "Thank you for your message. For more specific information, please email us at info@datinnorehan.com or call us at +60 3 1234 5678.";

const findResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check if any keywords match
  for (const [keyword, responses] of Object.entries(AUTO_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      // Return a random response from the matched keyword's array
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return DEFAULT_RESPONSE;
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '0',
          text: WELCOME_MESSAGE,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-brand-deep-teal text-white shadow-lg hover:bg-brand-deep-teal/90 z-50"
        >
          <MessageCircle size={24} />
        </Button>
      )}
      
      {isOpen && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-xl w-80 sm:w-96 z-50 overflow-hidden border border-brand-blush-rose/20">
          <div className="bg-gradient-to-r from-brand-deep-teal to-brand-deep-teal/80 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Datin Norehan Support</h3>
              <p className="text-xs opacity-80">We typically reply within minutes</p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-brand-creamy-ivory/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-3 max-w-[80%] rounded-2xl p-3",
                  message.sender === 'user'
                    ? "ml-auto bg-brand-deep-teal text-white rounded-br-none"
                    : "bg-white border border-brand-blush-rose/10 rounded-bl-none shadow-sm"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-white border border-brand-blush-rose/10 p-3 rounded-2xl rounded-bl-none mb-3 max-w-[80%] shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-brand-deep-teal/70 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-deep-teal/70 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-deep-teal/70 animate-pulse delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-blush-rose/10 bg-white flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-brand-blush-rose/20 focus-visible:ring-brand-deep-teal"
            />
            <Button 
              type="submit"
              size="icon"
              className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white h-10 w-10 rounded-full"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAgent;
