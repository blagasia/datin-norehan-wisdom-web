
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface ArticleType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
  author: string;
}

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
        <div className="text-xs text-natural-gray mt-1">By {article.author}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-natural-green/30 hover:text-natural-dark">Read More</Button>
      </CardFooter>
    </Card>
  );
};

const Articles = () => {
  const articles: ArticleType[] = [
    {
      id: 1,
      title: "The Power of Natural Detoxification",
      excerpt: "Discover how natural ingredients can help cleanse your body and restore balance to your systems.",
      date: "April 12, 2025",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Wellness",
      author: "Datin Norehan"
    },
    {
      id: 2,
      title: "Ancient Herbs for Modern Living",
      excerpt: "Learn how traditional herbal remedies can address today's health challenges in a natural way.",
      date: "April 5, 2025",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      category: "Herbal Wisdom",
      author: "Datin Norehan"
    },
    {
      id: 3,
      title: "5 Natural Ways to Boost Your Immunity",
      excerpt: "Simple, natural approaches to strengthen your body's defense systems and maintain optimal health.",
      date: "March 28, 2025",
      category: "Health Tips",
      author: "Datin Norehan"
    },
    {
      id: 4,
      title: "The Wellness Revolution: Why Natural Products Matter",
      excerpt: "Exploring the movement toward chemical-free living and why it's crucial for our health and environment.",
      date: "March 20, 2025",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "Wellness",
      author: "Datin Norehan"
    },
    {
      id: 5,
      title: "Traditional Malaysian Herbs and Their Benefits",
      excerpt: "Discover the rich heritage of Malaysian herbal medicine and its applications in modern wellness.",
      date: "March 14, 2025",
      category: "Herbal Wisdom",
      author: "Datin Norehan"
    },
    {
      id: 6,
      title: "Natural Approaches to Beauty and Skincare",
      excerpt: "How to achieve radiant skin and beauty through pure, natural ingredients and holistic practices.",
      date: "March 5, 2025",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      category: "Beauty",
      author: "Datin Norehan"
    }
  ];

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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
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
