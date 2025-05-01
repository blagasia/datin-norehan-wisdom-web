
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Shield, Clock, AlertCircle } from 'lucide-react';

const ReturnPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Return Policy | Datin Norehan's Apothecary";
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
            
            <h1 className="font-italiana text-4xl md:text-5xl mb-6">Return Policy</h1>
            <p className="text-natural-gray mb-8">Last Updated: May 1, 2025</p>
            
            <Separator className="mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <RotateCcw className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">14-Day Returns</h3>
                <p className="text-natural-gray">Return or exchange items within 14 days of delivery</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Quality Guarantee</h3>
                <p className="text-natural-gray">Full refunds for damaged or defective products</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Fast Processing</h3>
                <p className="text-natural-gray">Refunds are processed within 5-7 business days</p>
              </div>
              
              <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg flex flex-col items-center text-center">
                <AlertCircle className="h-8 w-8 text-brand-deep-teal mb-4" />
                <h3 className="font-italiana text-xl mb-2">Eligibility</h3>
                <p className="text-natural-gray">Products must be unused and in original packaging</p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="mb-6 text-natural-gray">
                We want you to be completely satisfied with your purchase from Datin Norehan's Apothecary. 
                If for any reason you are not entirely happy with your order, we're here to help.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Return Eligibility</h2>
              <p className="mb-4 text-natural-gray">
                To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Returned within 14 days of delivery</li>
                <li className="mb-2">Unused and in the same condition that you received it</li>
                <li className="mb-2">In the original packaging</li>
                <li>Accompanied by the receipt or proof of purchase</li>
              </ul>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Non-Returnable Items</h2>
              <p className="mb-4 text-natural-gray">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Products that have been opened, used, or tampered with</li>
                <li className="mb-2">Products that are marked as final sale</li>
                <li className="mb-2">Gift cards</li>
                <li>Downloadable digital products</li>
              </ul>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Return Process</h2>
              <p className="mb-4 text-natural-gray">
                To initiate a return, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Contact our customer service team at blagasia@gmail.com or +60 12 345 6789 to receive a Return Authorization Number (RAN).</li>
                <li className="mb-2">Include your RAN, order number, and reason for return in the package.</li>
                <li className="mb-2">Send your item to: Datin Norehan's Apothecary Returns Department, [Address], Kuala Lumpur, Malaysia.</li>
                <li>We recommend using a trackable shipping service and purchasing shipping insurance for valuable items.</li>
              </ol>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Refunds</h2>
              <p className="mb-4 text-natural-gray">
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. 
                We will also notify you of the approval or rejection of your refund.
              </p>
              <p className="mb-6 text-natural-gray">
                If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days. 
                Please note that it may take an additional 2-5 business days for the refund to appear in your account, depending on your financial institution.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Exchanges</h2>
              <p className="mb-6 text-natural-gray">
                If you need to exchange an item for the same product, send us an email at blagasia@gmail.com and send your item to: 
                Datin Norehan's Apothecary Returns Department, [Address], Kuala Lumpur, Malaysia.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Damaged or Defective Products</h2>
              <p className="mb-6 text-natural-gray">
                If you receive a damaged or defective product, please contact us immediately at blagasia@gmail.com with photos of the damaged item. 
                We will provide instructions for return or replacement. We cover return shipping costs for damaged or defective products.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Return Shipping Costs</h2>
              <p className="mb-6 text-natural-gray">
                The customer is responsible for return shipping costs unless the item is defective or damaged. 
                If you receive a refund, the cost of return shipping will be deducted from your refund.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">Contact Us</h2>
              <p className="mb-6 text-natural-gray">
                If you have any questions about our return policy, please contact us at:
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

export default ReturnPolicy;
