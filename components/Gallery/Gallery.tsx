'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  { id: 1, src: '/images/gallery/1.jpg', alt: 'Продукція 1' },
  { id: 2, src: '/images/gallery/2.jpg', alt: 'Продукція 2' },
  { id: 3, src: '/images/gallery/3.jpg', alt: 'Продукція 3' },
  { id: 4, src: '/images/gallery/4.jpg', alt: 'Продукція 4' },
  { id: 5, src: '/images/gallery/5.jpg', alt: 'Продукція 5' },
  { id: 6, src: '/images/gallery/6.jpg', alt: 'Продукція 6' },
  { id: 7, src: '/images/gallery/7.jpg', alt: 'Продукція 7' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'Продукція 8' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ГАЛЕРЕЯ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Наша продукція та роботи
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-primary-bg-light to-primary-bg-lighter cursor-pointer group"
              onClick={() => setSelectedImage(image.id)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-bg-light to-primary-bg-lighter">
                <div className="text-primary text-2xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                  {image.id}
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

