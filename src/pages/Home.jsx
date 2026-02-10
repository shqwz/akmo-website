import Header from '@/widgets/Header/Header'
import Hero from '@/widgets/Hero/Hero'
import Products from '@/widgets/Products/Products'
import DocumentsSection from '@/widgets/DocumentsSection/DocumentsSection'
import About from '@/widgets/About/About'
import FeedbackSection from '@/widgets/FeedbackSection/FeedbackSection'
import Footer from '@/widgets/Footer/Footer'

export default function Home() {
  return (
    <>
      <a href="#products" className="skipLink">Перейти к содержимому</a>
      <Header />
      <main>
        <Hero />
        <Products />
        <DocumentsSection />
        <About />
        <FeedbackSection />
      </main>
      <Footer />
    </>
  )
}

