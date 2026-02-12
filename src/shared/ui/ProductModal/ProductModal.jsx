import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ProductImage from '@/shared/ui/ProductImage/ProductImage'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose, onOpenPriceTable }) {
  useEffect(() => {
    if (!product) {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (typeof document.body.dataset.modalScrollY !== 'undefined') {
        window.scrollTo(0, Number(document.body.dataset.modalScrollY))
        delete document.body.dataset.modalScrollY
      }
      return
    }
    const scrollY = window.scrollY
    document.body.dataset.modalScrollY = String(scrollY)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      const savedY = document.body.dataset.modalScrollY
      if (savedY !== undefined) {
        window.scrollTo(0, Number(savedY))
        delete document.body.dataset.modalScrollY
      }
      document.removeEventListener('keydown', handleEscape)
    }
  }, [product, onClose])

  if (!product) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.imageWrap}>
            <ProductImage
              src={product.imageDetail || product.image}
              alt={product.name}
              width={400}
              height={400}
            />
          </div>
          <div className={styles.body}>
            <h2 id="product-modal-title" className={styles.title}>{product.name}</h2>
            <div className={styles.details}>
              {(() => {
                const text = product.details || product.description || ''
                const blocks = text.split(/\n\n+/)
                return blocks.map((block, bi) => {
                  const trimmed = block.trim()
                  if (!trimmed) return null
                  const lines = trimmed.split('\n')
                  const bulletLines = lines.filter((l) => l.trimStart().startsWith('•'))
                  if (bulletLines.length > 0) {
                    const intro = lines.filter((l) => !l.trimStart().startsWith('•')).join('\n').trim()
                    return (
                      <div key={bi} className={styles.detailsBlock}>
                        {intro && <p className={styles.detailsParagraph}>{intro}</p>}
                        <ul className={styles.detailsList}>
                          {bulletLines.map((line, i) => (
                            <li key={i}>{line.trimStart().replace(/^•\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  return (
                    <p key={bi} className={styles.detailsParagraph}>{trimmed}</p>
                  )
                })
              })()}
            </div>
            {product.priceTable && onOpenPriceTable ? (
              <button
                type="button"
                className={styles.priceOvalWrap}
                onClick={() => onOpenPriceTable(product)}
              >
                <p className={styles.price}>
                  <span className={styles.priceLabel}>Цена:</span> {product.price}
                </p>
              </button>
            ) : (
              <div className={`${styles.priceOvalWrap} ${styles.priceOvalWrapStatic}`}>
                <p className={styles.price}>
                  <span className={styles.priceLabel}>Цена:</span> {product.price}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
