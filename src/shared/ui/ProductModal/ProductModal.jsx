import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import ProductImage from '@/shared/ui/ProductImage/ProductImage'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose }) {
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
            <p className={styles.details}>{product.details || product.description}</p>
            <p className={styles.price}>
              <span className={styles.priceLabel}>Цена:</span> {product.price}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
