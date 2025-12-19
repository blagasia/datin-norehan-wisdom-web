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
import Admin from '@/pages/Admin';
import Philosophy from '@/pages/Philosophy';
import Story from '@/pages/Story';
import DnaBrand from '@/pages/DnaBrand';
import Rituals from '@/pages/Rituals';
import Curations from '@/pages/Curations';
import Home from '@/pages/Home';
import Apothecary from '@/pages/Apothecary';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="dna-ui-theme">
        <LoyaltyProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/apothecary" element={<Apothecary />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/events" element={<VirtualEvents />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/philosophy" element={<Philosophy />} />
                <Route path="/story" element={<Story />} />
                <Route path="/dna-brand" element={<DnaBrand />} />
                <Route path="/rituals" element={<Rituals />} />
                <Route path="/rituals/custom" element={<Rituals />} />
                <Route path="/curations" element={<Curations />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/*" element={<Admin />} />
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
