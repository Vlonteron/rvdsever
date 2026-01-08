'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/seo';

const navItems = [
  { href: '/', label: 'Головна' },
  { href: '/#about', label: 'Про нас' },
  { href: '/#products', label: 'Продукція' },
  { href: '/#suppliers', label: 'Постачальники' },
  { href: '/#contact', label: 'Контакти' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 lg:space-x-4">
            <img
              src="/images/logo.png"
              alt="ПРОМІМПЕКС СЄВЄР"
              className="h-14 w-auto object-contain lg:h-16"
            />
            <span className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 hidden sm:inline">
              ПРОМІМПЕКС <br />
              СЄВЄР
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/#')) {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className="text-sm lg:text-base xl:text-lg text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-2 mr-3 lg:mr-4 xl:mr-6"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <a
                href={`tel:${siteConfig.links.phone1.replace(/\s/g, '')}`}
                className="bg-primary text-white px-4 py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 rounded-full hover:bg-primary-dark transition-all duration-200 font-semibold text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex flex-col items-center cursor-pointer"
              >
                <span>Зв'язатись</span>
                <span className="text-white/25 text-[10px] lg:text-xs mt-0.5">{siteConfig.links.phone1.replace(/\s/g, '').replace(/\+38/g, '')}</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className="block text-base text-gray-700 hover:text-primary transition-colors duration-200 font-medium py-3"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="space-y-4">
                  <a
                    href="tel:+380506682846"
                    className="block text-center text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    +380 (50) 668-28-46
                  </a>
                  <a
                    href="tel:+380681441955"
                    className="block text-center text-gray-700 hover:text-primary transition-colors font-medium py-2"
                  >
                    +380 (68) 144-19-55
                  </a>
                  <a
                    href="tel:+380506682846"
                    className="block bg-primary text-white px-10 py-4 rounded-full hover:bg-primary-dark transition-all duration-200 font-semibold text-lg text-center shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  >
                    Зв'язатись
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

