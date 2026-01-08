// Скрипт для парсинга детальной информации о продукции с Wix сайта
// Використання: node scripts/parse-product-details.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://rvdsever.wixsite.com/website';
const productsPageUrl = 'https://rvdsever.wixsite.com/website/%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%86%D1%96%D1%8F';

// Маппинг названий продуктов к их возможным URL
const productMappings = [
  {
    id: 1,
    title: 'РУКАВА ВИСОКОГО ТИСКУ',
    possibleUrls: [
      '/рукава-високого-тиску',
      '/rvd',
      '/рукава-вт',
      '/products/rvd'
    ]
  },
  {
    id: 2,
    title: 'РЕМОНТ І ВИРОБНИЦТВО ГІДРОЦИЛІНДРІВ',
    possibleUrls: [
      '/ремонт-гідроциліндрів',
      '/гидроцилиндры',
      '/cylinder',
      '/products/cylinder'
    ]
  },
  {
    id: 3,
    title: 'ПРОМИСЛОВІ РУКАВА',
    possibleUrls: [
      '/промислові-рукава',
      '/industrial',
      '/products/industrial'
    ]
  },
  {
    id: 4,
    title: 'ОБЛАДНАННЯ ДЛЯ ВИРОБНИЦТВА РВТ',
    possibleUrls: [
      '/обладнання-рвт',
      '/equipment',
      '/products/equipment'
    ]
  },
  {
    id: 5,
    title: 'ГІДРОАРМАТУРА',
    possibleUrls: [
      '/гідроарматура',
      '/armature',
      '/products/armature'
    ]
  },
  {
    id: 6,
    title: 'ШВИДКОРОЗ\'ЄМНІ З\'ЄДНАННЯ',
    possibleUrls: [
      '/швидкорозємні-зєднання',
      '/quick-connect',
      '/products/quick-connect'
    ]
  },
  {
    id: 7,
    title: 'РУКАВА ДЛЯ МИЙОК ВИСОКОГО ТИСКУ',
    possibleUrls: [
      '/рукава-для-мийок',
      '/washing',
      '/products/washing'
    ]
  },
  {
    id: 8,
    title: 'ЗАПРАВНІ РІШЕННЯ',
    possibleUrls: [
      '/заправні-рішення',
      '/fueling',
      '/products/fueling'
    ]
  }
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return fetchPage(redirectUrl.startsWith('http') ? redirectUrl : baseUrl + redirectUrl)
            .then(resolve)
            .catch(reject);
        }
      }
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function extractProductLinks(html) {
  const links = [];
  // Ищем ссылки с текстом "Докладніше" или похожие
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?Докладніше[\s\S]*?<\/a>/gi;
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  
  // Также ищем ссылки в структуре Wix
  const wixLinkRegex = /href=["']([^"']*\/[^"']*\/[^"']+)["']/gi;
  while ((match = wixLinkRegex.exec(html)) !== null) {
    if (!match[1].startsWith('http') && !match[1].startsWith('#')) {
      links.push(match[1]);
    }
  }
  
  return [...new Set(links)]; // Убираем дубликаты
}

function extractProductInfo(html, productTitle) {
  const info = {
    title: productTitle,
    description: '',
    images: [],
    specifications: [],
    features: []
  };
  
  // Извлекаем описание
  const descRegex = /<p[^>]*>([^<]+)<\/p>/gi;
  let match;
  const descriptions = [];
  while ((match = descRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text.length > 50 && !text.includes('©') && !text.includes('Wix')) {
      descriptions.push(text);
    }
  }
  info.description = descriptions.join(' ') || '';
  
  // Извлекаем изображения
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1] && !match[1].includes('logo') && !match[1].includes('icon')) {
      images.push(match[1]);
    }
  }
  info.images = [...new Set(images)];
  
  return info;
}

