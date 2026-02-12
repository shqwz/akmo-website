import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used as motion.* in JSX
import FeedbackForm from '@/features/feedback/FeedbackForm'
import styles from './FeedbackSection.module.css'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function FeedbackSection() {
  return (
    <motion.section
      id="feedback"
      className={styles.section}
      aria-labelledby="feedback-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
    >
      <div className={styles.wrap}>
        <motion.h2 id="feedback-heading" className={styles.heading} variants={variants}>Обратная связь</motion.h2>
        <motion.p className={styles.lead} variants={variants}>
          Напишите нам — ответим в ближайшее время.
        </motion.p>
        <div className={styles.row}>
          <motion.aside className={styles.contactBlock} variants={variants} aria-label="Контакты и реквизиты">
            <p className={styles.contactAddress}>
              172500, Россия<br />
              г. Нелидово, Тверская обл.<br />
              Офис/База: ул. Глазова 15
            </p>
            <p className={styles.contactLine}>
              Тел./факс: <a href="tel:+74826655391">(48266) 5 - 53 - 91</a>
            </p>
            <p className={styles.contactLine}>
              Сайт: <a href="https://www.akmo.ru" target="_blank" rel="noopener noreferrer">www.akmo.ru</a>
            </p>
            <p className={styles.contactLine}>
              E-mail: <a href="mailto:akmo@akmo.ru">akmo@akmo.ru</a>
            </p>
            <p className={styles.contactLine}>ICQ: 387-940-738</p>
            <div className={styles.requisites}>
              <p className={styles.requisitesTitle}>Реквизиты:</p>
              <p className={styles.contactLine}>Р/с 40702810563110100232</p>
              <p className={styles.contactLine}>Отделение СБ РФ № 5624 г. Нелидово</p>
              <p className={styles.contactLine}>БИК 042809679 к/с 30101810700000000679</p>
              <p className={styles.contactLine}>ОКОХ 15210, 71100, 71200, ОКПО 53493698</p>
              <p className={styles.contactLine}>ИНН 6912007163</p>
            </div>
          </motion.aside>
          <motion.div className={styles.formWrap} variants={variants}>
            <FeedbackForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
