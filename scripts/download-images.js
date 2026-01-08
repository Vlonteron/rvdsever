// Скрипт для завантаження зображень зі старого сайту Wix
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Створюємо папки якщо їх немає
const dirs = [
  'public/images/hero',
  'public/images/products',
  'public/images/suppliers',
  'public/images/gallery',
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Функція для завантаження файлу
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Редирект
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Завантажено: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Список зображень для завантаження
// Wix використовує CDN, тому URL потрібно знайти вручну
const imagesToDownload = {
  // Hero зображення
  hero: [
    { 
      name: 'hero-1.jpg', 
      url: null, // Потрібно знайти реальний URL зі старого сайту
      note: 'Головне зображення (може бути IMG-2198.jpg)'
    },
  ],
  
  // Продукція
  products: [
    { 
      name: 'rvd.jpg', 
      oldName: 'РВД 2.jpg',
      url: null,
      note: 'РУКАВА ВИСОКОГО ТИСКУ'
    },
    { 
      name: 'cylinder.jpg', 
      oldName: 'цилиндр.jpg',
      url: null,
      note: 'РЕМОНТ І ВИРОБНИЦТВО ГІДРОЦИЛІНДРІВ'
    },
    { 
      name: 'industrial.jpg', 
      oldName: 'пром.jpg',
      url: null,
      note: 'ПРОМИСЛОВІ РУКАВА'
    },
    { 
      name: 'equipment.jpg', 
      oldName: 'AEF8B9BA-341A-438F-A96F-F58E058A7161_edited_edited.jpg',
      url: null,
      note: 'ОБЛАДНАННЯ ДЛЯ ВИРОБНИЦТВА РВТ'
    },
    { 
      name: 'armature.jpg', 
      oldName: 'арматура.jpg',
      url: null,
      note: 'ГІДРОАРМАТУРА'
    },
    { 
      name: 'quick-connect.jpg', 
      oldName: 'bystrorazemnoe_soedinenie_brs.jpg',
      url: null,
      note: 'ШВИДКОРОЗ\'ЄМНІ З\'ЄДНАННЯ'
    },
    { 
      name: 'washing.jpg', 
      oldName: 'Мойка-авто-768x429.jpg',
      url: null,
      note: 'РУКАВА ДЛЯ МИЙКИ ВИСОКОГО ТИСКУ'
    },
    { 
      name: 'fueling.jpg', 
      oldName: 'заправка.jpg',
      url: null,
      note: 'ЗАПРАВНІ РІШЕННЯ'
    },
  ],
  
  // Постачальники
  suppliers: [
    { 
      name: 'inteva.jpg', 
      oldName: 'Inteva.jpg',
      url: null
    },
    { 
      name: 'alpha.jpg', 
      oldName: 'Альфа.jpg',
      url: null
    },
    { 
      name: 'semperit.jpg', 
      oldName: 'Semperit.jpg',
      url: null
    },
    { 
      name: 'op-srl.jpg', 
      oldName: 'Компания OP srl.jpg',
      url: null
    },
    { 
      name: 'dicsa.jpg', 
      oldName: 'dicsa.jpg',
      url: null
    },
  ],
};

console.log('='.repeat(60));
console.log('Інструкція для завантаження зображень зі старого сайту');
console.log('='.repeat(60));
console.log('\n1. Відкрийте https://rvdsever.wixsite.com/website');
console.log('2. Натисніть F12 (відкрити DevTools)');
console.log('3. Перейдіть на вкладку Network');
console.log('4. Встановіть фільтр "Img"');
console.log('5. Перезавантажте сторінку (F5)');
console.log('6. Знайдіть потрібні зображення в списку');
console.log('7. Клікніть правою кнопкою на зображення → "Copy" → "Copy link address"');
console.log('8. Вставте URL в цей скрипт або використайте інструкцію нижче\n');

console.log('Альтернативний спосіб:');
console.log('1. Відкрийте сайт');
console.log('2. Клікніть правою кнопкою на зображення → "Inspect"');
console.log('3. Знайдіть атрибут src з URL');
console.log('4. Відкрийте URL в новій вкладці');
console.log('5. Збережіть зображення (Ctrl+S) в потрібну папку\n');

console.log('Структура папок:');
dirs.forEach(dir => console.log(`  - ${dir}`));

console.log('\nПісля отримання URL, оновіть цей скрипт або використайте вручну:');
console.log('node scripts/download-images.js <url> <output-path>\n');

// Якщо передано аргументи командного рядка
if (process.argv.length >= 4) {
  const url = process.argv[2];
  const outputPath = process.argv[3];
  
  downloadFile(url, outputPath)
    .then(() => console.log('Готово!'))
    .catch(err => console.error('Помилка:', err.message));
}
