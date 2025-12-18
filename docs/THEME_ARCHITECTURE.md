# Datin Norehan - WordPress Theme Architecture

## Overview

This document provides comprehensive documentation for converting this React/Tailwind website into a WordPress/WooCommerce theme with Gutenberg block support.

---

## Site Structure & Sitemap

```
/                          → Homepage (Index.tsx)
├── /story                 → Our Story (brand narrative)
├── /philosophy            → Our Philosophy (brand values)
├── /dna-brand             → DNA Brand (brand identity)
├── /products              → Products listing (WooCommerce Shop)
│   └── /product/:id       → Single Product (WooCommerce Product)
├── /rituals               → Ritual Kits listing
│   ├── /ritual/:id        → Single Ritual detail
│   └── /ritual-custom     → Custom Ritual builder
├── /articles              → Blog/Articles (WP Posts)
│   └── /article/:id       → Single Article (WP Post)
├── /events                → Events listing
│   └── /event/:id         → Single Event detail
├── /virtual-events        → Virtual Events
├── /curations             → Curated Collections
├── /loyalty               → Loyalty Program
├── /ask                   → Ask Datin (AI Chat)
├── /contact               → Contact page
├── /about                 → About page
├── /auth                  → Authentication
├── /admin                 → Admin Dashboard
├── /privacy-policy        → Privacy Policy
├── /terms-of-service      → Terms of Service
├── /return-policy         → Return Policy
└── /shipping-policy       → Shipping Policy
```

---

## Block Component Mapping

### WordPress Gutenberg Block Equivalents

| React Component | WordPress Block Type | ACF Field Group |
|----------------|---------------------|-----------------|
| `Hero.tsx` | `dna/hero` | `hero_settings` |
| `Features.tsx` | `dna/features` | `features_grid` |
| `Products.tsx` | `dna/products` | `products_showcase` |
| `RitualsPreview.tsx` | `dna/rituals` | `rituals_preview` |
| `Articles.tsx` | `dna/articles` | `articles_grid` |
| `EventsPreview.tsx` | `dna/events` | `events_preview` |
| `About.tsx` | `dna/about` | `about_section` |
| `TikTokContent.tsx` | `dna/social-feed` | `social_settings` |
| `Footer.tsx` | Theme Part | `footer_settings` |
| `Navbar.tsx` | Theme Part | `header_settings` |

---

## Component Data Schemas

### Hero Block Schema
```json
{
  "blockName": "dna/hero",
  "fields": {
    "video_url": "string",
    "fallback_image": "image",
    "badge_text": "string",
    "badge_icon": "select:sparkles|feather|leaf",
    "headline": "string",
    "subheadline": "text",
    "cta_text": "string",
    "cta_url": "url",
    "carousel_slides": [
      {
        "image": "image",
        "title": "string",
        "description": "text"
      }
    ],
    "quote_text": "text",
    "quote_author": "string",
    "categories": [
      {
        "title": "string",
        "image": "image",
        "link": "url",
        "coming_soon": "boolean"
      }
    ]
  }
}
```

### Features Block Schema
```json
{
  "blockName": "dna/features",
  "fields": {
    "section_title": "string",
    "section_subtitle": "text",
    "features": [
      {
        "icon": "select:check|book|leaf|pill|heart|star",
        "title": "string",
        "description": "text"
      }
    ]
  }
}
```

### Products Block Schema
```json
{
  "blockName": "dna/products",
  "fields": {
    "section_title": "string",
    "section_description": "text",
    "display_mode": "select:featured|category|manual",
    "category": "taxonomy:product_cat",
    "product_ids": "relationship:product",
    "columns": "number:2-6",
    "show_cart_button": "boolean",
    "show_referral_button": "boolean",
    "cta_text": "string",
    "cta_url": "url"
  }
}
```

### Rituals Block Schema
```json
{
  "blockName": "dna/rituals",
  "fields": {
    "section_title": "string",
    "section_description": "text",
    "rituals": [
      {
        "title": "string",
        "description": "text",
        "image": "image",
        "price": "string",
        "link": "url",
        "benefits": ["string"]
      }
    ],
    "cta_text": "string",
    "cta_url": "url"
  }
}
```

