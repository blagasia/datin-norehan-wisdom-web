
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AskDatin from '@/components/AskDatin';

const Ask = () => {
  return (
    <div className="min-h-screen flex flex-col bg-natural-peach/10">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-natural-peach/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ask Datin Norehan</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              With over 30 years of experience in natural wellness and traditional remedies, 
              Datin Norehan is here to answer your questions and guide you on your wellness journey.
            </p>
          </div>
        </div>
        
        {/* Form and Conversations Section */}
        <AskDatin />
        
        {/* FAQ Section */}
        <div className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="space-y-8">
                <div className="border-b border-natural-peach/30 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3">What types of questions can I ask?</h3>
                  <p className="text-natural-gray">
                    You can ask about natural remedies, traditional wellness practices, our products, 
                    ingredients, or specific health concerns. Datin Norehan specializes in holistic approaches 
                    to wellness and traditional Malaysian remedies.
                  </p>
                </div>
                
                <div className="border-b border-natural-peach/30 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3">How soon will I receive a response?</h3>
                  <p className="text-natural-gray">
                    Datin Norehan personally reviews each question. Typically, you'll receive a response 
                    within 3-5 business days, depending on the volume of inquiries.
                  </p>
                </div>
                
                <div className="border-b border-natural-peach/30 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3">Is my information kept private?</h3>
                  <p className="text-natural-gray">
                    Absolutely. Your personal information is kept strictly confidential. We only use your 
                    email to send you a direct response to your question.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ask;
