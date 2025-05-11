import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  tilt = false, 
  neonBorder = false,
  glowOnHover = false,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Handle mouse movement for tilt effect
  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (limited to subtle effect)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Adjust these values for more/less tilt effect
    const tiltAmount = 5;
    
    setRotateX(((y - centerY) / centerY) * -tiltAmount);
    setRotateY(((x - centerX) / centerX) * tiltAmount);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (tilt && card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [tilt]);

  const baseClasses = `glass-card ${neonBorder ? 'neon-border' : ''} ${glowOnHover ? 'hover:shadow-neon-green' : ''} ${className}`;
  
  return (
    <motion.div
      ref={cardRef}
      className={baseClasses}
      style={{ 
        transform: tilt ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'none',
        transition: 'transform 0.2s ease-out',
      }}
      whileHover={{ 
        y: glowOnHover ? -5 : 0 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;