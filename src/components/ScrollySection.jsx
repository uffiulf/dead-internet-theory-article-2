import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollySection({
  id,
  title,
  content,
  timeline = [],
  className = ""
}) {
  const containerRef = useRef(null);

  // Split content into paragraphs
  const paragraphs = useMemo(() => {
    if (!content) return [];
    return content.split('\n\n').filter(p => p.trim());
  }, [content]);

  return (
    <section
      ref={containerRef}
      id={id ? `section-${id}` : undefined}
      className={`relative py-24 md:py-40 lg:py-48 flex flex-col ${className}`}
      style={{
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <div className="container-custom flex-grow flex flex-col">
        {/* Title */}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 lg:mb-24 flex-shrink-0"
            style={{
              color: 'var(--color-text-primary)',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(199, 210, 254, 0.1)',
              filter: 'drop-shadow(0 0 10px rgba(199, 210, 254, 0.2))'
            }}
          >
            {title}
          </motion.h2>
        )}

        {/* Intro Content - Gradual Paragraph Reveal */}
        {paragraphs.length > 0 && (
          <div className="mb-24 max-w-3xl space-y-6 md:space-y-8">
            {paragraphs.map((paragraph, index) => {
              const paragraphRef = useRef(null);
              const isInView = useInView(paragraphRef, { 
                once: false, 
                margin: "-100px" 
              });

              return (
                <motion.p
                  key={index}
                  ref={paragraphRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  className="text-base md:text-lg lg:text-xl leading-relaxed"
                  style={{
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {paragraph.trim()}
                </motion.p>
              );
            })}
          </div>
        )}

        {/* Timeline Items */}
        <div className="flex flex-col gap-32 relative">
          {/* Vertical Line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800 hidden lg:block"
            style={{ zIndex: 0 }}
          />

          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10"
      initial={{ opacity: 0.2, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Year Column */}
      <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#F97316] bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10">
            <span className="text-sm font-bold text-[#F97316]">{item.year}</span>
          </div>
          {/* Mobile horizontal line connector */}
          <div className="h-0.5 flex-grow bg-gray-800 lg:hidden ml-4" />
        </div>

        {item.title && (
          <h3 className="text-xl font-bold text-white lg:ml-16 lg:-mt-8">
            {item.title}
          </h3>
        )}
      </div>

      {/* Text Column */}
      <div className="lg:col-span-9">
        <div className="bg-[#1a1a1a]/50 p-6 rounded-lg border border-gray-800 backdrop-blur-sm hover:border-[#F97316]/30 transition-colors duration-300">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
