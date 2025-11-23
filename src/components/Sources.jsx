import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Sources({ sources }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  if (!sources || (!sources.primary && !sources.secondary)) return null;

  return (
    <section ref={ref} className="py-20 md:py-32 lg:py-40">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 text-center"
          style={{
            color: 'var(--color-text-primary)',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(199, 210, 254, 0.1)',
            filter: 'drop-shadow(0 0 10px rgba(199, 210, 254, 0.2))'
          }}
        >
          Kilder
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Primærkilder */}
          {sources.primary && sources.primary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Primærkilder
              </h3>
              <ol className="space-y-6">
                {sources.primary.map((source, index) => (
                  <motion.li
                    key={source.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {index + 1}. {source.publication}
                    </span>
                    {source.date && (
                      <span className="text-gray-400"> ({source.date})</span>
                    )}
                    {source.title && (
                      <>
                        {': '}
                        <span className="italic">"{source.title}"</span>
                      </>
                    )}
                    {source.authors && (
                      <span className="text-gray-400"> – {source.authors}</span>
                    )}
                    {source.url && (
                      <>
                        {' '}
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                          {source.url}
                        </a>
                      </>
                    )}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          )}

          {/* Sekundærkilder */}
          {sources.secondary && sources.secondary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Sekundærkilder
              </h3>
              <ul className="space-y-4">
                {sources.secondary.map((source, index) => (
                  <motion.li
                    key={source.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      • {source.publication}
                    </span>
                    {source.date && (
                      <span className="text-gray-400"> ({source.date})</span>
                    )}
                    {source.title && (
                      <>
                        {': '}
                        <span className="italic">"{source.title}"</span>
                      </>
                    )}
                    {source.url && (
                      <>
                        {' '}
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                          {source.url}
                        </a>
                      </>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

