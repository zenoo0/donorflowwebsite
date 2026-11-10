import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CTA_FACES } from '../data'
import { ArrowLink, Curve, Reveal, SplitHeading } from './ui'

function Bubble({ f, progress, idx }) {
  const y = useTransform(progress, [0, 1], [idx % 2 ? 80 : -80, idx % 2 ? -80 : 80])
  return (
    <motion.img
      src={`https://i.pravatar.cc/400?img=${f.n}`}
      alt=""
      style={{ width: f.size, height: f.size, left: f.x, top: f.y, y }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden rounded-full object-cover shadow-xl md:block"
    />
  )
}

export default function Cta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <section id="involved" ref={ref} className="relative flex items-center justify-center overflow-x-clip bg-brand-50 px-5 pb-24 pt-28 md:min-h-[90vh] md:pb-32 md:pt-36">
      <Curve color="#eef4ff" />
      {CTA_FACES.map((f, i) => <Bubble key={f.n} f={f} idx={i} progress={scrollYProgress} />)}
      <div className="relative z-10 text-center">
        <div className="mb-8 flex justify-center -space-x-4 md:hidden">
          {[5, 12, 25, 33].map((n, i) => (
            <motion.img
              key={n}
              src={`https://i.pravatar.cc/200?img=${n}`}
              alt=""
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="h-16 w-16 rounded-full border-4 border-brand-50 object-cover shadow-lg"
            />
          ))}
        </div>
        <Reveal><span className="eyebrow !bg-brand-200">Take Action</span></Reveal>
        <SplitHeading text="Join Us In Making A Difference" className="h-display mx-auto mt-6 max-w-2xl text-4xl sm:text-5xl md:text-7xl" />
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a href="#donate" className="btn-primary">Volunteer now</a>
          <ArrowLink href="#who">Learn more</ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
