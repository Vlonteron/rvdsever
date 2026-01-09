/**
 * Утиліти для роботи з аналітикою
 * Підтримує Google Analytics 4 та Yandex.Metrika
 */

// Типи подій
export type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// Конфігурація аналітики
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    ym?: (
      counterId: number,
      method: string,
      targetId: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Відстеження події в Google Analytics 4
 */
export const trackGAEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Analytics не завантажено');
    return;
  }

  const { action, category, label, value, ...rest } = event;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
};

/**
 * Відстеження події в Yandex.Metrika
 */
export const trackYMEvent = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined' || !window.ym) {
    console.warn('Yandex.Metrika не завантажено');
    return;
  }

  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!yandexId) {
    console.warn('Yandex.Metrika ID не налаштовано');
    return;
  }

  const { action, category, label, value, ...rest } = event;

  window.ym(Number(yandexId), 'reachGoal', action, {
    category,
    label,
    value,
    ...rest,
  });
};

/**
 * Відстеження події в обох системах аналітики
 */
export const trackEvent = (event: AnalyticsEvent) => {
  trackGAEvent(event);
  trackYMEvent(event);
};

/**
 * Відстеження перегляду сторінки
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
      page_title: title,
    });
  }

  // Yandex.Metrika
  if (window.ym) {
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (yandexId) {
      window.ym(Number(yandexId), 'hit', url, {
        title: title,
      });
    }
  }
};

/**
 * Попередньо визначені події для продуктів
 */
export const productEvents = {
  view: (productName: string, productId?: string) =>
    trackEvent({
      action: 'product_view',
      category: 'Products',
      label: productName,
      product_id: productId,
      product_name: productName,
    }),

  click: (productName: string, productId?: string) =>
    trackEvent({
      action: 'product_click',
      category: 'Products',
      label: productName,
      product_id: productId,
      product_name: productName,
    }),

  modalOpen: (productName: string, productId?: string) =>
    trackEvent({
      action: 'product_modal_open',
      category: 'Products',
      label: productName,
      product_id: productId,
      product_name: productName,
    }),

  modalClose: (productName: string, productId?: string) =>
    trackEvent({
      action: 'product_modal_close',
      category: 'Products',
      label: productName,
      product_id: productId,
      product_name: productName,
    }),
};

/**
 * Попередньо визначені події для контактів
 */
export const contactEvents = {
  phoneClick: (phoneNumber: string) =>
    trackEvent({
      action: 'phone_click',
      category: 'Contact',
      label: phoneNumber,
      phone_number: phoneNumber,
    }),

  emailClick: (email: string) =>
    trackEvent({
      action: 'email_click',
      category: 'Contact',
      label: email,
      email: email,
    }),

  formSubmit: (formName: string, success: boolean = true) =>
    trackEvent({
      action: 'form_submit',
      category: 'Contact',
      label: formName,
      form_name: formName,
      success: success,
    }),

  formStart: (formName: string) =>
    trackEvent({
      action: 'form_start',
      category: 'Contact',
      label: formName,
      form_name: formName,
    }),
};

/**
 * Попередньо визначені події для навігації
 */
export const navigationEvents = {
  sectionScroll: (sectionName: string) =>
    trackEvent({
      action: 'section_scroll',
      category: 'Navigation',
      label: sectionName,
      section_name: sectionName,
    }),

  galleryView: () =>
    trackEvent({
      action: 'gallery_view',
      category: 'Gallery',
    }),

  supplierView: () =>
    trackEvent({
      action: 'supplier_view',
      category: 'Suppliers',
    }),
};

/**
 * Попередньо визначені події для взаємодії
 */
export const engagementEvents = {
  imageZoom: (imageName: string) =>
    trackEvent({
      action: 'image_zoom',
      category: 'Engagement',
      label: imageName,
      image_name: imageName,
    }),

  testimonialView: (testimonialAuthor?: string) =>
    trackEvent({
      action: 'testimonial_view',
      category: 'Engagement',
      label: testimonialAuthor,
      author: testimonialAuthor,
    }),

  videoPlay: (videoName: string) =>
    trackEvent({
      action: 'video_play',
      category: 'Engagement',
      label: videoName,
      video_name: videoName,
    }),
};

/**
 * E-commerce події (для майбутнього використання)
 */
export const ecommerceEvents = {
  addToCart: (productName: string, productId: string, price?: number) =>
    trackEvent({
      action: 'add_to_cart',
      category: 'Ecommerce',
      label: productName,
      product_id: productId,
      product_name: productName,
      value: price,
      currency: 'UAH',
    }),

  beginCheckout: () =>
    trackEvent({
      action: 'begin_checkout',
      category: 'Ecommerce',
    }),

  purchase: (transactionId: string, value: number, items: any[]) =>
    trackEvent({
      action: 'purchase',
      category: 'Ecommerce',
      transaction_id: transactionId,
      value: value,
      currency: 'UAH',
      items: items,
    }),
};
