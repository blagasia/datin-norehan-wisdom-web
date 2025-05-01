
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-brand-creamy-ivory/30 py-16">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="font-italiana text-5xl md:text-6xl mb-4">404</h1>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-xl text-natural-gray mb-8">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          <Link to="/">
            <Button className="bg-brand-deep-teal hover:bg-opacity-90">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
