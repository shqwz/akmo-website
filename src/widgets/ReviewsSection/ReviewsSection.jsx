import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used as motion.* in JSX
import styles from './ReviewsSection.module.css'

/** Отзывы. productPhotos — опционально: массив путей к фото продукции (что заказали), например ['/reviews/dverki-1.jpg'] */
const REVIEWS = [
  {
    id: '1',
    text: 'Заказывали жалюзийные дверки для серии шкафов. Качество на высоте, геометрия ровная, доставили в срок. Рекомендую.',
    author: 'Сергей М.',
    role: 'Мебельное производство, Москва',
    productPhotos: ['/products/dverki.jpeg'],
  },
  {
    id: '2',
    text: 'Работаем с АКМО уже не первый год — берём мебельный щит и дверки для объектов под ключ. Всегда стабильное качество, адекватные цены, соблюдение сроков. Отдельно отмечу отзывчивость менеджеров: быстро подбирают варианты под задачу, помогают с расчётом объёмов. Несколько раз заказывали жалюзийные дверки крупными партиями — геометрия идеальная, упаковка надёжная, пришли без сколов. Мебельный щит тоже берём регулярно: сортность соответствует, сушки нет. Рекомендую как надёжного поставщика для мебельных производств и студий.',
    author: 'Анна К.',
    role: 'Студия интерьера',
    productPhotos: [],
  },
  {
    id: '3',
    text: 'Делали заказ на сращенную коробку и наличники под нестандартный проём. Всё изготовили точно по размерам, без переделок. Доволен результатом.',
    author: 'Дмитрий В.',
    role: 'Частный заказчик',
    productPhotos: [],
  },
  {
    id: '4',
    text: 'Нужны были дверки срочно — помогли уложиться в сроки. Дерево обработано аккуратно, упаковано надёжно. Буду обращаться ещё.',
    author: 'Ольга Т.',
    role: 'Мастерская корпусной мебели',
    productPhotos: [],
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function ReviewsSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null)
  const [fullReview, setFullReview] = useState(null)
  const [truncatedIds, setTruncatedIds] = useState({})
  const [visibleLines, setVisibleLines] = useState([])
  const textRefs = useRef([])

  useEffect(() => {
    if (!lightboxPhoto && !fullReview) return
    const onEscape = (e) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null)
        setFullReview(null)
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [lightboxPhoto, fullReview])

  const checkTruncation = () => {
    const next = {}
    textRefs.current.forEach((el, i) => {
      if (el && REVIEWS[i]) {
        next[REVIEWS[i].id] = el.scrollHeight > el.clientHeight
      }
    })
    setTruncatedIds((prev) => (JSON.stringify(next) !== JSON.stringify(prev) ? next : prev))
  }

  const measureLines = () => {
    const next = []
    textRefs.current.forEach((el, i) => {
      if (!el || !REVIEWS[i]) {
        next[i] = 99
        return
      }
      const parent = el.parentElement
      if (!parent) {
        next[i] = 99
        return
      }
      const height = parent.clientHeight
      const lh = getComputedStyle(el).lineHeight
      const fs = parseFloat(getComputedStyle(el).fontSize)
      const lineHeightPx = lh.endsWith('px') ? parseFloat(lh) : parseFloat(lh) * fs
      const lines = lineHeightPx > 0 ? Math.max(1, Math.floor(height / lineHeightPx)) : 1
      next[i] = lines
    })
    setVisibleLines((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next))
  }

  useLayoutEffect(() => {
    measureLines()
    const t = setTimeout(measureLines, 100)
    const ro = new ResizeObserver(measureLines)
    textRefs.current.forEach((el) => {
      if (el?.parentElement) ro.observe(el.parentElement)
    })
    return () => {
      clearTimeout(t)
      ro.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    if (visibleLines.length === 0) return
    checkTruncation()
    const t = setTimeout(checkTruncation, 50)
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <motion.section
      id="reviews"
      className={styles.section}
      aria-labelledby="reviews-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.h2 id="reviews-heading" className={styles.heading} variants={cardVariants}>
          Отзывы
        </motion.h2>
        <ul className={styles.grid}>
          {REVIEWS.map((review, index) => (
            <motion.li key={review.id} className={styles.card} variants={cardVariants}>
              <blockquote className={styles.quote}>
                {review.productPhotos?.length > 0 && (
                  <div className={styles.productPhotos}>
                    {review.productPhotos.map((src, i) => (
                      <button
                        key={src + i}
                        type="button"
                        className={styles.productPhotoWrap}
                        onClick={() => setLightboxPhoto(src)}
                        aria-label="Увеличить фото"
                      >
                        <img
                          src={src}
                          alt=""
                          className={styles.productPhoto}
                          width={120}
                          height={90}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className={styles.textWrap}>
                  <p
                    ref={(el) => { textRefs.current[index] = el }}
                    className={styles.text}
                    style={{
                      WebkitLineClamp: visibleLines[index] ?? 99,
                    }}
                  >
                    {review.text}
                  </p>
                </div>
                <div className={styles.cardBottom}>
                  {truncatedIds[review.id] && (
                    <button
                      type="button"
                      className={styles.readMore}
                      onClick={() => setFullReview(review)}
                    >
                      Читать далее
                    </button>
                  )}
                  <footer className={styles.footer}>
                    <cite className={styles.author}>{review.author}</cite>
                    {review.role && <span className={styles.role}>{review.role}</span>}
                  </footer>
                </div>
              </blockquote>
            </motion.li>
          ))}
        </ul>
      </div>

      {lightboxPhoto &&
        createPortal(
          <div
            className={styles.lightboxBackdrop}
            onClick={(e) => e.target === e.currentTarget && setLightboxPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фото"
          >
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxPhoto(null)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <img
              src={lightboxPhoto}
              alt=""
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      {fullReview &&
        createPortal(
          <div
            className={styles.fullReviewBackdrop}
            onClick={(e) => e.target === e.currentTarget && setFullReview(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Полный текст отзыва"
          >
            <div className={styles.fullReviewModal} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={styles.fullReviewClose}
                onClick={() => setFullReview(null)}
                aria-label="Закрыть"
              >
                ×
              </button>
              {fullReview.productPhotos?.length > 0 && (
                <div className={styles.fullReviewPhotos}>
                  {fullReview.productPhotos.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      className={styles.productPhotoWrap}
                      onClick={() => {
                        setFullReview(null)
                        setLightboxPhoto(src)
                      }}
                      aria-label="Увеличить фото"
                    >
                      <img src={src} alt="" className={styles.productPhoto} width={80} height={80} />
                    </button>
                  ))}
                </div>
              )}
              <p className={styles.fullReviewText}>{fullReview.text}</p>
              <footer className={styles.fullReviewFooter}>
                <cite className={styles.author}>{fullReview.author}</cite>
                {fullReview.role && <span className={styles.role}>{fullReview.role}</span>}
              </footer>
            </div>
          </div>,
          document.body
        )}
    </motion.section>
  )
}
