import React from 'react';
import { motion } from 'framer-motion';

/**
 * LogoAnimation Component
 * A premium SVG line drawing animation for the VTRC logo.
 * Features:
 * - Infinite loop drawing effect
 * - Responsive sizing
 * - Theme-aware colors
 * - Subtle glows and micro-animations
 */
const LogoAnimation = ({ className = "w-12 h-12", color = "currentColor", isBackground = false }) => {
  // Line drawing variant
  const drawVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0 
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          duration: 3, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1
        },
        opacity: { duration: 0.5 }
      }
    }
  };

  // Node (circle) variant
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        delay: 1.5 + i * 0.2,
        duration: 0.8,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 2
      }
    })
  };

  return (
    <div className={`relative flex items-center justify-center group ${className}`}>
      {/* Decorative Glow - Disabled in background mode for cleaner watermark */}
      {!isBackground && (
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[#3B82F6] blur-2xl rounded-full -z-10" 
        />
      )}
      
      <motion.svg
        viewBox="0 0 56 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
      >
        {/* Main Body Structure */}
        <motion.polygon
          points="0,4 10,4 18,36 8,36"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawVariants}
        />
        
        {/* Detail Lines */}
        <motion.line 
          x1="0" y1="4" x2="18" y2="4" 
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
          variants={drawVariants} 
        />
        <motion.line 
          x1="5" y1="12" x2="13" y2="12" 
          stroke={color} strokeWidth="0.8" strokeLinecap="round"
          variants={drawVariants} 
        />
        <motion.line 
          x1="8" y1="22" x2="16" y2="22" 
          stroke={color} strokeWidth="0.8" strokeLinecap="round"
          variants={drawVariants} 
        />
        
        {/* Tech Shape (Right Side) */}
        <motion.path
          d="M18 36 L28 10 L44 2 L40 14 L30 18 L26 30 Z"
          stroke="#3B82F6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={drawVariants}
          style={!isBackground ? { 
            filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.4))'
          } : {}}
        />
        
        {/* Connecting Network Lines */}
        <motion.line 
          x1="28" y1="10" x2="44" y2="2" 
          stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="3,2" 
          variants={drawVariants} 
        />
        <motion.line 
          x1="44" y1="2" x2="40" y2="14" 
          stroke="#3B82F6" strokeWidth="0.8" 
          variants={drawVariants} 
        />
        <motion.line 
          x1="40" y1="14" x2="30" y2="18" 
          stroke="#93C5FD" strokeWidth="0.8" 
          variants={drawVariants} 
        />

        {/* Nodes (Animated Circles) */}
        <motion.circle cx="28" cy="10" r="2.2" fill="#3B82F6" variants={nodeVariants} custom={0} />
        <motion.circle cx="44" cy="2" r="2.2" fill="#93C5FD" variants={nodeVariants} custom={1} />
        <motion.circle cx="40" cy="14" r="1.8" fill="#3B82F6" variants={nodeVariants} custom={2} />
      </motion.svg>
    </div>
  );
};

export default LogoAnimation;
