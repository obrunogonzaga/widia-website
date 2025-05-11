import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import GlassCard from '../../components/ui/GlassCard';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';

const ServicesPage = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'Widia | Nossos Serviços';
  }, []);

  const location = useLocation();
  const hash = location.hash;

  // Scroll to the section based on the hash
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  // Services data (same as in ServicesSection)
  const services = [
    {
      id: 'automacoes',
      title: 'Automações',
      subtitle: 'Libere o potencial da sua equipe',
      description: 'Automatize tarefas repetitivas e processos manuais para liberar o potencial da sua equipe. Nossas soluções de automação são desenvolvidas para otimizar fluxos de trabalho, reduzir erros e aumentar a produtividade.',
      features: [
        'Integração entre sistemas',
        'Automação de documentos',
        'Fluxos de trabalho inteligentes'
      ],
      benefits: [
        'Redução de até 80% no tempo de execução de tarefas manuais',
        'Eliminação de erros humanos em processos repetitivos',
        'Liberação da equipe para atividades estratégicas',
        'Economia de recursos financeiros e humanos'
      ],
      howItWorks: [
        'Identificação de processos repetitivos',
        'Análise de viabilidade e ROI',
        'Desenvolvimento da solução personalizada',
        'Implantação gradual e acompanhamento de resultados',
        'Monitoramento contínuo e melhorias'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'copilots',
      title: 'Copilots',
      subtitle: 'Assistentes virtuais inteligentes',
      description: 'Assistentes virtuais que aprendem com seus dados e ajudam a sua equipe a tomar decisões melhores. Nossos copilots são desenvolvidos com IA avançada e treinados com os dados da sua empresa para fornecer insights valiosos e automatizar interações complexas.',
      features: [
        'Respostas baseadas em seus dados',
        'Interface conversacional',
        'Aprendizado contínuo'
      ],
      benefits: [
        'Acesso instantâneo a informações críticas',
        'Redução do tempo de onboarding de novos colaboradores',
        'Melhor experiência de atendimento ao cliente',
        'Centralização do conhecimento da empresa'
      ],
      howItWorks: [
        'Identificação das fontes de dados e conhecimento',
        'Treinamento do modelo com dados específicos da empresa',
        'Desenvolvimento da interface conversacional',
        'Testes e validação com usuários reais',
        'Implantação e monitoramento contínuo'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'consultoria',
      title: 'Consultoria',
      subtitle: 'Estratégia de IA para seu negócio',
      description: 'Orientação estratégica para implementar IA de forma eficiente e com retorno mensurável. Nossa consultoria ajuda empresas a identificar oportunidades, planejar a implementação e medir o impacto da inteligência artificial nos negócios.',
      features: [
        'Diagnóstico de processos',
        'Roadmap de implementação',
        'Treinamento de equipes'
      ],
      benefits: [
        'Estratégia clara de implementação de IA',
        'Priorização de projetos com maior ROI',
        'Capacitação da equipe interna',
        'Redução de riscos na adoção de novas tecnologias'
      ],
      howItWorks: [
        'Diagnóstico completo dos processos atuais',
        'Identificação de oportunidades de implementação de IA',
        'Elaboração de roadmap estratégico',
        'Recomendação de tecnologias e ferramentas',
        'Acompanhamento da implementação e medição de resultados'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="pt-8 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/70">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485" 
            alt="Services background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-teal-400">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Soluções inovadoras que combinam IA avançada com expertise de negócios para transformar sua empresa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container-custom">
          <SectionTitle
            title="Nosso Portfólio"
            subtitle="Conheça todas as nossas soluções de IA aplicada"
            gradient={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {services.map((service) => (
              <GlassCard 
                key={service.id}
                className="h-full p-8 flex flex-col transition-all duration-300 hover:border-neon-green/30"
                tilt={true}
                glowOnHover={true}
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="mb-8 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-neon-green mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button 
                    to={`#${service.id}`} 
                    variant="primary"
                    className="w-full"
                  >
                    Ver detalhes
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service) => {
        const sectionRef = useRef(null);
        const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
        
        return (
          <section 
            key={service.id} 
            id={service.id} 
            className="py-24 relative overflow-hidden border-t border-white/10"
          >
            <div className="absolute inset-0 z-0 opacity-5">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="container-custom relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  ref={sectionRef}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">{service.icon}</div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-teal-400">
                        {service.title}
                      </h2>
                      <p className="text-xl text-gray-300">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    {service.description}
                  </p>
                  
                  <Button 
                    to="/contato" 
                    variant="primary"
                    className="mb-12"
                  >
                    Solicitar diagnóstico gratuito
                  </Button>
                </motion.div>
                
                <motion.div
                  ref={sectionRef}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <GlassCard className="p-8 mb-8">
                    <h3 className="text-2xl font-semibold mb-6 text-neon-green">Benefícios</h3>
                    <motion.ul className="space-y-4" variants={staggerContainer}>
                      {service.benefits.map((benefit, index) => (
                        <motion.li key={index} className="flex items-start" variants={fadeInUp}>
                          <span className="text-neon-green mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <span className="text-gray-200">{benefit}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </GlassCard>
                </motion.div>
              </div>
              
              <motion.div
                className="mt-16"
                ref={sectionRef}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-neon-green">Como funciona</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {service.howItWorks.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-bold mb-4">
                            {index + 1}
                          </div>
                          <p className="text-gray-200">{step}</p>
                        </div>
                        {index < service.howItWorks.length - 1 && (
                          <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-neon-green/30" style={{ width: 'calc(100% - 3rem)', left: 'calc(50% + 1.5rem)' }}>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 border-t-2 border-r-2 border-neon-green/30"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </section>
        );
      })}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bgdark to-bgdark/90">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Agende uma consulta gratuita e descubra como nossas soluções podem impulsionar sua empresa.
            </p>
            <Button 
              to="/contato" 
              variant="primary"
              size="large"
            >
              Iniciar agora
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;