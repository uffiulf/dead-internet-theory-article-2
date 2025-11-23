import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ChartContainer({ children, title, description }) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });
  const isContentInView = useInView(contentRef, { once: false, margin: "-100px" });

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 md:py-32 lg:py-40">
      <div className="container-custom">
        {title && (
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{
              color: 'var(--color-text-primary)',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(199, 210, 254, 0.1)',
              filter: 'drop-shadow(0 0 10px rgba(199, 210, 254, 0.2))'
            }}>
              {title}
            </h2>
            {description && (
              <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-6 md:p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.6) 0%, rgba(10, 10, 10, 0.8) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 40px rgba(59, 130, 246, 0.05)'
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
