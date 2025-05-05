
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Ask from "./pages/Ask";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Philosophy from "./pages/Philosophy";
import Story from "./pages/Story";
import VirtualEvents from "./pages/VirtualEvents";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Loyalty from "./pages/Loyalty";
import Rituals from "./pages/Rituals";
import RitualDetail from "./pages/RitualDetail";
import RitualCustom from "./pages/RitualCustom";
import { LoyaltyProvider } from "@/context/LoyaltyContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import PromotionManager from "@/components/promotions/PromotionManager";
import DnaBrand from "./pages/DnaBrand";
import Categories from "./pages/Categories";
import ChatAgent from "./components/ChatAgent";
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import ShippingPolicy from '@/pages/ShippingPolicy';
import ReturnPolicy from '@/pages/ReturnPolicy';
import CookieConsent from '@/components/CookieConsent';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <LoyaltyProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <PromotionManager />
                  <ChatAgent />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/:articleId" element={<ArticleDetail />} />
                    <Route path="/ask" element={<Ask />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/philosophy" element={<Philosophy />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/events" element={<VirtualEvents />} />
                    <Route path="/events/:eventId" element={<EventDetail />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/loyalty" element={<Loyalty />} />
                    <Route path="/rituals" element={<Rituals />} />
                    <Route path="/rituals/:productId" element={<RitualDetail />} />
                    <Route path="/rituals/custom" element={<RitualCustom />} />
                    {/* New DNA brand routes */}
                    <Route path="/dna-brand" element={<DnaBrand />} />
                    <Route path="/categories" element={<Categories />} />
                    {/* Curations routes */}
                    <Route path="/curations/upcoming" element={<NotFound />} />
                    <Route path="/curations/exclusive" element={<NotFound />} />
                    <Route path="/curations/membership" element={<NotFound />} />
                    <Route path="/curations/register" element={<NotFound />} />
                    {/* Legal pages */}
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </LoyaltyProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
      
      <CookieConsent />
    </>
  );
}

export default App;
