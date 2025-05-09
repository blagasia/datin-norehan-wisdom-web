
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, Image, Video, Newspaper, Book, AudioLines, Calendar, Clock, Heart, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface BlogArticleProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  type: 'article' | 'video' | 'audio' | 'image' | 'pdf' | 'infographic' | 'event' | 'reflection';
  image?: string;
  readTime?: string;
  likes?: number;
  comments?: number;
  featured?: boolean;
  videoId?: string;
  audioUrl?: string;
  content?: string;
  hasPDF?: boolean;
  eventDate?: string;
  eventLocation?: string;
  upcoming?: boolean;
  quote?: string;
  tags?: string[]; // Added missing tags property
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
      case 'event':
        return <Calendar size={24} className="text-natural-gray" />;
      case 'reflection':
        return <Book size={24} className="text-natural-gray" />;
      default:
        return <Book size={24} className="text-natural-gray" />;
    }
  };

  // Different styling based on content type
  const getCardStyle = () => {
    switch (article.type) {
      case 'video':
        return 'border-natural-peach/50 hover:border-natural-peach';
      case 'audio':
        return 'border-natural-purple/50 hover:border-natural-purple';
      case 'event':
        return 'border-natural-green/50 hover:border-natural-green';
      case 'reflection':
        return 'border-blue-200 hover:border-blue-300';
      case 'pdf':
        return 'border-orange-200 hover:border-orange-300';
      default:
        return article.featured ? 'border-natural-peach hover:border-natural-peach/80' : '';
    }
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-300 ${getCardStyle()}`}>
      <Link to={`/articles/${article.id}`} className="relative">
        <div className="h-56 overflow-hidden relative">
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-56 bg-natural-green/30 flex items-center justify-center relative">
              {renderContentTypeIcon()}
            </div>
          )}
          
          {/* Content type overlay for video/audio */}
          {article.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                <Video className="w-8 h-8 text-natural-peach" />
              </div>
            </div>
          )}
          {article.type === 'audio' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                <AudioLines className="w-8 h-8 text-natural-purple" />
              </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex gap-2">
            {article.type !== 'article' && (
              <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm">
                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
              </Badge>
            )}
            {article.featured && (
              <Badge className="text-xs bg-natural-peach/90 text-white">
                Featured
              </Badge>
            )}
          </div>
          
          {article.type === 'event' && article.eventDate && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-white flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{article.eventDate}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-medium text-natural-gray flex items-center">
            <span className="bg-natural-peach/20 text-natural-dark px-2 py-1 rounded-full">
              {article.category}
            </span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
          </div>
          {article.readTime && (
            <div className="text-xs text-natural-gray flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime} read
            </div>
          )}
        </div>
        <Link to={`/articles/${article.id}`}>
          <CardTitle className="font-playfair hover:text-natural-peach transition-colors text-xl leading-tight">
            {article.title}
          </CardTitle>
        </Link>
        <div className="text-xs text-natural-gray mt-2 flex items-center">
          <Avatar className="h-5 w-5 mr-1">
            <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" alt={article.author} />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
          By {article.author}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {article.type === 'reflection' && article.quote && (
          <div className="italic text-natural-dark/80 text-sm mb-2 border-l-2 pl-3 border-natural-peach">
            "{article.quote.length > 100 ? article.quote.substring(0, 100) + '...' : article.quote}"
          </div>
        )}
        <CardDescription className="line-clamp-3">
          {article.excerpt}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Link to={`/articles/${article.id}`}>
          <Button 
            variant="outline" 
            className={`
              ${article.type === 'video' ? 'hover:bg-natural-peach/20 hover:text-natural-dark' : ''}
              ${article.type === 'audio' ? 'hover:bg-natural-purple/20 hover:text-natural-dark' : ''}
              ${article.type === 'event' ? 'hover:bg-natural-green/20 hover:text-natural-dark' : ''}
              ${article.type === 'article' || article.type === 'reflection' ? 'hover:bg-natural-green/30 hover:text-natural-dark' : ''}
            `}
          >
            {article.type === 'video' ? 'Watch Now' : 
             article.type === 'audio' ? 'Listen Now' :
             article.type === 'pdf' ? 'View Guide' :
             article.type === 'event' ? 'View Event' :
             'Read More'}
          </Button>
        </Link>
        {(article.likes !== undefined || article.comments !== undefined) && (
          <div className="flex gap-3 text-xs text-natural-gray">
            {article.likes !== undefined && (
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {article.likes}
              </span>
            )}
            {article.comments !== undefined && (
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
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
