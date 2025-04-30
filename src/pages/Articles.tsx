
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, AudioLines, Newspaper, Book } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { blogArticles } from '@/data/blogArticles';

const ArticleCard = ({ article }: { article: typeof blogArticles[0] }) => {
  // Function to render the appropriate icon based on content type
  const renderContentTypeIcon = () => {
    switch (article.type) {
      case 'video':
        return <Video size={48} className="text-natural-dark/50" />;
      case 'audio':
        return <AudioLines size={48} className="text-natural-dark/50" />;
      case 'infographic':
        return <Newspaper size={48} className="text-natural-dark/50" />;
      case 'event':
        return <Newspaper size={48} className="text-natural-dark/50" />;
      case 'reflection':
        return <Book size={48} className="text-natural-dark/50" />;
      default:
        return <FileText size={48} className="text-natural-dark/50" />;
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <Link to={`/articles/${article.id}`} className="h-48 overflow-hidden relative">
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-48 bg-natural-green/30 flex items-center justify-center">
            {renderContentTypeIcon()}
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {article.type !== 'article' && (
            <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm">
              {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
            </Badge>
          )}
          {article.featured && (
            <Badge className="text-xs bg-natural-peach/90 text-white">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="text-xs font-medium text-natural-gray mb-1">{article.category} • {article.date}</div>
          {article.readTime && <div className="text-xs text-natural-gray">{article.readTime} read</div>}
        </div>
        <Link to={`/articles/${article.id}`}>
          <CardTitle className="font-playfair hover:text-natural-peach transition-colors">{article.title}</CardTitle>
        </Link>
        <div className="text-xs text-natural-gray mt-1">By {article.author}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link to={`/articles/${article.id}`} className="w-full">
          <Button variant="outline" className="w-full hover:bg-natural-green/30 hover:text-natural-dark">Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Articles = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter articles based on the selected category
  const filteredArticles = activeTab === "all" 
    ? blogArticles 
    : blogArticles.filter(article => article.type === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 md:py-24 bg-natural-purple/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Wellness Wisdom</h1>
              <p className="text-xl text-natural-gray max-w-3xl mx-auto mb-12">
                Explore articles, insights, and knowledge from Datin Norehan on natural wellness, healing, and holistic living.
              </p>
              
              <Tabs defaultValue="all" className="max-w-3xl mx-auto" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="bg-white/70 backdrop-blur-sm">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="article">Articles</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="audio">Podcasts</TabsTrigger>
                    <TabsTrigger value="infographic">Infographics</TabsTrigger>
                    <TabsTrigger value="pdf">Guides</TabsTrigger>
                    <TabsTrigger value="event">Events</TabsTrigger>
                    <TabsTrigger value="reflection">Reflections</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {filteredArticles.length > 6 && (
              <Pagination className="mt-12 flex justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            <div className="mt-16 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-natural-purple/30 text-center">
              <h2 className="font-playfair text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-natural-gray mb-6">
                Stay updated with the latest wellness tips, product announcements, and exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-natural-purple/50"
                />
                <Button className="btn-primary whitespace-nowrap">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
