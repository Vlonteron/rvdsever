// Скрипт для пошуку URL зображень на Wix сайті
// Використання: node scripts/find-wix-images.js

const https = require('https');

const wixSiteUrl = 'https://rvdsever.wixsite.com/website';

console.log('Пошук зображень на Wix сайті...\n');
console.log('Цей скрипт допоможе знайти URL зображень.');
console.log('Для автоматичного завантаження потрібно:');
console.log('1. Відкрити DevTools на старому сайті');
console.log('2. Знайти URL зображень в Network tab');
console.log('3. Використати download-images.js для завантаження\n');

console.log('Або використайте браузер:');
console.log('1. Відкрийте https://rvdsever.wixsite.com/website');
console.log('2. F12 → Network → Img');
console.log('3. Перезавантажте сторінку');
console.log('4. Знайдіть зображення та скопіюйте їх URL\n');

console.log('Список зображень, які потрібно знайти:');
console.log('\nПродукція:');
console.log('  - РВД 2.jpg → public/images/products/rvd.jpg');
console.log('  - цилиндр.jpg → public/images/products/cylinder.jpg');
console.log('  - пром.jpg → public/images/products/industrial.jpg');
console.log('  - AEF8B9BA-341A-438F-A96F-F58E058A7161_edited_edited.jpg → public/images/products/equipment.jpg');
console.log('  - арматура.jpg → public/images/products/armature.jpg');
console.log('  - bystrorazemnoe_soedinenie_brs.jpg → public/images/products/quick-connect.jpg');
console.log('  - Мойка-авто-768x429.jpg → public/images/products/washing.jpg');
console.log('  - заправка.jpg → public/images/products/fueling.jpg');

console.log('\nПостачальники:');
console.log('  - Inteva.jpg → public/images/suppliers/inteva.jpg');
console.log('  - Альфа.jpg → public/images/suppliers/alpha.jpg');
console.log('  - Semperit.jpg → public/images/suppliers/semperit.jpg');
console.log('  - Компания OP srl.jpg → public/images/suppliers/op-srl.jpg');
console.log('  - dicsa.jpg → public/images/suppliers/dicsa.jpg');

console.log('\nHero:');
console.log('  - IMG-2198.jpg → public/images/hero/hero-1.jpg');
console.log('  - РВД.jpg → public/images/hero/hero-2.jpg (опціонально)');

