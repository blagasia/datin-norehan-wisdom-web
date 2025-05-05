
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, CircleDashed, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

interface ArticlesBlockContent {
  title: string;
  description: string;
  articles: string[]; // Array of article IDs
}

interface ArticlesBlockEditorProps {
  content: ArticlesBlockContent;
  onChange: (content: ArticlesBlockContent) => void;
  readOnly?: boolean;
}

const ArticlesBlockEditor: React.FC<ArticlesBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  const [availableArticles, setAvailableArticles] = useState<Article[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch available articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // This is a placeholder since we don't have an articles table yet
        // In a real implementation, this would fetch from the articles table
        const mockArticles: Article[] = [
          { 
            id: '1', 
            title: 'Benefits of Daily Detox Rituals', 
            excerpt: 'How incorporating simple detox practices can improve your wellbeing', 
            image: '/placeholder.svg',
            date: '2023-05-10'
          },
          { 
            id: '2', 
            title: 'The Science Behind Collagen Supplements', 
            excerpt: 'Understanding how collagen works to improve skin, hair and joints', 
            image: '/placeholder.svg',
            date: '2023-06-15'
          },
          { 
            id: '3', 
            title: 'Traditional Herbs for Modern Wellness', 
            excerpt: 'Ancient wisdom meets contemporary health practices', 
            image: '/placeholder.svg',
            date: '2023-07-22'
          },
          { 
            id: '4', 
            title: 'Creating a Personal Wellness Routine', 
            excerpt: 'Steps to design a sustainable self-care practice', 
            image: '/placeholder.svg',
            date: '2023-08-05'
          },
          { 
            id: '5', 
            title: 'The Connection Between Gut Health and Overall Wellbeing', 
            excerpt: 'How your digestive system affects your entire body', 
            image: '/placeholder.svg',
            date: '2023-09-18'
          },
        ];
        setAvailableArticles(mockArticles);
        
        // Find selected articles based on IDs
        const selected = mockArticles.filter(article => 
          content.articles.includes(article.id)
        );
        setSelectedArticles(selected);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [content.articles]);

  const handleArticleToggle = (article: Article) => {
    // Check if article is already selected
    const isSelected = content.articles.includes(article.id);
    
    if (isSelected) {
      // Remove from selected articles
      onChange({
        ...content,
        articles: content.articles.filter(id => id !== article.id)
      });
    } else {
      // Add to selected articles
      onChange({
        ...content,
        articles: [...content.articles, article.id]
      });
    }
  };

  const filteredArticles = availableArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (readOnly) {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair mb-2">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedArticles.map(article => (
            <div key={article.id} className="border rounded-md overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <h3 className="font-medium mb-1">{article.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="articles-title">Section Title</Label>
        <Input
          id="articles-title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter section title"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="articles-description">Description</Label>
        <Input
          id="articles-description"
          value={content.description}
          onChange={(e) => onChange({ ...content, description: e.target.value })}
          placeholder="Enter section description"
          className="mt-2"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">Select Articles</h4>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center p-8">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto p-2">
            {filteredArticles.map(article => {
              const isSelected = content.articles.includes(article.id);
              return (
                <Card 
                  key={article.id} 
                  className={`cursor-pointer transition-colors ${isSelected ? 'border-brand-deep-teal bg-brand-deep-teal/10' : 'border-muted'}`}
                  onClick={() => handleArticleToggle(article)}
                >
                  <CardContent className="p-3 flex items-center">
                    <div className="h-12 w-12 mr-3 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{article.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-brand-deep-teal" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Selected {selectedArticles.length} of {availableArticles.length} articles
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border rounded-md p-6 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-playfair mb-2">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
          {selectedArticles.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-md">
              <p className="text-muted-foreground">No articles selected</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedArticles.map(article => (
                <div key={article.id} className="border rounded-md overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-muted-foreground">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground mb-1">
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesBlockEditor;
