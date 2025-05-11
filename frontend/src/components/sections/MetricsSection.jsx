import React from 'react';
import { motion } from 'framer-motion';
import CounterAnimation from '../../components/animations/CounterAnimation';

const MetricsSection = () => {
  // Metrics data
  const metrics = [
    {
      id: 1,
      value: 40,
      suffix: '%',
      title: 'Redução de tarefas',
      description: 'Em média, de trabalho operacional',
    },
    {
      id: 2,
      value: 25,
      suffix: '%',
      title: 'Aumento de produtividade',
      description: 'Com automações e copilots',
    },
    {
      id: 3,
      value: 3,
      suffix: 'x',
      title: 'Maior precisão',
      description: 'Em processos críticos',
    },
    {
      id: 4,
      value: 120,
      suffix: 'h',
      title: 'Economizadas por mês',
      description: 'Em um projeto típico',
    },
  ];

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
    <section className="py-16 bg-gradient-to-t from-bgdark via-bgdark/95 to-transparent relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9" 
          alt="Business growth metrics" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="px-4 py-10 md:py-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold mb-4"
              variants={itemVariants}
            >
              Resultados <span className="text-gradient">Comprovados</span>
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Nossos clientes experimentam melhorias significativas em diversos indicadores após a implementação de nossas soluções.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {metrics.map((metric) => (
              <motion.div key={metric.id} variants={itemVariants}>
                <CounterAnimation
                  end={metric.value}
                  suffix={metric.suffix}
                  title={metric.title}
                  description={metric.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;