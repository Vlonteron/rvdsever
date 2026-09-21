'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyPanorama, PanoramaConfig } from '@/lib/panorama';

interface PanoramaViewerProps {
  config?: PanoramaConfig;
  variant?: 'compact' | 'full';
  title?: string;
  subtitle?: string;
  className?: string;
  autoInteractive?: boolean;
}

export default function PanoramaViewer({
  config = companyPanorama,
  variant = 'full',
  title,
  subtitle,
  className = '',
  autoInteractive = false,
}: PanoramaViewerProps) {
  const [isInteractive, setIsInteractive] = useState(autoInteractive);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close fullscreen on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const isCompact = variant === 'compact';
  const heightClass = isCompact
    ? 'h-80 sm:h-96 md:h-[420px]'
    : 'h-[460px] sm:h-[560px] lg:h-[620px]';

  return (
    <>
      <div
        ref={containerRef}
        className={`relative group bg-gray-900 overflow-hidden border border-gray-200/80 ${
          isCompact ? 'rounded-2xl shadow-xl' : 'rounded-3xl shadow-2xl'
        } ${heightClass} ${className}`}
        onMouseLeave={() => {
          if (!autoInteractive) {
            setIsInteractive(false);
          }
        }}
      >
        {/* Loading Spinner / Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium text-gray-300">
              Завантаження 3D-панорами...
            </p>
          </div>
        )}

        {/* Google Street View Iframe Player */}
        <iframe
          src={config.embedUrl}
          title={title || config.title}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
        />

        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/10 shadow-lg pointer-events-auto">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            <span>360° Google Street View</span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border border-white/10 shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
              title="Розгорнути на весь екран"
              aria-label="Розгорнути на весь екран"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <span className="hidden sm:inline">На весь екран</span>
            </button>

            {/* Google Maps External Link */}
            <a
              href={config.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border border-blue-400/20 shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
              title="Відкрити в Google Maps"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">Google Maps</span>
            </a>
          </div>
        </div>

        {/* Scroll Protection Overlay (Click to interact) */}
        {!isInteractive && !autoInteractive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInteractive(true)}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 backdrop-blur-[1px] cursor-pointer transition-all p-4 text-center group/overlay"
          >
            <div className="bg-black/75 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 transform group-hover/overlay:scale-105 transition-all flex flex-col items-center space-y-2 max-w-sm">
              <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400">
                <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-base sm:text-lg font-bold">
                Клікніть для огляду 360°
              </p>
              <p className="text-xs text-gray-300">
                Обертайте та переміщуйтесь простором компанії
              </p>
            </div>
          </motion.div>
        )}

        {/* Bottom Interactive Notice & Re-lock Button */}
        {isInteractive && !autoInteractive && (
          <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsInteractive(false);
              }}
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 shadow-md transition-colors flex items-center space-x-1 cursor-pointer"
              title="Заблокувати скрол"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Закріпити скрол</span>
            </button>
          </div>
        )}

        {/* Caption Bar (for full variant) */}
        {!isCompact && (title || subtitle) && (
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden md:block">
            <div className="bg-black/65 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-white/10 max-w-md shadow-xl">
              {title && <h3 className="font-bold text-sm text-white">{title}</h3>}
              {subtitle && <p className="text-xs text-gray-300 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal View */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-black/70 border-b border-white/10 text-white">
              <div className="flex items-center space-x-3">
                <div className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">
                    {title || config.title}
                  </h3>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {subtitle || config.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={config.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Відкрити в Google</span>
                </a>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer"
                  title="Закрити (Esc)"
                  aria-label="Закрити повноекранний режим"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Fullscreen Iframe */}
            <div className="relative flex-1 w-full h-full bg-black">
              <iframe
                src={config.embedUrl}
                title={title || config.title}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
