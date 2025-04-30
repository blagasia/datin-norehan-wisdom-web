
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AskDatin from '@/components/AskDatin';
import BlogArticles from '@/components/BlogArticles';
import { Badge } from '@/components/ui/badge';

const Ask = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-creamy-ivory/50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-gradient-blush">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="teal" className="mb-4">DNA Wisdom</Badge>
            <h1 className="font-cormorant text-4xl md:text-5xl font-bold mb-6">Ask Datin Norehan</h1>
            <div className="w-20 h-1 bg-brand-deep-teal mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-brand-soft-gray max-w-3xl mx-auto font-montserrat">
              Join our thriving community of wellness enthusiasts. Get personalized advice from Datin Norehan,
              who brings over 30 years of expertise in natural remedies and traditional Malaysian wellness practices.
            </p>
          </div>
        </div>
        
        {/* Form and Conversations Section */}
        <AskDatin />
        
        {/* Blog Articles Section with diverse content types */}
        <BlogArticles />
        
        {/* FAQ Section */}
        <div className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge variant="default" className="mx-auto mb-4 flex justify-center w-fit">Community</Badge>
              <h2 className="font-cormorant text-3xl font-bold text-center mb-6">Community Guidelines & FAQs</h2>
              <div className="w-16 h-1 bg-brand-blush-rose mx-auto mb-12 rounded-full"></div>
              
              <div className="space-y-8">
                <div className="border-b border-brand-blush-rose/20 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-brand-dark">What types of questions can I ask?</h3>
                  <p className="text-brand-soft-gray font-montserrat">
                    You can ask about natural remedies, traditional wellness practices, our products, 
                    ingredients, or specific health concerns. Datin Norehan specializes in holistic approaches 
                    to wellness and traditional Malaysian remedies. Our community particularly values questions about
                    traditional herbs, natural skincare, and holistic health practices.
                  </p>
                </div>
                
                <div className="border-b border-brand-blush-rose/20 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-brand-dark">How soon will I receive a response?</h3>
                  <p className="text-brand-soft-gray font-montserrat">
                    Datin Norehan personally reviews each question. Typically, you'll receive a response 
                    within 3-5 business days, depending on the volume of inquiries. Popular or urgent questions may
                    be prioritized. Once answered, your question and Datin's response will be visible to the community
                    unless you opt to keep it private during submission.
                  </p>
                </div>
                
                <div className="border-b border-brand-blush-rose/20 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-brand-dark">Is my information kept private?</h3>
                  <p className="text-brand-soft-gray font-montserrat">
                    Absolutely. Your personal information is kept strictly confidential. We only use your 
                    email to send you a direct response to your question. Your name will appear with your question
                    when posted in the community section, but your email and other contact details remain private.
                    If you prefer to ask privately, you can indicate this in your submission.
                  </p>
                </div>
                
                <div className="border-b border-brand-blush-rose/20 pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-brand-dark">How do I engage with the community?</h3>
                  <p className="text-brand-soft-gray font-montserrat">
                    After your question is answered, you can continue the conversation by responding to comments
                    from Datin or other community members. You can also like helpful responses, share valuable insights,
                    and follow topics that interest you. Our community thrives on respectful exchanges and shared wisdom
                    around natural wellness practices.
                  </p>
                </div>
                
                <div className="pb-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-brand-dark">What happens after I submit my question?</h3>
                  <p className="text-brand-soft-gray font-montserrat">
                    After submission, your question enters our queue for Datin's review. You'll receive an email confirmation
                    immediately. Once Datin answers your question, you'll be notified by email, and your conversation will
                    be published in the community section (unless requested private). You can then track any additional
                    comments or likes from the community.
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
