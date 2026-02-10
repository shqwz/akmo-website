import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z.string().min(2, 'Введите имя (не менее 2 символов)').max(100),
  email: z.string().email('Введите корректный email'),
  message: z.string().min(10, 'Сообщение не менее 10 символов').max(2000),
})
