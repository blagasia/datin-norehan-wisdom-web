
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, Package, Globe } from 'lucide-react';

const ShippingPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Shipping Policy | Datin Norehan's Apothecary";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 lg:pt-28 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-brand-deep-teal hover:text-brand-blush-rose mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="font-italiana text-4xl md:text-5xl mb-6">Shipping Policy</h1>
            <p className="text-natural-gray mb-8">Last Updated: May 1, 2025</p>
            
            <Separator className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Truck className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Fast Processing</h3>
                <p className="text-natural-gray">All orders are processed within 24-48 hours of being placed</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Delivery Times</h3>
                <p className="text-natural-gray">2-5 business days for domestic shipments, 7-14 days for international</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Package className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Careful Packaging</h3>
                <p className="text-natural-gray">Products are carefully packaged to ensure they arrive in perfect condition</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Globe className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Worldwide Shipping</h3>
                <p className="text-natural-gray">We ship to over 50 countries worldwide with tracked delivery</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2 className="font-italiana text-2xl mt-8 mb-4">Processing Time</h2>
              <p className="mb-6 text-natural-gray">
                All orders are processed within 1-3 business days (excluding weekends and holidays) after receiving your order confirmation email. 
                You will receive another notification when your order has shipped.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Shipping Options & Costs</h2>
              <p className="mb-4 text-natural-gray">
                We offer the following shipping options for our customers:
              </p>
              
              <h3 className="font-karla text-xl mt-6 mb-3">Domestic Shipping (within Malaysia):</h3>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Standard Shipping (2-5 business days): RM 10</li>
                <li className="mb-2">Express Shipping (1-2 business days): RM 25</li>
                <li>Free Standard Shipping on orders over RM 200</li>
              </ul>
              
              <h3 className="font-karla text-xl mt-6 mb-3">International Shipping:</h3>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Southeast Asia (7-10 business days): RM 30-45</li>
                <li className="mb-2">Asia Pacific (10-14 business days): RM 50-70</li>
                <li className="mb-2">Rest of World (14-21 business days): RM 80-120</li>
                <li>Free International Shipping on orders over RM 500</li>
              </ul>
              
              <p className="mb-6 text-natural-gray">
                Shipping costs are calculated based on the weight of your order and your delivery location. 
                The exact cost will be calculated during checkout.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Tracking Information</h2>
              <p className="mb-6 text-natural-gray">
                You will receive a shipping confirmation email with your tracking number once your order has shipped. 
                You can use this tracking number to follow your package's journey on our website or directly on the 
                courier's website.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Customs & Import Taxes</h2>
              <p className="mb-6 text-natural-gray">
                For international orders, please note that you may be subject to import duties and taxes, which are levied 
                once the package reaches the destination country. These additional charges are the responsibility of the recipient. 
                Datin Norehan's Apothecary has no control over these charges and cannot predict what they may be.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Shipping Restrictions</h2>
              <p className="mb-6 text-natural-gray">
                Due to regulations regarding certain natural ingredients, we may be unable to ship some products to specific 
                countries or regions. If we cannot ship to your location, we will notify you as soon as possible and 
                offer alternatives or a full refund.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Contact Us</h2>
              <p className="mb-6 text-natural-gray">
                If you have any questions about our shipping policy, please contact us at:
                <br /><br />
                Email: blagasia@gmail.com<br />
                Phone: +60 12 345 6789<br />
                Address: Kuala Lumpur, Malaysia
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
