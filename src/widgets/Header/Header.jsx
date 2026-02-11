import { useState, useEffect } from 'react'
import { useScrollTo } from '@/shared/hooks/useScrollTo'
import styles from './Header.module.css'

const NAV_LINKS = [
  { id: '', label: 'Главная' },
  { id: 'products', label: 'Продукция' },
  { id: 'about', label: 'О компании' },
  { id: 'feedback', label: 'Обратная связь' },
]

export default function Header() {
  const scrollTo = useScrollTo()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    if (id) scrollTo(id)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>
        <div className={styles.logoOval}>
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav(''); }} className={styles.logo}>
            AKMO
          </a>
        </div>
        <div className={styles.navOval}>
        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id || 'home'}>
                <a
                  href={id ? `#${id}` : '#'}
                  onClick={(e) => { e.preventDefault(); handleNav(id); }}
                  className={styles.navLink}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      </div>
    </header>
  )
}
