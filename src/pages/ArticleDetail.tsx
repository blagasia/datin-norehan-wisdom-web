
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import TikTokVideo from '@/components/TikTokVideo';
import { toast } from 'sonner';
import { blogArticles } from '@/data/blogArticles';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const article = blogArticles.find(article => article.id === Number(articleId));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you are looking for doesn't exist or has been removed.</p>
            <Link to="/articles">
              <Button>Return to Articles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = () => {
    toast.success("Redirecting to payment page for PDF download", {
      description: "You will be redirected to complete your RM10 payment"
    });
  };

  const renderArticleContent = () => {
    switch (article.type) {
      case 'video':
        return (
          <div className="space-y-8">
            <div className="relative rounded-lg overflow-hidden">
              {article.videoId ? (
                <TikTokVideo videoId={article.videoId} />
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <p>Video unavailable</p>
                </div>
              )}
            </div>
            <div className="prose max-w-none">
              <p>{article.content}</p>
              {article.hasPDF && (
                <div className="mt-8 p-6 bg-natural-peach/10 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Download the Complete Recipe E-Book</h3>
                  <p className="mb-4">Get a beautifully designed PDF with this recipe and 5 more exclusive beauty rituals from Datin Norehan.</p>
                  <Button onClick={handleDownloadPDF} className="bg-natural-peach hover:bg-natural-peach/90">
                    Download PDF (RM10)
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-8">
            <div className="bg-soft-purple/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Listen to Audio Recording</h3>
              <audio controls className="w-full">
                <source src={article.audioUrl || "#"} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="prose max-w-none">
              <p>{article.content}</p>
            </div>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="rounded-lg w-full h-auto"
                  />
                )}
              </div>
              <div>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Event Details</h3>
                  <p className="mb-4">{article.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-natural-green/20">
                      {article.eventDate}
                    </Badge>
                    <Badge variant="outline" className="bg-natural-peach/20">
                      {article.eventLocation}
                    </Badge>
                  </div>
                  {article.upcoming && (
                    <Button className="mt-4">Register for Next Event</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'reflection':
        return (
          <div className="prose max-w-none">
            <div className="mb-6 italic text-natural-gray border-l-4 pl-4 border-natural-peach">
              "{article.quote}"
            </div>
            <p>{article.content}</p>
          </div>
        );
      default:
        return (
          <div className="prose max-w-none">
            <p>{article.content}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 md:py-24 bg-natural-purple/10">
        <div className="container mx-auto px-4">
          <Link to="/articles" className="inline-flex items-center text-natural-gray hover:text-natural-dark mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Articles
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            {article.type !== 'article' && (
              <Badge className="text-xs">
                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
              </Badge>
            )}
            {article.featured && (
              <Badge className="text-xs bg-natural-peach/90 text-white">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center gap-4 text-natural-gray mb-8">
            <div>By {article.author}</div>
            <div>•</div>
            <div>{article.date}</div>
            {article.readTime && (
              <>
                <div>•</div>
                <div>{article.readTime} read</div>
              </>
            )}
          </div>
          
          {article.image && article.type !== 'event' && (
            <div className="mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
            {renderArticleContent()}
          </div>
          
          <div className="mt-16 border-t border-natural-peach/30 pt-12">
            <h2 className="font-playfair text-2xl font-bold mb-6">Related Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles
                .filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map(relatedArticle => (
                  <Link key={relatedArticle.id} to={`/articles/${relatedArticle.id}`} className="group">
                    <div className="overflow-hidden rounded-lg mb-4">
                      {relatedArticle.image ? (
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-natural-green/30" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-natural-peach transition-colors">{relatedArticle.title}</h3>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
