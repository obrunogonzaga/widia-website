import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';

const CTASection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bgdark via-bgdark to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-neon-green/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-20 left-0 w-80 h-80 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
            variants={itemVariants}
          >
            Pronto para transformar sua empresa com{' '}
            <span className="text-gradient">inteligência artificial</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Agende uma conversa de 30 minutos para um diagnóstico gratuito e descubra como podemos ajudar sua empresa a crescer.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button 
              to="/contato" 
              variant="primary" 
              className="text-lg px-8 py-4"
            >
              Agendar Diagnóstico Gratuito
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-sm text-gray-400"
            variants={itemVariants}
          >
            Sem compromisso. Sem pressão de vendas.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;