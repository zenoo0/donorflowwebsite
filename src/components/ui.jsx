import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Logo({ light = false, big = false }) {
  return (
    <a href="#top" className="flex items-center" aria-label="DonorFlow by Optivise">
      <img
        src="/logo.png"
        alt="DonorFlow by Optivise"
        className={`w-auto select-none object-contain ${big ? 'h-14 sm:h-20' : 'h-9 sm:h-12'} ${light ? 'brightness-0 invert' : ''}`}
      />
    </a>
  )
}

/** Curved dome on top of a section (in the section's own colour) that rises from the bottom while scrolling down */
export function Curve({ color }) {
  return (
    <motion.div
      aria-hidden
      style={{ x: '-50%', background: color }}
      initial={{ y: 80 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute bottom-full left-1/2 z-10 h-24 w-[140%] rounded-t-[50%]"
    />
  )
}

export function Reveal({ children, delay = 0, y = 70, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** Word-by-word masked heading reveal */
export function SplitHeading({ text, className = '', delay = 0 }) {
  return (
    <motion.h2
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function ArrowLink({ href = '#', children, light }) {
  return (
    <a href={href} className={`btn-ghost group ${light ? 'text-white' : ''}`}>
      {children}
      <span className={`circle-btn ${light ? 'border-white/40 group-hover:bg-white group-hover:text-brand-700' : ''}`}>
        <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
      </span>
    </a>
  )
}

export function CountUp({ to, prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString('en-US')}
    </span>
  )
}

export function useIsMobile(bp = 768) {
  const [m, setM] = useState(typeof window !== 'undefined' && window.innerWidth < bp)
  useEffect(() => {
    const f = () => setM(window.innerWidth < bp)
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [bp])
  return m
}
