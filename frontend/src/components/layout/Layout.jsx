import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';

const Layout = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Brazilian phone number with country code (e.g. 5541995203400)
  const whatsappNumber = '5541995203400';
  const initialMessage = 'Olá! Estou interessado em saber mais sobre os serviços da Widia.';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
      <WhatsAppButton phoneNumber={whatsappNumber} message={initialMessage} />
    </div>
  );
};

export default Layout;