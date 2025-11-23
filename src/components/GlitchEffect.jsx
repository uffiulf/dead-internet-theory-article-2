import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlitchEffect({ children, className = "" }) {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    // Intense glitch for 2 seconds, then fade to normal
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Screen shake overlay */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            x: [0, -4, 4, -3, 3, -2, 2, 0],
            y: [0, 2, -2, 1, -1, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: 20,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,255,0.1) 50%, transparent 100%)',
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      <motion.span
        className="glitch-text relative"
        animate={isGlitching ? {
          x: [0, -3, 3, -4, 4, -2, 2, 0],
          y: [0, 1, -1, 2, -2, 0],
          opacity: [1, 0.7, 1, 0.8, 1, 0.9, 1],
          filter: [
            'hue-rotate(0deg)',
            'hue-rotate(90deg)',
            'hue-rotate(180deg)',
            'hue-rotate(270deg)',
            'hue-rotate(0deg)'
          ]
        } : {
          x: 0,
          y: 0,
          opacity: 1,
          filter: 'hue-rotate(0deg)'
        }}
        transition={isGlitching ? {
          duration: 0.15,
          repeat: 13,
          ease: "linear"
        } : {
          duration: 0.5,
          ease: "easeOut"
        }}
        style={{
          textShadow: isGlitching ? [
            '2px 0 0 #ff00c1, -2px 0 0 #00fff9',
            '-2px 0 0 #ff00c1, 2px 0 0 #00fff9',
            '2px 0 0 #ff00c1, -2px 0 0 #00fff9',
            '0 0 0 transparent'
          ] : 'none',
          color: isGlitching ? '#ff00c1' : '#fff',
          display: 'inline-block'
        }}
      >
        {children}
      </motion.span>
      
      {/* RGB split effect - positioned absolutely */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ width: '100%', height: '100%' }}>
          <motion.span
            className="absolute top-0 left-0"
            style={{
              color: '#ff00c1',
              mixBlendMode: 'screen',
              whiteSpace: 'nowrap'
            }}
            animate={{
              x: [0, 3, -3, 2, -2, 0],
            }}
            transition={{
              duration: 0.08,
              repeat: 25,
              ease: "linear"
            }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0"
            style={{
              color: '#00fff9',
              mixBlendMode: 'screen',
              whiteSpace: 'nowrap'
            }}
            animate={{
              x: [0, -3, 3, -2, 2, 0],
            }}
            transition={{
              duration: 0.08,
              repeat: 25,
              ease: "linear"
            }}
          >
            {children}
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}
