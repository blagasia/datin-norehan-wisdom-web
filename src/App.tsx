
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Story from './pages/Story';
import Philosophy from './pages/Philosophy';
import Admin from './pages/Admin';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/story" element={<Story />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
