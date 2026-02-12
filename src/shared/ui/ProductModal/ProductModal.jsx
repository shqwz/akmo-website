import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ProductImage from '@/shared/ui/ProductImage/ProductImage'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose, onOpenPriceTable }) {
  useEffect(() => {
    if (!product) {
      document.body.style.overflow = ''
      return
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
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
            <div
              className={
                product.priceTable && onOpenPriceTable
                  ? styles.priceOvalWrap
                  : `${styles.priceOvalWrap} ${styles.priceOvalWrapStatic}`
              }
            >
              <p className={styles.price}>
                <span className={styles.priceLabel}>Цена:</span>{' '}
                {product.priceTable && onOpenPriceTable ? (
                  <button
                    type="button"
                    className={styles.priceButton}
                    onClick={() => onOpenPriceTable(product)}
                  >
                    {product.price}
                  </button>
                ) : (
                  product.price
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
