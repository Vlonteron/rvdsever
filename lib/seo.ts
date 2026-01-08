import { Metadata } from 'next';

export const siteConfig = {
  name: 'ПРОМІМПЕКС СЄВЄР',
  description: 'Якісна продукція для гідравлічних систем: РВД, ремонт гідроциліндрів, гідроарматура, швидкороз\'ємні з\'єднання, промислові шланги, мастильні та заправні рішення. Хмельницький.',
  url: 'https://promimpeks.com',
  ogImage: '/images/og-image.jpg',
  links: {
    email: 'rvdsever@gmail.com',
    phone1: '+380 (50) 668-28-46',
    phone2: '+380 (68) 144-19-55',
  },
  address: {
    street: 'вул. Вінницьке шосе, 1/3',
    city: 'Хмельницький',
    country: 'Україна',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'РВД',
    'рукава високого тиску',
    'гідроциліндри',
    'ремонт гідроциліндрів',
    'гідроарматура',
    'швидкороз\'ємні з\'єднання',
    'ШРЗ',
    'промислові рукава',
    'рукава для мийки',
    'заправні рішення',
    'Хмельницький',
    'Україна',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/images/logo/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/images/logo/android-chrome-512x512.png' },
    ],
  },
};

// Продукты для микроразметки
const products = [
  {
    id: 1,
    name: 'РУКАВА ВИСОКОГО ТИСКУ',
    description: 'Виробництво і ремонт рукавів високого тиску для будь-якої техніки',
    image: `${siteConfig.url}/images/products/rvd.jpg`,
  },
  {
    id: 2,
    name: 'РЕМОНТ І ВИРОБНИЦТВО ГІДРОЦИЛІНДРІВ',
    description: 'Професійний ремонт та виробництво гідроциліндрів',
    image: `${siteConfig.url}/images/products/cylinder.jpg`,
  },
  {
    id: 3,
    name: 'ПРОМИСЛОВІ РУКАВА',
    description: 'Надійні промислові рукава для різних галузей',
    image: `${siteConfig.url}/images/products/industrial.jpg`,
  },
  {
    id: 4,
    name: 'ОБЛАДНАННЯ ДЛЯ ВИРОБНИЦТВА РВТ',
    description: 'Сучасне обладнання для виробництва рукавів високого тиску',
    image: `${siteConfig.url}/images/products/equipment.jpg`,
  },
  {
    id: 5,
    name: 'ГІДРОАРМАТУРА',
    description: 'Широкий вибір гідроарматури та компонентів',
    image: `${siteConfig.url}/images/products/armature.jpg`,
  },
  {
    id: 6,
    name: 'ШВИДКОРОЗ\'ЄМНІ З\'ЄДНАННЯ (ШРЗ)',
    description: 'Якісні швидкороз\'ємні з\'єднання для гідравлічних систем',
    image: `${siteConfig.url}/images/products/quick-connect.jpg`,
  },
  {
    id: 7,
    name: 'РУКАВА ДЛЯ МИЙОК ВИСОКОГО ТИСКУ',
    description: 'Спеціалізовані рукава для мийок високого тиску',
    image: `${siteConfig.url}/images/products/washing.jpg`,
  },
  {
    id: 8,
    name: 'ЗАПРАВНІ РІШЕННЯ',
    description: 'Комплексні заправні рішення для різних потреб',
    image: `${siteConfig.url}/images/products/fueling.jpg`,
  },
];

// Отзывы для микроразметки
const reviews = [
  {
    author: 'Олександр Петренко',
    position: 'Директор ТОВ "ТехноСервіс"',
    text: 'Співпрацюємо з ПРОМІМПЕКС СЄВЄР вже більше 3 років. Завжди якісна продукція та швидке виконання замовлень. Рекомендую!',
    rating: 5,
  },
  {
    author: 'Марія Коваленко',
    position: 'Головний інженер',
    text: 'Професійний підхід до ремонту гідроциліндрів. Виконали роботу вчасно та якісно. Залишилися дуже задоволені.',
    rating: 5,
  },
  {
    author: 'Володимир Сидоренко',
    position: 'Власник автопарку',
    text: 'Швидкороз\'ємні з\'єднання відмінної якості. Використовуємо їх вже півроку без жодних проблем.',
    rating: 5,
  },
];

// Генерация всех схем микроразметки
export function generateStructuredData() {
  const allSchemas = [];

  // 1. Organization Schema (для лучшего понимания компании)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.links.phone1.replace(/\s/g, ''),
      contactType: 'customer service',
      areaServed: 'UA',
      availableLanguage: ['uk', 'ru'],
    },
    sameAs: [
      // Добавьте ссылки на социальные сети, если есть
    ],
  };
  allSchemas.push(organizationSchema);

  // 2. LocalBusiness Schema (улучшенная версия)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    '@id': `${siteConfig.url}#business`,
    url: siteConfig.url,
    telephone: [siteConfig.links.phone1.replace(/\s/g, ''), siteConfig.links.phone2.replace(/\s/g, '')],
    email: siteConfig.links.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
      addressRegion: 'Хмельницька область',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Україна',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
  };
  allSchemas.push(localBusinessSchema);

  // 3. WebSite Schema с SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  allSchemas.push(websiteSchema);

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: siteConfig.url,
      },
    ],
  };
  allSchemas.push(breadcrumbSchema);

  // 5. ItemList для продуктов
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Наша продукція',
    description: 'Широкий спектр продукції для гідравлічних систем та промислового обладнання',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        url: `${siteConfig.url}/#products`,
        category: 'Гідравлічне обладнання',
        brand: {
          '@type': 'Brand',
          name: siteConfig.name,
        },
      },
    })),
  };
  allSchemas.push(productListSchema);

  // 6. Service Schema для основных услуг
  const services = [
    {
      name: 'Ремонт рукавів високого тиску',
      description: 'Професійний ремонт рукавів високого тиску для будь-якої техніки',
      serviceType: 'RepairService',
    },
    {
      name: 'Виробництво рукавів високого тиску',
      description: 'Виробництво рукавів високого тиску на замовлення',
      serviceType: 'ManufacturingService',
    },
    {
      name: 'Ремонт гідроциліндрів',
      description: 'Професійний ремонт та виробництво гідроциліндрів',
      serviceType: 'RepairService',
    },
    {
      name: 'Постачання гідроарматури',
      description: 'Широкий вибір гідроарматури та компонентів',
      serviceType: 'DeliveryService',
    },
  ];

  services.forEach((service) => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        telephone: siteConfig.links.phone1.replace(/\s/g, ''),
        email: siteConfig.links.email,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Україна',
      },
      serviceType: service.serviceType,
      url: `${siteConfig.url}/#products`,
    };
    allSchemas.push(serviceSchema);
  });

  // 7. AggregateRating и Review Schema
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const reviewCount = reviews.length;

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#business`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
        jobTitle: review.position,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
    })),
  };
  allSchemas.push(aggregateRatingSchema);

  return allSchemas;
}

// Для обратной совместимости - оставляем старую схему
export const structuredData = generateStructuredData();

