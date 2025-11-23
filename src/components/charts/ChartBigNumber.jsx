import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import numbersData from '../../data/charts/numbers.json';

function CardWithAnimation({ number, index }) {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 md:p-8 rounded-lg border text-center"
      style={{ 
        background: 'linear-gradient(to bottom right, var(--color-dark-surface), var(--color-dark-bg))',
        borderColor: 'var(--color-dark-border)'
      }}
    >
      <CountUpNumber 
        value={number.value} 
        suffix={number.suffix}
        delay={index * 0.1 + 0.2}
      />
      <h4 className="text-sm md:text-base font-semibold mb-2 text-gray-300 mt-2">
        {number.label}
      </h4>
      <p className="text-xs md:text-sm text-gray-500">
        {number.description}
      </p>
    </motion.div>
  );
}

function CountUpNumber({ value, suffix, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100
  });
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return unsubscribe;
  }, [springValue]);

  useEffect(() => {
    if (isInView) {
      // Animate when in view
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    } else {
      // Reset when scrolling back up
      motionValue.set(0);
    }
  }, [isInView, value, delay, motionValue]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
      style={{
        textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))'
      }}
    >
      {displayValue.toLocaleString('no-NO')}{suffix}
    </motion.span>
  );
}

export default function ChartBigNumber() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: false, margin: "-100px" });
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });

  return (
    <div ref={containerRef} className="w-full py-8 md:py-12">
      <div className="container-custom">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Nøkkeltall
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {numbersData.numbers.map((number, index) => (
            <CardWithAnimation
              key={number.id}
              number={number}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
