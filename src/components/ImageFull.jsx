import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ImageFull({
  src,
  images,
  alt,
  caption,
  className = "",
  delay = 0
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  if (!src && (!images || images.length === 0)) return null;

  // Ensure image paths work with Vite base URL
  const getImageSrc = (imageSrc) => {
    if (!imageSrc) return '';
    // If it's already a full URL, return as is
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }
    // For local paths, ensure they start with / and work with base URL
    const baseUrl = import.meta.env.BASE_URL;
    const cleanPath = imageSrc.startsWith('/') ? imageSrc.slice(1) : imageSrc;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <section className={`py-8 md:py-12 lg:py-16 ${className}`}>
      <div className="container-custom">
        <motion.figure
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: delay }}
          className="w-full"
        >
          {images && images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((imgSrc, index) => (
                <div key={index} className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={getImageSrc(imgSrc)}
                    alt={`${alt || "Gallery image"} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={getImageSrc(src)}
              alt={alt || ""}
              className="w-full h-auto rounded-lg shadow-2xl"
              loading="lazy"
            />
          )}

          {caption && (
            <figcaption className="mt-4 text-sm md:text-base text-gray-400 text-center italic">
              {caption}
            </figcaption>
          )}
        </motion.figure>
      </div>
    </section>
  );
}
