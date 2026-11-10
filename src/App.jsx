import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GetHelp from './components/GetHelp'
import WhatWeDo from './components/WhatWeDo'
import Impact from './components/Impact'
import Donate from './components/Donate'
import Stories from './components/Stories'
import News from './components/News'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand-500" />
      <Navbar />
      <main>
        <Hero />
        <GetHelp />
        <WhatWeDo />
        <Impact />
        <Donate />
        <Stories />
        <News />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
