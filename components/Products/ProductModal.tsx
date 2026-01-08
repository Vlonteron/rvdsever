'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { siteConfig } from '@/lib/seo';

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  details?: string;
  images?: string[];
  specifications?: string[];
  features?: string[];
}

interface ProductModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Закрытие по Escape и управление overflow
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!product || !mounted || typeof window === 'undefined') return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - закрывается по клику, с затемнением */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={onClose}
          >
            {/* Модальное окно - не закрывается при клике на него */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Заголовок */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                  aria-label="Закрити"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Контент с прокруткой */}
              <div className="overflow-y-auto flex-1 px-6 py-6">
                {/* Изображения */}
                {product.images && product.images.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.images.slice(0, 4).map((img, index) => (
                        <div
                          key={index}
                          className="relative h-48 bg-gray-100 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`${product.title} - зображення ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Описание */}
                {product.description && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Опис
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Детальна інформація */}
                {product.details && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Детальна інформація
                    </h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.details}
                    </div>
                  </div>
                )}

                {/* Характеристики */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Характеристики
                    </h3>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Особливості */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Особливості
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Если нет данных */}
                {!product.description && !product.details && 
                 (!product.specifications || product.specifications.length === 0) &&
                 (!product.features || product.features.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Детальна інформація буде додана найближчим часом.</p>
                    <p className="mt-2 text-sm">
                      Зв'яжіться з нами для отримання додаткової інформації.
                    </p>
                  </div>
                )}
              </div>

              {/* Футер */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-2">
                      Для отримання додаткової інформації зв'яжіться з нами
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`tel:${siteConfig.links.phone1.replace(/\s/g, '')}`}
                        className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
                      >
                        {siteConfig.links.phone1}
                      </a>
                      <a
                        href={`tel:${siteConfig.links.phone2.replace(/\s/g, '')}`}
                        className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
                      >
                        {siteConfig.links.phone2}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold cursor-pointer"
                  >
                    Закрити
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

