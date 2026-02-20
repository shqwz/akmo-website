import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used as motion.* in JSX
import { products } from '@/shared/data/products'
import { priceDoorRows, priceMshRows } from '@/shared/data/xlsxData'
import Card from '@/shared/ui/Card/Card'
import ProductImage from '@/shared/ui/ProductImage/ProductImage'
import ProductModal from '@/shared/ui/ProductModal/ProductModal'
import TableModal from '@/shared/ui/TableModal/TableModal'
import styles from './Products.module.css'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const CARD_OPEN_DELAY_MS = 150

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [priceTable, setPriceTable] = useState(null)
  const openTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    }
  }, [])

  const handleCardClick = (product) => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
    const imgSrc = product.imageDetail || product.image
    const img = new Image()
    img.src = imgSrc
    openTimeoutRef.current = setTimeout(() => {
      openTimeoutRef.current = null
      setSelectedProduct(product)
    }, CARD_OPEN_DELAY_MS)
  }

  const handleOpenPriceTable = (product) => {
    if (product.priceTable === 'door') {
      setPriceTable({ title: 'Цены на жалюзийные дверки', rows: priceDoorRows })
    } else if (product.priceTable === 'msh') {
      setPriceTable({ title: 'Цены на мебельный щит', rows: priceMshRows })
    }
  }

  const mainProducts = products.filter((p) => p.priceTable)
  const otherProducts = products.filter((p) => !p.priceTable)

  const renderCard = (product) => (
    <motion.li key={product.id} variants={cardVariants}>
      <div
        className={styles.cardWrap}
        onClick={() => handleCardClick(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleCardClick(product)
          }
        }}
        role="button"
        tabIndex={0}
      >
        <Card className={styles.card}>
          <div className={styles.imageWrap}>
            <ProductImage
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={400}
              height={280}
            />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{product.name}</h3>
            <p className={styles.cardDesc}>{product.description}</p>
            <span className={styles.more}>Подробнее и цена →</span>
          </div>
        </Card>
      </div>
    </motion.li>
  )

  return (
    <motion.section
      id="products"
      className={styles.section}
      aria-labelledby="products-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.h2 id="products-heading" className={styles.heading} variants={cardVariants}>Наша продукция</motion.h2>
        <motion.p className={styles.lead} variants={cardVariants}>
          Изготавливаем мебель и изделия из дерева на заказ. Каждое изделие — индивидуально.
        </motion.p>

        <div className={styles.blockMain}>
          <motion.h3 className={`${styles.subheading} ${styles.subheadingMain}`} variants={cardVariants}>
            Основная продукция
          </motion.h3>
          <ul className={`${styles.grid} ${styles.gridMain}`}>
            {mainProducts.map(renderCard)}
          </ul>
        </div>

        <div className={styles.blockOther}>
          <motion.h3 className={styles.subheading} variants={cardVariants}>Также изготавливаем</motion.h3>
          <ul className={styles.grid}>
            {otherProducts.map(renderCard)}
          </ul>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenPriceTable={handleOpenPriceTable}
      />
      <TableModal
        title={priceTable?.title ?? null}
        rows={priceTable?.rows ?? []}
        onClose={() => setPriceTable(null)}
      />
    </motion.section>
  )
}
