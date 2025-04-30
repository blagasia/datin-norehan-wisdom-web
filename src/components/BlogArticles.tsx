
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogArticle from './BlogArticle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogArticles } from '@/data/blogArticles';
import { Badge } from '@/components/ui/badge';
import { Book } from 'lucide-react';

const BlogArticles = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter articles based on the selected category
  const filteredArticles = activeTab === "all" 
    ? blogArticles 
    : blogArticles.filter(article => article.type === activeTab);

  return (
    <section className="py-16 md:py-20 bg-gradient-sage/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <Badge variant="default" className="mb-3">Knowledge Hub</Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Book className="h-6 w-6 text-brand-deep-teal" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">DNA Wisdom</h2>
          </div>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-center text-brand-soft-gray max-w-2xl mx-auto font-montserrat">
            Explore educational content sharing Datin Norehan's extensive knowledge, from 
            free articles to premium courses on natural healing practices.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-white border border-brand-blush-rose/20 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-brand-blush-rose/20">All Content</TabsTrigger>
              <TabsTrigger value="article" className="data-[state=active]:bg-brand-blush-rose/20">Articles</TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-brand-blush-rose/20">Videos</TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-brand-blush-rose/20">Podcasts</TabsTrigger>
              <TabsTrigger value="infographic" className="data-[state=active]:bg-brand-blush-rose/20">Infographics</TabsTrigger>
              <TabsTrigger value="pdf" className="data-[state=active]:bg-brand-blush-rose/20">E-Books</TabsTrigger>
              <TabsTrigger value="event" className="data-[state=active]:bg-brand-blush-rose/20">Events</TabsTrigger>
              <TabsTrigger value="reflection" className="data-[state=active]:bg-brand-blush-rose/20">Reflections</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <BlogArticle key={article.id} article={article} />
              ))}
            </div>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-brand-soft-gray">No content found in this category.</p>
              </div>
            )}
            
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <Link to="/articles">
                  <Button variant="outline" className="border-brand-deep-teal hover:bg-brand-deep-teal/10">
                    View All Content
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* DNA Wisdom Levels */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-blush-rose/20">
              <h3 className="font-playfair text-xl font-semibold mb-3">Free Content</h3>
              <p className="text-brand-soft-gray mb-4">
                Accessible articles, social media insights, and wellness tips that introduce Datin Norehan's philosophy and basic natural healing concepts.
              </p>
              <Link to="/articles">
                <Button variant="outline" className="w-full border-brand-deep-teal hover:bg-brand-deep-teal/10">
                  Explore Free Content
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-blush-rose/20">
              <h3 className="font-playfair text-xl font-semibold mb-3">Premium Guides</h3>
              <p className="text-brand-soft-gray mb-4">
                Beautifully designed digital publications like our "Collary Cocktails" recipe book, offering practical applications of our products.
              </p>
              <Link to="/articles?type=pdf">
                <Button variant="outline" className="w-full border-brand-deep-teal hover:bg-brand-deep-teal/10">
                  Browse Premium Guides
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-blush-rose/20">
              <h3 className="font-playfair text-xl font-semibold mb-3">Online Courses</h3>
              <p className="text-brand-soft-gray mb-4">
                Comprehensive educational programs such as "Natural Wellness Foundations" and "Apothecary Masterclass" for in-depth learning.
              </p>
              <Link to="/events?type=course">
                <Button variant="outline" className="w-full border-brand-deep-teal hover:bg-brand-deep-teal/10">
                  Discover Courses
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-blush-rose/20">
              <h3 className="font-playfair text-xl font-semibold mb-3">Live Workshops</h3>
              <p className="text-brand-soft-gray mb-4">
                Interactive virtual sessions with Datin Norehan, combining demonstration, instruction, and personalized guidance.
              </p>
              <Link to="/events?type=workshop">
                <Button variant="outline" className="w-full border-brand-deep-teal hover:bg-brand-deep-teal/10">
                  Join Workshops
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
