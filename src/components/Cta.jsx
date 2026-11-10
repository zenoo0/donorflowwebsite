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
    <section id="involved" ref={ref} className="relative flex min-h-[90vh] items-center justify-center overflow-x-clip bg-brand-50 px-5 pb-32 pt-36">
      <Curve color="#eef4ff" />
      {CTA_FACES.map((f, i) => <Bubble key={f.n} f={f} idx={i} progress={scrollYProgress} />)}
      <div className="relative z-10 text-center">
        <Reveal><span className="eyebrow !bg-brand-200">Take Action</span></Reveal>
        <SplitHeading text="Join Us In Making A Difference" className="h-display mx-auto mt-6 max-w-2xl text-5xl md:text-7xl" />
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <a href="#donate" className="btn-primary">Volunteer now</a>
          <ArrowLink href="#who">Learn more</ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
