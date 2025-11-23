import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ title, subtitle, image, imageAlt }) {
  const { scrollYProgress } = useScroll();
  const heroImage = image || "/Shrimp_Jesus_example.jpg";

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: parallaxY
        }}
      >
        {/* Stronger Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full container-custom text-center px-4 pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-12 leading-tight tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
            letterSpacing: '-0.02em',
            filter: 'drop-shadow(0 0 30px rgba(199, 210, 254, 0.5))'
          }}
        >
          {title || "Dead Internet Theory"}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-200 max-w-4xl font-light leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Enhanced Scroll Indicator with Pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-7 h-12 border-2 border-white/70 rounded-full flex items-start justify-center p-2.5 shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(255,255,255,0.3)'
          }}
        >
          <motion.div
            animate={{
              y: [0, 16, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-4 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
