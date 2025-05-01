
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Using a regular anchor tag instead of React Router Link
// since CookieConsent might be rendered outside the Router context
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookie-consent');
    
    if (!hasAccepted) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-grow pr-4">
          <p className="text-sm text-gray-600">
            We use cookies to enhance your experience. By continuing to visit this site,
            you agree to our use of cookies. 
            <a 
              href="/privacy-policy" 
              className="text-brand-muted-rose hover:text-brand-orchid-pink underline ml-1"
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={declineCookies}
            className="text-xs"
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            onClick={acceptCookies}
            className="bg-brand-muted-rose hover:bg-brand-orchid-pink text-xs"
          >
            Accept All
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={declineCookies} 
            className="ml-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
