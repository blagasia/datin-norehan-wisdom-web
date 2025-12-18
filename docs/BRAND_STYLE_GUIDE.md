# Datin Norehan - Brand Style Guide

## Brand Identity

**Brand Name:** Datin Norehan  
**Tagline:** Traditional wisdom. Modern wellness.  
**Brand Voice:** Elegant, nurturing, authentic, sophisticated

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Blush Rose | `#F7D8D5` | `6 59% 90%` | Backgrounds, accents |
| Creamy Ivory | `#F8F3E6` | `45 53% 94%` | Page backgrounds |
| Sage Mist | `#D2DFCD` | `110 25% 85%` | Cards, highlights |

### Secondary Colors

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Muted Rose | `#C99A96` | `5 30% 69%` | Links, borders |
| Soft Taupe | `#B3A99A` | `34 15% 65%` | Muted text |
| Lavender Mist | `#DDD8EF` | `251 39% 89%` | Feature highlights |
| Soft Lavender | `#E5DEFF` | `255 100% 94%` | Badges, tags |

### Accent Colors

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Orchid Pink | `#E68FAC` | `341 66% 73%` | CTAs, icons |
| Deep Teal | `#26767E` | `184 53% 32%` | Primary buttons, links |

### Neutral Colors

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Soft Gray | `#8E9196` | `220 4% 57%` | Body text |
| Dark | `#3A3A3A` | `0 0% 23%` | Headings, emphasis |

---

## Typography

### Font Families

| Font | Type | Usage | CSS Variable |
|------|------|-------|--------------|
| Italiana | Display Serif | Headlines, section titles | `font-italiana` |
| Playfair Display | Serif | Subheadings, feature titles | `font-playfair` |
| Karla | Sans-Serif | Body text, UI elements | `font-karla` |
| Cormorant Garamond | Serif | Quotes, testimonials | `font-cormorant` |
| Montserrat | Sans-Serif | Labels, buttons | `font-montserrat` |

### Font Loading (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Karla:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Typography Scale

```css
/* Headings */
.text-h1 { font-family: 'Italiana'; font-size: 3rem; text-transform: uppercase; letter-spacing: 0.05em; }
.text-h2 { font-family: 'Italiana'; font-size: 2.25rem; text-transform: uppercase; letter-spacing: 0.05em; }
.text-h3 { font-family: 'Playfair Display'; font-size: 1.5rem; font-weight: 600; }
.text-h4 { font-family: 'Playfair Display'; font-size: 1.25rem; font-weight: 500; }

/* Body */
.text-body { font-family: 'Karla'; font-size: 1rem; line-height: 1.75; }
.text-body-lg { font-family: 'Karla'; font-size: 1.125rem; line-height: 1.75; }
.text-body-sm { font-family: 'Karla'; font-size: 0.875rem; line-height: 1.5; }

/* Quotes */
.text-quote { font-family: 'Italiana'; font-size: 1.5rem; font-style: italic; }

/* Labels */
.text-label { font-family: 'Karla'; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }
```

---

## Gradients

### Background Gradients

```css
/* Natural Gradient */
.gradient-natural {
  background: linear-gradient(109.6deg, rgba(242,230,230,1) 11.2%, rgba(242,242,242,1) 91.1%);
}

/* Blush Gradient */
.gradient-blush {
  background: linear-gradient(to right, #F7D8D5, #F8F3E6);
}

/* Sage Gradient */
.gradient-sage {
  background: linear-gradient(to right, #D2DFCD, #F8F3E6);
}

/* Shimmer Gradient (for animations) */
.gradient-shimmer {
  background: linear-gradient(to right, #F7D8D5, #F8F3E6, #DDD8EF, #F8F3E6, #F7D8D5);
  background-size: 200% 100%;
}

/* Dreamy Overlay */
.gradient-dreamy {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
}
```

---

## Shadows & Effects

```css
/* Card Shadow */
.shadow-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Elevated Shadow */
.shadow-elevated {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Text Shadow (for overlays) */
.text-shadow {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
}

/* Backdrop Blur */
.backdrop-soft {
  backdrop-filter: blur(8px);
}
```

---

## Animations

### Keyframe Definitions

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Fade Up */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Breathe */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Subtle Rotate */
@keyframes subtleRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Animation Classes

```css
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-fade-up { animation: fadeUp 0.7s ease-out; }
.animate-scale-in { animation: scaleIn 0.5s ease-out; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-breathe { animation: breathe 8s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 3s infinite linear; }
```

---

## Component Styles

### Buttons

```css
/* Primary Button */
.btn-primary {
  background-color: #26767E;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0;
  font-family: 'Karla';
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: rgba(38, 118, 126, 0.9);
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  border: 1px solid #26767E;
  color: #26767E;
  padding: 0.75rem 1.5rem;
}

.btn-outline:hover {
  background-color: rgba(38, 118, 126, 0.1);
}

/* Ghost Button (for overlays) */
.btn-ghost {
  background-color: rgba(255, 255, 255, 0.9);
  color: #3A3A3A;
  border: none;
}
```

### Cards

```css
.card-product {
  background: white;
  border: 1px solid rgba(210, 223, 205, 0.3);
  padding: 0;
  overflow: hidden;
}

.card-feature {
  background: white;
  border: 1px solid rgba(210, 223, 205, 0.3);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
}

.card-article {
  background: white;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Section Headers

```css
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Italiana';
  font-size: 2.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-family: 'Karla';
  font-size: 1.25rem;
  color: #8E9196;
  max-width: 48rem;
  margin: 0 auto;
}

.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-divider-line {
  width: 3rem;
  height: 1px;
  background-color: #C99A96;
}

.section-divider-text {
  font-family: 'Karla';
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #C99A96;
}
```

---

## Icons

### Recommended Icon Set
- **Primary:** Lucide React Icons
- **Style:** Outline, 24px default size
- **Color:** Brand colors (deep-teal for accent, muted-rose for decorative)

### Common Icons Used
| Icon | Usage |
|------|-------|
| `Sparkles` | Badges, premium features |
| `Feather` | Quotes, natural elements |
| `Leaf` | Organic, natural products |
| `Check` | Features, benefits |
| `Book` | Wisdom, articles |
| `Heart` | Favorites, wellness |
| `ArrowRight` | CTAs, navigation |
| `ShoppingCart` | Cart actions |

---

## Image Guidelines

### Aspect Ratios
| Use Case | Ratio |
|----------|-------|
| Hero/Banner | 16:9 or full-width |
| Product Cards | 1:1 (square) |
| Category Cards | 1:1 (square) |
| Article Thumbnails | 4:3 |
| Gallery | 3:4 (portrait) |

### Image Treatment
- **Products:** Clean, white or neutral background
- **Lifestyle:** Soft, natural lighting
- **Overlays:** Semi-transparent gradients for text readability

---

## Spacing System

```css
/* Base unit: 4px */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */

/* Section Padding */
--section-padding-mobile: 4rem 1rem;
--section-padding-desktop: 6rem 2rem;
```

---

## Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1400px; /* Extra large */
```

---

## Brand Keywords

**Core Values:**
- Natural | Organic | Holistic | Traditional | Heritage

**Experience:**
- Luxurious | Artisanal | Curated | Premium | Sacred

**Benefits:**
- Wellness | Balance | Harmony | Rejuvenation | Healing

**Origin:**
- Malaysian | Botanical | Ancient Wisdom | Modern Science
