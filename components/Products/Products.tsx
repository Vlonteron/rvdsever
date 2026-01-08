'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductModal from './ProductModal';
import { productDetails, ProductDetail } from '@/lib/product-details';

const products = [
  {
    id: 1,
    title: 'РУКАВА ВИСОКОГО ТИСКУ',
    description: 'Виробництво і ремонт рукавів високого тиску для будь-якої техніки',
    image: '/images/products/rvd.jpg',
    href: '#',
  },
  {
    id: 2,
    title: 'РЕМОНТ І ВИРОБНИЦТВО ГІДРОЦИЛІНДРІВ',
    description: 'Професійний ремонт та виробництво гідроциліндрів',
    image: '/images/products/cylinder.jpg',
    href: '#',
  },
  {
    id: 3,
    title: 'ПРОМИСЛОВІ РУКАВА',
    description: 'Надійні промислові рукава для різних галузей',
    image: '/images/products/industrial.jpg',
    href: '#',
  },
  {
    id: 4,
    title: 'ОБЛАДНАННЯ ДЛЯ ВИРОБНИЦТВА РВТ',
    description: 'Сучасне обладнання для виробництва рукавів високого тиску',
    image: '/images/products/equipment.jpg',
    href: '#',
  },
  {
    id: 5,
    title: 'ГІДРОАРМАТУРА',
    description: 'Широкий вибір гідроарматури та компонентів',
    image: '/images/products/armature.jpg',
    href: '#',
  },
  {
    id: 6,
    title: 'ШВИДКОРОЗ\'ЄМНІ З\'ЄДНАННЯ (ШРЗ)',
    description: 'Якісні швидкороз\'ємні з\'єднання для гідравлічних систем',
    image: '/images/products/quick-connect.jpg',
    href: '#',
  },
  {
    id: 7,
    title: 'РУКАВА ДЛЯ МИЙОК ВИСОКОГО ТИСКУ',
    description: 'Спеціалізовані рукава для мийок високого тиску',
    image: '/images/products/washing.jpg',
    href: '#',
  },
  {
    id: 8,
    title: 'ЗАПРАВНІ РІШЕННЯ',
    description: 'Комплексні заправні рішення для різних потреб',
    image: '/images/products/fueling.jpg',
    href: '#',
  },
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

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (productId: number) => {
    const product = productDetails.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="products" className="py-24 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            НАША ПРОДУКЦІЯ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Широкий спектр продукції для гідравлічних систем та промислового обладнання
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-bg-light to-primary-bg-lighter overflow-hidden">
                {/* Image with fallback */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show placeholder
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder - hidden by default, shown on error */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-bg-light to-primary-bg-lighter" style={{ display: 'none' }}>
                  <div className="w-24 h-24 bg-primary-light rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center text-primary text-4xl font-bold opacity-30">
                    {product.id}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-base mb-6 line-clamp-2">
                  {product.description}
                </p>
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="text-primary font-semibold hover:text-primary-dark inline-flex items-center group/link text-base cursor-pointer"
                >
                  Докладніше
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <ProductModal
      product={selectedProduct}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    />
    </>
  );
}

