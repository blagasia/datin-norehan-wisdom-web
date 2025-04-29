
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Award, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">About Datin Norehan</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Discover the story, passion, and vision behind Datin Norehan's natural wellness journey.
            </p>
          </div>
        </div>

        {/* Founder Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-natural-green/30 shadow-lg">
                    <div className="w-full h-full bg-natural-purple/20 flex items-center justify-center">
                      <h3 className="font-playfair text-2xl text-natural-dark">Datin Norehan</h3>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 bg-natural-peach/80 rounded-lg p-6 shadow-md">
                    <p className="font-playfair text-lg italic">
                      "True wellness starts with nature."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
                  The Vision and Passion
                </h2>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  Datin Norehan is a name synonymous with purity, wellness, and natural healing. With a deep passion for holistic health, she has dedicated herself to formulating 100% natural and organic wellness products, ensuring that every ingredient used is of the highest quality.
                </p>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  Each product under the Datin Norehan brand is a testament to her commitment to authenticity, sustainability, and well-being. She carefully selects and sources only the best natural ingredients, ensuring that they are free from harmful chemicals, additives, and preservatives.
                </p>
                <p className="text-natural-gray mb-8 leading-relaxed">
                  From detox drinks and collagen supplements to herbal tonics and natural beauty solutions, Datin Norehan's creations are designed to enhance overall well-being, proving that true wellness starts with nature.
                </p>
                <Button className="btn-outline">Learn More About Our Journey</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 md:py-24 bg-natural-peach/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Our Mission & Values</h2>
              <p className="text-natural-gray max-w-3xl mx-auto">
                Guided by a commitment to nature and wellness, our principles shape everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-peach/30">
                <div className="flex items-center mb-4">
                  <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-natural-dark" />
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold">Our Mission</h3>
                </div>
                <p className="text-natural-gray mb-6">
                  To empower individuals in their wellness journey by providing 100% natural, organic products that heal, nourish, and restore balance—creating a world where wellness is accessible, sustainable, and rooted in the power of nature.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-natural-green mr-2 mt-1" />
                    <span className="text-natural-gray">Promote holistic healing through natural ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-natural-green mr-2 mt-1" />
                    <span className="text-natural-gray">Educate on the benefits of chemical-free living</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-natural-green mr-2 mt-1" />
                    <span className="text-natural-gray">Make premium wellness accessible to everyone</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-peach/30">
                <div className="flex items-center mb-4">
                  <div className="bg-natural-green/30 p-3 rounded-full mr-4">
                    <Star className="h-6 w-6 text-natural-dark" />
                  </div>
                  <h3 className="text-2xl font-playfair font-semibold">Our Values</h3>
                </div>
                <ul className="space-y-5">
                  <li>
                    <h4 className="font-semibold text-lg mb-1 flex items-center">
                      <Check className="h-5 w-5 text-natural-green mr-2" />
                      Authenticity
                    </h4>
                    <p className="text-natural-gray pl-7">We never compromise on the purity and authenticity of our ingredients and processes.</p>
                  </li>
                  <li>
                    <h4 className="font-semibold text-lg mb-1 flex items-center">
                      <Check className="h-5 w-5 text-natural-green mr-2" />
                      Sustainability
                    </h4>
                    <p className="text-natural-gray pl-7">Our commitment to the planet is reflected in our eco-friendly practices and ethical sourcing.</p>
                  </li>
                  <li>
                    <h4 className="font-semibold text-lg mb-1 flex items-center">
                      <Check className="h-5 w-5 text-natural-green mr-2" />
                      Empowerment
                    </h4>
                    <p className="text-natural-gray pl-7">We believe in empowering individuals with knowledge and tools for their wellness journey.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">What Our Community Says</h2>
              <p className="text-natural-gray max-w-3xl mx-auto">
                Discover how Datin Norehan's wellness products have transformed lives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-natural-purple/10 p-8 rounded-lg">
                <div className="flex items-center space-x-1 mb-4 text-natural-purple">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
                <p className="italic text-natural-gray mb-6">
                  "I've tried countless wellness products, but Datin Norehan's formulations are truly exceptional. The Organic Detox Tea has become a daily ritual that has completely transformed my energy levels and overall well-being."
                </p>
                <div>
                  <p className="font-semibold">Sarah Tan</p>
                  <p className="text-sm text-natural-gray">Wellness Enthusiast</p>
                </div>
              </div>
              
              <div className="bg-natural-green/10 p-8 rounded-lg">
                <div className="flex items-center space-x-1 mb-4 text-natural-purple">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
                <p className="italic text-natural-gray mb-6">
                  "The Natural Collagen Boost has made a visible difference in my skin's elasticity and overall appearance. What I appreciate most is knowing that I'm using something completely natural and free from harmful chemicals."
                </p>
                <div>
                  <p className="font-semibold">Michael Lee</p>
                  <p className="text-sm text-natural-gray">Skincare Advocate</p>
                </div>
              </div>
              
              <div className="bg-natural-peach/10 p-8 rounded-lg">
                <div className="flex items-center space-x-1 mb-4 text-natural-purple">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
                <p className="italic text-natural-gray mb-6">
                  "Datin Norehan's commitment to quality and authenticity shows in every product. The Herbal Wellness Tonic has become an essential part of my health regimen, helping me maintain balance in my busy life."
                </p>
                <div>
                  <p className="font-semibold">Anita Rahman</p>
                  <p className="text-sm text-natural-gray">Holistic Health Coach</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-4">Join Our Wellness Journey</h2>
            <p className="text-natural-gray max-w-2xl mx-auto mb-8">
              Experience the transformative power of Datin Norehan's 100% natural and organic wellness products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">Explore Products</Button>
              <Button className="btn-outline">Contact Us</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
