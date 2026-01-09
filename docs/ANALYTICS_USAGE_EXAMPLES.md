# Приклади використання аналітики

## Інтеграція в layout.tsx

Додайте компонент `Analytics` в `app/layout.tsx`:

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

## Налаштування змінних оточення

Створіть файл `.env.local` в корені проекту:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXXX
```

## Приклади використання в компонентах

### 1. Відстеження кліків на продукти

```tsx
'use client';

import { productEvents } from '@/lib/analytics';

export default function ProductCard({ product }) {
  const handleClick = () => {
    productEvents.click(product.name, product.id);
    // Ваша логіка відкриття модального вікна
  };

  return (
    <div onClick={handleClick}>
      {/* Ваш компонент */}
    </div>
  );
}
```

### 2. Відстеження відкриття/закриття модального вікна продукту

```tsx
'use client';

import { productEvents } from '@/lib/analytics';
import { useEffect } from 'react';

export default function ProductModal({ product, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen && product) {
      productEvents.modalOpen(product.name, product.id);
    }
  }, [isOpen, product]);

  const handleClose = () => {
    if (product) {
      productEvents.modalClose(product.name, product.id);
    }
    onClose();
  };

  return (
    // Ваш модальний компонент
  );
}
```

### 3. Відстеження кліків на телефони

```tsx
'use client';

import { contactEvents } from '@/lib/analytics';

export default function ContactSection() {
  const handlePhoneClick = (phoneNumber: string) => {
    contactEvents.phoneClick(phoneNumber);
  };

  return (
    <a 
      href={`tel:${phoneNumber}`}
      onClick={() => handlePhoneClick(phoneNumber)}
    >
      {phoneNumber}
    </a>
  );
}
```

### 4. Відстеження надсилання форми

```tsx
'use client';

import { contactEvents } from '@/lib/analytics';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Відстеження початку заповнення форми
      contactEvents.formStart('contact_form');
      
      // Ваша логіка надсилання
      await submitForm(data);
      
      // Відстеження успішного надсилання
      contactEvents.formSubmit('contact_form', true);
    } catch (error) {
      // Відстеження помилки
      contactEvents.formSubmit('contact_form', false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Ваші поля форми */}
    </form>
  );
}
```

### 5. Відстеження прокрутки до секцій

```tsx
'use client';

import { navigationEvents } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navigationEvents.sectionScroll('products');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="products">
      {/* Ваш контент */}
    </section>
  );
}
```

### 6. Відстеження перегляду галереї

```tsx
'use client';

import { navigationEvents } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export default function Gallery() {
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navigationEvents.galleryView();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={galleryRef} id="gallery">
      {/* Ваш контент */}
    </section>
  );
}
```

### 7. Відстеження збільшення зображень

```tsx
'use client';

import { engagementEvents } from '@/lib/analytics';

export default function ProductImage({ image, productName }) {
  const handleZoom = () => {
    engagementEvents.imageZoom(`${productName}_${image}`);
    // Ваша логіка збільшення
  };

  return (
    <Image 
      src={image}
      onClick={handleZoom}
      alt={productName}
    />
  );
}
```

### 8. Відстеження перегляду відгуків

```tsx
'use client';

import { engagementEvents } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export default function Testimonial({ testimonial }) {
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            engagementEvents.testimonialView(testimonial.author);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => observer.disconnect();
  }, [testimonial.author]);

  return (
    <div ref={testimonialRef}>
      {/* Ваш контент відгуку */}
    </div>
  );
}
```

### 9. Кастомні події

```tsx
'use client';

import { trackEvent } from '@/lib/analytics';

export default function CustomButton() {
  const handleClick = () => {
    trackEvent({
      action: 'custom_button_click',
      category: 'Custom',
      label: 'Special Offer',
      value: 100,
      custom_param: 'value',
    });
  };

  return (
    <button onClick={handleClick}>
      Натисни мене
    </button>
  );
}
```

### 10. Відстеження перегляду сторінки

```tsx
'use client';

import { trackPageView } from '@/lib/analytics';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  return null;
}
```

## Інтеграція в існуючі компоненти

### Оновлення ProductModal.tsx

Додайте відстеження в `components/Products/ProductModal.tsx`:

```tsx
import { productEvents } from '@/lib/analytics';

// В useEffect для відкриття:
useEffect(() => {
  if (isOpen && product) {
    productEvents.modalOpen(product.title, product.id.toString());
  }
}, [isOpen, product]);

// В функції onClose:
const handleClose = () => {
  if (product) {
    productEvents.modalClose(product.title, product.id.toString());
  }
  onClose();
};
```

### Оновлення Contact.tsx

Додайте відстеження в `components/Contact/Contact.tsx`:

```tsx
import { contactEvents } from '@/lib/analytics';

// Для телефонів:
<a 
  href={`tel:${phone}`}
  onClick={() => contactEvents.phoneClick(phone)}
>
  {phone}
</a>

// Для форми:
const onSubmit = async (data) => {
  contactEvents.formStart('contact_form');
  try {
    await submitForm(data);
    contactEvents.formSubmit('contact_form', true);
  } catch {
    contactEvents.formSubmit('contact_form', false);
  }
};
```

## Тестування

### 1. Google Analytics DebugView

1. Встановіть розширення [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Відкрийте сайт
3. Перевірте події в реальному часі в GA4 DebugView

### 2. Yandex.Metrika

1. Відкрийте Yandex.Metrika
2. Перейдіть в розділ "Відвідувачі" → "Онлайн"
3. Виконайте дії на сайті та перевірте події

### 3. Консоль браузера

Всі події логуються в консоль, якщо аналітика не завантажена (для розробки).

## Налаштування цілей в GA4

1. Перейдіть в Admin → Events
2. Відзначте події як конверсії:
   - `form_submit` (успішні)
   - `phone_click`
   - `product_modal_open`

## Налаштування цілей в Yandex.Metrika

1. Перейдіть в Налаштування → Цілі
2. Створіть цілі для подій:
   - `form_submit`
   - `phone_click`
   - `product_modal_open`

---

**Примітка:** Всі події автоматично відстежуються в обох системах аналітики одночасно.
