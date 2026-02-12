import { useState } from 'react'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used as motion.* in JSX
import { defectsRows, specificationRows } from '@/shared/data/xlsxData'
import Button from '@/shared/ui/Button/Button'
import TableModal from '@/shared/ui/TableModal/TableModal'
import styles from './DocumentsSection.module.css'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function DocumentsSection() {
  const [openTable, setOpenTable] = useState(null)

  const tables = {
    defects: { title: 'Виды дефектов', rows: defectsRows },
    specification: { title: 'Спецификация', rows: specificationRows },
  }

  return (
    <motion.section
      id="documents"
      className={styles.section}
      aria-labelledby="documents-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.h2 id="documents-heading" className={styles.heading} variants={itemVariants}>
          Документация
        </motion.h2>
        <div className={styles.grid}>
          <motion.article className={styles.card} variants={itemVariants}>
            <h3 className={styles.cardTitle}>Виды дефектов</h3>
            <p className={styles.cardDesc}>
              Таблица допускаемых дефектов по сортам (А, В, С) для мебельного щита и клееных изделий.
            </p>
            <Button type="button" onClick={() => setOpenTable('defects')}>
              Смотреть
            </Button>
          </motion.article>
          <motion.article className={styles.card} variants={itemVariants}>
            <h3 className={styles.cardTitle}>Спецификация</h3>
            <p className={styles.cardDesc}>
              Технические требования и допуски по продукции: мебельный щит, жалюзийные дверки, коробка, наличник, брусок.
            </p>
            <Button type="button" onClick={() => setOpenTable('specification')}>
              Смотреть
            </Button>
          </motion.article>
        </div>
      </div>
      {openTable && tables[openTable] && (
        <TableModal
          title={tables[openTable].title}
          rows={tables[openTable].rows}
          onClose={() => setOpenTable(null)}
        />
      )}
    </motion.section>
  )
}
