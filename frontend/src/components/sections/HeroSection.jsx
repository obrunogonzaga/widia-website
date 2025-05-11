import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Button from '../../components/ui/Button';

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bgdark via-bgdark to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bgdark via-bgdark/90 to-transparent"></div>
        <div className="absolute top-40 right-0 w-80 h-80 bg-neon-green/20 rounded-full filter blur-[100px] opacity-60"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-neon-blue/20 rounded-full filter blur-[100px] opacity-60"></div>
      </div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1625314868143-20e93ce3ff33" 
          alt="AI Technology Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            variants={itemVariants}
          >
            <span className="block mb-2">Transformamos seu negócio com</span>
            <TypeAnimation
              sequence={[
                'Automações Inteligentes',
                2000,
                'Copilots Personalizados',
                2000,
                'Inteligência Artificial',
                2000
              ]}
              wrapper="span"
              speed={50}
              className="text-gradient"
              repeat={Infinity}
            />
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Consultoria boutique especializada em criar soluções de IA práticas e com ROI rápido para PMEs brasileiras.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button to="/contato" variant="primary" className="w-full sm:w-auto">
              Diagnóstico Gratuito
            </Button>
            <Button to="/servicos" variant="outline" className="w-full sm:w-auto">
              Conheça Nossos Serviços
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-12 p-3 inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm rounded-full"
            variants={itemVariants}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-sm font-medium">
              Redução de <span className="text-neon-green">40%</span> em tarefas operacionais
            </span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-sm text-gray-400 mb-2">Scroll para descobrir</span>
          <motion.div 
            className="w-6 h-10 border-2 border-neon-green/30 rounded-full flex justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div 
              className="w-1 h-2 bg-neon-green rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;