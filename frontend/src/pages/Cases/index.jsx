import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const CasesPage = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'Widia | Casos de Sucesso';
  }, []);

  const location = useLocation();
  const hash = location.hash;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);

  // Scroll to the specific case if hash is present
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const caseData = cases.find(c => c.id === id);
      if (caseData) {
        setSelectedCase(caseData);
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'automation', name: 'Automação' },
    { id: 'finance', name: 'Financeiro' },
    { id: 'healthcare', name: 'Saúde' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  // Case studies data - expanded from the CasesSection with additional information
  const cases = [
    {
      id: 'nutrition-bot',
      title: 'Bot para Nutricionistas',
      subtitle: 'Telegram',
      category: 'healthcare',
      tags: ['Saúde', 'Telegram Bot', 'Automação'],
      shortDescription: 'Desenvolvemos um bot personalizado para uma clínica de nutrição que aumentou em 40% a taxa de comparecimento às consultas através de lembretes e orientações automáticas.',
      fullDescription: 'Uma clínica de nutrição com mais de 300 pacientes ativos enfrentava desafios com cancelamentos de última hora, esquecimento de consultas e sobrecarga da equipe com atendimentos de rotina que poderiam ser automatizados.',
      problem: [
        'Alta taxa de ausência em consultas agendadas (cerca de 30%)',
        'Tempo excessivo gasto com lembretes manuais por telefone',
        'Dificuldade dos pacientes em manter registros alimentares consistentes',
        'Muitas dúvidas simples ocupando tempo da equipe de nutricionistas'
      ],
      solution: [
        'Desenvolvimento de um bot para Telegram integrado ao sistema de agendamento',
        'Implementação de lembretes automáticos 24h e 1h antes das consultas',
        'Criação de sistema de registro alimentar via chatbot com reconhecimento de imagens',
        'Base de conhecimento integrada para responder perguntas frequentes',
        'Dashboard para nutricionistas acompanharem progresso dos pacientes remotamente'
      ],
      implementation: 'Implementamos o bot em fases, começando pelos lembretes automáticos e expandindo gradualmente para as funcionalidades mais complexas. Utilizamos tecnologias de processamento de linguagem natural para entender perguntas dos pacientes e machine learning para reconhecimento de alimentos em imagens.',
      technologies: ['Python', 'Telegram API', 'Natural Language Processing', 'Machine Learning', 'Integração com calendário', 'Banco de dados NoSQL'],
      timeline: '3 meses do conceito à implementação completa',
      metrics: [
        { value: '+40%', label: 'Comparecimento às consultas' },
        { value: '-25%', label: 'Tempo em atendimentos de rotina' },
        { value: '+60%', label: 'Satisfação dos pacientes' },
        { value: '85%', label: 'Precisão no reconhecimento de alimentos' },
        { value: '12h/semana', label: 'Tempo economizado pela equipe' }
      ],
      quote: "A automação transformou completamente o fluxo de trabalho da clínica. Agora consigo acompanhar mais pacientes com menos trabalho administrativo.",
      author: "Dra. Ana Clara",
      role: "Nutricionista Clínica",
      image: "https://images.unsplash.com/photo-1594020293008-5f99f60bd4d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      results: 'Com a implementação do bot, a clínica conseguiu reduzir significativamente as ausências em consultas, otimizar o trabalho da equipe e melhorar o acompanhamento nutricional dos pacientes. O sucesso foi tão grande que a solução foi expandida para mais 5 clínicas parceiras.',
      relatedCases: ['finance-automation', 'ecommerce-recommendation']
    },
    {
      id: 'finance-automation',
      title: 'Automação Financeira',
      subtitle: 'Planilhas e ERP',
      category: 'finance',
      tags: ['Financeiro', 'Automação', 'ERP'],
      shortDescription: 'Criamos uma automação para o processamento financeiro de um curso online que economizou 120 horas por mês em trabalho manual, eliminando erros e agilizando pagamentos.',
      fullDescription: 'Uma empresa de cursos online com mais de 500 alunos ativos precisava gerenciar pagamentos recorrentes, devoluções, comissões para afiliados e gerar relatórios financeiros, tudo manualmente através de planilhas e processos desconectados.',
      problem: [
        'Processamento manual de aproximadamente 700 transações mensais',
        'Erros frequentes na conciliação bancária e pagamento de comissões',
        'Atraso de até 5 dias para processar pagamentos a afiliados',
        'Dificuldade em obter visão consolidada do desempenho financeiro',
        'Equipe dedicando 30 horas semanais apenas para tarefas manuais de processamento'
      ],
      solution: [
        'Desenvolvimento de sistema automatizado para integrar plataforma de pagamento, banco e ERP',
        'Criação de fluxos de verificação e validação automática de transações',
        'Implementação de dashboard em tempo real com KPIs financeiros',
        'Automatização completa do cálculo e pagamento de comissões',
        'Sistema de alertas para exceções que necessitam de intervenção humana'
      ],
      implementation: 'Desenvolvemos uma solução personalizada que se integra com as APIs dos sistemas existentes e automatiza todo o fluxo financeiro. O sistema verifica transações a cada 30 minutos, categoriza, reconcilia e dispara os processos necessários para cada tipo de operação.',
      technologies: ['Python', 'Node.js', 'API Integrations', 'SQL Database', 'Microsoft Power BI', 'RPA (Robotic Process Automation)'],
      timeline: '2 meses para implementação completa',
      metrics: [
        { value: '120h', label: 'Economizadas por mês' },
        { value: '100%', label: 'Redução de erros manuais' },
        { value: '2 dias', label: 'Redução no tempo de pagamento' },
        { value: '99.8%', label: 'Precisão nas conciliações' },
        { value: 'R$15.000', label: 'Economia mensal em custos operacionais' }
      ],
      quote: "Antes da automação, precisávamos de três pessoas para gerenciar todos os pagamentos. Agora, uma pessoa consegue fazer tudo em menos tempo e sem erros.",
      author: "Roberto Mendes",
      role: "Diretor Financeiro",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      results: 'A automação permitiu à empresa não apenas reduzir custos operacionais e eliminar erros, mas também escalar seu negócio sem precisar aumentar proporcionalmente a equipe financeira. O tempo de processamento de pagamentos foi reduzido de 5 dias para apenas algumas horas.',
      relatedCases: ['nutrition-bot', 'ecommerce-recommendation']
    },
    {
      id: 'ecommerce-recommendation',
      title: 'Sistema de Recomendação',
      subtitle: 'E-commerce',
      category: 'ecommerce',
      tags: ['E-commerce', 'IA', 'Machine Learning'],
      shortDescription: 'Implementamos um sistema de recomendação personalizado para um e-commerce que aumentou o valor médio dos pedidos em 32% e melhorou a conversão de vendas.',
      fullDescription: 'Um e-commerce com mais de 5.000 produtos e 50.000 clientes ativos estava utilizando recomendações genéricas baseadas apenas em popularidade, sem considerar o comportamento individual do usuário ou contexto de navegação.',
      problem: [
        'Baixa taxa de conversão em páginas de produto (2.1%)',
        'Alto índice de abandono de carrinho (78%)',
        'Recomendações irrelevantes para muitos usuários',
        'Valor médio de pedido abaixo do benchmark do setor',
        'Dificuldade dos clientes em encontrar produtos complementares'
      ],
      solution: [
        'Desenvolvimento de sistema de recomendação baseado em IA',
        'Segmentação de usuários com base em comportamento e histórico',
        'Implementação de algoritmos de filtragem colaborativa e baseada em conteúdo',
        'Personalização em tempo real considerando contexto da sessão atual',
        'Recomendações inteligentes em carrinhos de compra e e-mails pós-compra'
      ],
      implementation: 'Criamos um sistema de recomendação híbrido que combina múltiplas técnicas de IA. O sistema analisa o histórico de navegação, compras anteriores, comportamento de usuários similares e contexto atual para gerar recomendações altamente relevantes.',
      technologies: ['Python', 'TensorFlow', 'Machine Learning', 'API RESTful', 'Redis Cache', 'AWS Infrastructure'],
      timeline: '4 meses para desenvolvimento e implementação completa',
      metrics: [
        { value: '+32%', label: 'Valor médio do pedido' },
        { value: '+28%', label: 'Taxa de conversão' },
        { value: '-15%', label: 'Taxa de abandono de carrinho' },
        { value: '+47%', label: 'Cliques em produtos recomendados' },
        { value: '+22%', label: 'Receita total mensal' }
      ],
      quote: "O sistema de recomendação transformou completamente nossa operação de e-commerce. Os clientes estão encontrando exatamente o que procuram, muitas vezes antes mesmo de começarem a buscar.",
      author: "Camila Rocha",
      role: "Gerente de E-commerce",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      results: 'A implementação do sistema de recomendação inteligente resultou em um aumento significativo do engajamento dos usuários, maior valor médio de pedido e crescimento consistente da receita. O ROI do projeto foi alcançado em apenas 2 meses após o lançamento completo.',
      relatedCases: ['finance-automation', 'manufacturing-quality']
    },
    {
      id: 'manufacturing-quality',
      title: 'Controle de Qualidade',
      subtitle: 'Indústria',
      category: 'automation',
      tags: ['Indústria', 'Visão Computacional', 'IA'],
      shortDescription: 'Desenvolvemos um sistema de visão computacional para detecção automática de defeitos em uma linha de produção industrial, reduzindo retrabalho e devoluções.',
      fullDescription: 'Uma indústria de componentes eletrônicos com produção de mais de 50.000 unidades por dia enfrentava desafios com seu processo manual de inspeção de qualidade, que era lento, inconsistente e propenso a falhas humanas.',
      problem: [
        'Taxa de detecção de defeitos de apenas 83% com inspeção manual',
        'Alto índice de devolução de produtos com defeitos não detectados (3.8%)',
        'Processo de inspeção criando gargalo na linha de produção',
        'Inconsistência entre diferentes turnos e inspetores',
        'Custos crescentes com retrabalho e garantia'
      ],
      solution: [
        'Implementação de sistema de visão computacional com múltiplas câmeras de alta resolução',
        'Desenvolvimento de algoritmos de IA para detecção de 18 tipos diferentes de defeitos',
        'Integração com a linha de produção para separação automática de itens com problemas',
        'Dashboard em tempo real mostrando métricas de qualidade e tipos de defeitos',
        'Sistema de aprendizado contínuo para melhorar a precisão ao longo do tempo'
      ],
      implementation: 'Instalamos um conjunto de câmeras de alta resolução em pontos estratégicos da linha de produção. Os algoritmos de visão computacional foram treinados com milhares de imagens de produtos com e sem defeitos, e ajustados para maximizar a precisão de detecção.',
      technologies: ['Computer Vision', 'Deep Learning', 'Convolutional Neural Networks', 'Industrial Cameras', 'Edge Computing', 'IoT Integration'],
      timeline: '5 meses do conceito à implementação completa',
      metrics: [
        { value: '99.2%', label: 'Taxa de detecção de defeitos' },
        { value: '-95%', label: 'Redução em devoluções' },
        { value: '+40%', label: 'Velocidade da inspeção' },
        { value: 'R$430k', label: 'Economia anual' },
        { value: '-70%', label: 'Redução em retrabalho' }
      ],
      quote: "O sistema de IA para controle de qualidade superou todas as nossas expectativas. Conseguimos aumentar a produção e, ao mesmo tempo, melhorar drasticamente a qualidade dos produtos entregues aos clientes.",
      author: "Marcos Oliveira",
      role: "Gerente de Produção",
      image: "https://images.unsplash.com/photo-1565343122714-6ead24490186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      results: 'O sistema de visão computacional transformou o controle de qualidade da empresa, eliminando quase completamente as devoluções por defeitos não detectados e acelerando o processo de produção. A solução se pagou em menos de 7 meses através da redução de custos com garantia e retrabalho.',
      relatedCases: ['ecommerce-recommendation', 'nutrition-bot']
    }
  ];

  // Filtered cases based on selected category
  const filteredCases = selectedCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Refs for sections
  const overviewRef = useRef(null);
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-8 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/70">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
            alt="Cases background" 
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
              Casos de Sucesso
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Conheça histórias reais de empresas que transformaram seus negócios com nossas soluções de IA
            </p>
            <Button 
              onClick={() => overviewRef.current.scrollIntoView({ behavior: 'smooth' })}
              variant="primary"
            >
              Ver Casos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cases Overview Section */}
      <section className="py-16" ref={overviewRef}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isOverviewInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Resultados Concretos"
              subtitle="Soluções que geram impacto mensurável para nossos clientes"
              gradient={true}
            />
          </motion.div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center mt-12 mb-16 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-neon-green text-bgdark font-semibold'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Cases grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isOverviewInView ? "visible" : "hidden"}
          >
            {filteredCases.map((caseItem) => (
              <motion.div key={caseItem.id} variants={cardVariants}>
                <GlassCard 
                  className="h-full p-6 flex flex-col transition-all duration-300 hover:border-neon-green/30 overflow-hidden group"
                  tilt={true}
                  glowOnHover={true}
                >
                  <div className="h-48 overflow-hidden rounded-lg -mx-6 -mt-6 mb-6 relative">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgdark/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {caseItem.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-2">{caseItem.title}</h3>
                  <p className="text-gray-300 mb-6 line-clamp-3">{caseItem.shortDescription}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {caseItem.metrics.slice(0, 3).map((metric, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-xl font-semibold text-neon-green mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-2">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      to={`/casos#${caseItem.id}`} 
                      className="text-neon-green hover:text-white flex items-center group"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      Ver caso completo
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Case Section (shown when a case is selected) */}
      {selectedCase && (
        <section 
          id={selectedCase.id} 
          className="py-20 relative border-t border-white/10"
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <Button 
                onClick={() => {
                  setSelectedCase(null);
                  window.history.pushState({}, '', '/casos');
                  overviewRef.current.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="mb-12"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para todos os casos
              </Button>
              
              {/* Case header */}
              <div className="mb-16">
                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedCase.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-teal-400">
                  {selectedCase.title}
                </h2>
                <p className="text-xl text-gray-300">
                  {selectedCase.fullDescription}
                </p>
              </div>
              
              {/* Featured image */}
              <div className="w-full h-96 rounded-xl overflow-hidden mb-16 relative">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgdark/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 max-w-lg">
                  <div className="text-xl font-medium mb-2 text-white">"<span className="italic">{selectedCase.quote}</span>"</div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-bgdark font-bold text-lg">
                      {selectedCase.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold">{selectedCase.author}</div>
                      <div className="text-sm text-gray-300">{selectedCase.role}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Problem & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-neon-green">O Desafio</h3>
                  <ul className="space-y-3">
                    {selectedCase.problem.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-3 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </span>
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
                
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-neon-green">Nossa Solução</h3>
                  <ul className="space-y-3">
                    {selectedCase.solution.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-neon-green mr-3 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
              
              {/* Implementation details */}
              <GlassCard className="p-8 mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-neon-green">Implementação</h3>
                <p className="text-gray-300 mb-8">{selectedCase.implementation}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium mb-4">Tecnologias Utilizadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full text-sm font-medium text-neon-green">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-4">Timeline</h4>
                    <div className="flex items-center">
                      <span className="text-neon-green mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-gray-200">{selectedCase.timeline}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Results & Metrics */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-center">Resultados</h3>
                <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">{selectedCase.results}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {selectedCase.metrics.map((metric, index) => (
                    <GlassCard key={index} className="p-4 text-center">
                      <div className="text-2xl md:text-3xl font-bold text-neon-green mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {metric.label}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {/* Related cases */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-center">Casos Relacionados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCase.relatedCases.map((relatedId) => {
                    const relatedCase = cases.find(c => c.id === relatedId);
                    if (!relatedCase) return null;
                    
                    return (
                      <GlassCard 
                        key={relatedId} 
                        className="p-6 flex flex-col md:flex-row gap-6 group cursor-pointer hover:border-neon-green/30"
                        onClick={() => {
                          setSelectedCase(relatedCase);
                          window.history.pushState({}, '', `/casos#${relatedId}`);
                          document.getElementById(relatedId)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div className="md:w-1/3 h-32 rounded-lg overflow-hidden">
                          <img 
                            src={relatedCase.image} 
                            alt={relatedCase.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="text-xl font-semibold mb-2 group-hover:text-neon-green transition-colors">{relatedCase.title}</h4>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{relatedCase.shortDescription}</p>
                          <div className="flex gap-2">
                            {relatedCase.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-white/5 rounded-full text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bgdark to-bgdark/90 border-t border-white/10">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Pronto para impulsionar seu negócio?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Agende uma consulta gratuita e descubra como podemos criar uma solução personalizada para sua empresa.
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

export default CasesPage;