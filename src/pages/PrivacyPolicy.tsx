
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Update document title
    document.title = "Privacy Policy | Datin Norehan's Apothecary";
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
            
            <h1 className="font-italiana text-4xl md:text-5xl mb-6">Privacy Policy</h1>
            <p className="text-natural-gray mb-8">Last Updated: May 1, 2025</p>
            
            <Separator className="mb-8" />
            
            <div className="prose max-w-none">
              <p className="mb-6 text-natural-gray">
                At Datin Norehan's Apothecary, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our website and 
                tell you about your privacy rights and how the law protects you.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">1. Important Information</h2>
              <p className="mb-4 text-natural-gray">
                This privacy policy aims to give you information on how Datin Norehan's Apothecary collects and processes your personal data 
                through your use of this website, including any data you may provide through this website when you sign up for our newsletter, 
                purchase a product, or participate in our loyalty program.
              </p>
              <p className="mb-6 text-natural-gray">
                It is important that you read this privacy policy together with any other privacy notice we may provide on specific 
                occasions when we are collecting or processing personal data about you so that you are fully aware of how and why 
                we are using your data.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">2. The Data We Collect About You</h2>
              <p className="mb-4 text-natural-gray">
                Personal data, or personal information, means any information about an individual from which that person can be identified. 
                It does not include data where the identity has been removed (anonymous data).
              </p>
              <p className="mb-4 text-natural-gray">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Identity Data includes first name, last name, username or similar identifier.</li>
                <li className="mb-2">Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                <li className="mb-2">Transaction Data includes details about payments to and from you and other details of products you have purchased from us.</li>
                <li className="mb-2">Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li>Usage Data includes information about how you use our website and products.</li>
              </ul>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">3. How We Use Your Personal Data</h2>
              <p className="mb-4 text-natural-gray">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li className="mb-2">Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">4. Data Security</h2>
              <p className="mb-6 text-natural-gray">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or 
                accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those 
                employees, agents, contractors and other third parties who have a business need to know.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">5. Your Legal Rights</h2>
              <p className="mb-4 text-natural-gray">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-natural-gray">
                <li className="mb-2">Request access to your personal data.</li>
                <li className="mb-2">Request correction of your personal data.</li>
                <li className="mb-2">Request erasure of your personal data.</li>
                <li className="mb-2">Object to processing of your personal data.</li>
                <li className="mb-2">Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
              </ul>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">6. Cookies</h2>
              <p className="mb-6 text-natural-gray">
                Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good 
                experience when you browse our website and also allows us to improve our site. For detailed information on the 
                cookies we use and the purposes for which we use them, please see our cookie policy.
              </p>
              
              <h2 className="font-italiana text-2xl mt-8 mb-4">7. Contact Us</h2>
              <p className="mb-6 text-natural-gray">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