### Articles Block Schema
```json
{
  "blockName": "dna/articles",
  "fields": {
    "section_title": "string",
    "section_description": "text",
    "display_mode": "select:recent|featured|category",
    "category": "taxonomy:category",
    "post_ids": "relationship:post",
    "count": "number",
    "layout": "select:grid|carousel|list",
    "cta_text": "string",
    "cta_url": "url"
  }
}
```

### Events Block Schema
```json
{
  "blockName": "dna/events",
  "fields": {
    "section_title": "string",
    "section_description": "text",
    "events": [
      {
        "title": "string",
        "date": "date",
        "time": "string",
        "location": "string",
        "type": "select:virtual|in-person|hybrid",
        "image": "image",
        "description": "text",
        "registration_url": "url"
      }
    ]
  }
}
```

### Quote Block Schema
```json
{
  "blockName": "dna/quote",
  "fields": {
    "quote_text": "text",
    "author": "string",
    "icon": "select:feather|leaf|sparkles",
    "background": "select:blush|sage|lavender|gradient"
  }
}
```

### Newsletter Block Schema
```json
{
  "blockName": "dna/newsletter",
  "fields": {
    "title": "string",
    "description": "text",
    "placeholder": "string",
    "button_text": "string",
    "success_message": "string",
    "integration": "select:mailchimp|convertkit|custom"
  }
}
```

---

