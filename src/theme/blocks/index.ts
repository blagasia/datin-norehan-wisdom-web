/**
 * Block Component Registry
 * 
 * This file exports all reusable block components with their schemas
 * for easy WordPress Gutenberg block conversion.
 * 
 * Each block is self-contained with:
 * - TypeScript interface for props (maps to ACF fields)
 * - Default content for previews
 * - Responsive design built-in
 */

// Block type definitions for WordPress conversion
export interface BlockSchema {
  name: string;
  title: string;
  description: string;
  category: 'dna-layout' | 'dna-content' | 'dna-commerce' | 'dna-media';
  icon: string;
  supports: {
    align?: boolean | ('wide' | 'full')[];
    anchor?: boolean;
    spacing?: { margin?: boolean; padding?: boolean };
  };
}

// Hero Block
export interface HeroBlockProps {
  videoUrl?: string;
  fallbackImage: string;
  badge?: { text: string; icon: 'sparkles' | 'feather' | 'leaf' };
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  carouselSlides?: Array<{
    image: string;
    title: string;
    description: string;
  }>;
  quote?: { text: string; author: string };
  categories?: Array<{
    title: string;
    image: string;
    link: string;
    comingSoon?: boolean;
  }>;
}

export const heroBlockSchema: BlockSchema = {
  name: 'dna/hero',
  title: 'DNA Hero',
  description: 'Full-width hero section with video background and carousel',
  category: 'dna-layout',
  icon: 'cover-image',
  supports: { align: ['full'], anchor: true }
};

// Features Block
export interface FeaturesBlockProps {
  sectionTitle: string;
  sectionSubtitle: string;
  features: Array<{
    icon: 'check' | 'book' | 'leaf' | 'pill' | 'heart' | 'star';
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
  background?: 'white' | 'cream' | 'sage';
}

export const featuresBlockSchema: BlockSchema = {
  name: 'dna/features',
  title: 'DNA Features Grid',
  description: 'Display key features with icons in a grid',
  category: 'dna-content',
  icon: 'grid-view',
  supports: { align: ['wide', 'full'], spacing: { padding: true } }
};

// Products Block
export interface ProductsBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  displayMode: 'featured' | 'category' | 'manual';
  categorySlug?: string;
  productIds?: string[];
  columns?: 2 | 3 | 4;
  showCartButton?: boolean;
  showReferralButton?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

export const productsBlockSchema: BlockSchema = {
  name: 'dna/products',
  title: 'DNA Products',
  description: 'Display products in a grid with optional filters',
  category: 'dna-commerce',
  icon: 'cart',
  supports: { align: ['wide', 'full'], spacing: { margin: true, padding: true } }
};

// Rituals Block
export interface RitualsBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  rituals: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    link: string;
    benefits?: string[];
  }>;
  ctaText?: string;
  ctaUrl?: string;
}

export const ritualsBlockSchema: BlockSchema = {
  name: 'dna/rituals',
  title: 'DNA Rituals',
  description: 'Showcase ritual kits and wellness packages',
  category: 'dna-commerce',
  icon: 'star-filled',
  supports: { align: ['wide', 'full'] }
};

// Articles Block
export interface ArticlesBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  displayMode: 'recent' | 'featured' | 'category';
  categorySlug?: string;
  postIds?: string[];
  count?: number;
  layout?: 'grid' | 'carousel' | 'list';
  ctaText?: string;
  ctaUrl?: string;
}

export const articlesBlockSchema: BlockSchema = {
  name: 'dna/articles',
  title: 'DNA Articles',
  description: 'Display blog posts in various layouts',
  category: 'dna-content',
  icon: 'admin-post',
  supports: { align: ['wide', 'full'] }
};

// Events Block
export interface EventsBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: 'virtual' | 'in-person' | 'hybrid';
    image: string;
    description: string;
    registrationUrl: string;
  }>;
}

export const eventsBlockSchema: BlockSchema = {
  name: 'dna/events',
  title: 'DNA Events',
  description: 'Display upcoming events and workshops',
  category: 'dna-content',
  icon: 'calendar-alt',
  supports: { align: ['wide', 'full'] }
};

// Quote Block
export interface QuoteBlockProps {
  quoteText: string;
  author: string;
  icon?: 'feather' | 'leaf' | 'sparkles';
  background?: 'blush' | 'sage' | 'lavender' | 'gradient';
}

export const quoteBlockSchema: BlockSchema = {
  name: 'dna/quote',
  title: 'DNA Quote',
  description: 'Elegant blockquote with decorative elements',
  category: 'dna-content',
  icon: 'format-quote',
  supports: { align: ['wide', 'full'], anchor: true }
};

// Newsletter Block
export interface NewsletterBlockProps {
  title: string;
  description: string;
  placeholder?: string;
  buttonText: string;
  successMessage?: string;
  integration?: 'mailchimp' | 'convertkit' | 'custom';
}

export const newsletterBlockSchema: BlockSchema = {
  name: 'dna/newsletter',
  title: 'DNA Newsletter',
  description: 'Email subscription form with customizable messaging',
  category: 'dna-content',
  icon: 'email',
  supports: { align: ['wide'], spacing: { padding: true } }
};

// About Block
export interface AboutBlockProps {
  sectionTitle: string;
  heading: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaUrl?: string;
  layout?: 'image-left' | 'image-right' | 'image-top';
}

export const aboutBlockSchema: BlockSchema = {
  name: 'dna/about',
  title: 'DNA About Section',
  description: 'About section with image and text',
  category: 'dna-content',
  icon: 'id-alt',
  supports: { align: ['wide', 'full'] }
};

// Social Feed Block
export interface SocialFeedBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  }>;
}

export const socialFeedBlockSchema: BlockSchema = {
  name: 'dna/social-feed',
  title: 'DNA Social Feed',
  description: 'Display social media content',
  category: 'dna-media',
  icon: 'share',
  supports: { align: ['wide', 'full'] }
};

// Export all schemas for WordPress registration
export const allBlockSchemas = [
  heroBlockSchema,
  featuresBlockSchema,
  productsBlockSchema,
  ritualsBlockSchema,
  articlesBlockSchema,
  eventsBlockSchema,
  quoteBlockSchema,
  newsletterBlockSchema,
  aboutBlockSchema,
  socialFeedBlockSchema
];

// Default content for block previews
export const blockDefaults = {
  hero: {
    headline: 'Natural holistic apothecary',
    subheadline: 'Discover our carefully crafted wellness elixirs—where ancestral wisdom meets modern science.',
    ctaText: 'Explore Collection',
    ctaUrl: '/products'
  },
  features: {
    sectionTitle: 'The Essence of Our Products',
    sectionSubtitle: 'Discover what makes Datin Norehan\'s products unique and effective'
  },
  quote: {
    quoteText: 'True beauty is not merely what we see on the surface, but the radiance that emanates from balanced wellness within.',
    author: 'Datin Norehan'
  },
  newsletter: {
    title: 'Join Our Inner Circle',
    description: 'Subscribe for early access to limited formulations, wellness wisdom, and exclusive invitations.',
    buttonText: 'Subscribe',
    placeholder: 'Your email address'
  }
};
