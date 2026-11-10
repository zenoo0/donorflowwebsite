import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Upload, Check } from 'lucide-react'
import { useRef } from 'react'
import { SplitHeading, Reveal, Curve } from './ui'

const CONDITIONS = ['Kidney Cancer', 'Lung Cancer', 'Breast Cancer', 'Leukemia', 'Brain Cancer', 'Other']
const STAGES = ['Pre-op', 'Active', 'Recovery']

export default function GetHelp() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const [cond, setCond] = useState(CONDITIONS[0])
  const [open, setOpen] = useState(false)
  const [goal, setGoal] = useState('56000')
  const [stage, setStage] = useState('Active')
  const [file, setFile] = useState(null)
  const [sent, setSent] = useState(false)

  const fmt = (v) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return (
    <section id="help" ref={ref} className="relative overflow-x-clip bg-brand-900 px-5 pb-20 pt-20 text-white md:px-10 md:pb-32 md:pt-24">
      <Curve color="#0e275f" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-[-10%]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#2f6bff_0%,transparent_45%),radial-gradient(circle_at_20%_80%,#5a8dff_0%,transparent_40%)] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-transparent to-brand-900" />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal><span className="inline-block rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">Get Help</span></Reveal>
          <SplitHeading text="We’re Here To Support You Every Step Of The Way" className="h-display mx-auto mt-5 max-w-3xl text-4xl md:text-6xl" />
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        <Reveal delay={0.2} className="w-full max-w-xl rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand-600"><Check size={30} /></motion.span>
              <p className="font-display text-2xl font-extrabold">Request received</p>
              <p className="text-white/75">Our team will contact you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="text-xs font-semibold uppercase tracking-widest underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
              <p className="font-display text-xl font-extrabold">What’s going on?</p>

              <div className="relative">
                <label className="mb-2 block text-sm text-white/80">Diagnosis or condition</label>
                <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-full bg-white/15 px-6 py-4 text-left text-lg transition hover:bg-white/25">
                  {cond}
                  <ChevronDown className={`transition ${open ? 'rotate-180' : ''}`} size={18} />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl bg-white py-2 text-ink shadow-2xl">
                      {CONDITIONS.map((c) => (
                        <li key={c}>
                          <button type="button" onClick={() => { setCond(c); setOpen(false) }} className="w-full px-6 py-2.5 text-left hover:bg-brand-50">{c}</button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Funding Goal</label>
                <div className="flex items-center rounded-full bg-white/15 px-6 py-4 text-lg focus-within:bg-white/25">
                  <input value={fmt(goal)} onChange={(e) => setGoal(e.target.value)} inputMode="numeric" className="w-full bg-transparent outline-none" />
                  <span>$</span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Treatment stage</label>
                <div className="relative flex rounded-full bg-white/15 p-1.5">
                  {STAGES.map((s) => (
                    <button type="button" key={s} onClick={() => setStage(s)} className="relative flex-1 rounded-full py-3 text-sm font-medium">
                      {stage === s && <motion.span layoutId="stage" className="absolute inset-0 rounded-full bg-white/90" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span className={`relative ${stage === s ? 'text-brand-800' : 'text-white/80'}`}>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <label className="flex cursor-pointer items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                  <span className="max-w-[9rem] truncate">{file ? file.name : 'Attach documents'}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition hover:bg-white hover:text-brand-700"><Upload size={18} /></span>
                  <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <button className="rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50">Request help</button>
              </div>
            </form>
          )}
        </Reveal>

        {/* mobile / tablet photo strip */}
        <div className="flex justify-center gap-3 lg:hidden">
          {[47, 5, 12, 25].map((n, i) => (
            <motion.img
              key={n}
              src={`https://i.pravatar.cc/300?img=${n}`}
              alt=""
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={`h-28 w-[22%] max-w-[9rem] rounded-3xl border border-white/30 object-cover shadow-xl ${i % 2 ? 'mt-6' : ''}`}
            />
          ))}
        </div>

        <div className="relative hidden h-[34rem] lg:block">
          {[
            { n: 47, cls: 'left-0 top-4 h-72 w-56', d: 0.3, f: '0s' },
            { n: 5, cls: 'right-2 top-0 h-60 w-60', d: 0.5, f: '1.5s' },
            { n: 12, cls: 'bottom-0 left-24 h-64 w-64', d: 0.7, f: '3s' },
            { n: 25, cls: 'bottom-6 right-0 h-44 w-44', d: 0.9, f: '2s' },
          ].map((p) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: p.d, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${p.cls}`}
            >
              <div className="h-full w-full animate-float overflow-hidden rounded-[2.2rem] border border-white/30 shadow-2xl shadow-black/30" style={{ animationDelay: p.f }}>
                <img src={`https://i.pravatar.cc/600?img=${p.n}`} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-3 text-ink shadow-xl"
          >
            <p className="font-display text-2xl font-extrabold text-brand-600">31,519+</p>
            <p className="text-xs font-medium text-ink/60">People received help</p>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