## Theme Color Palette (theme.json)

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "blush-rose", "color": "#F7D8D5", "name": "Blush Rose" },
        { "slug": "creamy-ivory", "color": "#F8F3E6", "name": "Creamy Ivory" },
        { "slug": "sage-mist", "color": "#D2DFCD", "name": "Sage Mist" },
        { "slug": "muted-rose", "color": "#C99A96", "name": "Muted Rose" },
        { "slug": "soft-taupe", "color": "#B3A99A", "name": "Soft Taupe" },
        { "slug": "lavender-mist", "color": "#DDD8EF", "name": "Lavender Mist" },
        { "slug": "soft-lavender", "color": "#E5DEFF", "name": "Soft Lavender" },
        { "slug": "orchid-pink", "color": "#E68FAC", "name": "Orchid Pink" },
        { "slug": "deep-teal", "color": "#26767E", "name": "Deep Teal" },
        { "slug": "soft-gray", "color": "#8E9196", "name": "Soft Gray" },
        { "slug": "dark", "color": "#3A3A3A", "name": "Dark" }
      ],
      "gradients": [
        {
          "slug": "blush-gradient",
          "gradient": "linear-gradient(to right, #F7D8D5, #F8F3E6)",
          "name": "Blush Gradient"
        },
        {
          "slug": "sage-gradient",
          "gradient": "linear-gradient(to right, #D2DFCD, #F8F3E6)",
          "name": "Sage Gradient"
        },
        {
          "slug": "shimmer-gradient",
          "gradient": "linear-gradient(to right, #F7D8D5, #F8F3E6, #DDD8EF, #F8F3E6, #F7D8D5)",
          "name": "Shimmer Gradient"
        }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "'Italiana', serif",
          "slug": "italiana",
          "name": "Italiana"
        },
        {
          "fontFamily": "'Karla', sans-serif",
          "slug": "karla",
          "name": "Karla"
        },
        {
          "fontFamily": "'Playfair Display', serif",
          "slug": "playfair",
          "name": "Playfair Display"
        },
        {
          "fontFamily": "'Cormorant Garamond', serif",
          "slug": "cormorant",
          "name": "Cormorant Garamond"
        },
        {
          "fontFamily": "'Montserrat', sans-serif",
          "slug": "montserrat",
          "name": "Montserrat"
        }
      ]
    },
    "spacing": {
      "units": ["px", "em", "rem", "%", "vw", "vh"]
    },
    "layout": {
      "contentSize": "1200px",
      "wideSize": "1400px"
    }
  }
}
```

---

## CSS Custom Properties (WordPress Compatible)

```css
:root {
  /* Colors */
  --wp--preset--color--blush-rose: #F7D8D5;
  --wp--preset--color--creamy-ivory: #F8F3E6;
  --wp--preset--color--sage-mist: #D2DFCD;
  --wp--preset--color--muted-rose: #C99A96;
  --wp--preset--color--soft-taupe: #B3A99A;
  --wp--preset--color--lavender-mist: #DDD8EF;
  --wp--preset--color--soft-lavender: #E5DEFF;
  --wp--preset--color--orchid-pink: #E68FAC;
  --wp--preset--color--deep-teal: #26767E;
  --wp--preset--color--soft-gray: #8E9196;
  --wp--preset--color--dark: #3A3A3A;
  
  /* Fonts */
  --wp--preset--font-family--italiana: 'Italiana', serif;
  --wp--preset--font-family--karla: 'Karla', sans-serif;
  --wp--preset--font-family--playfair: 'Playfair Display', serif;
  
  /* Spacing */
  --wp--preset--spacing--section-sm: 4rem;
  --wp--preset--spacing--section-md: 6rem;
  --wp--preset--spacing--section-lg: 8rem;
  
  /* Border Radius */
  --wp--preset--border-radius: 0.5rem;
}
```

---

## WooCommerce Integration

### Product Data Mapping

| React Field | WooCommerce Field |
|-------------|-------------------|
| `id` | `product_id` |
| `name` | `post_title` |
| `description` | `post_content` |
| `price` | `_regular_price` |
| `category` | `product_cat` |
| `image` | `_thumbnail_id` |
| `benefits` | `_product_benefits` (ACF) |
| `ingredients` | `_product_ingredients` (ACF) |

### Custom Product Fields (ACF)
```php
acf_add_local_field_group([
  'key' => 'group_product_details',
  'title' => 'Product Details',
  'fields' => [
    ['key' => 'benefits', 'label' => 'Benefits', 'type' => 'repeater'],
    ['key' => 'ingredients', 'label' => 'Ingredients', 'type' => 'textarea'],
    ['key' => 'usage', 'label' => 'Usage Instructions', 'type' => 'wysiwyg'],
    ['key' => 'size', 'label' => 'Size/Volume', 'type' => 'text'],
  ],
  'location' => [['param' => 'post_type', 'operator' => '==', 'value' => 'product']]
]);
```

---

## File Structure for WordPress Theme

```
dna-theme/
├── style.css                 # Theme stylesheet
├── functions.php             # Theme functions
├── theme.json                # Block editor settings
├── index.php                 # Main template
├── header.php                # Header template
├── footer.php                # Footer template
├── front-page.php            # Homepage template
├── page.php                  # Generic page template
├── single.php                # Single post template
├── archive.php               # Archive template
├── search.php                # Search results
├── 404.php                   # 404 page
│
├── template-parts/
│   ├── header/
│   │   ├── navigation.php
│   │   └── mobile-menu.php
│   ├── footer/
│   │   ├── footer-widgets.php
│   │   └── footer-bottom.php
│   ├── content/
│   │   ├── content-product.php
│   │   ├── content-article.php
│   │   └── content-event.php
│   └── components/
│       ├── card-product.php
│       ├── card-article.php
│       └── card-event.php
│
├── blocks/
│   ├── hero/
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── save.js
│   │   └── style.scss
│   ├── features/
│   ├── products/
│   ├── rituals/
│   ├── articles/
│   ├── events/
│   ├── quote/
│   └── newsletter/
│
├── woocommerce/              # WooCommerce overrides
│   ├── single-product.php
│   ├── archive-product.php
│   ├── cart/
│   └── checkout/
│
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── blocks.css
│   │   └── woocommerce.css
│   ├── js/
│   │   ├── main.js
│   │   ├── blocks.js
│   │   └── animations.js
│   ├── images/
│   └── fonts/
│
├── inc/
│   ├── customizer.php        # Theme customizer
│   ├── blocks.php            # Block registration
│   ├── woocommerce.php       # WooCommerce setup
│   ├── acf-fields.php        # ACF field definitions
│   └── helpers.php           # Helper functions
│
└── languages/                # Translation files
```

---

## Asset URLs Reference

### Homepage Assets
| Asset | Path | WordPress Location |
|-------|------|-------------------|
| Hero Video | `vimeo.com/1080492231` | Theme Options → Hero Video |
| Hero Fallback | `/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png` | Media Library |
| Carousel Slide 1 | `/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png` | Block Settings |
| Carousel Slide 2 | `/lovable-uploads/1d2d4ba3-6798-432d-b239-3d1bdc235172.png` | Block Settings |
| Carousel Slide 3 | `/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png` | Block Settings |
| Carousel Slide 4 | `/lovable-uploads/5f0e6477-2199-4db9-babb-73c92b345eea.png` | Block Settings |
| Category: Elixirs | `/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png` | Block Settings |
| Category: Rituals | `/lovable-uploads/34f94502-8118-4f8e-95d0-13db35fd36bb.png` | Block Settings |
| Category: Wisdom | `/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png` | Block Settings |
| Category: Curations | `/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png` | Block Settings |
| Natural Harmony BG | `/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png` | Block Settings |

### Product Images
| Product | Image Path |
|---------|-----------|
| Organic Detox Tea | `/lovable-uploads/f91e20f1-b533-4a99-8571-6b67480a4f46.png` |
| Herbal Immunity Blend | `/lovable-uploads/afa1593f-8b8c-4b88-9806-09cbc6f7618d.png` |
| Natural Energy Elixir | `/lovable-uploads/5a036f15-ad25-4f98-b74e-196eb003b9c9.png` |
| Stress Relief Tea | `/lovable-uploads/97f5b93e-ab97-4436-9ed5-2850cf3f2e89.png` |
| Digestive Wellness | `/lovable-uploads/0eac78ee-8a47-4f36-82e6-165e32f3d2d0.png` |
| Sleep Support | `/lovable-uploads/56c8ecfc-b55a-466b-8542-f2c698fb2dc3.png` |
| Anti-Aging Elixir | `/lovable-uploads/ba6aa273-f8a4-4313-9d28-65b4a2be27a5.png` |
| Collagen Beauty | `/lovable-uploads/6d9f907a-6319-4c00-9c39-ab24ad9d31f4.png` |
| Skin Glow Tonic | `/lovable-uploads/7e6f7992-a735-45ec-b641-98b2928c9e3f.png` |

---

## Animation Classes (CSS)

```css
/* Fade animations */
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-fade-up { animation: fade-up 0.7s ease-out; }
.animate-scale-in { animation: scale-in 0.5s ease-out; }

