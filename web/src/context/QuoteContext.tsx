import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface QuoteContextType {
  openQuoteModal: (productName?: string) => void;
  closeQuoteModal: () => void;
  isOpen: boolean;
  selectedProduct: string | null;
  contactInfo: {
    email: string;
    phone: string;
  };
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@audiorent.com',
    phone: '07 54 24 81 83'
  });

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from('site_settings')
        .select('contact_email, contact_phone')
        .single();
      
      if (data) {
        setContactInfo({
          email: data.contact_email,
          phone: data.contact_phone
        });
      }
    }
    fetchSettings();
  }, []);

  const openQuoteModal = (productName?: string) => {
    setSelectedProduct(productName || null);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <QuoteContext.Provider value={{ openQuoteModal, closeQuoteModal, isOpen, selectedProduct, contactInfo }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteModal must be used within a QuoteProvider');
  }
  return context;
}
