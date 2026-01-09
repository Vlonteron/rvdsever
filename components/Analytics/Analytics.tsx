'use client';

import GoogleAnalytics from './GoogleAnalytics';
import YandexMetrika from './YandexMetrika';

/**
 * Компонент для інтеграції всіх систем аналітики
 * Додайте цей компонент в app/layout.tsx
 */
export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <YandexMetrika />
    </>
  );
}
