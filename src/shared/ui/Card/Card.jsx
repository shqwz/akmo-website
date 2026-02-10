import styles from './Card.module.css'

export default function Card({ children, className = '', ...props }) {
  return (
    <article className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </article>
  )
}
