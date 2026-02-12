import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used as motion.section, motion.div
import styles from './About.module.css'

const ABOUT_PHOTOS = [
  { src: '/products/1.jpeg', alt: 'Производство' },
  { src: '/products/2.jpeg', alt: 'О компании' },
  { src: '/products/3.jpeg', alt: 'О компании' },
]

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

export default function About() {
  return (
    <motion.section
      id="about"
      className={styles.section}
      aria-labelledby="about-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.h2 id="about-heading" className={styles.heading} variants={itemVariants}>О компании</motion.h2>

        <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <motion.div className={styles.photosWrap} variants={itemVariants} aria-label="Фото компании">
            {ABOUT_PHOTOS.map((photo, i) => (
              <div key={photo.src + i} className={styles.photo}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </motion.div>

          <div className={styles.content}>
            <motion.div className={styles.aboutText} variants={itemVariants}>
              <p>
                Датой основания компании считается 25.12.2000 г. Начинали с небольшого коллектива и первого цеха по распиловке древесины. Позже открыли направление клееных изделий: мебельный щит, жалюзийные дверки, коробка, наличник, брусок.
              </p>
              <p>
                Сегодня наша компания — это:
              </p>
              <ul className={styles.aboutList}>
                <li>деревообрабатывающий цех: комплекс по производству мебельного щита (основан на Итальянском оборудовании); комплекс по производству сращенной продукции;</li>
                <li>столярный цех: комплекс по производству жалюзийных дверок (основан на Немецком оборудовании);</li>
                <li>заточной цех;</li>
                <li>сушильные камеры конвективного типа (Global Edge): 2х50 м³;</li>
                <li>цех по распиловке древесины;</li>
                <li>строгальный цех (4-х сторонний, обрезной);</li>
              </ul>
              <p>
                Реализуем продукцию собственного производства — гарантируем качество, выгодные цены и короткие сроки поставки. Учитываем индивидуальные требования заказчиков и предлагаем оптимальные варианты выполнения заказов.
              </p>
              <p>
                Производство постоянно модернизируется: линии автоматизируются, ручной труд механизируется. Будем рады сотрудничеству и надеемся, что наша продукция займет достойное место в Вашей торговой сети.
              </p>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </motion.section>
  )
}
