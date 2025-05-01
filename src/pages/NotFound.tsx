
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Scroll to top for better user experience
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-sage py-20">
        <div className="text-center max-w-lg mx-auto px-4 animate-fade-in">
          <h1 className="font-italiana text-6xl md:text-7xl mb-4">404</h1>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-natural-gray mb-8">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-brand-deep-teal hover:bg-opacity-90 w-full md:w-auto">
                <Home className="mr-2 h-4 w-4" /> Return to Home
              </Button>
            </Link>
            
            <Link to="/products">
              <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Browse Products
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 p-6 rounded-lg bg-white/80 backdrop-blur-sm max-w-sm mx-auto">
            <h2 className="font-italiana text-xl mb-4">Looking for something specific?</h2>
            <p className="text-natural-gray text-sm mb-4">Try exploring our curated collections or wellness rituals.</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/rituals" className="text-brand-deep-teal hover:underline">Rituals</Link>
              <Link to="/dna-brand" className="text-brand-deep-teal hover:underline">DNA Brand</Link>
              <Link to="/contact" className="text-brand-deep-teal hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
