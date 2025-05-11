import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  to, 
  href, 
  onClick,
  type = 'button',
  ...props 
}) => {
  // Variants
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
  };

  // Animation properties
  const buttonAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Base classes
  const baseClasses = `btn ${variants[variant] || ''} ${className}`;
  
  // Determine the element to render based on props
  if (to) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
      >
        <Link to={to} className={baseClasses} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  if (href) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
      >
        <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonAnimation}
      type={type}
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;