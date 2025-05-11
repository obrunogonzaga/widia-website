import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const MethodologySection = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  // Methodology steps
  const steps = [
    {
      id: 1,
      title: 'Diagnóstico',
      description: 'Análise detalhada dos seus processos atuais e identificação de oportunidades de melhoria.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Prototipagem',
      description: 'Desenvolvimento de uma prova de conceito rápida para validar o potencial das soluções propostas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Implementação',
      description: 'Desenvolvimento completo da solução, integração com seus sistemas e treinamento da equipe.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Monitoramento',
      description: 'Acompanhamento contínuo dos resultados, otimizações e suporte para garantir o máximo retorno.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="metodologia">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full filter blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full filter blur-[120px] opacity-50"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
          alt="Methodology visualization" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <SectionTitle
          title="Nossa Metodologia"
          subtitle="Um framework estruturado em 4 etapas para garantir o sucesso do seu projeto"
          gradient={true}
        />
        
        <div className="mt-16">
          {/* Steps indicators */}
          <div className="flex items-center justify-center mb-16 flex-wrap">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <motion.button
                  className={`relative flex items-center justify-center w-16 h-16 rounded-full mx-4 mb-4 z-10 ${
                    activeStep === step.id ? 'bg-neon-green text-bgdark' : 'bg-white/5 text-white'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <span className="text-lg font-semibold">{step.id}</span>
                </motion.button>
                
                {/* Line connector */}
                {step.id !== steps.length && (
                  <div 
                    className={`hidden md:block absolute top-8 left-[68px] h-0.5 w-12 
                    ${activeStep >= step.id ? 'bg-neon-green' : 'bg-white/20'}`}
                  ></div>
                )}
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max text-sm font-medium text-center">
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          
          {/* Active step content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-8 md:p-12 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4 flex justify-center md:justify-start">
                  <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center">
                    {steps[activeStep - 1].icon}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-semibold mb-4">
                    Etapa {activeStep}: {steps[activeStep - 1].title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {steps[activeStep - 1].description}
                  </p>
                  <Button to="/metodologia" variant="outline">
                    Saiba mais sobre nossa metodologia
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;