/* Continuous animations */
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-breathe { animation: breathe 8s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 3s infinite linear; }
.animate-subtle-rotate { animation: subtle-rotate 20s linear infinite; }

/* Staggered delays */
[animation-delay\:100ms] { animation-delay: 100ms; }
[animation-delay\:200ms] { animation-delay: 200ms; }
[animation-delay\:300ms] { animation-delay: 300ms; }
[animation-delay\:400ms] { animation-delay: 400ms; }
```

---

## Conversion Checklist

### Phase 1: Setup
- [ ] Create WordPress theme folder structure
- [ ] Set up theme.json with color palette
- [ ] Register custom fonts
- [ ] Create base stylesheets

### Phase 2: Core Templates
- [ ] header.php with navigation
- [ ] footer.php with widgets
- [ ] front-page.php for homepage
- [ ] page.php for generic pages
- [ ] single.php for posts

### Phase 3: Gutenberg Blocks
- [ ] Hero block
- [ ] Features block
- [ ] Products block
- [ ] Rituals block
- [ ] Articles block
- [ ] Quote block
- [ ] Newsletter block

### Phase 4: WooCommerce
- [ ] Install WooCommerce
- [ ] Create product template overrides
- [ ] Set up ACF product fields
- [ ] Cart & checkout customization

### Phase 5: Custom Post Types
- [ ] Rituals CPT
- [ ] Events CPT
- [ ] Testimonials CPT

### Phase 6: Theme Customizer
- [ ] Logo upload
- [ ] Color scheme selection
- [ ] Typography options
- [ ] Social media links
- [ ] Footer settings

---

## Notes for Cursor AI

When converting to WordPress:

1. **Component Props → ACF Fields**: Each React component's props should become ACF fields
2. **Tailwind Classes → CSS**: Convert Tailwind utilities to semantic CSS classes
3. **React Router → WordPress Menu**: Navigation links become WordPress menu items
4. **useState/useEffect → PHP/JS**: Client-side logic becomes server-side PHP or vanilla JS
5. **Supabase → WordPress DB**: Database operations become WordPress queries
6. **Context Providers → WordPress Globals**: Cart/Auth contexts become WooCommerce/WordPress user systems
