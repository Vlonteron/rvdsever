# Швидка інструкція: Завантаження зображень

## Метод 1: Через DevTools (найпростіше, 5 хвилин)

### Крок 1: Відкрийте старий сайт
https://rvdsever.wixsite.com/website

### Крок 2: Відкрийте DevTools
- `F12` або `Ctrl+Shift+I`

### Крок 3: Network → Img
1. Вкладка **Network**
2. Фільтр **Img**
3. Перезавантажте сторінку (`F5`)
4. Прокрутіть сторінку вниз

### Крок 4: Завантажте зображення
Для кожного зображення:
1. Клікніть правою кнопкою → **"Open in new tab"**
2. `Ctrl+S` → збережіть з правильним ім'ям

### Мапінг файлів:

**Продукція** (`public/images/products/`):
- `РВД 2.jpg` → `rvd.jpg`
- `цилиндр.jpg` → `cylinder.jpg`
- `пром.jpg` → `industrial.jpg`
- `AEF8B9BA-341A-438F-A96F-F58E058A7161_edited_edited.jpg` → `equipment.jpg`
- `арматура.jpg` → `armature.jpg`
- `bystrorazemnoe_soedinenie_brs.jpg` → `quick-connect.jpg`
- `Мойка-авто-768x429.jpg` → `washing.jpg`
- `заправка.jpg` → `fueling.jpg`

**Постачальники** (`public/images/suppliers/`):
- `Inteva.jpg` → `inteva.jpg`
- `Альфа.jpg` → `alpha.jpg`
- `Semperit.jpg` → `semperit.jpg`
- `Компания OP srl.jpg` → `op-srl.jpg`
- `dicsa.jpg` → `dicsa.jpg`

**Hero** (`public/images/hero/`):
- `IMG-2198.jpg` → `hero-1.jpg`

## Метод 2: Через інспектор елементів

1. Клікніть правою кнопкою на зображення → **"Inspect"**
2. Знайдіть `<img src="...">`
3. Скопіюйте URL з `src`
4. Відкрийте URL → `Ctrl+S` → збережіть

## Перевірка

Після завантаження:
```bash
npm run dev
```

Перевірте, чи відображаються зображення на сайті.

