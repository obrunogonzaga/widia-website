import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const AboutPage = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'BGTech | Sobre Nós';
  }, []);

  // Refs for animations
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

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

  // Team members data
  const teamMembers = [
    {
      name: 'Bruno Gonzaga',
      role: 'Fundador & CEO',
      bio: 'Engenheiro de software com mais de 15 anos de experiência em desenvolvimento de soluções tecnológicas para empresas de diversos segmentos. Especialista em Inteligência Artificial e automação de processos.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Ana Carolina Silva',
      role: 'CTO',
      bio: 'Mestre em Ciência da Computação com foco em Machine Learning. Liderou projetos de transformação digital em empresas do Fortune 500. Apaixonada por criar soluções de IA que resolvem problemas reais de negócios.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Rafael Mendes',
      role: 'Arquiteto de Soluções',
      bio: 'Especialista em arquitetura de sistemas e integração de tecnologias. Com background em engenharia de dados e infraestrutura, Rafael desenha soluções escaláveis e robustas para nossos clientes mais exigentes.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Company values
  const values = [
    {
      title: 'Inovação Prática',
      description: 'Buscamos constantemente novas tecnologias e métodos, mas sempre com foco em aplicações práticas que geram resultados mensuráveis.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Transparência',
      description: 'Acreditamos em relações de confiança. Por isso, mantemos total transparência em nossos processos, custos e resultados esperados.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Excelência Técnica',
      description: 'Nosso time é formado por especialistas em suas áreas, comprometidos com o mais alto padrão de qualidade técnica em todos os projetos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: 'Foco no Cliente',
      description: 'Entendemos profundamente o negócio de cada cliente para oferecer soluções verdadeiramente alinhadas com seus objetivos estratégicos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="pt-8 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/70">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" 
            alt="About background" 
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
              Sobre Nós
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Somos uma consultoria especializada em transformar negócios através da Inteligência Artificial e automação inteligente
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Na BGTech, nossa missão é democratizar o acesso à tecnologia de ponta para empresas de todos os tamanhos, com soluções personalizadas que geram resultados concretos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16" ref={missionRef}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Nossa Missão & Visão"
              subtitle="O que nos move e para onde estamos indo"
              gradient={true}
            />
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              animate={isMissionInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="mb-6 text-neon-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Nossa Missão</h3>
                <p className="text-gray-300">
                  Transformar empresas através da tecnologia, desenvolvendo soluções de IA e automação que aumentam a eficiência, reduzem custos e impulsionam o crescimento de negócios brasileiros.
                </p>
                <p className="text-gray-300 mt-4">
                  Acreditamos que toda empresa, independente do tamanho ou setor, merece acesso a ferramentas tecnológicas de ponta que as tornem mais competitivas e preparadas para o futuro.
                </p>
              </GlassCard>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={isMissionInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="mb-6 text-neon-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Nossa Visão</h3>
                <p className="text-gray-300">
                  Ser a principal referência em soluções de IA para o mercado brasileiro, reconhecida pela excelência técnica e pelo impacto positivo que geramos para nossos clientes.
                </p>
                <p className="text-gray-300 mt-4">
                  Queremos construir um futuro onde empresas brasileiras utilizem inteligência artificial não apenas como diferencial competitivo, mas como parte fundamental de suas operações diárias.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-r from-bgdark to-bgdark/90">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa História</h2>
              <div className="h-1 w-20 bg-neon-green mx-auto"></div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="prose prose-lg prose-invert max-w-none"
            >
              <p>
                A BGTech nasceu em 2019 da visão de Bruno Gonzaga, que após anos trabalhando com desenvolvimento de software para grandes corporações, identificou uma lacuna significativa: empresas de médio porte no Brasil tinham pouco acesso a soluções de IA verdadeiramente personalizadas para suas necessidades.
              </p>
              
              <p>
                Começamos como uma pequena consultoria focada em projetos de automação para o setor de serviços. Nosso primeiro cliente foi uma clínica médica que lutava com agendamentos e processos administrativos. A implementação de um sistema de automação inteligente reduziu em 60% o tempo gasto em tarefas manuais, permitindo que a equipe focasse no atendimento aos pacientes.
              </p>
              
              <p>
                Esse caso inicial de sucesso abriu portas para novos projetos, e rapidamente expandimos nossa equipe e escopo de atuação. Em 2021, com a aceleração da transformação digital causada pela pandemia, notamos uma demanda crescente por soluções mais avançadas de IA.
              </p>
              
              <p>
                Hoje, somos uma consultoria boutique com especialistas em diversas áreas da tecnologia, atendendo clientes de múltiplos setores. Nossa abordagem continua sendo a mesma desde o primeiro dia: entender profundamente o negócio do cliente e desenvolver soluções sob medida que geram resultados concretos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" ref={teamRef}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Nossa Equipe"
              subtitle="Conheça os especialistas por trás das nossas soluções"
              gradient={true}
            />
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={cardVariants}>
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className="mb-6 w-full h-64 rounded-lg overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-neon-green mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm flex-grow">{member.bio}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-neon-green transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-bgdark to-bgdark/90" ref={valuesRef}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <SectionTitle
              title="Nossos Valores"
              subtitle="Princípios que norteiam tudo o que fazemos"
              gradient={true}
            />
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={cardVariants}>
                <GlassCard className="p-6 h-full flex flex-col items-center text-center">
                  <div className="mb-6 text-neon-green">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Vamos Transformar Seu Negócio</h2>
            <p className="text-xl text-gray-300 mb-10">
              Estamos prontos para entender seus desafios e criar soluções que impulsionem sua empresa para o próximo nível.
            </p>
            <Button 
              to="/contato" 
              variant="primary"
              size="large"
            >
              Agendar Diagnóstico Gratuito
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;