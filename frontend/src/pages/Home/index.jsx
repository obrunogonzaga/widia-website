import React, { useEffect } from 'react';
import HeroSection from '../../components/sections/HeroSection';
import ServicesSection from '../../components/sections/ServicesSection';
import MethodologySection from '../../components/sections/MethodologySection';
import MetricsSection from '../../components/sections/MetricsSection';
import CasesSection from '../../components/sections/CasesSection';
import CTASection from '../../components/sections/CTASection';

const Home = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'BGTech | Consultoria de IA para Empresas';
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <MetricsSection />
      <CasesSection />
      <CTASection />
    </>
  );
};

export default Home;