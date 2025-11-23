import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section({
  id,
  title,
  content,
  className = "",
  delay = 0
}) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });
  const isContentInView = useInView(contentRef, { once: false, margin: "-100px" });

  return (
    <section
      id={id ? `section-${id}` : undefined}
      className={`min-h-screen flex flex-col justify-center py-24 md:py-40 lg:py-48 ${className}`}
    >
      <div className="container-custom">
        {title && (
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16"
            style={{
              color: 'var(--color-text-primary)',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(199, 210, 254, 0.1)',
              filter: 'drop-shadow(0 0 10px rgba(199, 210, 254, 0.2))'
            }}
          >
            {title}
          </motion.h2>
        )}

        {content && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay + 0.1 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {typeof content === 'string' ? (
              <div
                className="leading-relaxed space-y-6 text-base md:text-lg lg:text-xl"
                style={{ color: 'var(--color-text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
              />
            ) : (
              <div
                className="leading-relaxed space-y-6 text-base md:text-lg lg:text-xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {content}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
