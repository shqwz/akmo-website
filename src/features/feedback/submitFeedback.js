/**
 * Отправка формы обратной связи через Formspree.
 * Form ID задаётся в .env: VITE_FORMSPREE_FORM_ID=ваш_id
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID || ''}`

export async function submitFeedback(data) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID
  if (!formId) {
    console.error('VITE_FORMSPREE_FORM_ID не задан в .env')
    return { success: false, error: 'Форма не настроена. Добавьте VITE_FORMSPREE_FORM_ID в .env' }
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const text = await res.text()
      return { success: false, error: 'Не удалось отправить. Попробуйте позже.' }
    }

    return { success: true }
  } catch (e) {
    console.error('Submit feedback error:', e)
    return { success: false, error: 'Ошибка сети. Проверьте интернет и попробуйте снова.' }
  }
}
