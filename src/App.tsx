
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
import Loyalty from "./pages/Loyalty";
import { LoyaltyProvider } from "@/context/LoyaltyContext";
import PromotionManager from "@/components/promotions/PromotionManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoyaltyProvider>
        <Toaster />
        <Sonner />
        <PromotionManager />
        <BrowserRouter>
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
            <Route path="/loyalty" element={<Loyalty />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoyaltyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
