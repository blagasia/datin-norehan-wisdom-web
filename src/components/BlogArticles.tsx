
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogArticle from './BlogArticle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogArticles } from '@/data/blogArticles';
import { Badge } from '@/components/ui/badge';

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
          <Badge variant="default" className="mb-3">DNA Wisdom</Badge>
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4 leading-tight">Knowledge Hub</h2>
          <div className="w-20 h-1 bg-brand-blush-rose mx-auto mb-6 rounded-full"></div>
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
              <TabsTrigger value="pdf" className="data-[state=active]:bg-brand-blush-rose/20">Guides</TabsTrigger>
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
                  <Button variant="outline" className="border-brand-blush-rose hover:bg-brand-blush-rose/10">
                    View All Content
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BlogArticles;
