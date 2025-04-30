
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogArticle from './BlogArticle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogArticles } from '@/data/blogArticles';

const BlogArticles = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter articles based on the selected category
  const filteredArticles = activeTab === "all" 
    ? blogArticles 
    : blogArticles.filter(article => article.type === activeTab);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="font-playfair text-3xl font-bold text-center mb-4">Community Knowledge Hub</h2>
          <p className="text-center text-natural-gray max-w-2xl mx-auto">
            Explore articles, videos, podcasts, and resources from Datin Norehan and our community on natural wellness, 
            herbal remedies, and holistic living.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-soft-purple/20">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="audio">Podcasts</TabsTrigger>
              <TabsTrigger value="infographic">Infographics</TabsTrigger>
              <TabsTrigger value="pdf">Guides</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="reflection">Reflections</TabsTrigger>
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
                <p className="text-natural-gray">No content found in this category.</p>
              </div>
            )}
            
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <Link to="/articles">
                  <Button variant="outline" className="hover:bg-natural-green/30 hover:text-natural-dark">
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
