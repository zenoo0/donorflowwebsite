import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { NAV } from '../data'
import { Logo } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/75 py-3 shadow-sm backdrop-blur-xl' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="group relative text-xs font-semibold uppercase tracking-widest">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+10000000000" aria-label="Call us" className="circle-btn h-11 w-11 sm:h-12 sm:w-12">
            <Phone size={18} />
          </a>
          <a
            href="#donate"
            className="hidden rounded-full border border-ink/15 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition hover:border-brand-500 hover:bg-brand-500 hover:text-white sm:block"
          >
            Donate
          </a>
          <button className="circle-btn h-11 w-11 sm:h-12 sm:w-12 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-5 px-5 py-6">
              {[...NAV, { label: 'Donate', href: '#donate' }].map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-widest">
                  {n.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
