import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/ui/SectionTitle';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const ContactPage = () => {
  // Apply page title and meta tags
  useEffect(() => {
    document.title = 'Widia Digital | Contato';
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'geral'
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    // Phone validation (optional but validate if provided)
    if (formData.phone && !/^(\([0-9]{2}\) ?|[0-9]{2}-)?[0-9]{4,5}-?[0-9]{4}$/.test(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.length < 20) {
      newErrors.message = 'Mensagem muito curta (mínimo 20 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setSubmitSuccess(false);
    setSubmitError(false);
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Send data to backend API
        console.log('Submitting form:', formData);
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: 'geral'
        });
        
        setSubmitSuccess(true);
        setIsSubmitting(false);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(true);
        setIsSubmitting(false);
      }
    }
  };

  // Service options
  const serviceOptions = [
    { value: 'geral', label: 'Informações Gerais' },
    { value: 'automacao', label: 'Automação de Processos' },
    { value: 'copilot', label: 'Desenvolvimento de Copilots' },
    { value: 'consultoria', label: 'Consultoria de IA' },
    { value: 'parceria', label: 'Proposta de Parceria' }
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

  return (
    <div className="pt-8 pb-20">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-b from-bgdark to-bgdark/70">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a" 
            alt="Contact background" 
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
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Estamos prontos para ajudar sua empresa a crescer com soluções de IA personalizadas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SectionTitle
                title="Agende um Diagnóstico"
                subtitle="Fale conosco e descubra como podemos transformar seu negócio"
                gradient={true}
                className="text-left"
              />
              
              <GlassCard className="p-8 mt-8">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-neon-green mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Mensagem Enviada!</h3>
                    <p className="text-gray-300 mb-6">
                      Obrigado pelo seu contato. Nossa equipe retornará em até 24 horas úteis.
                    </p>
                    <Button 
                      onClick={() => setSubmitSuccess(false)} 
                      variant="primary"
                    >
                      Enviar Nova Mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Nome Completo <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-white/20'} bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none`}
                          placeholder="Seu nome"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          E-mail <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-white/20'} bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none`}
                          placeholder="seu@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-white/20'} bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none`}
                          placeholder="(00) 00000-0000"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                        )}
                      </div>
                      
                      {/* Company Field */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full p-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none"
                          placeholder="Nome da sua empresa"
                        />
                      </div>
                    </div>
                    
                    {/* Service Field */}
                    <div className="mb-6">
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                        Tipo de Serviço
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none"
                      >
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-bgdark">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Message Field */}
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Mensagem <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full p-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-white/20'} bg-white/5 backdrop-blur-sm focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all duration-300 outline-none`}
                        placeholder="Como podemos ajudar sua empresa?"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </span>
                        ) : 'Agendar Diagnóstico Gratuito'}
                      </Button>
                      
                      {submitError && (
                        <p className="mt-4 text-sm text-red-400">
                          Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </GlassCard>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SectionTitle
                title="Informações de Contato"
                subtitle="Várias formas de falar conosco"
                gradient={true}
                className="text-left"
              />
              
              <GlassCard className="p-8 mt-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-neon-green/10 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">E-mail</h3>
                      <a
                        href="mailto:contato@widia.io"
                        className="text-gray-300 hover:text-neon-green transition-colors"
                      >
                        contato@widia.io
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        Respondemos em até 24 horas úteis
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-green/10 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Telefone</h3>
                      <a 
                        href="tel:+5541995203400" 
                        className="text-gray-300 hover:text-neon-green transition-colors"
                      >
                        (41) 9 9520-3400
                      </a>
                      <p className="text-sm text-gray-400 mt-1">
                        Segunda a Sexta, 9h às 18h
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-green/10 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Endereço</h3>
                      <p className="text-gray-300">
                        R. Francisco Rocha, 198 - Batel<br />
                        Curitiba, PR, 80420-130
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Atendimento com hora marcada
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-green/10 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Redes Sociais</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                          </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                          </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Google Maps Embed */}
              <GlassCard className="overflow-hidden h-72">
                <div className="h-full w-full relative">
                  <iframe
                    title="Widia Digital Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.048587608577!2d-49.29088642472183!3d-25.43211183790508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce3836807363f%3A0xdbed6e359826fcba!2sR.%20Francisco%20Rocha%2C%20198%20-%20Batel%2C%20Curitiba%20-%20PR%2C%2080420-130!5e0!3m2!1sen!2sbr!4v1715734150962!5m2!1sen!2sbr"
                    className="h-full w-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button 
                      href="https://maps.app.goo.gl/XKrwEbx1gCi2hTuM7" 
                      target="_blank"
                      variant="primary"
                      size="small"
                      className="inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Ver no Google Maps
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-r from-bgdark to-bgdark/90">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perguntas Frequentes</h2>
            <p className="text-gray-300">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              {[
                {
                  question: "Como funciona o diagnóstico gratuito?",
                  answer: "O diagnóstico gratuito é uma conversa de 30 minutos com um de nossos especialistas, onde analisamos os principais desafios da sua empresa e identificamos oportunidades para aplicação de IA e automação. Após essa conversa, enviamos um relatório com recomendações iniciais."
                },
                {
                  question: "Qual o investimento médio para implementar uma solução de IA?",
                  answer: "O investimento varia de acordo com a complexidade e escopo do projeto. Temos soluções a partir de R$ 15.000 para automações simples, até projetos mais complexos que podem chegar a R$ 100.000 ou mais. Durante o diagnóstico, apresentamos opções que se adequam ao seu orçamento."
                },
                {
                  question: "Quanto tempo leva para implementar uma solução?",
                  answer: "O prazo de implementação depende da complexidade da solução. Automações simples podem ser implementadas em 2-4 semanas, enquanto projetos mais complexos de IA podem levar de 3 a 6 meses. Trabalhamos com entregas incrementais para garantir valor desde as primeiras semanas."
                },
                {
                  question: "Vocês oferecem suporte após a implementação?",
                  answer: "Sim, oferecemos planos de suporte contínuo para todas as nossas soluções. Isso inclui monitoramento, ajustes, atualizações e treinamentos periódicos. Nosso objetivo é garantir que sua solução continue gerando valor a longo prazo."
                },
                {
                  question: "Precisamos ter um departamento de TI para implementar essas soluções?",
                  answer: "Não, nossas soluções são projetadas para serem de fácil utilização mesmo para empresas sem equipe de TI dedicada. Fornecemos todo o suporte necessário para a implementação e treinamos sua equipe para utilizar as ferramentas desenvolvidas."
                }
              ].map((faq, index) => (
                <GlassCard key={index} className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;