import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const MethodologyPage = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'Widia | Nossa Metodologia';
  }, []);

  const [activeStep, setActiveStep] = useState(1);
  
  // Methodology steps with expanded details for the page
  const steps = [
    {
      id: 1,
      title: 'Diagnóstico',
      subtitle: 'Entendendo seu negócio em profundidade',
      description: 'Análise detalhada dos seus processos atuais e identificação de oportunidades de melhoria.',
      fullDescription: 'Nossa fase de diagnóstico é um mergulho profundo nos processos e necessidades do seu negócio. Usamos técnicas avançadas de análise de dados e entrevistas com stakeholders-chave para identificar gargalos, ineficiências e oportunidades de automação e otimização. Esta etapa resulta em um mapa claro de onde a IA pode trazer mais valor para sua empresa.',
      activities: [
        'Entrevistas com stakeholders-chave',
        'Mapeamento de processos atuais',
        'Análise de dados disponíveis',
        'Identificação de gargalos e ineficiências',
        'Mapeamento de fluxos de trabalho manuais'
      ],
      deliverables: [
        'Relatório detalhado de diagnóstico',
        'Mapa de oportunidades priorizado por ROI',
        'Indicadores-chave de desempenho (KPIs) atuais',
        'Benchmark de mercado',
        'Recomendações iniciais'
      ],
      caseStudy: {
        title: 'Empresa de Logística',
        description: 'Um cliente do setor de logística tinha dificuldades com o tempo de processamento de pedidos. Nosso diagnóstico identificou que 85% do tempo era gasto em tarefas manuais de verificação e validação que poderiam ser automatizadas com IA.',
        results: 'Com base no diagnóstico, desenvolvemos um sistema que reduziu o tempo de processamento em 73%, aumentando a capacidade operacional em 4x.'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: 'Prototipagem',
      subtitle: 'Validando conceitos rapidamente',
      description: 'Desenvolvimento de uma prova de conceito rápida para validar o potencial das soluções propostas.',
      fullDescription: 'Na fase de prototipagem, transformamos os insights do diagnóstico em soluções funcionais de baixa fidelidade que podem ser testadas rapidamente. Usamos metodologias ágeis para criar um MVP (Produto Mínimo Viável) que demonstra o valor da solução proposta, permitindo validar premissas e refinar o direcionamento antes do investimento completo.',
      activities: [
        'Design de soluções baseadas em IA',
        'Desenvolvimento de prova de conceito',
        'Teste com dados reais',
        'Validação de hipóteses',
        'Calibração de algoritmos e modelos'
      ],
      deliverables: [
        'Protótipo funcional da solução',
        'Relatório de validação técnica',
        'Estimativa de resultados esperados',
        'Plano de implementação refinado',
        'Demonstração para stakeholders'
      ],
      caseStudy: {
        title: 'Instituição Financeira',
        description: 'Um banco precisava melhorar seu sistema de detecção de fraudes. Em apenas 3 semanas, desenvolvemos um protótipo de IA que analisava padrões de transações e sinalizava atividades suspeitas.',
        results: 'O protótipo identificou 28% mais transações fraudulentas que o sistema anterior, com uma redução de 60% nos falsos positivos.'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: 'Implementação',
      subtitle: 'Transformando conceitos em realidade',
      description: 'Desenvolvimento completo da solução, integração com seus sistemas e treinamento da equipe.',
      fullDescription: 'Após a validação do protótipo, avançamos para a implementação completa da solução. Nesta fase, desenvolvemos a solução em escala, integramos com seus sistemas existentes e preparamos sua equipe para trabalhar com a nova tecnologia. Todo o processo é gerenciado com metodologias ágeis, garantindo transparência e flexibilidade para ajustes durante o caminho.',
      activities: [
        'Desenvolvimento da solução completa',
        'Integração com sistemas existentes',
        'Testes abrangentes de qualidade',
        'Treinamento da equipe',
        'Migração de dados e processos'
      ],
      deliverables: [
        'Solução completa implementada',
        'Documentação técnica detalhada',
        'Manuais de uso e treinamento',
        'Plano de suporte e manutenção',
        'Relatório de testes e validação'
      ],
      caseStudy: {
        title: 'Indústria Manufatureira',
        description: 'Uma indústria de componentes eletrônicos precisava otimizar seu controle de qualidade. Implementamos um sistema de visão computacional para identificar defeitos em tempo real na linha de produção.',
        results: 'A taxa de detecção de defeitos aumentou em 96%, reduzindo em 82% o número de produtos defeituosos que chegavam aos clientes.'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: 'Monitoramento',
      subtitle: 'Garantindo resultados contínuos',
      description: 'Acompanhamento contínuo dos resultados, otimizações e suporte para garantir o máximo retorno.',
      fullDescription: 'O trabalho não termina com a implementação. Na fase de monitoramento, acompanhamos de perto o desempenho da solução, coletando métricas, identificando oportunidades de otimização e fornecendo suporte contínuo. Esta etapa é crucial para garantir que a solução continue evoluindo e gerando valor crescente ao longo do tempo.',
      activities: [
        'Monitoramento contínuo de KPIs',
        'Coleta de feedback dos usuários',
        'Identificação de pontos de melhoria',
        'Atualização e refinamento de algoritmos',
        'Suporte técnico e operacional'
      ],
      deliverables: [
        'Dashboards de monitoramento em tempo real',
        'Relatórios periódicos de desempenho',
        'Reuniões de acompanhamento',
        'Planos de evolução contínua',
        'Correções e atualizações conforme necessário'
      ],
      caseStudy: {
        title: 'Empresa de Varejo',
        description: 'Um grande varejista implementou nosso sistema de recomendação de produtos. Durante o monitoramento, identificamos que certas categorias tinham desempenho abaixo do esperado e otimizamos os algoritmos.',
        results: 'As melhorias resultaram em um aumento adicional de 18% na taxa de conversão e 23% no valor médio do pedido nessas categorias.'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
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

  // Refs for each section
  const refs = {
    overview: useRef(null),
    step1: useRef(null),
    step2: useRef(null),
    step3: useRef(null),
    step4: useRef(null),
    clientCases: useRef(null)
  };

  const isInViewOverview = useInView(refs.overview, { once: true, margin: "-100px" });
  const isInViewStep1 = useInView(refs.step1, { once: true, margin: "-100px" });
  const isInViewStep2 = useInView(refs.step2, { once: true, margin: "-100px" });
  const isInViewStep3 = useInView(refs.step3, { once: true, margin: "-100px" });
  const isInViewStep4 = useInView(refs.step4, { once: true, margin: "-100px" });
  const isInViewCases = useInView(refs.clientCases, { once: true, margin: "-100px" });

  return (
    <div className="pt-8 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/70">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978" 
            alt="Methodology background" 
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
              Nossa Metodologia
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Um framework sistemático para implementar IA de forma eficiente e com resultados mensuráveis
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => refs.overview.current.scrollIntoView({ behavior: 'smooth' })}
                variant="primary"
              >
                Ver Metodologia
              </Button>
              <Button 
                to="/contato"
                variant="outline"
              >
                Diagnóstico Gratuito
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="py-16" ref={refs.overview}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isInViewOverview ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Um Processo Comprovado"
              subtitle="Nossa abordagem é baseada em anos de experiência com projetos de IA bem-sucedidos"
              gradient={true}
            />
            
            <div className="max-w-4xl mx-auto mt-12 text-center text-lg text-gray-300">
              <p className="mb-6">
                A implementação bem-sucedida de IA não é apenas sobre tecnologia – é sobre entender profundamente seu negócio, criar soluções que resolvem problemas reais e garantir que elas continuem gerando valor ao longo do tempo.
              </p>
              <p className="mb-6">
                Nossa metodologia em 4 etapas foi desenvolvida para minimizar riscos, acelerar o tempo de implementação e maximizar o retorno sobre o investimento em cada projeto que realizamos.
              </p>
            </div>
          </motion.div>
          
          {/* Steps indicators */}
          <div className="mt-16">
            <div className="flex items-center justify-center mb-16 flex-wrap relative">
              {steps.map((step) => (
                <div key={step.id} className="relative">
                  <motion.button
                    className={`relative flex items-center justify-center w-20 h-20 rounded-full mx-6 mb-6 z-10 ${
                      activeStep === step.id ? 'bg-neon-green text-bgdark' : 'bg-white/5 text-white'
                    }`}
                    onClick={() => {
                      setActiveStep(step.id);
                      refs[`step${step.id}`].current.scrollIntoView({ behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-semibold">{step.id}</span>
                    </div>
                  </motion.button>
                  
                  {/* Line connector */}
                  {step.id !== steps.length && (
                    <div 
                      className={`hidden md:block absolute top-10 left-[84px] h-0.5 w-20 
                      ${activeStep >= step.id ? 'bg-neon-green' : 'bg-white/20'}`}
                    ></div>
                  )}
                  
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-max text-base font-medium text-center">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Methodology Sections */}
      {steps.map((step) => {
        const isInView = {
          1: isInViewStep1,
          2: isInViewStep2,
          3: isInViewStep3,
          4: isInViewStep4
        }[step.id];
        
        return (
          <section 
            key={step.id} 
            ref={refs[`step${step.id}`]} 
            className="py-24 relative overflow-hidden border-t border-white/10"
          >
            <div className="absolute inset-0 z-0 opacity-5">
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="container-custom relative z-10">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neon-green/20 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center text-white">
                    <span className="text-2xl font-bold">{step.id}</span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-teal-400">
                  {step.title}
                </h2>
                <p className="text-xl text-gray-300">{step.subtitle}</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                >
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Sobre esta fase</h3>
                    <p className="text-gray-300 text-lg mb-8">
                      {step.fullDescription}
                    </p>
                  </div>
                  
                  <GlassCard className="p-8 mb-8">
                    <h4 className="text-xl font-semibold mb-6 text-neon-green">Principais atividades</h4>
                    <ul className="space-y-3">
                      {step.activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-neon-green mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <span className="text-gray-200">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
                
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                >
                  <GlassCard className="p-8 mb-8">
                    <h4 className="text-xl font-semibold mb-6 text-neon-green">Entregas</h4>
                    <ul className="space-y-3">
                      {step.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-neon-green mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-gray-200">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                  
                  <GlassCard className="p-8 border-neon-green/30">
                    <h4 className="text-xl font-semibold mb-4 text-neon-green">Caso de Sucesso</h4>
                    <h5 className="text-lg font-medium mb-3 text-white">{step.caseStudy.title}</h5>
                    <p className="text-gray-300 mb-4">
                      {step.caseStudy.description}
                    </p>
                    <div className="bg-neon-green/10 p-4 rounded-lg border border-neon-green/20">
                      <h6 className="text-base font-medium mb-2 text-neon-green">Resultados:</h6>
                      <p className="text-gray-200">{step.caseStudy.results}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  to="/contato"
                  variant="primary"
                >
                  Iniciar com esta metodologia
                </Button>
              </div>
            </div>
          </section>
        );
      })}
      
      {/* Client Success */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/90" ref={refs.clientCases}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isInViewCases ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Resultados Comprovados"
              subtitle="Nossa metodologia já gerou impacto mensurável em diversos setores"
              gradient={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <GlassCard className="p-8 text-center">
                <div className="text-4xl font-bold text-neon-green mb-4">85%</div>
                <p className="text-gray-300">Redução média no tempo de processamento de tarefas manuais</p>
              </GlassCard>
              
              <GlassCard className="p-8 text-center">
                <div className="text-4xl font-bold text-neon-green mb-4">3-6x</div>
                <p className="text-gray-300">Retorno médio sobre o investimento em projetos de IA</p>
              </GlassCard>
              
              <GlassCard className="p-8 text-center">
                <div className="text-4xl font-bold text-neon-green mb-4">93%</div>
                <p className="text-gray-300">Taxa de satisfação dos clientes com os resultados alcançados</p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>
      
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
              Agende uma consulta gratuita e descubra como nossa metodologia pode ajudar sua empresa a alcançar resultados excepcionais com IA.
            </p>
            <Button 
              to="/contato" 
              variant="primary"
              size="large"
            >
              Agendar diagnóstico gratuito
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MethodologyPage;