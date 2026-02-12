/**
 * Отправка формы обратной связи через EmailJS.
 * В .env задайте: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 * В шаблоне EmailJS используйте переменные: {{name}}, {{email}}, {{message}}
 *
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
import emailjs from '@emailjs/browser'

export async function submitFeedback(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS: задайте VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY в .env')
    return { success: false, error: 'Форма не настроена. Проверьте настройки EmailJS в .env' }
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: data.name,
        email: data.email,
        message: data.message,
      },
      { publicKey }
    )
    return { success: true }
  } catch (err) {
    console.error('EmailJS error:', err)
    return {
      success: false,
      error: err?.text ?? err?.message ?? 'Не удалось отправить. Попробуйте позже.',
    }
  }
}
