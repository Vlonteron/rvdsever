# Інструкція: Завантаження зображень зі старого сайту

## Швидкий спосіб (рекомендовано)

### 1. Відкрийте старий сайт
Перейдіть на https://rvdsever.wixsite.com/website

### 2. Відкрийте DevTools
Натисніть `F12` або `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

### 3. Перейдіть на вкладку Network
- Відкрийте вкладку **Network**
- Встановіть фільтр **Img** (тільки зображення)

### 4. Перезавантажте сторінку
Натисніть `F5` або `Ctrl+R`

### 5. Знайдіть та завантажте зображення

#### Для продуктів:
1. Прокрутіть до секції "НАША ПРОДУКЦІЯ"
2. Знайдіть в Network такі зображення:
   - `РВД 2.jpg` → збережіть як `public/images/products/rvd.jpg`
   - `цилиндр.jpg` → збережіть як `public/images/products/cylinder.jpg`
   - `пром.jpg` → збережіть як `public/images/products/industrial.jpg`
   - `AEF8B9BA-341A-438F-A96F-F58E058A7161_edited_edited.jpg` → `public/images/products/equipment.jpg`
   - `арматура.jpg` → `public/images/products/armature.jpg`
   - `bystrorazemnoe_soedinenie_brs.jpg` → `public/images/products/quick-connect.jpg`
   - `Мойка-авто-768x429.jpg` → `public/images/products/washing.jpg`
   - `заправка.jpg` → `public/images/products/fueling.jpg`

#### Для постачальників:
1. Прокрутіть до секції "НАШІ ПОСТАЧАЛЬНИКИ"
2. Знайдіть та збережіть:
   - `Inteva.jpg` → `public/images/suppliers/inteva.jpg`
   - `Альфа.jpg` → `public/images/suppliers/alpha.jpg`
   - `Semperit.jpg` → `public/images/suppliers/semperit.jpg`
   - `Компания OP srl.jpg` → `public/images/suppliers/op-srl.jpg`
   - `dicsa.jpg` → `public/images/suppliers/dicsa.jpg`

#### Для Hero секції:
1. Знайдіть головне зображення (може бути `IMG-2198.jpg` або інше)
2. Збережіть 3 варіанти як:
   - `public/images/hero/hero-1.jpg`
   - `public/images/hero/hero-2.jpg`
   - `public/images/hero/hero-3.jpg`

### 6. Як зберегти зображення
1. Клікніть правою кнопкою на зображення в Network
2. Виберіть "Open in new tab"
3. Натисніть `Ctrl+S` (Windows) / `Cmd+S` (Mac)
4. Збережіть у відповідну папку з правильним ім'ям

## Альтернативний спосіб (через інспектор)

1. Відкрийте старий сайт
2. Клікніть правою кнопкою на зображення → "Inspect Element"
3. Знайдіть атрибут `src` з URL зображення
4. Скопіюйте URL та відкрийте в новій вкладці
5. Збережіть зображення

## Структура папок

Після завантаження структура має виглядати так:

```
public/
└── images/
    ├── hero/
    │   ├── hero-1.jpg
    │   ├── hero-2.jpg
    │   └── hero-3.jpg
    ├── products/
    │   ├── rvd.jpg
    │   ├── cylinder.jpg
    │   ├── industrial.jpg
    │   ├── equipment.jpg
    │   ├── armature.jpg
    │   ├── quick-connect.jpg
    │   ├── washing.jpg
    │   └── fueling.jpg
    ├── suppliers/
    │   ├── inteva.jpg
    │   ├── alpha.jpg
    │   ├── semperit.jpg
    │   ├── op-srl.jpg
    │   └── dicsa.jpg
    └── gallery/
        └── (опціонально, додайте зображення для галереї)
```

## Примітка

Якщо зображення не завантажені, сайт буде працювати з градієнтними заглушками. Це не вплине на функціональність, але для кращого вигляду рекомендую завантажити всі зображення.

## Перевірка

Після завантаження запустіть:
```bash
npm run dev
```

І перевірте, чи відображаються зображення на сайті.

