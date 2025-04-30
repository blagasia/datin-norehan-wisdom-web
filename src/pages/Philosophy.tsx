
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote, Heart, Star } from 'lucide-react';

const Philosophy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="py-16 md:py-24 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Philosophy</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto">
              Discover the core principles and wisdom that guide Datin Norehan's approach to wellness and natural living.
            </p>
          </div>
        </div>

        {/* Core Philosophy */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">The Essence of Our Philosophy</h2>
                <p className="text-natural-gray text-lg">
                  Datin Norehan's approach to wellness is built on timeless principles that honor both tradition and innovation.
                </p>
              </div>
              
              <div className="bg-natural-peach/10 p-10 rounded-xl mb-16 shadow-sm border border-natural-peach/30">
                <div className="flex items-start">
                  <Quote className="h-10 w-10 text-natural-dark/60 mr-6 flex-shrink-0 mt-2" />
                  <p className="italic text-natural-dark/80 font-playfair text-2xl leading-relaxed">
                    "True wellness is not merely the absence of illness, but the harmonious balance of body, mind, and spirit. Nature provides everything we need to achieve this balance; our role is simply to listen and learn."
                  </p>
                </div>
                <p className="text-right mt-4 font-medium text-natural-dark/70">— Datin Norehan</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <div className="bg-natural-purple/10 p-8 rounded-lg mb-6">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Heart className="mr-3 h-6 w-6 text-natural-purple/80" />
                      Harmony with Nature
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      At the core of Datin Norehan's philosophy lies a deep respect for the natural world. She believes that nature provides everything we need for wellness if we approach it with reverence and understanding. Each ingredient is selected not merely for its individual properties but for how it harmonizes with others and with the human body.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-purple/50">
                      "Nature speaks in whispers. Those who listen carefully will discover its most profound healing secrets."
                    </div>
                  </div>
                  
                  <div className="bg-natural-green/10 p-8 rounded-lg">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Star className="mr-3 h-6 w-6 text-natural-green/80" />
                      The Wisdom of Tradition
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      Datin Norehan draws deeply from traditional knowledge passed through generations. These time-tested approaches to wellness form the foundation of her formulations, honoring ancestral wisdom while incorporating modern understanding.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-green/50">
                      "Our ancestors understood the language of plants and minerals. Their wisdom, refined over centuries, remains our most valuable inheritance."
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-natural-peach/10 p-8 rounded-lg mb-6">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Heart className="mr-3 h-6 w-6 text-natural-peach/80" />
                      Balance and Wholeness
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      True wellness, in Datin Norehan's philosophy, emerges from balance—not from treating symptoms but from addressing the whole person. Her approach considers physical health inseparable from mental clarity and spiritual well-being.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-peach/50">
                      "Healing is not about combating illness but about restoring harmony. When we return to balance, wellness follows naturally."
                    </div>
                  </div>
                  
                  <div className="bg-natural-purple/10 p-8 rounded-lg">
                    <h3 className="font-playfair text-2xl flex items-center font-semibold mb-4">
                      <Star className="mr-3 h-6 w-6 text-natural-purple/80" />
                      Purity of Intent
                    </h3>
                    <p className="text-natural-gray leading-relaxed">
                      Perhaps most fundamental to Datin Norehan's approach is the belief that intention matters. The energy and care with which each product is formulated becomes part of its healing essence. This is why she oversees every aspect of creation, ensuring that each product carries not just ingredients but purpose.
                    </p>
                    <div className="mt-4 italic text-natural-dark/70 pl-4 border-l-2 border-natural-purple/50">
                      "The hands that prepare a remedy infuse it with energy. This is why I approach each formulation as a sacred act—with clear intention and an open heart."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16 md:py-24 bg-natural-green/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-8 text-center">A Lifelong Journey</h2>
              
              <div className="prose prose-lg max-w-none text-natural-gray">
                <p>
                  Datin Norehan's path to natural wellness began in her childhood, surrounded by the lush landscapes of Malaysia. Under the guidance of her grandmother, a respected traditional healer, she learned to identify healing plants and understand their properties.
                </p>
                
                <p className="my-6">
                  "My grandmother would take me into the garden at dawn," she recalls. "She taught me that the most potent time to harvest leaves and flowers is when they're still kissed with morning dew. But more importantly, she taught me to ask permission from the plants—to approach them with gratitude and respect."
                </p>
                
                <p>
                  This early education formed the seedbed for what would later become her life's work. After formal education in botany and traditional medicine, Datin Norehan began experimenting with her own formulations, guided by both scientific understanding and intuitive wisdom.
                </p>
                
                <div className="bg-white p-8 rounded-lg shadow-sm my-8 border border-natural-green/30">
                  <div className="flex items-start">
                    <Quote className="h-8 w-8 text-natural-dark/60 mr-4 flex-shrink-0 mt-1" />
                    <p className="italic text-natural-dark/80 font-playfair text-lg">
                      "Each plant has its own intelligence and purpose. My work is not to impose my will upon these natural elements but to understand how they wish to serve, and then to become a bridge between nature's wisdom and human need."
                    </p>
                  </div>
                  <p className="text-right mt-3 font-medium text-natural-dark/70">— Datin Norehan</p>
                </div>
                
                <p>
                  Today, Datin Norehan's philosophy has evolved into a holistic approach that respects both ancient traditions and modern understanding. She insists that true luxury in wellness products comes not from expensive packaging or marketing but from the integrity of ingredients and the knowledge with which they are combined.
                </p>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/products">
                  <Button className="btn-primary">Experience Our Products</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Philosophy;
