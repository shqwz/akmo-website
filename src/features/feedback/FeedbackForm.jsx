import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema } from './feedbackSchema'
import { submitFeedback } from './submitFeedback'
import Button from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import styles from './FeedbackForm.module.css'

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = async (data) => {
    const result = await submitFeedback(data)
    if (result.success) {
      reset()
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <p>Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.</p>
        <Button type="button" variant="secondary" onClick={() => setSubmitted(false)}>
          Отправить ещё
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Input
        label="Имя"
        error={errors.name?.message}
        {...register('name')}
        autoComplete="name"
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
        autoComplete="email"
      />
      <div className={styles.wrapper}>
        <label htmlFor="feedback-message" className={styles.label}>Сообщение</label>
        <textarea
          id="feedback-message"
          className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
          rows={4}
          placeholder="Ваше сообщение..."
          {...register('message')}
        />
        {errors.message && (
          <span className={styles.error} role="alert">{errors.message.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  )
}
