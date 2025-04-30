
import React, { useState } from 'react';
import BlogArticle, { BlogArticleProps } from './BlogArticle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog articles with diverse content types
const blogArticles: BlogArticleProps[] = [
  {
    id: 1,
    title: "Traditional Malaysian Herbs for Common Ailments",
    excerpt: "Discover how native herbs like 'ulam raja' and 'pegaga' have been used for centuries to treat everyday health concerns.",
    date: "April 18, 2025",
    author: "Datin Norehan",
    category: "Herbal Wisdom",
    type: "article",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    readTime: "5 min",
    likes: 42,
    comments: 8,
    featured: true
  },
  {
    id: 2,
    title: "VIDEO: Preparing Natural Remedies at Home",
    excerpt: "Watch Datin Norehan demonstrate step-by-step techniques for creating effective natural remedies using ingredients from your kitchen.",
    date: "April 12, 2025",
    author: "Datin Norehan",
    category: "Tutorials",
    type: "video",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    readTime: "8 min",
    likes: 31,
    comments: 5
  },
  {
    id: 3,
    title: "AUDIO: The Ancient Wisdom Podcast - Episode 4",
    excerpt: "Listen to Datin Norehan discuss the philosophy behind holistic healing and how modern science confirms traditional practices.",
    date: "April 5, 2025",
    author: "Datin Norehan",
    category: "Podcast",
    type: "audio",
    readTime: "22 min",
    likes: 27,
    comments: 6
  },
  {
    id: 4,
    title: "Natural Approaches to Boost Your Immunity",
    excerpt: "Simple, natural approaches to strengthen your body's defense systems and maintain optimal health throughout changing seasons.",
    date: "March 28, 2025",
    author: "Datin Norehan",
    category: "Health Tips",
    type: "article",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    readTime: "6 min",
    likes: 38,
    comments: 12
  },
  {
    id: 5,
    title: "INFOGRAPHIC: Malaysian Herbs and Their Benefits",
    excerpt: "A visual guide to Malaysian herbs and their specific benefits for various health concerns and wellness goals.",
    date: "March 20, 2025",
    author: "Datin Norehan",
    category: "Visual Guides",
    type: "infographic",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    readTime: "3 min",
    likes: 54,
    comments: 7
  },
  {
    id: 6,
    title: "PDF GUIDE: Essential Oils for Everyday Use",
    excerpt: "Download our comprehensive guide to using essential oils safely and effectively for common concerns.",
    date: "March 14, 2025",
    author: "Datin Norehan",
    category: "Resources",
    type: "pdf",
    readTime: "12 min",
    likes: 46,
    comments: 9
  }
];

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
          <div className="flex justify-center mb-8">
            <TabsList className="bg-soft-purple/20">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="audio">Podcasts</TabsTrigger>
              <TabsTrigger value="infographic">Infographics</TabsTrigger>
              <TabsTrigger value="pdf">Guides</TabsTrigger>
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
                <Button variant="outline" className="hover:bg-natural-green/30 hover:text-natural-dark">
                  View More Content
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BlogArticles;
