'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PanoramaViewer from '@/components/Panorama/PanoramaViewer';
import { galleryPanoramas, PanoramaConfig } from '@/lib/panorama';

export default function Gallery() {
  const [activeLocationIndex, setActiveLocationIndex] = useState<number>(0);
  const activePanorama: PanoramaConfig = galleryPanoramas[activeLocationIndex];

  return (
    <section id="gallery" className="py-24 md:py-28 bg-gray-50 scroll-mt-24">
      {/* Invisible anchor for virtual tour links */}
      <span id="virtual-tour" className="relative -top-24 block invisible" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Інтерактивний 360° тур</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ВІРТУАЛЬНИЙ 3D-ТУР
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Оберіть локацію нижче для віртуального огляду виробництва, складу та сервісної дільниці компанії «ПРОМІМПЕКС СЄВЄР»
          </p>
        </motion.div>

        {/* Location Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {galleryPanoramas.map((pano, idx) => {
            const isActive = activeLocationIndex === idx;
            return (
              <button
                key={pano.id}
                onClick={() => setActiveLocationIndex(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-primary'}`} />
                <span>{`Локація ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Panorama Viewer with animated key to reload on switch */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanorama.panoid}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <PanoramaViewer
                variant="full"
                config={activePanorama}
                title={activePanorama.title}
                subtitle={activePanorama.description}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4 Location Preview Cards (all 4 real Google 3D points) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryPanoramas.map((pano, idx) => {
            const isActive = activeLocationIndex === idx;
            return (
              <motion.div
                key={pano.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  setActiveLocationIndex(idx);
                  const element = document.getElementById('gallery');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  isActive
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                {/* Image Thumbnail with Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={pano.thumbnailUrl}
                    alt={pano.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* 360 Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 border border-white/10">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>360°</span>
                  </div>

                  {/* Active Indicator Badge */}
                  {isActive && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-md">
                      Активна
                    </div>
                  )}

                  {/* Numbering */}
                  <div className="absolute bottom-3 left-3 text-white font-mono text-xs opacity-90 font-bold">
                    0{idx + 1}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className={`font-bold text-base mb-1.5 transition-colors line-clamp-1 ${
                    isActive ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                  }`}>
                    {pano.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {pano.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs font-medium">
                    <span className={isActive ? 'text-primary font-bold' : 'text-gray-500'}>
                      {isActive ? 'Зараз на екрані' : 'Натисніть для огляду'}
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform inline-flex items-center">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
