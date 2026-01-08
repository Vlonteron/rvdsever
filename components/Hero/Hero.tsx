'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const heroSlides = [
  {
    title: 'ПРОМІМПЕКС СЄВЄР',
    subtitle: 'Якісна продукція для гідравлічних систем',
    description: 'Основна задача нашої компанії надати українському споживачеві якісну продукцію. Звертаючись до нас Ви отримаєте сервіс найвищого рівня.',
    image: '/images/hero-1.jpg',
  },
  {
    title: 'РУКАВА ВИСОКОГО ТИСКУ',
    subtitle: 'Надійні рішення для будь-якої техніки',
    description: 'Будь-які шланги на будь-яку техніку, ремонт та виробництво гідроциліндрів, гідрокомпоненти, швидкороз\'ємні з\'єднання.',
    image: '/images/hero-2.jpg',
  },
  {
    title: 'ПРОМИСЛОВІ РУКАВА',
    subtitle: 'Мастильні та заправні рішення',
    description: 'Виконання будь-яких завдань та реалізація складних ідей Замовника. Ми виконаємо Ваші замовлення швидко, якісно та за прийнятною ціною.',
    image: '/images/hero-3.jpg',
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full w-full"
              style={{
                background: `linear-gradient(to bottom right, var(--primary-gradient-from), var(--primary-gradient-via), var(--primary-gradient-to))`
              }}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Overlay */}
              <div 
                className="absolute inset-0 bg-gray-900/40"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, var(--primary-gradient-from)cc, var(--primary-gradient-via)aa)`
                }}
              />
              
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl text-white z-10"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl mb-6 text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-base sm:text-lg md:text-xl mb-8 text-primary-lightest leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <Link
                      href="#products"
                      className="inline-block bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-primary-bg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
                    >
                      Дізнатися більше
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

