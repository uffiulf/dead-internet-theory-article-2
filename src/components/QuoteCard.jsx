import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function QuoteCard({ quote, author, role, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  if (!quote) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay }}
      className="p-6 md:p-8 rounded-xl border-l-4 shadow-2xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-dark-surface) 0%, rgba(26, 26, 26, 0.8) 100%)',
        borderLeftColor: '#3b82f6',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.1)'
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      <blockquote className="text-lg md:text-xl lg:text-2xl font-medium mb-6 italic relative z-10" style={{ color: 'var(--color-text-primary)' }}>
        "{quote}"
      </blockquote>
      <div className="flex items-center relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent mr-4" />
        <div>
          <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{author}</p>
          {role && (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{role}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
