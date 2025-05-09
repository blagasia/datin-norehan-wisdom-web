
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Bookmark, Heart, MessageSquare } from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';
import { BlogArticleProps } from '@/components/BlogArticle';
import SEO from '@/components/SEO';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogArticleProps | null>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find article by ID
    if (id) {
      const foundArticle = blogArticles.find(a => a.id.toString() === id);
      if (foundArticle) {
        setArticle(foundArticle);
      }
    }
  }, [id]);
  
  // Function to render the appropriate content based on article type
  const renderArticleContent = () => {
    if (!article) return null;
    
    switch (article.type) {
      case 'video':
        return (
          <div className="mb-8">
            {article.videoId ? (
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-lg shadow-md" 
                  src={`https://www.youtube.com/embed/${article.videoId}`}
                  title={article.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="bg-gray-200 aspect-video flex items-center justify-center rounded-lg">
                <p>Video not available</p>
              </div>
            )}
          </div>
        );
      
      case 'audio':
        return (
          <div className="mb-8 bg-brand-lavender-mist/30 p-4 rounded-lg">
            {article.audioUrl ? (
              <audio className="w-full" controls>
                <source src={article.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="bg-gray-200 h-20 flex items-center justify-center rounded-lg">
                <p>Audio not available</p>
              </div>
            )}
          </div>
        );
      
      case 'pdf':
        return (
          <div className="mb-8">
            <div className="bg-natural-peach/10 p-6 rounded-lg border border-natural-peach/30">
              <h3 className="font-playfair text-xl mb-3">Premium Guide Preview</h3>
              <p className="mb-4">This premium guide is available for download.</p>
              <Button className="bg-natural-peach hover:bg-natural-peach/90 text-white">
                Download Guide
              </Button>
            </div>
          </div>
        );
      
      case 'event':
        return (
          <div className="mb-8 bg-natural-green/10 p-6 rounded-lg border border-natural-green/30">
            <h3 className="font-playfair text-xl mb-3">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-natural-gray">Date & Time</p>
                <p>{article.eventDate} • {article.eventDate ? article.eventDate : 'TBD'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-natural-gray">Location</p>
                <p>{article.eventLocation || 'Online Event'}</p>
              </div>
            </div>
            <Button className="bg-natural-green hover:bg-natural-green/90 text-white">
              {article.upcoming ? 'Register Now' : 'View Recording'}
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
              <p className="text-natural-gray mb-6">The article you're looking for might have been removed or is unavailable.</p>
              <Link to="/articles">
                <Button>Back to Articles</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${article.title} | Datin Norehan`}
        description={article.excerpt}
      />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        <article className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center text-sm text-natural-gray">
                <Link to="/articles" className="flex items-center hover:text-brand-deep-teal transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Articles
                </Link>
              </div>
              
              {/* Article Header */}
              <header className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-natural-peach/20 text-natural-dark px-2 py-1 rounded-full text-sm">
                    {article.category}
                  </span>
                  <span className="text-natural-gray text-sm">• {article.type.charAt(0).toUpperCase() + article.type.slice(1)}</span>
                </div>
                
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-natural-gray mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {article.date}
                  </div>
                  {article.readTime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {article.readTime} read
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" alt={article.author} />
                    <AvatarFallback>DN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{article.author}</p>
                    <p className="text-xs text-natural-gray">Wellness Expert</p>
                  </div>
                </div>
              </header>
              
              {/* Featured Image */}
              {article.image && (
                <div className="mb-8">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
              
              {/* Special content blocks based on article type */}
              {renderArticleContent()}
              
              {/* Article content */}
              {article.type === 'reflection' && article.quote && (
                <blockquote className="text-xl italic border-l-4 border-brand-blush-rose pl-4 py-2 mb-8 text-natural-gray/90">
                  "{article.quote}"
                </blockquote>
              )}
              
              <div className="prose prose-lg max-w-none">
                {article.content ? (
                  <p>{article.content}</p>
                ) : (
                  <>
                    <p className="mb-4">
                      In the bustling world of modern wellness, there's a growing interest in returning to the wisdom of traditional practices. This isn't merely nostalgia—it's a recognition that generations before us cultivated deep understanding of natural healing that remains relevant today.
                    </p>
                    <p className="mb-4">
                      Datin Norehan's approach bridges this ancient knowledge with contemporary scientific understanding. The result is a holistic wellness system that honors tradition while embracing validation and refinement through modern research methods.
                    </p>
                    <h2 className="font-playfair text-2xl font-semibold my-6">Understanding Traditional Remedies</h2>
                    <p className="mb-4">
                      Traditional remedies are often rooted in a profound understanding of local botanicals and their effects on the human body. Rather than isolating single compounds, these practices typically utilize whole plants or combinations that work synergistically.
                    </p>
                    <p className="mb-4">
                      What makes these approaches particularly valuable is their development through careful observation and refinement over centuries. Each generation contributed to this knowledge base through practical application and noted outcomes.
                    </p>
                    <h2 className="font-playfair text-2xl font-semibold my-6">The Science Behind Tradition</h2>
                    <p className="mb-4">
                      Modern scientific inquiry has begun to validate many traditional practices. For instance, herbs long used for their anti-inflammatory properties have indeed been found to contain compounds that inhibit inflammatory pathways in the body.
                    </p>
                    <p className="mb-4">
                      This scientific validation doesn't diminish the wisdom of traditional approaches—rather, it enhances our understanding of why these methods have endured. It also allows us to optimize these practices for contemporary needs.
                    </p>
                    <h2 className="font-playfair text-2xl font-semibold my-6">Finding Balance</h2>
                    <p className="mb-4">
                      The true power of Datin Norehan's methodology lies in finding the perfect balance between ancestral wisdom and scientific insight. This harmonious approach allows us to benefit from generations of observational knowledge while applying the precision and safety considerations of modern science.
                    </p>
                    <p>
                      By honoring tradition while embracing innovation, we create wellness solutions that are both deeply rooted and forward-thinking—a truly balanced approach to health in our complex modern world.
                    </p>
                  </>
                )}
              </div>
              
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="h-4 w-4 text-natural-gray mr-2" />
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-natural-gray hover:bg-gray-200 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Social sharing */}
              <div className="mt-8 flex justify-between items-center py-6 border-t border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>{article.likes || 0}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>{article.comments || 0}</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Related articles */}
              <div className="mt-16">
                <h3 className="font-playfair text-2xl font-semibold mb-6">Related Content</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {blogArticles
                    .filter(a => a.id !== article.id && a.category === article.category)
                    .slice(0, 2)
                    .map((relatedArticle) => (
                      <Link key={relatedArticle.id} to={`/articles/${relatedArticle.id}`}>
                        <div className="flex gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                            {relatedArticle.image ? (
                              <img 
                                src={relatedArticle.image} 
                                alt={relatedArticle.title}
                                className="w-full h-full object-cover object-center" 
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Tag className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium mb-1 line-clamp-2">{relatedArticle.title}</h4>
                            <p className="text-natural-gray text-sm">{relatedArticle.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                <div className="mt-8 text-center">
                  <Link to="/articles">
                    <Button variant="outline">View All Articles</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
