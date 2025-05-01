
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Terms of Service | Datin Norehan's Apothecary";
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
            
            <h1 className="font-italiana text-4xl md:text-5xl mb-6">Terms of Service</h1>
            <p className="text-natural-gray mb-8">Last Updated: May 1, 2025</p>
            
            <Separator className="mb-8" />
            
            <div className="prose max-w-none">
              <p className="mb-6 text-natural-gray">
                Welcome to Datin Norehan's Apothecary. Please read these terms of service carefully before using our website or purchasing our products.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6 text-natural-gray">
                By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">2. Use of Website</h2>
              <p className="mb-4 text-natural-gray">
                The content of the pages of this website is for your general information and use only. It is subject to change without notice.
              </p>
              <p className="mb-6 text-natural-gray">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, 
                completeness or suitability of the information and materials found or offered on this website for any particular purpose. 
                You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability 
                for any such inaccuracies or errors to the fullest extent permitted by law.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">3. Product Information</h2>
              <p className="mb-6 text-natural-gray">
                While we strive to provide accurate product information, including ingredients, descriptions, and images, we do not 
                warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. 
                If a product offered by Datin Norehan's Apothecary is not as described, your sole remedy is to return it in unused condition.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">4. Ordering & Payment</h2>
              <p className="mb-4 text-natural-gray">
                When you place an order on our website, you are making an offer to purchase the product(s). We reserve the right to 
                refuse or cancel any orders placed for products at incorrect prices or containing any other pricing errors, whether 
                or not the order has been confirmed and your payment method charged.
              </p>
              <p className="mb-6 text-natural-gray">
                All prices are shown in Malaysian Ringgit (RM) and are inclusive of taxes where applicable. Shipping costs are additional 
                unless otherwise stated and will be displayed during checkout.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">5. Shipping & Delivery</h2>
              <p className="mb-6 text-natural-gray">
                We aim to process and ship all orders within 1-3 business days. Delivery times will vary depending on your location. 
                We are not responsible for delays in shipping or delivery that are outside of our control. 
                For more information, please refer to our Shipping Policy.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">6. Returns & Refunds</h2>
              <p className="mb-6 text-natural-gray">
                If you are not completely satisfied with your purchase, you may return it within 14 days of receipt for a full refund 
                of the purchase price (excluding shipping costs). Products must be returned in their original packaging and in unused condition. 
                For more information, please refer to our Returns Policy.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">7. Intellectual Property</h2>
              <p className="mb-6 text-natural-gray">
                All content on this website, including text, graphics, logos, images, and software, is the property of 
                Datin Norehan's Apothecary or its content suppliers and is protected by Malaysian and international copyright laws. 
                The compilation of all content on this site is the exclusive property of Datin Norehan's Apothecary.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="mb-6 text-natural-gray">
                Datin Norehan's Apothecary will not be liable for any damages of any kind arising from the use of this site, 
                including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">9. Governing Law</h2>
              <p className="mb-6 text-natural-gray">
                These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">10. Changes to Terms</h2>
              <p className="mb-6 text-natural-gray">
                We reserve the right to modify these terms at any time. Your continued use of the website following the posting 
                of changes will mean that you accept and agree to the changes.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">11. Contact Us</h2>
              <p className="mb-6 text-natural-gray">
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
