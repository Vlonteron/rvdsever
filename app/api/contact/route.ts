import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Валидация данных
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Всі обов\'язкові поля повинні бути заповнені' },
        { status: 400 }
      );
    }

    // Получаем переменные окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены');
      return NextResponse.json(
        { error: 'Серверна помилка: не налаштовано відправку повідомлень' },
        { status: 500 }
      );
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
📧 <b>Нове повідомлення з форми зворотного зв'язку</b>

👤 <b>Ім'я:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📱 <b>Телефон:</b> ${escapeHtml(data.phone)}` : ''}
📌 <b>Тема:</b> ${escapeHtml(data.subject)}

💬 <b>Повідомлення:</b>
${escapeHtml(data.message)}

---
⏰ <i>Час: ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' })}</i>
    `.trim();

    // Отправляем сообщение в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    const telegramResponse = await response.json();

    if (!response.ok || !telegramResponse.ok) {
      console.error('Ошибка отправки в Telegram:', telegramResponse);
      return NextResponse.json(
        { error: 'Помилка відправки повідомлення. Спробуйте пізніше.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Повідомлення успішно відправлено!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// Функция для экранирования HTML символов
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
