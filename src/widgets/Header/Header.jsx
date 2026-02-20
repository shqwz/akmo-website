import { useState, useEffect } from 'react'
import { useScrollTo } from '@/shared/hooks/useScrollTo'
import styles from './Header.module.css'

const NAV_LINKS = [
  { id: '', label: 'Главная' },
  { id: 'products', label: 'Продукция' },
  { id: 'about', label: 'О компании' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'feedback', label: 'Обратная связь' },
]

export default function Header() {
  const scrollTo = useScrollTo()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setMenuOpen(false)
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
        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>
      {menuOpen && (
        <button
          type="button"
          className={styles.mobileOverlay}
          onClick={() => setMenuOpen(false)}
          aria-label="Закрыть меню"
        />
      )}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        role="presentation"
      >
        <nav className={styles.mobileNav} aria-label="Навигация" onClick={(e) => e.stopPropagation()}>
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id || 'home'} className={styles.mobileNavItem}>
                <a
                  href={id ? `#${id}` : '#'}
                  onClick={(e) => { e.preventDefault(); handleNav(id); }}
                  className={styles.mobileNavLink}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
