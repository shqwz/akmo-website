import { motion } from 'framer-motion'
import { useScrollTo } from '@/shared/hooks/useScrollTo'
import Button from '@/shared/ui/Button/Button'
import styles from './Hero.module.css'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const scrollTo = useScrollTo()

  return (
    <section className={styles.hero} aria-label="Приветствие">
      <div className={styles.overlay} />
      <motion.div
        className={styles.content}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>Добро пожаловать</motion.h1>
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Мы создаём изделия из дерева с душой и заботой. Мебель, столярные изделия и декор для вашего дома.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button onClick={() => scrollTo('products')}>Узнать больше</Button>
        </motion.div>
      </motion.div>
      <button
        type="button"
        className={styles.scrollHint}
        onClick={() => scrollTo('products')}
        aria-label="Прокрутить к продукции"
      >
        <span className={styles.scrollArrow} />
      </button>
    </section>
  )
}
