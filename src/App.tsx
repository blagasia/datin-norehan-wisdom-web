import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Articles from '@/pages/Articles';
import ArticleDetail from '@/pages/ArticleDetail';
import VirtualEvents from '@/pages/VirtualEvents';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { CartProvider } from '@/context/CartContext';
import { LoyaltyProvider } from '@/context/LoyaltyContext';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="dna-ui-theme">
        <LoyaltyProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/events" element={<VirtualEvents />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </CartProvider>
        </LoyaltyProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
