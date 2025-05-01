
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
      // Wait a moment before showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    
    // Here you would typically disable non-essential cookies/tracking
    // This is just a placeholder for the actual implementation
    console.log('Non-essential cookies disabled');
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-fade-in-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-grow pr-0 md:pr-8">
            <h3 className="font-karla text-lg font-medium mb-2">Cookie Consent</h3>
            <p className="text-natural-gray text-sm">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              By clicking "Accept", you consent to our use of cookies. Learn more in our{' '}
              <Link to="/privacy" className="text-brand-deep-teal underline hover:text-brand-blush-rose">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal/10"
              onClick={declineCookies}
            >
              Decline
            </Button>
            <Button 
              className="bg-brand-deep-teal hover:bg-opacity-90"
              onClick={acceptCookies}
            >
              Accept
            </Button>
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-2 right-2 text-natural-gray hover:text-black md:hidden"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
