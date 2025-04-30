import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would connect to a backend service
      // For now, we'll simulate sending an email notification
      console.log('Sending message to blagasia@gmail.com:', {
        recipientEmail: 'blagasia@gmail.com',
        subject: `New Contact Form Submission: ${formData.subject}`,
        messageContent: `
          Name: ${formData.name}
          Email: ${formData.email}
          Subject: ${formData.subject}
          Message: ${formData.message}
        `
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond to your message soon.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-natural-peach/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Get in touch with Datin Norehan's team for inquiries, support, or collaborations.
            </p>
          </div>
        </div>

        {/* Contact Form and Info */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-playfair font-semibold mb-6">Send Us a Message</h2>
                <p className="text-natural-gray mb-8">
                  Have questions about our products or services? Fill out the form below, and our team will get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject" 
                      placeholder="What is your message about?" 
                      required 
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide details about your inquiry..." 
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Messages will be sent to our support team (blagasia@gmail.com)</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-playfair font-semibold mb-6">Contact Information</h2>
                <p className="text-natural-gray mb-8">
                  We're here to help and answer any questions you might have. Reach out to us through any of the channels below.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-natural-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-natural-gray mb-1">General Inquiries:</p>
                      <a href="mailto:blagasia@gmail.com" className="text-natural-purple hover:text-natural-dark">blagasia@gmail.com</a>
                      <p className="text-natural-gray mb-1 mt-3">Support:</p>
                      <a href="mailto:blagasia@gmail.com" className="text-natural-purple hover:text-natural-dark">blagasia@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-natural-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-natural-gray mb-1">Customer Service:</p>
                      <p className="text-natural-purple">+60 12 345 6789</p>
                      <p className="text-natural-gray mb-1 mt-3">Business Inquiries:</p>
                      <p className="text-natural-purple">+60 12 987 6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-natural-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-natural-gray">
                        Datin Norehan Wellness Center<br />
                        123 Jalan Wellness<br />
                        Taman Natural<br />
                        50000 Kuala Lumpur, Malaysia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-natural-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <p className="text-natural-gray mb-1">Monday - Friday:</p>
                      <p className="text-natural-purple">9:00 AM - 6:00 PM</p>
                      <p className="text-natural-gray mb-1 mt-3">Saturday:</p>
                      <p className="text-natural-purple">10:00 AM - 4:00 PM</p>
                      <p className="text-natural-gray mb-1 mt-3">Sunday:</p>
                      <p className="text-natural-purple">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-natural-purple/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-8">Find Us</h2>
            <div className="bg-gray-300 h-[400px] rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map placeholder - Google Maps would be integrated here</p>
            </div>
            <p className="text-natural-gray mt-6 max-w-2xl mx-auto">
              Visit our wellness center to experience our products firsthand and speak with our knowledgeable staff about your wellness journey.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
