import { useId } from 'react'
import styles from './Input.module.css'

export default function Input({ label, error, id, className = '', ...props }) {
  const generatedId = useId()
  const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s/g, '-')}` : generatedId)
  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input id={inputId} className={`${styles.input} ${error ? styles.inputError : ''}`.trim()} {...props} />
      {error && <span className={styles.error} role="alert">{error}</span>}
    </div>
  )
}
