import { useState } from 'react'
import styles from './ProductImage.module.css'

export default function ProductImage({ src, alt, width, height, ...props }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={styles.placeholder} style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
        <span className={styles.placeholderText}>Фото продукции</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      {...props}
    />
  )
}
