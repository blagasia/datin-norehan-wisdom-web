
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
}

const articles: ArticleType[] = [
  {
    id: 1,
    title: "The Power of Natural Detoxification",
    excerpt: "Discover how natural ingredients can help cleanse your body and restore balance to your systems.",
    date: "April 12, 2025",
    image: "/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png", // Updated from library
    category: "Wellness"
  },
  {
    id: 2,
    title: "Ancient Herbs for Modern Living",
    excerpt: "Learn how traditional herbal remedies can address today's health challenges in a natural way.",
    date: "April 5, 2025",
    image: "/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png", // Updated from library
    category: "Herbal Wisdom"
  },
  {
    id: 3,
    title: "5 Natural Ways to Boost Your Immunity",
    excerpt: "Simple, natural approaches to strengthen your body's defense systems and maintain optimal health.",
    date: "March 28, 2025",
    image: "/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png", // Added image from library
    category: "Health Tips"
  }
];

const ArticleCard = ({ article }: { article: ArticleType }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      {article.image ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="h-48 bg-natural-green/30 flex items-center justify-center">
          <FileText size={48} className="text-natural-dark/50" />
        </div>
      )}
      <CardHeader>
        <div className="text-xs font-medium text-natural-gray mb-1">{article.category} • {article.date}</div>
        <CardTitle className="font-playfair">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link to="/articles">
          <Button variant="outline" className="w-full hover:bg-natural-green/30 hover:text-natural-dark">Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Articles = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Wellness Wisdom</h2>
          <p className="section-subtitle">Explore articles, insights and knowledge from Datin Norehan</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/articles">
            <Button className="btn-outline">View All Articles</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Articles;
