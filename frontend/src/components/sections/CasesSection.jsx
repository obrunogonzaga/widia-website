import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const CasesSection = () => {
  const [activeCase, setActiveCase] = useState(0);
  
  // Cases data
  const cases = [
    {
      id: 1,
      title: 'Bot para Nutricionistas',
      subtitle: 'Telegram',
      description: 'Desenvolvemos um bot personalizado para uma clínica de nutrição que aumentou em 40% a taxa de comparecimento às consultas através de lembretes e orientações automáticas.',
      metrics: [
        { value: '+40%', label: 'Comparecimento às consultas' },
        { value: '-25%', label: 'Tempo em atendimentos de rotina' },
        { value: '+60%', label: 'Satisfação dos pacientes' }
      ],
      quote: "A automação transformou completamente o fluxo de trabalho da clínica. Agora consigo acompanhar mais pacientes com menos trabalho administrativo.",
      author: "Dra. Ana Clara",
      role: "Nutricionista Clínica"
    },
    {
      id: 2,
      title: 'Automação Financeira',
      subtitle: 'Planilhas e ERP',
      description: 'Criamos uma automação para o processamento financeiro de um curso online que economizou 120 horas por mês em trabalho manual, eliminando erros e agilizando pagamentos.',
      metrics: [
        { value: '120h', label: 'Economizadas por mês' },
        { value: '100%', label: 'Redução de erros manuais' },
        { value: '2 dias', label: 'Redução no tempo de pagamento' }
      ],
      quote: "Antes da automação, precisávamos de três pessoas para gerenciar todos os pagamentos. Agora, uma pessoa consegue fazer tudo em menos tempo e sem erros.",
      author: "Roberto Mendes",
      role: "Diretor Financeiro"
    }
  ];
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" id="casos">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9" 
          alt="Business data visualization" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bgdark via-bgdark/80 to-bgdark/60"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <SectionTitle
          title="Casos de Sucesso"
          subtitle="Resultados reais que transformaram negócios como o seu"
          gradient={true}
        />
        
        <div className="mt-16">
          {/* Case tabs */}
          <div className="flex justify-center mb-12 space-x-4">
            {cases.map((c, index) => (
              <button
                key={c.id}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCase === index 
                    ? 'bg-neon-green text-bgdark font-semibold'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveCase(index)}
              >
                {c.title}
              </button>
            ))}
          </div>
          
          {/* Case content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <GlassCard className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center mb-6">
                      <h3 className="text-2xl font-semibold">{cases[activeCase].title}</h3>
                      <span className="ml-3 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                        {cases[activeCase].subtitle}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-8">
                      {cases[activeCase].description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      {cases[activeCase].metrics.map((metric, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-semibold text-neon-green mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button to="/casos" variant="outline">
                        Ver estudo de caso completo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="bg-white/5 rounded-xl p-6 md:p-8 relative">
                      {/* Quote marks */}
                      <div className="absolute top-4 left-4 text-neon-green/20 text-6xl font-serif">
                        "
                      </div>
                      <div className="relative z-10">
                        <p className="text-lg italic mb-6">
                          "{cases[activeCase].quote}"
                        </p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center text-bgdark font-bold text-xl">
                            {cases[activeCase].author.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold">{cases[activeCase].author}</div>
                            <div className="text-sm text-gray-400">{cases[activeCase].role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;