async function parseProducts() {
  console.log('Начинаю парсинг страницы продукции...\n');
  console.log('⚠️  ВАЖНО: Wix сайты используют динамическую загрузку контента.');
  console.log('   Скрипт попытается получить базовую информацию, но полные данные');
  console.log('   могут потребовать ручного обновления.\n');
  
  try {
    // Получаем главную страницу продукции
    console.log('Загрузка страницы продукции...');
    const productsPageHtml = await fetchPage(productsPageUrl);
    console.log('✓ Страница продукции загружена\n');
    
    // Сохраняем HTML для анализа
    const htmlPath = path.join(__dirname, '..', 'lib', 'products-page.html');
    fs.writeFileSync(htmlPath, productsPageHtml, 'utf-8');
    console.log(`✓ HTML сохранен в ${htmlPath} для ручного анализа\n`);
    
    // Извлекаем ссылки
    const links = extractProductLinks(productsPageHtml);
    console.log(`✓ Найдено ${links.length} потенциальных ссылок`);
    if (links.length > 0) {
      console.log('  Ссылки:', links.slice(0, 5).join(', '), links.length > 5 ? '...' : '');
    }
    console.log('');
    
    const productsData = [];
    
    // Пробуем получить информацию для каждого продукта
    for (const product of productMappings) {
      console.log(`Обработка: ${product.title}`);
      
      let productInfo = {
        id: product.id,
        title: product.title,
        description: '',
        details: '',
        images: [],
        specifications: [],
        features: [],
        url: null
      };
      
      // Пробуем разные возможные URL
      let found = false;
      for (const urlPath of product.possibleUrls) {
        try {
          const fullUrl = baseUrl + urlPath;
          console.log(`  Пробую: ${fullUrl}`);
          const html = await fetchPage(fullUrl);
          
          const info = extractProductInfo(html, product.title);
          if (info.description || info.images.length > 0) {
            productInfo.description = info.description;
            productInfo.images = info.images;
            productInfo.url = fullUrl;
            console.log(`  ✓ Данные получены с ${fullUrl}`);
            found = true;
            break;
          }
        } catch (err) {
          // Продолжаем пробовать другие URL
          console.log(`  ✗ Ошибка: ${err.message}`);
        }
      }
      
      // Если не нашли через URL, пробуем извлечь из главной страницы
      if (!found) {
        console.log('  Пробую извлечь из главной страницы...');
        // Ищем информацию на главной странице продукции
        const titleRegex = new RegExp(product.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        if (titleRegex.test(productsPageHtml)) {
          // Извлекаем текст после заголовка
          const sectionRegex = new RegExp(
            `(${product.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})[\\s\\S]{0,1000}(<p[^>]*>([^<]+)<\\/p>|<div[^>]*>([^<]+)<\\/div>)`,
            'i'
          );
          const sectionMatch = sectionRegex.exec(productsPageHtml);
          if (sectionMatch) {
            productInfo.description = (sectionMatch[3] || sectionMatch[4] || '').trim();
            if (productInfo.description) {
              console.log('  ✓ Описание найдено на главной странице');
            }
          }
        }
      }
      
      if (!productInfo.description) {
        console.log('  ⚠️  Детальная информация не найдена');
      }
      
      productsData.push(productInfo);
      console.log('');
    }
    
    // Сохраняем данные в JSON
    const outputPath = path.join(__dirname, '..', 'lib', 'product-details.json');
    fs.writeFileSync(outputPath, JSON.stringify(productsData, null, 2), 'utf-8');
    
    console.log(`\n✓ Данные сохранены в ${outputPath}`);
    console.log(`\nОбработано продуктов: ${productsData.length}`);
    console.log('\n📝 Следующие шаги:');
    console.log('1. Проверьте lib/products-page.html для ручного анализа');
    console.log('2. Откройте каждую страницу продукта в браузере');
    console.log('3. Обновите lib/product-details.ts с полной информацией');
    console.log('4. Или используйте данные из lib/product-details.json\n');
    
    return productsData;
    
  } catch (error) {
    console.error('\n❌ Ошибка при парсинге:', error.message);
    console.error('\n💡 Совет: Wix сайты могут блокировать автоматический парсинг.');
    console.error('   Попробуйте вручную скопировать информацию со страниц продуктов.');
    throw error;
  }
}

// Запускаем парсинг
parseProducts().catch(console.error);

