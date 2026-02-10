import { useScrollTo } from '@/shared/hooks/useScrollTo'
import styles from './Footer.module.css'

const LINKS = [
  { id: 'products', label: 'Продукция' },
  { id: 'about', label: 'О компании' },
  { id: 'feedback', label: 'Обратная связь' },
]

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.block}>
          <span className={styles.logo}>AKMO</span>
          <p className={styles.tagline}>Деревообрабатывающее производство</p>
        </div>
        <nav className={styles.block} aria-label="Навигация в подвале">
          <ul className={styles.links}>
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.block}>
          <p className={styles.contact}>Контакты</p>
          <p className={styles.contactText}>
            г. Нелидово, Тверская обл., ул. Глазова 15
          </p>
          <p className={styles.contactText}>
            <a href="tel:+74826655391" className={styles.contactLink}>(48266) 5 — 53 — 91</a>
          </p>
          <p className={styles.contactText}>
            <a href="mailto:akmo@akmo.ru" className={styles.contactLink}>akmo@akmo.ru</a>
          </p>
          <p className={styles.contactText}>
            <a href="https://www.akmo.ru" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>www.akmo.ru</a>
          </p>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} AKMO. Все права защищены.
      </div>
    </footer>
  )
}
