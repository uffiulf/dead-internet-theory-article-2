import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({ text, speed = 30, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const char = text[currentIndex];
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + char);
        setCurrentIndex(prev => prev + 1);
      }, char === '\n' ? speed * 2 : speed); // Pause longer on line breaks

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div 
      className="font-mono text-white text-left leading-relaxed"
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        lineHeight: '1.8',
        color: '#E5E7EB'
      }}
    >
      {displayedText.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line || '\u00A0'}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-white ml-1 align-middle"
        style={{ marginLeft: '4px' }}
      />
    </div>
  );
}

