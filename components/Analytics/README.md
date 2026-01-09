# Компоненти аналітики

Ця папка містить компоненти для інтеграції систем аналітики на сайт.

## Компоненти

### `Analytics.tsx`
Головний компонент, який інтегрує всі системи аналітики. Використовуйте цей компонент в `app/layout.tsx`.

### `GoogleAnalytics.tsx`
Компонент для інтеграції Google Analytics 4.

**Змінна оточення:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### `YandexMetrika.tsx`
Компонент для інтеграції Yandex.Metrika.

**Змінна оточення:** `NEXT_PUBLIC_YANDEX_METRIKA_ID`

## Використання

```tsx
import Analytics from '@/components/Analytics/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Налаштування

1. Створіть `.env.local` з ID аналітики
2. Додайте компонент `Analytics` в layout
3. Готово!

Детальні інструкції див. в `docs/ANALYTICS_QUICK_START.md`
