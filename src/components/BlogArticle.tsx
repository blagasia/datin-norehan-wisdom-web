
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, Image, Video, Newspaper, Book, AudioLines } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BlogArticleProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  type: 'article' | 'video' | 'audio' | 'image' | 'pdf' | 'infographic';
  image?: string;
  readTime?: string;
  likes?: number;
  comments?: number;
  featured?: boolean;
}

const BlogArticle = ({ article }: { article: BlogArticleProps }) => {
  // Function to render the appropriate icon based on content type
  const renderContentTypeIcon = () => {
    switch (article.type) {
      case 'video':
        return <Video size={24} className="text-natural-gray" />;
      case 'audio':
        return <AudioLines size={24} className="text-natural-gray" />;
      case 'image':
        return <Image size={24} className="text-natural-gray" />;
      case 'pdf':
        return <FileText size={24} className="text-natural-gray" />;
      case 'infographic':
        return <Newspaper size={24} className="text-natural-gray" />;
      default:
        return <Book size={24} className="text-natural-gray" />;
    }
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300 ${article.featured ? 'border-natural-peach' : ''}`}>
      {article.image ? (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover object-center"
          />
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
        </div>
      ) : (
        <div className="h-48 bg-natural-green/30 flex items-center justify-center relative">
          {renderContentTypeIcon()}
          <div className="absolute top-2 right-2 flex gap-2">
            {article.type !== 'article' && (
              <Badge variant="secondary" className="text-xs">
                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
              </Badge>
            )}
            {article.featured && (
              <Badge className="text-xs bg-natural-peach/90 text-white">
                Featured
              </Badge>
            )}
          </div>
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs font-medium text-natural-gray">{article.category} • {article.date}</div>
          {article.readTime && <div className="text-xs text-natural-gray">{article.readTime} read</div>}
        </div>
        <CardTitle className="font-playfair">{article.title}</CardTitle>
        <div className="text-xs text-natural-gray mt-1">By {article.author}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" className="hover:bg-natural-green/30 hover:text-natural-dark">Read More</Button>
        {(article.likes !== undefined || article.comments !== undefined) && (
          <div className="flex gap-3 text-xs text-natural-gray">
            {article.likes !== undefined && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {article.likes}
              </span>
            )}
            {article.comments !== undefined && (
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                {article.comments}
              </span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogArticle;
