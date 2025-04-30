
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Promotion } from '@/types/loyalty';
import { defaultPromotions } from '@/data/loyalty';
import PromoPopup from './PromoPopup';

const PromotionManager = () => {
  const [activePromotion, setActivePromotion] = useState<Promotion | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    try {
      // Check for custom promotions from CMS
      const customPromotions = localStorage.getItem('cms_promotions');
      let allPromotions = [...defaultPromotions];
      
      if (customPromotions) {
        try {
          const parsedPromotions = JSON.parse(customPromotions);
          allPromotions = [...parsedPromotions, ...defaultPromotions];
        } catch (e) {
          console.error('Failed to parse custom promotions', e);
        }
      }
      
      // Filter promotions for this page and check if they are active
      const now = new Date();
      const eligiblePromotions = allPromotions.filter(promo => {
        // Check if promo is active
        if (!promo.isActive) return false;
        
        // Check date range
        const startDate = new Date(promo.startDate);
        const endDate = new Date(promo.endDate);
        if (now < startDate || now > endDate) return false;
        
        // Check if this page is targeted
        const isTargeted = promo.targetPages.some(page => {
          if (page === '/*') return true; // Wildcard for all pages
          if (page === currentPath) return true;
          if (page.endsWith('/*') && currentPath.startsWith(page.slice(0, -2))) return true;
          return false;
        });
        if (!isTargeted) return false;
        
        // Check display frequency
        if (promo.displayFrequency === 'once') {
          const wasShown = localStorage.getItem(`promo_shown_${promo.id}`);
          if (wasShown === 'true') return false;
        } else if (promo.displayFrequency === 'daily') {
          const lastShown = localStorage.getItem(`promo_shown_${promo.id}`);
          const today = new Date().toISOString().split('T')[0];
          if (lastShown === today) return false;
        } else if (promo.displayFrequency === 'sessionBased') {
          const sessionKey = `promo_session_${promo.id}`;
          const sessionShown = sessionStorage.getItem(sessionKey);
          if (sessionShown === 'true') return false;
          sessionStorage.setItem(sessionKey, 'true');
        }
        
        return true;
      });
      
      // Sort by priority (higher number = higher priority)
      eligiblePromotions.sort((a, b) => b.priority - a.priority);
      
      // Show the highest priority promotion
      if (eligiblePromotions.length > 0) {
        const topPromotion = eligiblePromotions[0];
        
        // Set a delay if specified
        if (topPromotion.displayDelay && topPromotion.displayDelay > 0) {
          const timer = setTimeout(() => {
            setActivePromotion(topPromotion);
          }, topPromotion.displayDelay * 1000);
          
          return () => clearTimeout(timer);
        } else {
          setActivePromotion(topPromotion);
        }
      }
    } catch (error) {
      console.error("Error in PromotionManager:", error);
      // Don't let errors in promotion logic crash the entire app
    }
  }, [currentPath]);

  const handleClosePromotion = () => {
    if (activePromotion) {
      // Mark as shown for 'once' frequency
      if (activePromotion.displayFrequency === 'once') {
        localStorage.setItem(`promo_shown_${activePromotion.id}`, 'true');
      }
      // Mark as shown for today for 'daily' frequency
      else if (activePromotion.displayFrequency === 'daily') {
        localStorage.setItem(
          `promo_shown_${activePromotion.id}`, 
          new Date().toISOString().split('T')[0]
        );
      }
    }
    setActivePromotion(null);
  };

  // Add additional error handling for the render
  if (!activePromotion || activePromotion.type !== 'popup') {
    return null;
  }

  try {
    return <PromoPopup promotion={activePromotion} onClose={handleClosePromotion} />;
  } catch (error) {
    console.error("Error rendering promotion popup:", error);
    return null;
  }
};

export default PromotionManager;
