import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && e.target.closest('.mobile-menu-container') === null) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Links for navigation
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Metodologia', path: '/metodologia' },
    { name: 'Casos', path: '/casos' },
    { name: 'Sobre', path: '/sobre' },
  ];

  // Header animation variants
  const headerVariants = {
    initial: { 
      boxShadow: 'none',
      backdropFilter: 'blur(0px)',
    },
    scrolled: { 
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(10px)',
    }
  };

  // Mobile menu animation variants
  const menuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-bgdark/80' : 'py-5 bg-transparent'
      }`}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={headerVariants}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center"
        >
          <span className="text-white">BG</span>
          <span className="text-neon-green">Tech</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                relative text-sm font-semibold transition-colors duration-300
                ${isActive ? 'text-neon-green' : 'text-white hover:text-neon-green'}
              `}
              end={link.path === '/'}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-green"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button to="/contato" variant="primary">
            Diagnóstico Grátis
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-white p-2 focus:outline-none"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <div className="w-6 flex flex-col items-end justify-center space-y-1.5">
              <motion.span 
                className="w-6 h-0.5 bg-neon-green block"
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0
                }}
              />
              <motion.span 
                className="h-0.5 bg-neon-green block"
                animate={{ 
                  width: isMenuOpen ? '24px' : '18px',
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-neon-green block"
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0
                }}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-bgdark/90 backdrop-blur-lg border-t border-white/10 mobile-menu-container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container-custom py-5 flex flex-col">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    text-base font-semibold py-3 border-b border-white/10
                    ${isActive ? 'text-neon-green' : 'text-white'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-4 pt-2">
                <Button 
                  to="/contato" 
                  variant="primary"
                  className="w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Diagnóstico Grátis
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;