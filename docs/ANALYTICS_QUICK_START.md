# Швидкий старт: Налаштування аналітики

## Крок 1: Отримання ID аналітики

### Google Analytics 4
1. Перейдіть на [Google Analytics](https://analytics.google.com/)
2. Створіть акаунт та властивість (якщо ще немає)
3. Скопіюйте Measurement ID (формат: `G-XXXXXXXXXX`)

### Yandex.Metrika
1. Перейдіть на [Yandex.Metrika](https://metrika.yandex.ru/)
2. Створіть новий лічильник
3. Скопіюйте ID лічильника (число, наприклад: `12345678`)

## Крок 2: Налаштування змінних оточення

Створіть файл `.env.local` в корені проекту:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

**Важливо:** Не комітьте `.env.local` в Git! Файл вже має бути в `.gitignore`.

## Крок 3: Інтеграція в layout

Відкрийте `app/layout.tsx` та додайте компонент `Analytics`:

```tsx
import Analytics from '@/components/Analytics/Analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <StructuredData />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Крок 4: Перевірка роботи

1. Запустіть проект: `npm run dev`
2. Відкрийте сайт у браузері
3. Відкрийте консоль розробника (F12)
4. Перевірте, що скрипти аналітики завантажилися:
   - В Network вкладці мають бути запити до `googletagmanager.com` та `mc.yandex.ru`
   - В консолі не має бути помилок

## Крок 5: Тестування подій (опціонально)

Додайте просте відстеження для тестування:

```tsx
'use client';

import { contactEvents } from '@/lib/analytics';

// В будь-якому компоненті
<button onClick={() => contactEvents.phoneClick('+380501234567')}>
  Тест події
</button>
```

Перевірте події в:
- **GA4**: Realtime → Events
- **Yandex.Metrika**: Відвідувачі → Онлайн

## Готово! ✅

Тепер аналітика працює. Далі ви можете:
- Додати відстеження подій у компоненти (див. `ANALYTICS_USAGE_EXAMPLES.md`)
- Налаштувати цілі та конверсії
- Створити звіти та дашборди

## Додаткова інформація

- Повна документація: `ANALYTICS_SETUP.md`
- Приклади використання: `ANALYTICS_USAGE_EXAMPLES.md`
