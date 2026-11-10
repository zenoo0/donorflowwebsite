import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, QrCode } from 'lucide-react'
import { HERO_IMG, PARTNERS } from '../data'
import { ArrowLink } from './ui'

const ease = [0.22, 1, 0.36, 1]

function Word({ children, delay }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%', rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 90])
  const scale = useTransform(scrollY, [0, 600], [1, 1.12])

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-white via-brand-50 to-brand-100">
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-32 bottom-40 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-5 pb-8 pt-32 text-center">
        <h1 className="h-display text-[clamp(3.6rem,13vw,11.5rem)] leading-[0.95]">
          <span className="flex flex-wrap items-center justify-center gap-x-[0.18em]">
            <Word delay={0.2}>Donor</Word>
            <motion.span
              style={{ y, scale }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'clamp(7rem, 28vw, 25rem)', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
              className="relative inline-block h-[0.5em] overflow-hidden rounded-full align-middle shadow-2xl shadow-brand-700/20"
            >
              <img src={HERO_IMG} alt="" className="h-full w-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-transparent" />
            </motion.span>
            <Word delay={0.35}>Flow</Word>
          </span>
          <span className="block">
            <Word delay={0.5}>is</Word> <Word delay={0.6}>Support</Word>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <a href="#donate" className="btn-primary">Donate</a>
          <ArrowLink href="#help">I need help</ArrowLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative mx-auto w-full max-w-[1400px] px-5 pb-28 md:px-10"
      >
        <div className="flex items-center gap-6 border-t border-ink/10 pt-6">
          <a href="#donate" className="flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-widest">
            <span className="circle-btn h-12 w-12"><QrCode size={18} /></span>
            <span className="hidden sm:inline">Quick Donate</span>
          </a>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
            <div className="flex w-max animate-marquee gap-16">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                <span key={i} className="whitespace-nowrap font-display text-xl font-extrabold text-ink/70">{p}</span>
              ))}
            </div>
          </div>
          <a href="#help" className="hidden shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-widest md:flex">
            Scroll down
            <span className="circle-btn h-12 w-12"><ArrowDown size={18} className="animate-bounce" /></span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
