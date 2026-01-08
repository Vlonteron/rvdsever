'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const suppliers = [
  { id: 1, name: 'Inteva', logo: '/images/suppliers/inteva.jpg' },
  { id: 2, name: 'Альфа', logo: '/images/suppliers/alpha.jpg' },
  { id: 3, name: 'Semperit', logo: '/images/suppliers/semperit.jpg' },
  { id: 4, name: 'OP srl', logo: '/images/suppliers/op-srl.jpg' },
  { id: 5, name: 'DICSA', logo: '/images/suppliers/dicsa.jpg' },
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Suppliers() {
  return (
    <section id="suppliers" className="py-24 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            НАШІ ПОСТАЧАЛЬНИКИ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ми співпрацюємо з провідними виробниками якісної продукції
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center"
        >
          {suppliers.map((supplier) => (
            <motion.div
              key={supplier.id}
              variants={itemVariants}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 h-32 relative overflow-hidden"
            >
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

