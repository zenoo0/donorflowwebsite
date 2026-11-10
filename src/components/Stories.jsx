import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { STORIES } from '../data'
import { ArrowLink, Curve, Reveal, SplitHeading, useIsMobile } from './ui'

export default function Stories() {
  const n = STORIES.length
  const items = [...STORIES, ...STORIES, ...STORIES] // 3 copies -> endless loop
  const [j, setJ] = useState(n + 1)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const mobile = useIsMobile()

  const GAP = 16
  const W = mobile ? 220 : 280
  const WA = mobile ? 280 : 420
  const x = -(j * (W + GAP) + WA / 2)
  const tr = instant ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  const story = STORIES[j % n]

  // auto-play: content travels left -> right
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setJ((v) => v - 1), 3200)
    return () => clearInterval(t)
  }, [paused])

  // after the slide finishes, silently jump back to the middle copy
  useEffect(() => {
    if (j >= n && j < 2 * n) return
    const t = setTimeout(() => {
      setInstant(true)
      setJ((v) => (v < n ? v + n : v - n))
      setTimeout(() => setInstant(false), 60)
    }, 950)
    return () => clearTimeout(t)
  }, [j, n])

  return (
    <section id="stories" className="relative overflow-x-clip bg-gradient-to-b from-white to-brand-50 pb-32 pt-36">
      <Curve color="#ffffff" />
      <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
        <SplitHeading text="Inspiring Journeys Of Strength And Hope" className="h-display mx-auto max-w-2xl text-4xl md:text-6xl" />
        <Reveal delay={0.2} className="mt-8 flex justify-center"><ArrowLink href="#stories">See all stories</ArrowLink></Reveal>
      </div>

      <div className="relative mt-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative h-[420px] overflow-hidden">
          <motion.div className="absolute left-1/2 top-0 flex h-full items-end" style={{ gap: GAP }} animate={{ x }} transition={tr}>
            {items.map((s, idx) => {
              const active = idx === j
              return (
                <motion.div
                  key={idx}
                  onClick={() => setJ(idx)}
                  animate={{ width: active ? WA : W, height: active ? 400 : 370 }}
                  transition={tr}
                  className={`relative shrink-0 overflow-hidden rounded-[2.2rem] ${active ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <img src={s.img} alt={s.name} className={`h-full w-full object-cover transition duration-700 ${active ? '' : 'grayscale'}`} />
                  <span className={`absolute inset-0 transition ${active ? 'bg-gradient-to-t from-brand-900/40 to-transparent' : 'bg-brand-900/20'}`} />
                  {active && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
                      <a href="#donate" className="btn-primary px-6 py-3">Donate</a>
                      <a href="#donate" aria-label="Open story" className="grid h-11 w-11 place-items-center rounded-full bg-white/30 text-white backdrop-blur"><ArrowUpRight size={16} /></a>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div key={story.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mx-auto mt-4 w-[min(92%,420px)] rounded-3xl border border-ink/10 bg-white p-5 shadow-xl shadow-brand-700/5">
          <p className="font-display text-lg font-extrabold">{story.name}</p>
          <p className="mt-1 text-sm text-ink/60">{story.diag}</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${story.pct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full bg-brand-500" />
          </div>
          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span>${story.raised.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span>{story.pct}%</span>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center gap-3">
          <button aria-label="Previous" onClick={() => setJ((v) => v - 1)} className="circle-btn h-12 w-12"><ArrowLeft size={18} /></button>
          <button aria-label="Next" onClick={() => setJ((v) => v + 1)} className="circle-btn h-12 w-12"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}
