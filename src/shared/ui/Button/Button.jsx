import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant] ?? styles.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
