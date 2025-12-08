
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SEOMetadata } from '@/types/seo';
import { useEffect, useState } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title: customTitle,
  description: customDescription,
  keywords: customKeywords,
  ogTitle: customOgTitle,
  ogDescription: customOgDescription,
  ogImage: customOgImage,
  canonicalUrl: customCanonicalUrl
}) => {
  const location = useLocation();
  const [metadata, setMetadata] = useState<SEOMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const currentPath = location.pathname;
  
  // Default site title and description as fallbacks
  const DEFAULT_TITLE = "Datin Norehan - Natural Wellness Products";
  const DEFAULT_DESCRIPTION = "Discover premium natural wellness products and traditional remedies by Datin Norehan.";
  
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const { data, error } = await (supabase
          .from('seo_metadata' as any)
          .select('*')
          .eq('page_path', currentPath)
          .maybeSingle() as any);
        
        if (error) {
          console.error('Error fetching SEO data:', error);
        }
        
        if (data) {
          setMetadata(data as SEOMetadata);
        }
      } catch (error) {
        console.error('Error in SEO component:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSEOData();
  }, [currentPath]);
  
  const title = customTitle || metadata?.title || DEFAULT_TITLE;
  const description = customDescription || metadata?.description || DEFAULT_DESCRIPTION;
  const keywords = customKeywords || metadata?.keywords || [];
  const ogTitle = customOgTitle || metadata?.og_title || title;
  const ogDescription = customOgDescription || metadata?.og_description || description;
  const ogImage = customOgImage || metadata?.og_image_url || '';
  const canonicalUrl = customCanonicalUrl || metadata?.canonical_url || window.location.href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
