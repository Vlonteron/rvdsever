# Інструкція: Завантаження зображень з Wix сайту

## Швидкий спосіб (рекомендовано)

### Крок 1: Відкрийте старий сайт
Перейдіть на https://rvdsever.wixsite.com/website

### Крок 2: Відкрийте DevTools
- Натисніть `F12` або `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Або клікніть правою кнопкою → "Inspect" / "Перевірити елемент"

### Крок 3: Перейдіть на вкладку Network
1. Відкрийте вкладку **Network** (Мережа)
2. Встановіть фільтр **Img** (тільки зображення)
3. Можна також використати фільтр **Media**

### Крок 4: Перезавантажте сторінку
- Натисніть `F5` або `Ctrl+R`
- Прокрутіть сторінку вниз, щоб завантажити всі зображення

### Крок 5: Знайдіть та скопіюйте URL зображень

Для кожного зображення:
1. Знайдіть його в списку Network
2. Клікніть правою кнопкою на зображення
3. Виберіть **"Copy"** → **"Copy link address"** (або "Копіювати адресу посилання")
4. URL буде виглядати приблизно так: `https://static.wixstatic.com/media/...`

### Крок 6: Завантажте зображення

#### Варіант A: Через браузер (найпростіше)
1. Відкрийте скопійований URL в новій вкладці
2. Натисніть `Ctrl+S` (Windows) / `Cmd+S` (Mac)
3. Збережіть у відповідну папку з правильним ім'ям

#### Варіант B: Через скрипт
```bash
node scripts/download-images.js <URL> <output-path>
```

Наприклад:
```bash
node scripts/download-images.js "https://static.wixstatic.com/media/..." "public/images/products/rvd.jpg"
```

## Мапінг зображень

### Продукція → `public/images/products/`
- `РВД 2.jpg` → `rvd.jpg`
- `цилиндр.jpg` → `cylinder.jpg`
- `пром.jpg` → `industrial.jpg`
- `AEF8B9BA-341A-438F-A96F-F58E058A7161_edited_edited.jpg` → `equipment.jpg`
- `арматура.jpg` → `armature.jpg`
- `bystrorazemnoe_soedinenie_brs.jpg` → `quick-connect.jpg`
- `Мойка-авто-768x429.jpg` → `washing.jpg`
- `заправка.jpg` → `fueling.jpg`

### Постачальники → `public/images/suppliers/`
- `Inteva.jpg` → `inteva.jpg`
- `Альфа.jpg` → `alpha.jpg`
- `Semperit.jpg` → `semperit.jpg`
- `Компания OP srl.jpg` → `op-srl.jpg`
- `dicsa.jpg` → `dicsa.jpg`

### Hero → `public/images/hero/`
- `IMG-2198.jpg` → `hero-1.jpg`
- Можна додати ще 2 зображення: `hero-2.jpg`, `hero-3.jpg`

## Альтернативний спосіб (через інспектор)

1. Відкрийте старий сайт
2. Клікніть правою кнопкою на зображення → **"Inspect Element"**
3. Знайдіть тег `<img>` з атрибутом `src`
4. Скопіюйте URL з `src`
5. Відкрийте URL в новій вкладці
6. Збережіть зображення

## Примітка про Wix CDN

Wix використовує CDN (Content Delivery Network), тому URL зображень можуть містити:
- `static.wixstatic.com` - основний CDN
- Динамічні параметри для оптимізації
- Можливі редиректи

Це нормально - просто скопіюйте повний URL з DevTools.

## Перевірка

Після завантаження перевірте:
1. Чи всі файли на місці
2. Чи правильно названі
3. Запустіть `npm run dev` та перевірте відображення

